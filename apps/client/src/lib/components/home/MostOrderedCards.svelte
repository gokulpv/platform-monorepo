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

<div class="most-ordered">
  <div class="scroll-container">
    <div class="cards">
      {#each items as item}
        <button
          class="card"
          style="background-image: url({resolveImagePath(item.image)})"
          onclick={() => navigateToDetail(item.id)}
        >
          <div class="overlay"></div>
          <div class="info">
            <span class="rating">⭐ {item.rating}</span>
            <h3 class="name">{item.name}</h3>
            <p class="price">{item.price}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .scroll-container {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
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
    background: green center/cover;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    transition: all 0.25s cubic-bezier(0.33, 1, 0.68, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), transparent 80%);
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
    margin-top: 4px;
    opacity: 0.9;
  }
</style>
