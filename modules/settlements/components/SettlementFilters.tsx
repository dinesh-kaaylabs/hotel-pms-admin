
import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import { SettlementFilters as IFilters, SettlementSource, SettlementStatus } from '../settlements.types';

interface Props {
  filters: IFilters;
  onFilterChange: (filters: IFilters) => void;
}

export const SettlementFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-3 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 min-w-fit">
          <Calendar size={16} className="text-slate-400" />
          <input 
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
            className="bg-transparent border-none text-[11px] font-bold text-slate-600 outline-none w-28"
          />
          <span className="text-slate-300 font-black text-[10px]">TO</span>
          <input 
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
            className="bg-transparent border-none text-[11px] font-bold text-slate-600 outline-none w-28"
          />
        </div>
        
        <select 
          value={filters.source || ''}
          onChange={(e) => onFilterChange({ ...filters, source: e.target.value as SettlementSource || undefined })}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Sources</option>
          <option value="RAZORPAY">Razorpay</option>
          <option value="BOOKING_COM">Booking.com</option>
          <option value="EXPEDIA">Expedia</option>
          <option value="AGODA">Agoda</option>
          <option value="DIRECT">Direct (Bank)</option>
        </select>

        <select 
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value as SettlementStatus || undefined })}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Statuses</option>
          <option value="SETTLED">Settled</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>
      
      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shrink-0">
        <Filter size={16} /> Advanced Audit
      </button>
    </div>
  );
};
