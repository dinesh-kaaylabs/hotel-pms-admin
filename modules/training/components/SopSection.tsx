
import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { SopSectionData } from '../training.types';

export const SopSection: React.FC<SopSectionData> = ({ title, items, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'checklist': return <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />;
      case 'caution': return <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />;
      case 'success': return <CheckCircle2 size={18} className="text-indigo-500 shrink-0 mt-0.5" />;
      default: return <ChevronRight size={16} className="text-slate-300 shrink-0 mt-0.5" />;
    }
  };

  const getContainerStyle = () => {
    switch (type) {
      case 'caution': return 'bg-rose-50/50 border-rose-100';
      case 'checklist': return 'bg-emerald-50/50 border-emerald-100';
      default: return 'bg-white border-slate-100';
    }
  };

  return (
    <div className={`p-6 rounded-3xl border ${getContainerStyle()} space-y-4`}>
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm font-medium text-slate-700 leading-relaxed">
            {getIcon()}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
