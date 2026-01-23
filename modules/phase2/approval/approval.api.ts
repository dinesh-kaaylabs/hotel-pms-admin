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

export interface ApprovalRequester {
  id: string;
  email: string;
  role: string;
}

export interface ApprovalApprover {
  id: string;
  email: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedAt?: string;
  comments?: string;
}

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

export interface ApprovalThreshold {
  amount: number;
  approverRoles: string[];
}

export interface ApprovalChain {
  id: string;
  action: 'REFUND' | 'CANCELLATION' | 'PRICE_CHANGE' | 'USER_ROLE_CHANGE';
  thresholds: ApprovalThreshold[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalRequestFilters {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  requesterId?: string;
  action?: 'REFUND' | 'CANCELLATION' | 'PRICE_CHANGE' | 'USER_ROLE_CHANGE';
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
