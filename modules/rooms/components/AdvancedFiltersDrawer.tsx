
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Loader2 } from 'lucide-react';
import { RoomType } from '../rooms.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomTypes: RoomType[];
  filters: {
    startDate: string;
    endDate: string;
    roomTypeId: string;
  };
  onApply: (filters: {
    startDate: string;
    endDate: string;
    roomTypeId: string;
    status?: string;
    minAvailability?: number;
  }) => void;
}

export const AdvancedFiltersDrawer: React.FC<Props> = ({ isOpen, onClose, roomTypes, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState({
    startDate: filters.startDate,
    endDate: filters.endDate,
    roomTypeId: filters.roomTypeId,
    status: '',
    minAvailability: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onApply({
        startDate: localFilters.startDate,
        endDate: localFilters.endDate,
        roomTypeId: localFilters.roomTypeId || undefined,
        status: localFilters.status || undefined,
        minAvailability: localFilters.minAvailability ? Number(localFilters.minAvailability) : undefined,
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setLocalFilters({
      startDate: filters.startDate,
      endDate: filters.endDate,
      roomTypeId: '',
      status: '',
      minAvailability: '',
    });
    onApply({
      startDate: filters.startDate,
      endDate: filters.endDate,
      roomTypeId: '',
    });
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
                  <Filter className="text-indigo-600" size={24} /> Advanced Filters
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Filter Inventory</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={localFilters.startDate}
                    onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={localFilters.endDate}
                    onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Room Type</label>
                  <select
                    value={localFilters.roomTypeId}
                    onChange={(e) => setLocalFilters({ ...localFilters, roomTypeId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="">All Room Types</option>
                    {roomTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                  <select
                    value={localFilters.status}
                    onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="BLOCKED">Blocked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Minimum Availability</label>
                  <input
                    type="number"
                    value={localFilters.minAvailability}
                    onChange={(e) => setLocalFilters({ ...localFilters, minAvailability: e.target.value })}
                    placeholder="e.g. 5"
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
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Apply Filters'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
