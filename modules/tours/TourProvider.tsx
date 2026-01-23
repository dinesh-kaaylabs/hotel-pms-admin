
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { TOURS, TourConfig } from './tours.config';
import { useAuth } from '../../auth/AuthContext';
import { UserRole } from '../../auth/auth.types';

interface TourContextType {
  isActive: boolean;
  currentTour: TourConfig | null;
  currentStepIndex: number;
  startTour: (tourId: string) => void;
  nextStep: () => void;
  skipTour: () => void;
}

export const TourContext = createContext<TourContextType | undefined>(undefined);

const PERSISTENCE_KEY_PREFIX = 'pms_tour_completed_';

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTourId, setActiveTourId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = useCallback((tourId: string) => {
    setActiveTourId(tourId);
    setCurrentStepIndex(0);
  }, []);

  const skipTour = useCallback(() => {
    if (activeTourId) {
      localStorage.setItem(`${PERSISTENCE_KEY_PREFIX}${activeTourId}`, 'true');
    }
    setActiveTourId(null);
    setCurrentStepIndex(0);
  }, [activeTourId]);

  const nextStep = useCallback(() => {
    const tour = TOURS.find(t => t.id === activeTourId);
    if (!tour) return;

    if (currentStepIndex < tour.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      skipTour(); // Complete tour
    }
  }, [activeTourId, currentStepIndex, skipTour]);

  // Auto-start logic for first-time users
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const availableTours = TOURS.filter(t => t.roles.includes(user.role as UserRole));
    
    // Find first uncompleted tour for this role
    const nextTour = availableTours.find(t => !localStorage.getItem(`${PERSISTENCE_KEY_PREFIX}${t.id}`));
    
    if (nextTour && !activeTourId) {
      // Delay slightly for initial render/animation
      const timer = setTimeout(() => startTour(nextTour.id), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, activeTourId, startTour]);

  const currentTour = TOURS.find(t => t.id === activeTourId) || null;

  return (
    <TourContext.Provider value={{
      isActive: !!activeTourId,
      currentTour,
      currentStepIndex,
      startTour,
      nextStep,
      skipTour
    }}>
      {children}
    </TourContext.Provider>
  );
};
