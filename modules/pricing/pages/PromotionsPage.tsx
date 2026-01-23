import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tag, TrendingUp, Briefcase, Ban } from 'lucide-react';
import { getPromoCodes, getSeasonalPricing, getCorporateRates, getBlackoutDates } from '../promotions.api';

export const PromotionsPage: React.FC = () => {
  const { data: promoCodes, isLoading: promoLoading } = useQuery({
    queryKey: ['promoCodes'],
    queryFn: getPromoCodes,
  });

  const { data: seasonalPricing, isLoading: seasonalLoading } = useQuery({
    queryKey: ['seasonalPricing'],
    queryFn: getSeasonalPricing,
  });

  const { data: corporateRates, isLoading: corpLoading } = useQuery({
    queryKey: ['corporateRates'],
    queryFn: getCorporateRates,
  });

  const { data: blackoutDates, isLoading: blackoutLoading } = useQuery({
    queryKey: ['blackoutDates'],
    queryFn: getBlackoutDates,
  });

  if (promoLoading || seasonalLoading || corpLoading || blackoutLoading) {
    return <div className="text-sm text-slate-500">Loading promotions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Promotions & Rate Overrides</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Manage Discounts & Special Rates</p>
      </div>

      {promoCodes && promoCodes.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Tag size={20} /> Promo Codes
          </h3>
          <div className="space-y-3">
            {promoCodes.map((promo: any) => (
              <div key={promo.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded font-bold text-sm">
                      {promo.code}
                    </span>
                    <span className="font-semibold text-slate-900">{promo.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${promo.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {promo.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {promo.discountType === 'PERCENTAGE' ? `${promo.discountValue}% OFF` : `₹${promo.discountValue} OFF`} | 
                    Valid: {new Date(promo.validFrom).toLocaleDateString()} - {new Date(promo.validTo).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Usage: {promo.usageCount} / {promo.maxUsage} | Min Nights: {promo.minNights}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {seasonalPricing && seasonalPricing.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Seasonal Pricing
          </h3>
          <div className="space-y-3">
            {seasonalPricing.map((season: any) => (
              <div key={season.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900">{season.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{season.priceMultiplier}x</div>
                  <div className={`text-xs font-bold mt-1 ${season.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                    {season.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {corporateRates && corporateRates.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase size={20} /> Corporate Rates
          </h3>
          <div className="space-y-3">
            {corporateRates.map((rate: any) => (
              <div key={rate.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900">{rate.companyName}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Contact: {rate.contactPerson} ({rate.contactEmail})
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Valid: {new Date(rate.validFrom).toLocaleDateString()} - {new Date(rate.validTo).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">
                    {rate.discountType === 'PERCENTAGE' ? `${rate.discountValue}%` : `₹${rate.discountValue}`} OFF
                  </div>
                  <div className={`text-xs font-bold mt-1 ${rate.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                    {rate.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {blackoutDates && blackoutDates.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Ban size={20} /> Blackout Dates
          </h3>
          <div className="space-y-3">
            {blackoutDates.map((blackout: any) => (
              <div key={blackout.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <div className="font-semibold text-slate-900">{new Date(blackout.date).toLocaleDateString()}</div>
                  <div className="text-xs text-slate-600 mt-1">{blackout.reason}</div>
                </div>
                <div className="text-xs text-slate-500">
                  {blackout.affectsPromoCodes && <div>Affects Promo Codes</div>}
                  {blackout.affectsSeasonalPricing && <div>Affects Seasonal Pricing</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
