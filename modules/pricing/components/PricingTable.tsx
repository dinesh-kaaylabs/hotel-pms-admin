
import React from 'react';
import { RoomPrice } from '../pricing.types';
import { PriceBadge } from './PriceBadge';
import { Loader2, ArrowRight } from 'lucide-react';

interface Props {
  data: RoomPrice[];
  isLoading: boolean;
}

export const PricingTable: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm scrollbar-hide">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Date</th>
            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Base Price</th>
            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Inventory</th>
            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Sell Status</th>
            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-200">
                <p className="text-sm font-bold text-slate-900">{item.date}</p>
              </td>
              <td className="px-6 py-4">
                <PriceBadge amount={item.price} closed={item.closed} />
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`text-sm font-bold ${item.availableRooms < 3 ? 'text-rose-600' : 'text-slate-700'}`}>
                  {item.availableRooms} Units
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {item.closed ? (
                  <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase">Stop Sell</span>
                ) : (
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">Open</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1 ml-auto">
                  Detail <ArrowRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
