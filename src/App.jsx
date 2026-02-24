import React from 'react';
import { Button, Container, Section } from './components/common';
import AccessibilityControls from './components/common/AccessibilityControls';
import { Hero } from './components/hero';

/**
 * App Component
 *
 * Main application component with animated hero section.
 */
function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl" aria-hidden="true">🌸</span>
              <span className="font-display font-semibold text-xl text-neutral-900">
                Dream Blooms
              </span>
            </a>

            {/* Navigation */}
            <nav aria-label="Main navigation">
              <ul className="hidden md:flex items-center space-x-8">
                <li>
                  <a href="#collections" className="text-body-sm text-neutral-600 hover:text-primary-500 transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#weddings" className="text-body-sm text-neutral-600 hover:text-primary-500 transition-colors">
                    Weddings
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-body-sm text-neutral-600 hover:text-primary-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-body-sm text-neutral-600 hover:text-primary-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button variant="primary" size="sm">
                Shop Now
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section with Animation */}
        <Hero
          headline="Beautiful Flowers for Life's Moments"
          subheadline="Handcrafted arrangements for weddings, special occasions, and everyday beauty. Locally sourced, sustainably grown, delivered with care."
          ctaPrimary="Explore Collections"
          ctaSecondary="Book Consultation"
          videoSrc="/videos/a5d0a42e-17c8-40c3-94b1-5d65e07ad80a.mp4"
          posterSrc="/images/hero/startFrame.png"
          // JPG Sequence configuration (uncomment to use)
          // useJpgSequence={true}
          // jpgFrames={[]} // Will auto-generate from /images/hero/sequence/
          // jpgFps={30}
          onPrimaryClick={() => console.log('Primary CTA clicked')}
          onSecondaryClick={() => console.log('Secondary CTA clicked')}
        />

        {/* Features Section Placeholder */}
        <Section background="alternate">
          <Container>
            <div className="section-heading">
              <h2>Why Choose Dream Blooms</h2>
              <p className="text-neutral-600">
                We believe in quality, sustainability, and the transformative power of flowers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl" aria-hidden="true">🌿</span>
                </div>
                <h3 className="text-heading-md mb-2">Locally Sourced</h3>
                <p className="text-body-sm text-neutral-600">
                  Fresh flowers from local growers, supporting our community and reducing environmental impact.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl" aria-hidden="true">✋</span>
                </div>
                <h3 className="text-heading-md mb-2">Handcrafted</h3>
                <p className="text-body-sm text-neutral-600">
                  Each arrangement is thoughtfully designed by our skilled florists with attention to every detail.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl" aria-hidden="true">🚚</span>
                </div>
                <h3 className="text-heading-md mb-2">Same-Day Delivery</h3>
                <p className="text-body-sm text-neutral-600">
                  Order by 2pm for same-day delivery within our local delivery area.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Collections Section Placeholder */}
        <Section id="collections">
          <Container>
            <div className="section-heading">
              <h2>Our Collections</h2>
              <p className="text-neutral-600">
                Discover arrangements for every occasion and style.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Weddings', 'Special Occasions', 'Everyday Beauty', 'Sympathy', 'Corporate', 'Subscriptions'].map((collection) => (
                <a
                  key={collection}
                  href={`#/collections/${collection.toLowerCase().replace(' ', '-')}`}
                  className="card group block overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-4 left-4 text-white font-display font-semibold text-lg">
                      {collection}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl" aria-hidden="true">🌸</span>
                <span className="font-display font-semibold text-xl text-white">
                  Dream Blooms
                </span>
              </div>
              <p className="text-body-sm">
                Artisan florist creating beautiful moments with locally sourced, sustainably grown flowers.
              </p>
            </div>

            <div>
              <h4 className="text-heading-sm text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-body-sm">
                <li><a href="#" className="hover:text-white transition-colors">All Collections</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Weddings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subscriptions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-heading-sm text-white mb-4">Company</h4>
              <ul className="space-y-2 text-body-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-heading-sm text-white mb-4">Support</h4>
              <ul className="space-y-2 text-body-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-body-sm">
              © 2026 Dream Blooms. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-body-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
