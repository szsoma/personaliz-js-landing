<script>
  import { onMount } from 'svelte';

  const KIT_API_KEY = 'kit_7072532b109917c8f97f071ae9962c6b';
  const KIT_FORM_ID = '9609869';

  let isVisible = $state(false);
  let isAnimating = $state(false);
  let email = $state('');
  let isSubmitted = $state(false);
  let isSubmitting = $state(false);
  let isValid = $state(true);
  let errorMessage = $state('');
  let consentGiven = $state(false);

  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  export function show() {
    isVisible = true;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      isAnimating = true;
    });
  }

  async function handleSubmit() {
    if (!validateEmail(email)) {
      isValid = false;
      errorMessage = 'Please enter a valid email';
      return;
    }

    if (!consentGiven) {
      isValid = false;
      errorMessage = 'Please accept the privacy policy to continue';
      return;
    }

    isValid = true;
    isSubmitting = true;
    errorMessage = '';

    try {
      const subscriberResponse = await fetch(
        'https://api.kit.com/v4/subscribers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Kit-Api-Key': KIT_API_KEY,
          },
          body: JSON.stringify({
            email_address: email,
          }),
        }
      );

      if (!subscriberResponse.ok) {
        const errorData = await subscriberResponse.json();
        throw new Error(errorData.errors?.[0] || 'Failed to subscribe');
      }

      const formResponse = await fetch(
        `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Kit-Api-Key': KIT_API_KEY,
          },
          body: JSON.stringify({
            email_address: email,
          }),
        }
      );

      if (formResponse.ok) {
        isSubmitted = true;
      } else {
        const errorData = await formResponse.json();
        throw new Error(errorData.errors?.[0] || 'Failed to add to form');
      }
    } catch (err) {
      errorMessage = err.message || 'Something went wrong. Please try again.';
      isValid = false;
    } finally {
      isSubmitting = false;
    }
  }

  function dismiss() {
    isAnimating = false;
    setTimeout(() => {
      isVisible = false;
      document.body.style.overflow = '';
    }, 300);
    sessionStorage.setItem('p13n-popup-dismissed', 'true');
  }

  onMount(() => {
    window.openSubscribePopup = show;

    const dismissed = sessionStorage.getItem('p13n-popup-dismissed');
    if (!dismissed) {
      setTimeout(() => {
        show();
      }, 5000);
    }

    return () => {
      delete window.openSubscribePopup;
      document.body.style.overflow = '';
    };
  });
</script>

{#if isVisible}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    class:backdrop-visible={isAnimating}
  >
    <button
      class="backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
      class:backdrop-fade={isAnimating}
      onclick={dismiss}
      aria-label="Close"
    ></button>

    <div
      class="popup-card relative w-full max-w-lg bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden"
      class:popup-enter={isAnimating}
    >
      <button
        onclick={dismiss}
        class="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors z-10"
        aria-label="Dismiss"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {#if isSubmitted}
        <div class="p-8 md:p-10 text-center">
          <div class="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 class="text-base-content text-xl font-semibold mb-2">You're on the list!</h3>
          <p class="text-base-content/60 text-sm">We'll notify you as soon as we launch.</p>
        </div>
      {:else}
        <div class="bg-primary/5 border-b border-primary/10 px-8 md:px-10 py-6 text-center">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3 class="text-base-content text-xl font-semibold mb-1">Get early access</h3>
          <p class="text-base-content/60 text-sm">Be the first to know when ShiftyJS launches.</p>
        </div>

        <form
          class="p-8 md:p-10 space-y-4"
          onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        >
          <div>
            <input
              type="email"
              bind:value={email}
              placeholder="you@company.com"
              disabled={isSubmitting}
              class="input input-bordered input-md w-full {!isValid ? 'input-error' : ''}"
            />
            {#if errorMessage}
              <p class="text-error text-xs mt-1.5">{errorMessage}</p>
            {/if}
          </div>

          <div class="flex items-start gap-2.5">
            <input
              type="checkbox"
              bind:checked={consentGiven}
              id="consent-checkbox"
              class="checkbox checkbox-sm checkbox-primary mt-0.5 flex-shrink-0"
            />
            <label for="consent-checkbox" class="text-base-content/50 text-xs leading-relaxed cursor-pointer">
              I agree to receive launch updates. You can unsubscribe anytime.
            </label>
            <a href="/privacy" class="link link-primary text-xs" target="_blank">Privacy Policy</a>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full"
            disabled={isSubmitting || !consentGiven}
          >
            {#if isSubmitting}
              <span class="loading loading-spinner loading-sm"></span>
            {:else}
              Notify me at launch
            {/if}
          </button>

          <p class="text-base-content/40 text-xs text-center">No spam. Unsubscribe anytime.</p>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  .backdrop-fade {
    opacity: 1;
  }

  .popup-card {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  .popup-enter {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
</style>
