<script lang="ts">
  let { hero, nav, children, heroHeight = "50svh", primaryColor } = $props();
</script>

<div class="page-layout-root" style="--brand-primary: {primaryColor}">
  <!-- Persistent navigation layer -->
  <div class="persistent-nav-layer">
    {@render nav?.()}
  </div>

  <!-- Fixed background layer -->
  <div class="fixed-hero-layer">
    {@render hero?.()}
  </div>

  <!-- In-flow scrolling content -->
  <div class="scrolling-content-layer">
    <!-- Content Section -->
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

<style>
  :global(html) {
    height: auto;
    overflow-x: hidden;
  }

  :global(body) {
    overflow-x: hidden;
    height: auto;
  }

  .page-layout-root {
    width: 100%;
    z-index: 2;
  }

  .persistent-nav-layer {
    position: fixed;
    top: 0;
    width: 100%;
    display: block;
    z-index: 100;
  }

  .fixed-hero-layer {
    position: fixed;
    top: 0;
    height: 45vh;
    width: 100%;
    background-color: var(--brand-primary);
    z-index: -2;
  }

  .content-section {
  }

  .scrolling-content-layer {
    background-color: #fff;
    border-radius: 16px;
    margin-top: 45vh;
    min-height: 100vh;
    overflow: hidden;
    padding: 16px;
    z-index: 1;
  }

  .footer {
    margin-top: 1rem;
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
