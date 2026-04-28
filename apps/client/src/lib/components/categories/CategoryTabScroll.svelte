<script lang="ts">
  let { activeCategory = $bindable("Starters"), onSelect } = $props();

  const categories = [
    {
      id: "starters",
      name: "Starters",
      emoji: "🥗",
    },
    {
      id: "main",
      name: "Main",
      emoji: "🍛",
    },
    {
      id: "desserts",
      name: "Desserts",
      emoji: "🍰",
    },
    {
      id: "drinks",
      name: "Drinks",
      emoji: "🥤",
    },
    {
      id: "alcohol",
      name: "Alcohol",
      emoji: "🍷",
    },
  ];

  function handleSelect(name: string) {
    activeCategory = name;
    if (onSelect) onSelect(name);
  }
</script>

<div class="category-tabs">
  <div class="tabs-scroll">
    {#each categories as cat}
      <button
        class="tab-item"
        class:active={activeCategory
          ?.toLowerCase()
          .includes(cat.name.toLowerCase())}
        onclick={() => handleSelect(cat.name)}
      >
        <div class="icon-wrap">
          <span class="emoji">{cat.emoji}</span>
        </div>
        <span class="tab-name">{cat.name}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .category-tabs {
    width: 100%;
    position: relative;
    z-index: 10;
    padding: 1rem 0 0;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #f0f0f0;
  }

  .tabs-scroll {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 1rem;
    justify-content: space-between;
    gap: 0.25rem;
  }

  .tabs-scroll::-webkit-scrollbar {
    display: none;
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    padding: 0 0.5rem 0.75rem;
    cursor: pointer;
    min-width: 70px;
    flex: 1;
    transition: all 0.2s ease;
    position: relative;
  }

  .icon-wrap {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
  }

  /* Make the SVG inside respect the icon-wrap size */
  /* Size the emoji similar to the original SVG */
  .icon-wrap .emoji {
    font-size: 20px;
    line-height: 1;
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  .tab-item.active .icon-wrap {
    color: #000;
  }

  .tab-name {
    font-size: 0.8rem;
    font-weight: 700;
    color: #111;
    letter-spacing: -0.2px;
    white-space: nowrap;
  }

  .tab-item.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 2px;
    background: #111;
    border-radius: 2px 2px 0 0;
  }

  .tab-item {
    transition: all 0.25s cubic-bezier(0.33, 1, 0.68, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .tab-item:active {
    transform: scale(0.92);
    opacity: 0.7;
  }
</style>
