import { useState, useEffect, useRef } from 'react';

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

/**
 * this helps to observe if an element is
 * @param {object} options - IntersectionObserver options
 * @returns {array[0]} setNode - function to set the element to observe
 * @returns {array[1]} isIntersected - if the element observed has intersected with the root
 */
export const useIntersect = (options) => {
  const [node, setNode] = useState(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    // eslint-disable-next-line
    observer.current = new IntersectionObserver(
      ([entry]) => setIsIntersected(entry.isIntersecting), options,
    );

    const currentObserver = observer.current;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, setIsIntersected, options, isIntersected]);

  return [setNode, isIntersected];
};
