import { useState, useEffect } from 'react';

import { defaultDebounceTime } from './defaults';

export const useDebounce = (value, delay = defaultDebounceTime) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  },
  [value, delay]);

  return debouncedValue;
};

export default useDebounce;
