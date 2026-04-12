<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { resolveImagePath } from "$lib/utils/image";

  let { items = [] } = $props();

  let activeIndex = $state(0);
  let isVeg = $state(false);
  let interval: any;

  function nextSlide() {
    if (items.length > 0) {
      activeIndex = (activeIndex + 1) % items.length;
    }
  }

  function goToSlide(index: number) {
    activeIndex = index;
    resetInterval();
  }

  function resetInterval() {
    if (interval) clearInterval(interval);
    if (items.length > 1) {
      interval = setInterval(nextSlide, 4000);
    }
  }

  onMount(() => {
    resetInterval();
    return () => {
      if (interval) clearInterval(interval);
    };
  });
</script>

<section class="hero">
  {#if items.length > 0}
    {#key activeIndex}
      <div 
        class="background" 
        style="background-image: url({resolveImagePath(items[activeIndex].image_url)})"
        transition:fade={{ duration: 800 }}
      >
        <div class="overlay"></div>
      </div>

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
              aria-label="Go to slide {i + 1}"
            ></button>
          {/each}
        </div>
      </div>
    {/key}
  {:else}
    <div class="background placeholder">
      <div class="overlay"></div>
      <div class="content">
        <h1 class="title">Welcome</h1>
        <p class="description">Loading today's specialties...</p>
      </div>
    </div>
  {/if}

  <div class="top-bar">
    <div class="brand-logo">
      <div class="logo-inner">KOI</div>
    </div>
    <div class="veg-toggle" class:active={isVeg} onclick={() => isVeg = !isVeg}>
      <div class="toggle-dot" class:veg={isVeg}></div>
      <span>Veg</span>
    </div>
  </div>

  <button class="arrow-cta">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
  </button>
</section>

<style>
  .hero {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    overflow: hidden;
    z-index: 1;
    color: white;
    background: #000;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .placeholder {
    background: #111;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(29, 0, 0, 0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%);
  }

  .top-bar {
    position: relative;
    z-index: 2;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-logo {
    width: 44px;
    height: 44px;
    background: #8B0000;
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 1px;
  }

  .veg-toggle {
    background: white;
    color: #2e7d32;
    padding: 4px 12px 4px 6px;
    border-radius: 100px;
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
    border-radius: 50%;
    background: #ccc;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toggle-dot::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }

  .toggle-dot.veg {
    background: #2e7d32;
  }

  .content {
    position: absolute;
    bottom: 8vh;
    left: 1.5rem;
    right: 1.5rem;
    z-index: 2;
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
    bottom: 8vh;
    right: 1.5rem;
    width: 56px;
    height: 56px;
    background: white;
    color: black;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
</style>
