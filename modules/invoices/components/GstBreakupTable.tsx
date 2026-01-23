
import React from 'react';
import { GstBreakup } from '../invoices.types';

interface Props {
  gst: GstBreakup | undefined;
  currency: string;
}

export const GstBreakupTable: React.FC<Props> = ({ gst, currency }) => {
  if (!gst) {
    return null;
  }
  
  const isIgst = gst.igst > 0;

  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Breakup ({gst.gstRate}%)</h4>
      </div>
      
      <div className="space-y-2">
        {!isIgst ? (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">CGST ({(gst.gstRate / 2).toFixed(1)}%)</span>
              <span className="font-bold text-slate-900">{currency} {gst.cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">SGST ({(gst.gstRate / 2).toFixed(1)}%)</span>
              <span className="font-bold text-slate-900">{currency} {gst.sgst.toFixed(2)}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">IGST ({gst.gstRate.toFixed(1)}%)</span>
            <span className="font-bold text-slate-900">{currency} {gst.igst.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
