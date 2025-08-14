#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

## user_problem_statement: "Portfolio sitesi: Kurumsal mavi-gri tema, deneyim timeline, eğitim, iletişim formu (MongoDB), Portfolyo inline görüntüleme, Dil & Sertifikalar menüde."

## backend:
##   - task: "Status API (template)"
##     implemented: true
##     working: true
##     file: "/app/backend/server.py"
##     stuck_count: 0
##     priority: "low"
##     needs_retesting: false
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "Template backend up; not used by frontend yet."
##   - task: "Create contact (Mongo only)"
##     implemented: true
##     working: true
##     file: "/app/backend/server.py"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "POST/GET /api/contact implemented. EMAIL_ENABLED flag introduced; default false so only Mongo save."
##         -working: true
##         -agent: "testing"
##         -comment: "Backend tests passed. POST /api/contact returns 201 with status='new'. EMAIL_ENABLED defaults to false correctly. All CRUD operations working."

## frontend:
##   - task: "Navbar navigation including Portfolyo and Dil & Sertifikalar"
##     implemented: true
##     working: true
##     file: "/app/frontend/src/pages/Home.jsx"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: true
##         -agent: "testing"
##         -comment: "Desktop+mobile navbar tested previously; works."
##   - task: "Portfolio inline viewer (PDF or image fallback)"
##     implemented: true
##     working: true
##     file: "/app/frontend/src/components/PortfolioCard.jsx"
##     stuck_count: 0
##     priority: "medium"
##     needs_retesting: true
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "Inline viewer uses <object> for PDFs, falls back to image for JPG."
##   - task: "Contact form uses backend (POST /api/contact)"
##     implemented: true
##     working: true
##     file: "/app/frontend/src/pages/Home.jsx"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: true
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "Replaced mock localStorage with fetch to backend; shows toast on success/failure."
##   - task: "Certification text updated"
##     implemented: true
##     working: true
##     file: "/app/frontend/src/mock/mock.js"
##     stuck_count: 0
##     priority: "low"
##     needs_retesting: false
##     status_history:
##         -working: true
##         -agent: "main"
##         -comment: "Changed certificate label to 'Sıvı Yakıtlı Kalorifer Ateşçisi Sertifikası'."

## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 4
##   run_ui: true

## test_plan:
##   current_focus:
##     - "Backend: POST /api/contact saves to Mongo without email (status=new)"
##     - "Frontend: Contact form sends request and shows success toast"
##     - "Frontend: Portfolio section renders inline viewer (fallback to image since current asset is JPG)"
##   stuck_tasks: []
##   test_all: false
##   test_priority: "high_first"

## agent_communication:
##     -agent: "main"
##     -message: "Run backend tests for /api/contact after EMAIL_ENABLED flag change; then run UI tests for contact submission and portfolio inline viewer."
##     -agent: "testing"
##     -message: "Backend testing completed successfully. POST /api/contact returns 201 with status='new' when EMAIL_ENABLED=false (default). All backend APIs working correctly. Ready for UI testing."
##     -agent: "testing"
##     -message: "Frontend UI testing completed successfully. All requested functionality working: 1) Contact form submits to backend with 201 response and shows success toast 'Mesaj gönderildi' 2) Portfolio inline viewer renders JPG image correctly with working 'Büyüt' modal 3) Navbar anchors for 'Portfolyo' and 'Dil & Sertifikalar' navigate correctly 4) CV link opens latest PDF in new tab. No localStorage writes detected as expected. PostHog console warnings ignored as instructed."