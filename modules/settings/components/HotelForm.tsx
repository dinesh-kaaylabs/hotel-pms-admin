
import React, { useState, useEffect } from 'react';
import { Save, Loader2, Building2, Globe, Banknote, Mail, Image as ImageIcon, Palette, Moon, Sun } from 'lucide-react';
import { HotelSettings, BrandConfig } from '../settings.types';
import { useUpdateHotelSettings } from '../settings.api';
import { useToast } from '../../../components/ui/Toast';

export const HotelForm: React.FC<{ settings: HotelSettings | undefined; isLoading: boolean }> = ({ settings, isLoading }) => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState<Partial<HotelSettings>>({});
  const [brandData, setBrandData] = useState<Partial<BrandConfig>>({});
  
  const updateMutation = useUpdateHotelSettings();

  useEffect(() => {
    if (settings) {
      setFormData(settings);
      setBrandData(settings.brand || {
        primaryColor: '#4f46e5',
        theme: 'light',
        name: settings.name
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({ ...formData, brand: brandData as BrandConfig });
      success('Hotel configuration and branding updated successfully.');
    } catch (e) {
      error('Failed to update settings. Please check your permissions.');
    }
  };

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* General Settings */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-4xl">
        <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Building2 size={18} /> General Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Property Display Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setBrandData({ ...brandData, name: e.target.value });
              }}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">City</label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Currency</label>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={formData.currency || ''}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-slate-100"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Settings */}
      <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-4xl">
        <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Palette size={18} /> White-Label & Branding
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Brand Identity Logo (URL)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="url"
                  value={brandData.logoUrl || ''}
                  placeholder="https://your-hotel.com/logo.png"
                  onChange={(e) => setBrandData({ ...brandData, logoUrl: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Primary Brand Color</label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <input
                  type="color"
                  value={brandData.primaryColor || '#4f46e5'}
                  onChange={(e) => setBrandData({ ...brandData, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border-none cursor-pointer bg-transparent"
                />
                <code className="text-xs font-bold text-slate-500">{brandData.primaryColor}</code>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Default Theme Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBrandData({ ...brandData, theme: 'light' })}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                    brandData.theme === 'light' 
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' 
                    : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  <Sun size={18} /> Light
                </button>
                <button
                  type="button"
                  onClick={() => setBrandData({ ...brandData, theme: 'dark' })}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                    brandData.theme === 'dark' 
                    ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' 
                    : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  <Moon size={18} /> Dark
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Live Branding Preview</p>
             <div className="w-full max-w-[200px] aspect-video rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className="w-5 h-5 rounded shadow-sm flex items-center justify-center" 
                    style={{ backgroundColor: brandData.primaryColor }}
                  >
                    {brandData.logoUrl && <img src={brandData.logoUrl} className="w-3 h-3 object-contain" />}
                  </div>
                  <div className="h-2 w-16 bg-slate-100 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-700 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-slate-50 dark:bg-slate-700 rounded"></div>
                  <div 
                    className="h-3 w-1/2 rounded-md mt-4 shadow-sm"
                    style={{ backgroundColor: brandData.primaryColor }}
                  ></div>
                </div>
             </div>
             <p className="text-[10px] text-slate-400 mt-6 text-center italic">Branding changes take effect globally across all staff accounts upon save.</p>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-6 border-t border-slate-100 dark:border-slate-700">
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 px-12 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-brand-primary/20"
        >
          {updateMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Update Organization Profile
        </button>
      </div>
    </form>
  );
};
