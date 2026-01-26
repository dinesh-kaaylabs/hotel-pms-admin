import { useState, useMemo, useCallback } from 'react';
import { Plus, Search, Inbox, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRoomsPaginated, useRoomTypes, useCreateRoom, useUpdateRoom, useDeleteRoom, useCreateRoomType, useDeleteRoomType, useRoomStats } from '../rooms.api';
import { Room, RoomType, RoomStatus } from '../rooms.types';
import { useToast } from '../../../components/ui/Toast';
import { useCurrency } from '../../../providers/CurrencyProvider';
import { useHotelStore } from '../../../stores/hotelStore';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { getErrorMessage } from '../../../utils/errorHandling';
import { RoomCard } from '../components/RoomCard';
import { RoomTypeCard } from '../components/RoomTypeCard';
import { RoomStats } from '../components/RoomStats';
import { RoomFormModal } from '../components/RoomFormModal';
import { RoomTypeFormModal } from '../components/RoomTypeFormModal';
import { useDebounce } from '../hooks/useDebounce';
import { validateRoomForm, validateRoomTypeForm } from '../utils/validation';
import { ROOM_STATUS_OPTIONS } from '../rooms.constants';
import type { RoomFormData as ValidationRoomFormData, RoomTypeFormData as ValidationRoomTypeFormData } from '../utils/validation';

const DEFAULT_PAGE_SIZE = 24; // 4 columns × 6 rows

export default function RoomsManagementPage() {
  const { activeHotelId } = useHotelStore();
  const { success, error } = useToast();
  const { format } = useCurrency();
  
  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchQuery = useDebounce(searchInput, 300);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'ALL'>('ALL');
  
  // Use paginated query with hotel-specific caching
  const { data: roomsData, isLoading: loading } = useRoomsPaginated({
    hotelId: activeHotelId,
    page,
    pageSize,
    search: debouncedSearchQuery || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  });
  
  const rooms = roomsData?.data || [];
  const totalCount = roomsData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  
  const { data: roomTypes = [] } = useRoomTypes(activeHotelId);
  
  // Use dedicated stats endpoint for accurate counts across all rooms
  const { data: statsData } = useRoomStats(activeHotelId);
  
  const createRoomMutation = useCreateRoom(activeHotelId);
  const updateRoomMutation = useUpdateRoom(activeHotelId);
  const deleteRoomMutation = useDeleteRoom(activeHotelId);
  const createRoomTypeMutation = useCreateRoomType(activeHotelId);
  const deleteRoomTypeMutation = useDeleteRoomType(activeHotelId);

  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'types'>('rooms');
  const [deleteRoomConfirm, setDeleteRoomConfirm] = useState<{ isOpen: boolean; roomId: string | null }>({ isOpen: false, roomId: null });
  const [deleteTypeConfirm, setDeleteTypeConfirm] = useState<{ isOpen: boolean; typeId: string | null }>({ isOpen: false, typeId: null });
  
  // Reset to page 1 when search or filter changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setPage(1);
  }, []);
  
  const handleStatusFilterChange = useCallback((value: RoomStatus | 'ALL') => {
    setStatusFilter(value);
    setPage(1);
  }, []);
  
  const [roomFormData, setRoomFormData] = useState<ValidationRoomFormData>({
    roomNumber: '',
    roomTypeId: '',
    floor: 1,
    viewType: 'CITY_VIEW',
    status: 'CLEAN',
  });

  const [typeFormData, setTypeFormData] = useState<ValidationRoomTypeFormData>({
    name: '',
    capacity: 2,
    basePrice: 0,
    maxAdults: 2,
    maxChildren: 1,
    extraBedAllowed: true,
    extraBedPrice: 0,
  });

  const [roomFormErrors, setRoomFormErrors] = useState<Partial<Record<keyof ValidationRoomFormData, string>>>({});
  const [typeFormErrors, setTypeFormErrors] = useState<Partial<Record<keyof ValidationRoomTypeFormData, string>>>({});

  // Optimized room type lookup map
  const roomTypeMap = useMemo(() => {
    return new Map(roomTypes.map(t => [t.id, t.name]));
  }, [roomTypes]);

  // Use stats from dedicated endpoint (accurate across all rooms, not affected by pagination/filters)
  const roomStats = useMemo(() => {
    if (statsData) {
      return {
        total: statsData.total,
        clean: statsData.clean,
        dirty: statsData.dirty,
        occupied: statsData.occupied,
        maintenance: statsData.maintenance,
      };
    }
    // Fallback to calculating from current page (inaccurate but better than nothing)
    return {
      total: totalCount,
      clean: rooms.filter(r => r.status === 'CLEAN').length,
      dirty: rooms.filter(r => r.status === 'DIRTY').length,
      occupied: rooms.filter(r => r.status === 'OCCUPIED').length,
      maintenance: rooms.filter(r => r.status === 'MAINTENANCE').length,
    };
  }, [statsData, rooms, totalCount]);

  const getRoomTypeName = useCallback((typeId: string) => {
    return roomTypeMap.get(typeId) || 'Unknown';
  }, [roomTypeMap]);

  const handleCreateRoom = async () => {
    const errors = validateRoomForm(roomFormData);
    if (Object.keys(errors).length > 0) {
      setRoomFormErrors(errors);
      return;
    }
    setRoomFormErrors({});
    
    try {
      await createRoomMutation.mutateAsync({
        roomNumber: roomFormData.roomNumber,
        roomTypeId: roomFormData.roomTypeId,
        floor: roomFormData.floor,
        viewType: roomFormData.viewType,
        status: roomFormData.status as RoomStatus,
      });
      success('Room created successfully');
      setShowCreateRoomModal(false);
      resetRoomForm();
    } catch (err) {
      error(getErrorMessage(err, 'create room'));
    }
  };

  const handleUpdateRoom = async () => {
    if (!selectedRoom) return;
    
    const errors = validateRoomForm(roomFormData);
    if (Object.keys(errors).length > 0) {
      setRoomFormErrors(errors);
      return;
    }
    setRoomFormErrors({});
    
    try {
      await updateRoomMutation.mutateAsync({
        id: selectedRoom.id,
        input: {
          roomNumber: roomFormData.roomNumber,
          roomTypeId: roomFormData.roomTypeId,
          floor: roomFormData.floor,
          viewType: roomFormData.viewType,
          status: roomFormData.status as RoomStatus,
        },
      });
      success('Room updated successfully');
      setShowEditRoomModal(false);
      setSelectedRoom(null);
      resetRoomForm();
    } catch (err) {
      // Optimistic update was reverted, show error to user
      error(getErrorMessage(err, 'update room') + ' - Changes have been reverted.');
    }
  };

  const handleCreateRoomType = async () => {
    const errors = validateRoomTypeForm(typeFormData);
    if (Object.keys(errors).length > 0) {
      setTypeFormErrors(errors);
      return;
    }
    setTypeFormErrors({});
    
    try {
      await createRoomTypeMutation.mutateAsync({
        name: typeFormData.name,
        capacity: typeFormData.capacity,
        basePrice: typeFormData.basePrice,
        maxAdults: typeFormData.maxAdults,
        maxChildren: typeFormData.maxChildren,
        extraBedAllowed: typeFormData.extraBedAllowed,
        extraBedPrice: typeFormData.extraBedAllowed ? typeFormData.extraBedPrice : null,
      });
      success('Room type created successfully');
      setShowCreateTypeModal(false);
      resetTypeForm();
    } catch (err) {
      error(getErrorMessage(err, 'create room type'));
    }
  };

  const handleDeleteRoom = async () => {
    if (!deleteRoomConfirm.roomId) return;
    try {
      await deleteRoomMutation.mutateAsync(deleteRoomConfirm.roomId);
      success('Room deleted successfully');
      setDeleteRoomConfirm({ isOpen: false, roomId: null });
    } catch (err) {
      // Optimistic update was reverted, show error to user
      error(getErrorMessage(err, 'delete room') + ' - Changes have been reverted.');
      setDeleteRoomConfirm({ isOpen: false, roomId: null });
    }
  };

  const handleDeleteRoomType = async () => {
    if (!deleteTypeConfirm.typeId) return;
    try {
      await deleteRoomTypeMutation.mutateAsync(deleteTypeConfirm.typeId);
      success('Room type deleted successfully');
      setDeleteTypeConfirm({ isOpen: false, typeId: null });
    } catch (err) {
      error(getErrorMessage(err, 'delete room type'));
      setDeleteTypeConfirm({ isOpen: false, typeId: null });
    }
  };

  const resetRoomForm = useCallback(() => {
    setRoomFormData({
      roomNumber: '',
      roomTypeId: '',
      floor: 1,
      viewType: 'CITY_VIEW',
      status: 'CLEAN',
    });
    setRoomFormErrors({});
  }, []);

  const resetTypeForm = useCallback(() => {
    setTypeFormData({
      name: '',
      capacity: 2,
      basePrice: 0,
      maxAdults: 2,
      maxChildren: 1,
      extraBedAllowed: true,
      extraBedPrice: 0,
    });
    setTypeFormErrors({});
  }, []);

  const openEditRoomModal = useCallback((room: Room) => {
    setSelectedRoom(room);
    setRoomFormData({
      roomNumber: room.roomNumber,
      roomTypeId: room.roomTypeId,
      floor: room.floor,
      viewType: room.viewType,
      status: room.status,
    });
    setRoomFormErrors({});
    setShowEditRoomModal(true);
  }, []);

  const handleRoomFormChange = useCallback((field: keyof ValidationRoomFormData, value: string | number) => {
    setRoomFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (roomFormErrors[field]) {
      setRoomFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [roomFormErrors]);

  const handleTypeFormChange = useCallback((field: keyof ValidationRoomTypeFormData, value: string | number | boolean) => {
    setTypeFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (typeFormErrors[field]) {
      setTypeFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [typeFormErrors]);

  const handleCloseRoomModal = useCallback(() => {
    setShowCreateRoomModal(false);
    setShowEditRoomModal(false);
    setSelectedRoom(null);
    resetRoomForm();
  }, [resetRoomForm]);

  const handleCloseTypeModal = useCallback(() => {
    setShowCreateTypeModal(false);
    resetTypeForm();
  }, [resetTypeForm]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rooms Management</h1>
          <p className="text-gray-600 mt-1">Manage rooms and room types</p>
        </div>
        <div className="flex gap-2" role="tablist">
          <button
            onClick={() => setActiveTab('rooms')}
            role="tab"
            aria-selected={activeTab === 'rooms'}
            aria-controls="rooms-panel"
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'rooms' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Rooms
          </button>
          <button
            onClick={() => setActiveTab('types')}
            role="tab"
            aria-selected={activeTab === 'types'}
            aria-controls="types-panel"
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'types' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Room Types
          </button>
        </div>
      </div>

      {activeTab === 'rooms' && (
        <div role="tabpanel" id="rooms-panel" aria-labelledby="rooms-tab">
          <RoomStats {...roomStats} />

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by room number..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                aria-label="Search rooms by room number"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value as RoomStatus | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              aria-label="Filter rooms by status"
            >
              {ROOM_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button
              onClick={() => {
                resetRoomForm();
                setShowCreateRoomModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Add new room"
            >
              <Plus size={20} aria-hidden="true" />
              Add Room
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12" role="status" aria-live="polite">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" aria-label="Loading rooms"></div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200" role="status">
              <Inbox size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
              <p className="text-gray-600 text-lg font-medium">No rooms found</p>
              <p className="text-gray-500 text-sm mt-1">
                {searchInput || statusFilter !== 'ALL' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding your first room'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    roomTypeName={getRoomTypeName(room.roomTypeId)}
                    onEdit={openEditRoomModal}
                    onDelete={(id) => setDeleteRoomConfirm({ isOpen: true, roomId: id })}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, totalCount)} of {totalCount} rooms
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              page === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={page === pageNum ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'types' && (
        <div role="tabpanel" id="types-panel" aria-labelledby="types-tab">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{roomTypes.length} room types configured</p>
            <button
              onClick={() => {
                resetTypeForm();
                setShowCreateTypeModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Add new room type"
            >
              <Plus size={20} aria-hidden="true" />
              Add Room Type
            </button>
          </div>

          {roomTypes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200" role="status">
              <Inbox size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
              <p className="text-gray-600 text-lg font-medium">No room types configured</p>
              <p className="text-gray-500 text-sm mt-1">Get started by adding your first room type</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {roomTypes.map((type) => (
                <RoomTypeCard
                  key={type.id}
                  type={type}
                  formatPrice={format}
                  onDelete={(id) => setDeleteTypeConfirm({ isOpen: true, typeId: id })}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <RoomFormModal
        isOpen={showCreateRoomModal || showEditRoomModal}
        isEdit={showEditRoomModal}
        formData={roomFormData}
        roomTypes={roomTypes}
        isLoading={createRoomMutation.isPending || updateRoomMutation.isPending}
        errors={roomFormErrors}
        onChange={handleRoomFormChange}
        onSubmit={showCreateRoomModal ? handleCreateRoom : handleUpdateRoom}
        onClose={handleCloseRoomModal}
      />

      <RoomTypeFormModal
        isOpen={showCreateTypeModal}
        formData={typeFormData}
        isLoading={createRoomTypeMutation.isPending}
        errors={typeFormErrors}
        onChange={handleTypeFormChange}
        onSubmit={handleCreateRoomType}
        onClose={handleCloseTypeModal}
      />

      <ConfirmDialog
        isOpen={deleteRoomConfirm.isOpen}
        title="Delete Room"
        description="Are you sure you want to delete this room? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDeleteRoom}
        onCancel={() => setDeleteRoomConfirm({ isOpen: false, roomId: null })}
        variant="danger"
      />

      <ConfirmDialog
        isOpen={deleteTypeConfirm.isOpen}
        title="Delete Room Type"
        description="Are you sure you want to delete this room type? All rooms of this type will be affected."
        confirmLabel="Delete"
        onConfirm={handleDeleteRoomType}
        onCancel={() => setDeleteTypeConfirm({ isOpen: false, typeId: null })}
        variant="danger"
      />
    </div>
  );
}
