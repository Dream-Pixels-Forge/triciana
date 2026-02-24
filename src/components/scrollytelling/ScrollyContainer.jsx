import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollyContainer Component
 * 
 * Main container for scrollytelling experiences.
 * Manages scroll progress, section pinning, and overall state.
 * 
 * @param {React.ReactNode} children - ScrollySection components
 * @param {string} className - Additional CSS classes
 * @param {boolean} showProgress - Show scroll progress indicator
 * @param {function} onSectionChange - Callback when active section changes
 * @param {number} progressOffset - Offset for progress calculation (0-1)
 */
export function ScrollyContainer({
  children,
  className = '',
  showProgress = true,
  onSectionChange,
  progressOffset = 0,
}) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  // Setup scroll progress indicator
  useEffect(() => {
    if (reducedMotion || !showProgress || !progressRef.current) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Create progress bar animation
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, showProgress]);

  // Count sections and setup active section tracking
  useEffect(() => {
    const sections = React.Children.toArray(children);
    setTotalSections(sections.length);

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      sections.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `[data-section-index="${index}"]`,
          start: 'top center',
          end: 'bottom center',
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

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      aria-label="Scrollytelling experience"
    >
      {/* Progress Indicator */}
      {showProgress && !reducedMotion && (
        <div
          className="fixed top-0 left-0 right-0 h-1 bg-primary-100 z-50"
          role="progressbar"
          aria-valuenow={activeSection + 1}
          aria-valuemin={1}
          aria-valuemax={totalSections}
          aria-label="Scroll progress"
        >
          <div
            ref={progressRef}
            className="h-full bg-primary-500 scale-x-0"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      )}

      {/* Section Indicator (optional) */}
      {showProgress && !reducedMotion && totalSections > 1 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
          <div className="flex flex-col gap-2">
            {Array.from({ length: totalSections }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const section = document.querySelector(
                    `[data-section-index="${index}"]`
                  );
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeSection
                    ? 'bg-primary-500 scale-125'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to section ${index + 1}`}
                aria-current={index === activeSection ? 'step' : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default ScrollyContainer;
