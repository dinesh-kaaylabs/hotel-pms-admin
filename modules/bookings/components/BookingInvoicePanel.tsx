
import React from 'react';
import { useBookingInvoice } from '../bookings.api';
import { FileText, Download, Loader2 } from 'lucide-react';

export const BookingInvoicePanel: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { data: invoice, isLoading, error } = useBookingInvoice(bookingId, true);

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin text-indigo-500" /></div>;
  if (error || !invoice) return <div className="text-center py-8 text-slate-400 text-sm italic">Invoice not available for this booking.</div>;

  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText size={18} className="text-indigo-600" /> Invoice Details
        </h4>
        <a 
          href={invoice.pdfUrl} 
          target="_blank" 
          rel="noreferrer"
          className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
        >
          <Download size={14} /> Download PDF
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Number</p>
          <p className="text-sm font-medium">{invoice.invoiceNumber}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Issue Date</p>
          <p className="text-sm font-medium">{invoice.issueDate}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Net Amount</span>
          <span className="font-medium">${invoice.netAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Tax</span>
          <span className="font-medium">${invoice.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-slate-900 pt-1">
          <span>Total</span>
          <span>${invoice.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
