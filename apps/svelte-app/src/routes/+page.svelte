<script lang="ts">
  import { onMount } from "svelte";
  let { data } = $props();

  let mounted = $state(false);
  onMount(() => {
    // Trigger animations as soon as hydration is complete
    mounted = true;
  });

  const brand = $derived(data || {});
  const primaryColor = $derived(brand.primary_color || "#4A0404"); // Default to Koi Maroon
  const secondaryColor = $derived(brand.secondary_color || "#FFB800"); // Default to Koi Gold
  const logoUrl = $derived(brand.logo_url || "");
  const location = $derived(brand.location || "Mathikere, Bengaluru");
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
</svelte:head>

<main
  class="splash"
  style="--bg: {primaryColor}; --accent: {secondaryColor}; --font: {brand.font_family ||
    'system-ui'}"
>
  <div class="content" class:visible={mounted}>
    <div class="logo-container stagger-1">
      {#if logoUrl}
        <img src={logoUrl} alt="Logo" class="logo" />
      {:else}
        <div class="logo-placeholder">KOI</div>
      {/if}
    </div>

    <div class="text-group stagger-2">
      <h1 class="title">Koi Resto Bar</h1>
      <p class="location">{location}</p>
    </div>

    <button class="cta stagger-3">
      <span class="icon">🍴</span>
      Explore our menu
    </button>
  </div>

  <footer class="footer stagger-4" class:visible={mounted}>
    <p>Powered by <strong>Tap QR</strong></p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .splash {
    height: 100vh;
    width: 100%;
    background-color: var(--bg);
    background-image:
      radial-gradient(circle at top right, rgba(0, 0, 0, 0.2), transparent),
      radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.2), transparent);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: var(--font), sans-serif;
    position: relative;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    text-align: center;
    padding: 2rem;
  }

  /* Entrance state - hidden until .visible is applied on mount */
  .stagger-1,
  .stagger-2,
  .stagger-3,
  .stagger-4 {
    opacity: 0;
    transform: translateY(15px);
    transition:
      opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Snappier visibility triggers on mount */
  .visible .stagger-1 {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0s;
  }
  .visible .stagger-2 {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.1s;
  }
  .visible .stagger-3 {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.2s;
  }
  .visible.footer,
  .visible.stagger-4 {
    opacity: 0.6;
    transform: translateY(0);
    transition-delay: 0.35s;
  }

  .logo-container {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4));
  }

  .logo-placeholder {
    font-size: 4rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 4px;
  }

  .text-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .location {
    font-size: 1rem;
    font-weight: 300;
    margin: 0;
  }

  .cta {
    background: white;
    color: black;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 100px;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .cta:active {
    transform: scale(0.95);
  }

  .icon {
    font-size: 1.2rem;
  }

  .footer {
    position: absolute;
    bottom: 2rem;
    font-size: 0.8rem;
  }
</style>
