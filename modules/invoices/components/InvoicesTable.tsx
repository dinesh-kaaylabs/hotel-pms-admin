
import React from 'react';
import { Invoice } from '../invoices.types';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { Loader2, ArrowRight, FileText } from 'lucide-react';
import { useCurrency } from '../../../providers/CurrencyProvider';

interface Props {
  data: Invoice[];
  isLoading: boolean;
  onRowClick: (invoice: Invoice) => void;
}

export const InvoicesTable: React.FC<Props> = ({ data, isLoading, onRowClick }) => {
  const { format } = useCurrency();
  
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice #</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking #</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Total Value</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issued Date</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((inv) => (
            <tr 
              key={inv.id} 
              onClick={() => onRowClick(inv)}
              className="hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span className="text-sm font-bold text-slate-900">{inv.invoiceNumber}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{inv.bookingNumber}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-slate-700">{inv.guestName}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-black text-slate-900">{format(inv.totalAmount)}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <InvoiceStatusBadge status={inv.status} />
              </td>
              <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                {inv.issuedAt}
              </td>
              <td className="px-6 py-4 text-right">
                <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-all transform group-hover:translate-x-1 ml-auto" />
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                No invoices found matching current criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
