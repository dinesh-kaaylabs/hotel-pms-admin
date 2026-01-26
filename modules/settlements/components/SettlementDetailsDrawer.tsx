
import React from 'react';
import { X, ShieldCheck, CreditCard, Clock, Calendar, Download, AlertCircle, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settlement } from '../settlements.types';
import { SettlementStatusBadge } from './SettlementStatusBadge';
import { useCurrency } from '../../../providers/CurrencyProvider';

interface Props {
  settlement: Settlement | null;
  onClose: () => void;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'T+2 Working Days';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
};

const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch {
    return dateString;
  }
};

export const SettlementDetailsDrawer: React.FC<Props> = ({ settlement, onClose }) => {
  const { format } = useCurrency();
  
  if (!settlement) return null;

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
          className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="text-indigo-600" size={24} /> Payout Details
              </h2>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Audit Trail Record</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Net Payout</p>
                  <h3 className="text-3xl font-black">{format(settlement.netAmount)}</h3>
                </div>
                <SettlementStatusBadge status={settlement.status} />
              </div>

              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Gross Revenue</span>
                  <span className="font-bold text-slate-900">{format(settlement.grossAmount)}</span>
                </div>
                
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5"><TrendingDown size={14} className="text-rose-400" /> Channel Commission</span>
                      <span className="font-bold text-rose-600">-{format(settlement.commission)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5"><CreditCard size={14} className="text-rose-400" /> Gateway Fees</span>
                      <span className="font-bold text-rose-600">-{format(settlement.gatewayFee)}</span>
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                   <span className="text-xs font-black text-slate-900 uppercase">Net Settled</span>
                   <span className="text-lg font-black text-indigo-600">{format(settlement.netAmount)}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Source & Verification</h4>
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Source</p>
                    <p className="text-sm font-black text-slate-900">{settlement.source.replace('_', '.')}</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Reference</p>
                    <p className="text-xs font-mono font-bold text-indigo-600 truncate">{settlement.referenceId}</p>
                  </div>
               </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Timeline</h4>
               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                      <Calendar size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Transaction Date</p>
                      <p className="text-sm font-bold text-slate-900">{formatDateTime(settlement.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 border border-indigo-100">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        {settlement.status === 'SETTLED' ? 'Settled Date' : 'Expected Settlement'}
                      </p>
                      <p className="text-sm font-bold text-slate-900">{formatDate(settlement.settledAt || settlement.expectedAt)}</p>
                    </div>
                  </div>
               </div>
            </section>

            <div className="pt-4 flex flex-col gap-3">
               <button className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all shadow-sm">
                  <Download size={18} /> Export Settlement Advice
               </button>
               <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
                  <AlertCircle className="text-blue-600 shrink-0" size={20} />
                  <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                    Settlements for <strong>Razorpay</strong> usually occur within 2-3 business days. For <strong>OTAs</strong>, timelines depend on your property contract terms (e.g., Monthly/Weekly).
                  </p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
