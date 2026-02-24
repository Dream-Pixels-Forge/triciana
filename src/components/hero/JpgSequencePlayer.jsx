import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * JpgSequencePlayer Component
 * 
 * Renders a sequence of JPG images as an animation using Canvas API.
 * Optimized for performance with preloading and frame caching.
 * 
 * @param {string[]} frames - Array of frame URLs
 * @param {number} fps - Frames per second (default: 30)
 * @param {boolean} autoplay - Start animation automatically (default: true)
 * @param {boolean} loop - Loop the animation (default: true)
 * @param {string} poster - Poster image URL while loading
 * @param {function} onLoaded - Callback when all frames are loaded
 * @param {function} onPlay - Callback when animation starts
 * @param {function} onPause - Callback when animation pauses
 * @param {function} onComplete - Callback when animation completes (if not looping)
 */
export function JpgSequencePlayer({
  frames = [],
  fps = 30,
  autoplay = true,
  loop = true,
  poster = '',
  onLoaded,
  onPlay,
  onPause,
  onComplete,
  className = '',
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  
  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay && !reducedMotion);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState(null);
  
  // Animation refs
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const intervalRef = useRef(1000 / fps);
  
  // Update interval when FPS changes
  useEffect(() => {
    intervalRef.current = 1000 / fps;
  }, [fps]);
  
  // Respect reduced motion
  useEffect(() => {
    if (reducedMotion) {
      setIsPlaying(false);
      if (imagesRef.current[0] && canvasRef.current) {
        drawFrame(0);
      }
    } else if (autoplay) {
      setIsPlaying(true);
    }
  }, [reducedMotion, autoplay]);
  
  // Preload all frames
  useEffect(() => {
    if (!frames.length) {
      setError('No frames provided');
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setLoadProgress(0);
    setError(null);
    
    const images = [];
    let loadedCount = 0;
    
    const handleImageLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / frames.length) * 100));
      
      if (loadedCount === frames.length) {
        imagesRef.current = images;
        setIsLoaded(true);
        setIsLoading(false);
        onLoaded?.();
        
        // Draw first frame
        if (canvasRef.current) {
          drawFrame(0);
        }
        
        // Start animation if autoplay
        if (autoplay && !reducedMotion) {
          setIsPlaying(true);
        }
      }
    };
    
    const handleImageError = (index) => {
      console.error(`Failed to load frame ${index}: ${frames[index]}`);
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / frames.length) * 100));
      
      if (loadedCount === frames.length) {
        imagesRef.current = images;
        setIsLoaded(true);
        setIsLoading(false);
        
        if (canvasRef.current && images[0]) {
          drawFrame(0);
        }
      }
    };
    
    // Load each frame
    frames.forEach((frameUrl, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = handleImageLoad;
      img.onerror = () => handleImageError(index);
      img.src = frameUrl;
      images.push(img);
    });
    
    // Cleanup
    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frames]);
  
  // Draw a specific frame to canvas
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[frameIndex];
    
    if (!canvas || !image) return;
    
    const ctx = canvas.getContext('2d');
    
    // Match canvas size to image size
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    
    // Draw the frame
    ctx.drawImage(image, 0, 0);
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!isPlaying || !isLoaded || reducedMotion) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }
    
    onPlay?.();
    
    const animate = (currentTime) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - lastTimeRef.current;
      
      if (elapsed > intervalRef.current) {
        const framesToAdvance = Math.floor(elapsed / intervalRef.current);
        currentFrameRef.current = (currentFrameRef.current + framesToAdvance) % frames.length;
        
        if (!loop && currentFrameRef.current >= frames.length - 1) {
          // Animation complete
          currentFrameRef.current = frames.length - 1;
          drawFrame(currentFrameRef.current);
          setIsPlaying(false);
          onComplete?.();
          return;
        }
        
        drawFrame(currentFrameRef.current);
        lastTimeRef.current = currentTime - (elapsed % intervalRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isLoaded, frames.length, loop, reducedMotion, drawFrame, onPlay, onComplete]);
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        
        // Maintain aspect ratio
        const aspectRatio = canvas.width / canvas.height;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const containerAspect = containerWidth / containerHeight;
        
        if (containerAspect > aspectRatio) {
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
        } else {
          canvas.style.width = 'auto';
          canvas.style.height = '100%';
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Controls
  const play = useCallback(() => {
    if (!isLoaded || reducedMotion) return;
    setIsPlaying(true);
    onPlay?.();
  }, [isLoaded, reducedMotion, onPlay]);
  
  const pause = useCallback(() => {
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);
  
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);
  
  const seek = useCallback((frameIndex) => {
    const clampedIndex = Math.max(0, Math.min(frameIndex, frames.length - 1));
    currentFrameRef.current = clampedIndex;
    drawFrame(clampedIndex);
  }, [frames.length, drawFrame]);
  
  // Expose controls via ref
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.play = play;
      canvasRef.current.pause = pause;
      canvasRef.current.toggle = toggle;
      canvasRef.current.seek = seek;
      canvasRef.current.getCurrentFrame = () => currentFrameRef.current;
      canvasRef.current.getTotalFrames = () => frames.length;
    }
  }, [play, pause, toggle, seek, frames.length]);
  
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      role="img"
      aria-label="Animated hero sequence"
      {...props}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-body-sm text-neutral-600">Loading animation... {loadProgress}%</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="text-center">
            <p className="text-body-sm text-red-600 mb-2">Failed to load animation</p>
            <p className="text-caption text-neutral-500">{error}</p>
          </div>
        </div>
      )}
      
      {/* Poster image while loading */}
      {!isLoading && !isLoaded && poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      
      {/* Canvas for animation */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        style={{ imageRendering: 'auto' }}
        aria-hidden="true"
      />
      
      {/* Reduced motion: show first frame only */}
      {reducedMotion && isLoaded && (
        <p className="sr-only">
          Animation paused due to reduced motion preference. Showing static frame.
        </p>
      )}
    </div>
  );
}

export default JpgSequencePlayer;
