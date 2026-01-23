import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'app-theme-preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider: Manages light/dark mode state
 * - Persists theme to localStorage
 * - Applies theme class to document root
 * - No hydration mismatch (reads client-side only)
 * - Smooth transitions via Tailwind
 * 
 * ROOT CAUSE OF PREVIOUS ISSUE:
 * 1. No dedicated theme provider - relying on API-driven BrandThemeProvider
 * 2. No localStorage persistence
 * 3. No Tailwind class strategy (dark: prefix requires class on root)
 * 4. Theme applied asynchronously after render - caused flicker
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Hydration-safe initialization: read from localStorage after mount
  useEffect(() => {
    // Check localStorage for user preference
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    
    // Fallback: check system preference
    let preferredTheme: Theme = 'light';
    if (stored) {
      preferredTheme = stored;
    } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      preferredTheme = 'dark';
    }

    setThemeState(preferredTheme);
    applyTheme(preferredTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
