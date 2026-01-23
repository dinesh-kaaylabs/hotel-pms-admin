
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { GuestFilters, GuestTag } from '../guests.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filters: GuestFilters;
  onApply: (filters: GuestFilters) => void;
}

export const AdvancedSegmentsFilter: React.FC<Props> = ({ isOpen, onClose, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState<GuestFilters>(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({});
    onApply({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="text-indigo-600" size={24} /> Advanced Segments
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Filter Guest Directory</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Guest Tags</label>
                  <div className="space-y-2">
                    {(['VIP', 'BLACKLISTED'] as GuestTag[]).map(tag => (
                      <label key={tag} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={localFilters.tag === tag}
                          onChange={(e) => setLocalFilters({ ...localFilters, tag: e.target.checked ? tag : undefined })}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm font-bold text-slate-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Search Term</label>
                  <input
                    type="text"
                    value={localFilters.search || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value || undefined })}
                    placeholder="Name, phone, or email..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
