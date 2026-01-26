import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Calendar, User, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Booking {
  id: string;
  bookingNumber: string;
  hotelId: string;
  guestId: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  roomType?: string;
  roomNumber?: string;
  totalAmount: number;
  paymentStatus: string;
  source: string;
  sourceId: string;
  arrivalTime: string;
  departureTime: string;
  cancellationPolicy?: string;
  noShowPolicy?: string;
  assignedAt?: string;
}

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  const [formData, setFormData] = useState({
    guestName: '',
    guestId: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    totalAmount: 0,
    source: 'Direct',
    arrivalTime: '14:00',
    departureTime: '12:00',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings');
      setBookings(await response.json());
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchBookings();
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedBooking) return;
    try {
      const response = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchBookings();
        setShowEditModal(false);
        setSelectedBooking(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchBookings();
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const handleCheckIn = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}/check-in`, {
        method: 'POST',
      });
      if (response.ok) {
        await fetchBookings();
      }
    } catch (error) {
      console.error('Failed to check in:', error);
    }
  };

  const handleCheckOut = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}/check-out`, {
        method: 'POST',
      });
      if (response.ok) {
        await fetchBookings();
      }
    } catch (error) {
      console.error('Failed to check out:', error);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const response = await fetch(`/api/bookings/${id}/cancel`, {
        method: 'POST',
      });
      if (response.ok) {
        await fetchBookings();
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      guestName: '',
      guestId: '',
      checkInDate: '',
      checkOutDate: '',
      roomType: '',
      totalAmount: 0,
      source: 'Direct',
      arrivalTime: '14:00',
      departureTime: '12:00',
    });
  };

  const openEditModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setFormData({
      guestName: booking.guestName,
      guestId: booking.guestId,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      roomType: booking.roomType || '',
      totalAmount: booking.totalAmount,
      source: booking.source,
      arrivalTime: booking.arrivalTime,
      departureTime: booking.departureTime,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'CHECKED_IN': return 'bg-blue-100 text-blue-800';
      case 'CHECKED_OUT': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'text-green-600';
      case 'PARTIALLY_PAID': return 'text-yellow-600';
      case 'DUE': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const bookingStats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    checkedIn: bookings.filter(b => b.status === 'CHECKED_IN').length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600 mt-1">Manage reservations and check-ins</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Booking
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{bookingStats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-green-700">Confirmed</p>
          <p className="text-2xl font-bold text-green-900">{bookingStats.confirmed}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-blue-700">Checked In</p>
          <p className="text-2xl font-bold text-blue-900">{bookingStats.checkedIn}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
          <p className="text-sm text-yellow-700">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{bookingStats.pending}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by booking number, guest name, or room..."
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
          <option value="CONFIRMED">Confirmed</option>
          <option value="CHECKED_IN">Checked In</option>
          <option value="CHECKED_OUT">Checked Out</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading bookings...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="text-blue-600" size={20} />
                    <span className="text-lg font-bold text-gray-900">{booking.bookingNumber}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <span className={`text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <User size={14} />
                        <span>Guest</span>
                      </div>
                      <p className="font-semibold text-gray-900">{booking.guestName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Check-in</p>
                      <p className="font-semibold text-gray-900">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{booking.arrivalTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Check-out</p>
                      <p className="font-semibold text-gray-900">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{booking.departureTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <DollarSign size={14} />
                        <span>Total Amount</span>
                      </div>
                      <p className="font-semibold text-gray-900">₹{booking.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    {booking.roomType && (
                      <div>
                        <p className="text-gray-600">Room Type</p>
                        <p className="font-medium text-gray-900">{booking.roomType}</p>
                      </div>
                    )}
                    {booking.roomNumber && (
                      <div>
                        <p className="text-gray-600">Room Number</p>
                        <p className="font-medium text-gray-900">{booking.roomNumber}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600">Source</p>
                      <p className="font-medium text-gray-900">{booking.source}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => openDetailsModal(booking)}
                    className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => openEditModal(booking)}
                    className="px-3 py-1 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors"
                  >
                    <Edit2 size={14} className="inline mr-1" />
                    Edit
                  </button>
                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCheckIn(booking.id)}
                      className="px-3 py-1 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 rounded transition-colors"
                    >
                      <CheckCircle size={14} className="inline mr-1" />
                      Check In
                    </button>
                  )}
                  {booking.status === 'CHECKED_IN' && (
                    <button
                      onClick={() => handleCheckOut(booking.id)}
                      className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors"
                    >
                      <CheckCircle size={14} className="inline mr-1" />
                      Check Out
                    </button>
                  )}
                  {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                    >
                      <XCircle size={14} className="inline mr-1" />
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Trash2 size={14} className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Create New Booking' : 'Edit Booking'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter guest name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <input
                  type="text"
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Deluxe Suite"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={formData.checkOutDate}
                  onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                <input
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                <input
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Direct">Direct</option>
                  <option value="Booking.com">Booking.com</option>
                  <option value="Expedia">Expedia</option>
                  <option value="Airbnb">Airbnb</option>
                  <option value="MakeMyTrip">MakeMyTrip</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showCreateModal ? 'Create Booking' : 'Update Booking'}
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedBooking(null);
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

      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Booking Number</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.bookingNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Guest Name</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.guestName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Status</p>
                  <p className={`font-semibold ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                    {selectedBooking.paymentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Check-in</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedBooking.checkInDate).toLocaleDateString()} {selectedBooking.arrivalTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check-out</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedBooking.checkOutDate).toLocaleDateString()} {selectedBooking.departureTime}</p>
                </div>
                {selectedBooking.roomType && (
                  <div>
                    <p className="text-gray-600">Room Type</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.roomType}</p>
                  </div>
                )}
                {selectedBooking.roomNumber && (
                  <div>
                    <p className="text-gray-600">Room Number</p>
                    <p className="font-semibold text-gray-900">{selectedBooking.roomNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold text-gray-900">₹{selectedBooking.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Source</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.source}</p>
                </div>
                {selectedBooking.cancellationPolicy && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Cancellation Policy</p>
                    <p className="font-medium text-gray-900">{selectedBooking.cancellationPolicy}</p>
                  </div>
                )}
                {selectedBooking.noShowPolicy && (
                  <div className="col-span-2">
                    <p className="text-gray-600">No-Show Policy</p>
                    <p className="font-medium text-gray-900">{selectedBooking.noShowPolicy}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedBooking(null);
                }}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
