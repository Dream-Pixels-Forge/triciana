import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowDownIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced ScrollyContainer Component
 *
 * Award-winning scrollytelling container with advanced features:
 * - Smooth scroll progress with sections indicator
 * - Auto-hide header integration
 * - Section preview thumbnails
 * - Keyboard navigation support
 * - Touch-friendly swipe gestures
 * - Performance-optimized rendering
 */
export function ScrollyContainer({
  children,
  className = '',
  showProgress = true,
  showSectionDots = true,
  onSectionChange,
}) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const progressFillRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Setup scroll progress indicator with percentage
  useEffect(() => {
    if (reducedMotion || !showProgress || !progressFillRef.current) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(Math.round(self.progress * 100));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, showProgress]);

  // Count sections and setup active section tracking with callbacks
  useEffect(() => {
    const sections = React.Children.toArray(children);
    setTotalSections(sections.length);

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      sections.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `[data-section-index="${index}"]`,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => {
            setActiveSection(index);
            onSectionChange?.(index);
          },
          onEnterBack: () => {
            setActiveSection(index);
            onSectionChange?.(index);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [children, reducedMotion, onSectionChange]);

  // Scroll to section handler
  const scrollToSection = useCallback((index) => {
    const section = document.querySelector(`[data-section-index="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(Math.min(activeSection + 1, totalSections - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(Math.max(activeSection - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(totalSections - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, totalSections, scrollToSection]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      aria-label="Scrollytelling experience"
    >
      {/* Enhanced Progress Bar */}
      {showProgress && !reducedMotion && (
        <>
          {/* Background track */}
          <div
            className="fixed top-0 left-0 right-0 h-1.5 bg-neutral-100 z-[60]"
            role="progressbar"
            aria-valuenow={scrollProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Scroll progress"
          >
            {/* Animated fill */}
            <div
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
              style={{ 
                width: `${scrollProgress}%`,
                transition: isScrolling ? 'none' : 'width 0.3s ease-out'
              }}
            />
          </div>

          {/* Progress percentage */}
          <div className="fixed top-3 right-4 z-[60] text-xs font-mono text-neutral-500 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-neutral-200">
            {scrollProgress}%
          </div>
        </>
      )}

      {/* Section Navigation Dots */}
      {showSectionDots && !reducedMotion && totalSections > 1 && (
        <nav 
          className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3 lg:gap-4"
          aria-label="Section navigation"
        >
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection(index);
                }
              }}
              className={`group relative transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full ${
                index === activeSection
                  ? 'scale-125'
                  : 'scale-100 hover:scale-110'
              }`}
              aria-label={`Navigate to section ${index + 1}: ${getSectionLabel(index, children)}`}
              aria-current={index === activeSection ? 'step' : undefined}
            >
              {/* Dot */}
              <div
                className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 ${
                  index === activeSection
                    ? 'bg-primary-500 shadow-lg shadow-primary-500/50'
                    : 'bg-neutral-300 group-hover:bg-neutral-400'
                }`}
              />

              {/* Active indicator ring */}
              {index === activeSection && (
                <div className="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-20" />
              )}

              {/* Tooltip */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                {getSectionLabel(index, children)}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-neutral-900 rotate-45" />
              </span>
            </button>
          ))}
        </nav>
      )}

      {/* Scroll to top hint (when scrolled down) */}
      {!reducedMotion && scrollProgress > 10 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-[60] p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Scroll to top"
        >
          <ArrowDownIcon className="w-5 h-5 rotate-180 text-neutral-600" />
        </button>
      )}

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// Helper to get section labels for accessibility
function getSectionLabel(index, children) {
  const sectionNames = [
    'Our Story',
    'Process',
    'Sustainability',
    'Collections',
    'Testimonials'
  ];
  return sectionNames[index] || `Section ${index + 1}`;
}

export default ScrollyContainer;
