/**
 * Date Formatting Utilities
 * Centralized date formatting with consistent locale and timezone handling
 */

// Default locale for the application
const DEFAULT_LOCALE = 'en-IN';

/**
 * Format date in short format (e.g., "Jan 26, 2026")
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    return '-';
  }
}

/**
 * Format date in long format (e.g., "Monday, January 26, 2026")
 */
export function formatDateLong(date: string | Date | null | undefined): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    return '-';
  }
}

/**
 * Format date and time (e.g., "Jan 26, 2026, 2:30 PM")
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  } catch (error) {
    return '-';
  }
}

/**
 * Format time only (e.g., "2:30 PM")
 */
export function formatTime(date: string | Date | null | undefined): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  } catch (error) {
    return '-';
  }
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: string | Date | null | undefined): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    return '';
  }
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (Math.abs(diffSec) < 60) {
      return 'just now';
    } else if (Math.abs(diffMin) < 60) {
      return diffMin > 0 ? `in ${diffMin} minutes` : `${Math.abs(diffMin)} minutes ago`;
    } else if (Math.abs(diffHour) < 24) {
      return diffHour > 0 ? `in ${diffHour} hours` : `${Math.abs(diffHour)} hours ago`;
    } else if (Math.abs(diffDay) < 7) {
      return diffDay > 0 ? `in ${diffDay} days` : `${Math.abs(diffDay)} days ago`;
    } else {
      return formatDate(dateObj);
    }
  } catch (error) {
    return '-';
  }
}

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkIn: string | Date, checkOut: string | Date): number {
  try {
    const checkInDate = typeof checkIn === 'string' ? new Date(checkIn) : checkIn;
    const checkOutDate = typeof checkOut === 'string' ? new Date(checkOut) : checkOut;
    
    const diffMs = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  } catch (error) {
    return 0;
  }
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj < new Date();
  } catch (error) {
    return false;
  }
}

/**
 * Check if date is today
 */
export function isToday(date: string | Date): boolean {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    
    return dateObj.getDate() === today.getDate() &&
           dateObj.getMonth() === today.getMonth() &&
           dateObj.getFullYear() === today.getFullYear();
  } catch (error) {
    return false;
  }
}

/**
 * Get date range string (e.g., "Jan 26 - Jan 28, 2026")
 */
export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  try {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    const startFormatted = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      month: 'short',
      day: 'numeric',
    }).format(start);
    
    const endFormatted = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(end);
    
    return `${startFormatted} - ${endFormatted}`;
  } catch (error) {
    return '-';
  }
}

/**
 * Add days to a date
 */
export function addDays(date: string | Date, days: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get start of day (00:00:00)
 */
export function startOfDay(date: string | Date): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day (23:59:59)
 */
export function endOfDay(date: string | Date): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(23, 59, 59, 999);
  return result;
}
