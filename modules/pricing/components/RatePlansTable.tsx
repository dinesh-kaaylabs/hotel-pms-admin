
import React from 'react';
import { RatePlan } from '../pricing.types';
import { Edit2, ShieldCheck, ShieldAlert, Loader2, MoreVertical } from 'lucide-react';

interface Props {
  data: RatePlan[];
  isLoading: boolean;
  onEdit: (plan: RatePlan) => void;
}

export const RatePlansTable: React.FC<Props> = ({ data, isLoading, onEdit }) => {
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
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan Name</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Room Type</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Policies</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((plan) => (
            <tr key={plan.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <p className="text-sm font-bold text-slate-900">{plan.name}</p>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {plan.roomTypeName || 'All Rooms'}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {plan.refundable ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase border border-emerald-100">Refundable</span>
                  ) : (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded uppercase border border-rose-100">Non-Ref</span>
                  )}
                  {plan.minNights && (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">Min {plan.minNights}nt</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-lg ${
                  plan.status === 'ACTIVE' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                }`}>
                  {plan.status === 'ACTIVE' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                  {plan.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => onEdit(plan)}
                    className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
