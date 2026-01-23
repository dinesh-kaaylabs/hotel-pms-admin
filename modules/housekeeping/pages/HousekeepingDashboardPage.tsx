
import React, { useState } from 'react';
import { 
  useHousekeepingRooms, 
  useHousekeepingSummary, 
  useUpdateHousekeepingStatus 
} from '../housekeeping.api';
import { RoomStatusCard } from '../components/RoomStatusCard';
import { CleaningLogDrawer } from '../components/CleaningLogDrawer';
import { HousekeepingRoom, HousekeepingStatus } from '../housekeeping.types';
import { PageTransition } from '../../../app/layout/PageTransition';
import { 
  LayoutGrid, 
  Filter, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Ban, 
  RefreshCcw 
} from 'lucide-react';

export const HousekeepingDashboardPage: React.FC = () => {
  const { data: rooms, isLoading, refetch } = useHousekeepingRooms();
  const { data: summary } = useHousekeepingSummary();
  const updateStatus = useUpdateHousekeepingStatus();

  const [filter, setFilter] = useState<HousekeepingStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<HousekeepingRoom | null>(null);
  const [isLogsOpen, setLogsOpen] = useState(false);

  const filteredRooms = (rooms || []).filter(room => {
    const matchesFilter = filter === 'ALL' || room.status === filter;
    const matchesSearch = room.roomNumber.includes(search) || room.assignedStaff?.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (room: HousekeepingRoom, status: HousekeepingStatus) => {
    updateStatus.mutate({ roomId: room.id, status });
  };

  const handleViewLogs = (room: HousekeepingRoom) => {
    setSelectedRoom(room);
    setLogsOpen(true);
  };

  return (
    <PageTransition>
      <div className="space-y-8 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Housekeeping Board</h1>
            <p className="text-slate-500 text-sm mt-1">Live operational status and cleaning workflow</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => refetch()}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <RefreshCcw size={20} />
            </button>
            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg">
              Daily Report
            </button>
          </div>
        </div>

        {/* Operational Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle size={14} className="text-rose-500" /> Dirty
            </p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{summary?.dirty ?? '...'}</h4>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Clean
            </p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{summary?.clean ?? '...'}</h4>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Search size={14} className="text-blue-500" /> Inspected
            </p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{summary?.inspected ?? '...'}</h4>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Ban size={14} className="text-slate-400" /> OOS
            </p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{summary?.outOfService ?? '...'}</h4>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-hide pb-2 sm:pb-0">
            {['ALL', 'DIRTY', 'CLEAN', 'INSPECTED', 'OUT_OF_SERVICE'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  filter === s 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Room or staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Room Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-3xl border border-slate-200" />
            ))}
          </div>
        ) : filteredRooms.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomStatusCard 
                key={room.id} 
                room={room} 
                onAssign={() => {}} // Integration logic to be expanded
                onViewLogs={handleViewLogs}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No rooms match your filters</p>
          </div>
        )}

        <CleaningLogDrawer 
          roomId={selectedRoom?.id ?? null}
          roomNumber={selectedRoom?.roomNumber ?? null}
          isOpen={isLogsOpen}
          onClose={() => setLogsOpen(false)}
        />
      </div>
    </PageTransition>
  );
};
