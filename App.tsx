
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './app/routes';
import { ToastProvider } from './components/ui/Toast';
import { BrandThemeProvider } from './components/providers/BrandThemeProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { CurrencyProvider } from './providers/CurrencyProvider';
import { AuthProvider } from './auth/AuthContext';
import { TourProvider } from './modules/tours/TourProvider';
import { TourOverlay } from './modules/tours/TourOverlay';
import { TourTooltip } from './modules/tours/TourTooltip';
import { HotelProvider } from './stores/hotelStore';
import { useAuthEventHandler } from './hooks/useAuthEventHandler';

/**
 * Standardized Query Client Configuration.
 * Bypasses retry logic for unauthorized GraphQL operations to prevent UI flickering.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // STRICT: Zero HTTP status code usage. Only GraphQL Error Extensions.
        const code = error?.code || error?.extensions?.code;
        if (code === 'UNAUTHENTICATED' || code === 'FORBIDDEN') return false;
        return failureCount < 1;
      },
    },
  },
});

/**
 * Inner app component with access to router context
 * Enables auth event handlers to use useNavigate()
 * 
 * Provider Stack (order matters):
 * 1. ThemeProvider - light/dark mode (applies to <html>)
 * 2. CurrencyProvider - currency selection and formatting (INR default)
 * 3. ToastProvider - global notifications
 * 4. HotelProvider - hotel selection context
 * 5. AuthProvider - authentication state
 * 6. TourProvider - guided tours
 * 7. BrandThemeProvider - brand colors and logo (from API)
 */
const AppContent: React.FC = () => {
  useAuthEventHandler();
  
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <ToastProvider>
          <HotelProvider>
            <AuthProvider>
              <TourProvider>
                <BrandThemeProvider>
                  <AppRoutes />
                  <TourOverlay />
                  <TourTooltip />
                </BrandThemeProvider>
              </TourProvider>
            </AuthProvider>
          </HotelProvider>
        </ToastProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
