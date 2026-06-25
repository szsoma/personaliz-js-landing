# PersonalizeJS Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full 14-section landing page for a URL-based personalization script with Stripe-inspired design, Astro + Svelte + Tailwind CSS, and an animated subscribe popup.

**Architecture:** Single Astro page (`index.astro`) with 14 section components. Static sections are pure Astro. Three interactive sections (HeroDemo, CodeWalkthrough, SubscribePopup) are Svelte 5 islands with `client:visible`. Tailwind CSS v4 with Stripe design tokens in `@theme` block.

**Tech Stack:** Astro 5, Svelte 5, Tailwind CSS v4, Inter font (Google Fonts)

## Global Constraints

- All colors, spacing, radius values from `docs/stripe-design.css` tokens
- Font: Inter (Google Fonts), weights 300/400/500/600
- Hero heading: 44px, weight 300, line-height 1.03, letter-spacing -0.02em
- Section headings: 26px, weight 300
- Body text: 16px, weight 400 (default) or 300 (light)
- Labels: 14px, weight 400
- Data attributes use `data-variant="h1"` pattern (not Webflow-specific)
- URL params use `?p_h1=value` pattern
- No Webflow-specific language anywhere — framework-agnostic messaging
- Subscribe popup slides up from bottom after 10 seconds, email-only input
- All SVG icons are inline, 24x24 viewBox, stroke-width 1.5

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro`
- Create: `tailwind.config.mjs` (if needed by v4)

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/soma/Documents/work/03_coding/websites/personalize-js-landing
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
npm install astro @astrojs/svelte @astrojs/tailwind svelte tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Astro**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create global CSS with Stripe tokens**

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-stripe-indigo: #533afd;
  --color-deep-navy: #061b31;
  --color-surface-white: #ffffff;
  --color-slate-body: #50617a;
  --color-subdued-heading: #64748d;
  --color-quiet-surface: #e5edf5;
  --color-pale-background: #f8fafd;
  --color-stripe-orange: #ff6118;
  --color-brand-lavender: #7f7dfc;
  --color-dark-slate: #273951;

  --font-sans: 'Inter', system-ui, sans-serif;

  --spacing-space-1: 2px;
  --spacing-space-2: 4px;
  --spacing-space-3: 6px;
  --spacing-space-4: 8px;
  --spacing-space-5: 10px;
  --spacing-space-6: 12px;
  --spacing-space-7: 16px;
  --spacing-space-8: 20px;
  --spacing-space-9: 24px;
  --spacing-space-10: 32px;
  --spacing-space-11: 40px;
  --spacing-space-12: 44px;
  --spacing-space-13: 64px;
  --spacing-space-14: 96px;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 16px;
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-slate-body);
    background-color: var(--color-surface-white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

- [ ] **Step 5: Create minimal index page**

```astro
---
// src/pages/index.astro
import '../styles/global.css';
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PersonalizeJS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <h1 class="text-deep-navy text-4xl font-light">PersonalizeJS</h1>
</body>
</html>
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:4321, page shows "PersonalizeJS" in deep navy.

- [ ] **Step 7: Commit**

```bash
git init && git add -A && git commit -m "feat: scaffold Astro + Svelte + Tailwind project"
```

---

### Task 2: Layout Components (Navbar + Footer)

**Files:**
- Create: `src/components/layout/Navbar.astro`
- Create: `src/components/layout/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Navbar**

```astro
---
// src/components/layout/Navbar.astro
---
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
  <div class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
    <a href="/" class="text-deep-navy text-xl font-semibold tracking-tight">
      Personalize<span class="text-stripe-indigo">JS</span>
    </a>
    <div class="hidden md:flex items-center gap-8">
      <a href="#features" class="text-slate-body text-sm hover:text-deep-navy transition-colors">Features</a>
      <a href="#how-it-works" class="text-slate-body text-sm hover:text-deep-navy transition-colors">How It Works</a>
      <a href="#faq" class="text-slate-body text-sm hover:text-deep-navy transition-colors">FAQ</a>
    </div>
    <a href="#subscribe" class="inline-flex items-center gap-2 rounded-lg bg-stripe-indigo px-5 py-2.5 text-sm font-medium text-white hover:bg-stripe-indigo/90 transition-colors">
      Get early access
    </a>
  </div>
</nav>

<script>
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
    } else {
      navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
    }
  });
</script>
```

- [ ] **Step 2: Create Footer**

```astro
---
// src/components/layout/Footer.astro
---
<footer class="bg-deep-navy text-white/60 py-12">
  <div class="mx-auto max-w-6xl px-6">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="text-white text-lg font-semibold tracking-tight">
        Personalize<span class="text-stripe-indigo">JS</span>
      </div>
      <p class="text-sm">Built for marketers who move faster than their website process.</p>
      <p class="text-sm">&copy; {new Date().getFullYear()} PersonalizeJS. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Add to index page**

```astro
---
// src/pages/index.astro
import '../styles/global.css';
import Navbar from '../components/layout/Navbar.astro';
import Footer from '../components/layout/Footer.astro';
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PersonalizeJS — Turn one page into many campaign-specific landing pages</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <Navbar />
  <main>
    <!-- sections will go here -->
  </main>
  <Footer />
</body>
</html>
```

- [ ] **Step 4: Verify navbar scrolls and footer renders**

Run dev server, check navbar gets white background on scroll, footer shows dark background.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Navbar and Footer layout components"
```

---

### Task 3: Shared UI Components

**Files:**
- Create: `src/components/ui/Button.astro`
- Create: `src/components/ui/Card.astro`
- Create: `src/components/ui/SectionHeading.astro`
- Create: `src/components/ui/Badge.astro`

- [ ] **Step 1: Create Button component**

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const { variant = 'primary', href, size = 'md', class: className = '' } = Astro.props;

const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200';

const variants = {
  primary: 'bg-stripe-indigo text-white hover:bg-stripe-indigo/90 shadow-sm',
  secondary: 'bg-deep-navy text-white hover:bg-deep-navy/90 border border-deep-navy',
  ghost: 'bg-transparent text-stripe-indigo hover:bg-stripe-indigo/5 border border-quiet-surface',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const Tag = href ? 'a' : 'button';
---

<Tag href={href} class={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
  <slot />
</Tag>
```

- [ ] **Step 2: Create Card component**

```astro
---
// src/components/ui/Card.astro
interface Props {
  class?: string;
  padding?: 'sm' | 'md' | 'lg';
}

const { class: className = '', padding = 'md' } = Astro.props;

const paddings = {
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-8',
};
---

<div class={`bg-surface-white rounded-xl border border-quiet-surface ${paddings[padding]} ${className}`}>
  <slot />
</div>
```

- [ ] **Step 3: Create SectionHeading component**

```astro
---
// src/components/ui/SectionHeading.astro
interface Props {
  label?: string;
  class?: string;
  align?: 'left' | 'center';
}

const { label, class: className = '', align = 'center' } = Astro.props;
---

<div class={`${align === 'center' ? 'text-center' : ''} ${className}`}>
  {label && (
    <span class="text-stripe-indigo text-xs font-semibold uppercase tracking-widest mb-3 block">{label}</span>
  )}
  <slot />
</div>
```

- [ ] **Step 4: Create Badge component**

```astro
---
// src/components/ui/Badge.astro
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---

<span class={`inline-flex items-center gap-1.5 text-xs font-medium text-stripe-indigo bg-stripe-indigo/5 px-3 py-1 rounded-full ${className}`}>
  <slot />
</span>
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add shared UI components (Button, Card, SectionHeading, Badge)"
```

---

### Task 4: Hero Section + HeroDemo Svelte Island

**Files:**
- Create: `src/components/sections/Hero.astro`
- Create: `src/components/interactive/HeroDemo.svelte`

- [ ] **Step 1: Create HeroDemo.svelte**

```svelte
<script>
  import { onMount } from 'svelte';

  const demos = [
    {
      url: '?p_h1=ERP_demo_for_growing_teams&p_cta=Book_a_demo',
      headline: 'ERP demo for growing teams',
      cta: 'Book a demo',
    },
    {
      url: '?p_h1=Scale_your_SaaS_website&p_cta=Start_free_trial',
      headline: 'Scale your SaaS website',
      cta: 'Start free trial',
    },
    {
      url: '?p_h1=Enterprise_automation_platform&p_cta=Talk_to_sales',
      headline: 'Enterprise automation platform',
      cta: 'Talk to sales',
    },
  ];

  let current = $state(0);
  let typedUrl = $state('');
  let isTyping = $state(false);
  let isPaused = $state(false);
  let interval: ReturnType<typeof setInterval>;

  function typeUrl(url: string) {
    isTyping = true;
    typedUrl = '';
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < url.length) {
        typedUrl += url[i];
        i++;
      } else {
        clearInterval(typeInterval);
        isTyping = false;
      }
    }, 40);
  }

  function nextDemo() {
    current = (current + 1) % demos.length;
    typeUrl(demos[current].url);
  }

  onMount(() => {
    typeUrl(demos[current].url);
    interval = setInterval(() => {
      if (!isPaused && !isTyping) {
        setTimeout(nextDemo, 2000);
      }
    }, 6000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="relative rounded-xl border border-quiet-surface bg-surface-white shadow-lg overflow-hidden"
  onmouseenter={() => isPaused = true}
  onmouseleave={() => isPaused = false}
  role="presentation"
>
  <!-- Browser chrome -->
  <div class="flex items-center gap-2 border-b border-quiet-surface bg-pale-background px-4 py-3">
    <div class="flex gap-1.5">
      <div class="h-3 w-3 rounded-full bg-red-400/60"></div>
      <div class="h-3 w-3 rounded-full bg-yellow-400/60"></div>
      <div class="h-3 w-3 rounded-full bg-green-400/60"></div>
    </div>
    <div class="flex-1 ml-3">
      <div class="bg-surface-white rounded-md border border-quiet-surface px-3 py-1.5 text-xs text-subdued-heading font-mono truncate">
        https://yoursite.com/landing{#if typedUrl}<span class="text-stripe-indigo">{typedUrl}</span>{/if}<span class="animate-pulse">|</span>
      </div>
    </div>
  </div>

  <!-- Page mockup -->
  <div class="p-8 md:p-12">
    <div class="mb-3">
      <span class="inline-block rounded-full bg-stripe-indigo/10 px-3 py-1 text-xs font-medium text-stripe-indigo">
        URL param → page element
      </span>
    </div>
    <h3 class="text-deep-navy text-2xl md:text-3xl font-light mb-4 leading-tight transition-all duration-500">
      {demos[current].headline}
    </h3>
    <p class="text-slate-body text-base mb-6 max-w-md leading-relaxed">
      Book a demo with our team to see how it works for your business.
    </p>
    <div class="flex items-center gap-3">
      <span class="inline-flex items-center rounded-lg bg-stripe-indigo px-5 py-2.5 text-sm font-medium text-white transition-all duration-500">
        {demos[current].cta}
      </span>
      <span class="text-xs text-subdued-heading">
        ← Changed from URL
      </span>
    </div>
  </div>

  <!-- Labels -->
  <div class="flex gap-4 border-t border-quiet-surface bg-pale-background px-6 py-3">
    <span class="text-xs text-subdued-heading flex items-center gap-1.5">
      <span class="h-2 w-2 rounded-full bg-stripe-indigo"></span>
      p_h1 → headline
    </span>
    <span class="text-xs text-subdued-heading flex items-center gap-1.5">
      <span class="h-2 w-2 rounded-full bg-stripe-orange"></span>
      p_cta → button
    </span>
  </div>
</div>
```

- [ ] **Step 2: Create Hero section**

```astro
---
// src/components/sections/Hero.astro
import Button from '../ui/Button.astro';
import HeroDemo from '../interactive/HeroDemo.svelte';
---

<section class="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
  <!-- Subtle background gradient -->
  <div class="absolute inset-0 bg-gradient-to-b from-pale-background to-surface-white pointer-events-none"></div>

  <div class="relative mx-auto max-w-6xl px-6">
    <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <!-- Left: Copy -->
      <div>
        <h1 class="text-deep-navy text-4xl md:text-5xl lg:text-[44px] font-light leading-[1.03] tracking-tight mb-6">
          Turn one page into many campaign-specific landing pages
        </h1>
        <p class="text-slate-body text-base md:text-lg leading-relaxed mb-8 max-w-lg">
          Change headlines, subtitles, CTAs, links, and sections based on URL parameters, UTMs, referrer, returning visitors, location, time, or past behavior. No duplicate pages. No backend. No complex setup.
        </p>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <Button href="#subscribe" size="lg">Get early access</Button>
          <Button href="#how-it-works" variant="ghost" size="lg">See how it works</Button>
        </div>
        <p class="text-subdued-heading text-sm">
          Built for PPC teams, CMOs, agencies, and growth-focused websites.
        </p>
      </div>

      <!-- Right: Demo -->
      <div class="relative">
        <HeroDemo client:visible />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add Hero to index page**

```astro
---
// src/pages/index.astro
import '../styles/global.css';
import Navbar from '../components/layout/Navbar.astro';
import Footer from '../components/layout/Footer.astro';
import Hero from '../components/sections/Hero.astro';
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PersonalizeJS — Turn one page into many campaign-specific landing pages</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <Navbar />
  <main>
    <Hero />
  </main>
  <Footer />
</body>
</html>
```

- [ ] **Step 4: Verify hero renders with animated demo**

Run dev server, check hero shows two-column layout with animated URL demo cycling through examples.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Hero section with animated HeroDemo"
```

---

### Task 5: Problem Section

**Files:**
- Create: `src/components/sections/Problem.astro`

- [ ] **Step 1: Create Problem section**

```astro
---
// src/components/sections/Problem.astro
import SectionHeading from '../ui/SectionHeading.astro';
import Card from '../ui/Card.astro';

const problems = [
  {
    title: 'Generic landing pages lower relevance',
    description: 'Your ad says one thing. Your page says another. That gap can reduce trust and conversions.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
  {
    title: 'Duplicate pages are messy',
    description: 'Creating one page per campaign means more work, more QA, more clutter, and more things to maintain.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  },
  {
    title: 'Developers become the bottleneck',
    description: 'Simple campaign changes should not require new templates, custom code requests, or another sprint.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
];
---

<section class="py-20 md:py-28 bg-pale-background">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="The problem">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        Your ads are specific. Your landing page is usually not.
      </h2>
      <p class="text-slate-body text-base leading-relaxed max-w-2xl mx-auto">
        PPC teams create highly specific campaigns for different audiences, industries, offers, and keywords.
        But most traffic still lands on the same generic page. That creates a message mismatch.
      </p>
    </SectionHeading>

    <div class="grid md:grid-cols-3 gap-6 mt-12">
      {problems.map((problem) => (
        <Card>
          <div class="text-stripe-indigo mb-4" set:html={problem.icon} />
          <h3 class="text-deep-navy text-lg font-medium mb-2">{problem.title}</h3>
          <p class="text-slate-body text-sm leading-relaxed">{problem.description}</p>
        </Card>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<Problem />` after `<Hero />` in index.astro.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Problem section with 3 cards"
```

---

### Task 6: VSL Section + CodeWalkthrough Svelte Island

**Files:**
- Create: `src/components/sections/VSL.astro`
- Create: `src/components/interactive/CodeWalkthrough.svelte`

- [ ] **Step 1: Create CodeWalkthrough.svelte**

```svelte
<script>
  import { onMount } from 'svelte';

  const steps = [
    {
      title: 'Add a data attribute',
      code: '<h1 data-variant="h1">Default headline</h1>\n<a data-variant="cta" data-href="cta">Get started</a>',
      highlight: 'data-variant="h1"',
    },
    {
      title: 'Use a campaign URL',
      code: 'https://yoursite.com/page?p_h1=ERP_demo&p_cta=Book_a_demo',
      highlight: 'p_h1=ERP_demo',
    },
    {
      title: 'The page updates automatically',
      code: '<h1>ERP demo</h1>\n<a href="/demo">Book a demo</a>',
      highlight: 'ERP demo',
    },
  ];

  let activeStep = $state(0);
  let isVisible = $state(false);

  onMount(() => {
    isVisible = true;
    const interval = setInterval(() => {
      activeStep = (activeStep + 1) % steps.length;
    }, 3000);
    return () => clearInterval(interval);
  });
</script>

<div class="space-y-4">
  {#each steps as step, i}
    <div
      class="rounded-xl border transition-all duration-500 {i === activeStep ? 'border-stripe-indigo/30 bg-surface-white shadow-md' : 'border-quiet-surface bg-pale-background opacity-50'}"
    >
      <div class="flex items-center gap-3 px-5 py-3 border-b border-quiet-surface/50">
        <span class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold {i === activeStep ? 'bg-stripe-indigo text-white' : 'bg-quiet-surface text-subdued-heading'}">
          {i + 1}
        </span>
        <span class="text-sm font-medium text-deep-navy">{step.title}</span>
      </div>
      <div class="p-5">
        <pre class="text-sm font-mono text-deep-navy whitespace-pre-wrap leading-relaxed">{step.code}</pre>
      </div>
    </div>
  {/each}
</div>
```

- [ ] **Step 2: Create VSL section**

```astro
---
// src/components/sections/VSL.astro
import SectionHeading from '../ui/SectionHeading.astro';
import Button from '../ui/Button.astro';
import CodeWalkthrough from '../interactive/CodeWalkthrough.svelte';

const bullets = [
  'Change text and CTAs from URL params',
  'Show or hide sections based on visitor context',
  'Keep one page for many campaigns',
];
---

<section class="py-20 md:py-28">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="How it works">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        See how one URL changes the page
      </h2>
    </SectionHeading>

    <div class="grid md:grid-cols-2 gap-12 mt-12 items-start">
      <!-- Left: Code walkthrough -->
      <CodeWalkthrough client:visible />

      <!-- Right: Bullets -->
      <div class="space-y-6">
        {bullets.map((bullet) => (
          <div class="flex items-start gap-3">
            <span class="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-stripe-indigo/10 flex items-center justify-center">
              <svg class="w-3 h-3 text-stripe-indigo" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            </span>
            <span class="text-slate-body text-base">{bullet}</span>
          </div>
        ))}

        <div class="pt-4">
          <Button href="#subscribe">Show me the script</Button>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add to index page and verify**

Import and add `<VSL />` after `<Problem />`.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add VSL section with CodeWalkthrough animation"
```

---

### Task 7: CTA Band + Social Proof

**Files:**
- Create: `src/components/sections/CTABand.astro`
- Create: `src/components/sections/SocialProof.astro`

- [ ] **Step 1: Create CTABand**

```astro
---
// src/components/sections/CTABand.astro
import Button from '../ui/Button.astro';
---

<section class="py-12 md:py-16 bg-deep-navy">
  <div class="mx-auto max-w-3xl px-6 text-center">
    <h2 class="text-white text-xl md:text-2xl font-light mb-6">
      Want campaign-specific pages without duplicating pages?
    </h2>
    <Button href="#subscribe" size="lg" class="bg-stripe-indigo hover:bg-stripe-indigo/90">
      Get early access
    </Button>
    <p class="text-white/50 text-sm mt-4">
      For PPC teams, CMOs, agencies, and website owners.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Create SocialProof**

```astro
---
// src/components/sections/SocialProof.astro
import SectionHeading from '../ui/SectionHeading.astro';
import Card from '../ui/Card.astro';

const cards = [
  {
    title: 'Designed for PPC workflows',
    description: 'Campaign URLs, UTM logic, ad message match, and fast landing page iteration.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    title: 'Works with any website',
    description: 'HTML, Webflow, WordPress, Next.js, any framework. Just add a script tag.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  },
  {
    title: 'No heavy platform required',
    description: 'A lightweight script, not a full enterprise personalization suite.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  },
];
---

<section class="py-20 md:py-28 bg-pale-background">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="Why trust us">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        Built around how modern PPC landing pages actually work
      </h2>
    </SectionHeading>

    <div class="grid md:grid-cols-3 gap-6 mt-12">
      {cards.map((card) => (
        <Card>
          <div class="text-stripe-indigo mb-4" set:html={card.icon} />
          <h3 class="text-deep-navy text-lg font-medium mb-2">{card.title}</h3>
          <p class="text-slate-body text-sm leading-relaxed">{card.description}</p>
        </Card>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add to index page and verify**

Import and add `<CTABand />` then `<SocialProof />` after `<VSL />`.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add CTABand and SocialProof sections"
```

---

### Task 8: Benefits Section

**Files:**
- Create: `src/components/sections/Benefits.astro`

- [ ] **Step 1: Create Benefits section**

```astro
---
// src/components/sections/Benefits.astro
import SectionHeading from '../ui/SectionHeading.astro';

const benefits = [
  {
    title: 'Match every campaign to the landing page',
    description: 'Change the headline, subtitle, CTA text, CTA link, and sections based on the visitor\'s campaign URL.',
    example: 'A Google Ads campaign for ERP visitors lands on "Book your ERP demo". A LinkedIn campaign for SaaS founders lands on "Scale your SaaS website faster".',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  },
  {
    title: 'Launch more angles without creating more pages',
    description: 'Instead of duplicating a page for every campaign, use one page and let the URL change the message.',
    example: 'One landing page supports: SaaS campaigns, ERP campaigns, founder campaigns, enterprise campaigns, retargeting campaigns.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  },
  {
    title: 'Personalize without a heavy tool or developer queue',
    description: 'Use simple data attributes and a small script. No backend, no complex platform, no full rebuild.',
    example: 'Add: data-variant="h1" — Then use: ?p_h1=Grow_your_business_online',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
];
---

<section class="py-20 md:py-28">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="Benefits">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        Why PPC teams and CMOs use it
      </h2>
    </SectionHeading>

    <div class="space-y-8 mt-12">
      {benefits.map((benefit, i) => (
        <div class="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-xl border border-quiet-surface bg-surface-white">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-xl bg-stripe-indigo/10 flex items-center justify-center text-stripe-indigo" set:html={benefit.icon} />
          </div>
          <div>
            <h3 class="text-deep-navy text-lg md:text-xl font-medium mb-2">{benefit.title}</h3>
            <p class="text-slate-body text-base leading-relaxed mb-3">{benefit.description}</p>
            <p class="text-subdued-heading text-sm bg-pale-background rounded-lg px-4 py-3 font-mono">
              {benefit.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<Benefits />` after `<SocialProof />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Benefits section"
```

---

### Task 9: Before/After Section

**Files:**
- Create: `src/components/sections/BeforeAfter.astro`

- [ ] **Step 1: Create BeforeAfter section**

```astro
---
// src/components/sections/BeforeAfter.astro
import SectionHeading from '../ui/SectionHeading.astro';
---

<section class="py-20 md:py-28 bg-pale-background">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="See the difference">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        From generic page to campaign-specific page
      </h2>
    </SectionHeading>

    <div class="grid md:grid-cols-2 gap-8 mt-12">
      <!-- Before -->
      <div class="rounded-xl border border-quiet-surface bg-surface-white overflow-hidden">
        <div class="flex items-center gap-2 border-b border-quiet-surface bg-pale-background px-4 py-3">
          <div class="flex gap-1.5">
            <div class="h-3 w-3 rounded-full bg-red-400/60"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-400/60"></div>
            <div class="h-3 w-3 rounded-full bg-green-400/60"></div>
          </div>
          <div class="flex-1 ml-3">
            <div class="bg-surface-white rounded-md border border-quiet-surface px-3 py-1.5 text-xs text-subdued-heading font-mono">
              /landing-page
            </div>
          </div>
        </div>
        <div class="p-6 md:p-8">
          <span class="inline-block text-xs font-medium text-subdued-heading bg-quiet-surface rounded-full px-3 py-1 mb-4">Before</span>
          <h3 class="text-deep-navy text-xl md:text-2xl font-light mb-3">Grow your business with better software</h3>
          <p class="text-slate-body text-sm mb-4">Book a demo with our team to see how it works.</p>
          <span class="inline-flex items-center rounded-lg bg-quiet-surface px-5 py-2.5 text-sm font-medium text-subdued-heading">
            Contact us
          </span>
        </div>
      </div>

      <!-- After -->
      <div class="rounded-xl border border-stripe-indigo/20 bg-surface-white overflow-hidden shadow-md">
        <div class="flex items-center gap-2 border-b border-quiet-surface bg-pale-background px-4 py-3">
          <div class="flex gap-1.5">
            <div class="h-3 w-3 rounded-full bg-red-400/60"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-400/60"></div>
            <div class="h-3 w-3 rounded-full bg-green-400/60"></div>
          </div>
          <div class="flex-1 ml-3">
            <div class="bg-surface-white rounded-md border border-quiet-surface px-3 py-1.5 text-xs font-mono">
              /landing-page<span class="text-stripe-indigo">?p_h1=ERP_demo_for_growing_teams&p_cta=Book_a_demo</span>
            </div>
          </div>
        </div>
        <div class="p-6 md:p-8">
          <span class="inline-block text-xs font-medium text-stripe-indigo bg-stripe-indigo/10 rounded-full px-3 py-1 mb-4">After</span>
          <h3 class="text-deep-navy text-xl md:text-2xl font-light mb-3">ERP demo for growing teams</h3>
          <p class="text-slate-body text-sm mb-4">Book a demo with our team to see how it works.</p>
          <span class="inline-flex items-center rounded-lg bg-stripe-indigo px-5 py-2.5 text-sm font-medium text-white">
            Book a demo
          </span>
        </div>
      </div>
    </div>

    <p class="text-center text-subdued-heading text-sm mt-8">
      The page is the same. The message changes based on the URL.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<BeforeAfter />` after `<Benefits />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Before/After comparison section"
```

---

### Task 10: How It Works Section

**Files:**
- Create: `src/components/sections/HowItWorks.astro`

- [ ] **Step 1: Create HowItWorks section**

```astro
---
// src/components/sections/HowItWorks.astro
import SectionHeading from '../ui/SectionHeading.astro';

const steps = [
  {
    number: '01',
    title: 'Add the script to your site',
    description: 'Paste one script tag into your HTML.',
    code: '<script src="https://cdn.personalizejs.com/p13n.min.js" defer></script>',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    number: '02',
    title: 'Mark the content you want to personalize',
    description: 'Add simple data attributes to your elements.',
    code: '<h1 data-variant="h1">Default headline</h1>\n<a data-variant="cta" data-href="cta">Get started</a>',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  },
  {
    number: '03',
    title: 'Send traffic with personalized URLs',
    description: 'Use URL parameters in your ad links, emails, or campaigns.',
    code: 'https://yoursite.com/page?p_h1=ERP_demo&p_cta=Book_a_demo',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
];
---

<section class="py-20 md:py-28" id="how-it-works">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="Setup">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        How it works
      </h2>
    </SectionHeading>

    <div class="space-y-8 mt-12">
      {steps.map((step) => (
        <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div class="flex-shrink-0 flex items-center gap-4">
            <span class="text-3xl font-light text-stripe-indigo/30">{step.number}</span>
            <div class="w-10 h-10 rounded-lg bg-stripe-indigo/10 flex items-center justify-center text-stripe-indigo" set:html={step.icon} />
          </div>
          <div class="flex-1">
            <h3 class="text-deep-navy text-lg font-medium mb-2">{step.title}</h3>
            <p class="text-slate-body text-base mb-4">{step.description}</p>
            <pre class="bg-pale-background rounded-lg border border-quiet-surface p-4 text-sm font-mono text-deep-navy overflow-x-auto"><code>{step.code}</code></pre>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<HowItWorks />` after `<BeforeAfter />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add How It Works section"
```

---

### Task 11: What's Included Section

**Files:**
- Create: `src/components/sections/WhatsIncluded.astro`

- [ ] **Step 1: Create WhatsIncluded section**

```astro
---
// src/components/sections/WhatsIncluded.astro
import SectionHeading from '../ui/SectionHeading.astro';

const features = [
  { title: 'URL parameter personalization', description: 'Change page content from URL values like p_h1, p_subtitle, and p_cta.' },
  { title: 'UTM-based rules', description: 'Show, hide, or change content based on utm_source, utm_medium, or utm_campaign.' },
  { title: 'CTA text and link swaps', description: 'Change the button label and destination URL for different campaigns.' },
  { title: 'Show and hide sections', description: 'Display specific sections only when visitor conditions match.' },
  { title: 'Returning visitor messages', description: 'Show different content to people who have visited before.' },
  { title: 'Referrer-based personalization', description: 'Change content for visitors coming from Google, LinkedIn, or other sources.' },
  { title: 'Behavior-based personalization', description: 'Adapt content based on previous clicks, viewed pages, or submitted forms.' },
  { title: 'Segment memory', description: 'Remember useful values like industry or persona across pages.' },
  { title: 'Simple data attributes', description: 'Use straightforward attributes instead of a complex setup.' },
  { title: 'Lightweight script', description: 'Client-side, fast, and designed for marketing sites.' },
];
---

<section class="py-20 md:py-28 bg-pale-background">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="Features">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        Everything you need for lightweight landing page personalization
      </h2>
    </SectionHeading>

    <div class="grid md:grid-cols-2 gap-4 mt-12">
      {features.map((feature) => (
        <div class="flex items-start gap-3 p-4 rounded-lg hover:bg-surface-white transition-colors">
          <span class="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-stripe-indigo/10 flex items-center justify-center">
            <svg class="w-3 h-3 text-stripe-indigo" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </span>
          <div>
            <h3 class="text-deep-navy text-sm font-medium mb-1">{feature.title}</h3>
            <p class="text-slate-body text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<WhatsIncluded />` after `<HowItWorks />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add What's Included feature grid section"
```

---

### Task 12: CTA + About Us + Trust Sections

**Files:**
- Create: `src/components/sections/CTA.astro`
- Create: `src/components/sections/AboutUs.astro`
- Create: `src/components/sections/Trust.astro`

- [ ] **Step 1: Create CTA section**

```astro
---
// src/components/sections/CTA.astro
import Button from '../ui/Button.astro';
---

<section class="py-20 md:py-28">
  <div class="mx-auto max-w-3xl px-6 text-center">
    <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
      Ready to make your landing pages match your campaigns?
    </h2>
    <p class="text-slate-body text-base mb-8">
      Use one page for many PPC messages, audiences, and offers.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <Button href="#subscribe" size="lg">Get early access</Button>
      <Button href="#how-it-works" variant="ghost" size="lg">View setup example</Button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create AboutUs section**

```astro
---
// src/components/sections/AboutUs.astro
---

<section class="py-20 md:py-28 bg-pale-background">
  <div class="mx-auto max-w-3xl px-6">
    <span class="text-stripe-indigo text-xs font-semibold uppercase tracking-widest mb-3 block text-center">About us</span>
    <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-6 text-center">
      Built for marketers who move faster than their website process
    </h2>
    <div class="space-y-4 text-slate-body text-base leading-relaxed">
      <p>
        Most personalization tools are too heavy for simple campaign landing pages. Most teams do not need a full enterprise platform just to change a headline for a Google Ads campaign.
      </p>
      <p>
        This script is built for the gap in between. It gives PPC teams, CMOs, and website owners a simple way to improve message match, launch campaign variants faster, and reduce page duplication.
      </p>
      <p>
        No complex platform. No backend setup. No waiting for a developer to create another page version.
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create Trust section**

```astro
---
// src/components/sections/Trust.astro
import SectionHeading from '../ui/SectionHeading.astro';

const badges = [
  {
    title: 'Safe by default',
    description: 'The script uses text replacement, not unsafe HTML injection.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    title: 'No tracking by default',
    description: 'Runs client-side without sending visitor data anywhere.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  },
  {
    title: 'Works with existing pages',
    description: 'Add attributes to the elements you already have.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  },
  {
    title: 'Built for campaign speed',
    description: 'Launch new message angles by changing URLs, not duplicating pages.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  },
];
---

<section class="py-20 md:py-28">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading label="Trust">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        Simple enough for marketers. Structured enough for serious teams.
      </h2>
    </SectionHeading>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {badges.map((badge) => (
        <div class="text-center p-6 rounded-xl border border-quiet-surface">
          <div class="w-10 h-10 rounded-lg bg-stripe-indigo/10 flex items-center justify-center text-stripe-indigo mx-auto mb-4" set:html={badge.icon} />
          <h3 class="text-deep-navy text-sm font-medium mb-2">{badge.title}</h3>
          <p class="text-slate-body text-sm">{badge.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add all three to index page**

Import and add `<CTA />`, `<AboutUs />`, `<Trust />` after `<WhatsIncluded />`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add CTA, AboutUs, and Trust sections"
```

---

### Task 13: FAQ Section

**Files:**
- Create: `src/components/sections/FAQ.astro`

- [ ] **Step 1: Create FAQ section**

```astro
---
// src/components/sections/FAQ.astro
import SectionHeading from '../ui/SectionHeading.astro';

const faqs = [
  {
    q: 'Is this an A/B testing tool?',
    a: 'Not exactly. It is a lightweight personalization script. It helps you change content based on URL params, UTMs, visitor behavior, and context. A/B testing can be added later, but the first goal is better campaign message match.',
  },
  {
    q: 'Do I need to duplicate pages?',
    a: 'No. That is the main point. You can keep one page and use URL parameters to change selected content for different campaigns.',
  },
  {
    q: 'Can marketers use this without developers?',
    a: 'Yes. After the script is installed, marketers can create campaign URLs that change approved elements on the page. Data attributes define which elements can be changed.',
  },
  {
    q: 'Can it change button links?',
    a: 'Yes. You can change CTA text and CTA URLs. For example, one campaign can send visitors to /demo, while another sends them to /pricing.',
  },
  {
    q: 'Does it work with Google Ads and LinkedIn Ads?',
    a: 'Yes. You can use personalized URLs in Google Ads, LinkedIn Ads, Meta Ads, email campaigns, partner links, or any traffic source that allows URL parameters.',
  },
  {
    q: 'Is it safe to let the URL change page text?',
    a: 'The script uses safe text replacement through textContent, not innerHTML. It also blocks unsafe values and unsafe CTA URLs.',
  },
  {
    q: 'Will this hurt page speed?',
    a: 'The script is lightweight and runs client-side. It only scans elements that use personalization attributes.',
  },
  {
    q: 'What can I personalize?',
    a: 'You can personalize headlines, subtitles, CTA text, CTA links, images, section visibility, returning visitor messages, and campaign-specific blocks.',
  },
  {
    q: 'Who is this for?',
    a: 'It is for PPC teams, CMOs, growth marketers, agencies, and website owners who want more relevant landing pages without rebuilding their process.',
  },
  {
    q: 'What is the simplest use case?',
    a: 'Add a data attribute to a headline, then change it from the URL. Add data-variant="h1" to your h1, then use ?p_h1=Grow_your_business_online.',
  },
];
---

<section class="py-20 md:py-28 bg-pale-background" id="faq">
  <div class="mx-auto max-w-3xl px-6">
    <SectionHeading label="FAQ">
      <h2 class="text-deep-navy text-2xl md:text-[26px] font-light leading-tight tracking-tight mb-4">
        Frequently asked questions
      </h2>
    </SectionHeading>

    <div class="space-y-3 mt-12">
      {faqs.map((faq) => (
        <details class="group rounded-xl border border-quiet-surface bg-surface-white">
          <summary class="flex items-center justify-between cursor-pointer p-5 text-deep-navy font-medium text-base list-none">
            {faq.q}
            <svg class="w-5 h-5 text-subdued-heading transition-transform group-open:rotate-180 flex-shrink-0 ml-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div class="px-5 pb-5 text-slate-body text-sm leading-relaxed">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<FAQ />` after `<Trust />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add FAQ accordion section"
```

---

### Task 14: Final CTA Section

**Files:**
- Create: `src/components/sections/FinalCTA.astro`

- [ ] **Step 1: Create FinalCTA section**

```astro
---
// src/components/sections/FinalCTA.astro
import Button from '../ui/Button.astro';
---

<section class="py-20 md:py-28 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-deep-navy via-deep-navy to-stripe-indigo/20"></div>
  <div class="relative mx-auto max-w-3xl px-6 text-center">
    <h2 class="text-white text-3xl md:text-4xl font-light leading-tight tracking-tight mb-4">
      Stop sending specific ads to generic landing pages
    </h2>
    <p class="text-white/60 text-base md:text-lg mb-8">
      Personalize landing pages from campaign URLs, UTMs, visitor behavior, and more.
    </p>
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <Button href="#subscribe" size="lg" class="bg-white text-deep-navy hover:bg-white/90">Get early access</Button>
      <Button href="#how-it-works" variant="ghost" size="lg" class="border-white/20 text-white hover:bg-white/10">See setup example</Button>
    </div>
    <p class="text-white/40 text-sm">
      Built for marketing sites and PPC campaign teams.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Add to index page and verify**

Import and add `<FinalCTA />` after `<FAQ />`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Final CTA section"
```

---

### Task 15: SubscribePopup Svelte Island

**Files:**
- Create: `src/components/interactive/SubscribePopup.svelte`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create SubscribePopup.svelte**

```svelte
<script>
  import { onMount } from 'svelte';

  let isVisible = $state(false);
  let email = $state('');
  let isSubmitted = $state(false);
  let isValid = $state(true);

  function validateEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function handleSubmit() {
    if (!validateEmail(email)) {
      isValid = false;
      return;
    }
    isValid = true;
    isSubmitted = true;
  }

  function dismiss() {
    isVisible = false;
    sessionStorage.setItem('p13n-popup-dismissed', 'true');
  }

  onMount(() => {
    const dismissed = sessionStorage.getItem('p13n-popup-dismissed');
    if (!dismissed) {
      setTimeout(() => {
        isVisible = true;
      }, 10000);
    }
  });
</script>

{#if isVisible}
  <div
    class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    style="animation: slideUp 0.4s ease-out forwards;"
  >
    <div class="mx-auto max-w-2xl bg-surface-white rounded-2xl shadow-xl border border-quiet-surface overflow-hidden">
      <div class="flex items-center justify-between p-4 md:p-5">
        <div class="flex-1">
          {#if isSubmitted}
            <div class="flex items-center gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <p class="text-deep-navy font-medium text-sm">You're on the list!</p>
                <p class="text-subdued-heading text-xs">We'll notify you when we launch.</p>
              </div>
            </div>
          {:else}
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div class="flex-1">
                <p class="text-deep-navy font-medium text-sm">Get early access</p>
                <p class="text-subdued-heading text-xs">Be the first to know when we launch.</p>
              </div>
              <form
                class="flex gap-2"
                onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
              >
                <input
                  type="email"
                  bind:value={email}
                  placeholder="you@company.com"
                  class="flex-1 md:w-56 px-4 py-2.5 text-sm rounded-lg border {isValid ? 'border-quiet-surface' : 'border-red-400'} bg-pale-background text-deep-navy placeholder:text-subdued-heading focus:outline-none focus:border-stripe-indigo focus:ring-1 focus:ring-stripe-indigo/20 transition-colors"
                />
                <button
                  type="submit"
                  class="flex-shrink-0 px-5 py-2.5 text-sm font-medium text-white bg-stripe-indigo rounded-lg hover:bg-stripe-indigo/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          {/if}
        </div>
        <button
          onclick={dismiss}
          class="flex-shrink-0 ml-4 w-8 h-8 rounded-lg flex items-center justify-center text-subdued-heading hover:text-deep-navy hover:bg-pale-background transition-colors"
          aria-label="Dismiss"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
```

- [ ] **Step 2: Add SubscribePopup to index page**

Add `import SubscribePopup from '../components/interactive/SubscribePopup.svelte';` and `<SubscribePopup client:load />` before the closing `</body>` tag in index.astro.

- [ ] **Step 3: Verify popup appears after 10 seconds**

Run dev server, wait 10 seconds, verify popup slides up from bottom. Test dismiss button and form submission.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add SubscribePopup with 10s delay and dismiss"
```

---

### Task 16: Final Assembly + Polish

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Assemble all sections in index.astro**

Ensure all 14 sections are imported and rendered in order:
1. Navbar
2. Hero
3. Problem
4. VSL
5. CTABand
6. SocialProof
7. Benefits
8. BeforeAfter
9. HowItWorks
10. WhatsIncluded
11. CTA
12. AboutUs
13. Trust
14. FAQ
15. FinalCTA
16. Footer
17. SubscribePopup (client:load)

- [ ] **Step 2: Add smooth scroll behavior**

Add to global.css:
```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Add section scroll margin for navbar offset**

Add to global.css:
```css
section[id] {
  scroll-margin-top: 80px;
}
```

- [ ] **Step 4: Run full visual check**

Start dev server and scroll through entire page. Verify:
- All sections render correctly
- Spacing is consistent
- Colors match Stripe palette
- Interactive demos work (HeroDemo cycles, CodeWalkthrough animates)
- FAQ accordion opens/closes
- SubscribePopup appears after 10s
- Navbar changes on scroll
- Responsive layout works on mobile

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: complete landing page assembly with all 14 sections"
```

---

### Task 17: SVG Placeholder Images

**Files:**
- Create: `src/assets/svg/` directory with placeholder SVGs for any section that needs a visual beyond inline icons

- [ ] **Step 1: Create placeholder SVGs as needed**

If any section needs a larger decorative SVG (e.g., a page mockup illustration, a diagram), create simple placeholder SVGs in `src/assets/svg/`. These are temporary and can be replaced with final designs.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: add placeholder SVG assets"
```
