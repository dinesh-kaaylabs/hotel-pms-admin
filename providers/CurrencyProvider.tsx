import React, { createContext, useContext, useEffect, useState } from 'react';

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

// Mock conversion rates (1 unit in base currency = X in target currency)
// Base: INR
const CONVERSION_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 1 / 83.2, // 1 USD = 83.2 INR (example rate)
  EUR: 1 / 90.5, // 1 EUR = 90.5 INR
  GBP: 1 / 105.2, // 1 GBP = 105.2 INR
  AED: 1 / 22.7, // 1 AED = 22.7 INR
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  config: CurrencyConfig;
  convert: (amount: number, fromCurrency?: CurrencyCode, toCurrency?: CurrencyCode) => number;
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

  const setCurrency = (code: CurrencyCode) => {
    if (code in CURRENCY_CONFIG) {
      setCurrencyState(code);
      localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    }
  };

  const config = CURRENCY_CONFIG[currency];

  /**
   * Convert amount between currencies
   * @param amount - The amount to convert
   * @param fromCurrency - Source currency (default: current currency)
   * @param toCurrency - Target currency (default: current currency)
   * @returns Converted amount
   */
  const convert = (
    amount: number,
    fromCurrency: CurrencyCode = currency,
    toCurrency: CurrencyCode = currency
  ): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to base (INR), then to target
    const baseAmount = amount / CONVERSION_RATES[fromCurrency];
    const convertedAmount = baseAmount * CONVERSION_RATES[toCurrency];
    
    return convertedAmount;
  };

  /**
   * Format amount with current currency
   * @param amount - The amount to format
   * @param options - Intl.NumberFormatOptions
   * @returns Formatted currency string
   */
  const format = (amount: number, options?: Intl.NumberFormatOptions): string => {
    const formatter = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    });
    return formatter.format(amount);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, config, convert, format }}>
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
