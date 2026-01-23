
import React from 'react';
import { Users, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../../app/layout/PageTransition';
import { SopSection } from '../components/SopSection';

export const StaffSopPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-[1000px] mx-auto pb-20">
        <Link to="/training" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Users className="text-emerald-500" /> Front Desk Operations SOP
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Standardized procedures for guest lifecycle and room management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SopSection 
            title="Daily Responsibilities"
            type="checklist"
            items={[
              { text: "Check today's arrivals list for VIP notes" },
              { text: "Coordinate with Housekeeping for check-out room readiness" },
              { text: "Verify payment status for all expected departures" },
              { text: "Update room status to 'Dirty' immediately on checkout" }
            ]}
          />

          <SopSection 
            title="The 3-Step Check-In"
            type="success"
            items={[
              { text: "Verify Guest ID (Passport/Aadhar) and upload scan" },
              { text: "Collect pending balance or swipe pre-authorization" },
              { text: "Record guest preferences in CRM internal notes" }
            ]}
          />

          <SopSection 
            title="Operational Do's"
            type="bullet"
            items={[
              { text: "Always double-check room assignment for family bookings" },
              { text: "Use internal notes for shift-handover information" },
              { text: "Confirm meal plans (CP/MAP) during check-in" }
            ]}
          />

          <SopSection 
            title="Operational Don'ts"
            type="caution"
            items={[
              { text: "Do not override room prices without manager approval" },
              { text: "Do not cancel confirmed bookings without written proof" },
              { text: "Never check-in a guest to a 'Dirty' or 'In-Progress' room" }
            ]}
          />
        </div>

        <div className="mt-12 p-6 bg-slate-900 rounded-[32px] text-white flex items-center gap-6">
           <div className="p-3 bg-white/10 rounded-xl">
             <Info className="text-indigo-400" />
           </div>
           <p className="text-sm font-medium leading-relaxed italic">
             "A guest is the most important visitor on our premises. He is not dependent on us. We are dependent on him."
           </p>
        </div>
      </div>
    </PageTransition>
  );
};
