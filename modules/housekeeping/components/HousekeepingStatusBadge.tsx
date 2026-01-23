
import React from 'react';
import { HousekeepingStatus } from '../housekeeping.types';
import { AlertCircle, CheckCircle2, Search, Ban, Users } from 'lucide-react';

const CONFIG: Record<HousekeepingStatus, { label: string; class: string; icon: any }> = {
  DIRTY: { label: 'Dirty', class: 'bg-rose-50 text-rose-700 border-rose-100', icon: AlertCircle },
  CLEAN: { label: 'Clean', class: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: CheckCircle2 },
  INSPECTED: { label: 'Inspected', class: 'bg-blue-50 text-blue-700 border-blue-100', icon: Search },
  OUT_OF_SERVICE: { label: 'OOS', class: 'bg-slate-100 text-slate-600 border-slate-200', icon: Ban },
  OCCUPIED: { label: 'Occupied', class: 'bg-purple-50 text-purple-700 border-purple-100', icon: Users },
};

export const HousekeepingStatusBadge: React.FC<{ status: HousekeepingStatus }> = ({ status }) => {
  const config = CONFIG[status];
  
  if (!config) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider bg-gray-50 text-gray-700 border-gray-100">
        {status}
      </span>
    );
  }
  
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${config.class}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
};
