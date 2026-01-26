import { useState, useEffect } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react';

interface HousekeepingRoom {
  id: string;
  number: string;
  status: string;
  floor: number;
  assignedTo: string;
  lastCleaned: string;
}

interface CleaningLog {
  id: string;
  roomId: string;
  cleanedBy: string;
  cleanedAt: string;
  duration: number;
  status: string;
}

export default function HousekeepingManagementPage() {
  const [rooms, setRooms] = useState<HousekeepingRoom[]>([]);
  const [cleaningLogs, setCleaningLogs] = useState<CleaningLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [floorFilter, setFloorFilter] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [roomsRes, logsRes] = await Promise.all([
        fetch('/api/housekeeping/rooms'),
        fetch('/api/housekeeping/logs'),
      ]);
      setRooms(await roomsRes.json());
      setCleaningLogs(await logsRes.json());
    } catch (error) {
      // Error handled silently - user will see empty state
    } finally {
      setLoading(false);
    }
  };

  const handleMarkClean = async (roomId: string) => {
    try {
      const response = await fetch(`/api/housekeeping/rooms/${roomId}/mark-clean`, {
        method: 'POST',
      });
      if (response.ok) {
        await         fetchData();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleMarkDirty = async (roomId: string) => {
    try {
      const response = await fetch(`/api/housekeeping/rooms/${roomId}/mark-dirty`, {
        method: 'POST',
      });
      if (response.ok) {
        await         fetchData();
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CLEAN': return 'bg-green-100 text-green-800 border-green-200';
      case 'DIRTY': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'INSPECTED': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CLEAN': return <CheckCircle size={20} className="text-green-600" />;
      case 'DIRTY': return <AlertCircle size={20} className="text-yellow-600" />;
      case 'INSPECTED': return <Sparkles size={20} className="text-blue-600" />;
      default: return <Clock size={20} className="text-gray-600" />;
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || room.status === statusFilter;
    const matchesFloor = floorFilter === 'ALL' || room.floor.toString() === floorFilter;
    return matchesSearch && matchesStatus && matchesFloor;
  });

  const roomStats = {
    total: rooms.length,
    clean: rooms.filter(r => r.status === 'CLEAN').length,
    dirty: rooms.filter(r => r.status === 'DIRTY').length,
    inspected: rooms.filter(r => r.status === 'INSPECTED').length,
  };

  const avgCleaningTime = cleaningLogs.length > 0
    ? Math.round(cleaningLogs.reduce((sum, log) => sum + log.duration, 0) / cleaningLogs.length)
    : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Housekeeping Management</h1>
          <p className="text-gray-600 mt-1">Manage room cleaning and maintenance</p>
        </div>
      </div>

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
          <p className="text-sm text-blue-700">Inspected</p>
          <p className="text-2xl font-bold text-blue-900">{roomStats.inspected}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-200">
          <p className="text-sm text-purple-700">Avg Time</p>
          <p className="text-2xl font-bold text-purple-900">{avgCleaningTime}m</p>
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
          <option value="INSPECTED">Inspected</option>
        </select>
        <select
          value={floorFilter}
          onChange={(e) => setFloorFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Floors</option>
          {[...new Set(rooms.map(r => r.floor))].sort().map(floor => (
            <option key={floor} value={floor.toString()}>Floor {floor}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading rooms...</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredRooms.map((room) => (
            <div key={room.id} className={`rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition-shadow ${getStatusColor(room.status)}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(room.status)}
                  <span className="text-xl font-bold text-gray-900">{room.number}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Floor</p>
                  <p className="font-medium text-gray-900">{room.floor}</p>
                </div>
                <div>
                  <p className="text-gray-600">Assigned To</p>
                  <p className="font-medium text-gray-900 text-xs">{room.assignedTo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Cleaned</p>
                  <p className="font-medium text-gray-900 text-xs">{new Date(room.lastCleaned).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-300">
                {room.status !== 'CLEAN' && (
                  <button
                    onClick={() => handleMarkClean(room.id)}
                    className="w-full px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Mark Clean
                  </button>
                )}
                {room.status !== 'DIRTY' && (
                  <button
                    onClick={() => handleMarkDirty(room.id)}
                    className="w-full px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  >
                    Mark Dirty
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Cleaning Logs</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cleaned By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cleaned At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cleaningLogs.slice(0, 10).map((log) => {
                const room = rooms.find(r => r.id === log.roomId);
                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{room?.number || log.roomId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{log.cleanedBy}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{new Date(log.cleanedAt).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{log.duration} min</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
