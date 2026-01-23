
import React from 'react';
import { SettlementSummary } from '../settlements.types';
import { DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import { AnimatedNumber } from '../../../components/ui/AnimatedNumber';
import { useCurrency } from '../../../providers/CurrencyProvider';

export const SettlementSummaryCards: React.FC<{ summary: SettlementSummary | undefined; loading: boolean }> = ({ summary, loading }) => {
  const { format, config } = useCurrency();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign size={20} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Revenue</p>
        </div>
        <h3 className="text-2xl font-black text-slate-900">
          {loading ? '...' : <AnimatedNumber value={format(summary?.grossRevenue || 0)} />}
        </h3>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Receivable</p>
        </div>
        <h3 className="text-2xl font-black text-slate-900">
          {loading ? '...' : <AnimatedNumber value={format(summary?.netReceivable || 0)} />}
        </h3>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={20} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Payout</p>
        </div>
        <h3 className="text-2xl font-black text-slate-900">
          {loading ? '...' : <AnimatedNumber value={format(summary?.pendingPayout || 0)} />}
        </h3>
      </div>
    </div>
  );
};
