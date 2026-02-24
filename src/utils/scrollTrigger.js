import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollTrigger Configuration
 * 
 * Centralized ScrollTrigger setup with default settings.
 */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Default ScrollTrigger configuration
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  refreshPriority: 0,
});

/**
 * Create a scroll-triggered animation
 * @param {Element} target - Element to animate
 * @param {object} from - From vars (initial state)
 * @param {object} to - To vars (final state)
 * @param {object} options - ScrollTrigger options
 * @returns {gsap.core.Tween}
 */
export function createScrollAnimation(target, from, to, options = {}) {
  const {
    trigger = target,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    toggleActions = 'play none none reverse',
    ...restOptions
  } = options;

  return gsap.fromTo(
    target,
    { ...from },
    {
      ...to,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        toggleActions,
        ...restOptions,
      },
    }
  );
}

/**
 * Create a fade-in on scroll animation
 * @param {Element} target - Element to animate
 * @param {object} options - ScrollTrigger options
 * @returns {gsap.core.Tween}
 */
export function fadeInOnScroll(target, options = {}) {
  return createScrollAnimation(
    target,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    options
  );
}

/**
 * Create a parallax effect on scroll
 * @param {Element} target - Element to animate
 * @param {number} amount - Parallax amount (positive = down, negative = up)
 * @param {object} options - ScrollTrigger options
 * @returns {gsap.core.Tween}
 */
export function parallax(target, amount = 100, options = {}) {
  const {
    trigger = target.parentElement,
    start = 'top bottom',
    end = 'bottom top',
    ...restOptions
  } = options;

  return gsap.to(target, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
      ...restOptions,
    },
  });
}

/**
 * Create a pin section for scrollytelling
 * @param {Element} target - Section to pin
 * @param {object} options - ScrollTrigger options
 * @returns {gsap.core.Timeline}
 */
export function pinSection(target, options = {}) {
  const {
    start = 'top top',
    end = '+=100%',
    pinSpacing = true,
    ...restOptions
  } = options;

  return gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start,
      end,
      pin: true,
      pinSpacing,
      scrub: 1,
      ...restOptions,
    },
  });
}

/**
 * Create a progress indicator based on scroll
 * @param {Element} indicator - Progress bar element
 * @param {object} options - ScrollTrigger options
 * @returns {gsap.core.Tween}
 */
export function createScrollProgress(indicator, options = {}) {
  const {
    trigger = document.body,
    start = 'top top',
    end = 'bottom bottom',
    ...restOptions
  } = options;

  return gsap.to(indicator, {
    scaleX: 1,
    transformOrigin: 'left center',
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
      ...restOptions,
    },
  });
}

/**
 * Refresh all ScrollTriggers
 * Useful after dynamic content changes
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers (cleanup)
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

export { ScrollTrigger };
export default ScrollTrigger;
