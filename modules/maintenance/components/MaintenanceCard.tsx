
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Wrench, CheckCircle2, MoreVertical } from 'lucide-react';
import { MaintenanceIssue } from '../maintenance.types';
import { MaintenanceStatusBadge } from './MaintenanceStatusBadge';

interface Props {
  issue: MaintenanceIssue;
  onResolve: (id: string) => void;
  canManage: boolean;
}

export const MaintenanceCard: React.FC<Props> = ({ issue, onResolve, canManage }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
              <Wrench size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-none">{issue.roomNumber}</h3>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{issue.roomType}</p>
            </div>
          </div>
          <MaintenanceStatusBadge status={issue.status} />
        </div>

        <div className="py-4 px-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
          <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
            "{issue.reason}"
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Calendar size={14} className="text-slate-400" />
            <span>{issue.blockedFrom} {issue.blockedTo ? `→ ${issue.blockedTo}` : '(Ongoing)'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <User size={14} className="text-slate-400" />
            Reported by: <span className="font-bold text-slate-700">{issue.reportedBy}</span>
          </div>
        </div>
      </div>

      {issue.status !== 'RESOLVED' && canManage && (
        <button
          onClick={() => onResolve(issue.id)}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-100"
        >
          <CheckCircle2 size={16} /> Mark Resolved
        </button>
      )}
      
      {issue.status === 'RESOLVED' && (
        <div className="text-center py-2 text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 rounded-xl">
          Resolved on {issue.resolvedAt}
        </div>
      )}
    </motion.div>
  );
};
