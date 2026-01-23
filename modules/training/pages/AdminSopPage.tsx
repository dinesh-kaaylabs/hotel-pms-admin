
import React from 'react';
import { ShieldCheck, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../../app/layout/PageTransition';
import { SopSection } from '../components/SopSection';

export const AdminSopPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-[1000px] mx-auto pb-20">
        <Link to="/training" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ShieldCheck className="text-indigo-500" /> Property Administration SOP
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Managing inventory parity and property settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SopSection 
            title="Inventory & Pricing Control"
            type="checklist"
            items={[
              { text: "Use the Pricing Calendar for all rate updates" },
              { text: "Check inventory levels for the next 90 days weekly" },
              { text: "Apply 'Stop Sell' immediately on major maintenance events" }
            ]}
          />

          <SopSection 
            title="OTA & Channel Sync"
            type="bullet"
            items={[
              { text: "Verify that all room categories are mapped correctly" },
              { text: "Monitor 'Failed' sync logs every morning at 9 AM" },
              { text: "Maintain rate parity across Expedia, Booking, and Agoda" }
            ]}
          />

          <SopSection 
            title="Maintenance Protocols"
            type="caution"
            items={[
              { text: "Never reopen an OOO room without Housekeeping inspection" },
              { text: "Block rooms immediately for critical leaks (Water/Gas)" },
              { text: "Update the reason for block to protect from OTA penalties" }
            ]}
          />

          <SopSection 
            title="Strategic Do's"
            type="success"
            items={[
              { text: "Review ADR and Occupancy reports every Monday" },
              { text: "Update seasonal rate plans at least 3 months in advance" },
              { text: "Audit staff login history for security compliance" }
            ]}
          />
        </div>

        <div className="mt-12 bg-indigo-600 rounded-[32px] p-8 text-white flex justify-between items-center overflow-hidden relative shadow-xl shadow-indigo-100">
          <div className="absolute top-0 right-0 p-8 opacity-20"><Zap size={100} /></div>
          <div className="relative z-10 max-w-lg">
            <h3 className="text-xl font-black mb-2">Revenue Protection Tip</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Always monitor the 'Sell Status' on the pricing grid during local peak events. Avoid manual overrides on OTAs; use the PMS as your Single Source of Truth to prevent overbooking.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
