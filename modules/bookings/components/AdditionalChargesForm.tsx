/**
 * Additional Charges Form Component
 * Phase 1 - Go-Live Ready PMS
 * 
 * Allows adding mini-bar, damage, late checkout, and other charges
 * Mobile-friendly, large buttons
 */

import React from 'react';
import { Plus, X } from 'lucide-react';

interface AdditionalCharge {
  description: string;
  amount: number;
  category: string;
}

interface AdditionalChargesFormProps {
  charges: AdditionalCharge[];
  onChange: (charges: AdditionalCharge[]) => void;
}

const CHARGE_CATEGORIES = [
  { value: 'MINIBAR', label: 'Mini-bar' },
  { value: 'DAMAGE', label: 'Damage' },
  { value: 'LATE_CHECKOUT', label: 'Late Check-out' },
  { value: 'EXTRA_SERVICE', label: 'Extra Service' },
  { value: 'OTHER', label: 'Other' },
];

export const AdditionalChargesForm: React.FC<AdditionalChargesFormProps> = ({
  charges,
  onChange,
}) => {
  const addCharge = () => {
    onChange([
      ...charges,
      { description: '', amount: 0, category: 'OTHER' },
    ]);
  };

  const updateCharge = (index: number, field: keyof AdditionalCharge, value: string | number) => {
    const updated = [...charges];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeCharge = (index: number) => {
    onChange(charges.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {charges.map((charge, index) => (
        <div key={index} className="flex gap-4 items-start p-4 border border-gray-200 rounded-lg">
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={charge.category}
                onChange={(e) => updateCharge(index, 'category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {CHARGE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={charge.description}
                onChange={(e) => updateCharge(index, 'description', e.target.value)}
                placeholder="Enter description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={charge.amount || ''}
                onChange={(e) => updateCharge(index, 'amount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeCharge(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addCharge}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors"
      >
        <Plus size={20} />
        Add Additional Charge
      </button>
    </div>
  );
};
