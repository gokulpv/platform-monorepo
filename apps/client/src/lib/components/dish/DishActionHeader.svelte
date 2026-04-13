<script lang="ts">
  import { goto } from "$app/navigation";
  
  function goBack() {
    window.history.back();
  }
</script>

<header class="dish-header">
  <button class="back-btn" onclick={goBack} aria-label="Go back">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
    <span class="back-text">BACK</span>
  </button>

  <div class="actions">
    <button class="icon-btn search" aria-label="Search">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </button>
    <button class="icon-btn menu" aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 12h16M4 6h16M4 18h14"/>
      </svg>
    </button>
  </div>
</header>

<style>
  .dish-header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }

  .back-btn {
    background: rgba(240, 240, 240, 0.7);
    color: #111;
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

  .back-btn:active, .icon-btn:active {
    transform: scale(0.92);
    opacity: 0.8;
  }

  .back-text {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 1px;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
    background: white;
    border: 1px solid #f0f0f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
</style>
