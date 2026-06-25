# PersonalizeJS Landing Page — Design Spec

## Overview

Full landing page for a URL-based personalization script. Framework-agnostic — works with any website (HTML, Webflow, WordPress, Next.js, etc.). Stripe-inspired design language. 14 sections + animated subscribe popup.

## Tech Stack

- **Astro 5** — static site generation, zero JS by default
- **Svelte 5** — 3 interactive islands (HeroDemo, CodeWalkthrough, SubscribePopup)
- **Tailwind CSS v4** — `@theme` block with Stripe design tokens
- **Font** — Inter (closest open-source match to sohne-var)

## Design Language

Stripe-inspired editorial precision. Light theme, pale background (`#f8fafd`), deep navy headings (`#061b31`), indigo accents (`#533afd`). Clean whitespace rhythm. Typography-driven hierarchy with light-weight hero headlines (300 weight). No gradient backgrounds — subtle surface transitions and precise spacing only.

### Color Tokens (from stripe-design.css)

| Token | Value | Usage |
|-------|-------|-------|
| stripe-indigo | #533afd | Primary CTA, links, accent borders |
| deep-navy | #061b31 | Headings, solid text |
| surface-white | #ffffff | Card backgrounds, page surface |
| slate-body | #50617a | Body text, secondary labels |
| subdued-heading | #64748d | Subdued headings, icon fills |
| quiet-surface | #e5edf5 | Borders, dividers, quiet fills |
| pale-background | #f8fafd | Alternating section backgrounds |
| stripe-orange | #ff6118 | Accent (sparingly) |
| brand-lavender | #7f7dfc | Secondary tint |
| dark-slate | #273951 | Input labels, selected text |

### Typography Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Hero heading | 44px | 300 | 1.03 | -0.02em |
| Section heading large | 26px | 300 | 29px | -0.26px |
| Section heading medium | 22px | 300 | 24px | -0.22px |
| Body default | 16px | 400 | 22.4px | normal |
| Body light | 16px | 300 | 22.4px | normal |
| Label | 14px | 400 | 14px | normal |
| Caption | 11px | 300 | 16px | normal |

### Spacing (8px base grid)

2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 44, 64, 96px

### Border Radius

0, 1, 4, 6, 8, 16px

## Project Structure

```
src/
├── components/
│   ├── sections/           # 14 Astro section components
│   │   ├── Hero.astro
│   │   ├── Problem.astro
│   │   ├── VSL.astro
│   │   ├── CTABand.astro
│   │   ├── SocialProof.astro
│   │   ├── Benefits.astro
│   │   ├── BeforeAfter.astro
│   │   ├── HowItWorks.astro
│   │   ├── WhatsIncluded.astro
│   │   ├── CTA.astro
│   │   ├── AboutUs.astro
│   │   ├── Trust.astro
│   │   ├── FAQ.astro
│   │   └── FinalCTA.astro
│   ├── ui/                 # Shared UI components
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   └── SectionHeading.astro
│   ├── interactive/        # Svelte islands
│   │   ├── HeroDemo.svelte
│   │   ├── CodeWalkthrough.svelte
│   │   └── SubscribePopup.svelte
│   └── layout/
│       ├── Navbar.astro
│       └── Footer.astro
├── styles/
│   └── global.css          # Stripe tokens + Tailwind @theme
├── assets/
│   └── svg/                # Inline SVG icons
└── pages/
    └── index.astro         # Main page, imports all sections
```

## Section Specifications

### 1. Hero

**Layout**: Two-column. Left: headline, subheading, CTAs, trust line. Right: animated demo.

**Copy**:
- Headline: "Turn one page into many campaign-specific landing pages"
- Subheading: "Change headlines, subtitles, CTAs, links, and sections based on URL parameters, UTMs, referrer, returning visitors, location, time, or past behavior. No duplicate pages. No backend. No complex setup."
- Primary CTA: "Get early access"
- Secondary CTA: "See how it works"
- Trust line: "Built for PPC teams, CMOs, agencies, and growth-focused websites."

**Interactive (HeroDemo.svelte)**:
- Animated URL bar at top showing params being typed: `?p_h1=ERP_demo_for_growing_teams&p_cta=Book_a_demo`
- Below: a page mockup where headline and CTA text change in real-time
- Highlighted diff showing which words changed
- Cycle through 3 examples automatically (pause on hover)
- Labels: "URL param" → "Page element" → "Live result"

### 2. Problem

**Layout**: Centered text + 3 cards below.

**Copy**:
- Headline: "Your ads are specific. Your landing page is usually not."
- Body: "PPC teams create highly specific campaigns for different audiences, industries, offers, and keywords. But most traffic still lands on the same generic page. That creates a message mismatch."

**Cards**:
1. "Generic landing pages lower relevance" — Your ad says one thing. Your page says another.
2. "Duplicate pages are messy" — Creating one page per campaign means more work, more QA, more clutter.
3. "Developers become the bottleneck" — Simple campaign changes should not require new templates or sprints.

**Icons**: Line SVGs — broken link, stacked pages, hourglass.

### 3. VSL / Product Explanation

**Layout**: Split — left: animated code walkthrough, right: 3 bullets.

**Copy**:
- Headline: "See how one URL changes the page"
- Bullets:
  - Change text and CTAs from URL params
  - Show or hide sections based on visitor context
  - Keep one page for many campaigns
- CTA: "Show me the script"

**Interactive (CodeWalkthrough.svelte)**:
- Step-by-step animation:
  1. Show HTML: `<h1 data-variant="h1">Default headline</h1>`
  2. Show URL: `?p_h1=ERP_demo_for_growing_teams`
  3. Show result: headline changes to "ERP demo for growing teams"
- Each step animates in with staggered delay
- Code blocks use syntax-highlighted styling

### 4. CTA Band

**Layout**: Narrow horizontal band, centered text.

**Copy**:
- Headline: "Want campaign-specific pages without duplicating pages?"
- Button: "Get early access"
- Microcopy: "For PPC teams, CMOs, agencies, and website owners."

### 5. Social Proof

**Layout**: 3 credibility cards (no user testimonials yet).

**Copy**:
- Headline: "Built around how modern PPC landing pages actually work"
- Cards:
  1. "Designed for PPC workflows" — Campaign URLs, UTM logic, ad message match, fast iteration.
  2. "Works with any website" — HTML, Webflow, WordPress, Next.js, any framework.
  3. "No heavy platform required" — A lightweight script, not a full enterprise suite.

### 6. Benefits

**Layout**: 3 horizontal blocks with icons and examples.

**Copy**:
- Headline: "Why PPC teams and CMOs use it"
- Benefit 1: "Match every campaign to the landing page" — Change headline, subtitle, CTA text, CTA link, and sections based on URL.
- Benefit 2: "Launch more angles without creating more pages" — One page supports SaaS, ERP, founder, enterprise, retargeting campaigns.
- Benefit 3: "Personalize without a heavy tool or developer queue" — Simple attributes and a small script. No backend, no complex platform.

### 7. Before/After

**Layout**: Split browser mockups.

**Copy**:
- Headline: "From generic page to campaign-specific page"
- Left (Before): URL `/landing-page` → "Grow your business with better software" / "Contact us"
- Right (After): URL `/landing-page?p_h1=ERP_demo_for_growing_teams&p_cta=Book_a_demo` → "ERP demo for growing teams" / "Book a demo"
- Supporting: "The page is the same. The message changes based on the URL."

### 8. How It Works

**Layout**: 3 numbered steps with code snippets.

**Copy**:
- Headline: "How it works"
- Step 1: "Add the script to your site" — `<script src="https://cdn.personalizejs.com/p13n.min.js" defer></script>`
- Step 2: "Mark the content you want to personalize" — `<h1 data-variant="h1">Default</h1>`
- Step 3: "Send traffic with personalized URLs" — `?p_h1=ERP_demo_for_growing_teams`

### 9. What's Included

**Layout**: 2-column feature grid.

**Copy**:
- Headline: "Everything you need for lightweight landing page personalization"
- Features (10 items):
  1. URL parameter personalization
  2. UTM-based rules
  3. CTA text and link swaps
  4. Show and hide sections
  5. Returning visitor messages
  6. Referrer-based personalization
  7. Behavior-based personalization
  8. Segment memory
  9. Simple data attributes
  10. Lightweight script

### 10. CTA

**Layout**: Strong CTA block.

**Copy**:
- Headline: "Ready to make your landing pages match your campaigns?"
- Subheading: "Use one page for many PPC messages, audiences, and offers."
- Button: "Get early access"
- Secondary: "View setup example"

### 11. About Us

**Layout**: Founder-style section.

**Copy**:
- Headline: "Built for marketers who move faster than their website process"
- Body: "Most personalization tools are too heavy for simple campaign landing pages. This script is built for the gap in between. It gives PPC teams, CMOs, and website owners a simple way to improve message match, launch campaign variants faster, and reduce page duplication. No complex platform. No backend setup. No waiting for a developer."

### 12. Trust

**Layout**: 4 trust badges.

**Copy**:
- Headline: "Simple enough for marketers. Structured enough for serious teams."
- Badges:
  1. "Safe by default" — Text replacement, not unsafe HTML injection.
  2. "No tracking by default" — Runs client-side without sending data anywhere.
  3. "Works with existing pages" — Add attributes to elements you already have.
  4. "Built for campaign speed" — Launch new angles by changing URLs.

### 13. FAQ

**Layout**: Accordion with `<details>`/`<summary>` (zero JS).

**Questions** (10 from content plan, adapted to remove Webflow references):
1. Is this an A/B testing tool?
2. Do I need to duplicate pages?
3. Can marketers use this without developers?
4. Can it change button links?
5. Does it work with Google Ads and LinkedIn Ads?
6. Is it safe to let the URL change page text?
7. Will this hurt page speed?
8. What can I personalize?
9. Who is this for?
10. What is the simplest use case?

### 14. Final CTA

**Layout**: Full-width with subtle surface treatment.

**Copy**:
- Headline: "Stop sending specific ads to generic landing pages"
- Subheading: "Personalize landing pages from campaign URLs, UTMs, visitor behavior, and more."
- Primary CTA: "Get early access"
- Secondary CTA: "See setup example"
- Microcopy: "Built for marketing sites and PPC campaign teams."

### Subscribe Popup (Svelte Island)

**Behavior**:
- Slides up from bottom of viewport after 10 seconds
- Floating bar design, full-width, with shadow
- Email input + "Get early access" button
- Close (X) button dismisses it
- Dismissal stored in sessionStorage (won't reappear until new tab)
- On submit: validate email, show success state ("You're on the list!")
- Entrance animation: `transform: translateY(100%)` → `translateY(0)` with ease-out over 400ms

## Interactive Components

### HeroDemo.svelte
- Auto-cycling demo with 3 URL examples
- URL bar with typing animation
- Page mockup below that updates in sync
- Pause on hover, resume on leave
- CSS transitions for text changes (fade + slide)

### CodeWalkthrough.svelte
- 3-step code animation
- Each step: code block appears → highlight → result appears
- Staggered delays (0s, 2s, 4s)
- Syntax-highlighted code blocks (CSS only, no library)

### SubscribePopup.svelte
- Timer-based trigger (10s)
- Slide-up animation
- Email validation
- Success state transition
- SessionStorage persistence

## Icons

All inline SVGs, line style, 24x24 viewBox. Consistent stroke-width of 1.5.

Icons needed:
- Target/ad
- Stacked pages
- Lightning/code
- Broken link
- Hourglass
- Cursor
- Link
- Shield/safety
- Globe
- Zap
- Eye
- Layers
- Users
- Arrow right
- Close (X)
- Check
- Chevron down (for FAQ)
- Script tag

## Navbar

Fixed top, transparent → white on scroll. Logo left, nav links center, CTA button right.

Links: Features, How It Works, FAQ, Pricing (future)

## Footer

Dark background (`deep-navy`). Logo, tagline, copyright. Minimal — no multi-column links needed for MVP.
