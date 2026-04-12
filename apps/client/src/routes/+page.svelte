<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";

  let { data } = $props();

  const brand = $derived(data || {});
  const tenantName = $derived(brand.tenant_name || "Platform");
  const primaryColor = $derived(brand.primary_color || "#111111"); 
  const secondaryColor = $derived(brand.secondary_color || "#333333");
  const logoUrl = $derived(resolveImagePath(brand.logo_url));
  const location = $derived(brand.location || "Location not set");
</script>

<svelte:head>
  <title>{tenantName} | Home</title>
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
    'Outfit'}"
>
  <div class="content">
    <div class="logo-container">
      {#if logoUrl}
        <img src={logoUrl} alt="Logo" class="logo" />
      {:else}
        <div class="logo-placeholder">{tenantName.substring(0, 1).toUpperCase()}</div>
      {/if}
    </div>

    <div class="text-group">
      <h1 class="title">{tenantName}</h1>
      <p class="location">{location}</p>
    </div>

    <a href="/home" class="cta">
      <span class="icon">✨</span>
      Explore
    </a>
  </div>

  <footer class="footer">
    <p>Powered by <strong>Tap QR</strong></p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--bg);
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
    text-decoration: none;
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
  }

  .icon {
    font-size: 1.2rem;
  }

  .footer {
    position: absolute;
    bottom: 2rem;
    font-size: 0.8rem;
    opacity: 0.6;
  }
</style>
