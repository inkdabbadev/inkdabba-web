# INK DABBA Website

A poster-first studio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis
- Lucide React

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
```

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    contact/page.tsx
    services/page.tsx
    work/page.tsx
    work/archive/page.tsx
  components/
    CursorFollower.tsx
    MagneticButton.tsx
    SmoothScroll.tsx
    home/
      CampaignPage.tsx
      CinematicPreloader.tsx
      ContactFormCard.tsx
      ContactSection.tsx
      FadeIn.tsx
      HeroSection.tsx
      HomeChrome.tsx
      ImpactSection.tsx
      InterludeSection.tsx
      SelectedWorkSection.tsx
      SignatureBandSection.tsx
      ThesisSection.tsx
      WhySection.tsx
    ui/
      vertical-image-stack.tsx
  data/
    site-content.ts
public/
  image/
    banner/
    label/
    logo/
    poster/
  logo/
```

## Key Notes

- The homepage is composed in `src/components/home/CampaignPage.tsx`.
- Homepage sections live in `src/components/home/`.
- Reusable UI primitives live in `src/components/ui/`.
- Work imagery is organized by category inside `public/image/`.

## Cleanup Status

This repository has been trimmed to remove old unused home components, generated image leftovers, duplicate logo assets, and local build artifacts that do not belong in source structure.
