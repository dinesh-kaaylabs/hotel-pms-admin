
import React from 'react';
import { MaintenanceStatus } from '../maintenance.types';
import { AlertCircle, Play, CheckCircle2 } from 'lucide-react';

const CONFIG: Record<MaintenanceStatus, { label: string; class: string; icon: any }> = {
  OPEN: { label: 'Open', class: 'bg-rose-50 text-rose-700 border-rose-100', icon: AlertCircle },
  IN_PROGRESS: { label: 'In Progress', class: 'bg-amber-50 text-amber-700 border-amber-100', icon: Play },
  RESOLVED: { label: 'Resolved', class: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: CheckCircle2 },
};

export const MaintenanceStatusBadge: React.FC<{ status: MaintenanceStatus }> = ({ status }) => {
  const config = CONFIG[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${config.class}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
};
