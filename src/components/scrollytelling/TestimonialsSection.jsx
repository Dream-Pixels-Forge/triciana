import React from 'react';
import { ScrollySection } from './ScrollySection';

/**
 * TestimonialsSection Component
 * 
 * Customer testimonials with fade-in cards.
 */
export function TestimonialsSection({
  title = 'Testimonials',
  subtitle = 'What Our Customers Say',
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
      quote: "Dream Blooms made our wedding absolutely magical. Every arrangement was more beautiful than we imagined.",
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
  return (
    <ScrollySection
      background="alternate"
      className={className}
      animationConfig={{
        triggerStart: 'top 70%',
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
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

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            data-animate="fade"
            data-delay={0.1 + index * 0.1}
            className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-body-lg text-neutral-700 mb-6 leading-relaxed">
              "{testimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div>
                <div className="font-semibold text-neutral-900">
                  {testimonial.author}
                </div>
                <div className="text-body-sm text-neutral-500">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollySection>
  );
}

export default TestimonialsSection;
