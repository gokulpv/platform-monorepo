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
  {@html `<style>:root { --bg: ${primaryColor}; --accent: ${secondaryColor}; --font: '${fontFamily}'; }</style>`}
</svelte:head>

<main
  class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-white"
  style="background-color: var(--bg); font-family: var(--font), -apple-system, system-ui, sans-serif;"
>
  <!-- Glow Overlay -->
  <div
    class="pointer-events-none absolute inset-0"
    style="background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);"
  ></div>

  <div class="z-10 flex flex-col items-center gap-12 p-8 text-center">
    <div class="relative flex items-center justify-center">
      <div
        class="relative z-10 flex h-[180px] w-[180px] items-center justify-center max-[480px]:h-[150px] max-[480px]:w-[150px]"
      >
        {#if logoUrl}
          <img
            src={logoUrl}
            alt="{tenantName} Logo"
            class="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            width="180"
            height="180"
          />
        {:else}
          <div
            class="text-8xl font-bold tracking-tighter text-white opacity-90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          >
            {tenantName.substring(0, 1).toUpperCase()}
          </div>
        {/if}
      </div>
      <div
        class="absolute z-0 h-[140px] w-[140px] rounded-full bg-white opacity-15 blur-[60px]"
      ></div>
    </div>

    <div class="animate-fadeInUp flex flex-col gap-3">
      <h1
        class="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent max-[480px]:text-4xl"
      >
        {tenantName}
      </h1>
      <div
        class="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 backdrop-blur-md"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></span>
        <p class="m-0 text-sm font-normal text-white/80">{location}</p>
      </div>
    </div>

    <div class="animate-fadeInUp delay-200">
      <a
        href="/home"
        class="group flex items-center gap-4 rounded-full bg-white px-9 py-4.5 text-lg font-semibold text-black no-underline shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-95 active:bg-white/90"
        data-sveltekit-preload-data="hover"
      >
        <span>Explore Menu</span>
        <div
          class="flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
        >
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

  <footer class="animate-fadeIn absolute bottom-10 text-[0.85rem] text-white/40">
    <p>Powered by <span class="font-medium text-white/80">Tap QR</span></p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--bg);
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .animate-fadeIn {
    animation: fadeIn 1s ease both;
  }

  .delay-200 {
    animation-delay: 0.2s;
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
</style>
