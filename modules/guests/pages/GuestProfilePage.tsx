
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGuestProfile, useGuestStays, useGuestNotes } from '../guests.api';
import { GuestHeader } from '../components/GuestHeader';
import { StayHistoryTable } from '../components/StayHistoryTable';
import { GuestNotes } from '../components/GuestNotes';
import { AddNoteDrawer } from '../components/AddNoteDrawer';
import { PageTransition } from '../../../app/layout/PageTransition';
import { Loader2, Plus, History, MessageSquare, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../auth/AuthContext';

export const GuestProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isNoteDrawerOpen, setNoteDrawerOpen] = useState(false);

  const { data: guest, isLoading: isProfileLoading } = useGuestProfile(id);
  const { data: stays, isLoading: isStaysLoading } = useGuestStays(id || undefined);
  const { data: notes, isLoading: isNotesLoading } = useGuestNotes(id || undefined);

  const canManage = user?.role === 'SUPER_ADMIN' || user?.role === 'HOTEL_ADMIN';

  if (isProfileLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (!guest) return <div>Guest not found.</div>;

  return (
    <PageTransition>
      <div className="space-y-8 max-w-[1400px] mx-auto pb-12">
        <GuestHeader guest={guest} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <History size={18} className="text-indigo-600" /> Stay History
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Past & Upcoming</span>
              </div>
              {isStaysLoading ? (
                <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-slate-200" /></div>
              ) : (
                <StayHistoryTable stays={stays || []} currency={guest.currency} />
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={18} className="text-indigo-600" /> CRM Notes
                </h3>
                {canManage && (
                  <button 
                    onClick={() => setNoteDrawerOpen(true)}
                    className="p-1.5 bg-white border border-slate-200 rounded-lg text-indigo-600 hover:shadow-md transition-all"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                {isNotesLoading ? (
                  <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-slate-200" /></div>
                ) : (
                  <GuestNotes notes={notes || []} />
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                   <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={16} className="text-indigo-300" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Handover Status</p>
                   </div>
                   <p className="text-xs font-medium leading-relaxed">Guest is currently marked as {guest.tags && guest.tags.includes('VIP') ? 'High Priority' : 'Standard Priority'}. Check for active notes before check-in.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <AddNoteDrawer 
          guestId={guest.id} 
          isOpen={isNoteDrawerOpen} 
          onClose={() => setNoteDrawerOpen(false)} 
        />
      </div>
    </PageTransition>
  );
};
