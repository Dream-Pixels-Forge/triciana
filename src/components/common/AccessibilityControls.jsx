import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * AccessibilityControls Component
 * 
 * Provides user controls for accessibility preferences:
 * - Reduced motion toggle
 * - Font size adjustment
 * - High contrast mode toggle
 * 
 * These controls override system preferences when explicitly set by the user.
 */
export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const systemReducedMotion = useReducedMotion();
  
  // User preferences (stored in localStorage)
  const [userReducedMotion, setUserReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('pref-reduced-motion') === 'true';
  });
  
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window === 'undefined') return 'normal';
    return localStorage.getItem('pref-font-size') || 'normal';
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('pref-high-contrast') === 'true';
  });

  // Apply reduced motion
  useEffect(() => {
    const shouldReduceMotion = userReducedMotion ?? systemReducedMotion;
    
    if (shouldReduceMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [userReducedMotion, systemReducedMotion]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-base', 'text-lg', 'text-xl');
    
    switch (fontSize) {
      case 'large':
        root.classList.add('text-lg');
        break;
      case 'xl':
        root.classList.add('text-xl');
        break;
      default:
        root.classList.add('text-base');
    }
  }, [fontSize]);

  // Apply high contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Save preferences
  useEffect(() => {
    if (userReducedMotion !== null) {
      localStorage.setItem('pref-reduced-motion', userReducedMotion.toString());
    }
  }, [userReducedMotion]);

  useEffect(() => {
    localStorage.setItem('pref-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('pref-high-contrast', highContrast.toString());
  }, [highContrast]);

  const toggleReducedMotion = () => {
    setUserReducedMotion(prev => prev === null ? true : !prev);
  };

  const cycleFontSize = () => {
    setFontSize(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xl';
      return 'normal';
    });
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-sm shadow-soft-lg"
        aria-label={isOpen ? 'Close accessibility settings' : 'Open accessibility settings'}
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Settings panel */}
      {isOpen && (
        <div
          className="absolute bottom-full right-0 mb-2 p-4 bg-white rounded-xl shadow-soft-lg border border-neutral-100 min-w-[280px]"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <h3 className="text-heading-sm font-display font-semibold mb-4">
            Accessibility
          </h3>

          <div className="space-y-4">
            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium">Reduced Motion</p>
                <p className="text-caption text-neutral-500">
                  {userReducedMotion === null 
                    ? `System: ${systemReducedMotion ? 'On' : 'Off'}` 
                    : userReducedMotion ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <button
                onClick={toggleReducedMotion}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  userReducedMotion ?? systemReducedMotion 
                    ? 'bg-primary-500' 
                    : 'bg-neutral-300'
                }`}
                role="switch"
                aria-checked={userReducedMotion ?? systemReducedMotion}
                aria-label="Toggle reduced motion"
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    userReducedMotion ?? systemReducedMotion 
                      ? 'translate-x-7' 
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium">Text Size</p>
                <p className="text-caption text-neutral-500">
                  {fontSize === 'normal' ? 'Normal' : fontSize === 'large' ? 'Large' : 'Extra Large'}
                </p>
              </div>
              <button
                onClick={cycleFontSize}
                className="btn btn-secondary btn-sm"
                aria-label="Cycle text size"
              >
                {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
              </button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium">High Contrast</p>
                <p className="text-caption text-neutral-500">
                  {highContrast ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <button
                onClick={toggleHighContrast}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  highContrast ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
                role="switch"
                aria-checked={highContrast}
                aria-label="Toggle high contrast"
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setUserReducedMotion(null);
              setFontSize('normal');
              setHighContrast(false);
            }}
            className="mt-4 w-full btn btn-ghost btn-sm text-neutral-500"
          >
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}

export default AccessibilityControls;
