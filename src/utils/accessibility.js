/**
 * Accessibility Utilities
 * 
 * Helper functions for WCAG 2.2 AA compliance.
 */

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers dark mode
 * @returns {boolean}
 */
export function prefersDarkMode() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-dark-scheme: dark)').matches;
}

/**
 * Check if user prefers high contrast
 * @returns {boolean}
 */
export function prefersHighContrast() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: more)').matches;
}

/**
 * Trap focus within an element (for modals, dialogs)
 * @param {HTMLElement} element - Element to trap focus within
 * @returns {function} Cleanup function
 */
export function trapFocus(element) {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const focusableElements = element.querySelectorAll(focusableSelectors);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Restore focus to previously focused element
 * @param {HTMLElement} previouslyFocused - Element that had focus before
 */
export function restoreFocus(previouslyFocused) {
  previouslyFocused?.focus();
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announce(message, priority = 'polite') {
  const announcer = document.getElementById('announcer');
  if (announcer) {
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

/**
 * Create a live region announcer element
 * @returns {HTMLElement}
 */
export function createAnnouncer() {
  const announcer = document.createElement('div');
  announcer.id = 'announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  return announcer;
}

/**
 * Handle keyboard navigation for custom interactive elements
 * @param {HTMLElement} element - Interactive element
 * @param {function} onActivate - Callback when element is activated
 */
export function handleKeyboardActivation(element, onActivate) {
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  });
}

/**
 * Check if element is visible in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean}
 */
export function isElementInViewport(element, threshold = 0) {
  const rect = element.getBoundingClientRect();
  const visibleArea = Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
  );
  const elementHeight = rect.height;
  const visiblePercentage = elementHeight > 0 ? visibleArea / elementHeight : 0;
  return visiblePercentage >= threshold;
}

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} container - Container element
 * @returns {HTMLElement[]}
 */
export function getFocusableElements(container) {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Set up skip link functionality
 * @param {string} targetId - ID of target element to skip to
 */
export function setupSkipLink(targetId) {
  const skipLink = document.querySelector('.skip-link');
  const target = document.getElementById(targetId);

  if (skipLink && target) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

export default {
  prefersReducedMotion,
  prefersDarkMode,
  prefersHighContrast,
  trapFocus,
  restoreFocus,
  announce,
  createAnnouncer,
  handleKeyboardActivation,
  isElementInViewport,
  getFocusableElements,
  setupSkipLink,
};
