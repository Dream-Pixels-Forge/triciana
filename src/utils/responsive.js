/**
 * Responsive Design Utilities
 * 
 * Helper components and utilities for responsive design testing.
 */

/**
 * Breakpoint Display Component
 * Shows current viewport breakpoint for testing.
 */
export function BreakpointDisplay() {
  return (
    <div className="fixed bottom-4 left-4 z-50 px-3 py-1.5 bg-neutral-900 text-white text-xs font-mono rounded-md shadow-lg hidden lg:block">
      <span className="hidden sm:inline">sm </span>
      <span className="hidden md:inline">md </span>
      <span className="hidden lg:inline">lg </span>
      <span className="hidden xl:inline">xl </span>
      <span className="hidden 2xl:inline">2xl</span>
    </div>
  );
}

/**
 * Responsive Container Test
 * Wraps content to test responsive behavior.
 */
export function ResponsiveTestWrapper({ children, className = '' }) {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Mobile-first test banner */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-amber-100 text-amber-800 text-xs py-1 text-center">
        Mobile View (testing)
      </div>
      
      {/* Tablet test banner */}
      <div className="hidden lg:block xl:hidden fixed top-0 left-0 right-0 z-[100] bg-blue-100 text-blue-800 text-xs py-1 text-center">
        Tablet View (testing)
      </div>
      
      {/* Desktop test banner */}
      <div className="hidden xl:block fixed top-0 left-0 right-0 z-[100] bg-green-100 text-green-800 text-xs py-1 text-center">
        Desktop View (testing)
      </div>
      
      <div className="pt-6 lg:pt-6 xl:pt-6">
        {children}
      </div>
      
      <BreakpointDisplay />
    </div>
  );
}

/**
 * Touch Target Test
 * Highlights elements to verify minimum touch target sizes.
 */
export function TouchTargetTest() {
  return (
    <style>{`
      @media (pointer: coarse) {
        button, a, input, select, textarea {
          min-width: 44px;
          min-height: 44px;
        }
      }
    `}</style>
  );
}

export default {
  BreakpointDisplay,
  ResponsiveTestWrapper,
  TouchTargetTest,
};
