import React from 'react';
import { ScrollySection, ScrollyMedia } from './ScrollySection';

/**
 * ProcessSection Component
 * 
 * Shows the journey from seed to bouquet with parallax imagery.
 * Visual timeline of the creation process.
 */
export function ProcessSection({
  title = 'Our Process',
  subtitle = 'From Garden to Your Home',
  steps = [
    {
      number: '01',
      title: 'Sourcing',
      description: 'We partner with local growers who share our commitment to sustainable, eco-friendly farming practices.',
      image: '/images/hero/startFrame.png',
    },
    {
      number: '02',
      title: 'Selection',
      description: 'Each stem is hand-selected at peak freshness, ensuring only the finest flowers make it to our studio.',
      image: '/images/hero/endFrame.png',
    },
    {
      number: '03',
      title: 'Design',
      description: 'Our artisans craft each arrangement with intention, balancing color, texture, and form.',
      image: '/images/hero/startFrame.png',
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'Carefully packaged and delivered with same-day service, arriving fresh and ready to bloom.',
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
        triggerStart: 'top 60%',
      }}
    >
      {/* Header */}
      <div className="text-center mb-16 lg:mb-24">
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

      {/* Process Steps */}
      <div className="relative">
        {/* Connection Line (desktop) */}
        <div className="hidden lg:absolute lg:top-1/2 lg:left-0 lg:right-0 lg:h-0.5 lg:bg-gradient-to-r lg:from-primary-200 lg:via-primary-400 lg:to-primary-200" />

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              data-animate="fade"
              data-delay={0.2 + index * 0.15}
              className="relative group"
            >
              {/* Step Card */}
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ScrollyMedia
                    src={step.image}
                    alt={`${step.title} process step`}
                    type="image"
                    parallaxAmount={30}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                    <span className="text-heading-sm font-bold text-primary-500">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-heading-md font-semibold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow (desktop, between steps) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-primary-300 rotate-45" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollySection>
  );
}

export default ProcessSection;
