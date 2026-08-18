#!/usr/bin/env python3
"""
Backend API Test Suite for ConsórcioAI
Tests all backend endpoints with realistic data
"""

import requests
import json
import sys
from typing import Dict, Any, Optional

# Backend URL from environment
BACKEND_URL = "https://consorcio-brain.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class TestRunner:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.test_data = {}
        
    def log(self, message: str, color: str = Colors.RESET):
        print(f"{color}{message}{Colors.RESET}")
    
    def test(self, name: str, method: str, endpoint: str, 
             expected_status: int = 200, data: Optional[Dict] = None,
             check_response: Optional[callable] = None) -> Optional[Dict]:
        """Execute a test case"""
        url = f"{BACKEND_URL}{endpoint}"
        self.log(f"\n🧪 Testing: {name}", Colors.BOLD)
        self.log(f"   {method} {endpoint}", Colors.BLUE)
        
        try:
            if method == "GET":
                response = requests.get(url, timeout=10)
            elif method == "POST":
                response = requests.post(url, json=data, timeout=10)
            elif method == "PUT":
                response = requests.put(url, json=data, timeout=10)
            elif method == "DELETE":
                response = requests.delete(url, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            # Check status code
            if response.status_code != expected_status:
                self.log(f"   ❌ FAILED: Expected {expected_status}, got {response.status_code}", Colors.RED)
                self.log(f"   Response: {response.text[:200]}", Colors.RED)
                self.failed += 1
                return None
            
            # Parse response
            try:
                response_data = response.json()
            except (ValueError, json.JSONDecodeError):
                response_data = {}
            
            # Custom validation
            if check_response and not check_response(response_data):
                self.log(f"   ❌ FAILED: Response validation failed", Colors.RED)
                self.log(f"   Response: {json.dumps(response_data, indent=2)[:300]}", Colors.RED)
                self.failed += 1
                return None
            
            self.log(f"   ✅ PASSED", Colors.GREEN)
            self.passed += 1
            return response_data
            
        except requests.exceptions.RequestException as e:
            self.log(f"   ❌ FAILED: Request error - {str(e)}", Colors.RED)
            self.failed += 1
            return None
        except Exception as e:
            self.log(f"   ❌ FAILED: {str(e)}", Colors.RED)
            self.failed += 1
            return None
    
    def print_summary(self):
        """Print test summary"""
        total = self.passed + self.failed
        self.log(f"\n{'='*60}", Colors.BOLD)
        self.log(f"TEST SUMMARY", Colors.BOLD)
        self.log(f"{'='*60}", Colors.BOLD)
        self.log(f"Total Tests: {total}")
        self.log(f"Passed: {self.passed}", Colors.GREEN)
        self.log(f"Failed: {self.failed}", Colors.RED if self.failed > 0 else Colors.GREEN)
        self.log(f"Success Rate: {(self.passed/total*100):.1f}%", 
                Colors.GREEN if self.failed == 0 else Colors.YELLOW)
        self.log(f"{'='*60}\n", Colors.BOLD)
        
        return self.failed == 0


def run_tests():
    """Run all backend tests"""
    runner = TestRunner()
    
    runner.log("\n" + "="*60, Colors.BOLD)
    runner.log("ConsórcioAI Backend API Test Suite", Colors.BOLD)
    runner.log("="*60 + "\n", Colors.BOLD)
    
    # ===== 1. ROOT ENDPOINT =====
    runner.log("\n📍 SECTION 1: Root Endpoint", Colors.YELLOW)
    runner.test(
        "Root endpoint returns message",
        "GET", "/",
        check_response=lambda r: "message" in r
    )
    
    # ===== 2. LEADS CRUD =====
    runner.log("\n📍 SECTION 2: Leads CRUD", Colors.YELLOW)
    
    # Create lead
    lead_data = {
        "name": "João Silva",
        "phone": "(11) 98765-4321",
        "email": "joao.silva@email.com",
        "product": "Consórcio Auto",
        "origin": "WhatsApp",
        "campaign": "Campanha Verão 2024"
    }
    lead_response = runner.test(
        "Create new lead",
        "POST", "/leads",
        data=lead_data,
        check_response=lambda r: "id" in r and r.get("name") == "João Silva"
    )
    
    if lead_response:
        lead_id = lead_response.get("id")
        runner.test_data["lead_id"] = lead_id
        
        # Get leads list
        runner.test(
            "Get leads list",
            "GET", "/leads",
            check_response=lambda r: "leads" in r and "total" in r
        )
        
        # Get specific lead
        runner.test(
            "Get specific lead by ID",
            "GET", f"/leads/{lead_id}",
            check_response=lambda r: r.get("id") == lead_id
        )
        
        # Update lead
        update_data = {
            "score": 75,
            "stage": "Qualificado",
            "intent": "Alta"
        }
        runner.test(
            "Update lead score and stage",
            "PUT", f"/leads/{lead_id}",
            data=update_data,
            check_response=lambda r: r.get("score") == 75 and r.get("stage") == "Qualificado"
        )
        
        # Update lead stage
        stage_data = {"stage": "Negociação"}
        runner.test(
            "Update lead stage via stage endpoint",
            "PUT", f"/leads/{lead_id}/stage",
            data=stage_data,
            check_response=lambda r: r.get("stage") == "Negociação"
        )
        
        # Add note to lead
        note_data = {
            "author": "Carlos Silva",
            "content": "Cliente demonstrou interesse em consórcio de R$ 100.000"
        }
        runner.test(
            "Add note to lead",
            "POST", f"/leads/{lead_id}/notes",
            data=note_data,
            check_response=lambda r: "id" in r and r.get("content") == note_data["content"]
        )
    
    # ===== 3. DASHBOARD =====
    runner.log("\n📍 SECTION 3: Dashboard", Colors.YELLOW)
    
    runner.test(
        "Get dashboard KPIs",
        "GET", "/dashboard/kpis",
        check_response=lambda r: isinstance(r, list) and len(r) > 0
    )
    
    runner.test(
        "Get dashboard funnel",
        "GET", "/dashboard/funnel",
        check_response=lambda r: isinstance(r, list)
    )
    
    runner.test(
        "Get dashboard alerts",
        "GET", "/dashboard/alerts",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 4. QUALIFICATION =====
    runner.log("\n📍 SECTION 4: Qualification", Colors.YELLOW)
    
    criteria_response = runner.test(
        "Get qualification criteria (seeded data)",
        "GET", "/qualification/criteria",
        check_response=lambda r: isinstance(r, list) and len(r) > 0
    )
    
    runner.test(
        "Get qualification settings",
        "GET", "/qualification/settings",
        check_response=lambda r: "active" in r
    )
    
    runner.test(
        "Update qualification settings",
        "PUT", "/qualification/settings",
        data={"active": False},
        check_response=lambda r: r.get("active") == False
    )
    
    # Restore settings
    runner.test(
        "Restore qualification settings",
        "PUT", "/qualification/settings",
        data={"active": True},
        check_response=lambda r: r.get("active") == True
    )
    
    # ===== 5. EVENTS =====
    runner.log("\n📍 SECTION 5: Events", Colors.YELLOW)
    
    runner.test(
        "Get event types (seeded data)",
        "GET", "/events/types",
        check_response=lambda r: isinstance(r, list) and len(r) > 0
    )
    
    runner.test(
        "Get event log",
        "GET", "/events/log",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 6. CONTRACTS & SALE CONFIRMATION =====
    runner.log("\n📍 SECTION 6: Contracts & Sale Confirmation", Colors.YELLOW)
    
    if "lead_id" in runner.test_data:
        lead_id = runner.test_data["lead_id"]
        
        # Create contract
        contract_data = {
            "lead_id": lead_id,
            "lead_name": "João Silva",
            "product": "Auto",
            "value": "R$ 100.000",
            "installments": 60,
            "monthly_payment": "R$ 1.667"
        }
        contract_response = runner.test(
            "Create contract",
            "POST", "/contracts",
            data=contract_data,
            check_response=lambda r: "id" in r and r.get("lead_id") == lead_id
        )
        
        if contract_response:
            contract_id = contract_response.get("id")
            runner.test_data["contract_id"] = contract_id
            
            # Get contracts list
            runner.test(
                "Get contracts list",
                "GET", "/contracts",
                check_response=lambda r: isinstance(r, list)
            )
            
            # Confirm sale
            confirm_data = {
                "confirmed_by": "Carlos Silva",
                "observation": "Venda confirmada após análise de crédito"
            }
            runner.test(
                "Confirm sale",
                "POST", f"/contracts/{contract_id}/confirm-sale",
                data=confirm_data,
                check_response=lambda r: r.get("status") == "Venda Confirmada"
            )
            
            # Try to confirm again (should fail)
            runner.test(
                "Try to confirm sale again (should fail with 400)",
                "POST", f"/contracts/{contract_id}/confirm-sale",
                data=confirm_data,
                expected_status=400
            )
    
    # ===== 7. USERS =====
    runner.log("\n📍 SECTION 7: Users", Colors.YELLOW)
    
    runner.test(
        "Get users list (seeded data)",
        "GET", "/users",
        check_response=lambda r: isinstance(r, list) and len(r) > 0
    )
    
    # ===== 8. SETTINGS =====
    runner.log("\n📍 SECTION 8: Settings", Colors.YELLOW)
    
    runner.test(
        "Get platform settings",
        "GET", "/settings",
        check_response=lambda r: isinstance(r, dict)
    )
    
    # ===== 9. INTEGRATIONS =====
    runner.log("\n📍 SECTION 9: Integrations", Colors.YELLOW)
    
    runner.test(
        "Get integrations",
        "GET", "/integrations",
        check_response=lambda r: "meta" in r and "whatsapp" in r
    )
    
    # ===== 10. AUDIT =====
    runner.log("\n📍 SECTION 10: Audit Logs", Colors.YELLOW)
    
    runner.test(
        "Get audit logs (should have logs from operations above)",
        "GET", "/audit",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 11. CONVERSATIONS =====
    runner.log("\n📍 SECTION 11: Conversations", Colors.YELLOW)
    
    runner.test(
        "Get conversations list",
        "GET", "/conversations",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 12. DOCUMENTS =====
    runner.log("\n📍 SECTION 12: Documents", Colors.YELLOW)
    
    runner.test(
        "Get documents list",
        "GET", "/documents",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 13. KNOWLEDGE BASE =====
    runner.log("\n📍 SECTION 13: Knowledge Base", Colors.YELLOW)
    
    runner.test(
        "Get knowledge items",
        "GET", "/knowledge",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 14. PLAYBOOK =====
    runner.log("\n📍 SECTION 14: Playbook", Colors.YELLOW)
    
    runner.test(
        "Get playbook entries",
        "GET", "/playbook",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 15. TRAFFIC =====
    runner.log("\n📍 SECTION 15: Traffic Campaigns", Colors.YELLOW)
    
    runner.test(
        "Get traffic campaigns",
        "GET", "/traffic/campaigns",
        check_response=lambda r: isinstance(r, list)
    )
    
    # ===== 16. REPORTS =====
    runner.log("\n📍 SECTION 16: Reports", Colors.YELLOW)
    
    runner.test(
        "Get reports summary",
        "GET", "/reports/summary",
        check_response=lambda r: "total_leads" in r and "conversion_rate" in r
    )
    
    # Print summary
    success = runner.print_summary()
    
    return 0 if success else 1


if __name__ == "__main__":
    sys.exit(run_tests())
