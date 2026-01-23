import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { 
  HousekeepingRoom, 
  CleaningLog, 
  HousekeepingStatus, 
  HousekeepingSummary 
} from './housekeeping.types';
import { 
  HOUSEKEEPING_ROOMS_QUERY, 
  HOUSEKEEPING_SUMMARY_QUERY, 
  UPDATE_HOUSEKEEPING_STATUS_MUTATION,
  CLEANING_LOGS_QUERY
} from '../../graphql/housekeeping.gql';

export const useHousekeepingRooms = () => {
  return useQuery<HousekeepingRoom[]>({
    queryKey: ['housekeeping', 'rooms'],
    queryFn: async () => {
      const data = await graphqlRequest<{ housekeepingRooms: HousekeepingRoom[] }>(HOUSEKEEPING_ROOMS_QUERY);
      return data.housekeepingRooms;
    },
  });
};

export const useHousekeepingSummary = () => {
  return useQuery<HousekeepingSummary>({
    queryKey: ['housekeeping', 'summary'],
    queryFn: async () => {
      const data = await graphqlRequest<{ housekeepingSummary: HousekeepingSummary }>(HOUSEKEEPING_SUMMARY_QUERY);
      return data.housekeepingSummary;
    },
  });
};

export const useCleaningLogs = (roomId: string | null) => {
  return useQuery<CleaningLog[]>({
    queryKey: ['housekeeping', 'logs', roomId],
    queryFn: async () => {
      const data = await graphqlRequest<{ cleaningLogs: CleaningLog[] }>(CLEANING_LOGS_QUERY, { roomId });
      return data.cleaningLogs;
    },
    enabled: !!roomId,
  });
};

export const useUpdateHousekeepingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomId, status, note }: { roomId: string; status: HousekeepingStatus; note?: string }) => {
      return graphqlRequest<{ updateHousekeepingStatus: { success: boolean } }>(UPDATE_HOUSEKEEPING_STATUS_MUTATION, { roomId, status, note });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['housekeeping'] });
    },
  });
};
