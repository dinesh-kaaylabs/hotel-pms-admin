
import React from 'react';
import { Calendar, RefreshCcw } from 'lucide-react';
import { ReportParams } from '../reports.types';

interface Props {
  params: ReportParams;
  onParamsChange: (params: ReportParams) => void;
}

export const ReportFilters: React.FC<Props> = ({ params, onParamsChange }) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex-1">
        <Calendar size={18} className="text-slate-400" />
        <div className="flex items-center gap-2">
          <input 
            type="date"
            value={params.startDate}
            onChange={(e) => onParamsChange({ ...params, startDate: e.target.value })}
            className="bg-transparent border-none text-xs font-bold text-slate-600 outline-none focus:ring-0"
          />
          <span className="text-slate-300 font-black">TO</span>
          <input 
            type="date"
            value={params.endDate}
            onChange={(e) => onParamsChange({ ...params, endDate: e.target.value })}
            className="bg-transparent border-none text-xs font-bold text-slate-600 outline-none focus:ring-0"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => {
             // Reset logic if needed or just trigger re-fetch by state update
          }}
          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
        >
          <RefreshCcw size={20} />
        </button>
      </div>
    </div>
  );
};
