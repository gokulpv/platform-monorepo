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
  <div class="grid">
    {#each items as item}
      <div
        class="card"
        tabindex="0"
        onclick={() => navigateToDetail(item.id)}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") navigateToDetail(item.id);
        }}
      >
        <div class="image-wrapper">
          <img
            src={resolveImagePath(item.image)}
            alt={item.name}
            class="image"
            style="view-transition-name: dish-img-{item.id}; view-transition-class: dish-transition;"
          />
          <button
            class="add-btn"
            aria-label="Add to cart"
            onclick={(e) => {
              e.stopPropagation(); /* handle add to cart */
            }}
            style="view-transition-name: add-button-{item.id}">+</button
          >
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
  .divider-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .line {
    flex: 1;
    height: 1px;
    background: #eee;
  }

  .section-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 0;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .card {
    border-radius: 20px;
    overflow: hidden;
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1;
    border-radius: 20px;
    overflow: hidden;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .content {
    padding: 0.75rem 0.25rem;
  }

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

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .price {
    font-size: 0.95rem;
    font-weight: 700;
    color: #111;
  }
  .time {
    font-size: 0.75rem;
    color: #888;
    font-weight: 500;
  }
</style>
