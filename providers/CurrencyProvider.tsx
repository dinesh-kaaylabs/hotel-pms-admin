import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  locale: string;
}

export const CURRENCY_CONFIG: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    label: 'Indian Rupee',
    locale: 'en-IN',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'US Dollar',
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'Euro',
    locale: 'en-EU',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'British Pound',
    locale: 'en-GB',
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    label: 'UAE Dirham',
    locale: 'ar-AE',
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  config: CurrencyConfig;
  format: (amount: number, options?: Intl.NumberFormatOptions) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'app-currency-preference';
const DEFAULT_CURRENCY: CurrencyCode = 'INR';

/**
 * CurrencyProvider: Global currency management
 * - Default to INR (₹)
 * - Persists user selection to localStorage
 * - Provides conversion between currencies
 * - Handles number formatting with Intl API
 * 
 * USAGE:
 * const { currency, setCurrency, format } = useCurrency();
 * <div>{format(1000)}</div>  // ₹1,000.00
 * 
 * @remarks
 * - format function is memoized to prevent recreation on every render
 * - Intl.NumberFormat instances are cached for performance
 * - No memory leaks from function recreation or formatter instances
 */
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [mounted, setMounted] = useState(false);

  // Hydration-safe initialization
  useEffect(() => {
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode | null;
    const currencyToUse = (stored && stored in CURRENCY_CONFIG) ? stored : DEFAULT_CURRENCY;
    setCurrencyState(currencyToUse);
    setMounted(true);
  }, []);

  // Memoized setCurrency to prevent recreation
  const setCurrency = useCallback((code: CurrencyCode) => {
    if (code in CURRENCY_CONFIG) {
      setCurrencyState(code);
      localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    }
  }, []);

  // Memoized config to prevent recreation
  const config = useMemo(() => CURRENCY_CONFIG[currency], [currency]);

  // Memoized formatter cache to prevent recreation of Intl.NumberFormat instances
  const formatterCache = useMemo(() => new Map<string, Intl.NumberFormat>(), []);

  /**
   * Format amount with current currency
   * Backend is source of truth for currency conversion - amounts should already be in user's selected currency
   * @param amount - The amount to format (assumed to be in current currency)
   * @param options - Intl.NumberFormatOptions
   * @returns Formatted currency string
   * 
   * @remarks
   * - Memoized with useCallback to prevent recreation on every render
   * - Caches Intl.NumberFormat instances for performance
   * - Cache key includes currency and serialized options
   */
  const format = useCallback((amount: number, options?: Intl.NumberFormatOptions): string => {
    const cacheKey = `${currency}-${JSON.stringify(options || {})}`;
    
    let formatter = formatterCache.get(cacheKey);
    if (!formatter) {
      formatter = new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
      });
      formatterCache.set(cacheKey, formatter);
    }
    
    return formatter.format(amount);
  }, [currency, config.locale, formatterCache]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currency,
    setCurrency,
    config,
    format,
  }), [currency, setCurrency, config, format]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Hook to access currency context
 * @throws Error if used outside CurrencyProvider
 * @returns Currency context value
 */
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
