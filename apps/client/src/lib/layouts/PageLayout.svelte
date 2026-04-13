<script lang="ts">
  /**
   * PageLayout provides the standardized "Fixed Hero + Scrolling Snap Sheet" structure.
   * hero: Named snippet for the hero content
   * children: Default snippet for the sheet content
   * heroHeight: CSS height for the hero section (default 50svh)
   */
  let { hero, children, heroHeight = "50svh" } = $props();
</script>

<div class="page-layout-root" style="--hero-height: {heroHeight}">
  <!-- Fixed background layer -->
  <div class="fixed-hero-layer">
    {@render hero?.()}
  </div>

  <!-- In-flow scrolling content -->
  <div class="scrolling-content-layer">
    <!-- Snap Point 1: Hero reveal spacer -->
    <section class="hero-spacer"></section>

    <!-- Snap Point 2: Content Start -->
    <section class="content-snap-point">
      <div class="content-wrapper">
        {@render children?.()}
      </div>
    </section>
  </div>
</div>

<style>
  :global(html) {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
  }

  :global(body) {
    background-color: #000;
    color: #111;
    overflow-x: hidden;
  }

  .page-layout-root {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    min-height: 100vh;
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
    scroll-snap-align: start;
    pointer-events: none;
  }

  .content-snap-point {
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    background: transparent;
  }

  .content-wrapper {
    background: white;
    border-radius: 32px 32px 0 0;
    padding-top: 1.5rem;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
    padding-bottom: 2rem;
    pointer-events: auto;
    isolation: isolate;
    min-height: 100vh;
  }
</style>
