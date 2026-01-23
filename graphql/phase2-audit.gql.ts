/**
 * GraphQL Operations for Phase-2 Audit Logs
 * 
 * IMPORTANT:
 * - All operations are feature-flag protected
 * - Namespace: phase2Audit
 * - Audit logs are append-only and immutable
 * - No Phase-1 modifications
 */

// ============================================================================
// ENUMS
// ============================================================================

export const AUDIT_ACTION_ENUM = `
  enum AuditAction {
    BOOKING_CREATED
    BOOKING_UPDATED
    BOOKING_CANCELLED
    CHECK_IN
    CHECK_OUT
    PAYMENT_RECORDED
    REFUND_PROCESSED
    INVOICE_GENERATED
    INVOICE_SENT
    PRICE_CHANGED
    USER_CREATED
    USER_UPDATED
    USER_DELETED
    USER_ROLE_CHANGED
    ROOM_STATUS_CHANGED
    GUEST_CREATED
    GUEST_UPDATED
  }
`;

export const AUDIT_ENTITY_TYPE_ENUM = `
  enum AuditEntityType {
    BOOKING
    GUEST
    INVOICE
    PAYMENT
    REFUND
    ROOM
    USER
    PRICING
  }
`;

// ============================================================================
// INPUT TYPES
// ============================================================================

export const AUDIT_LOG_FILTERS = `
  input AuditLogFilters {
    action: AuditAction
    actorId: ID
    entityType: AuditEntityType
    entityId: ID
    dateFrom: String
    dateTo: String
    hotelId: ID
  }
`;

export const USER_ACTIVITY_FILTERS = `
  input UserActivityFilters {
    dateFrom: String
    dateTo: String
  }
`;

// ============================================================================
// TYPES
// ============================================================================

export const AUDIT_ACTOR_TYPE = `
  type AuditActor {
    id: ID!
    email: String!
    role: String!
  }
`;

export const AUDIT_LOG_TYPE = `
  type AuditLog {
    id: ID!
    action: AuditAction!
    actor: AuditActor!
    entityType: AuditEntityType!
    entityId: ID!
    beforeValues: JSON
    afterValues: JSON
    ipAddress: String
    userAgent: String
    timestamp: String!
    hotelId: ID!
  }
`;

export const AUDIT_LOG_DETAIL_TYPE = `
  type AuditLogDetail {
    id: ID!
    action: AuditAction!
    actor: AuditActor!
    entityType: AuditEntityType!
    entityId: ID!
    beforeValues: JSON
    afterValues: JSON
    ipAddress: String
    userAgent: String
    timestamp: String!
    diff: JSON
  }
`;

export const AUDIT_LOG_PAGINATION_TYPE = `
  type AuditLogPagination {
    data: [AuditLog!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
  }
`;

export const LOGIN_LOG_TYPE = `
  type LoginLog {
    timestamp: String!
    ipAddress: String
    success: Boolean!
    failureReason: String
  }
`;

export const LOGOUT_LOG_TYPE = `
  type LogoutLog {
    timestamp: String!
  }
`;

export const PERMISSION_CHANGE_TYPE = `
  type PermissionChange {
    timestamp: String!
    changedBy: String!
    oldPermissions: [String!]!
    newPermissions: [String!]!
  }
`;

export const ROLE_CHANGE_TYPE = `
  type RoleChange {
    timestamp: String!
    changedBy: String!
    oldRole: String!
    newRole: String!
  }
`;

export const USER_ACTIVITY_TYPE = `
  type UserActivity {
    loginLogs: [LoginLog!]!
    logoutLogs: [LogoutLog!]!
    permissionChanges: [PermissionChange!]!
    roleChanges: [RoleChange!]!
  }
`;

export const PHASE2_AUDIT_TYPE = `
  type Phase2Audit {
    logs(filters: AuditLogFilters, pagination: PaginationInput): AuditLogPagination!
    logDetail(auditLogId: ID!): AuditLogDetail!
    userActivity(userId: ID!, filters: UserActivityFilters): UserActivity!
  }
`;

// ============================================================================
// QUERIES
// ============================================================================

export const AUDIT_LOGS_QUERY = `
  query AuditLogs($filters: AuditLogFilters, $pagination: PaginationInput) {
    phase2Audit {
      logs(filters: $filters, pagination: $pagination) {
        data {
          id
          action
          actor {
            id
            email
            role
          }
          entityType
          entityId
          beforeValues
          afterValues
          ipAddress
          userAgent
          timestamp
          hotelId
        }
        totalCount
        page
        pageSize
      }
    }
  }
`;

export const AUDIT_LOG_DETAIL_QUERY = `
  query AuditLogDetail($auditLogId: ID!) {
    phase2Audit {
      logDetail(auditLogId: $auditLogId) {
        id
        action
        actor {
          id
          email
          role
        }
        entityType
        entityId
        beforeValues
        afterValues
        ipAddress
        userAgent
        timestamp
        diff
      }
    }
  }
`;

export const USER_ACTIVITY_LOGS_QUERY = `
  query UserActivityLogs($userId: ID!, $filters: UserActivityFilters) {
    phase2Audit {
      userActivity(userId: $userId, filters: $filters) {
        loginLogs {
          timestamp
          ipAddress
          success
          failureReason
        }
        logoutLogs {
          timestamp
        }
        permissionChanges {
          timestamp
          changedBy
          oldPermissions
          newPermissions
        }
        roleChanges {
          timestamp
          changedBy
          oldRole
          newRole
        }
      }
    }
  }
`;

// ============================================================================
// ROOT QUERY EXTENSION
// ============================================================================

export const PHASE2_AUDIT_ROOT = `
  extend type Query {
    phase2Audit: Phase2Audit!
  }
`;
