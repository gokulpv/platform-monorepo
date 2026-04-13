<script lang="ts">
  import { resolveImagePath } from "$lib/utils/image";
  import { goto } from "$app/navigation";
  
  let { dishes = [] } = $props();

  function navigateToDish(id: string) {
    goto(`/dish/${id}`);
  }
</script>

<div class="recommendations">
  <div class="header">
    <h3 class="title">Select dishes</h3>
    <button class="view-all">SEE ALL <span class="arrow">→</span></button>
  </div>

  <div class="cards-scroll">
    {#each dishes as item}
      <button class="rec-card" onclick={() => navigateToDish(item.id)}>
        <div class="img-wrap">
          <img src={resolveImagePath(item.image)} alt={item.name} />
        </div>
        <div class="card-content">
          <h4 class="name">{item.name}</h4>
          <div class="meta">
            <span class="rating">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#2e7d32">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {item.rating || '4.5'}
            </span>
            <span class="dot">•</span>
            <span class="time">{item.time}</span>
          </div>
          <div class="price">{item.price}</div>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .recommendations {
    padding: 0 0 2rem;
    position: relative;
    z-index: 5;
  }

  .header {
    display: none; /* Removed header and Select dishes text */
  }

  .cards-scroll {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 1.25rem;
    gap: 0.75rem;
  }

  .cards-scroll::-webkit-scrollbar { display: none; }

  .rec-card {
    flex: 0 0 220px;
    background: white;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 16px;
    padding: 0.5rem;
    display: flex;
    gap: 0.75rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.33, 1, 0.68, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .rec-card:active {
    transform: scale(0.96);
    opacity: 0.9;
  }

  .img-wrap {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .name {
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0 0 0.15rem 0;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.7rem;
    color: #888;
    margin-bottom: 0.25rem;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    color: #111;
    font-weight: 700;
  }

  .price {
    font-size: 0.8rem;
    font-weight: 700;
    color: #111;
  }
</style>
