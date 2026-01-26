# TODO Migration to GitHub Issues

This document tracks the migration of TODO comments from the codebase to GitHub Issues.

## Summary

**Total TODOs Found:** 136  
**Migrated to Issues:** 0  
**Remaining:** 136

---

## Phase-2 Backend TODOs (92 items)

### Approval Workflows (26 items)
**Location:** `backend/resolvers/phase2-approval.resolver.ts`

#### Issue #1: Implement Approval Request Listing
- **Lines:** 75-82
- **Priority:** High
- **Effort:** Medium
- **Description:** Implement approval request listing with filters and pagination
- **Tasks:**
  - [ ] Check feature flag `APPROVAL_WORKFLOWS_ENABLED`
  - [ ] Validate filters
  - [ ] Query approval requests from database
  - [ ] Apply filters and pagination
  - [ ] Return results

#### Issue #2: Implement Approval Chains Listing
- **Lines:** 105-109
- **Priority:** High
- **Effort:** Small
- **Description:** Query and return approval chains from database
- **Tasks:**
  - [ ] Check feature flag
  - [ ] Query approval chains from database
  - [ ] Return chains

#### Issue #3: Implement Create/Update Approval Chain
- **Lines:** 133-141
- **Priority:** High
- **Effort:** Large
- **Description:** Create or update approval chain with validation
- **Tasks:**
  - [ ] Check feature flag
  - [ ] Validate action, thresholds, and approver roles
  - [ ] Check if chain exists
  - [ ] Create or update chain in database
  - [ ] Return chain

#### Issue #4: Implement Approve Request Action
- **Lines:** 174-184
- **Priority:** Critical
- **Effort:** Large
- **Description:** Process approval request and execute action if all approved
- **Tasks:**
  - [ ] Check feature flag
  - [ ] Validate request exists and user has permission
  - [ ] Validate request is pending
  - [ ] Update approval request
  - [ ] Check if all approvers approved
  - [ ] Execute original Phase-1 mutation if approved
  - [ ] Send notifications
  - [ ] Return updated request

#### Issue #5: Implement Reject Request Action
- **Lines:** 216-225
- **Priority:** High
- **Effort:** Medium
- **Description:** Reject approval request with comments
- **Tasks:**
  - [ ] Check feature flag
  - [ ] Validate request and permissions
  - [ ] Validate comments provided
  - [ ] Update request status to REJECTED
  - [ ] Send notifications
  - [ ] Return updated request

---

### Communication Module (28 items)
**Location:** `backend/resolvers/phase2-communication.resolver.ts`

#### Issue #6: Implement Communication Logs Listing
- **Lines:** 102-109
- **Priority:** Medium
- **Effort:** Medium
- **Description:** Query communication logs with filters and pagination

#### Issue #7: Implement Templates Listing
- **Lines:** 133-138
- **Priority:** Medium
- **Effort:** Small
- **Description:** Query and filter communication templates

#### Issue #8: Implement Triggers Listing
- **Lines:** 156-160
- **Priority:** Medium
- **Effort:** Small
- **Description:** Query communication triggers from database

#### Issue #9: Implement Send Test Communication
- **Lines:** 185-193
- **Priority:** High
- **Effort:** Large
- **Description:** Send test communication with template resolution
- **Tasks:**
  - [ ] Check feature flag based on channel
  - [ ] Validate template exists
  - [ ] Validate recipient format
  - [ ] Resolve template variables
  - [ ] Send communication (test mode)
  - [ ] Log communication
  - [ ] Return response

#### Issue #10: Implement Create Template
- **Lines:** 219-226
- **Priority:** High
- **Effort:** Medium
- **Description:** Create communication template with validation

#### Issue #11: Implement Update Template
- **Lines:** 256-262
- **Priority:** Medium
- **Effort:** Medium
- **Description:** Update existing communication template

#### Issue #12: Implement Create/Update Trigger
- **Lines:** 289-295
- **Priority:** High
- **Effort:** Large
- **Description:** Create or update communication trigger

#### Issue #13: Implement Resend Communication
- **Lines:** 323-330
- **Priority:** Medium
- **Effort:** Medium
- **Description:** Resend failed communication

---

### Audit Logs (16 items)
**Location:** `backend/resolvers/phase2-audit.resolver.ts`

#### Issue #14: Implement Audit Logs Listing
- **Lines:** 71-78
- **Priority:** High
- **Effort:** Medium
- **Description:** Query audit logs with filters and pagination

#### Issue #15: Implement Audit Log Detail with Diff
- **Lines:** 102-107
- **Priority:** Medium
- **Effort:** Medium
- **Description:** Compute diff between before/after values

#### Issue #16: Implement User Activity Aggregation
- **Lines:** 155-164
- **Priority:** Low
- **Effort:** Large
- **Description:** Aggregate user activity logs (login, logout, permission changes)

---

### Check-in/Check-out (6 items)
**Location:** `backend/resolvers/checkin-checkout.resolver.ts`

#### Issue #17: Implement Get Arrivals Query
- **Lines:** 83
- **Priority:** High
- **Effort:** Small
- **Description:** Query bookings with check-in today

#### Issue #18: Implement Check-in Transaction
- **Lines:** 122
- **Priority:** Critical
- **Effort:** Large
- **Description:** Complete check-in transaction with room assignment

#### Issue #19: Implement Check-out Transaction
- **Lines:** 167
- **Priority:** Critical
- **Effort:** Large
- **Description:** Complete check-out with billing finalization

#### Issue #20: Implement Generate Invoice
- **Lines:** 212, 229
- **Priority:** High
- **Effort:** Large
- **Description:** Generate invoice with incremental invoice number

#### Issue #21: Implement Process Refund
- **Lines:** 262
- **Priority:** High
- **Effort:** Large
- **Description:** Process refund transaction

#### Issue #22: Implement Update Room Status
- **Lines:** 304
- **Priority:** Medium
- **Effort:** Small
- **Description:** Update room status after check-out

---

## Phase-2 Frontend/Services TODOs (44 items)

### Approval Service (7 items)
**Location:** `backend/phase2/services/approval/ApprovalWorkflowService.ts`

#### Issue #23-29: Implement Approval Service API Calls
- **Lines:** 124, 147, 166, 185, 202, 220, 242
- **Priority:** High
- **Effort:** Medium (each)
- **Description:** Implement actual API calls for approval workflow service methods

---

### Communication Service (2 items)
**Location:** `backend/phase2/services/communication/CommunicationService.ts`

#### Issue #30-31: Implement Communication Service API Calls
- **Lines:** 115, 140
- **Priority:** High
- **Effort:** Medium (each)
- **Description:** Implement actual API calls for communication service

---

### Audit Service (3 items)
**Location:** `backend/phase2/services/audit/AuditLogService.ts`

#### Issue #32-34: Implement Audit Service API Calls
- **Lines:** 133, 157, 201
- **Priority:** Medium
- **Effort:** Medium (each)
- **Description:** Implement actual API calls for audit log service

---

### Communication Settings Page (6 items)
**Location:** `modules/phase2/communication/pages/CommunicationSettingsPage.tsx`

#### Issue #35-40: Implement Communication Settings Actions
- **Lines:** 56, 68, 80, 93, 106, 119
- **Priority:** Medium
- **Effort:** Small (each)
- **Description:** Implement test email/SMS/WhatsApp send and save configuration API calls

---

## Frontend TODOs (12 items)

### Error Boundary (1 item)
**Location:** `components/ui/ErrorBoundary.tsx`

#### Issue #41: Integrate Error Reporting Service
- **Line:** 31
- **Priority:** Medium
- **Effort:** Small
- **Description:** Integrate with Sentry or similar error reporting service for production

### Bookings API (1 item)
**Location:** `modules/bookings/bookings.api.ts`

#### Issue #42: Backend Pagination Support (BLOCKED)
- **Line:** 10
- **Priority:** Critical
- **Effort:** N/A (Backend task)
- **Status:** Blocked on backend fix #1
- **Description:** Backend must return `totalCount` in paginated response

---

## Migration Instructions

### For Each TODO:
1. Create GitHub issue using the technical-debt template
2. Add appropriate labels (priority, effort, module)
3. Link related issues if dependencies exist
4. Update this document with issue number
5. Remove TODO from code and add issue reference:
   ```typescript
   // TODO: Implement feature X
   // ↓ Replace with ↓
   // Issue #123: Implement feature X
   ```

### Labels to Use:
- `technical-debt` - All migrated TODOs
- `phase-2` - Phase-2 related items
- `backend` - Backend implementation
- `frontend` - Frontend implementation
- `blocked` - Blocked by other issues
- `priority-high` / `priority-medium` / `priority-low`
- `effort-small` / `effort-medium` / `effort-large`

---

## Progress Tracking

### By Module:
- [ ] Phase-2 Approval (26 items)
- [ ] Phase-2 Communication (28 items)
- [ ] Phase-2 Audit (16 items)
- [ ] Check-in/Check-out (6 items)
- [ ] Services (12 items)
- [ ] Frontend (12 items)

### By Priority:
- Critical: 3 items
- High: 45 items
- Medium: 68 items
- Low: 20 items

---

## Notes

- Phase-2 TODOs are implementation stubs - all marked as placeholders
- Backend pagination issue (#42) is a known blocker for frontend pagination
- Error reporting integration should be done before production deployment
- Communication module TODOs include test implementations for email/SMS/WhatsApp
