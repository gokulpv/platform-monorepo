<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";

  let { items = [
    { name: "Classic Wagyu Burger", price: "$18", image: "/images/placeholder.png", rating: "4.9" },
    { name: "Spicy Miso Ramen", price: "$15", image: "/images/placeholder.png", rating: "4.8" },
    { name: "Avocado Toast", price: "$12", image: "/images/placeholder.png", rating: "4.7" }
  ] } = $props();
</script>

<div class="most-ordered">
  <div class="header">
    <h2 class="section-title">Most Ordered</h2>
    <button class="see-all">See All</button>
  </div>
  
  <div class="scroll-container">
    <div class="cards">
      {#each items as item}
        <div class="card" style="background-image: url({resolveImagePath(item.image)})">
          <div class="overlay"></div>
          <div class="info">
            <span class="rating">⭐ {item.rating}</span>
            <h3 class="name">{item.name}</h3>
            <p class="price">{item.price}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .most-ordered {
    padding: 1rem 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }

  .see-all {
    background: none;
    border: none;
    color: #888;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .scroll-container {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 1.5rem;
    box-sizing: border-box;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .cards {
    display: flex;
    gap: 1.25rem;
    width: max-content;
  }

  .card {
    width: 240px;
    height: 160px;
    background-size: cover;
    background-position: center;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
  }

  .info {
    position: relative;
    z-index: 1;
  }

  .rating {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 1rem;
    margin: 0;
    font-weight: 600;
  }

  .price {
    font-size: 0.85rem;
    margin: 4px 0 0;
    opacity: 0.9;
  }
</style>
