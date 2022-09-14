import { useState, useEffect } from "react";

export const fixedInt = (value = '', decimal) => parseFloat(value, 10).toFixed(decimal);

export const writePrice = (value, positiveValue = '') => value > 0 ? `${positiveValue}$${value}` : value < 0 ?  `-$${-(value)}` : value;


export const useDebounce = (value, delay) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay],
    );
    return debouncedValue;
  };