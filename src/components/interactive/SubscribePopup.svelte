<script>
  import { onMount } from 'svelte';

  const KIT_API_KEY = 'kit_7072532b109917c8f97f071ae9962c6b';
  const KIT_FORM_ID = 'e45e119a8f';

  let isVisible = $state(false);
  let isAnimating = $state(false);
  let email = $state('');
  let isSubmitted = $state(false);
  let isSubmitting = $state(false);
  let isValid = $state(true);
  let errorMessage = $state('');

  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSubmit() {
    if (!validateEmail(email)) {
      isValid = false;
      errorMessage = 'Please enter a valid email';
      return;
    }

    isValid = true;
    isSubmitting = true;
    errorMessage = '';

    try {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        isSubmitted = true;
      } else {
        errorMessage = data.message || 'Something went wrong. Please try again.';
        isValid = false;
      }
    } catch (err) {
      errorMessage = 'Network error. Please try again.';
      isValid = false;
    } finally {
      isSubmitting = false;
    }
  }

  function dismiss() {
    isAnimating = false;
    setTimeout(() => {
      isVisible = false;
    }, 400);
    sessionStorage.setItem('p13n-popup-dismissed', 'true');
  }

  onMount(() => {
    const dismissed = sessionStorage.getItem('p13n-popup-dismissed');
    if (!dismissed) {
      setTimeout(() => {
        isVisible = true;
        requestAnimationFrame(() => {
          isAnimating = true;
        });
      }, 10000);
    }
  });
</script>

{#if isVisible}
  <div
    class="popup-container fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    class:popup-visible={isAnimating}
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
                <div class="flex flex-col gap-1">
                  <input
                    type="email"
                    bind:value={email}
                    placeholder="you@company.com"
                    disabled={isSubmitting}
                    class="input input-bordered input-sm w-full md:w-56 {isValid ? '' : 'input-error'}"
                  />
                  {#if errorMessage}
                    <span class="text-error text-xs">{errorMessage}</span>
                  {/if}
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  disabled={isSubmitting}
                >
                  {#if isSubmitting}
                    <span class="loading loading-spinner loading-xs"></span>
                  {:else}
                    Subscribe
                  {/if}
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
  .popup-container {
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  }

  .popup-visible {
    transform: translateY(0);
    opacity: 1;
  }
</style>
