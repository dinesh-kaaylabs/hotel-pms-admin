import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { MaintenanceIssue, CreateMaintenancePayload } from './maintenance.types';
import { 
  MAINTENANCE_ISSUES_QUERY, 
  CREATE_MAINTENANCE_MUTATION, 
  RESOLVE_MAINTENANCE_MUTATION 
} from '../../graphql/maintenance.gql';

export const useMaintenanceIssues = (status?: string) => {
  return useQuery<MaintenanceIssue[]>({
    queryKey: ['maintenance', 'issues', status],
    queryFn: async () => {
      const data = await graphqlRequest<{ maintenanceIssues: MaintenanceIssue[] }>(MAINTENANCE_ISSUES_QUERY, { status });
      return data.maintenanceIssues;
    },
  });
};

export const useCreateMaintenance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateMaintenancePayload) => {
      return graphqlRequest<{ createMaintenance: { success: boolean } }>(CREATE_MAINTENANCE_MUTATION, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      queryClient.invalidateQueries({ queryKey: ['housekeeping'] });
    },
  });
};

export const useResolveMaintenance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return graphqlRequest<{ resolveMaintenance: { success: boolean } }>(RESOLVE_MAINTENANCE_MUTATION, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      queryClient.invalidateQueries({ queryKey: ['housekeeping'] });
    },
  });
};
