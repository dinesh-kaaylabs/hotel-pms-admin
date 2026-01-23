
import React from 'react';
import { GuestNote } from '../guests.types';
import { User, Clock } from 'lucide-react';

export const GuestNotes: React.FC<{ notes: GuestNote[] }> = ({ notes }) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <p className="text-sm text-slate-700 leading-relaxed italic mb-3">"{note.note}"</p>
          <div className="flex items-center justify-between pt-3 border-t border-slate-50">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              <User size={12} className="text-indigo-400" /> {note.createdBy}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
              <Clock size={10} /> {note.createdAt}
            </div>
          </div>
        </div>
      ))}
      {notes.length === 0 && (
        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
          <p className="text-slate-400 text-sm font-medium italic">No internal notes for this guest.</p>
        </div>
      )}
    </div>
  );
};
