import React from 'react';
import { CleaningLogStatus } from '../housekeeping.types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const CONFIG: Record<CleaningLogStatus, { label: string; class: string; icon: any }> = {
  COMPLETED: { label: 'Completed', class: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: CheckCircle2 },
  IN_PROGRESS: { label: 'In Progress', class: 'bg-amber-50 text-amber-700 border-amber-100', icon: Clock },
  PENDING: { label: 'Pending', class: 'bg-slate-50 text-slate-600 border-slate-200', icon: AlertCircle },
};

export const CleaningLogStatusBadge: React.FC<{ status: CleaningLogStatus }> = ({ status }) => {
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
