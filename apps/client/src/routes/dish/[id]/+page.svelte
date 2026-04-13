<script lang="ts">
  import { page } from "$app/state";
  import { mockDishes } from "$lib/data/mock-menu";
  import { resolveImagePath } from "$lib/utils/image";
  import DishActionHeader from "$lib/components/dish/DishActionHeader.svelte";
  import DishRecommendations from "$lib/components/dish/DishRecommendations.svelte";
  
  const dishId = $derived(page.params.id);
  const dish = $derived(mockDishes.find(d => d.id === dishId) || mockDishes[0]);
  const otherDishes = $derived(mockDishes.filter(d => d.id !== dish.id));
</script>

<div class="dish-detail-page">
  <DishActionHeader />

  <main class="content">
    <div class="info-section">
      <div class="category-eyebrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 6l-5 5m11-5l-5 5M9 22H5a2 2 0 01-2-2V7l2-2h14l2 2v13a2 2 0 01-2 2h-4"/>
        </svg>
        In {dish.category}
      </div>
      
      <div class="title-row">
        <h1 class="dish-name">{dish.name}</h1>
        <div class="price-tag">{dish.price}</div>
      </div>
... (lines 30-41)
      <p class="cuisine-info">{dish.cuisine}</p>
    </div>

    <div class="visual-section">
      <div class="dish-platform">
        <div class="platform-base"></div>
        <div class="img-container">
          <img 
            src={resolveImagePath(dish.image)} 
            alt={dish.name} 
            class="main-img" 
            style="view-transition-name: dish-img-{dish.id}"
          />
        </div>
      </div>
      
      <button class="ar-btn" style="view-transition-name: ar-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
        View on your table
      </button>

      <button class="add-btn" aria-label="Add to cart" style="view-transition-name: add-button-{dish.id}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>

    <DishRecommendations dishes={otherDishes} />
  </main>
</div>

<style>
  .dish-detail-page {
    height: 100vh;
    height: 100svh;
    overflow: hidden;
    background: #fdfaf9;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; /* Important for flex children of a fixed-height parent */
  }

  .info-section {
    padding: 0 1.5rem 1rem;
    flex-shrink: 0;
  }

  .category-eyebrow {
    font-size: 0.8rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.4rem;
  }

  .dish-name {
    font-family: 'Outfit', sans-serif;
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
    color: #000;
  }

  .stats-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.8rem;
    color: #111;
    margin-bottom: 0.2rem;
  }

  .dietary-tag {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 700;
    color: #2e7d32;
  }

  .dietary-tag.non-veg { color: #d32f2f; }

  .dot-wrap {
    width: 12px;
    height: 12px;
    border: 1.5px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px;
  }

  .dot { width: 4px; height: 4px; background: currentColor; border-radius: 50%; }

  .divider { color: #ccc; }
  .time { font-weight: 600; color: #444; }

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
    justify-content: center;
    align-items: center;
    margin: 0.25rem 0;
    min-height: 180px;
    width: 100%;
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
    transform: translateX(-50%);
    width: 80%;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: 1;
  }

  .img-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    overflow: hidden;
  }

  .main-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
    mix-blend-mode: multiply;
  }

  .ar-btn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 50;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    white-space: nowrap;
  }

  .add-btn {
    position: absolute;
    bottom: 0;
    right: 1.5rem;
    width: 56px;
    height: 56px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 20;
    transition: transform 0.2s;
  }

  .add-btn:active { transform: scale(0.9); }
</style>
