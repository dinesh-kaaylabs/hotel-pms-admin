
import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { useRatePlans } from '../pricing.api';
import { RatePlansTable } from '../components/RatePlansTable';
import { RatePlanDrawer } from '../components/RatePlanDrawer';
import { RatePlan } from '../pricing.types';

export const RatePlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<RatePlan | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading } = useRatePlans();

  const handleEdit = (plan: RatePlan) => {
    setSelectedPlan(plan);
    setDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Tag className="text-indigo-600" /> Rate Plans
          </h1>
          <p className="text-slate-500 text-sm mt-1">Configure pricing policies and cancellation rules</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <Plus size={18} /> Add Rate Plan
        </button>
      </div>

      <RatePlansTable 
        data={data || []} 
        isLoading={isLoading} 
        onEdit={handleEdit} 
      />

      <RatePlanDrawer 
        plan={selectedPlan} 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
    </div>
  );
};
