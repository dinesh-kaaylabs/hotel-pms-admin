import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, Settings } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  city: string;
  status: string;
  tenantId: string;
  address: string;
  timezone: string;
  currency: string;
}

interface HotelSettings {
  hotelId: string;
  checkInTime: string;
  checkOutTime: string;
  wifiPassword: string;
  parkingAvailable: boolean;
}

export default function HotelsManagementPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelSettings, setHotelSettings] = useState<HotelSettings[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    tenantId: '',
  });
  const [settingsFormData, setSettingsFormData] = useState({
    checkInTime: '14:00',
    checkOutTime: '12:00',
    wifiPassword: '',
    parkingAvailable: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hotelsRes, settingsRes] = await Promise.all([
        fetch('/api/hotels'),
        fetch('/api/hotel-settings'),
      ]);
      setHotels(await hotelsRes.json());
      setHotelSettings(await settingsRes.json());
    } catch (error) {
      // Error handled silently - user will see empty state
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchData();
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleUpdate = async () => {
    if (!selectedHotel) return;
    try {
      const response = await fetch(`/api/hotels/${selectedHotel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchData();
        setShowEditModal(false);
        setSelectedHotel(null);
        resetForm();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleUpdateSettings = async () => {
    if (!selectedHotel) return;
    try {
      const response = await fetch(`/api/hotel-settings/${selectedHotel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsFormData),
      });
      if (response.ok) {
        await fetchData();
        setShowSettingsModal(false);
        setSelectedHotel(null);
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const response = await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await         fetchData();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      city: '',
      address: '',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      tenantId: '',
    });
  };

  const openEditModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      timezone: hotel.timezone,
      currency: hotel.currency,
      tenantId: hotel.tenantId,
    });
    setShowEditModal(true);
  };

  const openSettingsModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    const settings = hotelSettings.find(s => s.hotelId === hotel.id);
    if (settings) {
      setSettingsFormData({
        checkInTime: settings.checkInTime,
        checkOutTime: settings.checkOutTime,
        wifiPassword: settings.wifiPassword,
        parkingAvailable: settings.parkingAvailable,
      });
    }
    setShowSettingsModal(true);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHotelSettings = (hotelId: string) => {
    return hotelSettings.find(s => s.hotelId === hotelId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hotels Management</h1>
          <p className="text-gray-600 mt-1">Manage hotel properties and their settings</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Hotel
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search hotels by name or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading hotels...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredHotels.map((hotel) => {
            const settings = getHotelSettings(hotel.id);
            return (
              <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                      <p className="text-sm text-gray-600">{hotel.city}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    hotel.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {hotel.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <p className="font-medium text-gray-900">{hotel.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-600">Timezone:</span>
                      <p className="font-medium text-gray-900">{hotel.timezone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Currency:</span>
                      <p className="font-medium text-gray-900">{hotel.currency}</p>
                    </div>
                  </div>
                </div>

                {settings && (
                  <div className="pt-3 border-t border-gray-200 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-600">Check-in:</span>
                        <p className="font-medium text-gray-900">{settings.checkInTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Check-out:</span>
                        <p className="font-medium text-gray-900">{settings.checkOutTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Parking:</span>
                        <p className="font-medium text-gray-900">{settings.parkingAvailable ? 'Available' : 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => openEditModal(hotel)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => openSettingsModal(hotel)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-sm"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Create New Hotel' : 'Edit Hotel'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hotel name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showCreateModal ? 'Create' : 'Update'}
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedHotel(null);
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

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Hotel Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                <input
                  type="time"
                  value={settingsFormData.checkInTime}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, checkInTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                <input
                  type="time"
                  value={settingsFormData.checkOutTime}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, checkOutTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WiFi Password</label>
                <input
                  type="text"
                  value={settingsFormData.wifiPassword}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, wifiPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter WiFi password"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  checked={settingsFormData.parkingAvailable}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, parkingAvailable: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="parking" className="ml-2 text-sm font-medium text-gray-700">
                  Parking Available
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateSettings}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Settings
              </button>
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setSelectedHotel(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
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
