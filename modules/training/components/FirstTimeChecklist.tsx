
import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

export const FirstTimeChecklist: React.FC = () => {
  const steps = [
    { label: 'Add Property Room Types', status: 'done' },
    { label: 'Set Base Pricing Policy', status: 'pending' },
    { label: 'Map OTA Channels', status: 'pending' },
    { label: 'Invite Front-Desk Staff', status: 'done' },
  ];

  return (
    <div className="bg-slate-900 rounded-[32px] p-8 text-white overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles size={120} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-black mb-2">Getting Started</h3>
        <p className="text-slate-400 text-sm mb-8">Follow this roadmap to fully activate your property.</p>
        
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${step.status === 'done' ? 'bg-white/10 border-white/10 opacity-60' : 'bg-indigo-600/20 border-indigo-500/30'}`}>
              <CheckCircle size={20} className={step.status === 'done' ? 'text-emerald-400' : 'text-slate-600'} />
              <span className={`text-sm font-bold ${step.status === 'done' ? 'line-through text-slate-400' : ''}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
