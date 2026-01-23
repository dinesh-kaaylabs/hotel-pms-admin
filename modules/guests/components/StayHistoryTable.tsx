
import React from 'react';
import { GuestStay } from '../guests.types';

export const StayHistoryTable: React.FC<{ stays: GuestStay[]; currency: string }> = ({ stays, currency }) => {
  return (
    <div className="overflow-hidden border border-slate-100 rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking #</th>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stay Period</th>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Type</th>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {stays.map((stay) => (
            <tr key={stay.bookingNumber} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3">
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{stay.bookingNumber}</span>
              </td>
              <td className="px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">
                {stay.checkInDate} — {stay.checkOutDate}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500 font-medium">{stay.roomType}</td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm font-black text-slate-900">{currency} {stay.amountPaid.toFixed(2)}</span>
              </td>
              <td className="px-4 py-3 text-center">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-tight ${
                    stay.status === 'CHECKED_OUT' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                 }`}>
                  {stay.status.replace('_', ' ')}
                 </span>
              </td>
            </tr>
          ))}
          {stays.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-slate-400 italic text-sm">No stay history recorded.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
