import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Section, Container } from '../common';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced ScrollySection Component
 *
 * Award-winning section with advanced scroll-triggered animations:
 * - Split text reveals (character/word by character)
 * - Image reveal with mask animation
 * - Staggered grid animations
 * - Parallax layers with different speeds
 * - Smooth pinning with scrubbing
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
    triggerStart = 'top 75%',
    triggerEnd = 'bottom 75%',
    pin = false,
    pinDuration = '+=100%',
    scrub = 1,
    // Advanced animation presets
    preset = 'default',
  } = animationConfig;

  // Setup advanced section animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(section, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Create scroll trigger with advanced options
      const scrollTrigger = {
        trigger: section,
        start: triggerStart,
        end: pin ? pinDuration : triggerEnd,
        scrub: pin ? scrub : false,
        pin: pin,
        pinSpacing: pin,
        toggleActions: 'play none none reverse',
        // Smooth scrubbing
        smoothTouch: 0.1,
      };

      // Animation presets
      const presets = {
        default: {
          ease: 'power3.out',
          stagger: 0.15,
        },
        dramatic: {
          ease: 'expo.out',
          stagger: 0.2,
          duration: 1.5,
        },
        snappy: {
          ease: 'power1.out',
          stagger: 0.08,
          duration: 0.6,
        },
        elegant: {
          ease: 'power2.inOut',
          stagger: 0.12,
          duration: 1.2,
        },
      };

      const currentPreset = presets[preset] || presets.default;

      // Create timeline
      const tl = gsap.timeline({ scrollTrigger });

      // Animate elements with [data-animate]
      const animatedElements = section.querySelectorAll('[data-animate]');

      if (animatedElements.length > 0) {
        const elements = Array.from(animatedElements);

        elements.forEach((el, i) => {
          const animType = el.dataset.animate;
          const customDelay = el.dataset.delay ? parseFloat(el.dataset.delay) : null;
          const duration = el.dataset.duration ? parseFloat(el.dataset.duration) : currentPreset.duration;

          let animation = {};
          let fromVars = { opacity: 0 };
          let toVars = { opacity: 1 };

          switch (animType) {
            case 'fade-up':
              fromVars.y = 80;
              fromVars.rotationX = -15;
              toVars.y = 0;
              toVars.rotationX = 0;
              break;

            case 'fade-down':
              fromVars.y = -80;
              fromVars.rotationX = 15;
              toVars.y = 0;
              toVars.rotationX = 0;
              break;

            case 'slide-left':
              fromVars.x = -100;
              fromVars.opacity = 0;
              toVars.x = 0;
              toVars.opacity = 1;
              break;

            case 'slide-right':
              fromVars.x = 100;
              fromVars.opacity = 0;
              toVars.x = 0;
              toVars.opacity = 1;
              break;

            case 'scale-up':
              fromVars.scale = 0.8;
              fromVars.opacity = 0;
              toVars.scale = 1;
              toVars.opacity = 1;
              break;

            case 'scale-down':
              fromVars.scale = 1.2;
              fromVars.opacity = 0;
              toVars.scale = 1;
              toVars.opacity = 1;
              break;

            case 'rotate-in':
              fromVars.rotation = -180;
              fromVars.scale = 0;
              toVars.rotation = 0;
              toVars.scale = 1;
              break;

            case 'blur-in':
              fromVars.filter = 'blur(20px)';
              fromVars.opacity = 0;
              toVars.filter = 'blur(0px)';
              toVars.opacity = 1;
              break;

            case 'clip-reveal':
              // For image mask reveals
              el.style.clipPath = 'inset(0 100% 0 0)';
              toVars.clipPath = 'inset(0 0% 0 0)';
              delete toVars.opacity;
              break;

            case 'text-split':
              // For character-by-character text reveal
              const chars = el.textContent.split('');
              el.innerHTML = chars.map((char, i) => 
                `<span class="inline-block" style="transition-delay: ${i * 30}ms">${char === ' ' ? '\u00A0' : char}</span>`
              ).join('');
              gsap.from(el.querySelectorAll('span'), {
                opacity: 0,
                y: 50,
                rotationX: -90,
                stagger: 0.03,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger,
              });
              return; // Skip default animation

            default:
              fromVars.y = 60;
              toVars.y = 0;
          }

          const delay = customDelay !== null ? customDelay : i * currentPreset.stagger;

          tl.fromTo(
            el,
            { ...fromVars },
            {
              ...toVars,
              duration: duration || currentPreset.duration,
              delay,
              ease: currentPreset.ease,
            },
            0
          );
        });
      }

      // Animate elements with [data-parallax]
      const parallaxElements = section.querySelectorAll('[data-parallax]');
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const distance = parseFloat(el.dataset-distance) || 100;

        gsap.to(el, {
          y: distance * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, triggerStart, triggerEnd, pin, pinDuration, scrub, preset]);

  // Background variants with enhanced options
  const backgroundClasses = {
    light: 'bg-neutral-50',
    dark: 'bg-neutral-900 text-white',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
    image: backgroundImage ? 'bg-cover bg-center bg-no-repeat relative' : '',
    pattern: 'bg-pattern-dots',
  };

  return (
    <Section
      ref={sectionRef}
      data-section-index={index}
      className={`${backgroundClasses[background]} ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Overlay for image backgrounds */}
      {background === 'image' && backgroundImage && (
        <div className="absolute inset-0 bg-black/20" />
      )}

      <Container className="relative z-10">
        {children}
      </Container>
    </Section>
  );
}

/**
 * Enhanced ScrollyMedia Component
 *
 * Advanced media with parallax, reveal masks, and layered effects.
 */
export function ScrollyMedia({
  src,
  alt = '',
  type = 'image',
  parallaxAmount = 150,
  parallaxSpeed = 0.5,
  revealType = 'clip', // 'clip', 'fade', 'scale'
  className = '',
  caption,
}) {
  const mediaRef = useRef(null);
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = mediaRef.current;
    const container = containerRef.current;
    if (!media || !container || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax effect
      gsap.to(media, {
        y: parallaxAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: parallaxSpeed,
        },
      });

      // Reveal animation
      if (revealType === 'clip') {
        gsap.fromTo(
          media,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else if (revealType === 'scale') {
        gsap.fromTo(
          media,
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, mediaRef);

    return () => ctx.revert();
  }, [reducedMotion, parallaxAmount, parallaxSpeed, revealType]);

  const mediaElement = type === 'video' ? (
    <video
      ref={mediaRef}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  ) : (
    <img
      ref={mediaRef}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div className="w-full h-full" style={{ willChange: 'transform' }}>
        {mediaElement}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
          {caption}
        </figcaption>
      )}
    </div>
  );
}

/**
 * Enhanced ScrollyText Component
 *
 * Advanced text reveals with multiple animation styles.
 */
export function ScrollyText({
  children,
  as: Component = 'p',
  animation = 'fade-up',
  delay = 0,
  duration,
  className = '',
  split = 'none', // 'none', 'chars', 'words', 'lines'
}) {
  const textRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = textRef.current;
    if (!el || reducedMotion || split === 'none') return;

    const ctx = gsap.context(() => {
      if (split === 'chars') {
        const text = el.textContent;
        el.innerHTML = text
          .split('')
          .map((char, i) => `<span class="inline-block" style="display:inline-block">${char === ' ' ? '\u00A0' : char}</span>`)
          .join('');

        gsap.fromTo(
          el.querySelectorAll('span'),
          { opacity: 0, y: 50, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else if (split === 'words') {
        const words = el.textContent.split(' ');
        el.innerHTML = words
          .map((word, i) => `<span class="inline-block whitespace-nowrap mr-1">${word}</span>`)
          .join('');

        gsap.fromTo(
          el.querySelectorAll('span'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, [reducedMotion, split, delay]);

  return (
    <Component
      ref={textRef}
      data-animate={split === 'none' ? animation : undefined}
      data-delay={split === 'none' ? delay : undefined}
      data-duration={duration}
      className={className}
    >
      {children}
    </Component>
  );
}

export default ScrollySection;
