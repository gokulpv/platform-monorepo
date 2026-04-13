<script lang="ts">
  import HomeHero from "$lib/components/home/HomeHero.svelte";
  import CategoryScroll from "$lib/components/home/CategoryScroll.svelte";
  import MostOrderedCards from "$lib/components/home/MostOrderedCards.svelte";
  import MenuGrid from "$lib/components/home/MenuGrid.svelte";
  
  let { data } = $props();
  const spotlights = $derived(data.spotlights || []);

  let searchQuery = $state("");
</script>

<svelte:head>
  <title>Home | 3D Menu</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
</svelte:head>

<main class="mobile-container app-layout">
  <!-- Fixed background layer -->
  <div class="fixed-hero">
    <HomeHero items={spotlights} />
  </div>

  <!-- In-flow sections: document (html/body) scrolls so mobile browser chrome can hide -->
  <div class="page-sections">
    <!-- Snap Point 1: Hero Reveal -->
    <section class="hero-spacer"></section>

    <!-- Snap Point 2: Content Start -->
    <section class="content-snap-point">
      <div class="content-wrapper">
        <section class="search-section">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search dishes or ingredients" 
              bind:value={searchQuery}
            />
          </div>
        </section>

        <CategoryScroll />

        <section class="section-divider">
          <div class="header">
            <h2 class="section-title">OUR MOST ORDERED</h2>
            <button class="view-all">View all</button>
          </div>
          <MostOrderedCards />
        </section>

        <MenuGrid />

        <footer class="footer">
          <div class="logo">KOI</div>
          <p class="powered">Powered by Tap QR</p>
        </footer>
      </div>
    </section>
  </div>
</main>

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

  .app-layout {
    /* Inherits from .mobile-container, adding page-specific overrides if any */
  }

  /* svh matches HomeHero: stable while chrome UI animates (avoids shake vs dvh). */
  .fixed-hero {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    height: 50svh;
    z-index: 1;
    pointer-events: none;
    background: #000;
  }

  .fixed-hero :global(.hero) {
    max-width: 500px;
    margin: 0 auto;
    pointer-events: auto;
  }

  .page-sections {
    position: relative;
    z-index: 2; /* Low but above hero */
    pointer-events: none;
  }

  /* Match .fixed-hero (50svh) so the sheet does not overlap the hero. */
  .hero-spacer {
    height: 50svh;
    min-height: 50svh;
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
    padding-top: 2rem;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
    /* Removed overflow: hidden/auto and height constraint */
    padding-bottom: 2rem;
    pointer-events: auto;
    isolation: isolate; /* Ensure stacking context for rounding */
    min-height: 100vh; /* Ensure it covers the screen when snapped */
  }

  .search-section {
    padding: 0 1.5rem 1rem;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: #f4f5f7;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    gap: 0.75rem;
  }

  .search-icon {
    color: #555;
  }

  .search-bar input {
    border: none;
    background: none;
    flex: 1;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    font-weight: 400;
  }

  .search-bar input::placeholder {
    color: #888;
  }

  .section-divider {
    padding-top: 1rem;
  }

  .section-divider .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem 0.5rem;
  }

  .section-title {
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    margin: 0;
    color: #000;
    text-transform: uppercase;
  }

  .view-all {
    background: none;
    border: none;
    color: #888;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
  }

  .footer {
    padding: 4rem 1.5rem 6rem;
    text-align: center;
    background: #fff;
    border-top: 1px solid #f0f0f0;
  }

  .logo {
    font-family: 'Playfair Display', serif;
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
