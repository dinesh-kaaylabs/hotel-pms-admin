
import React from 'react';
import { TopRoomType } from '../reports.types';
import { Loader2, TrendingUp } from 'lucide-react';
import { useCurrency } from '../../../providers/CurrencyProvider';

interface Props {
  data: TopRoomType[];
  isLoading: boolean;
}

export const TopRoomTypesTable: React.FC<Props> = ({ data, isLoading }) => {
  const { format } = useCurrency();
  
  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-100 rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Category</th>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Bookings</th>
            <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-sm">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-bold text-slate-700">{item.roomType}</td>
              <td className="px-4 py-3 text-center text-slate-600 font-medium">{item.bookings}</td>
              <td className="px-4 py-3 text-right font-black text-slate-900">{format(item.revenue)}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-slate-400 italic">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
