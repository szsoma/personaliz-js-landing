<script>
  import { onMount } from 'svelte';

  const steps = [
    {
      title: 'Add a data attribute',
      code: '<h1 data-variant="h1">Default headline</h1>\n<a data-variant="cta" data-href="cta">Get started</a>',
    },
    {
      title: 'Use a campaign URL',
      code: 'https://yoursite.com/page?p_h1=ERP_demo&p_cta=Book_a_demo',
    },
    {
      title: 'The page updates automatically',
      code: '<h1>ERP demo</h1>\n<a href="/demo">Book a demo</a>',
    },
  ];

  let activeStep = $state(0);
  let isPaused = $state(false);
  let interval;

  function startInterval() {
    interval = setInterval(() => {
      if (!isPaused) {
        activeStep = (activeStep + 1) % steps.length;
      }
    }, 3000);
  }

  onMount(() => {
    startInterval();
    return () => clearInterval(interval);
  });

  function handleMouseEnter() {
    isPaused = true;
  }

  function handleMouseLeave() {
    isPaused = false;
  }
</script>

<div
  class="space-y-4 min-h-[400px]"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="presentation"
>
  {#each steps as step, i}
    <div
      class="rounded-xl border transition-all duration-500 {i === activeStep ? 'border-accent/30 bg-base-100 shadow-md' : 'border-base-300 bg-base-200 opacity-50'}"
    >
      <div class="flex items-center gap-3 px-5 py-3 border-b border-base-300/50">
        <span class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold {i === activeStep ? 'bg-accent text-accent-content' : 'bg-base-300 text-base-content/50'}">
          {i + 1}
        </span>
        <span class="text-sm font-medium text-base-content">{step.title}</span>
      </div>
      <div class="p-5">
        <pre class="text-sm font-mono text-base-content whitespace-pre-wrap leading-relaxed">{step.code}</pre>
      </div>
    </div>
  {/each}
</div>
