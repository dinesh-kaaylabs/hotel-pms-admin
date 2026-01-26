
import React from 'react';
import { RoomInventory } from '../rooms.types';
import { RoomStatusBadge } from './RoomStatusBadge';
import { Loader2, Calendar } from 'lucide-react';
import { EmptyState } from '../../../components/ui/EmptyState';

interface Props {
  data: RoomInventory[];
  isLoading: boolean;
}

export const InventoryTable: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Inventory Data"
        description="No room inventory data found for the selected date range. Try adjusting your filters or date range."
      />
    );
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Rooms</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Available</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Sell Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-slate-900">{item.date}</span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                {item.totalRooms} Units
              </td>
              <td className="px-6 py-4">
                <span className={`text-sm font-bold ${item.availableRooms < 5 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {item.availableRooms} Left
                </span>
              </td>
              <td className="px-6 py-4">
                <RoomStatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
