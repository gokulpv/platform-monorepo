<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";
  import { goto } from "$app/navigation";

  let { items = [] } = $props();

  function navigateToDetail(id: string) {
    if (id) {
      goto(`/dish/${id}`);
    }
  }
</script>

<div class="menu-grid">
  <div class="header">
    <h2 class="section-title">All Items</h2>
    <div class="view-options">
      <button type="button" class="filter" aria-label="Filter menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16m-7 6h7"/></svg>
      </button>
    </div>
  </div>

  <div class="grid">
    {#each items as item}
      <div 
        class="card" 
        role="button" 
        tabindex="0"
        onclick={() => navigateToDetail(item.id)}
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateToDetail(item.id); }}
      >
        <div class="image-wrapper">
          <img 
            src={resolveImagePath(item.image)} 
            alt={item.name} 
            class="image" 
            style="view-transition-name: dish-img-{item.id}"
          />
          <button 
            class="add-btn" 
            aria-label="Add to cart" 
            onclick={(e) => { e.stopPropagation(); /* handle add to cart */ }}
            style="view-transition-name: add-button-{item.id}"
          >+</button>
        </div>
        <div class="content">
          <h3 class="name">{item.name}</h3>
          
          {#if item.type}
            <div class="dietary-info">
              <span class="veg-icon {item.type.toLowerCase()}">
                <span class="dot"></span>
              </span>
              <span class="veg-label">{item.type}</span>
              <span class="divider">|</span>
              <span class="time">{item.time}</span>
            </div>
          {/if}

          <div class="footer">
            <span class="price">{item.price}</span>
            {#if !item.type}
              <span class="time">⏱️ {item.time}</span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .menu-grid { padding: 1rem 1.5rem 4rem; }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-title { font-size: 1.25rem; font-weight: 700; margin: 0; }

  .filter {
    background: #f5f5f5;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .card { 
    border-radius: 20px; 
    overflow: hidden; 
    transition: all 0.25s cubic-bezier(0.33, 1, 0.68, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .card:active {
    transform: scale(0.96);
    opacity: 0.9;
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1;
    border-radius: 20px;
    overflow: hidden;
  }

  .image { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }

  .add-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    background: black;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  .content { padding: 0.75rem 0.25rem; }

  .name {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: #111;
  }

  .dietary-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 0.75rem;
  }

  .veg-icon {
    width: 14px;
    height: 14px;
    border: 2px solid #2e7d32;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
  }

  .veg-icon.non-veg {
    border-color: #d32f2f;
  }

  .veg-icon .dot {
    width: 6px;
    height: 6px;
    background: #2e7d32;
    border-radius: 50%;
  }

  .veg-icon.non-veg .dot {
    background: #d32f2f;
  }

  .veg-label {
    color: #2e7d32;
    font-weight: 600;
  }

  .veg-icon.non-veg + .veg-label {
    color: #d32f2f;
  }

  .divider {
    color: #ddd;
    font-weight: 300;
  }

  .footer { display: flex; justify-content: space-between; align-items: center; }
  .price { font-size: 0.95rem; font-weight: 700; color: #111; }
  .time { font-size: 0.75rem; color: #888; font-weight: 500; }
</style>
