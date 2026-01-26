/**
 * API Hooks for Phase-2 Approval Workflows
 * 
 * IMPORTANT:
 * - All hooks check feature flags before execution
 * - Uses Phase-2 GraphQL namespace: phase2Approval
 * - No Phase-1 modifications
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../../api/graphqlRequest';
import {
  APPROVAL_REQUESTS_QUERY,
  APPROVAL_CHAINS_QUERY,
  CREATE_APPROVAL_CHAIN_MUTATION,
  APPROVE_REQUEST_MUTATION,
  REJECT_REQUEST_MUTATION,
} from '../../../graphql/phase2-approval.gql';
import { featureFlagService, Phase2FeatureFlag } from '../../../backend/phase2/services/FeatureFlagService';
import { useHotelStore } from '../../../stores/hotelStore';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Approval requester entity
 * Represents the staff member who initiated an approval request
 * 
 * @property id - User identifier (UUID)
 * @property email - User email address
 * @property role - User role (e.g., "RECEPTIONIST", "MANAGER")
 */
export interface ApprovalRequester {
  id: string;
  email: string;
  role: string;
}

/**
 * Approval approver entity
 * Represents a staff member in the approval chain with their decision status
 * 
 * @property id - User identifier (UUID)
 * @property email - User email address
 * @property role - User role (e.g., "MANAGER", "ADMIN")
 * @property status - Approval decision status
 * @property approvedAt - Timestamp of approval/rejection (ISO 8601 datetime)
 * @property comments - Approver comments/notes (optional)
 * 
 * @remarks
 * - Multiple approvers may be required based on approval chain configuration
 * - Approval chain may require sequential or parallel approvals
 */
export interface ApprovalApprover {
  id: string;
  email: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedAt?: string;
  comments?: string;
}

/**
 * Approval request entity (Phase 2 feature)
 * Represents a request for approval of a sensitive action
 * 
 * @property id - Unique approval request identifier (UUID)
 * @property action - Type of action requiring approval
 * @property requester - Staff member who initiated the request
 * @property approvers - List of approvers in the approval chain
 * @property status - Current approval request status
 * @property entityType - Type of entity being acted upon (e.g., "Booking", "User")
 * @property entityId - Identifier of entity being acted upon
 * @property requestData - Action-specific data (e.g., refund amount, new price)
 * @property createdAt - Request creation timestamp (ISO 8601 datetime)
 * @property expiresAt - Request expiration timestamp (ISO 8601 datetime, optional)
 * @property comments - Requester comments/justification (optional)
 * 
 * @remarks
 * - Approval workflows are configurable per hotel
 * - Requests may expire after a configured time period
 * - Backend enforces approval chain rules and thresholds
 * - Feature flag: APPROVAL_WORKFLOWS_ENABLED
 */
export interface ApprovalRequest {
  id: string;
  action: 'REFUND' | 'CANCELLATION' | 'PRICE_CHANGE' | 'USER_ROLE_CHANGE';
  requester: ApprovalRequester;
  approvers: ApprovalApprover[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  entityType: string;
  entityId: string;
  requestData: Record<string, any>;
  createdAt: string;
  expiresAt?: string;
  comments?: string;
}

/**
 * Approval threshold configuration
 * Defines approval requirements based on amount thresholds
 * 
 * @property amount - Threshold amount (e.g., refunds above this amount require approval)
 * @property approverRoles - List of roles authorized to approve at this threshold
 * 
 * @remarks
 * - Multiple thresholds can be configured for progressive approval chains
 * - Higher amounts may require higher-level approvers
 * - Backend validates approver roles against user permissions
 */
export interface ApprovalThreshold {
  amount: number;
  approverRoles: string[];
}

/**
 * Approval chain configuration (Phase 2 feature)
 * Defines approval workflow rules for specific actions
 * 
 * @property id - Unique approval chain identifier (UUID)
 * @property action - Type of action this chain applies to
 * @property thresholds - List of amount thresholds and required approvers
 * @property isActive - Whether this approval chain is currently active
 * @property createdAt - Chain creation timestamp (ISO 8601 datetime)
 * @property updatedAt - Chain last update timestamp (ISO 8601 datetime)
 * 
 * @remarks
 * - Only one active chain per action type per hotel
 * - Chains can be deactivated without deletion for audit trail
 * - Backend enforces chain rules when actions are initiated
 * - Feature flag: APPROVAL_WORKFLOWS_ENABLED
 */
export interface ApprovalChain {
  id: string;
  action: 'REFUND' | 'CANCELLATION' | 'PRICE_CHANGE' | 'USER_ROLE_CHANGE';
  thresholds: ApprovalThreshold[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Approval request filter parameters
 * Used for filtering and searching approval requests
 * 
 * @property status - Filter by approval status
 * @property requesterId - Filter by requester user ID
 * @property action - Filter by action type
 * @property dateFrom - Filter by creation date (start, ISO 8601 date string)
 * @property dateTo - Filter by creation date (end, ISO 8601 date string)
 * @property hotelId - Filter by hotel context (multi-tenancy)
 * 
 * @remarks
 * - All filters are optional and can be combined
 * - Backend performs efficient indexed queries
 * - Results are paginated for performance
 */
export interface ApprovalRequestFilters {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  requesterId?: string;
  action?: 'REFUND' | 'CANCELLATION' | 'PRICE_CHANGE' | 'USER_ROLE_CHANGE';
  dateFrom?: string;
  dateTo?: string;
  hotelId?: string;
}

/**
 * Pagination input parameters
 * Standard pagination configuration for list queries
 * 
 * @property page - Page number (1-indexed)
 * @property pageSize - Number of items per page
 * 
 * @remarks
 * - Backend enforces maximum page size limits
 * - Page numbers are 1-indexed for user-friendly display
 */
export interface PaginationInput {
  page: number;
  pageSize: number;
}

/**
 * Generic paginated response wrapper
 * Used for all Phase 2 list endpoints to provide consistent pagination metadata
 * 
 * @template T - The type of items in the data array
 * @property data - Array of items for current page
 * @property totalCount - Total number of items across all pages
 * @property page - Current page number (1-indexed)
 * @property pageSize - Number of items per page
 * 
 * @example
 * ```typescript
 * const response: PaginatedResponse<ApprovalRequest> = {
 *   data: [...],
 *   totalCount: 50,
 *   page: 1,
 *   pageSize: 10
 * };
 * ```
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// ============================================================================
// QUERIES
// ============================================================================

export const useApprovalRequests = (
  filters: ApprovalRequestFilters,
  pagination: PaginationInput,
  enabled: boolean = true
) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<PaginatedResponse<ApprovalRequest>>({
    queryKey: ['phase2', 'approval', 'requests', filters, pagination, hotelId],
    queryFn: async () => {
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.APPROVAL_WORKFLOWS_ENABLED
      );
      if (!isEnabled) {
        return { data: [], totalCount: 0, page: pagination.page, pageSize: pagination.pageSize };
      }

      const data = await graphqlRequest<{
        phase2Approval: {
          requests: PaginatedResponse<ApprovalRequest>;
        };
      }>(APPROVAL_REQUESTS_QUERY, { filters, pagination });
      
      return data.phase2Approval.requests;
    },
    enabled: enabled && !!hotelId,
  });
};

export const useApprovalChains = (enabled: boolean = true) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<ApprovalChain[]>({
    queryKey: ['phase2', 'approval', 'chains', hotelId],
    queryFn: async () => {
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.APPROVAL_WORKFLOWS_ENABLED
      );
      if (!isEnabled) {
        return [];
      }

      const data = await graphqlRequest<{
        phase2Approval: {
          chains: ApprovalChain[];
        };
      }>(APPROVAL_CHAINS_QUERY);
      
      return data.phase2Approval.chains;
    },
    enabled: enabled && !!hotelId,
  });
};

// ============================================================================
// MUTATIONS
// ============================================================================

export const useCreateApprovalChain = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: {
      action: 'REFUND' | 'CANCELLATION' | 'PRICE_CHANGE' | 'USER_ROLE_CHANGE';
      thresholds: ApprovalThreshold[];
      isActive: boolean;
    }) => {
      const data = await graphqlRequest<{
        phase2Approval: {
          createChain: {
            success: boolean;
            message?: string;
            chain?: ApprovalChain;
          };
        };
      }>(CREATE_APPROVAL_CHAIN_MUTATION, { input });
      
      return data.phase2Approval.createChain;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'approval', 'chains'] });
    },
  });
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { requestId: string; comments?: string }) => {
      const data = await graphqlRequest<{
        phase2Approval: {
          approve: {
            success: boolean;
            message?: string;
            request?: ApprovalRequest;
          };
        };
      }>(APPROVE_REQUEST_MUTATION, params);
      
      return data.phase2Approval.approve;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'approval', 'requests'] });
    },
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { requestId: string; comments: string }) => {
      const data = await graphqlRequest<{
        phase2Approval: {
          reject: {
            success: boolean;
            message?: string;
            request?: ApprovalRequest;
          };
        };
      }>(REJECT_REQUEST_MUTATION, params);
      
      return data.phase2Approval.reject;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'approval', 'requests'] });
    },
  });
};
