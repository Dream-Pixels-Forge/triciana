/**
 * JPG Sequence Utilities
 * 
 * Helper functions for working with JPG animation sequences.
 */

/**
 * Generate frame URLs from a sequence folder
 * 
 * @param {object} options - Sequence options
 * @param {string} options.folder - Base folder path (e.g., '/images/hero/sequence')
 * @param {string} options.prefix - Filename prefix (e.g., 'frame_')
 * @param {string} options.extension - File extension (default: '.jpg')
 * @param {number} options.start - Starting frame number (default: 1)
 * @param {number} options.end - Ending frame number
 * @param {number} options.padding - Number padding (e.g., 3 = 001, 002)
 * @returns {string[]} Array of frame URLs
 */
export function generateFrameUrls({
  folder,
  prefix = '',
  extension = '.jpg',
  start = 1,
  end,
  padding = 3,
}) {
  const frames = [];
  
  for (let i = start; i <= end; i++) {
    const frameNumber = String(i).padStart(padding, '0');
    const filename = `${prefix}${frameNumber}${extension}`;
    frames.push(`${folder}/${filename}`);
  }
  
  return frames;
}

/**
 * Preload JPG sequence frames
 * 
 * @param {string[]} frameUrls - Array of frame URLs to preload
 * @param {function} onProgress - Progress callback (loaded, total, url)
 * @param {function} onComplete - Complete callback (images)
 * @param {function} onError - Error callback (error, url, index)
 * @returns {object} Preload controller with cancel method
 */
export function preloadSequence(frameUrls, { onProgress, onComplete, onError } = {}) {
  const images = [];
  let loadedCount = 0;
  let cancelled = false;
  
  const handleLoad = (index) => (e) => {
    if (cancelled) return;
    loadedCount++;
    onProgress?.(loadedCount, frameUrls.length, frameUrls[index]);
    
    if (loadedCount === frameUrls.length) {
      onComplete?.(images);
    }
  };
  
  const handleError = (index) => (e) => {
    if (cancelled) return;
    console.error(`Failed to load frame ${index}:`, frameUrls[index]);
    onError?.(e, frameUrls[index], index);
    loadedCount++;
    
    if (loadedCount === frameUrls.length) {
      onComplete?.(images);
    }
  };
  
  // Load each frame
  frameUrls.forEach((url, index) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = handleLoad(index);
    img.onerror = handleError(index);
    img.src = url;
    images.push(img);
  });
  
  return {
    cancel: () => {
      cancelled = true;
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    },
  };
}

/**
 * Calculate optimal FPS for a sequence based on target duration
 * 
 * @param {number} frameCount - Total number of frames
 * @param {number} targetDuration - Target animation duration in seconds
 * @returns {number} Optimal FPS
 */
export function calculateFps(frameCount, targetDuration) {
  if (targetDuration <= 0) return 30;
  return Math.round(frameCount / targetDuration);
}

/**
 * Calculate animation duration based on FPS
 * 
 * @param {number} frameCount - Total number of frames
 * @param {number} fps - Frames per second
 * @returns {number} Duration in seconds
 */
export function calculateDuration(frameCount, fps) {
  if (fps <= 0) return frameCount / 30;
  return frameCount / fps;
}

/**
 * Get sequence metadata from frame URLs
 * 
 * @param {string[]} frameUrls - Array of frame URLs
 * @returns {object} Sequence metadata
 */
export function getSequenceMetadata(frameUrls) {
  if (!frameUrls || frameUrls.length === 0) {
    return {
      frameCount: 0,
      estimatedSize: 0,
      aspectRatio: null,
    };
  }
  
  return {
    frameCount: frameUrls.length,
    estimatedSize: frameUrls.length * 200 * 1024, // Estimate 200KB per frame
    firstFrame: frameUrls[0],
    lastFrame: frameUrls[frameUrls.length - 1],
  };
}

export default {
  generateFrameUrls,
  preloadSequence,
  calculateFps,
  calculateDuration,
  getSequenceMetadata,
};
