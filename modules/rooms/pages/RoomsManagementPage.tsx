import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Bed, DoorOpen, AlertCircle } from 'lucide-react';
import { useRooms, useRoomTypes, useCreateRoom, useUpdateRoom, useDeleteRoom, useCreateRoomType, useDeleteRoomType } from '../rooms.api';
import { Room, RoomType } from '../rooms.types';
import { useToast } from '../../../components/ui/Toast';

export default function RoomsManagementPage() {
  const { data: rooms = [], isLoading: loading } = useRooms();
  const { data: roomTypes = [] } = useRoomTypes();
  const { success, error } = useToast();
  
  const createRoomMutation = useCreateRoom();
  const updateRoomMutation = useUpdateRoom();
  const deleteRoomMutation = useDeleteRoom();
  const createRoomTypeMutation = useCreateRoomType();
  const deleteRoomTypeMutation = useDeleteRoomType();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'types'>('rooms');
  
  const [roomFormData, setRoomFormData] = useState({
    roomNumber: '',
    roomTypeId: '',
    floor: 1,
    viewType: 'CITY_VIEW',
    status: 'CLEAN' as const,
  });

  const [typeFormData, setTypeFormData] = useState({
    name: '',
    capacity: 2,
    basePrice: 0,
    maxAdults: 2,
    maxChildren: 1,
    extraBedAllowed: true,
    extraBedPrice: 0,
  });

  const handleCreateRoom = async () => {
    try {
      await createRoomMutation.mutateAsync({
        roomNumber: roomFormData.roomNumber,
        roomTypeId: roomFormData.roomTypeId,
        floor: roomFormData.floor,
        viewType: roomFormData.viewType,
        status: roomFormData.status,
      });
      success('Room created successfully');
      setShowCreateRoomModal(false);
      resetRoomForm();
    } catch (err: any) {
      error(err?.message || 'Failed to create room. Please try again.');
    }
  };

  const handleUpdateRoom = async () => {
    if (!selectedRoom) return;
    try {
      await updateRoomMutation.mutateAsync({
        id: selectedRoom.id,
        input: {
          roomNumber: roomFormData.roomNumber,
          roomTypeId: roomFormData.roomTypeId,
          floor: roomFormData.floor,
          viewType: roomFormData.viewType,
          status: roomFormData.status,
        },
      });
      success('Room updated successfully');
      setShowEditRoomModal(false);
      setSelectedRoom(null);
      resetRoomForm();
    } catch (err: any) {
      error(err?.message || 'Failed to update room. Please try again.');
    }
  };

  const handleCreateRoomType = async () => {
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
    } catch (err: any) {
      error(err?.message || 'Failed to create room type. Please try again.');
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      await deleteRoomMutation.mutateAsync(id);
      success('Room deleted successfully');
    } catch (err: any) {
      error(err?.message || 'Failed to delete room. Please try again.');
    }
  };

  const handleDeleteRoomType = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room type?')) return;
    try {
      await deleteRoomTypeMutation.mutateAsync(id);
      success('Room type deleted successfully');
    } catch (err: any) {
      error(err?.message || 'Failed to delete room type. Please try again.');
    }
  };

  const resetRoomForm = () => {
    setRoomFormData({
      roomNumber: '',
      roomTypeId: '',
      floor: 1,
      viewType: 'CITY_VIEW',
      status: 'CLEAN',
    });
  };

  const resetTypeForm = () => {
    setTypeFormData({
      name: '',
      capacity: 2,
      basePrice: 0,
      maxAdults: 2,
      maxChildren: 1,
      extraBedAllowed: true,
      extraBedPrice: 0,
    });
  };

  const openEditRoomModal = (room: Room) => {
    setSelectedRoom(room);
    setRoomFormData({
      roomNumber: room.roomNumber,
      roomTypeId: room.roomTypeId,
      floor: room.floor,
      viewType: room.viewType,
      status: room.status as any,
    });
    setShowEditRoomModal(true);
  };

  const getRoomTypeName = (typeId: string) => {
    return roomTypes.find(t => t.id === typeId)?.name || 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CLEAN': return 'bg-green-100 text-green-800';
      case 'DIRTY': return 'bg-yellow-100 text-yellow-800';
      case 'OCCUPIED': return 'bg-blue-100 text-blue-800';
      case 'MAINTENANCE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const roomStats = {
    total: rooms.length,
    clean: rooms.filter(r => r.status === 'CLEAN').length,
    dirty: rooms.filter(r => r.status === 'DIRTY').length,
    occupied: rooms.filter(r => r.status === 'OCCUPIED').length,
    maintenance: rooms.filter(r => r.status === 'MAINTENANCE').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rooms Management</h1>
          <p className="text-gray-600 mt-1">Manage rooms and room types</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'rooms' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Rooms
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'types' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Room Types
          </button>
        </div>
      </div>

      {activeTab === 'rooms' && (
        <>
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{roomStats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <p className="text-sm text-green-700">Clean</p>
              <p className="text-2xl font-bold text-green-900">{roomStats.clean}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
              <p className="text-sm text-yellow-700">Dirty</p>
              <p className="text-2xl font-bold text-yellow-900">{roomStats.dirty}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
              <p className="text-sm text-blue-700">Occupied</p>
              <p className="text-2xl font-bold text-blue-900">{roomStats.occupied}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
              <p className="text-sm text-red-700">Maintenance</p>
              <p className="text-2xl font-bold text-red-900">{roomStats.maintenance}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by room number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="CLEAN">Clean</option>
              <option value="DIRTY">Dirty</option>
              <option value="OCCUPIED">Occupied</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
            <button
              onClick={() => setShowCreateRoomModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Room
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <DoorOpen className="text-blue-600" size={20} />
                      <span className="text-lg font-bold text-gray-900">{room.roomNumber}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm mb-3">
                    <p className="text-gray-600">Type: <span className="font-medium text-gray-900">{getRoomTypeName(room.roomTypeId)}</span></p>
                    <p className="text-gray-600">Floor: <span className="font-medium text-gray-900">{room.floor}</span></p>
                    <p className="text-gray-600">View: <span className="font-medium text-gray-900">{room.viewType}</span></p>
                  </div>
                  {room.outOfOrderReason && (
                    <div className="flex items-start gap-2 p-2 bg-red-50 rounded text-xs text-red-700 mb-3">
                      <AlertCircle size={14} className="mt-0.5" />
                      <span>{room.outOfOrderReason}</span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => openEditRoomModal(room)}
                      className="flex-1 px-2 py-1 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded text-sm"
                    >
                      <Edit2 size={14} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="px-2 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'types' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{roomTypes.length} room types configured</p>
            <button
              onClick={() => setShowCreateTypeModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Room Type
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roomTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Bed className="text-blue-600" size={24} />
                    <h3 className="text-xl font-semibold text-gray-900">{type.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteRoomType(type.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Base Price</p>
                    <p className="font-semibold text-gray-900">₹{type.basePrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Capacity</p>
                    <p className="font-semibold text-gray-900">{type.capacity} guests</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Max Adults</p>
                    <p className="font-semibold text-gray-900">{type.maxAdults}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Max Children</p>
                    <p className="font-semibold text-gray-900">{type.maxChildren}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Extra Bed</p>
                    <p className="font-semibold text-gray-900">{type.extraBedAllowed ? 'Yes' : 'No'}</p>
                  </div>
                  {type.extraBedAllowed && type.extraBedPrice && (
                    <div>
                      <p className="text-gray-600">Extra Bed Price</p>
                      <p className="font-semibold text-gray-900">₹{type.extraBedPrice.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {(showCreateRoomModal || showEditRoomModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{showCreateRoomModal ? 'Create New Room' : 'Edit Room'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="text"
                  value={roomFormData.roomNumber}
                  onChange={(e) => setRoomFormData({ ...roomFormData, roomNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 101"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select
                  value={roomFormData.roomTypeId}
                  onChange={(e) => setRoomFormData({ ...roomFormData, roomTypeId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select room type</option>
                  {roomTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                <input
                  type="number"
                  value={roomFormData.floor}
                  onChange={(e) => setRoomFormData({ ...roomFormData, floor: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">View Type</label>
                <select
                  value={roomFormData.viewType}
                  onChange={(e) => setRoomFormData({ ...roomFormData, viewType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CITY_VIEW">City View</option>
                  <option value="SEA_VIEW">Sea View</option>
                  <option value="GARDEN_VIEW">Garden View</option>
                  <option value="POOL_VIEW">Pool View</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={roomFormData.status}
                  onChange={(e) => setRoomFormData({ ...roomFormData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CLEAN">Clean</option>
                  <option value="DIRTY">Dirty</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={showCreateRoomModal ? handleCreateRoom : handleUpdateRoom}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {showCreateRoomModal ? 'Create' : 'Update'}
              </button>
              <button
                onClick={() => {
                  setShowCreateRoomModal(false);
                  setShowEditRoomModal(false);
                  setSelectedRoom(null);
                  resetRoomForm();
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create Room Type</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type Name</label>
                <input
                  type="text"
                  value={typeFormData.name}
                  onChange={(e) => setTypeFormData({ ...typeFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Deluxe Suite"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  value={typeFormData.basePrice}
                  onChange={(e) => setTypeFormData({ ...typeFormData, basePrice: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={typeFormData.capacity}
                    onChange={(e) => setTypeFormData({ ...typeFormData, capacity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Adults</label>
                  <input
                    type="number"
                    value={typeFormData.maxAdults}
                    onChange={(e) => setTypeFormData({ ...typeFormData, maxAdults: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Children</label>
                <input
                  type="number"
                  value={typeFormData.maxChildren}
                  onChange={(e) => setTypeFormData({ ...typeFormData, maxChildren: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="extraBed"
                  checked={typeFormData.extraBedAllowed}
                  onChange={(e) => setTypeFormData({ ...typeFormData, extraBedAllowed: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="extraBed" className="ml-2 text-sm font-medium text-gray-700">
                  Extra Bed Allowed
                </label>
              </div>
              {typeFormData.extraBedAllowed && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Extra Bed Price (₹)</label>
                  <input
                    type="number"
                    value={typeFormData.extraBedPrice}
                    onChange={(e) => setTypeFormData({ ...typeFormData, extraBedPrice: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateRoomType}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateTypeModal(false);
                  resetTypeForm();
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
