<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";
  import { goto } from "$app/navigation";

  let { activeCategory = $bindable("Main Course") } = $props();

  const categories = [
    {
      id: "starters",
      prefix: "Our",
      name: "Starters",
      gradient: "linear-gradient(180deg, #FFF0F0 0%, #FFE4E4 100%)",
      textColor: "#8B4513",
      accentColor: "#D2691E",
      borderColor: "#FFDADA",
      image: "/assets/category-cards/starters.png",
    },
    {
      id: "main",
      prefix: "Main",
      name: "Course",
      gradient: "linear-gradient(180deg, #FFF5E6 0%, #FFECD1 100%)",
      textColor: "#D2691E",
      accentColor: "#E67E22",
      borderColor: "#FFE0B2",
      image: "/assets/category-cards/main.png",
    },
    {
      id: "salads",
      prefix: "Salad",
      name: "Selection",
      gradient: "linear-gradient(180deg, #F0FFF0 0%, #E0FFE0 100%)",
      textColor: "#2E7D32",
      accentColor: "#4CAF50",
      borderColor: "#C8E6C9",
      image: "/assets/category-cards/salads.png",
    },
    {
      id: "desserts",
      prefix: "Sweet",
      name: "Treats",
      gradient: "linear-gradient(180deg, #F5F0FF 0%, #EBE0FF 100%)",
      textColor: "#483D8B",
      accentColor: "#6A5ACD",
      borderColor: "#E1D5FF",
      image: "/assets/category-cards/desserts.png",
    },
    {
      id: "drinks",
      prefix: "Cold",
      name: "Drinks",
      gradient: "linear-gradient(180deg, #F0FAFF 0%, #E0F4FF 100%)",
      textColor: "#134B8B",
      accentColor: "#2980B9",
      borderColor: "#D1EBF7",
      image: "/assets/category-cards/drinks.png",
    },
  ];

  function handleSelect(categoryName: string) {
    activeCategory = categoryName;
    goto(`/categories?category=${encodeURIComponent(categoryName)}`);
  }
</script>

<div class="categories-container">
  <div class="scroll-wrapper">
    {#each categories as cat}
      <button
        class="category-card"
        style="background: {cat.gradient}; border: 3px solid {cat.borderColor}"
        onclick={() => handleSelect(cat.prefix + " " + cat.name)}
      >
        <div class="text-content">
          <span class="prefix" style="color: {cat.accentColor}"
            >{cat.prefix}</span
          >
          <h3 class="name" style="color: {cat.textColor}">{cat.name}</h3>
        </div>
        <img
          src={resolveImagePath(cat.image)}
          alt={cat.name}
          class="cat-image"
        />
      </button>
    {/each}
  </div>
</div>

<style>
  .categories-container {
    width: 100%;
    overflow: hidden;
  }

  .scroll-wrapper {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
  }

  .scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  .category-card {
    flex: 0 0 140px;
    height: 140px;
    border-radius: 18px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    scroll-snap-align: start;
  }

  .category-card:first-child {
    margin-left: 1.5rem;
  }

  .category-card:last-child {
    margin-right: 1.5rem;
  }

  .category-card:active {
    transform: scale(0.96);
  }

  .text-content {
    position: relative;
    z-index: 2;
  }

  .prefix {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: "Outfit", sans-serif;
    line-height: 1;
    margin-bottom: 2px;
    text-transform: capitalize;
  }

  .name {
    font-family: "Playfair Display", serif;
    font-size: 1.45rem;
    font-weight: 800;
    font-style: italic;
    margin: 0;
    line-height: 1.1;
  }

  img {
    mix-blend-mode: multiply;
    width: 110%;
  }

  button {
    padding: 16px;
  }
</style>
