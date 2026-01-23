
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  // Fix: changed type from string | number to React.ReactNode to support passing JSX components like AnimatedNumber
  value: React.ReactNode;
  icon: LucideIcon;
  colorClass: string;
  loading?: boolean;
}

export const ReportKpiCard: React.FC<Props> = ({ label, value, icon: Icon, colorClass, loading }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"
    >
      <div className={`p-4 rounded-2xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        {loading ? (
          <div className="h-7 w-24 bg-slate-100 animate-pulse rounded mt-1"></div>
        ) : (
          <h3 className="text-2xl font-black text-slate-900 mt-0.5">{value}</h3>
        )}
      </div>
    </motion.div>
  );
};
