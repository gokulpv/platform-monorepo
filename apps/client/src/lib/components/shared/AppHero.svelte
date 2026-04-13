<script lang="ts">
  import { fade } from "svelte/transition";
  import { resolveImagePath } from "$lib/utils/image";
  import { goto } from "$app/navigation";

  /**
   * AppHero is the universal hero component for the 3D Menu application.
   * Mode 'carousel': Uses 'items' to cycle through spotlights.
   * Mode 'static': Shows a single category banner with icon and description.
   */
  let { 
    mode = "carousel",
    items = [], 
    title = "Today's Spotlight Dish",
    subtitle = "",
    iconPath = "",
    bgImage = "",
    showVegToggle = false,
    showBack = false,
    backPath = "/home",
    topBarOnly = false,
    primaryColor = "#4A0404"
  } = $props();

  let activeIndex = $state(0);
  let isVeg = $state(false);

  // Carousel logic
  $effect(() => {
    if (mode !== "carousel" || items.length <= 1) return;
    const interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % items.length;
    }, 4000);
    return () => clearInterval(interval);
  });

  function goToSlide(index: number) {
    activeIndex = index;
  }

  function goBack() {
    goto(backPath);
  }

  function navigateToDetail() {
    if (mode === "carousel" && items[activeIndex]?.id) {
      goto(`/dish/${items[activeIndex].id}`);
    }
  }
</script>

{#if topBarOnly}
  <div class="top-bar persistent">
    {#if showBack}
      <button class="back-btn" onclick={goBack} aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span class="back-text">BACK</span>
      </button>
    {:else}
      <a href="/" class="brand-logo">
        <div class="logo-inner">KOI</div>
      </a>
    {/if}

    <div class="top-actions">
      {#if showVegToggle}
        <button
          type="button"
          class="veg-toggle"
          class:active={isVeg}
          onclick={() => (isVeg = !isVeg)}
        >
          <div class="toggle-dot" class:veg={isVeg}></div>
          <span>Veg</span>
        </button>
      {/if}

      {#if showBack}
        <div class="header-action-icons">
          <button class="icon-btn search" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
          <button class="icon-btn menu" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="18" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <section class="hero-container" style="background-color: #000">
    <!-- Dynamic Background -->
    {#if mode === "carousel" && items && items.length > 0 && items[activeIndex]}
      {#key activeIndex}
        {@const isStudio = items[activeIndex]?.image_url?.includes('categories') || items[activeIndex]?.image_url?.includes('highlight')}
        <a 
          href={items[activeIndex]?.dishId ? `/dish/${items[activeIndex].dishId}` : '#'}
          class="background-trigger"
          class:studio={isStudio}
          aria-label="View spotlight dish details"
          transition:fade={{ duration: 800 }}
          style="background-image: url({resolveImagePath(items[activeIndex]?.image_url)}); background-color: {isStudio ? primaryColor : 'transparent'}"
        ></a>
      {/key}
    {:else if mode === "static" || bgImage}
      {@const isStudio = (bgImage || items[0]?.image_url)?.includes('categories') || (bgImage || items[0]?.image_url)?.includes('highlight')}
      <div 
        class="background" 
        class:studio={isStudio}
        style="background-image: url({resolveImagePath(bgImage || (items && items[0]?.image_url))}); background-color: {isStudio ? primaryColor : 'transparent'}"
      ></div>
    {/if}

    <div class="overlay" class:studio-overlay={mode === "carousel" && (items[activeIndex]?.image_url?.includes('categories') || items[activeIndex]?.image_url?.includes('highlight'))} style="--overlay-color: {primaryColor}"></div>

    <!-- Hidden spacer to keep top-bar room if needed, but we render top-bar persistent externally -->
    <div class="top-bar placeholder"></div>

    <!-- Center/Bottom Content Wrapper -->
    <div class="hero-main-content">
      {#if mode === "carousel" && items && items.length > 0 && items[activeIndex]}
        {@const isStudio = items[activeIndex]?.image_url?.includes('categories')}
        <div class="carousel-content" class:studio-text={isStudio}>
          <a href={items[activeIndex]?.dishId ? `/dish/${items[activeIndex].dishId}` : '#'} class="text-trigger">
            <h2 class="carousel-eyebrow">{title}</h2>
            {#key activeIndex}
              <div class="dynamic-wrap" transition:fade={{ duration: 600, delay: 100 }}>
                <p class="description">{items[activeIndex]?.subtitle || items[activeIndex]?.description}</p>
              </div>
            {/key}
          </a>
          
          <div class="carousel-indicators">
            {#each items as _, i}
              <button class="indicator" class:active={activeIndex === i} onclick={() => goToSlide(i)}></button>
            {/each}
          </div>
        </div>
      {:else if mode === "static"}
        <div class="static-content">
          <div class="icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              {@html iconPath}
            </svg>
          </div>
          <h1 class="static-title">{title}</h1>
          <p class="static-desc">{subtitle}</p>
        </div>
      {/if}
    </div>

    {#if mode === "carousel" && items && items.length > 0 && items[activeIndex]}
      <a 
        href={items[activeIndex]?.dishId ? `/dish/${items[activeIndex].dishId}` : '#'}
        class="arrow-cta" 
        aria-label="View spotlight dish details"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M7 17L17 7M17 7H7M17 7V17"/>
        </svg>
      </a>
    {/if}
  </section>
{/if}

<style>
  /* Standardized Hero Container at 50svh (fixed behavior handled by PageLayout) */
  .hero-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    color: white;
    background: #000;
    isolation: isolate;
  }

  .background-trigger {
    position: absolute;
    inset: 0;
    display: block;
    padding: 0;
    margin: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .background-trigger.studio {
    background-size: contain;
    background-position: center 25%;
  }

  .text-trigger {
    display: block;
    text-align: left;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    width: 100%;
  }

  .background, .overlay {
    position: absolute;
    inset: 0;
  }

  .background {
    background-size: cover;
    background-position: center;
  }

  .background.studio {
    background-size: contain;
    background-position: center 25%;
  }

  .overlay {
    z-index: 1;
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,1) 100%);
    pointer-events: none;
  }

  .overlay.studio-overlay {
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, var(--overlay-color, #4A0404) 90%);
  }

  .top-bar {
    position: relative;
    z-index: 10;
    padding: 1.5rem;
    padding-top: max(1.5rem, calc(env(safe-area-inset-top, 0px) + 0.5rem));
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .top-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-action-icons {
    display: flex;
    gap: 0.75rem;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .brand-logo {
    width: 44px;
    height: 44px;
    background: #8B0000;
    border: 2px solid white;
    border-radius: 50%;
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
  }

  .back-btn {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 100px;
    padding: 0.6rem 1rem 0.6rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  }

  .back-btn:active {
    transform: scale(0.92);
    opacity: 0.8;
  }

  .back-text { font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; }

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

  .toggle-dot { width: 18px; height: 18px; background: #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .toggle-dot::after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: white; }
  .toggle-dot.veg { background: #2e7d32; }

  /* Main Hero Content: Centered vs Bottom-Aligned */
  .hero-main-content {
    position: absolute;
    inset: 0;
    z-index: 2;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .carousel-content {
    margin-top: auto;
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 0px));
    padding-right: 4rem;
  }

  .carousel-eyebrow { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; font-weight: 400; opacity: 0.6; }
  
  .studio-text .carousel-eyebrow { color: #fff; opacity: 0.7; }
  .studio-text .description { color: #fff; }
  .studio-text .indicator { background: rgba(255,255,255,0.3); }
  .studio-text .indicator.active { background: #fff; }
  .static-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: -2rem;
  }

  .icon-box {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: white;
  }

  .static-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    font-style: italic;
    margin: 0 0 1rem 0;
    letter-spacing: -1px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }

  .static-desc { font-size: 0.95rem; line-height: 1.5; opacity: 0.85; max-width: 300px; }

  .description { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-style: italic; line-height: 1.1; margin-bottom: 1.5rem; }

  .carousel-indicators { display: flex; gap: 6px; }
  .indicator { width: 4px; height: 4px; border-radius: 50%; background: rgba(255, 255, 255, 0.4); border: none; padding: 0; cursor: pointer; transition: all 0.3s ease; }
  .indicator.active { background: white; width: 14px; border-radius: 4px; }

  .arrow-cta {
    position: absolute;
    bottom: max(1rem, env(safe-area-inset-bottom, 0px));
    right: 1.5rem;
    width: 56px;
    height: 56px;
    background: white;
    color: black;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
</style>
