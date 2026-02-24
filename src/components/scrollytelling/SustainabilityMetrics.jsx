import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollySection } from './ScrollySection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LeafIcon, RecycleIcon, GlobeIcon, TruckIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedCounter Component
 * 
 * Counts up to a target value when scrolled into view.
 */
function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '', decimals = 0 }) {
  const counterRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to({ value: 0 }, {
        value,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
        },
        onUpdate: function() {
          setDisplayValue(this.targets()[0].value);
        },
      });
    }, counterRef);

    return () => ctx.revert();
  }, [value, duration, reducedMotion]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

/**
 * SustainabilityMetrics Component
 * 
 * Displays environmental impact metrics with animated counters.
 */
export function SustainabilityMetrics({
  title = 'Our Impact',
  subtitle = 'Sustainability at Every Step',
  description = 'We believe beauty shouldn\'t cost the earth. Our commitment to sustainable practices means every arrangement makes a positive difference.',
  metrics = [
    {
      value: 95,
      suffix: '%',
      label: 'Locally Sourced',
      description: 'Flowers from local growers',
      icon: LeafIcon,
    },
    {
      value: 100,
      suffix: '%',
      label: 'Foam-Free',
      description: 'No floral foam in arrangements',
      icon: RecycleIcon,
    },
    {
      value: 50,
      suffix: 'K',
      label: 'Plastic Saved',
      description: 'Packages delivered plastic-free',
      icon: GlobeIcon,
    },
    {
      value: 24,
      suffix: 'h',
      label: 'Carbon Neutral',
      description: 'Same-day delivery radius',
      icon: TruckIcon,
    },
  ],
  ctaText = 'Learn About Our Sustainability',
  onCtaClick,
  className = '',
}) {
  return (
    <ScrollySection
      background="dark"
      className={className}
      animationConfig={{
        triggerStart: 'top 70%',
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
        <span
          data-animate="fade"
          className="inline-block text-caption text-primary-300 font-medium tracking-wider uppercase mb-4"
        >
          {title}
        </span>
        <h2
          data-animate="slide-up"
          data-delay="0.1"
          className="text-display-md md:text-display-lg font-bold text-white mb-6"
        >
          {subtitle}
        </h2>
        <ScrollyText
          animation="fade"
          delay={0.2}
          className="text-body-lg text-neutral-300"
        >
          {description}
        </ScrollyText>
      </div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            data-animate="scale"
            data-delay={0.1 + index * 0.1}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300"
          >
            {/* Icon */}
            <div className="text-primary-300 mb-4 flex justify-center">
              <metric.icon className="w-12 h-12" />
            </div>

            {/* Counter */}
            <div className="text-display-sm md:text-display-md font-bold text-white mb-2">
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                decimals={metric.decimals}
              />
            </div>

            {/* Label */}
            <div className="text-heading-sm font-semibold text-white mb-2">
              {metric.label}
            </div>

            {/* Description */}
            <div className="text-body-sm text-neutral-400">
              {metric.description}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        data-animate="fade"
        data-delay="0.5"
        className="text-center mt-12"
      >
        <a
          href="#sustainability"
          className="inline-flex items-center text-primary-300 hover:text-primary-200 font-medium group"
          onClick={onCtaClick}
        >
          {ctaText}
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
        </a>
      </div>
    </ScrollySection>
  );
}

// Helper component for text within dark sections
function ScrollyText({ children, animation = 'fade', delay = 0, className = '' }) {
  return (
    <p
      data-animate={animation}
      data-delay={delay}
      className={className}
    >
      {children}
    </p>
  );
}

export default SustainabilityMetrics;
