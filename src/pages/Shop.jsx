import React, { useState, useMemo } from 'react';
import { Container, Section, Button } from '../components/common';
import { useCart } from '../context/CartContext';
import { PRODUCT_IMAGES } from '../utils/images';

/**
 * Product data - in production, this would come from an API
 */
const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Rose Bouquet',
    price: 79.99,
    category: 'bouquets',
    image: PRODUCT_IMAGES[0],
    description: 'Timeless elegance with a dozen premium roses',
    rating: 4.9,
    reviews: 128,
    inStock: true,
  },
  {
    id: 2,
    name: 'Pink Garden Arrangement',
    price: 89.99,
    category: 'arrangements',
    image: PRODUCT_IMAGES[1],
    description: 'Soft pink blooms in a stunning garden style',
    rating: 4.8,
    reviews: 96,
    inStock: true,
  },
  {
    id: 3,
    name: 'White Elegance Centerpiece',
    price: 129.99,
    category: 'centerpieces',
    image: PRODUCT_IMAGES[2],
    description: 'Sophisticated white flowers for special occasions',
    rating: 5.0,
    reviews: 74,
    inStock: true,
  },
  {
    id: 4,
    name: 'Romantic Red Roses',
    price: 99.99,
    category: 'bouquets',
    image: PRODUCT_IMAGES[3],
    description: 'Passionate red roses for that special someone',
    rating: 4.9,
    reviews: 215,
    inStock: true,
  },
  {
    id: 5,
    name: 'Spring Garden Mix',
    price: 69.99,
    category: 'seasonal',
    image: PRODUCT_IMAGES[4],
    description: 'Fresh seasonal blooms capturing spring\'s beauty',
    rating: 4.7,
    reviews: 89,
    inStock: true,
  },
  {
    id: 6,
    name: 'Luxury Orchid Arrangement',
    price: 149.99,
    category: 'premium',
    image: PRODUCT_IMAGES[5],
    description: 'Exotic orchids in an elegant designer vase',
    rating: 5.0,
    reviews: 52,
    inStock: true,
  },
  {
    id: 7,
    name: 'Sunshine Bouquet',
    price: 64.99,
    category: 'bouquets',
    image: PRODUCT_IMAGES[6],
    description: 'Bright and cheerful yellow and orange blooms',
    rating: 4.8,
    reviews: 103,
    inStock: true,
  },
  {
    id: 8,
    name: 'Sympathy White Arrangement',
    price: 109.99,
    category: 'sympathy',
    image: PRODUCT_IMAGES[7],
    description: 'Peaceful white flowers expressing condolences',
    rating: 4.9,
    reviews: 67,
    inStock: true,
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'bouquets', name: 'Bouquets' },
  { id: 'arrangements', name: 'Arrangements' },
  { id: 'centerpieces', name: 'Centerpieces' },
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'premium', name: 'Premium' },
  { id: 'sympathy', name: 'Sympathy' },
];

const SORT_OPTIONS = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
  { id: 'rating', name: 'Top Rated' },
  { id: 'newest', name: 'Newest' },
];

/**
 * Shop Page Component
 */
export function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const { addToCart } = useCart();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-32 pb-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-caption text-primary-500 font-medium tracking-wider uppercase mb-4 block">
              Shop
            </span>
            <h1 className="text-display-lg font-bold text-neutral-900 mb-6">
              Beautiful Flowers for Every Occasion
            </h1>
            <p className="text-body-lg text-neutral-600">
              Handcrafted arrangements made with love and the freshest blooms. 
              Free delivery on orders over $75.
            </p>
          </div>
        </Container>
      </Section>

      {/* Shop Content */}
      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-heading-sm font-semibold text-neutral-900 mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-primary-500"
                    />
                    <div className="flex justify-between text-body-sm text-neutral-600">
                      <span>$0</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                <p className="text-body-sm text-neutral-600">
                  {filteredProducts.length} products
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-heading-md font-semibold text-neutral-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-body-sm text-neutral-600">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

/**
 * ProductCard Component
 */
function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product, 1);
    setIsAdding(false);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
          className="absolute bottom-4 left-4 right-4 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          {isAdding ? 'Adding...' : !product.inStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {/* Badge */}
        {!product.inStock && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-neutral-900/80 text-white text-body-xs font-medium rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="text-heading-sm font-semibold text-neutral-900 mb-2">
          {product.name}
        </h3>
        <p className="text-body-sm text-neutral-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-amber-400'
                    : 'text-neutral-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-body-xs text-neutral-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-heading-md font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Shop;
