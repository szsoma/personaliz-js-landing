---
version: alpha
name: "Stripe HDS Light"
description: "Typography baseline relies on sohne-var, SF Pro Display, sans-serif for h1 hero headline — large, light-weight, dark navy."
colors:
  brand-lavender: "#7f7dfc"
  pale-background: "#f8fafd"
  surface-white: "#ffffff"
  dark-slate: "#273951"
  slate-body: "#50617a"
  stripe-indigo: "#533afd"
  stripe-orange: "#ff6118"
  subdued-heading: "#64748d"
  deep-navy: "#061b31"
  quiet-surface: "#e5edf5"
typography:
  hero-heading:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "44px"
    fontWeight: "300"
    lineHeight: "1.03"
    letterSpacing: "-0.02em"
  section-heading-large:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "26px"
    fontWeight: "300"
    lineHeight: "29.12px"
    letterSpacing: "-0.26px"
  section-heading-medium:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "22px"
    fontWeight: "300"
    lineHeight: "24.2px"
    letterSpacing: "-0.22px"
  body-default:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "22.4px"
  body-light:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "16px"
    fontWeight: "300"
    lineHeight: "22.4px"
  label-default:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "14px"
  caption-small:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "11px"
    fontWeight: "300"
    lineHeight: "15.95px"
  micro-label:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: "10px"
    fontWeight: "400"
    lineHeight: "14.5px"
    letterSpacing: "0.1px"
rounded:
  radius-none: "0px"
  radius-xs: "1px"
  radius-sm: "4px"
  radius-md: "6px"
  radius-lg: "8px"
  radius-xl: "16px"
spacing:
  space-1: "2px"
  space-2: "4px"
  space-3: "6px"
  space-4: "8px"
  space-5: "10px"
  space-6: "12px"
  space-7: "16px"
  space-8: "20px"
  space-9: "24px"
  space-10: "32px"
  space-11: "40px"
  space-12: "44px"
  space-13: "64px"
  space-14: "96px"
---

## Overview

Typography baseline relies on sohne-var, SF Pro Display, sans-serif for h1 hero headline — large, light-weight, dark navy.

This system uses a 8px base grid with scale values 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 44, 64, 96, 152, 160.

**Signature traits:**
- Core token rhythm: Token evidence indicates consistent color, spacing, and radius rhythm across visible UI.

## Colors

The palette uses 10 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **action-text** maps to `stripe-indigo`: Role "text" is grounded by usage context "Primary brand color — used on primary CTA buttons, links, accent borders, charm backgrounds, and icon fills".
- **action-border** maps to `deep-navy`: Role "border" is grounded by usage context "Primary heading and solid text color; also used as button border in secondary/ghost variants".
- **action-background** maps to `surface-white`: Role "background" is grounded by usage context "Page and card surface background; also used as text-on-solid (white text on dark/brand buttons)".
- **content-text** maps to `subdued-heading`: Role "text" is grounded by usage context "Subdued headings and icon fills in secondary contexts".

### Text Scale
- **Dark Slate** (#273951): Input label text, selected text, and popover text. Role: text. {authored: rgb(39, 57, 81), space: rgb}
- **Slate Body** (#50617a): Soft body text, navigation links, and secondary labels. Role: text. {authored: rgb(80, 97, 122), space: rgb}
- **Stripe Indigo** (#533afd): Primary brand color — used on primary CTA buttons, links, accent borders, charm backgrounds, and icon fills. Role: text. {authored: rgb(83, 58, 253), space: rgb}
- **Stripe Orange** (#ff6118): Accent orange used in the 'Aanmelden' (Sign up) CTA button and orange icon accents. Role: text. {authored: rgb(255, 97, 24), space: rgb}
- **Subdued Heading** (#64748d): Subdued headings and icon fills in secondary contexts. Role: text. {authored: rgb(100, 116, 141), space: rgb}

### Interactive
- **Deep Navy** (#061b31): Primary heading and solid text color; also used as button border in secondary/ghost variants. Role: border. {authored: rgb(6, 27, 49), space: rgb}
- **Quiet Surface** (#e5edf5): Subtle borders, dividers, and quiet surface fills in footer and card outlines. Role: border. {authored: rgb(229, 237, 245), space: rgb}

### Surface & Shadows
- **Brand Lavender** (#7f7dfc): Secondary brand tint used in gradient starts, selector active states, and charm gradient. Role: background. {authored: rgb(127, 125, 252), space: rgb}
- **Pale Background** (#f8fafd): Quiet page background tint for alternating sections. Role: background. {authored: rgb(248, 250, 253), space: rgb, alpha: 0.45}
- **Surface White** (#ffffff): Page and card surface background; also used as text-on-solid (white text on dark/brand buttons). Role: background. {authored: rgb(255, 255, 255), space: rgb, alpha: 0}

## Typography

Typography uses sohne-var, SF Pro Display, sans-serif across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Uses sohne-var, SF Pro Display, sans-serif throughout for a uniform feel. Weight range spans light, regular. Sizes range from 10px to 44px.

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| H1 hero headline — large, light-weight, dark navy | sohne-var, SF Pro Display, sans-serif | 44px | 300 | 1.03 | -0.02em | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Section-level headings and feature titles | sohne-var, SF Pro Display, sans-serif | 26px | 300 | 29.12px | -0.26px | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Sub-section headings and card titles | sohne-var, SF Pro Display, sans-serif | 22px | 300 | 24.2px | -0.22px | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Primary body copy, navigation items, and general prose | sohne-var, SF Pro Display, sans-serif | 16px | 400 | 22.4px | normal | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Secondary body copy and descriptive text blocks | sohne-var, SF Pro Display, sans-serif | 16px | 300 | 22.4px | normal | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Button labels, form labels, and UI control text | sohne-var, SF Pro Display, sans-serif | 14px | 400 | 14px | normal | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Captions, footnotes, and micro-labels | sohne-var, SF Pro Display, sans-serif | 11px | 300 | 15.95px | normal | sohne-var, SF Pro Display, sans-serif | Extracted token |
| Badges, tags, and smallest UI labels | sohne-var, SF Pro Display, sans-serif | 10px | 400 | 14.5px | 0.1px | sohne-var, SF Pro Display, sans-serif | Extracted token |

## Layout

Layout rhythm is inferred from spacing tokens and responsive breakpoint evidence.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| space-1 | 2px | 2 | Mapped to --hds-space-core-25 |
| space-2 | 4px | 4 | Mapped to --hds-space-core-50 |
| space-3 | 6px | 6 | Extracted spacing token |
| space-4 | 8px | 8 | Extracted spacing token |
| space-5 | 10px | 10 | Extracted spacing token |
| space-6 | 12px | 12 | Extracted spacing token |
| space-7 | 16px | 16 | Mapped to --navigation-inline-end |
| space-8 | 20px | 20 | Mapped to --hds-space-core-250 |
| space-9 | 24px | 24 | Mapped to --hds-space-core-300 |
| space-10 | 32px | 32 | Extracted spacing token |
| space-11 | 40px | 40 | Extracted spacing token |
| space-12 | 44px | 44 | Mapped to --hds-space-core-550 |
| space-13 | 64px | 64 | Extracted spacing token |
| space-14 | 96px | 96 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| shadow-sm-bottom | 1 | 0px 2px 5px 0px rgba(0, 0, 0, 0.1) |
| shadow-md-bottom | 1 | 0px 15px 35px 0px rgba(23, 23, 23, 0.08) |
| shadow-md-subtle | 1 | 0px 3px 6px 0px rgba(23, 23, 23, 0.06) |
| shadow-lg-bottom | 1 | 0px 16px 32px 0px rgba(50, 50, 93, 0.12) |
| shadow-xl-diffuse | 1 | 0px 20.187px 40.374px -20.187px rgba(0, 0, 0, 0.1) |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | backdrop-filter | blur(12px) |
| Light | outline-style | solid |
| Light | outline-color | rgb(0, 0, 0) ; rgb(83, 58, 253) ; rgb(6, 27, 49) |
| Light | outline-width | 3px ; 1px |
| Light | outline-offset | 0px ; -1px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(1, 0, 0, 0, 0, 0) ; matrix(1, 0, 0, 1, 0, -0.48) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| radius-none | 0px | 0 | Hairline corner |
| radius-xs | 1px | 1 | Hairline corner |
| radius-sm | 4px | 4 | Subtle corner |
| radius-md | 6px | 6 | Subtle corner |
| radius-lg | 8px | 8 | Control corner |
| radius-xl | 16px | 16 | Card corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| radius-none | 0px | px |
| radius-xs | 1px | px |
| radius-sm | 4px | px |
| radius-md | 6px | px |
| radius-lg | 8px | px |
| radius-xl | 16px | px |

## Components

(none detected)

## Do's and Don'ts

Guardrails protect Core token rhythm without adding unsupported visual claims.

| Do | Don't |
|----|---------|
| Do maintain consistent spacing using the base grid | Don't make unsupported claims about absent visual features |
| Do maintain WCAG AA contrast ratios (4.5:1 for normal text) | Don't mix rounded and sharp corners in the same view |
| Do use the primary color only for the single most important action per screen |  |
| Do verify evidence before writing new design-system guidance |  |

## Responsive Evidence

### Breakpoints

No distinct responsive breakpoints were extracted.

## Agent Prompt Guide

### Example Component Prompts
- Create button component using validated primary color role and spacing tokens.
- Create card component with mapped radius role and evidence-backed elevation.
- Create form input component using inferred typography hierarchy and border roles.

### Iteration Guide
1. Start with extracted palette and typography roles only.
2. Map spacing and radius directly from token tables before visual polish.
3. Apply component patterns one section at a time and compare against source intent.
4. Keep elevation claims tied to explicit evidence in output.
5. Iterate with smallest diffs and re-check section hierarchy after each change.
