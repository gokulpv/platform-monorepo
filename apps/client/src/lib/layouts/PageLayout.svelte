<script lang="ts">
  /**
   * PageLayout provides the standardized "Fixed Hero + Scrolling Sheet" structure.
   * hero: Named snippet for the hero content
   * nav: Named snippet for the persistent navigation layer (z-index 100)
   * children: Default snippet for the sheet content
   * heroHeight: CSS height for the hero section (default 50svh)
   */
  let { hero, nav, children, heroHeight = "50svh" } = $props();
</script>

<div class="page-layout-root" style="--hero-height: {heroHeight}">
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
    <!-- Hero reveal spacer -->
    <section class="hero-spacer"></section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="content-wrapper">
        <div class="content-internal">
          {@render children?.()}
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  :global(html) {
    /* Allow browser chrome to hide by ensuring we don't lock height */
    height: auto;
    overflow-x: hidden;
  }

  :global(body) {
    background-color: #000;
    color: #111;
    overflow-x: hidden;
    height: auto;
    min-height: 100%;
  }

  .page-layout-root {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
  }

  .persistent-nav-layer {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    z-index: 100;
    pointer-events: none;
  }

  /* Icons should still be clickable */
  .persistent-nav-layer :global(*) {
    pointer-events: auto;
  }

  .fixed-hero-layer {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    height: var(--hero-height);
    z-index: 1;
    pointer-events: none;
    background: #000;
  }

  /* Ensure interactive hero elements still work */
  .fixed-hero-layer :global(*) {
    pointer-events: auto;
  }

  .scrolling-content-layer {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .hero-spacer {
    height: var(--hero-height);
    min-height: var(--hero-height);
    pointer-events: none;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    background: transparent;
  }

  .content-wrapper {
    background: white;
    border-radius: 32px 32px 0 0;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.4);
    pointer-events: auto;
    isolation: isolate;
    min-height: 1000px;
  }

  .content-internal {
    padding-top: 1.5rem;
    padding-bottom: 2rem;
  }
</style>
