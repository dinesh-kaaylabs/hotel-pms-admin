
import React from 'react';
import { Payment } from '../payments.types';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { MoreVertical, Loader2, ArrowUpRight } from 'lucide-react';

interface Props {
  data: Payment[];
  isLoading: boolean;
  onRowClick: (payment: Payment) => void;
}

export const PaymentsTable: React.FC<Props> = ({ data, isLoading, onRowClick }) => {
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
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking #</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Provider</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Amount</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((payment) => (
            <tr 
              key={payment.id} 
              onClick={() => onRowClick(payment)}
              className="hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-slate-900">{payment.bookingNumber}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{payment.provider}</span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 uppercase font-medium">
                {payment.method}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-bold text-slate-900">{payment.currency} {payment.amount.toFixed(2)}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <PaymentStatusBadge status={payment.status} />
              </td>
              <td className="px-6 py-4 text-xs text-slate-500">
                {payment.createdAt}
              </td>
              <td className="px-6 py-4 text-right">
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors ml-auto" />
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                No transaction records found matching the criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
