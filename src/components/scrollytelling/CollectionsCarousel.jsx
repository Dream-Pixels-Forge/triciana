import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollySection } from './ScrollySection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from '../common';

gsap.registerPlugin(ScrollTrigger);

/**
 * CollectionsCarousel Component
 * 
 * Horizontal scroll section featuring product collections.
 */
export function CollectionsCarousel({
  title = 'Collections',
  subtitle = 'Curated for Every Occasion',
  collections = [
    {
      id: 1,
      name: 'Weddings',
      description: 'Elegant arrangements for your special day',
      image: '/images/hero/startFrame.png',
      color: 'from-pink-400 to-rose-400',
    },
    {
      id: 2,
      name: 'Special Occasions',
      description: 'Celebrate life\'s memorable moments',
      image: '/images/hero/endFrame.png',
      color: 'from-purple-400 to-pink-400',
    },
    {
      id: 3,
      name: 'Everyday Beauty',
      description: 'Fresh flowers for your home',
      image: '/images/hero/startFrame.png',
      color: 'from-green-400 to-emerald-400',
    },
    {
      id: 4,
      name: 'Sympathy',
      description: 'Thoughtful expressions of care',
      image: '/images/hero/endFrame.png',
      color: 'from-blue-400 to-indigo-400',
    },
    {
      id: 5,
      name: 'Corporate',
      description: 'Professional arrangements for offices',
      image: '/images/hero/startFrame.png',
      color: 'from-amber-400 to-orange-400',
    },
    {
      id: 6,
      name: 'Subscriptions',
      description: 'Regular deliveries of seasonal blooms',
      image: '/images/hero/endFrame.png',
      color: 'from-rose-400 to-pink-400',
    },
  ],
  ctaText = 'View All Collections',
  onCtaClick,
  className = '',
}) {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Horizontal scroll on vertical scroll
  useEffect(() => {
    if (reducedMotion || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <ScrollySection
      background="light"
      className={className}
      animationConfig={{
        triggerStart: 'top top',
        pin: true,
      }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <span
          data-animate="fade"
          className="inline-block text-caption text-primary-500 font-medium tracking-wider uppercase mb-4"
        >
          {title}
        </span>
        <h2
          data-animate="slide-up"
          data-delay="0.1"
          className="text-display-md md:text-display-lg font-bold text-neutral-900"
        >
          {subtitle}
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8"
          style={{ width: `${collections.length * (100 / 2)}%` }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              data-animate="scale"
              data-delay={0.1 + index * 0.1}
              className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]"
            >
              {/* Collection Card */}
              <div className="group relative h-[500px] rounded-3xl overflow-hidden shadow-soft-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  <h3 className="text-display-sm md:text-display-md font-bold text-white mb-3">
                    {collection.name}
                  </h3>
                  <p className="text-body-lg text-white/90 mb-6">
                    {collection.description}
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-neutral-900 hover:bg-neutral-100 self-start"
                  >
                    Explore
                  </Button>
                </div>

                {/* Collection Number */}
                <div className="absolute top-6 right-6 text-8xl font-bold text-white/10">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      {!reducedMotion && (
        <div
          data-animate="fade"
          data-delay="0.5"
          className="flex items-center justify-center gap-2 mt-8 text-neutral-500"
        >
          <svg
            className="w-5 h-5 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <span className="text-body-sm">Scroll to explore</span>
        </div>
      )}

      {/* CTA */}
      <div
        data-animate="fade"
        data-delay="0.6"
        className="text-center mt-12"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </div>
    </ScrollySection>
  );
}

export default CollectionsCarousel;
