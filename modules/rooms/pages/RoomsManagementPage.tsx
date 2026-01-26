import { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus, Search, Inbox } from 'lucide-react';
import { useRooms, useRoomTypes, useCreateRoom, useUpdateRoom, useDeleteRoom, useCreateRoomType, useDeleteRoomType } from '../rooms.api';
import { Room, RoomType, RoomStatus } from '../rooms.types';
import { useToast } from '../../../components/ui/Toast';
import { useCurrency } from '../../../providers/CurrencyProvider';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { getErrorMessage } from '../../../utils/errorHandling';
import { RoomCard } from '../components/RoomCard';
import { RoomTypeCard } from '../components/RoomTypeCard';
import { RoomStats } from '../components/RoomStats';
import { RoomFormModal } from '../components/RoomFormModal';
import { RoomTypeFormModal } from '../components/RoomTypeFormModal';
import { useRoomFilters } from '../hooks/useRoomFilters';
import { useDebounce } from '../hooks/useDebounce';
import { validateRoomForm, validateRoomTypeForm } from '../utils/validation';
import { ROOM_STATUS_OPTIONS } from '../rooms.constants';
import type { RoomFormData as ValidationRoomFormData, RoomTypeFormData as ValidationRoomTypeFormData } from '../utils/validation';

export default function RoomsManagementPage() {
  const { data: rooms = [], isLoading: loading } = useRooms();
  const { data: roomTypes = [] } = useRoomTypes();
  const { success, error } = useToast();
  const { format } = useCurrency();
  
  const createRoomMutation = useCreateRoom();
  const updateRoomMutation = useUpdateRoom();
  const deleteRoomMutation = useDeleteRoom();
  const createRoomTypeMutation = useCreateRoomType();
  const deleteRoomTypeMutation = useDeleteRoomType();

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchQuery = useDebounce(searchInput, 300);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | 'ALL'>('ALL');
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'types'>('rooms');
  const [deleteRoomConfirm, setDeleteRoomConfirm] = useState<{ isOpen: boolean; roomId: string | null }>({ isOpen: false, roomId: null });
  const [deleteTypeConfirm, setDeleteTypeConfirm] = useState<{ isOpen: boolean; typeId: string | null }>({ isOpen: false, typeId: null });
  
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

  // Use filters hook with debounced search
  const { filteredRooms, roomStats } = useRoomFilters(rooms, debouncedSearchQuery, statusFilter);

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
      error(getErrorMessage(err, 'update room'));
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
      error(getErrorMessage(err, 'delete room'));
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
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                aria-label="Search rooms by room number"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RoomStatus | 'ALL')}
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
          ) : filteredRooms.length === 0 ? (
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
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  roomTypeName={getRoomTypeName(room.roomTypeId)}
                  onEdit={openEditRoomModal}
                  onDelete={(id) => setDeleteRoomConfirm({ isOpen: true, roomId: id })}
                />
              ))}
            </div>
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
