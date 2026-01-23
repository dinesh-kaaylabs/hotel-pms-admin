import { useCurrency, CurrencyCode, CURRENCY_CONFIG } from '../providers/CurrencyProvider';

/**
 * STANDALONE UTILITY FUNCTIONS (No hook required)
 * Use these when you can't access React context
 */

/**
 * Format currency without context (for static exports, emails, etc)
 * @param amount - The amount to format
 * @param currency - Currency code (default: INR)
 * @returns Formatted currency string
 */
export const formatCurrencyStatic = (amount: number, currency: CurrencyCode = 'INR'): string => {
  const config = CURRENCY_CONFIG[currency];
  const formatter = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

/**
 * Format large numbers (thousands, millions, billions)
 * @param amount - The amount to format
 * @param currency - Currency code
 * @returns Abbreviated formatted string (e.g., ₹1.2M)
 */
export const formatCurrencyShort = (amount: number, currency: CurrencyCode = 'INR'): string => {
  const config = CURRENCY_CONFIG[currency];
  
  let divisor = 1;
  let suffix = '';
  
  if (Math.abs(amount) >= 1_000_000_000) {
    divisor = 1_000_000_000;
    suffix = 'B';
  } else if (Math.abs(amount) >= 1_000_000) {
    divisor = 1_000_000;
    suffix = 'M';
  } else if (Math.abs(amount) >= 1_000) {
    divisor = 1_000;
    suffix = 'K';
  }
  
  const shortAmount = amount / divisor;
  const formatter = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  
  return formatter.format(shortAmount).replace(/\s+/g, '') + suffix;
};

/**
 * Get currency symbol for a code
 * @param currency - Currency code
 * @returns Currency symbol
 */
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  return CURRENCY_CONFIG[currency].symbol;
};

/**
 * HOOK-BASED UTILITIES (Requires CurrencyProvider)
 * Use these in React components
 */

/**
 * Custom hook for price formatting with context
 * @returns Object with format functions
 */
export const useCurrencyFormatter = () => {
  const { format, convert, currency } = useCurrency();

  return {
    /**
     * Format amount with current currency
     * @param amount - The amount to format
     * @returns Formatted string (e.g., ₹1,000.00)
     */
    format,

    /**
     * Format large numbers with abbreviation
     * @param amount - The amount to format
     * @returns Abbreviated string (e.g., ₹1.2M)
     */
    formatShort: (amount: number): string => {
      const formatted = formatCurrencyShort(amount, currency);
      return formatted;
    },

    /**
     * Format range of amounts
     * @param min - Minimum amount
     * @param max - Maximum amount
     * @returns Range string (e.g., ₹1,000 - ₹2,000)
     */
    formatRange: (min: number, max: number): string => {
      return `${format(min)} - ${format(max)}`;
    },

    /**
     * Format with discount
     * @param original - Original amount
     * @param discount - Discount percentage (0-100) or amount
     * @returns Object with original, discounted, and savings
     */
    formatWithDiscount: (original: number, discount: number) => {
      const isPercentage = discount <= 100;
      const discountAmount = isPercentage ? (original * discount) / 100 : discount;
      const discounted = original - discountAmount;

      return {
        original: format(original),
        discounted: format(discounted),
        savings: format(discountAmount),
        percentOff: Math.round((discountAmount / original) * 100),
      };
    },

    /**
     * Convert amount to current currency
     * @param amount - The amount
     * @param from - Source currency
     * @returns Converted and formatted
     */
    convertAndFormat: (amount: number, from: CurrencyCode = 'INR'): string => {
      const converted = convert(amount, from, currency);
      return format(converted);
    },
  };
};
