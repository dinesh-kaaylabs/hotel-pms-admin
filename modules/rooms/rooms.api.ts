import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlRequest } from '../../api/graphqlRequest';
import { Room, RoomType, RoomInventory, BulkUpdateInventoryPayload } from './rooms.types';
import { 
  ROOMS_QUERY,
  ROOMS_PAGINATED_QUERY,
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

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RoomsQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  hotelId: string | null;
}

/**
 * Legacy hook - loads all rooms (for backward compatibility)
 * @deprecated Use useRoomsPaginated for better performance
 */
export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const data = await graphqlRequest<{ rooms: Room[] }>(ROOMS_QUERY);
      return data.rooms;
    },
  });
};

/**
 * Paginated rooms query with hotel-specific caching and server-side filtering
 * Query keys are hotel-specific to prevent cache collisions in multi-tab scenarios
 */
export const useRoomsPaginated = (params: RoomsQueryParams) => {
  const { hotelId, page, pageSize, search, status } = params;
  
  return useQuery<PaginatedResponse<Room>>({
    queryKey: ['rooms', hotelId, { page, pageSize, search, status }],
    queryFn: async () => {
      // Fallback to legacy query if pagination not supported yet
      try {
        const data = await graphqlRequest<{ roomsPaginated: PaginatedResponse<Room> }>(
          ROOMS_PAGINATED_QUERY,
          { page, pageSize, search: search || null, status: status || null }
        );
        return data.roomsPaginated;
      } catch (err: any) {
        // If paginated query fails, fallback to legacy query and paginate client-side
        // This allows gradual backend migration
        if (err.extensions?.code === 'FIELD_NOT_FOUND' || err.message?.includes('roomsPaginated')) {
          const data = await graphqlRequest<{ rooms: Room[] }>(ROOMS_QUERY);
          const filtered = data.rooms.filter(room => {
            const matchesSearch = !search || room.roomNumber.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = !status || status === 'ALL' || room.status === status;
            return matchesSearch && matchesStatus;
          });
          const start = (page - 1) * pageSize;
          const end = start + pageSize;
          return {
            data: filtered.slice(start, end),
            totalCount: filtered.length,
            page,
            pageSize,
          };
        }
        throw err;
      }
    },
    enabled: !!hotelId && hotelId !== 'pending',
    staleTime: 1000 * 30, // 30 seconds - rooms don't change frequently
  });
};

export const useCreateRoom = (hotelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<Room>) => {
      const data = await graphqlRequest<{ createRoom: Room }>(CREATE_ROOM_MUTATION, { input });
      return data.createRoom;
    },
    onSuccess: (newRoom) => {
      // Invalidate all room queries for this hotel
      queryClient.invalidateQueries({ 
        queryKey: ['rooms', hotelId],
        exact: false 
      });
      // Also invalidate legacy query for backward compatibility
      queryClient.invalidateQueries({ queryKey: ['rooms'], exact: true });
      
      // Optimistic update: Add room to current page if it matches filters
      queryClient.setQueriesData<PaginatedResponse<Room>>(
        { queryKey: ['rooms', hotelId] },
        (old) => {
          if (!old) return old;
          // Only add if it would appear on current page (simple check)
          return {
            ...old,
            data: [...old.data, newRoom],
            totalCount: old.totalCount + 1,
          };
        }
      );
    },
  });
};

export const useUpdateRoom = (hotelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<Room> }) => {
      const data = await graphqlRequest<{ updateRoom: Room }>(UPDATE_ROOM_MUTATION, { id, input });
      return data.updateRoom;
    },
    onMutate: async ({ id, input }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['rooms', hotelId] });
      
      // Snapshot previous value for rollback
      const previousRooms = queryClient.getQueriesData<PaginatedResponse<Room>>({ 
        queryKey: ['rooms', hotelId] 
      });
      
      // Optimistically update
      queryClient.setQueriesData<PaginatedResponse<Room>>(
        { queryKey: ['rooms', hotelId] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map(room => 
              room.id === id ? { ...room, ...input } : room
            ),
          };
        }
      );
      
      return { previousRooms };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousRooms) {
        context.previousRooms.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: () => {
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ 
        queryKey: ['rooms', hotelId],
        exact: false 
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'], exact: true });
    },
  });
};

export const useDeleteRoom = (hotelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlRequest<{ deleteRoom: { success: boolean } }>(DELETE_ROOM_MUTATION, { id });
      return data.deleteRoom;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['rooms', hotelId] });
      
      const previousRooms = queryClient.getQueriesData<PaginatedResponse<Room>>({ 
        queryKey: ['rooms', hotelId] 
      });
      
      // Optimistically remove room
      queryClient.setQueriesData<PaginatedResponse<Room>>(
        { queryKey: ['rooms', hotelId] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter(room => room.id !== id),
            totalCount: Math.max(0, old.totalCount - 1),
          };
        }
      );
      
      return { previousRooms };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousRooms) {
        context.previousRooms.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['rooms', hotelId],
        exact: false 
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'], exact: true });
    },
  });
};

export const useRoomTypes = (hotelId: string | null) => {
  return useQuery<RoomType[]>({
    queryKey: ['room-types', hotelId],
    queryFn: async () => {
      const data = await graphqlRequest<{ roomTypes: RoomType[] }>(ROOM_TYPES_QUERY);
      return data.roomTypes;
    },
    enabled: !!hotelId && hotelId !== 'pending',
    staleTime: 1000 * 60 * 5, // 5 minutes - room types change infrequently
  });
};

export const useCreateRoomType = (hotelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<RoomType>) => {
      const data = await graphqlRequest<{ createRoomType: RoomType }>(CREATE_ROOM_TYPE_MUTATION, { input });
      return data.createRoomType;
    },
    onSuccess: (newType) => {
      queryClient.invalidateQueries({ 
        queryKey: ['room-types', hotelId],
        exact: false 
      });
      queryClient.invalidateQueries({ queryKey: ['room-types'], exact: true });
      
      // Optimistic update
      queryClient.setQueryData<RoomType[]>(
        ['room-types', hotelId],
        (old) => old ? [...old, newType] : [newType]
      );
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

export const useDeleteRoomType = (hotelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlRequest<{ deleteRoomType: { success: boolean } }>(DELETE_ROOM_TYPE_MUTATION, { id });
      return data.deleteRoomType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['room-types', hotelId],
        exact: false 
      });
      queryClient.invalidateQueries({ queryKey: ['room-types'], exact: true });
      // Also invalidate rooms since they reference room types
      queryClient.invalidateQueries({ 
        queryKey: ['rooms', hotelId],
        exact: false 
      });
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
 * @deprecated This hook should use paginated rooms or a dedicated stats endpoint
 */
export const useRoomInventorySummary = (hotelId: string | null) => {
  const { data: rooms = [] } = useRooms(); // Legacy hook - consider migrating to stats endpoint
  const { data: roomTypes = [] } = useRoomTypes(hotelId);

  return useQuery({
    queryKey: ['room-inventory-summary', hotelId, rooms.length, roomTypes.length],
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
    enabled: !!hotelId && hotelId !== 'pending' && rooms.length > 0 && roomTypes.length > 0,
  });
};
