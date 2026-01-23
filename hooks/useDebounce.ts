
import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Delays updating a value until a specified delay has passed.
 * Useful for preventing excessive API calls during typing.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
