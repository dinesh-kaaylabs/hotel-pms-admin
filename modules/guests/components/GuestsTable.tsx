
import React from 'react';
import { Link } from 'react-router-dom';
import { Guest } from '../guests.types';
import { GuestBadges } from './GuestBadges';
import { ChevronRight, User } from 'lucide-react';

interface Props {
  data: Guest[];
}

export const GuestsTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest Name</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stays</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Lifetime Value</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tags</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((guest) => (
            <tr key={guest.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <Link to={`/guests/${guest.id}`} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                    {guest.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{guest.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Guest ID: {guest.id.split('-')[0].toUpperCase()}</p>
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4">
                <p className="text-xs font-semibold text-slate-700">{guest.phone}</p>
                <p className="text-[10px] text-slate-400">{guest.email || 'No email provided'}</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-xs font-black bg-slate-100 px-2 py-0.5 rounded-full">{guest.totalStays}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-black text-slate-900">{guest.currency} {guest.lifetimeValue.toLocaleString()}</span>
              </td>
              <td className="px-6 py-4">
                <GuestBadges tags={guest.tags} />
              </td>
              <td className="px-6 py-4 text-right">
                <Link to={`/guests/${guest.id}`} className="p-2 text-slate-300 hover:text-indigo-600 transition-all flex justify-end">
                  <ChevronRight size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
