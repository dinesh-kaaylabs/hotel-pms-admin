/**
 * API Hooks for Phase-2 Audit Logs
 * 
 * IMPORTANT:
 * - All hooks check feature flags before execution
 * - Uses Phase-2 GraphQL namespace: phase2Audit
 * - Audit logs are read-only
 */

import { useQuery } from '@tanstack/react-query';
import { graphqlRequest } from '../../../api/graphqlRequest';
import {
  AUDIT_LOGS_QUERY,
  AUDIT_LOG_DETAIL_QUERY,
  USER_ACTIVITY_LOGS_QUERY,
} from '../../../graphql/phase2-audit.gql';
import { featureFlagService, Phase2FeatureFlag } from '../../../backend/phase2/services/FeatureFlagService';
import { useHotelStore } from '../../../stores/hotelStore';

// ============================================================================
// TYPES
// ============================================================================

export interface AuditActor {
  id: string;
  email: string;
  role: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: AuditActor;
  entityType: string;
  entityId: string;
  beforeValues?: Record<string, any>;
  afterValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  hotelId: string;
}

export interface AuditLogDetail extends AuditLog {
  diff?: Record<string, any>;
}

export interface AuditLogFilters {
  action?: string;
  actorId?: string;
  entityType?: string;
  entityId?: string;
  dateFrom?: string;
  dateTo?: string;
  hotelId?: string;
}

export interface PaginationInput {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface UserActivity {
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
}

export interface UserActivityFilters {
  dateFrom?: string;
  dateTo?: string;
}

// ============================================================================
// QUERIES
// ============================================================================

export const useAuditLogs = (
  filters: AuditLogFilters,
  pagination: PaginationInput,
  enabled: boolean = true
) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<PaginatedResponse<AuditLog>>({
    queryKey: ['phase2', 'audit', 'logs', filters, pagination, hotelId],
    queryFn: async () => {
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.AUDIT_LOGS_ENABLED
      );
      if (!isEnabled) {
        return { data: [], totalCount: 0, page: pagination.page, pageSize: pagination.pageSize };
      }

      const data = await graphqlRequest<{
        phase2Audit: {
          logs: PaginatedResponse<AuditLog>;
        };
      }>(AUDIT_LOGS_QUERY, { filters, pagination });
      
      return data.phase2Audit.logs;
    },
    enabled: enabled && !!hotelId,
  });
};

export const useAuditLogDetail = (auditLogId: string | null, enabled: boolean = true) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<AuditLogDetail>({
    queryKey: ['phase2', 'audit', 'log', auditLogId, hotelId],
    queryFn: async () => {
      if (!auditLogId) throw new Error('Audit log ID required');
      
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.AUDIT_LOGS_ENABLED
      );
      if (!isEnabled) {
        throw new Error('Audit logs feature is disabled');
      }

      const data = await graphqlRequest<{
        phase2Audit: {
          logDetail: AuditLogDetail;
        };
      }>(AUDIT_LOG_DETAIL_QUERY, { auditLogId });
      
      return data.phase2Audit.logDetail;
    },
    enabled: enabled && !!hotelId && !!auditLogId,
  });
};

export const useUserActivityLogs = (
  userId: string | null,
  filters?: UserActivityFilters,
  enabled: boolean = true
) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<UserActivity>({
    queryKey: ['phase2', 'audit', 'userActivity', userId, filters, hotelId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID required');
      
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.AUDIT_LOGS_ENABLED
      );
      if (!isEnabled) {
        return {
          loginLogs: [],
          logoutLogs: [],
          permissionChanges: [],
          roleChanges: [],
        };
      }

      const data = await graphqlRequest<{
        phase2Audit: {
          userActivity: UserActivity;
        };
      }>(USER_ACTIVITY_LOGS_QUERY, { userId, filters });
      
      return data.phase2Audit.userActivity;
    },
    enabled: enabled && !!hotelId && !!userId,
  });
};
