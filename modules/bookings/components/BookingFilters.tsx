
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { BookingStatus } from '../bookings.types';
import { useDebounce } from '../../../hooks/useDebounce';

interface BookingFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({ 
  search, 
  status, 
  onSearchChange, 
  onStatusChange 
}) => {
  // Local state for the input to ensure UI is snappy
  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 500);

  // Synchronize internal state with external resets
  useEffect(() => {
    setInputValue(search);
  }, [search]);

  // Effect to trigger search change only after debounce
  useEffect(() => {
    if (debouncedSearch !== search) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange, search]);

  return (
    <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search guest or booking #"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
        <select 
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer hover:bg-slate-100 transition-colors"
        >
          <option value="ALL">All Status</option>
          {Object.values(BookingStatus).map(s => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
      
      <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all">
        <Filter size={14} /> Advanced
      </button>
    </div>
  );
};
