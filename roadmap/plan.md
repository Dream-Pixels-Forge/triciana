# Implementation Plan - Florist Animated Website

## Executive Summary

An immersive florist website featuring an animated hero section and scrollytelling interactions to showcase floral arrangements and create an engaging user experience for weddings, special occasions, gifts, and home decor customers.

**Market Research:** See `market-analysis.md`  
**Product Requirements:** See `PRD.md`  
**Trends Research:** See trends report below

---

## 2026 Trends Summary (from @trends-agent)

### UI/UX Trends
- **Elegant Minimalism** - Clean design with generous white space; flowers are the hero
- **Glassmorphism 2.0** - Translucent overlays showcasing flowers beneath UI elements
- **Hyper-Personalization** - Customized recommendations based on occasion type
- **Sustainability in UX** - Eco-friendly interfaces reflecting brand values
- **Accessibility-First Design** - WCAG 2.2 AA compliance as standard

### Animation & Scrollytelling Best Practices
- **Pacing & Rhythm** - Let each moment breathe; don't rush through content
- **Product Story Pages** - Scroll journey from seed to bouquet
- **Data as Narrative** - Show flower origins, sustainability metrics as scroll-triggered visualizations
- **Restraint Beats Spectacle** - Not every section needs animation

### Technology Stack Recommendations
- **React 18+** with concurrent features
- **GSAP + ScrollTrigger** for complex animations and timelines
- **CSS scroll-driven animations** for simple scroll effects (Chrome, Edge, Safari)
- **WebP/AVIF** for images, **WebM+MP4** for videos
- **Tailwind CSS** for utility-first styling

### Performance Budget
| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | <2.5s |
| FID (First Input Delay) | <100ms |
| CLS (Cumulative Layout Shift) | <0.1 |
| Total bundle size | <200KB (excluding videos) |
| Video hero | <5MB compressed |

### Accessibility (WCAG 2.2)
- Focus Not Obscured (AA)
- Pointer Target Spacing (AAA) - minimum 24×24px touch targets
- Dragging Movements Alternative (AA)
- Accessible Authentication (AA)
- Respect `prefers-reduced-motion` media query

---

## Technical Architecture

### Stack Recommendation

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Frontend Framework** | React 18 + Vite | Fast HMR, concurrent features, excellent ecosystem |
| **Animation Library** | GSAP + ScrollTrigger | Industry standard, cross-browser support, advanced timelines |
| **CSS Framework** | Tailwind CSS | Utility-first, rapid development, small bundle with PurgeCSS |
| **Video/Animation** | HTML5 Video API + Canvas | Native performance, frame-by-frame control |
| **Image Optimization** | Sharp + Next-gen formats | WebP/AVIF for 30-50% size reduction |
| **Deployment** | Vercel | Edge network, automatic image optimization, preview deployments |
| **CMS (Optional)** | Sanity.io | Real-time content, visual editing, GraphQL API |
| **E-commerce (Optional)** | Shopify Lite | Buy buttons, checkout integration, inventory management |

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React     │  │    GSAP     │  │   Tailwind CSS      │  │
│  │  Components │  │ScrollTrigger│  │   + CSS Modules     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Video     │  │   Scroll-   │  │   Accessibility     │  │
│  │   Player    │  │  Driven CSS │  │   (WCAG 2.2 AA)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Build & Deployment                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Vite     │  │   Sharp     │  │      Vercel         │  │
│  │    Build    │  │  (Images)   │  │   Edge Network      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation (sticky, mobile-friendly)
│   └── Cart/CTA Button
├── Hero Section
│   ├── Video Background (autoplay, muted, loop)
│   ├── Animated Headline (GSAP reveal)
│   ├── Subheadline
│   └── Primary CTA Button
├── Scrollytelling Container
│   ├── Section 1: Brand Story (scroll-triggered animations)
│   ├── Section 2: Process/Origin (parallax images)
│   ├── Section 3: Sustainability Metrics (animated counters)
│   ├── Section 4: Featured Collections (horizontal scroll)
│   └── Section 5: Testimonials (fade-in cards)
├── Product Showcase
│   ├── Filter Bar (by occasion, season, color)
│   ├── Product Grid
│   │   └── Product Card (hover animations, quick view)
│   └── Product Detail Modal
├── Wedding/Events Section
│   ├── Portfolio Gallery (filterable by style)
│   ├── Consultation Booking Form
│   └── Process Timeline
├── Footer
│   ├── Contact Info
│   ├── Social Links
│   ├── Newsletter Signup
│   └── Legal Links
└── Accessibility Controls
    ├── Reduced Motion Toggle
    ├── Font Size Adjuster
    └── High Contrast Mode
```

### File Structure

```
animated-website/
├── roadmap/
│   ├── plan.md              # This document
│   ├── tasks.md             # Task tracker
│   ├── market-analysis.md   # Market research
│   └── PRD.md               # Product requirements
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── hero/
│   │   │   ├── startFrame.png
│   │   │   ├── endFrame.png
│   │   │   └── hero-video.mp4
│   │   └── products/
│   └── videos/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── Section.jsx
│   │   │   └── AccessibilityControls.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   ├── hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── HeroVideo.jsx
│   │   │   └── HeroContent.jsx
│   │   ├── scrollytelling/
│   │   │   ├── ScrollyContainer.jsx
│   │   │   ├── ScrollySection.jsx
│   │   │   ├── BrandStory.jsx
│   │   │   ├── ProcessSection.jsx
│   │   │   ├── SustainabilityMetrics.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── products/
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── FilterBar.jsx
│   │   └── wedding/
│   │       ├── WeddingHero.jsx
│   │       ├── PortfolioGallery.jsx
│   │       └── ConsultationForm.jsx
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   ├── useReducedMotion.js
│   │   └── useVideoPlayer.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── animations.css
│   ├── utils/
│   │   ├── gsap.js
│   │   ├── scrollTrigger.js
│   │   └── accessibility.js
│   ├── assets/
│   │   └── images/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## Core Features

### 1. Animated Hero Section

**Requirements:**
- Video background using provided assets (startFrame.png, endFrame.png, video)
- Smooth entrance animations with GSAP
- Typography reveal effects (staggered)
- CTA button with micro-interactions
- Fallback image for slow connections
- Respect `prefers-reduced-motion`

**Implementation:**
```jsx
// HeroVideo.jsx
- Autoplay, muted, loop video
- Poster image (startFrame.png) for instant visual
- Lazy loading with IntersectionObserver
- Frame-by-frame control via Canvas API (optional)
```

### 2. Scrollytelling Experience

**Requirements:**
- Scroll-triggered animations using GSAP ScrollTrigger
- Parallax effects for floral imagery
- Section transitions with fade/slide effects
- Progress indicator (scroll progress bar)
- Mobile-optimized touch interactions
- Keyboard navigation support

**Sections:**
1. **Brand Story** - Founder journey, artistic philosophy
2. **Process/Origin** - From seed to bouquet visualization
3. **Sustainability Metrics** - Animated counters, impact data
4. **Featured Collections** - Horizontal scroll gallery
5. **Testimonials** - Customer stories with fade-in cards

### 3. Responsive Design

**Mobile-First Approach:**
- Design mobile layouts before desktop
- Touch targets minimum 44×44px (ideally 24×24px)
- Sticky bottom navigation for key actions
- Shorter hero height on mobile (50-70vh)
- Swipe gestures for image carousels

**Breakpoints:**
```css
/* Tailwind default breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

**Goals:** Project setup, component architecture, base styling

**Tasks:**
- [ ] Initialize Vite + React project
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up project folder structure (features/devs/main)
- [ ] Create base components (Button, Container, Section)
- [ ] Set up GSAP + ScrollTrigger
- [ ] Implement accessibility controls (reduced motion toggle)
- [ ] Optimize video assets for web (compress to <5MB)
- [ ] Set up Git repository and initial commit

**Deliverables:**
- Working development environment
- Component library foundation
- Design system tokens (colors, typography, spacing)

**Quality Gates:**
- ✅ Lint & format check passes
- ✅ All base components documented
- ✅ Accessibility controls functional

### Phase 2: Hero Animation (Week 2)

**Goals:** Build animated hero section with video background

**Tasks:**
- [ ] Build Hero component structure
- [ ] Implement video background player
- [ ] Add frame-by-frame animation control (if using Canvas)
- [ ] Create typography animations (GSAP reveal)
- [ ] Design and implement CTA button with micro-interactions
- [ ] Add loading states and fallback image
- [ ] Implement `prefers-reduced-motion` support
- [ ] Test on mobile devices (iOS Safari, Chrome Android)

**Deliverables:**
- Fully functional animated hero section
- Video loads <3s on 4G connection
- 60fps animations on mid-range devices

**Quality Gates:**
- ✅ LCP <2.5s
- ✅ Video autoplay works on all browsers
- ✅ Fallback image displays correctly
- ✅ Reduced motion preference respected

### Phase 3: Scrollytelling (Week 3)

**Goals:** Implement scroll-triggered animations and section components

**Tasks:**
- [ ] Build ScrollyContainer component
- [ ] Create ScrollySection with ScrollTrigger
- [ ] Implement Section 1: Brand Story
- [ ] Implement Section 2: Process/Origin (parallax)
- [ ] Implement Section 3: Sustainability Metrics (animated counters)
- [ ] Implement Section 4: Featured Collections (horizontal scroll)
- [ ] Implement Section 5: Testimonials
- [ ] Add scroll progress indicator
- [ ] Fine-tune animation timing and easing

**Deliverables:**
- 5 scrollytelling sections fully implemented
- Smooth 60fps scroll animations
- Mobile touch interactions working

**Quality Gates:**
- ✅ ScrollTrigger works on all browsers
- ✅ No jank or stuttering on scroll
- ✅ CLS <0.1
- ✅ Keyboard navigation functional

### Phase 4: Polish & Deploy (Week 4)

**Goals:** Cross-browser testing, performance optimization, production deployment

**Tasks:**
- [ ] Responsive design testing (all breakpoints)
- [ ] Cross-browser compatibility check (Chrome, Firefox, Safari, Edge)
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] Accessibility audit (WCAG 2.2 AA compliance)
- [ ] Lighthouse optimization (target: mobile score >90)
- [ ] Set up Vercel deployment
- [ ] Configure custom domain (if applicable)
- [ ] Create production build and deploy
- [ ] Post-deployment smoke testing

**Deliverables:**
- Production-ready website
- Deployment pipeline configured
- Documentation complete

**Quality Gates:**
- ✅ Lighthouse mobile score >90
- ✅ WCAG 2.2 AA compliance verified
- ✅ All quality metrics met
- ✅ Stakeholder approval received

---

## Risk Mitigation Strategies

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Video performance issues on mobile | Medium | High | Compress video, use poster image, lazy load |
| ScrollTrigger conflicts on older browsers | Low | Medium | Feature detection, graceful degradation |
| Animation jank on low-end devices | Medium | Medium | Reduce animation complexity, use GPU-accelerated properties |
| Accessibility compliance gaps | Low | High | Early audit, automated testing, manual review |
| Scope creep (additional features) | Medium | Medium | Strict MVP scope, backlog for future phases |

---

## Quality Gates and Checkpoints

### Pre-Commit Checklist
- [ ] Code linted and formatted
- [ ] No console errors or warnings
- [ ] Components documented
- [ ] Accessibility attributes added

### Pre-Merge Checklist
- [ ] All tests passing
- [ ] Lighthouse score >90
- [ ] WCAG 2.2 AA compliance verified
- [ ] Cross-browser testing complete
- [ ] Mobile responsiveness verified

### Pre-Deploy Checklist
- [ ] All quality gates passed
- [ ] Performance budget met
- [ ] Stakeholder review approved
- [ ] Rollback plan documented
- [ ] Monitoring configured

### Post-Deploy Checklist
- [ ] Smoke tests passed
- [ ] Analytics tracking verified
- [ ] Error monitoring active
- [ ] Backup/rollback tested

---

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Page Load Time | <3s | Lighthouse, WebPageTest |
| LCP (Largest Contentful Paint) | <2.5s | Chrome DevTools, CrUX |
| Animation FPS | 60fps | Chrome DevTools Performance |
| Mobile Lighthouse Score | >90 | Lighthouse CI |
| Accessibility Score | 100% WCAG 2.2 AA | axe-core, manual audit |
| Bounce Rate | <45% | Google Analytics |
| Time on Page (Homepage) | >90s | Google Analytics |
| Conversion Rate | 2.5-3.5% | Google Analytics |
| Cart Abandonment | <65% | Google Analytics |
| Net Promoter Score | 50+ | Post-purchase survey |

---

## Technology Decisions Log

| Decision | Date | Rationale | Alternatives Considered |
|----------|------|-----------|------------------------|
| React + Vite | 2026-02-24 | Fast HMR, excellent DX, large ecosystem | Next.js (overkill for static site), Svelte (smaller ecosystem) |
| GSAP + ScrollTrigger | 2026-02-24 | Industry standard, cross-browser, advanced features | Framer Motion (React-only), Lenis (scroll-only) |
| Tailwind CSS | 2026-02-24 | Rapid development, small bundle, consistent design | Styled Components (runtime overhead), CSS Modules (more boilerplate) |
| Vercel Deployment | 2026-02-24 | Edge network, automatic optimization, preview deployments | Netlify (similar), AWS Amplify (more complex) |
| CSS Scroll-Driven Animations | 2026-02-24 | Native performance, zero bundle size | GSAP only (larger bundle, JS thread) |

---

## Appendix

### References
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Web.dev Performance Guidelines](https://web.dev/performance/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-24 | web-dev-strategy-agent | Initial implementation plan |
| 1.1 | 2026-02-24 | trends-agent | Added 2026 trends research |
| 1.2 | 2026-02-24 | plan-agent | Enhanced with detailed architecture |

### Approval Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Project Owner | | | |
| Lead Developer | | | |
| Designer | | | |
| QA Lead | | | |
