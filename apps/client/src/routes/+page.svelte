<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";

  let { data } = $props();

  const brand = $derived(data || {});
  const tenantName = $derived(brand.tenant_name || "KOI");
  const primaryColor = $derived(brand.primary_color || "#4A0404");
  const secondaryColor = $derived(brand.secondary_color || "#8B0000");
  const logoUrl = $derived(
    resolveImagePath(brand.logo_url) || "/assets/logos/koi.png",
  );
  const location = $derived(brand.location || "Location not set");
  const fontFamily = $derived(brand.font_family || "Outfit");
</script>

<svelte:head>
  <title>{tenantName} | Welcome</title>
  <meta
    name="description"
    content="Welcome to {tenantName}. Explore our menu and offerings."
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap"
    rel="stylesheet"
  />
  {#if logoUrl}
    <link rel="preload" href={logoUrl} as="image" fetchpriority="high" />
  {/if}
</svelte:head>

<main
  class="splash"
  style="--bg: {primaryColor}; --accent: {secondaryColor}; --font: {fontFamily}"
>
  <div class="glow-overlay"></div>

  <div class="content">
    <div class="logo-wrapper">
      <div class="logo-container">
        {#if logoUrl}
          <img
            src={logoUrl}
            alt="{tenantName} Logo"
            class="logo"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            width="180"
            height="180"
          />
        {:else}
          <div class="logo-placeholder">
            {tenantName.substring(0, 1).toUpperCase()}
          </div>
        {/if}
      </div>
      <div class="logo-glow"></div>
    </div>

    <div class="text-group">
      <h1 class="title">{tenantName}</h1>
      <div class="location-badge">
        <span class="dot"></span>
        <p class="location">{location}</p>
      </div>
    </div>

    <div class="cta-wrapper">
      <a href="/home" class="cta" data-sveltekit-preload-data="eager">
        <span>Explore Menu</span>
        <div class="arrow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </a>
    </div>
  </div>

  <footer class="footer">
    <p>Powered by <span>Tap QR</span></p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .splash {
    height: 100vh;
    height: 100dvh;
    width: 100%;
    overflow: hidden;
    background-color: var(--bg);
    background-image:
      radial-gradient(
        circle at 0% 0%,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 100% 100%,
        rgba(0, 0, 0, 0.3) 0%,
        transparent 50%
      );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-family:
      var(--font),
      -apple-system,
      system-ui,
      sans-serif;
    position: relative;
  }

  .glow-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 40%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    text-align: center;
    padding: 2rem;
    z-index: 2;
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    backface-visibility: hidden;
  }

  .logo-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-container {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
    will-change: transform;
  }

  .logo-glow {
    position: absolute;
    width: 140px;
    height: 140px;
    background: white;
    filter: blur(60px);
    opacity: 0.15;
    border-radius: 50%;
    z-index: 1;
  }

  .logo-placeholder {
    font-size: 5rem;
    font-weight: 700;
    color: white;
    opacity: 0.9;
    letter-spacing: -2px;
    text-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  .text-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
    backface-visibility: hidden;
  }

  .title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -1px;
    line-height: 1;
    background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.7));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .location-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 0.4rem 1rem;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .dot {
    width: 6px;
    height: 6px;
    background: #4ade80;
    border-radius: 50%;
    box-shadow: 0 0 10px #4ade80;
  }

  .location {
    font-size: 0.9rem;
    font-weight: 400;
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .cta-wrapper {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
    backface-visibility: hidden;
  }

  .cta {
    background: white;
    color: black;
    text-decoration: none;
    padding: 1.1rem 2.2rem;
    border-radius: 100px;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
    -webkit-tap-highlight-color: transparent;
  }

  .cta:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.9);
  }

  .arrow {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .arrow svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .cta:hover .arrow {
    transform: translateX(4px);
  }

  .footer {
    position: absolute;
    bottom: 2.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
    animation: fadeIn 1s ease 0.8s both;
  }

  .footer span {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 8px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 2.5rem;
    }
    .logo-container {
      width: 150px;
      height: 150px;
    }
  }
</style>
