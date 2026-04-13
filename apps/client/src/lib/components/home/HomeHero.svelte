<script lang="ts">
  import { fade } from "svelte/transition";
  import { resolveImagePath } from "$lib/utils/image";
  let { items = [] } = $props();

  let activeIndex = $state(0);
  let isVeg = $state(false);

  $effect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % items.length;
    }, 4000);
    return () => clearInterval(interval);
  });

  function goToSlide(index: number) {
    activeIndex = index;
  }
</script>

<section class="hero">
  {#if items.length > 0}
    {#key activeIndex}
      <div 
        class="background" 
        style="background-image: url({resolveImagePath(items[activeIndex].image_url)})"
        transition:fade={{ duration: 800 }}
      ></div>

      <div class="content">
        <h1 class="title">Today's Spotlight Dish</h1>
        {#key activeIndex}
          <div class="dynamic-content" transition:fade={{ duration: 600, delay: 100 }}>
            <p class="description">{items[activeIndex].subtitle || items[activeIndex].description}</p>
          </div>
        {/key}
        
        <div class="carousel-indicators">
          {#each items as _, i}
            <button 
              class="indicator" 
              class:active={activeIndex === i}
              onclick={() => goToSlide(i)}
            ></button>
          {/each}
        </div>
      </div>
    {/key}
  {:else}
    <div class="background placeholder">
      <div class="content">
        <h1 class="title">Welcome</h1>
        <p class="description">Loading today's specialties...</p>
      </div>
    </div>
  {/if}

  <div class="overlay"></div>

  <div class="top-bar">
    <a href="/" class="brand-logo">
      <div class="logo-inner">KOI</div>
    </a>
    <button
      type="button"
      class="veg-toggle"
      class:active={isVeg}
      aria-pressed={isVeg}
      aria-label="Toggle vegetarian filter"
      onclick={() => (isVeg = !isVeg)}
    >
      <div class="toggle-dot" class:veg={isVeg}></div>
      <span>Veg</span>
    </button>
  </div>

  <button type="button" class="arrow-cta" aria-label="Scroll to content">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
  </button>
</section>

<style>
  /* svh (not dvh): fixed layer must not resize when mobile browser chrome hides during scroll — dvh caused image vs text jitter. */
  .hero {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50svh;
    overflow: hidden;
    z-index: 1;
    color: white;
    background: #000;
    isolation: isolate;
  }

  .background, .overlay {
    position: absolute;
    inset: 0;
  }

  .background {
    background-size: cover;
    background-position: center;
  }

  .placeholder { background: #111; }

  .overlay {
    z-index: 1;
    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,1) 100%);
  }

  .top-bar {
    position: relative;
    z-index: 2;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-logo, .toggle-dot, .arrow-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .brand-logo {
    width: 44px;
    height: 44px;
    background: #8B0000;
    border: 2px solid white;
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 1px;
    text-decoration: none;
    color: white;
  }

  .veg-toggle {
    background: white;
    color: #2e7d32;
    padding: 4px 12px 4px 6px;
    border-radius: 100px;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
  }

  .toggle-dot {
    width: 18px;
    height: 18px;
    background: #ccc;
    position: relative;
  }

  .toggle-dot::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }

  .toggle-dot.veg { background: #2e7d32; }

  .content {
    position: absolute;
    top: 48%;
    bottom: max(1rem, env(safe-area-inset-bottom, 0px));
    left: 1.5rem;
    right: 5.5rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 0.25rem;
  }

  .title {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    line-height: 1.05;
    margin: 0 0 1rem 0;
    font-weight: 500;
    font-style: italic;
  }

  .description {
    font-size: 0.9rem;
    line-height: 1.5;
    opacity: 0.8;
    max-width: 80%;
    margin-bottom: 1.5rem;
  }

  .carousel-indicators {
    display: flex;
    gap: 6px;
  }

  .indicator {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .indicator.active {
    background: white;
    width: 14px;
    border-radius: 4px;
  }

  .arrow-cta {
    position: absolute;
    bottom: max(1rem, env(safe-area-inset-bottom, 0px));
    right: 1.5rem;
    width: 56px;
    height: 56px;
    background: white;
    color: black;
    border: none;
    z-index: 3;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
</style>
