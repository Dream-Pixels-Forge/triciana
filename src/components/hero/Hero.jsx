import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button, Container } from '../common';
import { HeroVideo } from './HeroVideo';
import { JpgSequencePlayer } from './JpgSequencePlayer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Hero Component
 * 
 * Main hero section with animated background (video or JPG sequence)
 * and typography reveal animations.
 * 
 * Features:
 * - Supports both video and JPG sequence animations
 * - GSAP typography reveals
 * - Accessible CTA buttons
 * - Reduced motion support
 * - Loading states
 */
export function Hero({
  // Content
  headline = 'Beautiful Flowers for Life\'s Moments',
  subheadline = 'Handcrafted arrangements for weddings, special occasions, and everyday beauty. Locally sourced, sustainably grown, delivered with care.',
  ctaPrimary = 'Explore Collections',
  ctaSecondary = 'Book Consultation',
  
  // Media - Video
  videoSrc = '/videos/a5d0a42e-17c8-40c3-94b1-5d65e07ad80a.mp4',
  videoWebmSrc = '',
  posterSrc = '/images/hero/startFrame.png',
  
  // Media - JPG Sequence
  useJpgSequence = false,
  jpgFrames = [],
  jpgFps = 30,
  
  // Callbacks
  onPrimaryClick,
  onSecondaryClick,
  
  className = '',
}) {
  const reducedMotion = useReducedMotion();
  
  // Refs
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaContainerRef = useRef(null);
  const badgeRef = useRef(null);
  
  // State
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Run entrance animations
  useEffect(() => {
    if (!isMediaLoaded || hasAnimated || reducedMotion) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
          duration: 1.2,
        },
      });
      
      // Badge fade in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
      
      // Headline reveal
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.4'
      );
      
      // Subheadline fade in
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
      
      // CTA buttons slide up
      tl.fromTo(
        ctaContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }, containerRef);
    
    setHasAnimated(true);
    
    return () => ctx.revert();
  }, [isMediaLoaded, hasAnimated, reducedMotion]);
  
  // Handle media loaded
  const handleMediaLoaded = () => {
    setIsMediaLoaded(true);
  };
  
  // Generate frames from folder if using JPG sequence
  const getJpgFrames = () => {
    if (jpgFrames.length > 0) {
      return jpgFrames;
    }
    
    // Generate frame URLs assuming sequential naming
    // Adjust pattern based on your file naming
    const frames = [];
    const frameCount = 60; // Default assumption - update based on your sequence
    const padding = 3; // e.g., 001, 002, 003
    
    for (let i = 1; i <= frameCount; i++) {
      const frameNumber = String(i).padStart(padding, '0');
      frames.push(`/images/hero/sequence/frame_${frameNumber}.jpg`);
    }
    
    return frames;
  };
  
  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden ${className}`}
      aria-label="Hero section"
    >
      {/* Background Animation Layer */}
      <div className="absolute inset-0 z-0">
        {useJpgSequence ? (
          <JpgSequencePlayer
            frames={getJpgFrames()}
            fps={jpgFps}
            autoplay={!reducedMotion}
            loop={true}
            poster={posterSrc}
            onLoaded={handleMediaLoaded}
            className="bg-neutral-100"
          />
        ) : (
          <HeroVideo
            src={videoSrc}
            webmSrc={videoWebmSrc}
            poster={posterSrc}
            autoplay={!reducedMotion}
            loop={true}
            muted={true}
            onLoaded={handleMediaLoaded}
            className="bg-neutral-100"
          />
        )}
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/20" aria-hidden="true" />
      </div>
      
      {/* Content Layer */}
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span
            ref={badgeRef}
            className="inline-block text-caption text-white/90 font-medium tracking-wider uppercase mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            Artisan Florist
          </span>
          
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-display-lg md:text-display-xl lg:text-[5rem] font-bold text-white mb-6 leading-tight"
          >
            {headline.split(' ').map((word, index) => {
              const isGradient = word === 'Life\'s' || word === 'Moments';
              return (
                <span
                  key={index}
                  className={isGradient ? 'text-gradient' : ''}
                >
                  {word}{' '}
                </span>
              );
            })}
          </h1>
          
          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-body-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {subheadline}
          </p>
          
          {/* CTA Buttons */}
          <div
            ref={ctaContainerRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onPrimaryClick}
              className="min-w-[200px] bg-white text-primary-700 hover:bg-primary-50"
            >
              {ctaPrimary}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onSecondaryClick}
              className="min-w-[200px] border-white text-white hover:bg-white/10"
            >
              {ctaSecondary}
            </Button>
          </div>
          
          {/* Scroll indicator */}
          {!reducedMotion && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <svg
                className="w-6 h-6 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <span className="sr-only">Scroll down</span>
            </div>
          )}
        </div>
      </Container>
      
      {/* Loading overlay */}
      {!isMediaLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-body-sm text-white/80">Loading experience...</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
