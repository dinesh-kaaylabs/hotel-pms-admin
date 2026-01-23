
import React, { useState } from 'react';
import { X, Loader2, Zap, Calendar, Tag, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RatePlan } from '../pricing.types';
import { useBulkUpdatePricing } from '../pricing.api';

interface Props {
  ratePlans: RatePlan[];
  isOpen: boolean;
  onClose: () => void;
}

export const BulkPricingDrawer: React.FC<Props> = ({ ratePlans, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    ratePlanIds: [] as string[],
    price: 0,
    closed: false
  });

  const bulkMutation = useBulkUpdatePricing();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await bulkMutation.mutateAsync({
      ...formData,
      price: formData.price > 0 ? formData.price : undefined
    });
    onClose();
  };

  const toggleRatePlan = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ratePlanIds: prev.ratePlanIds.includes(id) 
        ? prev.ratePlanIds.filter(rid => rid !== id)
        : [...prev.ratePlanIds, id]
    }));
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
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="text-amber-500" size={24} /> Bulk Pricing
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Fast Rate Management</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Calendar size={14} /> Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Calendar size={14} /> End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Apply to Rate Plans</label>
                  <div className="flex flex-wrap gap-2">
                    {ratePlans.map(plan => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => toggleRatePlan(plan.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          formData.ratePlanIds.includes(plan.id)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {plan.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Tag size={14} /> Set New Rate (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 font-bold"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <Ban className="text-rose-600" size={20} />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-rose-900">Stop Sell (Close Dates)</p>
                    <p className="text-[10px] text-rose-700 mt-0.5">Check this to disable reservations for the range.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.closed}
                    onChange={(e) => setFormData({ ...formData, closed: e.target.checked })}
                    className="w-5 h-5 text-rose-600 border-rose-300 rounded focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={bulkMutation.isPending || formData.ratePlanIds.length === 0}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {bulkMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : (
                    <><Zap size={18} /> Update Pricing Grid</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
