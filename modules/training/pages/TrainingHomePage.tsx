
import React from 'react';
import { GraduationCap, Users, ShieldCheck, Landmark, Lightbulb } from 'lucide-react';
import { PageTransition } from '../../../app/layout/PageTransition';
import { SopCard } from '../components/SopCard';
import { FirstTimeChecklist } from '../components/FirstTimeChecklist';
import { useAuth } from '../../../auth/AuthContext';
import { UserRole } from '../../../auth/auth.types';

export const TrainingHomePage: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role as UserRole;

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100">
              <GraduationCap size={14} /> Knowledge Hub
            </div>
            <h1 className="text-4xl font-black text-slate-900">Training & SOPs</h1>
            <p className="text-slate-500 text-lg mt-2 font-medium">Standard Operating Procedures to run your property like a 5-star professional.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SopCard 
              title="Front Desk & Staff"
              description="Daily responsibilities, check-in flows, and guest communication standards."
              icon={Users}
              path="/training/staff"
              colorClass="bg-emerald-50 text-emerald-600"
            />
            
            {(role === UserRole.HOTEL_ADMIN || role === UserRole.SUPER_ADMIN) && (
              <SopCard 
                title="Property Admin"
                description="Inventory management, OTA mapping, and revenue protection procedures."
                icon={ShieldCheck}
                path="/training/admin"
                colorClass="bg-indigo-50 text-indigo-600"
              />
            )}

            {role === UserRole.SUPER_ADMIN && (
              <SopCard 
                title="Finance & Accounts"
                description="GST compliance, audit trails, and payment reconciliation workflows."
                icon={Landmark}
                path="/training/finance"
                colorClass="bg-amber-50 text-amber-600"
              />
            )}

            <div className="md:col-span-2 p-8 bg-indigo-50 rounded-[32px] border border-indigo-100 flex items-start gap-6 mt-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600 shrink-0">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-indigo-900 mb-1">Quick Tip</h4>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  Always verify guest ID and advance payment status before handing over room keys. This is the #1 way to reduce operational revenue leakage.
                </p>
              </div>
            </div>
          </div>

          <div>
            <FirstTimeChecklist />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
