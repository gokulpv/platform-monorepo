<script lang="ts">
  import { fade } from "svelte/transition";
  import { resolveImagePath } from "$lib/utils/image";
  import { goto } from "$app/navigation";

  let {
    mode = "carousel",
    items = [],
    title = "",
    description = "",
    subtitle = "",
    iconPath = "",
    bgImage = "",
    showVegToggle = false,
    showBack = false,
    backPath = "/home",
    topBarOnly = false,
    primaryColor = "#4A0404",
    showLogo = true,
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

<section class="hero-container" style="--hero-primary: {primaryColor}">
  {#if items && items.length > 0}
    {#each items as item, i}
      {#if i === activeIndex}
        <div class="hero-slide" in:fade={{ duration: 400 }}>
          <img src={resolveImagePath(item.image_url)} alt={item.name} />
          <div class="content">
            <h1 class="title">
              Today's<br /><span class="accent">Spotlight</span> Dish
            </h1>
            <p class="description">
              {item.description || "Featured dish of the day"}
            </p>

            <div class="pagination">
              {#each items as _, idx}
                <button
                  class="dot"
                  class:active={idx === activeIndex}
                  onclick={() => goToSlide(idx)}
                  aria-label="Go to slide {idx + 1}"
                ></button>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  {:else}
    <div class="hero-slide">
      <img src={resolveImagePath(bgImage)} alt={title} />
      <div class="content">
        <h1 class="title">
          {#if title}
            {@html title}
          {:else}
            Today's<br /><span class="accent">Spotlight</span> Dish
          {/if}
        </h1>
        <p class="description">
          {description || "Discover our amazing dishes"}
        </p>
      </div>
    </div>
  {/if}
</section>

<style>
  .hero-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: var(--hero-primary);
  }

  .hero-slide {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 40%,
      transparent
    );
  }

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -1px;
    font-family: "Outfit", sans-serif;
    color: #fff;
  }

  .accent {
    color: #ffc107;
  }

  .description {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 18px;
    max-width: 85%;
    line-height: 1.4;
  }

  .pagination {
    display: flex;
    gap: 8px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    transition: all 0.3s;
  }

  .dot.active {
    width: 24px;
  }

  .cta {
    position: absolute;
    bottom: 32px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #ff3b30;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 16px rgba(255, 59, 48, 0.9);
    cursor: pointer;
  }

  .cta svg {
    width: 24px;
    height: 24px;
  }
</style>
