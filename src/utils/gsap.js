import gsap from 'gsap';

/**
 * GSAP Configuration
 * 
 * Centralized GSAP setup with default settings and utilities.
 */

// Set default GSAP configuration
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// Default easing curves
export const easings = {
  // Smooth, elegant easing
  smooth: 'power2.out',
  // Quick, snappy easing
  snappy: 'power1.out',
  // Slow, dramatic easing
  dramatic: 'power4.inOut',
  // Elastic bounce
  elastic: 'elastic.out(1, 0.5)',
  // Back animation (overshoot)
  back: 'back.out(1.7)',
  // Expo ease (GSAP's signature)
  expo: 'expo.out',
};

// Default animation durations (in seconds)
export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
};

/**
 * Create a staggered animation timeline
 * @param {Element[]} targets - Elements to animate
 * @param {object} vars - GSAP animation vars
 * @param {number} staggerAmount - Time between each animation
 * @returns {gsap.core.Timeline}
 */
export function createStagger(targets, vars, staggerAmount = 0.1) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    {
      ...vars,
      opacity: 1,
      y: 0,
      stagger: staggerAmount,
      ease: easings.smooth,
    }
  );
}

/**
 * Create a fade-in animation
 * @param {Element} target - Element to animate
 * @param {object} options - Animation options
 * @returns {gsap.core.Tween}
 */
export function fadeIn(target, options = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    {
      opacity: 1,
      duration: durations.normal,
      ease: easings.smooth,
      ...options,
    }
  );
}

/**
 * Create a fade-in-up animation
 * @param {Element} target - Element to animate
 * @param {object} options - Animation options
 * @returns {gsap.core.Tween}
 */
export function fadeInUp(target, options = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: durations.slow,
      ease: easings.expo,
      ...options,
    }
  );
}

/**
 * Create a scale-in animation
 * @param {Element} target - Element to animate
 * @param {object} options - Animation options
 * @returns {gsap.core.Tween}
 */
export function scaleIn(target, options = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: durations.normal,
      ease: easings.expo,
      ...options,
    }
  );
}

export default gsap;
