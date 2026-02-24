/**
 * SVG Icons Component Library
 * 
 * Reusable SVG icons for the application.
 * All icons are designed to be accessible with proper aria attributes.
 */

/**
 * Flower Icon - Primary brand icon
 */
export function FlowerIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 7.5c0-1.5-1-3-2.5-3S7 5.5 7 7.5c0 1.5 1 3 2.5 3S12 9 12 7.5z" />
      <path d="M12 7.5c0-1.5 1-3 2.5-3s2.5 1 2.5 3c0 1.5-1 3-2.5 3S12 9 12 7.5z" />
      <path d="M12 7.5c-1.5 0-3 1-3 2.5s1 2.5 2.5 2.5S14 11.5 14 10 13.5 7.5 12 7.5z" />
      <path d="M12 7.5c1.5 0 3 1 3 2.5s-1 2.5-2.5 2.5S10 11.5 10 10 10.5 7.5 12 7.5z" />
      <path d="M12 12.5v6.5" />
      <path d="M12 19l-3-2" />
      <path d="M12 19l3-2" />
      <path d="M9 10.5c-1.5 0-3 1-3 2.5s1 2.5 2.5 2.5" />
      <path d="M15 10.5c1.5 0 3 1 3 2.5s-1 2.5-2.5 2.5" />
    </svg>
  );
}

/**
 * Leaf Icon - Sustainability icon
 */
export function LeafIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21c0-4.5-3-8-8-8 0-5 4-9 9-9s9 4 9 9c-5 0-8 3.5-8 8z" />
      <path d="M12 21V10" />
      <path d="M12 14c2-2 4-3 6-3" />
      <path d="M12 17c1.5-1.5 3-2 4.5-2" />
    </svg>
  );
}

/**
 * Recycle Icon - Eco-friendly icon
 */
export function RecycleIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 19l-4-4 4-4" />
      <path d="M3 15h6" />
      <path d="M17 5l4 4-4 4" />
      <path d="M21 9h-6" />
      <path d="M12 4l2.5 4.5" />
      <path d="M12 4L9.5 8.5" />
      <path d="M12 13v7" />
    </svg>
  );
}

/**
 * Globe Icon - Earth/Global icon
 */
export function GlobeIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M12 3v18" />
      <path d="M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9" />
      <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9" />
    </svg>
  );
}

/**
 * Truck Icon - Delivery icon
 */
export function TruckIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

/**
 * Hand Icon - Handcrafted icon
 */
export function HandIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0" />
      <path d="M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2" />
      <path d="M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8" />
      <path d="M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15" />
    </svg>
  );
}

/**
 * Star Icon - Rating icon
 */
export function StarIcon({ className = 'w-6 h-6', filled = false, ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * Arrow Right Icon
 */
export function ArrowRightIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Arrow Down Icon
 */
export function ArrowDownIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}

/**
 * Menu Icon - Hamburger menu
 */
export function MenuIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 12h18" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

/**
 * Close Icon - X mark
 */
export function CloseIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

/**
 * Settings Icon - Accessibility controls
 */
export function SettingsIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6" />
      <path d="M12 17v6" />
      <path d="M4.22 4.22l4.24 4.24" />
      <path d="M15.54 15.54l4.24 4.24" />
      <path d="M1 12h6" />
      <path d="M17 12h6" />
      <path d="M4.22 19.78l4.24-4.24" />
      <path d="M15.54 8.46l4.24-4.24" />
    </svg>
  );
}

/**
 * Check Icon
 */
export function CheckIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/**
 * Spinner Icon - Loading
 */
export function SpinnerIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default {
  FlowerIcon,
  LeafIcon,
  RecycleIcon,
  GlobeIcon,
  TruckIcon,
  HandIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  MenuIcon,
  CloseIcon,
  SettingsIcon,
  CheckIcon,
  SpinnerIcon,
};
