<script lang="ts">
  let { categories = [
    { name: "Starters", icon: "🍢" },
    { name: "Main", icon: "🍲" },
    { name: "Desserts", icon: "🍰" },
    { name: "Drinks", icon: "🍹" },
    { name: "Alcohol", icon: "🍷" },
    { name: "Starters", icon: "🍢" },
    { name: "Starters", icon: "🍢" },
    { name: "Starters", icon: "🍢" }
  ] } = $props();

  let activeCategory = $state("Main");
</script>

<div class="category-grid">
  {#each categories as category}
    <button 
      class="category-item" 
      class:active={activeCategory === category.name}
      onclick={() => activeCategory = category.name}
    >
      <div class="icon-circle">
        <span class="icon">{category.icon}</span>
      </div>
      <span class="name">{category.name}</span>
    </button>
  {/each}
</div>

<style>
  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem 0.5rem;
    padding: 1rem;
  }

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    padding: 0;
  }

  .icon-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background: white;
  }

  .active .icon-circle { border-color: #111; background: #f9f9f9; transform: scale(1.05); }

  .name { font-size: 0.8rem; font-weight: 500; color: #666; }
  .active .name { color: #111; font-weight: 600; }
</style>
