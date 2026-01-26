import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MaintenanceIssue {
  id: string;
  hotelId: string;
  roomId: string;
  issueType: string;
  priority: string;
  reportedBy: string;
  status: string;
  description: string;
  slaDeadline: string;
}

export default function MaintenanceManagementPage() {
  const [issues, setIssues] = useState<MaintenanceIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<MaintenanceIssue | null>(null);
  
  const [formData, setFormData] = useState({
    roomId: '',
    issueType: 'PLUMBING',
    priority: 'MEDIUM',
    description: '',
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/maintenance/issues');
      setIssues(await response.json());
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/maintenance/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchIssues();
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to create issue:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedIssue) return;
    try {
      const response = await fetch(`/api/maintenance/issues/${selectedIssue.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchIssues();
        setShowEditModal(false);
        setSelectedIssue(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update issue:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    try {
      const response = await fetch(`/api/maintenance/issues/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchIssues();
      }
    } catch (error) {
      console.error('Failed to delete issue:', error);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      const response = await fetch(`/api/maintenance/issues/${id}/resolve`, {
        method: 'POST',
      });
      if (response.ok) {
        await fetchIssues();
      }
    } catch (error) {
      console.error('Failed to resolve issue:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      roomId: '',
      issueType: 'PLUMBING',
      priority: 'MEDIUM',
      description: '',
    });
  };

  const openEditModal = (issue: MaintenanceIssue) => {
    setSelectedIssue(issue);
    setFormData({
      roomId: issue.roomId,
      issueType: issue.issueType,
      priority: issue.priority,
      description: issue.description,
    });
    setShowEditModal(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return <AlertTriangle size={18} className="text-red-600" />;
      case 'IN_PROGRESS': return <Clock size={18} className="text-blue-600" />;
      case 'RESOLVED': return <CheckCircle size={18} className="text-green-600" />;
      case 'CLOSED': return <CheckCircle size={18} className="text-gray-600" />;
      default: return null;
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.roomId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'ALL' || issue.priority === priorityFilter;
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const issueStats = {
    total: issues.length,
    open: issues.filter(i => i.status === 'OPEN').length,
    inProgress: issues.filter(i => i.status === 'IN_PROGRESS').length,
    resolved: issues.filter(i => i.status === 'RESOLVED').length,
    critical: issues.filter(i => i.priority === 'CRITICAL').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Management</h1>
          <p className="text-gray-600 mt-1">Track and manage maintenance issues</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Report Issue
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Issues</p>
          <p className="text-2xl font-bold text-gray-900">{issueStats.total}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
          <p className="text-sm text-red-700">Open</p>
          <p className="text-2xl font-bold text-red-900">{issueStats.open}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-blue-700">In Progress</p>
          <p className="text-2xl font-bold text-blue-900">{issueStats.inProgress}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-green-700">Resolved</p>
          <p className="text-2xl font-bold text-green-900">{issueStats.resolved}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg shadow-sm border border-orange-200">
          <p className="text-sm text-orange-700">Critical</p>
          <p className="text-2xl font-bold text-orange-900">{issueStats.critical}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by room or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Priorities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading issues...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className={`rounded-lg shadow-sm border-2 p-5 hover:shadow-md transition-shadow ${getPriorityColor(issue.priority)}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <Wrench className="text-gray-700 mt-1" size={20} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{issue.issueType}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        <span className="ml-1">{issue.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Room</p>
                        <p className="font-medium text-gray-900">{issue.roomId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Priority</p>
                        <p className="font-medium text-gray-900">{issue.priority}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Reported By</p>
                        <p className="font-medium text-gray-900">{issue.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">SLA Deadline</p>
                        <p className="font-medium text-gray-900">{new Date(issue.slaDeadline).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-300">
                {issue.status !== 'RESOLVED' && issue.status !== 'CLOSED' && (
                  <button
                    onClick={() => handleResolve(issue.id)}
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle size={14} className="inline mr-1" />
                    Resolve
                  </button>
                )}
                <button
                  onClick={() => openEditModal(issue)}
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 size={14} className="inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(issue.id)}
                  className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{showCreateModal ? 'Report New Issue' : 'Edit Issue'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
                <input
                  type="text"
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., r-01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PLUMBING">Plumbing</option>
                  <option value="ELECTRICAL">Electrical</option>
                  <option value="HVAC">HVAC</option>
                  <option value="FURNITURE">Furniture</option>
                  <option value="CLEANING">Cleaning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the issue..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showCreateModal ? 'Report Issue' : 'Update Issue'}
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedIssue(null);
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
