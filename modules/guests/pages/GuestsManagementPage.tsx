import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, User, Phone, Mail, Star, FileText, Eye } from 'lucide-react';
import { useGuests, useGuestStays, useGuestNotes, useCreateGuest, useUpdateGuest, useDeleteGuest, useAddGuestNote } from '../guests.api';
import { Guest, GuestNote, GuestStay } from '../guests.types';
import { useToast } from '../../../components/ui/Toast';
import { useCurrency } from '../../../providers/CurrencyProvider';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';

export default function GuestsManagementPage() {
  const { data: guests = [], isLoading: loading } = useGuests();
  const { data: guestNotes = [] } = useGuestNotes();
  const { data: guestStays = [] } = useGuestStays();
  const { success, error } = useToast();
  const { format } = useCurrency();
  
  const createGuestMutation = useCreateGuest();
  const updateGuestMutation = useUpdateGuest();
  const deleteGuestMutation = useDeleteGuest();
  const addNoteMutation = useAddGuestNote();

  const [searchQuery, setSearchQuery] = useState('');
  const [vipFilter, setVipFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [newNote, setNewNote] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; guestId: string | null }>({ isOpen: false, guestId: null });
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idType: 'Aadhaar',
    idNumber: '',
    nationality: 'Indian',
    pillowType: 'Soft',
    smoking: false,
    dietaryNeeds: '',
    isVip: false,
    privacyLevel: 'NORMAL',
  });

  const handleCreate = async () => {
    try {
      await createGuestMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        idType: formData.idType,
        idNumber: formData.idNumber,
        nationality: formData.nationality,
        preferences: {
          pillowType: formData.pillowType,
          smoking: formData.smoking,
          dietaryNeeds: formData.dietaryNeeds,
        },
        isVip: formData.isVip,
        privacyLevel: formData.privacyLevel,
      });
      success('Guest created successfully');
      setShowCreateModal(false);
      resetForm();
    } catch (err: any) {
      error(err?.message || 'Failed to create guest. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!selectedGuest) return;
    try {
      await updateGuestMutation.mutateAsync({
        id: selectedGuest.id,
        input: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          idType: formData.idType,
          idNumber: formData.idNumber,
          nationality: formData.nationality,
          preferences: {
            pillowType: formData.pillowType,
            smoking: formData.smoking,
            dietaryNeeds: formData.dietaryNeeds,
          },
          isVip: formData.isVip,
          privacyLevel: formData.privacyLevel,
        },
      });
      success('Guest updated successfully');
      setShowEditModal(false);
      setSelectedGuest(null);
      resetForm();
    } catch (err: any) {
      error(err?.message || 'Failed to update guest. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.guestId) return;
    try {
      await deleteGuestMutation.mutateAsync(deleteConfirm.guestId);
      success('Guest deleted successfully');
      setDeleteConfirm({ isOpen: false, guestId: null });
    } catch (err: any) {
      error(err?.message || 'Failed to delete guest. Please try again.');
      setDeleteConfirm({ isOpen: false, guestId: null });
    }
  };

  const handleAddNote = async () => {
    if (!selectedGuest || !newNote.trim()) return;
    try {
      await addNoteMutation.mutateAsync({
        guestId: selectedGuest.id,
        content: newNote,
      });
      success('Note added successfully');
      setNewNote('');
    } catch (err: any) {
      error(err?.message || 'Failed to add note. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      idType: 'Aadhaar',
      idNumber: '',
      nationality: 'Indian',
      pillowType: 'Soft',
      smoking: false,
      dietaryNeeds: '',
      isVip: false,
      privacyLevel: 'NORMAL',
    });
  };

  const openEditModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setFormData({
      name: guest.name,
      phone: guest.phone,
      email: guest.email,
      idType: guest.idType,
      idNumber: guest.idNumber,
      nationality: guest.nationality,
      pillowType: guest.preferences?.pillowType || 'Soft',
      smoking: guest.preferences?.smoking || false,
      dietaryNeeds: guest.preferences?.dietaryNeeds || '',
      isVip: guest.isVip,
      privacyLevel: guest.privacyLevel,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setShowDetailsModal(true);
  };

  const openNotesModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setShowNotesModal(true);
  };

  const getGuestNotes = (guestId: string) => {
    return guestNotes.filter(note => note.guestId === guestId);
  };

  const getGuestStays = (guestId: string) => {
    return guestStays.filter(stay => stay.guestId === guestId);
  };

  const getTotalSpent = (guestId: string) => {
    return getGuestStays(guestId).reduce((sum, stay) => sum + stay.totalSpent, 0);
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone.includes(searchQuery);
    const matchesVip = vipFilter === 'ALL' || (vipFilter === 'VIP' && guest.isVip) || (vipFilter === 'REGULAR' && !guest.isVip);
    return matchesSearch && matchesVip;
  });

  const guestStats = {
    total: guests.length,
    vip: guests.filter(g => g.isVip).length,
    regular: guests.filter(g => !g.isVip).length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guests Management</h1>
          <p className="text-gray-600 mt-1">Manage guest profiles and preferences</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Guest
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Guests</p>
          <p className="text-2xl font-bold text-gray-900">{guestStats.total}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-600" size={20} />
            <p className="text-sm text-yellow-700">VIP Guests</p>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{guestStats.vip}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-blue-700">Regular Guests</p>
          <p className="text-2xl font-bold text-blue-900">{guestStats.regular}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={vipFilter}
          onChange={(e) => setVipFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Guests</option>
          <option value="VIP">VIP Only</option>
          <option value="REGULAR">Regular Only</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading guests...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGuests.map((guest) => {
            const notes = getGuestNotes(guest.id);
            const stays = getGuestStays(guest.id);
            const totalSpent = getTotalSpent(guest.id);
            
            return (
              <div key={guest.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <User className="text-blue-600 mt-1" size={24} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{guest.name}</h3>
                        {guest.isVip && (
                          <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        )}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={14} />
                          <span>{guest.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={14} />
                          <span>{guest.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">ID Type</p>
                    <p className="font-medium text-gray-900">{guest.idType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">ID Number</p>
                    <p className="font-medium text-gray-900">{guest.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nationality</p>
                    <p className="font-medium text-gray-900">{guest.nationality}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Privacy Level</p>
                    <p className="font-medium text-gray-900">{guest.privacyLevel}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 mb-3">
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Total Stays</p>
                      <p className="font-semibold text-gray-900">{stays.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Spent</p>
                      <p className="font-semibold text-gray-900">{format(totalSpent)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Notes</p>
                      <p className="font-semibold text-gray-900">{notes.length}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openDetailsModal(guest)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                  >
                    <Eye size={14} />
                    Details
                  </button>
                  <button
                    onClick={() => openNotesModal(guest)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm"
                  >
                    <FileText size={14} />
                    Notes
                  </button>
                  <button
                    onClick={() => openEditModal(guest)}
                    className="px-3 py-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: true, guestId: guest.id })}
                    className="px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Add New Guest' : 'Edit Guest'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Indian"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                <select
                  value={formData.idType}
                  onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ID number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pillow Type</label>
                <select
                  value={formData.pillowType}
                  onChange={(e) => setFormData({ ...formData, pillowType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Soft">Soft</option>
                  <option value="Firm">Firm</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Needs</label>
                <input
                  type="text"
                  value={formData.dietaryNeeds}
                  onChange={(e) => setFormData({ ...formData, dietaryNeeds: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Vegetarian"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Privacy Level</label>
                <select
                  value={formData.privacyLevel}
                  onChange={(e) => setFormData({ ...formData, privacyLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smoking"
                    checked={formData.smoking}
                    onChange={(e) => setFormData({ ...formData, smoking: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="smoking" className="ml-2 text-sm font-medium text-gray-700">
                    Smoking
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vip"
                    checked={formData.isVip}
                    onChange={(e) => setFormData({ ...formData, isVip: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="vip" className="ml-2 text-sm font-medium text-gray-700">
                    VIP Guest
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showCreateModal ? 'Add Guest' : 'Update Guest'}
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedGuest(null);
                  resetForm();
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Guest Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">VIP Status</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.isVip ? 'VIP Guest' : 'Regular Guest'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Nationality</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.nationality}</p>
                </div>
                <div>
                  <p className="text-gray-600">Privacy Level</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.privacyLevel}</p>
                </div>
                <div>
                  <p className="text-gray-600">ID Type</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.idType}</p>
                </div>
                <div>
                  <p className="text-gray-600">ID Number</p>
                  <p className="font-semibold text-gray-900">{selectedGuest.idNumber}</p>
                </div>
              </div>
              
              {selectedGuest.preferences && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Preferences</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Pillow Type</p>
                      <p className="font-medium text-gray-900">{selectedGuest.preferences.pillowType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Smoking</p>
                      <p className="font-medium text-gray-900">{selectedGuest.preferences.smoking ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Dietary Needs</p>
                      <p className="font-medium text-gray-900">{selectedGuest.preferences.dietaryNeeds || 'None'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Stay History</h3>
                <div className="space-y-2">
                  {getGuestStays(selectedGuest.id).map(stay => (
                    <div key={stay.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-gray-600">Check-in</p>
                          <p className="font-medium text-gray-900">{new Date(stay.checkInDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Room</p>
                          <p className="font-medium text-gray-900">{stay.roomNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Spent</p>
                          <p className="font-medium text-gray-900">{format(stay.totalSpent)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedGuest(null);
                }}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotesModal && selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Guest Notes - {selectedGuest.name}</h2>
            <div className="space-y-3 mb-4">
              {getGuestNotes(selectedGuest.id).map(note => (
                <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 mb-2">{note.content}</p>
                  <p className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {getGuestNotes(selectedGuest.id).length === 0 && (
                <p className="text-gray-500 text-center py-8">No notes yet</p>
              )}
            </div>
            <div className="space-y-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add a new note..."
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleAddNote}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Note
                </button>
                <button
                  onClick={() => {
                    setShowNotesModal(false);
                    setSelectedGuest(null);
                    setNewNote('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Guest"
        description="Are you sure you want to delete this guest? This action cannot be undone and will remove all guest history."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, guestId: null })}
        variant="danger"
      />
    </div>
  );
}
