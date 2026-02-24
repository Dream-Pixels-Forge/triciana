import React from 'react';
import { ScrollySection, ScrollyMedia, ScrollyText } from './ScrollySection';
import { Button } from '../common';

/**
 * BrandStory Section
 * 
 * First scrollytelling section introducing the brand story.
 * Features founder journey and artistic philosophy.
 */
export function BrandStory({
  title = 'Our Story',
  subtitle = 'From Seed to Bouquet',
  description = 'Every arrangement tells a story. Our journey began in a small garden, where we discovered the transformative power of flowers. Today, we continue that tradition, handcrafting each bouquet with intention, care, and deep respect for nature\'s beauty.',
  founderQuote = 'Flowers speak the language of emotion. We listen, then create.',
  founderName = 'Maria Santos, Founder & Lead Florist',
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
      }}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <span
            data-animate="fade"
            className="inline-block text-caption text-primary-500 font-medium tracking-wider uppercase mb-4"
          >
            {title}
          </span>

          {/* Heading */}
          <ScrollyText
            as="h2"
            animation="slide-up"
            delay={0.1}
            className="text-display-md md:text-display-lg font-bold text-neutral-900 mb-6"
          >
            {subtitle}
          </ScrollyText>

          {/* Description */}
          <ScrollyText
            animation="fade"
            delay={0.2}
            className="text-body-lg text-neutral-600 mb-8 leading-relaxed"
          >
            {description}
          </ScrollyText>

          {/* Quote */}
          <ScrollyText
            animation="slide-left"
            delay={0.3}
            className="border-l-4 border-primary-500 pl-6 mb-8"
          >
            <blockquote className="text-heading-md font-display italic text-neutral-800 mb-2">
              "{founderQuote}"
            </blockquote>
            <cite className="text-body-sm text-neutral-500 not-italic">
              {founderName}
            </cite>
          </ScrollyText>

          {/* CTA */}
          <ScrollyText animation="fade" delay={0.4}>
            <Button
              variant="primary"
              size="lg"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </ScrollyText>
        </div>

        {/* Visual */}
        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-soft-lg">
          <ScrollyMedia
            src="/images/hero/startFrame.png"
            alt="Artisan florist arranging flowers"
            type="image"
            parallaxAmount={50}
            className="w-full h-full"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </ScrollySection>
  );
}

export default BrandStory;
