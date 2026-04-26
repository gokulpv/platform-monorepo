<script lang="ts">
  import { page } from "$app/state";
  import { mockDishes } from "$lib/data/mock-menu";
  import AppHero from "$lib/components/shared/AppHero.svelte";
  import PageLayout from "$lib/layouts/PageLayout.svelte";
  import CategoryTabScroll from "$lib/components/categories/CategoryTabScroll.svelte";
  import MenuGrid from "$lib/components/home/MenuGrid.svelte";
  import Header from "$lib/components/shared/Header.svelte";
  import { goto } from "$app/navigation";

  const categoryMeta: Record<
    string,
    { desc: string; iconPath: string; bg: string }
  > = {
    Starters: {
      desc: "Slow-boiled in rich Cajun butter with baby potatoes and herbs.",
      iconPath:
        "M11 6l-5 5m11-5l-5 5M9 22H5a2 2 0 01-2-2V7l2-2h14l2 2v13a2 2 0 01-2 2h-4",
      bg: "/assets/menu/most_ordered_dish.png",
    },
    Main: {
      desc: "Authentic hearth-cooked entrees and signature grills.",
      iconPath: "M3 11c0 4.4 3.6 8 8 8h2c4.4 0 8-3.6 8-8V5H3v6z",
      bg: "/assets/menu/most_ordered_dish.png",
    },
    Desserts: {
      desc: "Sweet endings crafted with seasonal ingredients and love.",
      iconPath: "M12 2L4.5 9.5a4.95 4.95 0 000 7 4.95 4.95 0 007 0L19 9l-7-7z",
      bg: "/assets/menu/most_ordered_dish.png",
    },
    Drinks: {
      desc: "Refreshing crafted beverages and classic cocktails.",
      iconPath: "M16 2L8 10v10a2 2 0 002 2h4a2 2 0 002-2V10l-2-8z",
      bg: "/assets/menu/most_ordered_dish.png",
    },
    Alcohol: {
      desc: "Curated selection of fine spirits and premium wines.",
      iconPath: "M6 2h12l-6 9v11",
      bg: "/assets/menu/most_ordered_dish.png",
    },
  };

  let { data } = $props();
  const primaryColor = $derived(data.brand?.primary_color ?? "#4A0404");

  let selectedCategory = $state(
    page.url.searchParams.get("category") ?? "Starters",
  );
  const activeMeta = $derived(
    categoryMeta[selectedCategory] ?? categoryMeta["Starters"],
  );
  const filteredItems = $derived(
    mockDishes.filter(
      (item) =>
        item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.category.toLowerCase()),
    ),
  );
</script>

<svelte:head>
  <title>{selectedCategory} | Menu</title>
</svelte:head>

<PageLayout heroHeight="50svh" {primaryColor}>
  {#snippet nav()}
    <Header showLogo={false} showBack={true} goBack={() => goto("/home")} />
  {/snippet}

  {#snippet hero()}
    <AppHero
      title={selectedCategory}
      description={activeMeta.desc}
      bgImage={filteredItems[0]?.image || activeMeta.bg}
    />
  {/snippet}

  <div class="sticky-nav">
    <CategoryTabScroll bind:activeCategory={selectedCategory} />
  </div>

  <div class="grid-container">
    {#if filteredItems.length}
      <MenuGrid items={filteredItems} />
    {:else}
      <p class="empty-state">Nothing here yet.</p>
    {/if}
  </div>
</PageLayout>

<style>
  .sticky-nav {
    margin: -16px;
  }

  .grid-container {
    margin-top: 2rem;
  }

  .category-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
    margin-top: 2px;
  }

  .category-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111;
    margin: 0 0 0.2rem;
    line-height: 1.2;
  }

  .category-desc {
    font-size: 0.78rem;
    color: #888;
    margin: 0;
    line-height: 1.5;
  }

  .empty-state {
    text-align: center;
    color: #aaa;
    font-size: 0.9rem;
    padding: 3rem 0;
    margin: 0;
  }
</style>
