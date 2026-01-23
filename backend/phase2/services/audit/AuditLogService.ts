/**
 * Phase-2 Audit Log Service
 * 
 * Service for managing audit logs.
 * Audit logs are append-only and immutable.
 */

// ============================================================================
// AUDIT ACTION TYPES
// ============================================================================

export enum AuditAction {
  // Booking Actions
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_UPDATED = 'BOOKING_UPDATED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  
  // Check-in/Check-out Actions
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  
  // Payment Actions
  PAYMENT_RECORDED = 'PAYMENT_RECORDED',
  REFUND_PROCESSED = 'REFUND_PROCESSED',
  
  // Invoice Actions
  INVOICE_GENERATED = 'INVOICE_GENERATED',
  INVOICE_SENT = 'INVOICE_SENT',
  
  // Pricing Actions
  PRICE_CHANGED = 'PRICE_CHANGED',
  
  // User Actions
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_ROLE_CHANGED = 'USER_ROLE_CHANGED',
  
  // Room Actions
  ROOM_STATUS_CHANGED = 'ROOM_STATUS_CHANGED',
  
  // Guest Actions
  GUEST_CREATED = 'GUEST_CREATED',
  GUEST_UPDATED = 'GUEST_UPDATED',
}

// ============================================================================
// AUDIT LOG ENTITY TYPES
// ============================================================================

export enum AuditEntityType {
  BOOKING = 'BOOKING',
  GUEST = 'GUEST',
  INVOICE = 'INVOICE',
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  ROOM = 'ROOM',
  USER = 'USER',
  PRICING = 'PRICING',
}

// ============================================================================
// AUDIT LOG MODEL
// ============================================================================

export interface AuditLog {
  id: string;
  action: AuditAction;
  actor: {
    id: string;
    email: string;
    role: string;
  };
  entityType: AuditEntityType;
  entityId: string;
  beforeValues?: Record<string, any>; // For updates
  afterValues?: Record<string, any>; // For updates
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  hotelId: string;
  metadata?: Record<string, any>; // Additional context
}

// ============================================================================
// AUDIT LOG FILTERS
// ============================================================================

export interface AuditLogFilters {
  action?: AuditAction;
  actorId?: string;
  entityType?: AuditEntityType;
  entityId?: string;
  dateFrom?: string;
  dateTo?: string;
  hotelId?: string;
}

// ============================================================================
// AUDIT LOG SERVICE
// ============================================================================

/**
 * Audit Log Service
 * 
 * Service for querying audit logs.
 * Audit logs are created automatically by backend middleware.
 */
export class AuditLogService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || '/api/phase2/audit';
  }

  /**
   * Query audit logs with filters
   * @param filters Filter criteria
   * @param pagination Pagination parameters
   * @returns Audit logs and pagination info
   */
  async queryLogs(
    filters: AuditLogFilters,
    pagination?: { page: number; pageSize: number }
  ): Promise<{
    data: AuditLog[];
    totalCount: number;
    page: number;
    pageSize: number;
  }> {
    try {
      // Backend API call would go here
      // TODO: Implement actual API call to backend
      
      // Mock response for now
      return {
        data: [],
        totalCount: 0,
        page: pagination?.page || 1,
        pageSize: pagination?.pageSize || 25,
      };
    } catch (error) {
      throw new Error(
        `Failed to query audit logs: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get audit log detail by ID
   * @param auditLogId Audit log ID
   * @returns Audit log detail
   */
  async getLogDetail(auditLogId: string): Promise<AuditLog> {
    try {
      // Backend API call would go here
      // TODO: Implement actual API call to backend
      
      throw new Error('Not implemented');
    } catch (error) {
      throw new Error(
        `Failed to get audit log: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get user activity logs
   * @param userId User ID
   * @param filters Additional filters
   * @returns User activity logs
   */
  async getUserActivity(
    userId: string,
    filters?: { dateFrom?: string; dateTo?: string }
  ): Promise<{
    loginLogs: Array<{
      timestamp: string;
      ipAddress?: string;
      success: boolean;
      failureReason?: string;
    }>;
    logoutLogs: Array<{
      timestamp: string;
    }>;
    permissionChanges: Array<{
      timestamp: string;
      changedBy: string;
      oldPermissions: string[];
      newPermissions: string[];
    }>;
    roleChanges: Array<{
      timestamp: string;
      changedBy: string;
      oldRole: string;
      newRole: string;
    }>;
  }> {
    try {
      // Backend API call would go here
      // TODO: Implement actual API call to backend
      
      return {
        loginLogs: [],
        logoutLogs: [],
        permissionChanges: [],
        roleChanges: [],
      };
    } catch (error) {
      throw new Error(
        `Failed to get user activity: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

// ============================================================================
// AUDIT LOG MIDDLEWARE (Backend Integration)
// ============================================================================

/**
 * Audit Log Middleware
 * 
 * This interface defines how backend should integrate audit logging.
 * Backend middleware should:
 * 1. Intercept Phase-1 mutations
 * 2. Extract action, actor, entity info
 * 3. Capture before/after values (for updates)
 * 4. Create audit log entry (append-only)
 * 5. Continue with Phase-1 execution (non-blocking)
 */
export interface IAuditLogMiddleware {
  /**
   * Log an action
   * @param action The action being performed
   * @param actor The user performing the action
   * @param entityType The type of entity being acted upon
   * @param entityId The ID of the entity
   * @param beforeValues Values before update (for updates)
   * @param afterValues Values after update (for updates)
   * @param metadata Additional metadata
   */
  logAction(
    action: AuditAction,
    actor: { id: string; email: string; role: string },
    entityType: AuditEntityType,
    entityId: string,
    beforeValues?: Record<string, any>,
    afterValues?: Record<string, any>,
    metadata?: Record<string, any>
  ): Promise<void>;
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const auditLogService = new AuditLogService();
