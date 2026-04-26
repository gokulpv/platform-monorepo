<script lang="ts">
  import { mockDishes } from "$lib/data/mock-menu";
  import AppHero from "$lib/components/shared/AppHero.svelte";
  import PageLayout from "$lib/layouts/PageLayout.svelte";
  import CategoryScroll from "$lib/components/home/CategoryScroll.svelte";
  import MostOrderedCards from "$lib/components/home/MostOrderedCards.svelte";
  import MenuGrid from "$lib/components/home/MenuGrid.svelte";
  import { goto } from "$app/navigation";
  import Header from "$lib/components/shared/Header.svelte";

  let { data } = $props();
  const rawSpotlights = $derived(data.spotlights || []);

  // Map raw spotlights to use our new high-quality category images for specific dishes
  const spotlights = $derived(
    rawSpotlights.map((item) => {
      if (item.dishId === 1)
        return { ...item, image_url: "/assets/categories/starters.png" };
      if (item.dishId === 3)
        return { ...item, image_url: "/assets/menu/highlight.png" };
      return item;
    }),
  );

  const mostOrdered = $derived(mockDishes.slice(0, 3));
  const gridDishes = $derived(mockDishes);
  const primaryColor = $derived(data.brand?.primary_color || "#4A0404");

  let searchQuery = $state("");

  function navToCategories() {
    goto("/categories");
  }
</script>

<svelte:head>
  <title>Home | 3D Menu</title>
</svelte:head>

<PageLayout {primaryColor}>
  {#snippet nav()}
    <Header />
  {/snippet}

  {#snippet hero()}
    <AppHero mode="carousel" items={spotlights} {primaryColor} />
  {/snippet}

  <section class="search-section">
    <div class="search-bar">
      <svg
        class="search-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
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
      <h2 class="title">What would you like?</h2>
      <button class="view-all" onclick={navToCategories}
        >SEE ALL <span class="arrow">→</span></button
      >
    </div>
    <CategoryScroll />
  </section>

  <section class="categories-section">
    <div class="header">
      <h2 class="title">Our most ordered</h2>
      <button class="view-all" onclick={navToCategories}
        >SEE ALL <span class="arrow">→</span></button
      >
    </div>
    <MostOrderedCards items={mostOrdered} />
  </section>

  <section class="categories-section">
    <MenuGrid items={gridDishes} />
  </section>
</PageLayout>

<style>
  :global(.scrolling-content-layer) {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-bottom: 4rem !important;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: #f4f5f7;
    border-radius: 8px;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
  }

  .search-icon {
    color: #c8c8c8;
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
    margin-bottom: 24px;
  }

  .categories-section .title {
    font-family: "Outfit", sans-serif;
    font-size: 1rem;
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

  .footer {
    padding: 3rem 1rem;
    text-align: center;
    background: #fff;
    border-top: 1px solid #f8f8f8;
    margin-top: 1rem;
  }
</style>
