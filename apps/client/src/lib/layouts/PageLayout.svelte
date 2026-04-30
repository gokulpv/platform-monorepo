<script lang="ts">
  let { hero, nav, children, heroHeight = "45svh", primaryColor } = $props();

  let scrollY = $state(0);
  const HEADER_HEIGHT = 60;

  function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    scrollY = target.scrollTop;
  }

  // Calculate threshold based on heroHeight (45vh) minus header height
  // In a real app we might measure this, but using vh/px math is reliable for this design
  const isHeaderSolid = $derived.by(() => {
    if (typeof window === "undefined") return false;
    const threshold = window.innerHeight * 0.45 - HEADER_HEIGHT;
    return scrollY > threshold;
  });
</script>

<svelte:head>
  <meta name="theme-color" content={primaryColor} />
  <style>
    body { background-color: {primaryColor}; }
    html { background-color: {primaryColor}; }
  </style>
</svelte:head>

<div class="page-layout-root" style="--brand-primary: {primaryColor}">
  <!-- Fixed background layer (Revealed by spacer) -->
  <div class="fixed-hero-layer">
    {@render hero?.()}
  </div>

  <!-- Header stays fixed on top -->
  <div class="persistent-nav-layer" class:solid={isHeaderSolid}>
    {@render nav?.()}
  </div>

  <!-- The ONE scroll container -->
  <div class="scroll-container" onscroll={handleScroll}>
    <!-- Transparent spacer that lets hero show through -->
    <div class="hero-spacer"></div>

    <!-- White content area that scrolls over the hero -->
    <div class="scrolling-content-layer">
      <section class="content-section">
        <div class="content-internal">
          {@render children?.()}
        </div>
      </section>
      <footer class="footer">
        <div class="logo">KOI</div>
        <p class="powered">Powered by Tap QR</p>
      </footer>
    </div>
  </div>
</div>

<style>
  /* Lock the body and html to prevent double scrolling */
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  .page-layout-root {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    position: relative;
    overflow: hidden;
    background-color: var(--brand-primary);
  }

  .persistent-nav-layer {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: transparent;
    transition: all 0.3s ease;
  }

  .persistent-nav-layer.solid {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  }

  .fixed-hero-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45vh;
    z-index: 0;
    pointer-events: none;
  }

  .scroll-container {
    position: absolute;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 10;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  /* Hide scrollbar for cleaner look */
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  .scroll-container {
    scrollbar-width: none;
  }

  .hero-spacer {
    height: 45vh;
    width: 100%;
    pointer-events: none;
  }

  .scrolling-content-layer {
    position: relative;
    background-color: #fff;
    border-radius: 24px 24px 0 0;
    min-height: calc(100vh - 60px);
    padding: 20px 16px;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1);
  }

  .footer {
    margin-top: 3rem;
    padding-bottom: 2rem;
    text-align: center;
  }

  .logo {
    font-family: "Playfair Display", serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .powered {
    font-size: 0.75rem;
    color: #888;
    margin: 0;
  }
</style>
