import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface RatePlan {
  id: string;
  name: string;
  hotelId: string;
  mealPlan: string;
  refundable: boolean;
  isActive: boolean;
}

interface PricingCalendar {
  date: string;
  roomTypeId: string;
  basePrice: number;
  adjustedPrice: number;
  occupancy: number;
}

export default function PricingManagementPage() {
  const [ratePlans, setRatePlans] = useState<RatePlan[]>([]);
  const [pricingCalendar, setPricingCalendar] = useState<PricingCalendar[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'plans' | 'calendar'>('plans');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<RatePlan | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    mealPlan: 'CP',
    refundable: true,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, calendarRes] = await Promise.all([
        fetch('/api/rate-plans'),
        fetch('/api/pricing-calendar'),
      ]);
      setRatePlans(await plansRes.json());
      setPricingCalendar(await calendarRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/rate-plans', {
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
      console.error('Failed to create rate plan:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPlan) return;
    try {
      const response = await fetch(`/api/rate-plans/${selectedPlan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchData();
        setShowEditModal(false);
        setSelectedPlan(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update rate plan:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rate plan?')) return;
    try {
      const response = await fetch(`/api/rate-plans/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Failed to delete rate plan:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      mealPlan: 'CP',
      refundable: true,
      isActive: true,
    });
  };

  const openEditModal = (plan: RatePlan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      mealPlan: plan.mealPlan,
      refundable: plan.refundable,
      isActive: plan.isActive,
    });
    setShowEditModal(true);
  };

  const filteredPlans = ratePlans.filter(plan =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const planStats = {
    total: ratePlans.length,
    active: ratePlans.filter(p => p.isActive).length,
    inactive: ratePlans.filter(p => !p.isActive).length,
    refundable: ratePlans.filter(p => p.refundable).length,
  };

  const avgOccupancy = pricingCalendar.length > 0
    ? Math.round(pricingCalendar.reduce((sum, p) => sum + p.occupancy, 0) / pricingCalendar.length)
    : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Management</h1>
          <p className="text-gray-600 mt-1">Manage rate plans and pricing calendar</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'plans' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Rate Plans
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pricing Calendar
          </button>
        </div>
      </div>

      {activeTab === 'plans' && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{planStats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <p className="text-sm text-green-700">Active</p>
              <p className="text-2xl font-bold text-green-900">{planStats.active}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">{planStats.inactive}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
              <p className="text-sm text-blue-700">Refundable</p>
              <p className="text-2xl font-bold text-blue-900">{planStats.refundable}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search rate plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Rate Plan
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <DollarSign className="text-blue-600 mt-1" size={24} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                          {plan.isActive && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Meal Plan</p>
                            <p className="font-medium text-gray-900">{plan.mealPlan}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Refundable</p>
                            <p className="font-medium text-gray-900">{plan.refundable ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => openEditModal(plan)}
                      className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 size={14} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

      {activeTab === 'calendar' && (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-600" size={20} />
              <h3 className="font-semibold text-blue-900">Average Occupancy</h3>
            </div>
            <p className="text-3xl font-bold text-blue-900">{avgOccupancy}%</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Base Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adjusted Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupancy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingCalendar.map((pricing, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-900">{new Date(pricing.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{pricing.roomTypeId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">₹{pricing.basePrice.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">₹{pricing.adjustedPrice.toLocaleString()}</span>
                        {pricing.adjustedPrice !== pricing.basePrice && (
                          <span className={`ml-2 text-xs ${
                            pricing.adjustedPrice > pricing.basePrice ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {pricing.adjustedPrice > pricing.basePrice ? '+' : ''}
                            {Math.round(((pricing.adjustedPrice - pricing.basePrice) / pricing.basePrice) * 100)}%
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                pricing.occupancy >= 80 ? 'bg-green-600' :
                                pricing.occupancy >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${pricing.occupancy}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{pricing.occupancy}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Create Rate Plan' : 'Edit Rate Plan'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Best Available Rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Plan</label>
                <select
                  value={formData.mealPlan}
                  onChange={(e) => setFormData({ ...formData, mealPlan: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EP">EP (Room Only)</option>
                  <option value="CP">CP (Breakfast)</option>
                  <option value="MAP">MAP (Half Board)</option>
                  <option value="AP">AP (Full Board)</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="refundable"
                    checked={formData.refundable}
                    onChange={(e) => setFormData({ ...formData, refundable: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="refundable" className="ml-2 text-sm font-medium text-gray-700">
                    Refundable
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
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
                  setSelectedPlan(null);
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
    </div>
  );
}
