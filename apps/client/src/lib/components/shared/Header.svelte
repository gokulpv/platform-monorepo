<script>
    import { resolveImagePath } from "$lib/utils/image";

    let {
        showLogo = true,
        showBack = false,
        showVegToggle = true,
        logoUrl = "/assets/logos/koi.png",
        goBack = () => window.history.back(),
    } = $props();
</script>

<section class="nav-container">
    {#if showLogo}
        <a href="/" class="logo">
            <img src={resolveImagePath(logoUrl)} alt="Logo" width="36" height="36" />
        </a>
    {/if}

    {#if showBack}
        <button class="back-btn" onclick={goBack} aria-label="Go back">
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="m15 18-6-6 6-6" />
            </svg>
        </button>
    {/if}

    {#if showVegToggle}
        <div class="veg-toggle">
            <span class="toggle-dot"></span>
            <span class="toggle-label">Veg</span>
        </div>
    {/if}
</section>

<style>
    .nav-container {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
    }

    .logo {
        display: block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #fff;
        overflow: hidden;
    }

    .logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }

    .back-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.15);
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #111;
        cursor: pointer;
        transition:
            transform 0.18s cubic-bezier(0.33, 1, 0.68, 1),
            background 0.18s ease;
    }

    .back-btn:active {
        transform: scale(0.9);
        background: rgba(255, 255, 255, 0.6);
    }

    .veg-toggle {
        display: flex;
        align-items: center;
        gap: 4px;
        background: #fff;
        padding: 2px 8px 2px 2px;
        border-radius: 100px;
        cursor: pointer;
    }

    .toggle-dot {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #00b140;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toggle-dot::after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
    }

    .toggle-label {
        font-size: 11px;
        font-weight: 700;
        color: #00b140;
        letter-spacing: -0.01em;
    }
</style>
