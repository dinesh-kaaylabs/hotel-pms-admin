
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Loader2, Calendar, User, DollarSign } from 'lucide-react';
import { useCreateBooking, useBookingPricing } from '../bookings.api';
import { useGuests, useCreateGuest } from '../../guests/guests.api';
import { useRoomTypes } from '../../rooms/rooms.api';
import { useAvailableRooms } from '../checkin-checkout.api';
import { useToast } from '../../../components/ui/Toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBookingDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  
  const [step, setStep] = useState<'guest' | 'details' | 'confirm'>('guest');
  const [guestId, setGuestId] = useState('');
  const [newGuest, setNewGuest] = useState({ name: '', phone: '', email: '' });
  const [isCreatingGuest, setIsCreatingGuest] = useState(false);
  const [roomTypeId, setRoomTypeId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const { data: guests } = useGuests();
  const { data: roomTypes } = useRoomTypes();
  const createGuestMutation = useCreateGuest();
  const createBookingMutation = useCreateBooking();
  
  const { data: pricing } = useBookingPricing(
    roomTypeId || null,
    checkInDate,
    checkOutDate
  );

  const { data: availableRooms } = useAvailableRooms(
    roomTypeId || null,
    checkInDate,
    checkOutDate
  );

  const canProceedToDetails = guestId !== '';
  const canProceedToConfirm = roomTypeId !== '' && checkInDate !== '' && checkOutDate !== '' && availableRooms && availableRooms.length > 0;

  const handleCreateGuest = async () => {
    if (!newGuest.name || !newGuest.phone) {
      error('Name and phone are required');
      return;
    }
    setIsCreatingGuest(true);
    try {
      const guest = await createGuestMutation.mutateAsync(newGuest);
      setGuestId(guest.id);
      setNewGuest({ name: '', phone: '', email: '' });
      setIsCreatingGuest(false);
      success('Guest created successfully');
    } catch (e: any) {
      error(e?.message || 'Failed to create guest');
      setIsCreatingGuest(false);
    }
  };

  const handleCreateBooking = async () => {
    if (!guestId || !roomTypeId || !checkInDate || !checkOutDate) {
      error('Please fill all required fields');
      return;
    }

    try {
      await createBookingMutation.mutateAsync({
        guestId,
        roomTypeId,
        checkInDate,
        checkOutDate,
        specialRequests: specialRequests || undefined,
      });
      success('Booking created successfully');
      onClose();
      navigate('/bookings');
    } catch (e: any) {
      error(e?.message || 'Failed to create booking');
    }
  };

  const handleClose = () => {
    setStep('guest');
    setGuestId('');
    setRoomTypeId('');
    setCheckInDate('');
    setCheckOutDate('');
    setSpecialRequests('');
    setNewGuest({ name: '', phone: '', email: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="text-indigo-600" size={24} /> New Booking
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">
                  {step === 'guest' && 'Select Guest'}
                  {step === 'details' && 'Booking Details'}
                  {step === 'confirm' && 'Confirm Booking'}
                </p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {step === 'guest' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <User size={16} /> Select Guest
                    </label>
                    <select
                      value={guestId}
                      onChange={(e) => setGuestId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    >
                      <option value="">Choose existing guest...</option>
                      {guests?.map(guest => (
                        <option key={guest.id} value={guest.id}>
                          {guest.name} - {guest.phone}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-4">Or Create New Guest</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Name *</label>
                        <input
                          type="text"
                          value={newGuest.name}
                          onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone *</label>
                        <input
                          type="text"
                          value={newGuest.phone}
                          onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Email</label>
                        <input
                          type="email"
                          value={newGuest.email}
                          onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleCreateGuest}
                        disabled={isCreatingGuest || !newGuest.name || !newGuest.phone}
                        className="w-full px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                      >
                        {isCreatingGuest ? <Loader2 className="animate-spin" size={18} /> : 'Create Guest'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 'details' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar size={16} /> Room Type
                    </label>
                    <select
                      value={roomTypeId}
                      onChange={(e) => setRoomTypeId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    >
                      <option value="">Select room type...</option>
                      {roomTypes?.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Check-in Date</label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Check-out Date</label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                      />
                    </div>
                  </div>

                  {pricing && (
                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign size={18} className="text-indigo-600" />
                        <h4 className="text-sm font-bold text-indigo-900">Pricing Summary</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Base Amount:</span>
                          <span className="font-bold">{pricing.currency} {pricing.baseAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tax:</span>
                          <span className="font-bold">{pricing.currency} {pricing.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-indigo-200">
                          <span className="font-bold text-slate-900">Total:</span>
                          <span className="font-bold text-indigo-600">{pricing.currency} {pricing.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {availableRooms && availableRooms.length > 0 && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-sm font-bold text-emerald-900">
                        {availableRooms.length} room{availableRooms.length > 1 ? 's' : ''} available
                      </p>
                    </div>
                  )}

                  {roomTypeId && checkInDate && checkOutDate && availableRooms && availableRooms.length === 0 && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-sm font-bold text-amber-900">No rooms available for selected dates</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Special Requests (Optional)</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                      placeholder="Any special requests or notes..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Guest:</span>
                      <span className="text-sm font-bold">{guests?.find(g => g.id === guestId)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Room Type:</span>
                      <span className="text-sm font-bold">{roomTypes?.find(rt => rt.id === roomTypeId)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Check-in:</span>
                      <span className="text-sm font-bold">{new Date(checkInDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Check-out:</span>
                      <span className="text-sm font-bold">{new Date(checkOutDate).toLocaleDateString()}</span>
                    </div>
                    {pricing && (
                      <div className="flex justify-between pt-2 border-t border-slate-200">
                        <span className="text-sm font-bold text-slate-900">Total Amount:</span>
                        <span className="text-sm font-bold text-indigo-600">{pricing.currency} {pricing.totalAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              {step !== 'guest' && (
                <button
                  type="button"
                  onClick={() => setStep(step === 'confirm' ? 'details' : 'guest')}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              )}
              <div className="flex-1" />
              {step === 'guest' && (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  disabled={!canProceedToDetails}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  Next: Booking Details
                </button>
              )}
              {step === 'details' && (
                <button
                  type="button"
                  onClick={() => setStep('confirm')}
                  disabled={!canProceedToConfirm}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  Next: Confirm
                </button>
              )}
              {step === 'confirm' && (
                <button
                  type="button"
                  onClick={handleCreateBooking}
                  disabled={createBookingMutation.isPending}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Creating...
                    </>
                  ) : (
                    'Create Booking'
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
