import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollySection } from './ScrollySection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from '../common';
import { ArrowRightIcon } from '../common/Icons';
import { getRandomImages, PRODUCT_IMAGES } from '../../utils/images';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced CollectionsCarousel Component
 *
 * Horizontal scroll gallery with:
 * - Smooth card transitions
 * - Progress indicator
 * - Touch-friendly swipe support
 * - Keyboard navigation
 * - No pinning - regular scroll flow
 */
export function CollectionsCarousel({
  title = 'Collections',
  subtitle = 'Curated for Every Occasion',
  collections,
  ctaText = 'View All Collections',
  onCtaClick,
  className = '',
}) {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [currentCard, setCurrentCard] = useState(0);

  // Use default collections if not provided
  const defaultCollections = [
    {
      id: 1,
      name: 'Weddings',
      description: 'Elegant arrangements for your special day',
      longDescription: 'From intimate ceremonies to grand celebrations, our wedding collections capture the essence of your love story with bespoke floral designs.',
      image: PRODUCT_IMAGES[0],
      gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
      accentColor: '#E11D48',
      features: ['Bridal Bouquets', 'Centerpieces', 'Ceremony Arches', 'Corsages'],
    },
    {
      id: 2,
      name: 'Special Occasions',
      description: 'Celebrate life\'s memorable moments',
      longDescription: 'Birthdays, anniversaries, graduations - mark every milestone with stunning arrangements that express your deepest emotions.',
      image: PRODUCT_IMAGES[1],
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      accentColor: '#A855F7',
      features: ['Birthday Bouquets', 'Anniversary Arrangements', 'Graduation Flowers', 'Custom Designs'],
    },
    {
      id: 3,
      name: 'Everyday Beauty',
      description: 'Fresh flowers for your home',
      longDescription: 'Bring joy into your daily life with our curated selection of seasonal blooms, delivered fresh to your doorstep.',
      image: PRODUCT_IMAGES[2],
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      accentColor: '#10B981',
      features: ['Weekly Subscriptions', 'Seasonal Mixes', 'Dried Arrangements', 'Plant Care'],
    },
    {
      id: 4,
      name: 'Sympathy',
      description: 'Thoughtful expressions of care',
      longDescription: 'During difficult times, let flowers convey your condolences and support with compassionate, tasteful arrangements.',
      image: PRODUCT_IMAGES[3],
      gradient: 'from-slate-400 via-blue-500 to-indigo-600',
      accentColor: '#64748B',
      features: ['Sympathy Wreaths', 'Memorial Arrangements', 'Funeral Sprays', 'Plant Gifts'],
    },
    {
      id: 5,
      name: 'Corporate',
      description: 'Professional arrangements for offices',
      longDescription: 'Elevate your workspace with sophisticated floral designs that impress clients and inspire your team.',
      image: PRODUCT_IMAGES[4],
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      accentColor: '#F59E0B',
      features: ['Office Arrangements', 'Event Styling', 'Monthly Service', 'Branded Designs'],
    },
    {
      id: 6,
      name: 'Subscriptions',
      description: 'Regular deliveries of seasonal blooms',
      longDescription: 'Never be without fresh flowers. Our subscription service ensures beauty arrives at your door like clockwork.',
      image: PRODUCT_IMAGES[5],
      gradient: 'from-pink-400 via-rose-500 to-red-600',
      accentColor: '#EC4899',
      features: ['Weekly Delivery', 'Bi-Weekly Options', 'Monthly Bouquets', 'Flexible Plans'],
    },
  ];

  const displayCollections = collections || defaultCollections;

  // Animate cards on scroll
  useEffect(() => {
    if (reducedMotion || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const cards = trackRef.current.children;
      
      gsap.utils.toArray(cards).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Scroll to card
  const scrollToCard = (index) => {
    if (!trackRef.current || !trackRef.current.children[index]) return;
    
    const card = trackRef.current.children[index];
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setCurrentCard(index);
  };

  // Handle scroll to update current card
  useEffect(() => {
    if (reducedMotion || !carouselRef.current) return;

    const handleScroll = () => {
      const container = carouselRef.current;
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('[data-card-index]')?.offsetWidth || 0;
      const newIndex = Math.round(scrollLeft / (cardWidth + 24)); // 24px is gap
      setCurrentCard(Math.min(Math.max(newIndex, 0), displayCollections.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [reducedMotion, displayCollections.length]);

  return (
    <ScrollySection
      background="light"
      className={className}
      animationConfig={{
        triggerStart: 'top 80%',
        preset: 'elegant',
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
      <div
        ref={carouselRef}
        className="relative overflow-x-auto overflow-y-hidden pb-8 -mx-4 px-4 lg:-mx-8 lg:px-8"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{ width: 'max-content' }}
        >
          {displayCollections.map((collection, index) => (
            <div
              key={collection.id}
              data-card-index={index}
              className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] snap-center"
              style={{ scrollSnapAlign: 'center' }}
            >
              {/* Collection Card */}
              <div className="group relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
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
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => scrollToCard(Math.max(0, currentCard - 1))}
            disabled={currentCard === 0}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous collection"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {displayCollections.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentCard
                    ? 'w-8 bg-primary-500'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to ${displayCollections[index].name}`}
                aria-current={index === currentCard ? 'step' : undefined}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(Math.min(displayCollections.length - 1, currentCard + 1))}
            disabled={currentCard === displayCollections.length - 1}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next collection"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* CTA */}
      <div
        data-animate="fade-up"
        data-delay="0.3"
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
