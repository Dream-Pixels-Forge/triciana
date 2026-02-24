import { useEffect, useState, useCallback } from 'react';
import { prefersReducedMotion } from '../utils/accessibility';

/**
 * useReducedMotion Hook
 * 
 * Detects and responds to the user's reduced motion preference.
 * 
 * @returns {boolean} True if user prefers reduced motion
 * 
 * @example
 * const reducedMotion = useReducedMotion();
 * 
 * useEffect(() => {
 *   if (!reducedMotion) {
 *     // Initialize animations
 *   }
 * }, [reducedMotion]);
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return reducedMotion;
}

/**
 * useReducedMotionValue Hook
 * 
 * Returns a motion value that respects reduced motion preference.
 * 
 * @param {any} normalValue - Value when motion is enabled
 * @param {any} reducedValue - Value when reduced motion is preferred
 * @returns {any} Appropriate value based on preference
 * 
 * @example
 * const duration = useReducedMotionValue(0.8, 0);
 * const y = useReducedMotionValue(40, 0);
 */
export function useReducedMotionValue(normalValue, reducedValue) {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? reducedValue : normalValue;
}

export default useReducedMotion;
