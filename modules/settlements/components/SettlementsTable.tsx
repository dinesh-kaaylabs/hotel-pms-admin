
import React from 'react';
import { Settlement } from '../settlements.types';
import { SettlementStatusBadge } from './SettlementStatusBadge';
import { ArrowUpRight, Loader2, CreditCard, Building, Globe } from 'lucide-react';
import { useCurrency } from '../../../providers/CurrencyProvider';

interface Props {
  data: Settlement[];
  isLoading: boolean;
  onRowClick: (settlement: Settlement) => void;
}

const SourceIcon: React.FC<{ source: string }> = ({ source }) => {
  if (source === 'RAZORPAY') return <CreditCard size={14} className="text-indigo-500" />;
  if (source === 'DIRECT') return <Building size={14} className="text-slate-500" />;
  return <Globe size={14} className="text-sky-500" />;
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
};

export const SettlementsTable: React.FC<Props> = ({ data, isLoading, onRowClick }) => {
  const { format } = useCurrency();
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Source</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Reference ID</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Gross</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Net Receivable</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Expected Date</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr 
              key={item.id} 
              onClick={() => onRowClick(item)}
              className="hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <SourceIcon source={item.source} />
                  <span className="text-xs font-bold text-slate-900">{item.source.replace('_', '.')}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.referenceId}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-xs font-medium text-slate-500 line-through opacity-60">
                  {format(item.grossAmount)}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-black text-slate-900">
                  {format(item.netAmount)}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <SettlementStatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4 text-[11px] text-slate-500 font-bold">
                {formatDate(item.settledAt || item.expectedAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-auto" />
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                No settlement records found for this period.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
