
import React from 'react';
import { GuestTag } from '../guests.types';
import { Star, ShieldAlert } from 'lucide-react';

export const GuestBadges: React.FC<{ tags: GuestTag[] }> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <div className="flex gap-1.5">
      {tags.includes('VIP') && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-black uppercase tracking-wider shadow-sm">
          <Star size={10} fill="currentColor" /> VIP
        </span>
      )}
      {tags.includes('BLACKLISTED') && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider shadow-sm">
          <ShieldAlert size={10} /> Blacklisted
        </span>
      )}
    </div>
  );
};
