# Project Scaffolding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up an Astro 5 + Svelte 5 + Tailwind CSS v4 project with Stripe-inspired design tokens for the PersonalizeJS landing page.

**Architecture:** Single Astro project with Svelte integration for interactive components and Tailwind CSS v4 for styling. Design tokens follow Stripe's aesthetic with deep navy headings, indigo accents, and Inter font.

**Tech Stack:** Astro 5, Svelte 5, Tailwind CSS v4, Inter font (Google Fonts)

## Global Constraints

- All colors, spacing, radius values from `docs/stripe-design.css` tokens
- Font: Inter (Google Fonts), weights 300/400/500/600
- Tailwind CSS v4 uses `@theme` block (not separate config file)
- Project directory: `/Users/soma/Documents/work/03_coding/websites/personalize-js-landing`
- Currently only `docs/` folder exists

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro`

**Interfaces:**
- Produces: Astro project structure with Svelte and Tailwind integrations
- Produces: Stripe design tokens in `src/styles/global.css`
- Produces: Minimal index page verifying tokens work

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/soma/Documents/work/03_coding/websites/personalize-js-landing
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

Expected: Astro project scaffolding completes, creates `package.json`, `tsconfig.json`, `astro.config.mjs`

- [ ] **Step 2: Install dependencies**

```bash
npm install astro @astrojs/svelte @astrojs/tailwind svelte tailwindcss @tailwindcss/vite
```

Expected: All packages install successfully

- [ ] **Step 3: Configure Astro**

Create/update `astro.config.mjs`:
```js
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

Create `src/styles/global.css`:
```css
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

Create `src/pages/index.astro`:
```astro
---
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

- [ ] **Step 6: Verify build works**

```bash
npm run build
```

Expected: Build completes without errors, output in `dist/` directory

- [ ] **Step 7: Initialize git and commit**

```bash
git init && git add -A && git commit -m "feat: scaffold Astro + Svelte + Tailwind project"
```

Expected: Git repo initialized, all files committed

---

## Execution Handoff

After saving the plan, offer execution choice:

**"Plan complete and saved to `docs/superpowers/plans/2026-06-25-project-scaffolding.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?"**

**If Subagent-Driven chosen:**
- **REQUIRED SUB-SKILL:** Use superpowers:subagent-driven-development
- Fresh subagent per task + two-stage review

**If Inline Execution chosen:**
- **REQUIRED SUB-SKILL:** Use superpowers:executing-plans
- Batch execution with checkpoints for review
