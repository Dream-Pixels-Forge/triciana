import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollySection } from './ScrollySection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from '../common';
import { ArrowRightIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced CollectionsCarousel Component
 *
 * Award-winning horizontal scroll gallery with:
 * - Smooth pinned horizontal scrolling
 * - Card scale and opacity transitions
 * - Progress indicator showing position
 * - Parallax image effects within cards
 * - Touch-friendly swipe support
 * - Keyboard navigation
 */
export function CollectionsCarousel({
  title = 'Collections',
  subtitle = 'Curated for Every Occasion',
  collections = [
    {
      id: 1,
      name: 'Weddings',
      description: 'Elegant arrangements for your special day',
      longDescription: 'From intimate ceremonies to grand celebrations, our wedding collections capture the essence of your love story with bespoke floral designs.',
      image: '/images/hero/startFrame.png',
      gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
      accentColor: '#E11D48',
      features: ['Bridal Bouquets', 'Centerpieces', 'Ceremony Arches', 'Corsages'],
    },
    {
      id: 2,
      name: 'Special Occasions',
      description: 'Celebrate life\'s memorable moments',
      longDescription: 'Birthdays, anniversaries, graduations - mark every milestone with stunning arrangements that express your deepest emotions.',
      image: '/images/hero/endFrame.png',
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      accentColor: '#A855F7',
      features: ['Birthday Bouquets', 'Anniversary Arrangements', 'Graduation Flowers', 'Custom Designs'],
    },
    {
      id: 3,
      name: 'Everyday Beauty',
      description: 'Fresh flowers for your home',
      longDescription: 'Bring joy into your daily life with our curated selection of seasonal blooms, delivered fresh to your doorstep.',
      image: '/images/hero/startFrame.png',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      accentColor: '#10B981',
      features: ['Weekly Subscriptions', 'Seasonal Mixes', 'Dried Arrangements', 'Plant Care'],
    },
    {
      id: 4,
      name: 'Sympathy',
      description: 'Thoughtful expressions of care',
      longDescription: 'During difficult times, let flowers convey your condolences and support with compassionate, tasteful arrangements.',
      image: '/images/hero/endFrame.png',
      gradient: 'from-slate-400 via-blue-500 to-indigo-600',
      accentColor: '#64748B',
      features: ['Sympathy Wreaths', 'Memorial Arrangements', 'Funeral Sprays', 'Plant Gifts'],
    },
    {
      id: 5,
      name: 'Corporate',
      description: 'Professional arrangements for offices',
      longDescription: 'Elevate your workspace with sophisticated floral designs that impress clients and inspire your team.',
      image: '/images/hero/startFrame.png',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      accentColor: '#F59E0B',
      features: ['Office Arrangements', 'Event Styling', 'Monthly Service', 'Branded Designs'],
    },
    {
      id: 6,
      name: 'Subscriptions',
      description: 'Regular deliveries of seasonal blooms',
      longDescription: 'Never be without fresh flowers. Our subscription service ensures beauty arrives at your door like clockwork.',
      image: '/images/hero/endFrame.png',
      gradient: 'from-pink-400 via-rose-500 to-red-600',
      accentColor: '#EC4899',
      features: ['Weekly Delivery', 'Bi-Weekly Options', 'Monthly Bouquets', 'Flexible Plans'],
    },
  ],
  ctaText = 'View All Collections',
  onCtaClick,
  className = '',
}) {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const reducedMotion = useReducedMotion();
  const [currentCard, setCurrentCard] = useState(0);
  const [totalScroll, setTotalScroll] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Horizontal scroll on vertical scroll with enhanced effects
  useEffect(() => {
    if (reducedMotion || !trackRef.current || !carouselRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const carousel = carouselRef.current;
      
      // Calculate total scroll distance
      const scrollWidth = track.scrollWidth - window.innerWidth + 48; // Account for padding
      setTotalScroll(scrollWidth);

      // Create pinned horizontal scroll
      const tween = gsap.to(track, {
        x: () => -scrollWidth,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: carousel,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        pinSpacing: false,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Calculate current card
          const cardCount = collections.length;
          const cardWidth = 1 / cardCount;
          const current = Math.min(
            Math.floor(progress * cardCount + 0.5),
            cardCount - 1
          );
          setCurrentCard(current);

          // Animate cards based on position
          cardsRef.current.forEach((card, index) => {
            if (!card) return;
            
            const cardProgress = (progress - index * cardWidth) * cardCount;
            const isActive = index === current;
            const isInView = cardProgress > -0.3 && cardProgress < 1.3;

            if (isInView) {
              // Scale effect
              const scale = isActive ? 1 : Math.max(0.85, 1 - Math.abs(cardProgress - 0.5) * 0.3);
              // Opacity effect
              const opacity = isActive ? 1 : Math.max(0.4, 1 - Math.abs(cardProgress - 0.5) * 1.2);
              // Rotation effect
              const rotation = isActive ? 0 : (cardProgress - 0.5) * 5;

              gsap.to(card, {
                scale,
                opacity,
                rotationY: rotation,
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });
        },
      });

      // Add smooth touch scrolling for mobile
      if ('ontouchstart' in window) {
        let startX;
        let currentX;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
        });

        carousel.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          currentX = e.touches[0].clientX;
          const diff = startX - currentX;
          tween.progress(tween.progress() + diff / scrollWidth);
          startX = currentX;
        });

        carousel.addEventListener('touchend', () => {
          isDragging = false;
        });
      }
    }, carouselRef);

    return () => ctx.revert();
  }, [reducedMotion, collections.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextCard = Math.min(currentCard + 1, collections.length - 1);
        scrollToCard(nextCard);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevCard = Math.max(currentCard - 1, 0);
        scrollToCard(prevCard);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, collections.length]);

  const scrollToCard = (index) => {
    const cardProgress = index / collections.length;
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === carouselRef.current) {
        trigger.progress(cardProgress);
      }
    });
  };

  return (
    <ScrollySection
      background="light"
      className={className}
      animationConfig={{
        triggerStart: 'top top',
        pin: false,
      }}
    >
      {/* Header */}
      <div className="text-center mb-12 lg:mb-20">
        <span
          data-animate="fade-up"
          className="inline-block text-caption text-primary-500 font-medium tracking-wider uppercase mb-4"
        >
          {title}
        </span>
        <h2
          data-animate="fade-up"
          data-delay="0.1"
          className="text-display-md lg:text-display-lg font-bold text-neutral-900 mb-4"
        >
          {subtitle}
        </h2>
        <p
          data-animate="fade-up"
          data-delay="0.2"
          className="text-body-lg text-neutral-600 max-w-2xl mx-auto"
        >
          Discover our curated collections, each designed to bring beauty and emotion to life's most meaningful moments.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={carouselRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 lg:gap-6 pl-6 lg:pl-12"
          style={{ width: 'max-content' }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              ref={(el) => (cardsRef.current[index] = el)}
              data-animate="scale"
              data-delay={0.1 + index * 0.1}
              className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] mr-6 lg:mr-12"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Collection Card */}
              <div className="group relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-500">
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
                  {/* Collection Number Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                      <span className="text-2xl lg:text-3xl font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                    <h3 className="text-display-sm lg:text-display-md font-bold text-white mb-3 drop-shadow-lg">
                      {collection.name}
                    </h3>
                    <p className="text-body-lg text-white/90 mb-4 drop-shadow">
                      {collection.description}
                    </p>
                    <p className="text-body-sm text-white/70 mb-6 line-clamp-2">
                      {collection.longDescription}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {collection.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-white text-neutral-900 hover:bg-neutral-100 group/btn"
                    >
                      Explore Collection
                      <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      {!reducedMotion && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="text-body-sm text-neutral-500">
            {currentCard + 1} of {collections.length}
          </span>
          <div className="w-32 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${((currentCard + 1) / collections.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => scrollToCard(Math.max(0, currentCard - 1))}
              disabled={currentCard === 0}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous collection"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollToCard(Math.min(collections.length - 1, currentCard + 1))}
              disabled={currentCard === collections.length - 1}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next collection"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Scroll Hint */}
      {!reducedMotion && scrollProgress < 0.1 && (
        <div
          data-animate="fade-up"
          data-delay="0.5"
          className="flex items-center justify-center gap-3 mt-6 text-neutral-500"
        >
          <span className="text-body-sm">Scroll to explore</span>
          <svg
            className="w-5 h-5 animate-bounce"
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
        </div>
      )}

      {/* CTA */}
      <div
        data-animate="fade-up"
        data-delay="0.6"
        className="text-center mt-12 lg:mt-16"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onCtaClick}
          className="shadow-lg hover:shadow-xl"
        >
          {ctaText}
        </Button>
      </div>
    </ScrollySection>
  );
}

export default CollectionsCarousel;
