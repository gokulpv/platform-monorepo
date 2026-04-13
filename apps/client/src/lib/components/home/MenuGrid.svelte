<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";

  let { items = [
    { name: "BBQ Ribs", price: "$24", image: "/assets/menu/most_ordered_dish.png", time: "25 min" },
    { name: "Caesar Salad", price: "$12", image: "/assets/menu/most_ordered_dish.png", time: "15 min" },
    { name: "Grilled Salmon", price: "$28", image: "/assets/menu/most_ordered_dish.png", time: "20 min" },
    { name: "Mushroom Risotto", price: "$22", image: "/assets/menu/most_ordered_dish.png", time: "30 min" },
    { name: "Steak Frites", price: "$32", image: "/assets/menu/most_ordered_dish.png", time: "25 min" },
    { name: "Lobster Bisque", price: "$18", image: "/assets/menu/most_ordered_dish.png", time: "20 min" }
  ] } = $props();
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
      <div class="card">
        <div class="image-wrapper">
          <img src={resolveImagePath(item.image)} alt={item.name} class="image" />
          <button class="add-btn">+</button>
        </div>
        <div class="content">
          <h3 class="name">{item.name}</h3>
          <div class="footer">
            <span class="price">{item.price}</span>
            <span class="time">⏱️ {item.time}</span>
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

  .card { border-radius: 20px; overflow: hidden; }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1;
    border-radius: 20px;
    overflow: hidden;
  }

  .image { width: 100%; height: 100%; object-fit: cover; }

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
    margin: 0 0 0.5rem 0;
    color: #111;
  }

  .footer { display: flex; justify-content: space-between; align-items: center; }
  .price { font-size: 1rem; font-weight: 700; color: #111; }
  .time { font-size: 0.7rem; color: #888; font-weight: 500; }
</style>
