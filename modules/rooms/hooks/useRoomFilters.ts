import { useMemo } from 'react';
import { Room, RoomStatus } from '../rooms.types';

export const useRoomFilters = (rooms: Room[], searchQuery: string, statusFilter: RoomStatus | 'ALL') => {
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || room.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rooms, searchQuery, statusFilter]);

  const roomStats = useMemo(() => ({
    total: rooms.length,
    clean: rooms.filter(r => r.status === 'CLEAN').length,
    dirty: rooms.filter(r => r.status === 'DIRTY').length,
    occupied: rooms.filter(r => r.status === 'OCCUPIED').length,
    maintenance: rooms.filter(r => r.status === 'MAINTENANCE').length,
  }), [rooms]);

  return {
    filteredRooms,
    roomStats,
  };
};
