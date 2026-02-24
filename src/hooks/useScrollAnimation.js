import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

/**
 * useScrollAnimation Hook
 * 
 * Creates scroll-triggered animations with reduced motion support.
 * 
 * @param {object} options - Animation options
 * @returns {object} { ref, animation }
 * 
 * @example
 * const { ref } = useScrollAnimation({
 *   from: { opacity: 0, y: 40 },
 *   to: { opacity: 1, y: 0, duration: 0.8 },
 *   trigger: 'top 80%',
 * });
 * 
 * return <div ref={ref}>Animated content</div>;
 */
export function useScrollAnimation(options = {}) {
  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    toggleActions = 'play none none reverse',
    delay = 0,
  } = options;

  const ref = useRef(null);
  const animationRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const createAnimation = useCallback(() => {
    if (!ref.current) return;

    // Clean up existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Skip animation if reduced motion is preferred
    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    animationRef.current = gsap.fromTo(
      ref.current,
      { ...from },
      {
        ...to,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          toggleActions,
        },
      }
    );
  }, [from, to, start, end, scrub, toggleActions, delay, reducedMotion]);

  useEffect(() => {
    // Wait for DOM to be ready
    const timeoutId = setTimeout(createAnimation, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [createAnimation]);

  // Refresh animation on scroll trigger refresh
  useEffect(() => {
    const refreshAnimation = () => {
      if (animationRef.current && ref.current) {
        createAnimation();
      }
    };

    ScrollTrigger.addEventListener('refresh', refreshAnimation);
    
    return () => {
      ScrollTrigger.removeEventListener('refresh', refreshAnimation);
    };
  }, [createAnimation]);

  return { ref, animation: animationRef.current };
}

/**
 * useScrollAnimations Hook
 * 
 * Creates staggered scroll-triggered animations for multiple elements.
 * 
 * @param {object} options - Animation options
 * @returns {object} { refs, animations }
 * 
 * @example
 * const { refs } = useScrollAnimations({
 *   count: 5,
 *   from: { opacity: 0, y: 30 },
 *   to: { opacity: 1, y: 0, duration: 0.6 },
 *   stagger: 0.1,
 * });
 * 
 * return (
 *   <div>
 *     {items.map((item, i) => (
 *       <div key={item.id} ref={refs[i]}>{item.name}</div>
 *     ))}
 *   </div>
 * );
 */
export function useScrollAnimations(options = {}) {
  const {
    count = 1,
    from = { opacity: 0, y: 30 },
    to = { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    start = 'top 85%',
    stagger = 0.1,
  } = options;

  const refs = useRef([]);
  const animationsRef = useRef([]);
  const reducedMotion = useReducedMotion();

  const createAnimations = useCallback(() => {
    // Clean up existing animations
    animationsRef.current.forEach(anim => anim?.kill());
    animationsRef.current = [];

    // Skip animations if reduced motion is preferred
    if (reducedMotion) {
      refs.current.forEach(ref => {
        if (ref) gsap.set(ref, { opacity: 1, y: 0 });
      });
      return;
    }

    refs.current.forEach((ref, index) => {
      if (!ref) return;

      const animation = gsap.fromTo(
        ref,
        { ...from },
        {
          ...to,
          delay: index * stagger,
          scrollTrigger: {
            trigger: ref,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );

      animationsRef.current[index] = animation;
    });
  }, [count, from, to, start, stagger, reducedMotion]);

  useEffect(() => {
    const timeoutId = setTimeout(createAnimations, 100);
    
    return () => {
      clearTimeout(timeoutId);
      animationsRef.current.forEach(anim => anim?.kill());
    };
  }, [createAnimations]);

  return { refs, animations: animationsRef.current };
}

export default useScrollAnimation;
