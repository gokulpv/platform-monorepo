<script lang="ts">
  import { mockDishes } from "$lib/data/mock-menu";
  import AppHero from "$lib/components/shared/AppHero.svelte";
  import PageLayout from "$lib/layouts/PageLayout.svelte";
  import CategoryScroll from "$lib/components/home/CategoryScroll.svelte";
  import MostOrderedCards from "$lib/components/home/MostOrderedCards.svelte";
  import MenuGrid from "$lib/components/home/MenuGrid.svelte";
  import { goto } from "$app/navigation";
  
  let { data } = $props();
  const spotlights = $derived(data.spotlights || []);
  const mostOrdered = $derived(mockDishes.slice(0, 3));
  const gridDishes = $derived(mockDishes);

  let searchQuery = $state("");

  function navToCategories() {
    goto("/categories");
  }
</script>

<svelte:head>
  <title>Home | 3D Menu</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
</svelte:head>

<PageLayout>
  {#snippet nav()}
    <AppHero 
      mode="carousel" 
      items={spotlights} 
      showVegToggle={true} 
      topBarOnly={true}
    />
  {/snippet}

  {#snippet hero()}
    <AppHero 
      mode="carousel" 
      items={spotlights} 
    />
  {/snippet}

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

  <section class="categories-section">
    <div class="header">
      <h2 class="title">What would you like to have today?</h2>
      <button class="view-all" onclick={navToCategories}>SEE ALL <span class="arrow">→</span></button>
    </div>
    <CategoryScroll />
  </section>

  <section class="section-divider">
    <div class="header">
      <h2 class="section-title">OUR MOST ORDERED</h2>
      <button class="view-all">View all</button>
    </div>
    <MostOrderedCards items={mostOrdered} />
  </section>

  <MenuGrid items={gridDishes} />

  <footer class="footer">
    <div class="logo">KOI</div>
    <p class="powered">Powered by Tap QR</p>
  </footer>
</PageLayout>

<style>
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

  .categories-section {
    padding-top: 1rem;
  }

  .categories-section .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 1.5rem 0.5rem;
  }

  .categories-section .title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.25;
    max-width: 60%;
    color: #111;
  }

  .view-all {
    background: none;
    border: none;
    color: #888;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: 0.5px;
  }

  .view-all .arrow {
    font-size: 1.1rem;
    margin-top: -2px;
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
