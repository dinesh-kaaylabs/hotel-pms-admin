import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Room, RoomType, RoomInventory, BulkUpdateInventoryPayload } from './rooms.types';
import { 
  ROOMS_QUERY,
  CREATE_ROOM_MUTATION,
  UPDATE_ROOM_MUTATION,
  DELETE_ROOM_MUTATION,
  ROOM_TYPES_QUERY, 
  CREATE_ROOM_TYPE_MUTATION, 
  UPDATE_ROOM_TYPE_MUTATION,
  DELETE_ROOM_TYPE_MUTATION,
  ROOM_INVENTORY_QUERY, 
  BULK_UPDATE_INVENTORY_MUTATION 
} from '../../graphql/room.gql';

export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const data = await graphqlRequest<{ rooms: Room[] }>(ROOMS_QUERY);
      return data.rooms;
    },
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<Room>) => {
      const data = await graphqlRequest<{ createRoom: Room }>(CREATE_ROOM_MUTATION, { input });
      return data.createRoom;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<Room> }) => {
      const data = await graphqlRequest<{ updateRoom: Room }>(UPDATE_ROOM_MUTATION, { id, input });
      return data.updateRoom;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlRequest<{ deleteRoom: { success: boolean } }>(DELETE_ROOM_MUTATION, { id });
      return data.deleteRoom;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

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
    mutationFn: async (input: Partial<RoomType>) => {
      const data = await graphqlRequest<{ createRoomType: RoomType }>(CREATE_ROOM_TYPE_MUTATION, { input });
      return data.createRoomType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] });
    },
  });
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<RoomType> }) => {
      return graphqlRequest<{ updateRoomType: { success: boolean } }>(UPDATE_ROOM_TYPE_MUTATION, { id, input });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types'] });
    },
  });
};

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlRequest<{ deleteRoomType: { success: boolean } }>(DELETE_ROOM_TYPE_MUTATION, { id });
      return data.deleteRoomType;
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

/**
 * Hook to get room inventory summary by room type for dashboard widget
 * Groups rooms by type and calculates available vs total
 */
export const useRoomInventorySummary = () => {
  const { data: rooms = [] } = useRooms();
  const { data: roomTypes = [] } = useRoomTypes();

  return useQuery({
    queryKey: ['room-inventory-summary', rooms.length, roomTypes.length],
    queryFn: () => {
      // Group rooms by type and calculate availability
      const summary = roomTypes.map(type => {
        const typeRooms = rooms.filter(r => r.roomTypeId === type.id);
        const availableRooms = typeRooms.filter(r => r.status === 'CLEAN' || r.status === 'AVAILABLE');
        
        return {
          type: type.name,
          count: availableRooms.length,
          total: typeRooms.length,
          roomTypeId: type.id,
        };
      }).filter(item => item.total > 0); // Only show types that have rooms

      return summary;
    },
    enabled: rooms.length > 0 && roomTypes.length > 0,
  });
};
