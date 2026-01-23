
import React, { useEffect, useState } from 'react';
import { X, Loader2, Save, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RatePlan } from '../pricing.types';
import { useCreateRatePlan, useUpdateRatePlan } from '../pricing.api';
import { useRoomTypes } from '../../rooms/rooms.api';

interface Props {
  plan: RatePlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RatePlanDrawer: React.FC<Props> = ({ plan, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<RatePlan>>({
    name: '',
    roomTypeId: '',
    status: 'ACTIVE',
    refundable: true,
    minNights: 1,
    maxNights: undefined
  });

  const { data: roomTypes } = useRoomTypes();
  const createMutation = useCreateRatePlan();
  const updateMutation = useUpdateRatePlan();

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    } else {
      setFormData({ name: '', roomTypeId: '', status: 'ACTIVE', refundable: true, minNights: 1 });
    }
  }, [plan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (plan) {
      await updateMutation.mutateAsync({ id: plan.id, ...formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    onClose();
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

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
                <h2 className="text-xl font-bold text-slate-900">
                  {plan ? 'Edit Rate Plan' : 'New Rate Plan'}
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Policy & Pricing Rules</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. Early Bird - Non Refundable"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Room Type Association</label>
                  <select
                    required
                    value={formData.roomTypeId}
                    onChange={(e) => setFormData({ ...formData, roomTypeId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {roomTypes?.map(rt => (
                      <option key={rt.id} value={rt.id}>{rt.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Min Stay (Nights)</label>
                    <input
                      type="number"
                      min={1}
                      value={formData.minNights}
                      onChange={(e) => setFormData({ ...formData, minNights: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Max Stay (Optional)</label>
                    <input
                      type="number"
                      min={1}
                      value={formData.maxNights || ''}
                      onChange={(e) => setFormData({ ...formData, maxNights: Number(e.target.value) || undefined })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3">
                  <Info className="text-indigo-600 shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-bold text-indigo-900">Refund Policy</p>
                    <p className="text-[10px] text-indigo-700 mt-0.5">Determines if the full amount is returned upon cancellation.</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, refundable: true })}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          formData.refundable ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border-indigo-200'
                        }`}
                      >
                        Refundable
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, refundable: false })}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          !formData.refundable ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-rose-600 border-rose-200'
                        }`}
                      >
                        Non-Refundable
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <input
                    type="checkbox"
                    id="plan-status"
                    checked={formData.status === 'ACTIVE'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'ACTIVE' : 'INACTIVE' })}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="plan-status" className="text-sm font-bold text-slate-700">
                    Active & Sellable
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 className="animate-spin" size={20} /> : (
                    <><Save size={18} /> {plan ? 'Save Changes' : 'Create Rate Plan'}</>
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
