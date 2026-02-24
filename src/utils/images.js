/**
 * Image Utilities
 * 
 * Helpers for loading and displaying random images from folders.
 */

/**
 * Product images - manually listed (Vite doesn't support dynamic imports from folders)
 */
export const PRODUCT_IMAGES = [
  '/images/products/Abundant Spray Roses.png',
  '/images/products/Cascading Pink Roses.png',
  '/images/products/Classic Garden Roses.png',
  '/images/products/Dramatic White Roses.png',
  '/images/products/Formal Wedding Centerpiece.png',
  '/images/products/Gold Rose on Black.png',
  '/images/products/hero-flowers-07.png',
  '/images/products/Rose on Silk.png',
  '/images/products/Rose on Velvet.png',
  '/images/products/Velvet Red Roses.png',
  '/images/products/White Rose on Blue Velvet.png',
];

/**
 * Hero images - manually listed
 */
export const HERO_IMAGES = [
  '/images/hero/endFrame.png',
  '/images/hero/hero-flowers-07.png',
  '/images/hero/Rose on Silk.png',
  '/images/hero/Rose on Velvet.png',
  '/images/hero/startFrame.png',
  '/images/hero/Velvet Red Roses.png',
  '/images/hero/White Rose on Blue Velvet.png',
];

/**
 * Get random image from array
 * @param {string[]} images - Array of image paths
 * @param {string[]} exclude - Paths to exclude
 * @returns {string} Random image path
 */
export function getRandomImage(images, exclude = []) {
  const available = images.filter(img => !exclude.includes(img));
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex] || images[0];
}

/**
 * Get multiple random images without duplicates
 * @param {string[]} images - Array of image paths
 * @param {number} count - Number of images to get
 * @returns {string[]} Array of random image paths
 */
export function getRandomImages(images, count) {
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get random product image
 * @param {string[]} exclude - Paths to exclude
 * @returns {string} Random product image path
 */
export function getRandomProductImage(exclude = []) {
  return getRandomImage(PRODUCT_IMAGES, exclude);
}

/**
 * Get random hero image
 * @param {string[]} exclude - Paths to exclude
 * @returns {string} Random hero image path
 */
export function getRandomHeroImage(exclude = []) {
  return getRandomImage(HERO_IMAGES, exclude);
}

/**
 * Preload images
 * @param {string[]} imagePaths - Array of image paths to preload
 * @returns {Promise<void>}
 */
export function preloadImages(imagePaths) {
  return Promise.all(
    imagePaths.map(path => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(path);
        img.onerror = () => reject(new Error(`Failed to load: ${path}`));
        img.src = path;
      });
    })
  );
}

/**
 * Hook to get random image that changes on interval
 * @param {string[]} images - Array of image paths
 * @param {number} interval - Change interval in ms
 * @returns {string} Current random image path
 */
export function useRandomImage(images, interval = 5000) {
  const [currentImage, setCurrentImage] = React.useState(() => getRandomImage(images));

  React.useEffect(() => {
    const changeImage = () => {
      setCurrentImage(getRandomImage(images));
    };

    const id = setInterval(changeImage, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return currentImage;
}

export default {
  PRODUCT_IMAGES,
  HERO_IMAGES,
  getRandomImage,
  getRandomImages,
  getRandomProductImage,
  getRandomHeroImage,
  preloadImages,
};
