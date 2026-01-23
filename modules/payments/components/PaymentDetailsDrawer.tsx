
import React from 'react';
import { X, ShieldCheck, ExternalLink, Hash, Calendar, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Payment } from '../payments.types';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface Props {
  payment: Payment | null;
  onClose: () => void;
}

export const PaymentDetailsDrawer: React.FC<Props> = ({ payment, onClose }) => {
  if (!payment) return null;

  return (
    <AnimatePresence>
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
                <ShieldCheck className="text-emerald-500" size={24} /> Transaction Audit
              </h2>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Immutable Record</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Amount</p>
                  <h3 className="text-3xl font-black">{payment.currency} {payment.amount.toFixed(2)}</h3>
                </div>
                <PaymentStatusBadge status={payment.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1 flex items-center gap-1.5">
                    <Hash size={12} /> Booking
                  </p>
                  <p className="text-sm font-bold text-slate-900">{payment.bookingNumber}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1 flex items-center gap-1.5">
                    <CreditCard size={12} /> Method
                  </p>
                  <p className="text-sm font-bold text-slate-900 uppercase">{payment.method}</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Processor Information</h4>
              <div className="space-y-3 bg-white border border-slate-100 p-5 rounded-3xl">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Provider</label>
                  <p className="text-sm font-bold text-slate-900">{payment.provider}</p>
                </div>
                <div className="pt-3 border-t border-slate-50">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Processor ID</label>
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-slate-50 px-2 py-1 rounded font-mono text-slate-600">
                      {payment.providerPaymentId || 'N/A'}
                    </code>
                    {payment.providerPaymentId && (
                      <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                        <ExternalLink size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-50">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                    <Calendar size={12} /> Processed At
                  </label>
                  <p className="text-sm font-bold text-slate-900">{payment.createdAt}</p>
                </div>
              </div>
            </section>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <ShieldCheck className="text-amber-600 shrink-0" size={20} />
              <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                This transaction record is strictly read-only for auditing purposes. To issue refunds or change status, please use the main <strong>Processor Dashboard</strong> or contact senior property management.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
