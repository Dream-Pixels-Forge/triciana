import React, { useState } from 'react';
import { Button, Container, Section } from './components/common';
import AccessibilityControls from './components/common/AccessibilityControls';
import { Hero } from './components/hero';
import { FlowerIcon, LeafIcon, HandIcon, TruckIcon, StarIcon, RecycleIcon, GlobeIcon } from './components/common/Icons';
import {
  ScrollyContainer,
  BrandStory,
  ProcessSection,
  SustainabilityMetrics,
  CollectionsCarousel,
  TestimonialsSection,
} from './components/scrollytelling';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SignInModal } from './components/auth/SignInModal';
import { SignUpModal } from './components/auth/SignUpModal';
import { CartSlideOver } from './components/cart/CartSlideOver';
import { Shop } from './pages/Shop';

// Main App Content
function AppContent() {
  const { isSignInOpen, isSignUpOpen, setIsSignInOpen, setIsSignUpOpen, user, signOut } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'shop') {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header
          onNavigate={setCurrentPage}
          onSignIn={() => setIsSignInOpen(true)}
          onSignUp={() => setIsSignUpOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
          user={user}
          onSignOut={signOut}
        />
        <Shop />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header
        onNavigate={setCurrentPage}
        onSignIn={() => setIsSignInOpen(true)}
        onSignUp={() => setIsSignUpOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
        user={user}
        onSignOut={signOut}
      />
      
      <main id="main-content">
        <Hero
          headline="Beautiful Flowers for Life's Moments"
          subheadline="Handcrafted arrangements for weddings, special occasions, and everyday beauty. Locally sourced, sustainably grown, delivered with care."
          ctaPrimary="Explore Collections"
          ctaSecondary="Shop Now"
          onSecondaryClick={() => setCurrentPage('shop')}
        />

        <ScrollyContainer showProgress={true}>
          <BrandStory
            title="Our Story"
            subtitle="From Seed to Bouquet"
          />
          
          <ProcessSection
            title="Our Process"
            subtitle="From Garden to Your Home"
          />
          
          <SustainabilityMetrics
            title="Our Impact"
            subtitle="Sustainability at Every Step"
            metrics={[
              { value: 95, suffix: '%', label: 'Locally Sourced', description: 'Flowers from local growers', icon: LeafIcon },
              { value: 100, suffix: '%', label: 'Foam-Free', description: 'No floral foam in arrangements', icon: RecycleIcon },
              { value: 50, suffix: 'K', label: 'Plastic Saved', description: 'Packages delivered plastic-free', icon: GlobeIcon },
              { value: 24, suffix: 'h', label: 'Carbon Neutral', description: 'Same-day delivery radius', icon: TruckIcon },
            ]}
          />
          
          <CollectionsCarousel
            title="Collections"
            subtitle="Curated for Every Occasion"
          />
          
          <TestimonialsSection
            title="Testimonials"
            subtitle="What Our Customers Say"
          />
        </ScrollyContainer>

        {/* Features Section */}
        <Section background="alternate">
          <Container>
            <div className="section-heading">
              <h2>Why Choose Triciana</h2>
              <p className="text-neutral-600">
                We believe in quality, sustainability, and the transformative power of flowers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <LeafIcon className="w-8 h-8" />
                </div>
                <h3 className="text-heading-md mb-2">Locally Sourced</h3>
                <p className="text-body-sm text-neutral-600">
                  Fresh flowers from local growers, supporting our community and reducing environmental impact.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <HandIcon className="w-8 h-8" />
                </div>
                <h3 className="text-heading-md mb-2">Handcrafted</h3>
                <p className="text-body-sm text-neutral-600">
                  Each arrangement is thoughtfully designed by our skilled florists with attention to every detail.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <TruckIcon className="w-8 h-8" />
                </div>
                <h3 className="text-heading-md mb-2">Same-Day Delivery</h3>
                <p className="text-body-sm text-neutral-600">
                  Order by 2pm for same-day delivery within our local delivery area.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />

      {/* Modals */}
      {isSignInOpen && <SignInModal onClose={() => setIsSignInOpen(false)} />}
      {isSignUpOpen && <SignUpModal onClose={() => setIsSignUpOpen(false)} />}
      <CartSlideOver />
    </div>
  );
}

// Header Component
function Header({ onNavigate, onSignIn, onSignUp, onCartClick, cartCount, user, onSignOut }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
            <FlowerIcon className="w-8 h-8 text-primary-500" />
            <span className="font-display font-semibold text-xl text-neutral-900">Triciana</span>
          </button>

          <nav aria-label="Main navigation">
            <ul className="hidden md:flex items-center space-x-8">
              <li><button onClick={() => onNavigate('home')} className="text-body-sm text-neutral-600 hover:text-primary-500">Home</button></li>
              <li><button onClick={() => onNavigate('shop')} className="text-body-sm text-neutral-600 hover:text-primary-500">Shop</button></li>
              <li><a href="#weddings" className="text-body-sm text-neutral-600 hover:text-primary-500">Weddings</a></li>
              <li><a href="#about" className="text-body-sm text-neutral-600 hover:text-primary-500">About</a></li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={onCartClick} className="relative p-2 text-neutral-600 hover:text-primary-500" aria-label="Shopping cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-body-sm font-medium text-neutral-700 hover:text-primary-500">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    <a href="/account" className="block px-4 py-2 text-body-sm text-neutral-700 hover:bg-neutral-50">Account</a>
                    <a href="/orders" className="block px-4 py-2 text-body-sm text-neutral-700 hover:bg-neutral-50">Orders</a>
                    <button onClick={onSignOut} className="w-full text-left px-4 py-2 text-body-sm text-red-600 hover:bg-neutral-50">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={onSignIn} className="text-body-sm font-medium text-neutral-700 hover:text-primary-500">Sign In</button>
                <Button variant="primary" size="sm" onClick={onSignUp}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FlowerIcon className="w-8 h-8 text-primary-400" />
              <span className="font-display font-semibold text-xl text-white">Triciana</span>
            </div>
            <p className="text-body-sm">Artisan florist creating beautiful moments with locally sourced, sustainably grown flowers.</p>
          </div>

          <div>
            <h4 className="text-heading-sm text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-body-sm">
              <li><a href="#" className="hover:text-white">All Collections</a></li>
              <li><a href="#" className="hover:text-white">Weddings</a></li>
              <li><a href="#" className="hover:text-white">Subscriptions</a></li>
              <li><a href="#" className="hover:text-white">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-heading-sm text-white mb-4">Company</h4>
            <ul className="space-y-2 text-body-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-heading-sm text-white mb-4">Support</h4>
            <ul className="space-y-2 text-body-sm">
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Delivery Info</a></li>
              <li><a href="#" className="hover:text-white">Care Guide</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm">© 2026 Triciana. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-body-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

// Main App with Providers
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
        <AccessibilityControls />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
