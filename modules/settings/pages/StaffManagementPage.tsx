import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, User, Mail, Phone, Shield, Building } from 'lucide-react';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  hotelId: string;
  department: string;
  isActive: boolean;
}

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffUser | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'FRONT_DESK',
    hotelId: '',
    department: 'FRONT_OFFICE',
    isActive: true,
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/staff');
      setStaff(await response.json());
    } catch (error) {
      // Error handled silently - user will see empty state
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchStaff();
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleUpdate = async () => {
    if (!selectedStaff) return;
    try {
      const response = await fetch(`/api/staff/${selectedStaff.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchStaff();
        setShowEditModal(false);
        setSelectedStaff(null);
        resetForm();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    try {
      const response = await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await         fetchStaff();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/staff/${id}/toggle-active`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (response.ok) {
        await         fetchStaff();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'FRONT_DESK',
      hotelId: '',
      department: 'FRONT_OFFICE',
      isActive: true,
    });
  };

  const openEditModal = (staffMember: StaffUser) => {
    setSelectedStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role,
      hotelId: staffMember.hotelId,
      department: staffMember.department,
      isActive: staffMember.isActive,
    });
    setShowEditModal(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'HOTEL_ADMIN': return 'bg-purple-100 text-purple-800';
      case 'HOTEL_MANAGER': return 'bg-blue-100 text-blue-800';
      case 'FRONT_DESK': return 'bg-green-100 text-green-800';
      case 'HOUSEKEEPING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || member.role === roleFilter;
    const matchesDepartment = departmentFilter === 'ALL' || member.department === departmentFilter;
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const staffStats = {
    total: staff.length,
    active: staff.filter(s => s.isActive).length,
    inactive: staff.filter(s => !s.isActive).length,
    managers: staff.filter(s => s.role === 'HOTEL_MANAGER' || s.role === 'HOTEL_ADMIN').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage hotel staff and user accounts</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Staff</p>
          <p className="text-2xl font-bold text-gray-900">{staffStats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-green-700">Active</p>
          <p className="text-2xl font-bold text-green-900">{staffStats.active}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-700">Inactive</p>
          <p className="text-2xl font-bold text-gray-900">{staffStats.inactive}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-blue-700">Managers</p>
          <p className="text-2xl font-bold text-blue-900">{staffStats.managers}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Roles</option>
          <option value="HOTEL_ADMIN">Hotel Admin</option>
          <option value="HOTEL_MANAGER">Hotel Manager</option>
          <option value="FRONT_DESK">Front Desk</option>
          <option value="HOUSEKEEPING">Housekeeping</option>
          <option value="CHEF">Chef</option>
          <option value="CONCIERGE">Concierge</option>
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Departments</option>
          <option value="FRONT_OFFICE">Front Office</option>
          <option value="HK">Housekeeping</option>
          <option value="FNB">F&B</option>
          <option value="ADMIN">Admin</option>
          <option value="SALES">Sales</option>
          <option value="IT">IT</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading staff...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <User className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Mail size={12} />
                          <span>{member.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-blue-600" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{member.department}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{member.hotelId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(member.id, member.isActive)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      } transition-colors`}
                    >
                      {member.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(member)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Add New Staff' : 'Edit Staff Member'}</h2>
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="HOTEL_ADMIN">Hotel Admin</option>
                  <option value="HOTEL_MANAGER">Hotel Manager</option>
                  <option value="FRONT_DESK">Front Desk</option>
                  <option value="HOUSEKEEPING">Housekeeping</option>
                  <option value="CHEF">Chef</option>
                  <option value="CONCIERGE">Concierge</option>
                  <option value="SECURITY">Security</option>
                  <option value="IT_SUPPORT">IT Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="FRONT_OFFICE">Front Office</option>
                  <option value="HK">Housekeeping</option>
                  <option value="FNB">F&B</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SALES">Sales</option>
                  <option value="IT">IT</option>
                  <option value="SECURITY">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel ID</label>
                <input
                  type="text"
                  value={formData.hotelId}
                  onChange={(e) => setFormData({ ...formData, hotelId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., h-01"
                />
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
            <div className="flex gap-3 mt-6">
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showCreateModal ? 'Add Staff' : 'Update Staff'}
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedStaff(null);
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
