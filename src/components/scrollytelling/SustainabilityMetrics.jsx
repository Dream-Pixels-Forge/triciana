import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollySection } from './ScrollySection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LeafIcon, RecycleIcon, GlobeIcon, TruckIcon, ArrowRightIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedCounter Component
 *
 * Smoothly counts up to target value with easing.
 */
function AnimatedCounter({ value, duration = 2.5, prefix = '', suffix = '', decimals = 0 }) {
  const counterRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter || hasAnimated.current) return;

    if (reducedMotion) {
      setDisplayValue(value);
      hasAnimated.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { value: 0 };

      gsap.to(obj, {
        value,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          once: true, // Only animate once
          onUpdate: function() {
            setDisplayValue(obj.value);
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        },
      });
    }, counterRef);

    return () => ctx.revert();
  }, [value, duration, reducedMotion]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return (
    <span ref={counterRef} className="tabular-nums font-mono">
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

/**
 * MetricCard Component
 *
 * Individual metric display with icon and animation.
 */
function MetricCard({ metric, index, isVisible }) {
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || reducedMotion || !isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
      });

      // Card slide up
      tl.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Icon bounce
      tl.fromTo(
        card.querySelector('.metric-icon'),
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      );

      // Counter fade in
      tl.fromTo(
        card.querySelector('.metric-counter'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion, isVisible]);

  const IconComponent = metric.icon || LeafIcon;

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-10 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/10 border border-white/10"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:via-transparent group-hover:to-accent-500/10 rounded-3xl transition-all duration-500" />

      {/* Icon */}
      <div className="metric-icon relative z-10 mb-6 flex justify-center">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          <IconComponent className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
        </div>
      </div>

      {/* Counter */}
      <div className="metric-counter relative z-10 mb-3">
        <div className="text-5xl lg:text-6xl font-bold text-white tracking-tight">
          <AnimatedCounter
            value={metric.value}
            suffix={metric.suffix}
            prefix={metric.prefix}
            decimals={metric.decimals}
            duration={2}
          />
        </div>
      </div>

      {/* Label */}
      <div className="relative z-10 mb-2">
        <h3 className="text-xl lg:text-2xl font-bold text-white">
          {metric.label}
        </h3>
      </div>

      {/* Description */}
      <div className="relative z-10">
        <p className="text-body-sm text-neutral-300">
          {metric.description}
        </p>
      </div>

      {/* Decorative ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
    </div>
  );
}

/**
 * Enhanced SustainabilityMetrics Component
 *
 * Award-winning metrics display with:
 * - Animated counters with smooth easing
 * - Icon animations with rotation and scale
 * - Glassmorphism card design
 * - Hover effects with glow
 * - Staggered entrance animations
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
  showCta = true,
  className = '',
}) {
  const sectionRef = useRef(null);
  const [visibleMetrics, setVisibleMetrics] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onUpdate: (self) => {
          // Show metrics progressively
          const progress = self.progress;
          const totalMetrics = metrics.length;
          const visible = Math.min(
            Math.ceil(progress * totalMetrics * 1.5),
            totalMetrics
          );
          setVisibleMetrics(visible);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [metrics.length]);

  return (
    <ScrollySection
      ref={sectionRef}
      background="dark"
      className={className}
      animationConfig={{
        triggerStart: 'top 70%',
        preset: 'elegant',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 lg:mb-24">
        <span
          data-animate="fade-up"
          className="inline-block text-caption text-primary-300 font-medium tracking-wider uppercase mb-4"
        >
          {title}
        </span>
        <h2
          data-animate="fade-up"
          data-delay="0.1"
          className="text-display-md lg:text-display-lg font-bold text-white mb-6"
        >
          {subtitle}
        </h2>
        <p
          data-animate="fade-up"
          data-delay="0.2"
          className="text-body-lg text-neutral-300 leading-relaxed"
        >
          {description}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            metric={metric}
            index={index}
            isVisible={index < visibleMetrics}
          />
        ))}
      </div>

      {/* CTA */}
      {showCta && (
        <div
          data-animate="fade-up"
          data-delay="0.5"
          className="relative z-10 text-center mt-12 lg:mt-16"
        >
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center text-primary-300 hover:text-primary-200 font-semibold text-body-lg transition-colors duration-300"
          >
            {ctaText}
            <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl -z-10" />
    </ScrollySection>
  );
}

export default SustainabilityMetrics;
