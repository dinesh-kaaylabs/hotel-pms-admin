
import React from 'react';
import { X, FileText, Download, User, Hash, Calendar, Building, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Invoice } from '../invoices.types';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { GstBreakupTable } from './GstBreakupTable';

interface Props {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoicePreviewDrawer: React.FC<Props> = ({ invoice, onClose }) => {
  if (!invoice) return null;

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
                <FileText className="text-indigo-600" size={24} /> Tax Invoice
              </h2>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">{invoice.invoiceNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <Printer size={20} />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-4">
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Billed To</p>
                    <h3 className="text-lg font-bold text-slate-900">{invoice.guestName}</h3>
                    {invoice.gstin && (
                      <p className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                        <Building size={12} /> GSTIN: {invoice.gstin}
                      </p>
                    )}
                  </div>
                  <InvoiceStatusBadge status={invoice.status} />
               </div>

               <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1 flex items-center gap-1.5">
                    <Hash size={12} /> Booking
                  </p>
                  <p className="text-sm font-bold text-slate-900">{invoice.bookingNumber}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1 flex items-center gap-1.5">
                    <Calendar size={12} /> Issued On
                  </p>
                  <p className="text-sm font-bold text-slate-900">{invoice.issuedAt}</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Financial Details</h4>
               <div className="p-6 bg-white border border-slate-100 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Subtotal (Net)</span>
                    <span className="font-bold text-slate-900">{invoice.currency} {invoice.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <GstBreakupTable gst={invoice.gst} currency={invoice.currency} />

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-black text-slate-900 uppercase">Total Amount</span>
                    <span className="text-2xl font-black text-indigo-600">{invoice.currency} {invoice.totalAmount.toFixed(2)}</span>
                  </div>
               </div>
            </section>

            {invoice.pdfUrl && (
              <a 
                href={invoice.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
              >
                <Download size={20} /> Download PDF Invoice
              </a>
            )}
            
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <Building className="text-amber-600 shrink-0" size={20} />
              <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                This is a computer-generated tax invoice and does not require a physical signature under the GST Act.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
