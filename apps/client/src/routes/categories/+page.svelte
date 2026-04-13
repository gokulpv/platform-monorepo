<script lang="ts">
  import { page } from "$app/state";
  import { mockDishes } from "$lib/data/mock-menu";
  import AppHero from "$lib/components/shared/AppHero.svelte";
  import PageLayout from "$lib/layouts/PageLayout.svelte";
  import CategoryTabScroll from "$lib/components/categories/CategoryTabScroll.svelte";
  import MenuGrid from "$lib/components/home/MenuGrid.svelte";
  import { resolveImagePath } from "$lib/utils/image";
  
  // Use shared mock data
  const allItems = mockDishes;

  // Detailed info for each category hero
  const categoryMeta = {
    "Starters": {
      desc: "Slow-boiled in rich Cajun butter with baby potatoes and herbs.",
      iconPath: "M11 6l-5 5m11-5l-5 5M9 22H5a2 2 0 01-2-2V7l2-2h14l2 2v13a2 2 0 01-2 2h-4",
      bg: "/assets/menu/most_ordered_dish.png"
    },
    "Main": {
      desc: "Authentic hearth-cooked entrees and signature grills.",
      iconPath: "M3 11c0 4.4 3.6 8 8 8h2c4.4 0 8-3.6 8-8V5H3v6z",
      bg: "/assets/menu/most_ordered_dish.png"
    },
    "Desserts": {
      desc: "Sweet endings crafted with seasonal ingredients and love.",
      iconPath: "M12 2L4.5 9.5a4.95 4.95 0 000 7 4.95 4.95 0 007 0L19 9l-7-7z",
      bg: "/assets/menu/most_ordered_dish.png"
    },
    "Drinks": {
      desc: "Refreshing crafted beverages and classic cocktails.",
      iconPath: "M16 2L8 10v10a2 2 0 002 2h4a2 2 0 002-2V10l-2-8z",
      bg: "/assets/menu/most_ordered_dish.png"
    },
    "Alcohol": {
      desc: "Curated selection of fine spirits and premium wines.",
      iconPath: "M6 2h12l-6 9v11",
      bg: "/assets/menu/most_ordered_dish.png"
    }
  };

  let selectedCategory = $state(page.url.searchParams.get("category") || "Starters");
  const activeMeta = $derived(categoryMeta[selectedCategory] || categoryMeta["Starters"]);
  const filteredItems = $derived(allItems.filter(item => 
    item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
    selectedCategory.toLowerCase().includes(item.category.toLowerCase())
  ));

  function handleCategoryChange(name: string) {
    selectedCategory = name;
  }
</script>

<svelte:head>
  <title>{selectedCategory} | Categories</title>
</svelte:head>

<PageLayout heroHeight="50svh">
  {#snippet nav()}
    <AppHero 
      mode="static"
      showBack={true}
      backPath="/home"
      topBarOnly={true}
    />
  {/snippet}

  {#snippet hero()}
    <AppHero 
      mode="static"
      title={selectedCategory}
      subtitle={activeMeta.desc}
      iconPath={activeMeta.iconPath}
      bgImage={activeMeta.bg}
    />
  {/snippet}

  <div class="sticky-nav">
    <CategoryTabScroll 
      bind:activeCategory={selectedCategory} 
      onSelect={handleCategoryChange} 
    />
  </div>

  <div class="grid-container">
    <MenuGrid items={filteredItems} />
  </div>
</PageLayout>

<style>
  .sticky-nav {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
    border-radius: 32px 32px 0 0;
  }

  .grid-container {
    padding-top: 0.5rem;
  }

  :global(.categories-page .menu-grid) {
    padding-top: 0 !important;
  }

  :global(.categories-page .menu-grid .header) {
    display: none !important;
  }
</style>
