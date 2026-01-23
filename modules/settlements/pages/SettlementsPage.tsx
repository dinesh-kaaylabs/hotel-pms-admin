
import React, { useState } from 'react';
import { Landmark, Download, RefreshCcw, Info } from 'lucide-react';
import { useSettlements, useSettlementSummary } from '../settlements.api';
import { SettlementSummaryCards } from '../components/SettlementSummaryCards';
import { SettlementFilters } from '../components/SettlementFilters';
import { SettlementsTable } from '../components/SettlementsTable';
import { SettlementDetailsDrawer } from '../components/SettlementDetailsDrawer';
import { SettlementFilters as IFilters, Settlement } from '../settlements.types';
import { PageTransition } from '../../../app/layout/PageTransition';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';

export const SettlementsPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [filters, setFilters] = useState<IFilters>({
    startDate: lastWeek,
    endDate: today
  });
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);

  const { data: settlements, isLoading, refetch } = useSettlements(filters);
  const { data: summary, isLoading: isSummaryLoading } = useSettlementSummary({ 
    startDate: filters.startDate || lastWeek, 
    endDate: filters.endDate || today 
  });

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="text-indigo-600" /> Settlement & Payouts
            </h1>
            <p className="text-slate-500 text-sm mt-1">Reconcile revenue across gateways and booking channels</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => refetch()}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <RefreshCcw size={20} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg">
              <Download size={18} /> Payout Report
            </button>
          </div>
        </div>

        <SettlementSummaryCards summary={summary} loading={isSummaryLoading} />

        <SettlementFilters filters={filters} onFilterChange={setFilters} />

        {isLoading ? (
          <TableSkeleton rows={10} cols={6} />
        ) : (
          <SettlementsTable 
            data={settlements || []} 
            isLoading={false} 
            onRowClick={setSelectedSettlement} 
          />
        )}

        <div className="bg-amber-50 p-4 rounded-3xl border border-amber-100 flex gap-3">
          <Info className="text-amber-600 shrink-0" size={20} />
          <p className="text-[11px] text-amber-700 leading-relaxed font-bold uppercase tracking-tight">
            Compliance Note: Payout amounts shown are inclusive of all taxes and channel commissions already deducted at source. Ensure your internal accounting matches these net receivable figures for audit safety.
          </p>
        </div>

        <SettlementDetailsDrawer 
          settlement={selectedSettlement} 
          onClose={() => setSelectedSettlement(null)} 
        />
      </div>
    </PageTransition>
  );
};
