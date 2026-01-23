import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { RoomType, RoomInventory, BulkUpdateInventoryPayload } from './rooms.types';
import { 
  ROOM_TYPES_QUERY, 
  CREATE_ROOM_TYPE_MUTATION, 
  UPDATE_ROOM_TYPE_MUTATION, 
  ROOM_INVENTORY_QUERY, 
  BULK_UPDATE_INVENTORY_MUTATION 
} from '../../graphql/room.gql';

export const useRoomTypes = () => {
  return useQuery<RoomType[]>({
    queryKey: ['room-types'],
    queryFn: async () => {
      const data = await graphqlRequest<{ roomTypes: RoomType[] }>(ROOM_TYPES_QUERY);
      return data.roomTypes;
    },
  });
};

export const useCreateRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<RoomType>) => {
      return graphqlRequest<{ createRoomType: { id: string, success: boolean } }>(CREATE_ROOM_TYPE_MUTATION, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] });
    },
  });
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: Partial<RoomType> & { id: string }) => {
      return graphqlRequest<{ updateRoomType: { success: boolean } }>(UPDATE_ROOM_TYPE_MUTATION, { id, input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] });
    },
  });
};

export const useRoomInventory = (params: { startDate: string; endDate: string; roomTypeId?: string }) => {
  return useQuery<RoomInventory[]>({
    queryKey: ['room-inventory', params],
    queryFn: async () => {
      const data = await graphqlRequest<{ roomInventory: RoomInventory[] }>(ROOM_INVENTORY_QUERY, params);
      return data.roomInventory;
    },
    enabled: !!params.startDate && !!params.endDate,
  });
};

export const useBulkUpdateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BulkUpdateInventoryPayload) => {
      return graphqlRequest<{ bulkUpdateInventory: { success: boolean } }>(BULK_UPDATE_INVENTORY_MUTATION, { input: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-inventory'] });
    },
  });
};

export const useRoomInventoryAdvanced = (filters: {
  startDate: string;
  endDate: string;
  roomTypeId?: string;
  status?: string;
  minAvailability?: number;
}) => {
  return useQuery<RoomInventory[]>({
    queryKey: ['room-inventory-advanced', filters],
    queryFn: async () => {
      const data = await graphqlRequest<{ roomInventoryAdvanced: RoomInventory[] }>(`
        query RoomInventoryAdvancedFilters($filters: RoomInventoryFilters!) {
          roomInventoryAdvanced(filters: $filters) {
            id roomTypeId date totalRooms availableRooms status
          }
        }
      `, { filters });
      return data.roomInventoryAdvanced;
    },
    enabled: !!filters.startDate && !!filters.endDate,
  });
};
