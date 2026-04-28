<script lang="ts">
  import { page } from "$app/state";
  import { mockDishes } from "$lib/data/mock-menu";
  import { resolveImagePath } from "$lib/utils/image";
  import Header from "$lib/components/shared/Header.svelte";
  import DishRecommendations from "$lib/components/dish/DishRecommendations.svelte";

  const dishId = $derived(page.params.id);
  const dish = $derived(
    mockDishes.find((d) => d.id === dishId) ?? mockDishes[0],
  );
  const otherDishes = $derived(mockDishes.filter((d) => d.id !== dish.id));
</script>

<div class="dish-detail-page">
  <Header showLogo={false} showBack={true} showCart={true} showVegToggle={false} />

  <main class="content">
    <div class="info-section">
      <div class="category-eyebrow">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M11 6l-5 5m11-5l-5 5M9 22H5a2 2 0 01-2-2V7l2-2h14l2 2v13a2 2 0 01-2 2h-4"
          />
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
        <div class="platform-base"></div>
        <img
          src={resolveImagePath(dish.image)}
          alt={dish.name}
          class="main-img"
          style="view-transition-name:dish-img-{dish.id};view-transition-class:dish-transition"
        />
      </div>

      <button class="ar-btn" style="view-transition-name:ar-button">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        View on your table
      </button>

      <button
        class="add-btn"
        aria-label="Add to cart"
        style="view-transition-name:add-button-{dish.id}"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>

    <DishRecommendations dishes={otherDishes} />
  </main>
</div>

<style>
  .dish-detail-page {
    height: 100svh;
    overflow: hidden;
    background: #fdfaf9;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

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
    justify-content: center;
    align-items: center;
    min-height: 180px;
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
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.08),
      transparent 70%
    );
    border-radius: 50%;
  }

  .main-img {
    position: relative;
    z-index: 1;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 24px;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.12));
    mix-blend-mode: multiply;
  }

  .ar-btn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    translate: -50% 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    cursor: pointer;
    z-index: 10;
  }

  .add-btn {
    position: absolute;
    bottom: 0;
    right: 1.5rem;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: scale 0.2s;
    z-index: 20;
  }

  .add-btn:active {
    scale: 0.9;
  }
</style>
