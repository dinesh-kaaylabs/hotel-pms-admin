
import React, { useState } from 'react';
import { useGuests, useExportGuests } from '../guests.api';
import { GuestsTable } from '../components/GuestsTable';
import { AdvancedSegmentsFilter } from '../components/AdvancedSegmentsFilter';
import { Search, Users, Download, Filter, Loader2 } from 'lucide-react';
import { PageTransition } from '../../../app/layout/PageTransition';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';
import { GuestFilters, GuestTag } from '../guests.types';
import { useToast } from '../../../components/ui/Toast';

export const GuestsPage: React.FC = () => {
  const { success, error } = useToast();
  const [filters, setFilters] = useState<GuestFilters>({});
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { data, isLoading } = useGuests(filters);
  const exportMutation = useExportGuests();

  const handleExport = async () => {
    try {
      const result = await exportMutation.mutateAsync(filters);
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = result.filename || `guests-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      success('Guest directory exported successfully');
    } catch (e: any) {
      error(e?.message || 'Failed to export guests');
    }
  };

  const handleAdvancedSegments = () => {
    setFilterOpen(true);
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="text-indigo-600" /> Guest CRM
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage guest relationships, stay history, and VIP status</p>
          </div>
          <button 
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg disabled:opacity-50"
          >
            {exportMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Exporting...
              </>
            ) : (
              <>
                <Download size={18} /> Export Directory
              </>
            )}
          </button>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name, phone or email..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
            
            <select 
              value={filters.tag || ''}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value as GuestTag || undefined })}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Guests</option>
              <option value="VIP">VIP Only</option>
              <option value="BLACKLISTED">Blacklisted</option>
            </select>
          </div>
          
          <button 
            onClick={handleAdvancedSegments}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Filter size={16} /> Advanced Segments
          </button>
        </div>

        {isLoading ? (
          <TableSkeleton rows={10} cols={5} />
        ) : (
          <GuestsTable data={data || []} />
        )}

        <AdvancedSegmentsFilter
          isOpen={isFilterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onApply={setFilters}
        />
      </div>
    </PageTransition>
  );
};
