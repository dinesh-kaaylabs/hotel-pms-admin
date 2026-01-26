import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Building2, CreditCard } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  status: string;
  subscriptionId: string;
  createdAt: string;
  contactEmail?: string;
  contactPhone?: string;
  billingAddress?: string;
}

interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: string;
  amount: number;
  currentPeriodEnd: string;
}

interface Plan {
  id: string;
  name: string;
  maxHotels: number;
  maxUsers: number;
  price: number;
  billingCycle: string;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contactEmail: '',
    contactPhone: '',
    billingAddress: '',
    planId: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tenantsRes, subsRes, plansRes] = await Promise.all([
        fetch('/api/tenants'),
        fetch('/api/subscriptions'),
        fetch('/api/plans'),
      ]);
      setTenants(await tenantsRes.json());
      setSubscriptions(await subsRes.json());
      setPlans(await plansRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/tenants', {
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
      console.error('Failed to create tenant:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedTenant) return;
    try {
      const response = await fetch(`/api/tenants/${selectedTenant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchData();
        setShowEditModal(false);
        setSelectedTenant(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update tenant:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tenant?')) return;
    try {
      const response = await fetch(`/api/tenants/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Failed to delete tenant:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactEmail: '',
      contactPhone: '',
      billingAddress: '',
      planId: '',
    });
  };

  const openEditModal = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setFormData({
      name: tenant.name,
      contactEmail: tenant.contactEmail || '',
      contactPhone: tenant.contactPhone || '',
      billingAddress: tenant.billingAddress || '',
      planId: subscriptions.find(s => s.tenantId === tenant.id)?.planId || '',
    });
    setShowEditModal(true);
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTenantSubscription = (tenantId: string) => {
    return subscriptions.find(s => s.tenantId === tenantId);
  };

  const getPlanName = (planId: string) => {
    return plans.find(p => p.id === planId)?.name || 'N/A';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants & Subscriptions</h1>
          <p className="text-gray-600 mt-1">Manage hotel groups and their subscription plans</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Tenant
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search tenants by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading tenants...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTenants.map((tenant) => {
            const subscription = getTenantSubscription(tenant.id);
            return (
              <div key={tenant.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="text-blue-600" size={24} />
                      <h3 className="text-xl font-semibold text-gray-900">{tenant.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tenant.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tenant.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-gray-600">Contact Email</p>
                        <p className="font-medium text-gray-900">{tenant.contactEmail || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Contact Phone</p>
                        <p className="font-medium text-gray-900">{tenant.contactPhone || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Billing Address</p>
                        <p className="font-medium text-gray-900">{tenant.billingAddress || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Created</p>
                        <p className="font-medium text-gray-900">{new Date(tenant.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {subscription && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="text-green-600" size={18} />
                          <span className="font-semibold text-gray-900">Subscription Details</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Plan</p>
                            <p className="font-medium text-gray-900">{getPlanName(subscription.planId)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Amount</p>
                            <p className="font-medium text-gray-900">₹{subscription.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Period End</p>
                            <p className="font-medium text-gray-900">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openEditModal(tenant)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(tenant.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Create New Tenant' : 'Edit Tenant'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tenant name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                <textarea
                  value={formData.billingAddress}
                  onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter billing address"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                <select
                  value={formData.planId}
                  onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a plan</option>
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - ₹{plan.price.toLocaleString()} ({plan.billingCycle})
                    </option>
                  ))}
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
                  setSelectedTenant(null);
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
