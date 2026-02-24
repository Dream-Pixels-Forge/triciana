import React, { useRef, useEffect, useState } from 'react';
import { ScrollySection } from './ScrollySection';
import { StarIcon } from '../common/Icons';

/**
 * TestimonialCard Component
 *
 * Individual testimonial with staggered animation.
 */
function TestimonialCard({ testimonial, index, isVisible }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isVisible) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [isVisible, index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-100"
      style={{ willChange: 'transform, box-shadow' }}
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-6xl text-primary-200 font-serif leading-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        "
      </div>

      {/* Rating */}
      <div className="flex gap-1.5 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <StarIcon
            key={i}
            className="w-5 h-5 text-amber-400"
            filled
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-body-lg text-neutral-700 mb-8 leading-relaxed relative z-10">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 ring-4 ring-neutral-50 group-hover:ring-primary-100 transition-colors duration-500">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div>
          <div className="font-semibold text-neutral-900 text-body-md">
            {testimonial.author}
          </div>
          <div className="text-body-sm text-neutral-500">
            {testimonial.role}
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-accent-500/0 group-hover:from-primary-500/5 group-hover:to-accent-500/5 rounded-3xl transition-all duration-500 pointer-events-none" />
    </div>
  );
}

/**
 * Enhanced TestimonialsSection Component
 *
 * Award-winning testimonials with:
 * - Staggered card animations
 * - Hover effects with lift
 * - Star ratings with proper accessibility
 * - Quote styling with decorative elements
 */
export function TestimonialsSection({
  title = 'Testimonials',
  subtitle = 'What Our Customers Say',
  description = 'Don\'t just take our word for it. Here\'s what our customers have to say about their experiences with Triciana.',
  testimonials = [
    {
      id: 1,
      quote: "The most beautiful flowers I've ever received. The arrangement lasted over two weeks and smelled incredible!",
      author: 'Sarah M.',
      role: 'Wedding Client',
      rating: 5,
      image: '/images/hero/startFrame.png',
    },
    {
      id: 2,
      quote: "Triciana made our wedding absolutely magical. Every arrangement was more beautiful than we imagined.",
      author: 'Emily & James',
      role: 'Newlyweds',
      rating: 5,
      image: '/images/hero/endFrame.png',
    },
    {
      id: 3,
      quote: "Same-day delivery saved me on our anniversary. The bouquet was stunning and my wife was thrilled!",
      author: 'Michael R.',
      role: 'Regular Customer',
      rating: 5,
      image: '/images/hero/startFrame.png',
    },
    {
      id: 4,
      quote: "I love their commitment to sustainability. Beautiful flowers without the environmental guilt.",
      author: 'Lisa K.',
      role: 'Subscription Member',
      rating: 5,
      image: '/images/hero/endFrame.png',
    },
  ],
  className = '',
}) {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = React.useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onUpdate: (self) => {
          const progress = self.progress;
          const total = testimonials.length;
          const visible = Math.min(
            Math.ceil(progress * total * 1.3),
            total
          );
          setVisibleCards(visible);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials.length]);

  return (
    <ScrollySection
      ref={sectionRef}
      background="alternate"
      className={className}
      animationConfig={{
        triggerStart: 'top 70%',
        preset: 'elegant',
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
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
          className="text-body-lg text-neutral-600"
        >
          {description}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
            isVisible={index < visibleCards}
          />
        ))}
      </div>

      {/* Trust indicators */}
      <div
        data-animate="fade-up"
        data-delay="0.5"
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-6 text-neutral-500 text-body-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>500+ Happy Customers</span>
          </div>
        </div>
      </div>
    </ScrollySection>
  );
}

export default TestimonialsSection;
