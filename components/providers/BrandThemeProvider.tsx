
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useBranding } from '../../modules/settings/settings.api';
import { BrandConfig } from '../../modules/settings/settings.types';
import { useAuth } from '../../auth/AuthContext';

interface BrandThemeContextType {
  theme: BrandConfig;
  isLoading: boolean;
}

const DEFAULT_THEME: BrandConfig = {
  name: 'LuxeStay PMS',
  primaryColor: '#4f46e5', // Indigo 600
  secondaryColor: '#4338ca', // Indigo 700
  accentColor: '#10b981', // Emerald 500
  theme: 'light',
  font: 'Inter, sans-serif'
};

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(undefined);

export const BrandThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { data: branding, isLoading } = useBranding(isAuthenticated);

  const theme = useMemo(() => branding || DEFAULT_THEME, [branding]);

  useEffect(() => {
    // Apply CSS Variables to :root
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', theme.primaryColor);
    root.style.setProperty('--brand-secondary', theme.secondaryColor || theme.primaryColor);
    root.style.setProperty('--brand-accent', theme.accentColor || '#10b981');
    
    if (theme.font) {
      root.style.setProperty('--brand-font', theme.font);
      document.body.style.fontFamily = theme.font;
    }

    // Toggle Dark Mode
    if (theme.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrandThemeContext.Provider value={{ theme, isLoading }}>
      {children}
    </BrandThemeContext.Provider>
  );
};

export const useBrandTheme = () => {
  const context = useContext(BrandThemeContext);
  if (context === undefined) {
    throw new Error('useBrandTheme must be used within a BrandThemeProvider');
  }
  return context;
};
