<script lang="ts">
  import { page } from "$app/state";
  import AppHero from "$lib/components/shared/AppHero.svelte";
  import PageLayout from "$lib/layouts/PageLayout.svelte";
  import CategoryTabScroll from "$lib/components/categories/CategoryTabScroll.svelte";
  import MenuGrid from "$lib/components/home/MenuGrid.svelte";
  import { resolveImagePath } from "$lib/utils/image";

  // Mock data for all items to demonstrate filtering
  const allItems = [
    { name: "Tandoori Broccoli", price: "₹675", image: "/assets/menu/most_ordered_dish.png", time: "20-25 mins", category: "Starters", type: "Veg" },
    { name: "Tandoori Chooza", price: "₹675", image: "/assets/menu/most_ordered_dish.png", time: "20-25 mins", category: "Starters", type: "Non-Veg" },
    { name: "BBQ Ribs", price: "₹850", image: "/assets/menu/most_ordered_dish.png", time: "25-30 mins", category: "Main", type: "Non-Veg" },
    { name: "Paneer Tikka", price: "₹550", image: "/assets/menu/most_ordered_dish.png", time: "15-20 mins", category: "Starters", type: "Veg" },
    { name: "Chocolate Brownie", price: "₹350", image: "/assets/menu/most_ordered_dish.png", time: "10 mins", category: "Desserts", type: "Veg" },
    { name: "Margarita", price: "₹450", image: "/assets/menu/most_ordered_dish.png", time: "5 mins", category: "Alcohol", type: "Non-Veg" },
    { name: "Fresh Lime Soda", price: "₹150", image: "/assets/menu/most_ordered_dish.png", time: "5 mins", category: "Drinks", type: "Veg" },
    { name: "Hakka Noodles", price: "₹450", image: "/assets/menu/most_ordered_dish.png", time: "15 mins", category: "Main", type: "Veg" },
  ];

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
  {#snippet hero()}
    <AppHero 
      mode="static"
      title={selectedCategory}
      subtitle={activeMeta.desc}
      iconPath={activeMeta.iconPath}
      bgImage={activeMeta.bg}
      showBack={true}
      backPath="/home"
    />
  {/snippet}

  <div class="sticky-nav">
    <CategoryTabScroll 
      bind:activeCategory={selectedCategory} 
      onSelect={handleCategoryChange} 
    />

    <div class="filter-bar">
      <div class="dropdown-group">
        <button class="filter-chip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="14" y1="21" y2="21"/><line x1="4" x2="10" y1="14" y2="14"/><line x1="4" x2="18" y1="7" y2="7"/><path d="M14 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/><path d="M10 14v-4a2 2 0 012-2h2a2 2 0 012 2v4"/><path d="M18 7V3a2 2 0 00-2-2h-2a2 2 0 00-2 2v4"/>
          </svg>
          Filters
          <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <button class="filter-chip">
          All Cuisine
          <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
      
      <div class="view-toggles">
        <button class="view-btn active" aria-label="List view">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        </button>
        <button class="view-btn" aria-label="Grid view">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </button>
      </div>
    </div>
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

  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .dropdown-group {
    display: flex;
    gap: 0.75rem;
  }

  .filter-chip {
    padding: 0.75rem 1.25rem;
    border: 1px solid #eaeaea;
    border-radius: 100px;
    background: white;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #111;
    cursor: pointer;
  }

  .chevron { opacity: 0.5; margin-top: 1px; }

  .view-toggles {
    display: flex;
    gap: 0.5rem;
    background: #f2f2f2;
    padding: 0.35rem;
    border-radius: 14px;
  }

  .view-btn {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    border: none;
    background: transparent;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .view-btn.active {
    background: white;
    color: #111;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
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
