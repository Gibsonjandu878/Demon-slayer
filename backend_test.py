#!/usr/bin/env python3
"""
Comprehensive Backend API Test Suite for Demon Slayer API
Tests all endpoints with proper data validation and error handling
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in environment")
    exit(1)

API_BASE = f"{BACKEND_URL}/api"

class DemonSlayerAPITester:
    def __init__(self):
        self.passed_tests = 0
        self.failed_tests = 0
        self.test_results = []
        
    def log_test(self, test_name, passed, message=""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status}: {test_name}"
        if message:
            result += f" - {message}"
        print(result)
        self.test_results.append({"test": test_name, "passed": passed, "message": message})
        
        if passed:
            self.passed_tests += 1
        else:
            self.failed_tests += 1
    
    def test_health_check(self):
        """Test health check endpoint"""
        print("\n🔍 Testing Health Check Endpoint...")
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and data.get("database") == "connected":
                    self.log_test("Health Check", True, "Database connected successfully")
                else:
                    self.log_test("Health Check", False, f"Unexpected response: {data}")
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    def test_characters_api(self):
        """Test characters endpoints"""
        print("\n🔍 Testing Characters API...")
        
        # Test GET all characters
        try:
            response = requests.get(f"{API_BASE}/characters", timeout=10)
            
            if response.status_code == 200:
                characters = response.json()
                if isinstance(characters, list) and len(characters) > 0:
                    self.log_test("GET /characters", True, f"Retrieved {len(characters)} characters")
                    
                    # Validate character structure
                    first_char = characters[0]
                    required_fields = ['id', 'name', 'description', 'breathing', 'rank', 'abilities']
                    missing_fields = [field for field in required_fields if field not in first_char]
                    
                    if not missing_fields:
                        self.log_test("Character Data Structure", True, "All required fields present")
                    else:
                        self.log_test("Character Data Structure", False, f"Missing fields: {missing_fields}")
                    
                    # Test specific characters
                    expected_characters = ['Tanjiro Kamado', 'Nezuko Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira', 'Giyu Tomioka', 'Shinobu Kocho']
                    found_characters = [char['name'] for char in characters]
                    
                    for expected_char in expected_characters:
                        if expected_char in found_characters:
                            self.log_test(f"Character Present: {expected_char}", True)
                        else:
                            self.log_test(f"Character Present: {expected_char}", False, "Character not found")
                    
                    # Test individual character endpoint
                    test_char_id = characters[0]['id']
                    self.test_character_detail(test_char_id)
                    
                else:
                    self.log_test("GET /characters", False, "Empty or invalid response")
            else:
                self.log_test("GET /characters", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /characters", False, f"Error: {str(e)}")
    
    def test_character_detail(self, character_id):
        """Test individual character endpoint"""
        try:
            response = requests.get(f"{API_BASE}/characters/{character_id}", timeout=10)
            
            if response.status_code == 200:
                character = response.json()
                if character.get('id') == character_id:
                    self.log_test("GET /characters/{id}", True, f"Retrieved character: {character.get('name')}")
                else:
                    self.log_test("GET /characters/{id}", False, "ID mismatch in response")
            else:
                self.log_test("GET /characters/{id}", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /characters/{id}", False, f"Error: {str(e)}")
        
        # Test invalid character ID
        try:
            response = requests.get(f"{API_BASE}/characters/invalid-id", timeout=10)
            if response.status_code == 404:
                self.log_test("GET /characters/{invalid_id} - 404 Error", True, "Proper 404 response")
            else:
                self.log_test("GET /characters/{invalid_id} - 404 Error", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /characters/{invalid_id} - 404 Error", False, f"Error: {str(e)}")
    
    def test_breathing_techniques_api(self):
        """Test breathing techniques endpoints"""
        print("\n🔍 Testing Breathing Techniques API...")
        
        try:
            response = requests.get(f"{API_BASE}/breathing-techniques", timeout=10)
            
            if response.status_code == 200:
                techniques = response.json()
                if isinstance(techniques, list) and len(techniques) > 0:
                    self.log_test("GET /breathing-techniques", True, f"Retrieved {len(techniques)} techniques")
                    
                    # Validate technique structure
                    first_technique = techniques[0]
                    required_fields = ['id', 'name', 'description', 'forms', 'users', 'color', 'element']
                    missing_fields = [field for field in required_fields if field not in first_technique]
                    
                    if not missing_fields:
                        self.log_test("Breathing Technique Data Structure", True, "All required fields present")
                    else:
                        self.log_test("Breathing Technique Data Structure", False, f"Missing fields: {missing_fields}")
                    
                    # Test specific techniques
                    expected_techniques = ['Water Breathing', 'Thunder Breathing', 'Beast Breathing', 'Insect Breathing', 'Sun Breathing']
                    found_techniques = [tech['name'] for tech in techniques]
                    
                    for expected_tech in expected_techniques:
                        if expected_tech in found_techniques:
                            self.log_test(f"Technique Present: {expected_tech}", True)
                        else:
                            self.log_test(f"Technique Present: {expected_tech}", False, "Technique not found")
                    
                    # Test individual technique endpoint
                    test_tech_id = techniques[0]['id']
                    self.test_breathing_technique_detail(test_tech_id)
                    
                else:
                    self.log_test("GET /breathing-techniques", False, "Empty or invalid response")
            else:
                self.log_test("GET /breathing-techniques", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /breathing-techniques", False, f"Error: {str(e)}")
    
    def test_breathing_technique_detail(self, technique_id):
        """Test individual breathing technique endpoint"""
        try:
            response = requests.get(f"{API_BASE}/breathing-techniques/{technique_id}", timeout=10)
            
            if response.status_code == 200:
                technique = response.json()
                if technique.get('id') == technique_id:
                    self.log_test("GET /breathing-techniques/{id}", True, f"Retrieved technique: {technique.get('name')}")
                else:
                    self.log_test("GET /breathing-techniques/{id}", False, "ID mismatch in response")
            else:
                self.log_test("GET /breathing-techniques/{id}", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /breathing-techniques/{id}", False, f"Error: {str(e)}")
        
        # Test invalid technique ID
        try:
            response = requests.get(f"{API_BASE}/breathing-techniques/invalid-id", timeout=10)
            if response.status_code == 404:
                self.log_test("GET /breathing-techniques/{invalid_id} - 404 Error", True, "Proper 404 response")
            else:
                self.log_test("GET /breathing-techniques/{invalid_id} - 404 Error", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /breathing-techniques/{invalid_id} - 404 Error", False, f"Error: {str(e)}")
    
    def test_story_arcs_api(self):
        """Test story arcs endpoints"""
        print("\n🔍 Testing Story Arcs API...")
        
        try:
            response = requests.get(f"{API_BASE}/story-arcs", timeout=10)
            
            if response.status_code == 200:
                arcs = response.json()
                if isinstance(arcs, list) and len(arcs) > 0:
                    self.log_test("GET /story-arcs", True, f"Retrieved {len(arcs)} story arcs")
                    
                    # Validate arc structure
                    first_arc = arcs[0]
                    required_fields = ['id', 'title', 'description', 'episodes', 'key_events', 'order']
                    missing_fields = [field for field in required_fields if field not in first_arc]
                    
                    if not missing_fields:
                        self.log_test("Story Arc Data Structure", True, "All required fields present")
                    else:
                        self.log_test("Story Arc Data Structure", False, f"Missing fields: {missing_fields}")
                    
                    # Test ordering (should be ordered by sequence)
                    orders = [arc.get('order', 0) for arc in arcs]
                    if orders == sorted(orders):
                        self.log_test("Story Arcs Ordering", True, "Arcs properly ordered by sequence")
                    else:
                        self.log_test("Story Arcs Ordering", False, "Arcs not properly ordered")
                    
                    # Test specific arcs
                    expected_arcs = ['Final Selection Arc', 'Kidnapper\'s Bog Arc', 'Asakusa Arc', 'Tsuzumi Mansion Arc', 'Mount Natagumo Arc', 'Rehabilitation Training Arc']
                    found_arcs = [arc['title'] for arc in arcs]
                    
                    for expected_arc in expected_arcs:
                        if expected_arc in found_arcs:
                            self.log_test(f"Arc Present: {expected_arc}", True)
                        else:
                            self.log_test(f"Arc Present: {expected_arc}", False, "Arc not found")
                    
                    # Test individual arc endpoint
                    test_arc_id = arcs[0]['id']
                    self.test_story_arc_detail(test_arc_id)
                    
                else:
                    self.log_test("GET /story-arcs", False, "Empty or invalid response")
            else:
                self.log_test("GET /story-arcs", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /story-arcs", False, f"Error: {str(e)}")
    
    def test_story_arc_detail(self, arc_id):
        """Test individual story arc endpoint"""
        try:
            response = requests.get(f"{API_BASE}/story-arcs/{arc_id}", timeout=10)
            
            if response.status_code == 200:
                arc = response.json()
                if arc.get('id') == arc_id:
                    self.log_test("GET /story-arcs/{id}", True, f"Retrieved arc: {arc.get('title')}")
                else:
                    self.log_test("GET /story-arcs/{id}", False, "ID mismatch in response")
            else:
                self.log_test("GET /story-arcs/{id}", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /story-arcs/{id}", False, f"Error: {str(e)}")
        
        # Test invalid arc ID
        try:
            response = requests.get(f"{API_BASE}/story-arcs/invalid-id", timeout=10)
            if response.status_code == 404:
                self.log_test("GET /story-arcs/{invalid_id} - 404 Error", True, "Proper 404 response")
            else:
                self.log_test("GET /story-arcs/{invalid_id} - 404 Error", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /story-arcs/{invalid_id} - 404 Error", False, f"Error: {str(e)}")
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        print("\n🔍 Testing Root API Endpoint...")
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "Demon Slayer API" in data.get("message", ""):
                    self.log_test("GET /api/", True, "Root endpoint working")
                else:
                    self.log_test("GET /api/", False, f"Unexpected message: {data}")
            else:
                self.log_test("GET /api/", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /api/", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Demon Slayer API Test Suite")
        print(f"📍 Testing API at: {API_BASE}")
        print("=" * 60)
        
        # Run all test methods
        self.test_health_check()
        self.test_root_endpoint()
        self.test_characters_api()
        self.test_breathing_techniques_api()
        self.test_story_arcs_api()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"📈 Success Rate: {(self.passed_tests / (self.passed_tests + self.failed_tests) * 100):.1f}%")
        
        if self.failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["passed"]:
                    print(f"  • {result['test']}: {result['message']}")
        
        print("\n🎯 CRITICAL ISSUES:")
        critical_failures = [r for r in self.test_results if not r["passed"] and any(keyword in r["test"].lower() for keyword in ["health", "characters", "breathing", "story"])]
        
        if critical_failures:
            for failure in critical_failures:
                print(f"  🔴 {failure['test']}: {failure['message']}")
        else:
            print("  ✅ No critical issues found!")
        
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = DemonSlayerAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        exit(0)
    else:
        print(f"\n⚠️  {tester.failed_tests} test(s) failed. Please check the issues above.")
        exit(1)