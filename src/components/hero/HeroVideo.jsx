import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * HeroVideo Component
 * 
 * Responsive video background with autoplay, loop, and fallback support.
 * Includes loading states and performance optimizations.
 * 
 * @param {string} src - Video source URL (MP4)
 * @param {string} webmSrc - WebM video source for better compression
 * @param {string} poster - Poster image URL (fallback/loading)
 * @param {boolean} autoplay - Auto-play video (default: true)
 * @param {boolean} loop - Loop video (default: true)
 * @param {boolean} muted - Mute video (required for autoplay, default: true)
 * @param {string} className - Additional CSS classes
 * @param {function} onLoaded - Callback when video is loaded
 * @param {function} onPlay - Callback when video starts playing
 * @param {function} onError - Callback on video error
 */
export function HeroVideo({
  src,
  webmSrc,
  poster,
  autoplay = true,
  loop = true,
  muted = true,
  className = '',
  onLoaded,
  onPlay,
  onError,
  ...props
}) {
  const videoRef = useRef(null);
  const reducedMotion = useReducedMotion();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  // Handle video load
  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    onLoaded?.();
  }, [onLoaded]);
  
  // Handle play start
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    onPlay?.();
  }, [onPlay]);
  
  // Handle error
  const handleError = useCallback((e) => {
    console.error('Video loading error:', e);
    setHasError(true);
    onError?.(e);
  }, [onError]);
  
  // Handle progress
  const handleProgress = useCallback(() => {
    const video = videoRef.current;
    if (video && video.buffered.length > 0) {
      const buffered = video.buffered.end(video.buffered.length - 1);
      const duration = video.duration;
      if (duration > 0) {
        setLoadProgress(Math.min(100, (buffered / duration) * 100));
      }
    }
  }, []);
  
  // Setup video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;
    let playPromise = null;

    // Force mute and inline playback for autoplay compatibility
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    // Ensure video is ready to play
    video.load();

    // Attempt autoplay with proper cleanup
    const attemptPlay = async () => {
      if (!isMounted) return;
      
      try {
        playPromise = video.play();
        if (playPromise) {
          await playPromise;
          // Only log in development if needed
          // console.log('Video autoplay successful');
        }
      } catch (err) {
        // Browser blocked autoplay - this is expected behavior
        // Try again on user interaction
        if (!isMounted) return;
        
        const handleUserInteraction = async () => {
          if (!isMounted) return;
          try {
            await video.play();
          } catch (e) {
            // Ignore subsequent play errors
          }
        };

        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });
        document.addEventListener('scroll', handleUserInteraction, { once: true });
      }
    };

    if (autoplay && !reducedMotion) {
      attemptPlay();
    }

    return () => {
      isMounted = false;
      if (playPromise && typeof playPromise.cancel === 'function') {
        playPromise.cancel();
      }
      if (video && !reducedMotion) {
        video.pause();
      }
    };
  }, [autoplay, reducedMotion]);
  
  // Respect reduced motion preference
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    if (reducedMotion) {
      video.pause();
      setIsPlaying(false);
      // Seek to start for static poster-like effect
      video.currentTime = 0;
    } else if (autoplay) {
      video.play().catch(() => {
        // Ignore play errors - browser will handle
      });
    }
  }, [reducedMotion, autoplay, isLoaded]);
  
  // Controls
  const play = useCallback(() => {
    const video = videoRef.current;
    if (video && !reducedMotion) {
      video.play();
    }
  }, [reducedMotion]);
  
  const pause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  }, []);
  
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);
  
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      {...props}
    >
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-body-sm text-neutral-600">Loading video... {Math.round(loadProgress)}%</p>
          </div>
        </div>
      )}
      
      {/* Error state - show poster */}
      {hasError && poster && (
        <div className="absolute inset-0">
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay={autoplay && !reducedMotion}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={handleLoadedData}
        onPlay={handlePlay}
        onError={handleError}
        onProgress={handleProgress}
        aria-hidden="true"
      >
        {webmSrc && (
          <source src={webmSrc} type="video/webm" />
        )}
        {src && (
          <source src={src} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
      
      {/* Poster image as fallback */}
      {poster && (
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded && isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      )}
      
      {/* Reduced motion notice */}
      {reducedMotion && (
        <p className="sr-only">
          Video paused due to reduced motion preference. Showing poster image.
        </p>
      )}
    </div>
  );
}

export default HeroVideo;
