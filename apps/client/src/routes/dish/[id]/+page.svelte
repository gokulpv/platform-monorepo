<script lang="ts">
  import { page } from "$app/state";
  import { mockDishes } from "$lib/data/mock-menu";
  import { resolveImagePath } from "$lib/utils/image";
  import DishLayout from "$lib/components/dish/DishLayout.svelte";

  let isArMounted = $state(false);
  let isImageFound = $state(false);
  let isArVisible = $state(false);
  let isArLoading = $state(false);

  function handleOpenAR() {
    isArLoading = true;
    isArMounted = true;
  }

  function handleArReady() {
    isArLoading = false;
    isArVisible = true;
    
    // Listen for image detection
    window.addEventListener('ar-image-found', () => isImageFound = true);
    window.addEventListener('ar-image-lost', () => isImageFound = false);
  }

  function handleCloseAR() {
    isArVisible = false;
    isImageFound = false;
    setTimeout(() => {
      isArMounted = false;
    }, 600);
  }

  const dishId = $derived(page.params.id);
  const dish = $derived(
    mockDishes.find((d) => d.id === dishId) ?? mockDishes[0],
  );
  const otherDishes = $derived(mockDishes);
</script>

<DishLayout 
  {otherDishes} 
  activeDishId={dish.id} 
  dishImage={dish.image}
  {isArMounted}
  {isArVisible}
  {isImageFound}
  onArReady={handleArReady}
>
  {#snippet children()}
    <div class="info-section">
      <div class="category-eyebrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 6l-5 5m11-5l-5 5M9 22H5a2 2 0 01-2-2V7l2-2h14l2 2v13a2 2 0 01-2 2h-4" />
        </svg>
        In {dish.category}
      </div>

      <div class="title-row">
        <h1 class="dish-name">{dish.name}</h1>
        <span class="price-tag">{dish.price}</span>
      </div>

      <p class="cuisine-info">{dish.cuisine}</p>
    </div>

    <div class="visual-section">
      <div class="dish-platform">
        <img src={resolveImagePath(dish.image)} alt={dish.name} class="main-img" />
        <div class="platform-base"></div>
      </div>
    </div>
  {/snippet}

  {#snippet actions()}
    <div class="actions-row">
      <div></div>
      <button
        class="ar-btn"
        class:active={isArMounted}
        onclick={isArMounted ? handleCloseAR : handleOpenAR}
        disabled={isArLoading}
      >
        {#if isArLoading}
          <div class="loading-spinner"></div>
          Loading...
        {:else if isArMounted}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Exit AR Mode
        {:else}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          View on your table
        {/if}
      </button>

      <div class="right-action-wrapper">
        <button class="add-btn" aria-label="Add to cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  {/snippet}
</DishLayout>

<style>
  .info-section {
    padding: 0 12px 1rem;
    flex-shrink: 0;
  }

  .category-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.4rem;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.4rem;
  }

  .dish-name {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    color: #111;
    flex: 1;
    padding-right: 1rem;
    line-height: 1.2;
  }

  .price-tag {
    font-size: 1.25rem;
    font-weight: 800;
  }

  .cuisine-info {
    font-size: 0.75rem;
    color: #999;
    margin: 0;
    line-height: 1.4;
  }

  .visual-section {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 240px;
  }

  .dish-platform {
    position: relative;
    width: 240px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .platform-base {
    position: absolute;
    bottom: 5%;
    left: 50%;
    translate: -50% 0;
    width: 80%;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.08), transparent 70%);
    border-radius: 50%;
  }

  .main-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  .actions-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 0 1.25rem 1.5rem;
  }

  .right-action-wrapper {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.75rem;
  }

  .ar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    height: 36px;
    padding: 0 0.8rem;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(12px);
    color: white;
    font-size: 0.7rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    cursor: pointer;
  }

  .ar-btn.active {
    background: rgba(220, 38, 38, 0.85);
    border-color: rgba(220, 38, 38, 0.5);
  }

  .add-btn {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .loading-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
