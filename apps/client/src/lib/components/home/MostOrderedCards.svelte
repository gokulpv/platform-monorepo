<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";

  let {
    items = [
      {
        name: "Classic Wagyu Burger",
        price: "$18",
        image: "/assets/menu/most_ordered_dish.png",
        rating: "4.9",
      },
      {
        name: "Spicy Miso Ramen",
        price: "$15",
        image: "/assets/menu/most_ordered_dish.png",
        rating: "4.8",
      },
      {
        name: "Avocado Toast",
        price: "$12",
        image: "/assets/menu/most_ordered_dish.png",
        rating: "4.7",
      },
    ],
  } = $props();
</script>

<div class="most-ordered">

  <div class="scroll-container">
    <div class="cards">
      {#each items as item}
        <div
          class="card"
          style="background-image: url({resolveImagePath(item.image)})"
        >
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
  .most-ordered { padding: 1rem 0; }

  .scroll-container {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 1rem 0;
  }
  .scroll-container::-webkit-scrollbar { display: none; }

  .cards {
    display: flex;
    gap: 1.25rem;
    width: max-content;
  }

  .card {
    width: 240px;
    height: 160px;
    background: #222 center/cover;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .card:first-child { margin-left: 1.5rem; }
  .card:last-child { margin-right: 1.5rem; }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 70%);
  }

  .info { position: relative; z-index: 1; }

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

  .name { font-size: 1rem; margin: 0; font-weight: 600; }
  .price { font-size: 0.85rem; margin-top: 4px; opacity: 0.9; }
</style>
