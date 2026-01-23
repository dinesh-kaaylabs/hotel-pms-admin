import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Receipt, FileText, Building } from 'lucide-react';
import { getTaxRules, getHSNCodes, getGSTConfiguration } from '../tax-configuration.api';

export const TaxConfigurationPage: React.FC = () => {
  const { data: taxRules, isLoading: rulesLoading } = useQuery({
    queryKey: ['taxRules'],
    queryFn: getTaxRules,
  });

  const { data: hsnCodes, isLoading: hsnLoading } = useQuery({
    queryKey: ['hsnCodes'],
    queryFn: getHSNCodes,
  });

  const { data: gstConfig, isLoading: gstLoading } = useQuery({
    queryKey: ['gstConfiguration'],
    queryFn: getGSTConfiguration,
  });

  if (rulesLoading || hsnLoading || gstLoading) {
    return <div className="text-sm text-slate-500">Loading tax configuration...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Tax Configuration</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">GST & Tax Rules</p>
      </div>

      {gstConfig && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Building size={20} /> GST Registration Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">GSTIN</div>
              <div className="text-sm font-semibold text-slate-900">{gstConfig.gstin}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Legal Name</div>
              <div className="text-sm font-semibold text-slate-900">{gstConfig.legalName}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">State</div>
              <div className="text-sm font-semibold text-slate-900">{gstConfig.state} ({gstConfig.stateCode})</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">PAN Number</div>
              <div className="text-sm font-semibold text-slate-900">{gstConfig.panNumber}</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Address</div>
              <div className="text-sm font-semibold text-slate-900">{gstConfig.address}</div>
            </div>
          </div>
        </div>
      )}

      {taxRules && taxRules.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Receipt size={20} /> Tax Rules
          </h3>
          <div className="space-y-3">
            {taxRules.map((rule: any) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900">{rule.taxName}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Type: {rule.taxType} | Applicable On: {rule.applicableOn}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">HSN Code: {rule.hsnCode}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{rule.rate}%</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {rule.isInclusive ? 'Inclusive' : 'Exclusive'}
                  </div>
                  <div className={`text-xs font-bold mt-1 ${rule.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hsnCodes && hsnCodes.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText size={20} /> HSN Codes
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Code</th>
                  <th className="text-left py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="text-right py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">GST Rate</th>
                </tr>
              </thead>
              <tbody>
                {hsnCodes.map((hsn: any) => (
                  <tr key={hsn.code} className="border-b border-slate-100">
                    <td className="py-3 px-4 font-semibold text-slate-900">{hsn.code}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{hsn.description}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{hsn.category}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">{hsn.gstRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
