
import React from 'react';
import { Guest } from '../guests.types';
import { GuestBadges } from './GuestBadges';
import { Mail, Phone, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GuestHeader: React.FC<{ guest: Guest }> = ({ guest }) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <Link to="/guests" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors mb-8 uppercase tracking-widest">
        <ArrowLeft size={14} /> Back to Directory
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-black shadow-inner">
            {guest.name.charAt(0)}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900">{guest.name}</h1>
              <GuestBadges tags={guest.tags} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                <Phone size={14} className="text-slate-300" /> {guest.phone}
              </span>
              {guest.email && (
                <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                  <Mail size={14} className="text-slate-300" /> {guest.email}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[120px]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
              <Calendar size={12} /> Total Stays
            </p>
            <p className="text-xl font-black text-slate-900">{guest.totalStays}</p>
          </div>
          <div className="px-6 py-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-center min-w-[140px]">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
              <DollarSign size={12} /> Revenue
            </p>
            <p className="text-xl font-black text-indigo-600">{guest.currency} {guest.lifetimeValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
