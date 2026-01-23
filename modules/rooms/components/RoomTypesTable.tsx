
import React from 'react';
import { RoomType } from '../rooms.types';
import { MoreVertical, Edit2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Props {
  data: RoomType[];
  isLoading: boolean;
  onEdit: (type: RoomType) => void;
}

export const RoomTypesTable: React.FC<Props> = ({ data, isLoading, onEdit }) => {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Room Type Name</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Base Capacity</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Max Capacity</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((type) => (
            <tr key={type.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-slate-900">{type.name}</span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{type.baseOccupancy} Guests</td>
              <td className="px-6 py-4 text-sm text-slate-600">{type.maxOccupancy} Guests</td>
              <td className="px-6 py-4">
                {type.active ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                    <CheckCircle2 size={14} /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg w-fit">
                    <XCircle size={14} /> Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onEdit(type)}
                  className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                >
                  <Edit2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
