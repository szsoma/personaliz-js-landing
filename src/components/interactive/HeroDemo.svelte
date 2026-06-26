<script>
  import { onMount } from 'svelte';

  const defaultDemos = [
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
  let headline = $state(defaultDemos[0].headline);
  let cta = $state(defaultDemos[0].cta);
  let isTyping = $state(false);
  let isPaused = $state(false);
  let isEditing = $state(false);
  let interval;

  function typeUrl(url) {
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
    current = (current + 1) % defaultDemos.length;
    headline = defaultDemos[current].headline;
    cta = defaultDemos[current].cta;
    typeUrl(defaultDemos[current].url);
  }

  function parseUrlParams(url) {
    const params = {};
    const queryString = url.split('?')[1];
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
          params[key] = decodeURIComponent(value.replace(/_/g, ' '));
        }
      });
    }
    return params;
  }

  function updateFromUrl(url) {
    const params = parseUrlParams(url);
    if (params.p_h1) {
      headline = params.p_h1;
    }
    if (params.p_cta) {
      cta = params.p_cta;
    }
  }

  function handleUrlInput(event) {
    typedUrl = event.target.value;
    updateFromUrl(typedUrl);
  }

  function handleUrlFocus() {
    isPaused = true;
    isEditing = true;
  }

  function handleUrlBlur() {
    isPaused = false;
    isEditing = false;
  }

  onMount(() => {
    typeUrl(defaultDemos[current].url);
    interval = setInterval(() => {
      if (!isPaused && !isTyping && !isEditing) {
        setTimeout(nextDemo, 2000);
      }
    }, 6000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="relative rounded-xl border border-base-300 bg-base-100 shadow-lg overflow-hidden"
  onmouseenter={() => isPaused = true}
  onmouseleave={() => isPaused = false}
  role="presentation"
>
  <!-- Browser chrome -->
  <div class="flex items-center gap-2 border-b border-base-300 bg-base-200 px-4 py-3">
    <div class="flex gap-1.5">
      <div class="h-3 w-3 rounded-full bg-error/60"></div>
      <div class="h-3 w-3 rounded-full bg-warning/60"></div>
      <div class="h-3 w-3 rounded-full bg-success/60"></div>
    </div>
    <div class="flex-1 ml-3 min-w-0">
      <div class="bg-base-100 rounded-md border border-base-300 px-3 py-1.5 text-xs font-mono flex items-center">
        <span class="text-base-content/50 hidden sm:block">https://yoursite.com/landing</span>
        <input
          type="text"
          value={typedUrl}
          oninput={handleUrlInput}
          onfocus={handleUrlFocus}
          onblur={handleUrlBlur}
          class="bg-transparent outline-none text-primary flex-1 min-w-0 w-full"
          placeholder="?p_h1=Your_headline&p_cta=Your_CTA"
        />
      </div>
    </div>
  </div>

  <!-- Page mockup -->
  <div class="p-8 md:p-12">
    <div class="mb-3">
      <span class="badge badge-primary">URL param → page element</span>
    </div>
    <h3 class="text-base-content text-2xl md:text-3xl font-normal mb-4 leading-tight transition-all duration-500">
      {headline}
    </h3>
    <p class="text-base-content/70 text-base mb-6 max-w-md leading-relaxed">
      Book a demo with our team to see how it works for your business.
    </p>
    <div class="flex items-center gap-3">
      <span class="btn btn-primary btn-sm transition-all duration-500">
        {cta}
      </span>
      <span class="text-xs text-base-content/50">
        ← Changed from URL
      </span>
    </div>
  </div>

  <!-- Labels -->
  <div class="flex gap-4 border-t border-base-300 bg-base-200 px-6 py-3">
    <span class="text-xs text-base-content/50 flex items-center gap-1.5">
      <span class="h-2 w-2 rounded-full bg-primary"></span>
      p_h1 → headline
    </span>
    <span class="text-xs text-base-content/50 flex items-center gap-1.5">
      <span class="h-2 w-2 rounded-full bg-primary"></span>
      p_cta → button
    </span>
  </div>
</div>
