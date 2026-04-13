<script lang="ts">
  let { activeCategory = $bindable("Starters"), onSelect } = $props();

  const categories = [
    { 
      id: "starters", 
      name: "Starters", 
      icon: `<path d="M11 6l-5 5m11-5l-5 5M9 22H5a2 2 0 01-2-2V7l2-2h14l2 2v13a2 2 0 01-2 2h-4"/><path d="M12 2v3"/><path d="M12 7v10"/><path d="M15 22v-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v3"/>` 
    },
    { 
      id: "main", 
      name: "Main", 
      icon: `<path d="M3 11c0 4.4 3.6 8 8 8h2c4.4 0 8-3.6 8-8V5H3v6z"/><path d="M12 19v3"/><path d="M9 22h6"/>` 
    },
    { 
      id: "desserts", 
      name: "Desserts", 
      icon: `<path d="M12 2L4.5 9.5a4.95 4.95 0 000 7 4.95 4.95 0 007 0L19 9l-7-7z"/><path d="M12 22v-3"/><path d="M9 19h6"/>` 
    },
    { 
      id: "drinks", 
      name: "Drinks", 
      icon: `<path d="M16 2L8 10v10a2 2 0 002 2h4a2 2 0 002-2V10l-2-8z"/><path d="M8 10h8"/><path d="M12 15l1 1"/>` 
    },
    { 
      id: "alcohol", 
      name: "Alcohol", 
      icon: `<path d="M6 2h12l-6 9v11"/><path d="M8 22h8"/><path d="M12 11l-3 5h6"/>` 
    }
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
        class:active={activeCategory?.toLowerCase().includes(cat.name.toLowerCase())}
        onclick={() => handleSelect(cat.name)}
      >
        <div class="icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            {@html cat.icon}
          </svg>
        </div>
        <span class="tab-name">{cat.name}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .category-tabs {
    width: 100%;
    background: white;
    border-radius: 32px 32px 0 0;
    margin-top: -2rem; /* Overlap with hero slightly for better curve */
    position: relative;
    z-index: 10;
    padding: 1rem 0 0;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.05);
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
    opacity: 0.4;
    transition: all 0.2s ease;
    position: relative;
  }

  .tab-item.active {
    opacity: 1;
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
  .icon-wrap svg {
    width: 20px;
    height: 20px;
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
    content: '';
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
