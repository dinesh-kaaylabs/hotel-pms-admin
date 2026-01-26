
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { HotelContext } from '../auth/auth.types';
import { useToast } from '../components/ui/Toast';

interface HotelStoreType {
  activeHotelId: string | null;
  activeHotelName: string;
  hotels: HotelContext[];
  setActiveHotel: (hotelId: string) => void;
  setHotels: (hotels: HotelContext[]) => void;
  isLoading: boolean;
}

const HotelStoreContext = createContext<HotelStoreType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { success } = useToast();
  
  // Initialize with sessionStorage or a placeholder for initial auth
  const [activeHotelId, setActiveHotelId] = useState<string | null>(() => {
    const stored = sessionStorage.getItem('pms_active_hotel_id');
    return stored || 'pending'; // Use 'pending' as placeholder during initial auth
  });
  
  const [hotels, setHotels] = useState<HotelContext[]>([]);

  const setActiveHotel = useCallback(async (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;

    // 1. Update sessionStorage FIRST (synchronously)
    sessionStorage.setItem('pms_active_hotel_id', hotelId);
    
    // 2. Update state (this triggers re-renders)
    setActiveHotelId(hotelId);
    
    // 3. Wait for next tick to ensure sessionStorage is flushed
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 4. Now invalidate queries - they will use the new hotel ID
    queryClient.invalidateQueries({ 
      predicate: (query) => {
        const key = query.queryKey[0];
        return ['bookings', 'rooms', 'payments', 'invoices', 'guests', 'housekeeping', 'maintenance', 'pricing', 'reports', 'settlements'].includes(key as string);
      }
    });
    
    // 5. Clear sensitive cache immediately
    queryClient.removeQueries({ queryKey: ['me'] }); // Re-verify session context
    
    success(`Switched context to ${hotel.name}`);
  }, [hotels, queryClient, success]);

  const activeHotelName = hotels.find(h => h.id === activeHotelId)?.name || 'Loading Property...';

  return (
    <HotelStoreContext.Provider value={{
      activeHotelId,
      activeHotelName,
      hotels,
      setActiveHotel,
      setHotels,
      isLoading: !activeHotelId && hotels.length > 0
    }}>
      {children}
    </HotelStoreContext.Provider>
  );
};

export const useHotelStore = () => {
  const context = useContext(HotelStoreContext);
  if (!context) throw new Error('useHotelStore must be used within HotelProvider');
  return context;
};

/**
 * Hook to sync user data to hotel store.
 * Must be called INSIDE AuthProvider after user is authenticated.
 */
export const useSyncUserHotels = (user: any) => {
  const { setHotels, setActiveHotel, activeHotelId } = useHotelStore();

  useEffect(() => {
    if (user && user.hotels?.length) {
      setHotels(user.hotels);
      
      // Initialize default hotel if not set
      if (activeHotelId === 'pending' || !activeHotelId) {
        const defaultId = user.hotelId || user.hotels[0]?.id;
        if (defaultId) {
          setActiveHotel(defaultId);
          sessionStorage.setItem('pms_active_hotel_id', defaultId);
        }
      }
    }
  }, [user, setHotels, setActiveHotel, activeHotelId]);
};
