/**
 * API Hooks for Phase-2 Communication Automation
 * 
 * IMPORTANT:
 * - All hooks check feature flags before execution
 * - Uses Phase-2 GraphQL namespace: phase2Communication
 * - No Phase-1 modifications
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../../api/graphqlRequest';
import {
  COMMUNICATION_LOGS_QUERY,
  COMMUNICATION_TEMPLATES_QUERY,
  COMMUNICATION_TRIGGERS_QUERY,
  SEND_TEST_COMMUNICATION_MUTATION,
  CREATE_COMMUNICATION_TEMPLATE_MUTATION,
  UPDATE_COMMUNICATION_TEMPLATE_MUTATION,
  CONFIGURE_COMMUNICATION_TRIGGER_MUTATION,
  RESEND_COMMUNICATION_MUTATION,
} from '../../../graphql/phase2-communication.gql';
import { featureFlagService, Phase2FeatureFlag } from '../../../backend/phase2/services/FeatureFlagService';
import { useHotelStore } from '../../../stores/hotelStore';

// ============================================================================
// TYPES
// ============================================================================

export interface CommunicationLog {
  id: string;
  recipient: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  template?: {
    id: string;
    name: string;
  };
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'READ';
  sentAt?: string;
  deliveredAt?: string;
  error?: string;
  retryCount: number;
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  category: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  subject?: string;
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationTrigger {
  id: string;
  event: string;
  templateId: string;
  template?: CommunicationTemplate;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  isEnabled: boolean;
  conditions?: Record<string, any>;
}

export interface CommunicationLogFilters {
  recipient?: string;
  channel?: 'EMAIL' | 'SMS' | 'WHATSAPP';
  templateId?: string;
  status?: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'READ';
  dateFrom?: string;
  dateTo?: string;
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

export const useCommunicationLogs = (
  filters: CommunicationLogFilters,
  pagination: PaginationInput,
  enabled: boolean = true
) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<PaginatedResponse<CommunicationLog>>({
    queryKey: ['phase2', 'communication', 'logs', filters, pagination, hotelId],
    queryFn: async () => {
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.COMMUNICATION_LOGS_ENABLED
      );
      if (!isEnabled) {
        return { data: [], totalCount: 0, page: pagination.page, pageSize: pagination.pageSize };
      }

      const data = await graphqlRequest<{
        phase2Communication: {
          logs: PaginatedResponse<CommunicationLog>;
        };
      }>(COMMUNICATION_LOGS_QUERY, { filters, pagination });
      
      return data.phase2Communication.logs;
    },
    enabled: enabled && !!hotelId,
  });
};

export const useCommunicationTemplates = (category?: string, enabled: boolean = true) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<CommunicationTemplate[]>({
    queryKey: ['phase2', 'communication', 'templates', category, hotelId],
    queryFn: async () => {
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.COMMUNICATION_TEMPLATES_ENABLED
      );
      if (!isEnabled) {
        return [];
      }

      const data = await graphqlRequest<{
        phase2Communication: {
          templates: CommunicationTemplate[];
        };
      }>(COMMUNICATION_TEMPLATES_QUERY, { category });
      
      return data.phase2Communication.templates;
    },
    enabled: enabled && !!hotelId,
  });
};

export const useCommunicationTriggers = (enabled: boolean = true) => {
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useQuery<CommunicationTrigger[]>({
    queryKey: ['phase2', 'communication', 'triggers', hotelId],
    queryFn: async () => {
      // Check feature flag
      const isEnabled = await featureFlagService.isEnabled(
        hotelId || '',
        Phase2FeatureFlag.COMMUNICATION_AUTOMATION_ENABLED
      );
      if (!isEnabled) {
        return [];
      }

      const data = await graphqlRequest<{
        phase2Communication: {
          triggers: CommunicationTrigger[];
        };
      }>(COMMUNICATION_TRIGGERS_QUERY);
      
      return data.phase2Communication.triggers;
    },
    enabled: enabled && !!hotelId,
  });
};

// ============================================================================
// MUTATIONS
// ============================================================================

export const useSendTestCommunication = () => {
  const queryClient = useQueryClient();
  const { activeHotelId: hotelId } = useHotelStore();
  
  return useMutation({
    mutationFn: async (input: {
      templateId: string;
      channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
      recipient: string;
      variables?: Record<string, string>;
    }) => {
      const data = await graphqlRequest<{
        phase2Communication: {
          sendTest: {
            success: boolean;
            message?: string;
            communicationLog?: CommunicationLog;
          };
        };
      }>(SEND_TEST_COMMUNICATION_MUTATION, { input });
      
      return data.phase2Communication.sendTest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'communication', 'logs'] });
    },
  });
};

export const useCreateCommunicationTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: {
      name: string;
      category: string;
      channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
      subject?: string;
      body: string;
      variables: string[];
    }) => {
      const data = await graphqlRequest<{
        phase2Communication: {
          createTemplate: {
            success: boolean;
            message?: string;
            template?: CommunicationTemplate;
          };
        };
      }>(CREATE_COMMUNICATION_TEMPLATE_MUTATION, { input });
      
      return data.phase2Communication.createTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'communication', 'templates'] });
    },
  });
};

export const useUpdateCommunicationTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: {
      templateId: string;
      input: {
        name?: string;
        category?: string;
        subject?: string;
        body?: string;
        variables?: string[];
        isActive?: boolean;
      };
    }) => {
      const data = await graphqlRequest<{
        phase2Communication: {
          updateTemplate: {
            success: boolean;
            message?: string;
            template?: CommunicationTemplate;
          };
        };
      }>(UPDATE_COMMUNICATION_TEMPLATE_MUTATION, params);
      
      return data.phase2Communication.updateTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'communication', 'templates'] });
      queryClient.invalidateQueries({ queryKey: ['phase2', 'communication', 'triggers'] });
    },
  });
};

export const useConfigureCommunicationTrigger = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: {
      event: string;
      templateId: string;
      channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
      isEnabled: boolean;
      conditions?: Record<string, any>;
    }) => {
      const data = await graphqlRequest<{
        phase2Communication: {
          configureTrigger: {
            success: boolean;
            message?: string;
            trigger?: CommunicationTrigger;
          };
        };
      }>(CONFIGURE_COMMUNICATION_TRIGGER_MUTATION, { input });
      
      return data.phase2Communication.configureTrigger;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'communication', 'triggers'] });
    },
  });
};

export const useResendCommunication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (communicationLogId: string) => {
      const data = await graphqlRequest<{
        phase2Communication: {
          resend: {
            success: boolean;
            message?: string;
            communicationLog?: CommunicationLog;
          };
        };
      }>(RESEND_COMMUNICATION_MUTATION, { communicationLogId });
      
      return data.phase2Communication.resend;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phase2', 'communication', 'logs'] });
    },
  });
};
