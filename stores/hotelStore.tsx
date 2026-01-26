
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

    // 1. Cancel all in-flight queries to prevent race conditions
    await queryClient.cancelQueries();
    
    // 2. Update sessionStorage FIRST (synchronously)
    sessionStorage.setItem('pms_active_hotel_id', hotelId);
    
    // 3. Update state (this triggers re-renders)
    setActiveHotelId(hotelId);
    
    // 4. Invalidate ALL hotel-scoped queries (comprehensive list)
    queryClient.invalidateQueries({ 
      predicate: (query) => {
        const key = query.queryKey[0];
        return [
          'bookings', 'booking-pricing',
          'rooms', 'room-types', 'room-stats', 'room-inventory', 'room-inventory-advanced', 'room-inventory-summary',
          'payments', 
          'invoices', 
          'guests', 
          'housekeeping', 
          'maintenance', 
          'pricing', 
          'reports', 
          'settlements',
          'dashboard',
          'branding'
        ].includes(key as string);
      }
    });
    
    // 5. Re-fetch user profile to verify hotel access
    await queryClient.invalidateQueries({ queryKey: ['me'], refetchType: 'active' });
    
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
      
      // Initialize default hotel if not set or invalid
      if (activeHotelId === 'pending' || !activeHotelId || activeHotelId.trim() === '') {
        const defaultId = user.hotelId || user.hotels[0]?.id;
        if (defaultId) {
          sessionStorage.setItem('pms_active_hotel_id', defaultId);
          setActiveHotel(defaultId);
        }
      } else {
        // Verify current hotel ID is in user's authorized list
        const isAuthorized = user.hotels.some(h => h.id === activeHotelId);
        if (!isAuthorized) {
          // Current hotel not authorized, switch to default
          const defaultId = user.hotelId || user.hotels[0]?.id;
          if (defaultId) {
            sessionStorage.setItem('pms_active_hotel_id', defaultId);
            setActiveHotel(defaultId);
          }
        }
      }
    } else if (user && (!user.hotels || user.hotels.length === 0)) {
      // User has no hotels - clear hotel context
      sessionStorage.removeItem('pms_active_hotel_id');
      setActiveHotelId(null);
    }
  }, [user, setHotels, setActiveHotel, activeHotelId]);
};
