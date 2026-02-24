import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Section, Container } from '../common';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollySection Component
 * 
 * Individual section within a ScrollyContainer.
 * Handles scroll-triggered animations for content elements.
 * 
 * @param {React.ReactNode} children - Section content
 * @param {string} background - Background variant ('light' | 'dark' | 'image')
 * @param {string} backgroundImage - Background image URL (if variant is 'image')
 * @param {string} className - Additional CSS classes
 * @param {number} index - Section index (auto-assigned by parent)
 * @param {object} animationConfig - Custom animation configuration
 */
export function ScrollySection({
  children,
  background = 'light',
  backgroundImage,
  className = '',
  index = 0,
  animationConfig = {},
}) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const {
    // Fade animation config
    fade = { from: { opacity: 0 }, to: { opacity: 1 }, duration: 1 },
    // Slide animation config
    slide = { from: { y: 60 }, to: { y: 0 }, duration: 1 },
    // Scale animation config
    scale = { from: { scale: 0.9 }, to: { scale: 1 }, duration: 1 },
    // Trigger position
    triggerStart = 'top 80%',
    // Whether to pin the section
    pin = false,
    // Pin duration (if pinned)
    pinDuration = '+=100%',
  } = animationConfig;

  // Setup section animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      // No animations for reduced motion users
      gsap.set(section, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Create main timeline for this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: triggerStart,
          end: pin ? pinDuration : 'bottom 80%',
          scrub: pin ? 1 : false,
          pin: pin,
          pinSpacing: pin,
          toggleActions: 'play none none reverse',
        },
      });

      // Animate child elements with stagger
      const animatedChildren = section.querySelectorAll('[data-animate]');
      
      if (animatedChildren.length > 0) {
        animatedChildren.forEach((child, i) => {
          const animationType = child.dataset.animate;
          const delay = child.dataset.delay ? parseFloat(child.dataset.delay) : i * 0.2;
          
          let animConfig = {};
          
          switch (animationType) {
            case 'fade':
              animConfig = fade;
              break;
            case 'slide-up':
              animConfig = slide;
              animConfig.to.x = 0;
              animConfig.from = { ...animConfig.from, x: 0 };
              break;
            case 'slide-left':
              animConfig = slide;
              animConfig.from.x = -60;
              animConfig.to.x = 0;
              break;
            case 'slide-right':
              animConfig = slide;
              animConfig.from.x = 60;
              animConfig.to.x = 0;
              break;
            case 'scale':
              animConfig = scale;
              break;
            case 'rotate':
              animConfig = {
                from: { rotation: -10, scale: 0.9 },
                to: { rotation: 0, scale: 1 },
                duration: 1,
              };
              break;
            default:
              animConfig = fade;
          }

          tl.fromTo(
            child,
            { ...animConfig.from, opacity: 0 },
            {
              ...animConfig.to,
              opacity: 1,
              duration: animConfig.duration,
              delay,
              ease: 'power2.out',
            },
            0
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, fade, slide, scale, triggerStart, pin, pinDuration]);

  // Background classes
  const backgroundClasses = {
    light: 'bg-neutral-50',
    dark: 'bg-neutral-900 text-white',
    image: backgroundImage ? 'bg-cover bg-center bg-no-repeat' : '',
  };

  return (
    <Section
      ref={sectionRef}
      data-section-index={index}
      className={`${backgroundClasses[background]} ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <Container>
        {children}
      </Container>
    </Section>
  );
}

/**
 * ScrollyMedia Component
 * 
 * Media element (image/video) with parallax scroll effect.
 * 
 * @param {string} src - Media source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} type - Media type ('image' | 'video')
 * @param {number} parallaxAmount - Parallax movement in pixels
 * @param {string} className - Additional CSS classes
 */
export function ScrollyMedia({
  src,
  alt = '',
  type = 'image',
  parallaxAmount = 100,
  className = '',
}) {
  const mediaRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(media, {
        y: parallaxAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: media.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, mediaRef);

    return () => ctx.revert();
  }, [reducedMotion, parallaxAmount]);

  if (type === 'video') {
    return (
      <video
        ref={mediaRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <div
      ref={mediaRef}
      className={`overflow-hidden ${className}`}
      style={{ willChange: 'transform' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}

/**
 * ScrollyText Component
 * 
 * Text element with scroll-triggered reveal animation.
 * 
 * @param {string} children - Text content
 * @param {string} as - HTML element to render as
 * @param {string} animation - Animation type
 * @param {number} delay - Animation delay
 * @param {string} className - Additional CSS classes
 */
export function ScrollyText({
  children,
  as: Component = 'p',
  animation = 'fade',
  delay = 0,
  className = '',
}) {
  return (
    <Component
      data-animate={animation}
      data-delay={delay}
      className={className}
    >
      {children}
    </Component>
  );
}

export default ScrollySection;
