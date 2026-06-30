---
title: 'How to Set Up UTM-Based Landing Page Personalization'
description: 'Learn how to use UTM parameters to personalize landing pages for different campaigns, traffic sources, and audiences without creating duplicate pages.'
pubDate: 2026-06-26
tags: ['UTM', 'campaign tracking', 'personalization', 'landing pages']
---

## What are UTM parameters?

UTM (Urchin Tracking Module) parameters are tags added to URLs that help you track where your traffic comes from. They're the standard way to attribute visits and conversions to specific campaigns in analytics tools like Google Analytics.

The five standard UTM parameters are:

- **utm_source** — where the traffic comes from (google, linkedin, newsletter)
- **utm_medium** — the marketing medium (cpc, email, social)
- **utm_campaign** — the campaign name (spring_sale, product_launch)
- **utm_term** — the keyword (for paid search)
- **utm_content** — the ad variant or link identifier

Example URL:
```
https://yoursite.com/page?utm_source=google&utm_medium=cpc&utm_campaign=erp_demo
```

## Beyond tracking: UTM-based personalization

UTMs are typically used for analytics—you track which campaigns drive traffic and conversions. But they can also drive personalization.

When a visitor arrives with `utm_source=google` and `utm_campaign=erp_demo`, you can use those values to change the page content. The visitor from the ERP campaign sees ERP-specific messaging. The visitor from the SaaS campaign sees SaaS-specific messaging.

This turns UTM parameters from passive tracking tags into active personalization triggers.

## How UTM-based personalization works

### 1. Add a personalization script

Install a lightweight script like ShiftyJS that can read URL parameters and update page content.

### 2. Mark elements for personalization

Add data attributes to the elements you want to change:

```html
<h1 data-variant="h1">Default headline</h1>
<p data-variant="subtitle">Default subtitle</p>
<a data-variant="cta" data-href="cta">Get started</a>
```

### 3. Use UTM values in your campaign URLs

Add personalization parameters alongside your UTMs:

```
https://yoursite.com/page?utm_source=google&utm_medium=cpc&utm_campaign=erp_demo&p_h1=ERP_Demo_for_Growing_Teams&p_cta=Book_Your_ERP_Demo
```

Or configure the script to automatically personalize based on UTM values:

```
https://yoursite.com/page?utm_source=google&utm_campaign=erp_demo
```

The script reads `utm_campaign=erp_demo` and applies the matching personalization rules.

## Setting up UTM-based rules

With ShiftyJS, you can create rules that trigger personalization based on UTM values:

```html
<script>
  window.personalizeRules = {
    when: { utm_campaign: 'erp_demo' },
    set: {
      h1: 'ERP Demo for Growing Teams',
      subtitle: 'See how our ERP scales with your business',
      cta: 'Book Your ERP Demo'
    }
  };
</script>
```

When `utm_campaign=erp_demo` is in the URL, the page updates automatically.

## UTM naming conventions for personalization

For UTM-based personalization to work well, use consistent naming conventions:

### Source naming
- `google` (not `Google` or `google_ads`)
- `linkedin` (not `LinkedIn` or `li`)
- `newsletter` (not `Newsletter` or `email`)

### Campaign naming
- Use underscores for multi-word names: `erp_demo` (not `erp-demo` or `erpDemo`)
- Keep names descriptive but concise
- Document your naming convention for the team

### Example naming structure
```
utm_source=google
utm_medium=cpc
utm_campaign=product_audience_offer
```

## Combining UTM and personalization parameters

You have two options for campaign URLs:

### Option 1: Separate personalization parameters
```
https://yoursite.com/page?utm_source=google&utm_campaign=erp_demo&p_h1=ERP_Demo
```

Pros: Clear separation between tracking and personalization. Easy to update personalization without affecting analytics.

### Option 2: UTM-driven personalization
```
https://yoursite.com/page?utm_source=google&utm_campaign=erp_demo
```

The script maps `utm_campaign=erp_demo` to pre-configured personalization rules.

Pros: Shorter URLs. No extra parameters to manage.

## Best practices

### Keep UTM parameters consistent

Inconsistent naming breaks both tracking and personalization. Create a shared naming convention document and stick to it.

### Don't put sensitive data in UTMs

UTM parameters are visible in analytics, server logs, and browser history. Don't include personal information or internal codes.

### Test your URLs

Before launching a campaign, test the full URL with all parameters. Verify that:
- The page loads correctly
- Personalization applies as expected
- Analytics captures the UTM values
- The page works without UTMs (fallback to defaults)

### Use a URL builder

Tools like Google's Campaign URL Builder or a spreadsheet help ensure consistent UTM formatting across your team.

## Getting started

1. Install ShiftyJS on your landing page
2. Mark your headline, subtitle, and CTA with data attributes
3. Create campaign URLs with UTM + personalization parameters
4. Test each variant before launching

[See the setup guide →](/#how-it-works)
