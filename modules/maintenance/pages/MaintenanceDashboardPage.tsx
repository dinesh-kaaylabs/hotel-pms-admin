
import React, { useState } from 'react';
import { useMaintenanceIssues, useResolveMaintenance } from '../maintenance.api';
import { MaintenanceCard } from '../components/MaintenanceCard';
import { CreateMaintenanceDrawer } from '../components/CreateMaintenanceDrawer';
import { PageTransition } from '../../../app/layout/PageTransition';
import { useAuth } from '../../../auth/AuthContext';
import { 
  Wrench, 
  Search, 
  Plus, 
  RefreshCcw, 
  LayoutGrid, 
  ClipboardList 
} from 'lucide-react';

export const MaintenanceDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { data: issues, isLoading, refetch } = useMaintenanceIssues(filter === 'ALL' ? undefined : filter);
  const resolveMutation = useResolveMaintenance();

  const filteredIssues = (issues || []).filter(issue => 
    issue.roomNumber.includes(search) || 
    issue.reason.toLowerCase().includes(search.toLowerCase())
  );

  const canManage = user?.role === 'SUPER_ADMIN' || user?.role === 'HOTEL_ADMIN';

  const handleResolve = (id: string) => {
    if (confirm('Are you sure the issue is resolved and the room is ready for cleaning/sale?')) {
      resolveMutation.mutate(id);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-8 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="text-indigo-600" /> Maintenance & OOO
            </h1>
            <p className="text-slate-500 text-sm mt-1">Track room repairs and manage out-of-order blocks</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => refetch()}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <RefreshCcw size={20} />
            </button>
            {canManage && (
              <button 
                onClick={() => setDrawerOpen(true)}
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
              >
                <Plus size={18} /> Block Room
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-hide pb-2 sm:pb-0">
            {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
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
              placeholder="Search room or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Board View */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl border border-slate-200" />
            ))}
          </div>
        ) : filteredIssues.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <MaintenanceCard 
                key={issue.id} 
                issue={issue} 
                onResolve={handleResolve}
                canManage={canManage}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center">
            <ClipboardList size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest">No active maintenance issues found</p>
            <p className="text-xs text-slate-400 mt-2">All rooms are currently in service or match filters.</p>
          </div>
        )}

        <CreateMaintenanceDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setDrawerOpen(false)} 
        />
      </div>
    </PageTransition>
  );
};
