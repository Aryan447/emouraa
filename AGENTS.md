# Emouraa Fashion - Development Guide

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## Project Structure

```
/home/aryan/dev/emouraa/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with hero carousel
│   ├── products/          # Products listing page
│   ├── product/[id]/      # Product detail page
│   ├── cart/              # Cart page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Header.tsx         # Main header with navigation
│   ├── Footer.tsx         # Footer
│   ├── Carousel.tsx       # Image carousel with framer-motion
│   ├── ProductCard.tsx    # Product card component
│   └── CartSlide.tsx      # Slide-out cart panel
├── context/
│   └── CartContext.tsx    # Cart state management
├── data/
│   └── products.ts        # Product data
└── public/images/         # Product images
```

## Key Commands

```bash
bun run dev      # Start dev server at localhost:3000
bun run build    # Production build
bun run start    # Start production server
bun run lint     # Run linter
```

## Design System

### Colors
- Primary: Black `#000000`
- Accent: `#ff3333` (red)
- Background: White `#ffffff`
- Soft Pink: `#fdf2f4`

### Typography
- Serif: Bodoni Moda
- Sans: Jost

### Mobile-First
- All components optimized for mobile first
- Breakpoints: mobile (<768px), md (768px+), lg (1024px+)

## Adding Products

Edit `/data/products.ts` to add new products. Each product needs:
- id, name, price, category, description, images array
- Optional: isNew, onSale flags