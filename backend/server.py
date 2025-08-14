from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)

class ContactOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    message: str
    created_at: datetime
    status: str
    user_agent: Optional[str] = None
    referer: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Email helper (SendGrid)
def send_email_via_sendgrid(subject: str, content: str) -> bool:
    api_key = os.environ.get("SENDGRID_API_KEY")
    sender = os.environ.get("EMAIL_FROM")
    recipient = os.environ.get("EMAIL_TO")
    if not api_key or not sender or not recipient:
        logger.warning("Email not configured; skipping send.")
        return False
    try:
        resp = requests.post(
            "https://api.sendgrid.com/v3/mail/send",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "personalizations": [{"to": [{"email": recipient}]}],
                "from": {"email": sender},
                "subject": subject,
                "content": [{"type": "text/plain", "value": content}],
            },
            timeout=10,
        )
        if resp.status_code in (200, 202):
            return True
        logger.error(f"SendGrid error {resp.status_code}: {resp.text}")
        return False
    except Exception as e:
        logger.exception(f"Email send failed: {e}")
        return False

@api_router.post("/contact", response_model=ContactOut, status_code=201)
async def create_contact(req: Request, body: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": body.name.strip(),
        "email": str(body.email),
        "message": body.message.strip(),
        "created_at": datetime.utcnow(),
        "status": "new",
        "user_agent": req.headers.get("user-agent"),
        "referer": req.headers.get("referer"),
    }
    await db.contacts.insert_one(doc)

    # try email
    subject = os.environ.get("EMAIL_SUBJECT", "Yeni portföy mesajı")
    content = f"Ad: {doc['name']}\nEmail: {doc['email']}\nMesaj: {doc['message']}\nTarih: {doc['created_at'].isoformat()}"
    import asyncio
    loop = asyncio.get_event_loop()
    success = await loop.run_in_executor(None, lambda: send_email_via_sendgrid(subject, content))

    if success:
        await db.contacts.update_one({"id": doc["id"]}, {"$set": {"status": "sent"}})
        doc["status"] = "sent"
    else:
        await db.contacts.update_one({"id": doc["id"]}, {"$set": {"status": "error"}})
        doc["status"] = "error"

    return ContactOut(**doc)

@api_router.get("/contact", response_model=List[ContactOut])
async def list_contacts(limit: int = 50):
    rows = await db.contacts.find().sort("created_at", -1).to_list(limit)
    return [ContactOut(**{**r, "id": r.get("id", str(r.get("_id")))}) for r in rows]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
