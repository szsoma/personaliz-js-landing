<script>
  import { onMount } from 'svelte';

  let isVisible = $state(false);
  let email = $state('');
  let isSubmitted = $state(false);
  let isValid = $state(true);

  function validateEmail(e) {
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
    <div class="mx-auto max-w-2xl bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
      <div class="flex items-center justify-between p-4 md:p-5">
        <div class="flex-1">
          {#if isSubmitted}
            <div class="flex items-center gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <p class="text-base-content font-medium text-sm">You're on the list!</p>
                <p class="text-base-content/50 text-xs">We'll notify you when we launch.</p>
              </div>
            </div>
          {:else}
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div class="flex-1">
                <p class="text-base-content font-medium text-sm">Get early access</p>
                <p class="text-base-content/50 text-xs">Be the first to know when we launch.</p>
              </div>
              <form
                class="flex gap-2"
                onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
              >
                <input
                  type="email"
                  bind:value={email}
                  placeholder="you@company.com"
                  class="input input-bordered input-sm w-full md:w-56 {isValid ? '' : 'input-error'}"
                />
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          {/if}
        </div>
        <button
          onclick={dismiss}
          class="flex-shrink-0 ml-4 w-8 h-8 rounded-lg flex items-center justify-center text-base-content/50 hover:text-base-content hover:bg-base-200 transition-colors"
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
