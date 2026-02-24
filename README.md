# Florist Animated Website

An immersive florist website featuring an animated hero section and scrollytelling interactions to showcase floral arrangements and create an engaging user experience.

## Features

- **Animated Hero Section**: Video background with smooth entrance animations and typography reveals
- **Scrollytelling Experience**: Scroll-triggered animations with parallax effects and section transitions
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Performance Optimized**: 60fps animations with < 3s page load time

## Tech Stack

- **Framework**: React + Vite
- **Animations**: GSAP + ScrollTrigger
- **Styling**: Tailwind CSS
- **Video**: HTML5 Video API + Canvas

## Project Structure

```
animated-website/
├── roadmap/
│   ├── plan.md          # Implementation plan
│   ├── tasks.md         # Task tracker
│   ├── market-analysis.md  # Market research (pending)
│   └── PRD.md           # Product requirements (pending)
├── features/
│   └── devs/
│       └── main/        # Main feature implementation
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS modules
│   └── assets/          # Media assets
└── public/              # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Workflow

1. Check `roadmap/tasks.md` for current tasks
2. Review `roadmap/plan.md` for implementation details
3. Follow feature branch workflow
4. Run quality gates before commits

## Quality Gates

- ✅ Lint & format check
- ✅ Type checking (if TypeScript)
- ✅ Unit tests pass
- ✅ Accessibility audit (WCAG 2.1 AA)
- ✅ Performance budget met

## Assets

- `startFrame.png` - Hero section start frame
- `endFrame.png` - Hero section end frame
- `a5d0a42e-17c8-40c3-94b1-5d65e07ad80a.mp4` - Hero animation video

## Success Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 3s |
| Animation FPS | 60fps |
| Mobile Lighthouse | > 90 |
| Accessibility | WCAG 2.1 AA |

## License

Proprietary - All rights reserved
