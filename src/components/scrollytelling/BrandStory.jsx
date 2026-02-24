import React, { useRef, useEffect } from 'react';
import { ScrollySection, ScrollyMedia } from './ScrollySection';
import { Button } from '../common';
import { ArrowRightIcon } from '../common/Icons';

/**
 * Enhanced BrandStory Section
 *
 * Award-winning brand story with:
 * - Split-screen layout with parallax
 * - Animated quote highlight
 * - Founder signature animation
 * - Image reveal with mask effect
 */
export function BrandStory({
  title = 'Our Story',
  subtitle = 'From Seed to Bouquet',
  description = 'Every arrangement tells a story. Our journey began in a small garden, where we discovered the transformative power of flowers. Today, we continue that tradition, handcrafting each bouquet with intention, care, and deep respect for nature\'s beauty.',
  founderQuote = 'Flowers speak the language of emotion. We listen, then create.',
  founderName = 'Maria Santos',
  founderTitle = 'Founder & Lead Florist',
  founderImage = '/images/hero/startFrame.png',
  ctaText = 'Learn More About Us',
  onCtaClick,
  backgroundImage,
  className = '',
}) {
  return (
    <ScrollySection
      background={backgroundImage ? 'image' : 'light'}
      backgroundImage={backgroundImage}
      className={className}
      animationConfig={{
        triggerStart: 'top 70%',
        preset: 'elegant',
      }}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <span
            data-animate="fade-up"
            className="inline-block text-caption text-primary-500 font-medium tracking-wider uppercase mb-4"
          >
            {title}
          </span>

          {/* Heading */}
          <h2
            data-animate="fade-up"
            data-delay="0.1"
            className="text-display-md lg:text-display-lg font-bold text-neutral-900 mb-6 leading-tight"
          >
            {subtitle}
          </h2>

          {/* Description */}
          <p
            data-animate="fade-up"
            data-delay="0.2"
            className="text-body-lg text-neutral-600 mb-8 leading-relaxed"
          >
            {description}
          </p>

          {/* Quote Block */}
          <div
            data-animate="slide-left"
            data-delay="0.3"
            className="relative border-l-4 border-primary-500 pl-6 lg:pl-8 mb-8 py-2"
          >
            <blockquote className="text-heading-lg lg:text-display-sm font-display italic text-neutral-800 mb-3 leading-relaxed">
              "{founderQuote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-primary-500 to-transparent" />
              <cite className="text-body-sm text-neutral-600 not-italic">
                <span className="font-semibold text-neutral-900">{founderName}</span>
                <br />
                <span className="text-neutral-500">{founderTitle}</span>
              </cite>
            </div>
          </div>

          {/* CTA */}
          <div data-animate="fade-up" data-delay="0.4">
            <Button
              variant="primary"
              size="lg"
              onClick={onCtaClick}
              className="group"
            >
              {ctaText}
              <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Visual */}
        <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <ScrollyMedia
            src={founderImage}
            alt={`${founderName} arranging flowers`}
            type="image"
            parallaxAmount={80}
            parallaxSpeed={0.3}
            revealType="clip"
            className="w-full h-full"
            caption="Crafting beauty with intention and care"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl" />
        </div>
      </div>
    </ScrollySection>
  );
}

export default BrandStory;
