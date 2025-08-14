# API Contracts – Burak Devli Portfolio

Scope
- Convert contact form from mock (localStorage) to real backend using FastAPI + MongoDB
- Send email notification on each submission
- Keep all backend routes under prefix `/api`

Environment & URLs
- Frontend → Backend base: `${REACT_APP_BACKEND_URL}` (already set in frontend/.env)
- Backend binds to 0.0.0.0:8001 (supervised)
- Database: Use `MONGO_URL` from backend/.env (existing) and `DB_NAME`
- Do NOT hardcode URLs or ports

Collections
- `contacts`
  - `_id`: ObjectId (mongo)
  - `id`: string (uuid)
  - `name`: string (1..200)
  - `email`: string
  - `message`: string (1..5000)
  - `created_at`: ISO datetime (UTC)
  - `user_agent`: string | null
  - `referer`: string | null
  - `status`: enum ["new", "sent", "error"]

REST API
1) Create Contact
- Method/Route: POST `/api/contact`
- Request (JSON):
  {
    "name": "...",
    "email": "...",
    "message": "..."
  }
- Response 201 (JSON):
  {
    "id": "uuid",
    "name": "...",
    "email": "...",
    "message": "...",
    "created_at": "2025-07-..Z",
    "status": "sent" | "new" | "error"
  }
- Behavior:
  - Validate inputs; store in Mongo `contacts`
  - Attempt email send (provider via env). If email succeeds → status="sent"; if fails → status="error" but still 201 with note

2) List Contacts (basic admin)
- Method/Route: GET `/api/contact?limit=50`
- Response 200: Array<Contact>
- Use pagination cursor later if needed

Email Integration (config via env)
- Preferred provider: SendGrid
- Env vars (add to backend/.env):
  - `SENDGRID_API_KEY=...`
  - `EMAIL_FROM=sender@domain`
  - `EMAIL_TO=burakdevli2@gmail.com` (or comma separated list)
  - Optional: `EMAIL_SUBJECT="Yeni portföy mesajı"`
- If keys not set, API will skip email sending gracefully and still save to DB

Frontend ↔ Backend Integration Plan
- Replace mock submit in `src/pages/Home.jsx` with axios POST to `${process.env.REACT_APP_BACKEND_URL}/api/contact`
- On success: show toast "Mesaj gönderildi"; clear form
- On failure: show toast "Hata oluştu"; keep fields

What is currently mocked
- Contact form save (localStorage) and success toast
- Portfolio data, skills, education are static mocks in `src/mock/mock.js`

Testing
- After implementation:
  - Use `deep_testing_backend_v2` to validate POST/GET routes
  - Then confirm frontend integration (ask user before running UI tests)

Notes
- CORS already enabled in backend
- All new routes must stay under `/api` to satisfy ingress rules