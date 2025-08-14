#!/usr/bin/env python3
"""
Backend API Testing Script
Tests the FastAPI endpoints for the portfolio application
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://engineer-portfolio-2.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("=" * 60)
    print("Testing GET /api/ endpoint...")
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ ROOT ENDPOINT TEST PASSED")
                return True
            else:
                print(f"❌ ROOT ENDPOINT TEST FAILED: Expected message 'Hello World', got {data}")
                return False
        else:
            print(f"❌ ROOT ENDPOINT TEST FAILED: Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ROOT ENDPOINT TEST FAILED: Exception occurred - {str(e)}")
        return False

def test_contact_post():
    """Test POST /api/contact endpoint"""
    print("=" * 60)
    print("Testing POST /api/contact endpoint...")
    
    # Test data with realistic information
    test_contact = {
        "name": "Ahmet Yılmaz",
        "email": "ahmet.yilmaz@example.com",
        "message": "Merhaba, portföyünüzü inceledim ve çok beğendim. İletişime geçmek istiyorum."
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=test_contact,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            
            # Check required fields
            required_fields = ["id", "name", "email", "message", "created_at", "status"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ CONTACT POST TEST FAILED: Missing fields: {missing_fields}")
                return False, None
            
            # Validate field values
            if data["name"] != test_contact["name"]:
                print(f"❌ CONTACT POST TEST FAILED: Name mismatch")
                return False, None
                
            if data["email"] != test_contact["email"]:
                print(f"❌ CONTACT POST TEST FAILED: Email mismatch")
                return False, None
                
            if data["message"] != test_contact["message"]:
                print(f"❌ CONTACT POST TEST FAILED: Message mismatch")
                return False, None
            
            # Check status is one of expected values
            if data["status"] not in ["sent", "new", "error"]:
                print(f"❌ CONTACT POST TEST FAILED: Invalid status '{data['status']}'")
                return False, None
            
            print(f"✅ CONTACT POST TEST PASSED - Contact created with ID: {data['id']}, Status: {data['status']}")
            return True, data["id"]
            
        else:
            print(f"❌ CONTACT POST TEST FAILED: Expected status 201, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ CONTACT POST TEST FAILED: Exception occurred - {str(e)}")
        return False, None

def test_contact_get():
    """Test GET /api/contact endpoint"""
    print("=" * 60)
    print("Testing GET /api/contact endpoint...")
    
    try:
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: Found {len(data)} contacts")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check if contacts are sorted by latest first (created_at desc)
                    first_contact = data[0]
                    required_fields = ["id", "name", "email", "message", "created_at", "status"]
                    missing_fields = [field for field in required_fields if field not in first_contact]
                    
                    if missing_fields:
                        print(f"❌ CONTACT GET TEST FAILED: Missing fields in contact: {missing_fields}")
                        return False
                    
                    # Check if sorted by latest first (if we have multiple contacts)
                    if len(data) > 1:
                        first_date = datetime.fromisoformat(data[0]["created_at"].replace('Z', '+00:00'))
                        second_date = datetime.fromisoformat(data[1]["created_at"].replace('Z', '+00:00'))
                        
                        if first_date < second_date:
                            print("❌ CONTACT GET TEST FAILED: Contacts not sorted by latest first")
                            return False
                    
                    print(f"✅ CONTACT GET TEST PASSED - Retrieved {len(data)} contacts, properly sorted")
                    return True
                else:
                    print("✅ CONTACT GET TEST PASSED - No contacts found (empty list)")
                    return True
            else:
                print(f"❌ CONTACT GET TEST FAILED: Expected list, got {type(data)}")
                return False
                
        else:
            print(f"❌ CONTACT GET TEST FAILED: Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ CONTACT GET TEST FAILED: Exception occurred - {str(e)}")
        return False

def test_contact_post_validation():
    """Test POST /api/contact endpoint with invalid data"""
    print("=" * 60)
    print("Testing POST /api/contact validation...")
    
    # Test with missing required fields
    invalid_contacts = [
        {},  # Empty object
        {"name": "Test"},  # Missing email and message
        {"email": "test@example.com"},  # Missing name and message
        {"message": "Test message"},  # Missing name and email
        {"name": "", "email": "test@example.com", "message": "Test"},  # Empty name
        {"name": "Test", "email": "invalid-email", "message": "Test"},  # Invalid email
        {"name": "Test", "email": "test@example.com", "message": ""},  # Empty message
    ]
    
    validation_passed = True
    
    for i, invalid_contact in enumerate(invalid_contacts):
        try:
            response = requests.post(
                f"{API_BASE}/contact",
                json=invalid_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 4xx status for validation errors
            if response.status_code >= 400 and response.status_code < 500:
                print(f"✅ Validation test {i+1} passed - Status: {response.status_code}")
            else:
                print(f"❌ Validation test {i+1} failed - Expected 4xx, got {response.status_code}")
                validation_passed = False
                
        except Exception as e:
            print(f"❌ Validation test {i+1} failed - Exception: {str(e)}")
            validation_passed = False
    
    if validation_passed:
        print("✅ CONTACT POST VALIDATION TESTS PASSED")
    else:
        print("❌ CONTACT POST VALIDATION TESTS FAILED")
    
    return validation_passed

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests")
    print(f"Testing API at: {API_BASE}")
    print("=" * 60)
    
    results = []
    
    # Test 1: Root endpoint
    results.append(("GET /api/", test_root_endpoint()))
    
    # Test 2: Contact POST
    post_result, contact_id = test_contact_post()
    results.append(("POST /api/contact", post_result))
    
    # Test 3: Contact GET
    results.append(("GET /api/contact", test_contact_get()))
    
    # Test 4: Contact POST validation
    results.append(("POST /api/contact validation", test_contact_post_validation()))
    
    # Summary
    print("=" * 60)
    print("🏁 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print("=" * 60)
    print(f"Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL BACKEND TESTS PASSED!")
        return True
    else:
        print("⚠️  SOME BACKEND TESTS FAILED!")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)