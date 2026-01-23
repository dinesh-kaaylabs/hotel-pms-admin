
import React from 'react';
import { HotelForm } from '../components/HotelForm';
import { useHotelSettings } from '../settings.api';

export const HotelSettingsPage: React.FC = () => {
  const { data, isLoading } = useHotelSettings();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Hotel Profile</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Global Property Configuration</p>
      </div>
      <HotelForm settings={data} isLoading={isLoading} />
    </div>
  );
};
