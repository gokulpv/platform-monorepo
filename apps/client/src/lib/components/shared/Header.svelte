<script>
    import { resolveImagePath } from "$lib/utils/image";

    let {
        showLogo = true,
        showBack = false,
        showVegToggle = true,
        showCart = false,
        logoUrl = "/assets/logos/koi.png",
        goBack = () => window.history.back(),
    } = $props();
</script>

<section class="nav-container">
    <div class="left-actions">
        {#if showLogo}
            <a href="/" class="logo">
                <img
                    src={resolveImagePath(logoUrl)}
                    alt="Logo"
                    width="36"
                    height="36"
                />
            </a>
        {/if}

        {#if showBack}
            <button class="icon-btn" onclick={goBack} aria-label="Go back">
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
    </div>

    <div class="right-actions">
        {#if showVegToggle}
            <div class="veg-toggle">
                <span class="toggle-dot"></span>
                <span class="toggle-label">Veg</span>
            </div>
        {/if}

        {#if showCart}
            <button class="icon-btn cart-btn" aria-label="Cart">
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
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            </button>
        {/if}
    </div>
</section>

<style>
    .nav-container {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
    }

    .left-actions, .right-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .logo {
        display: block;
        position: relative;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #fff;
        /* Removed overflow: hidden so ::before can extend outside */
    }

    .logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        border-radius: 50%;
        pointer-events: none;
    }

    .icon-btn {
        position: relative;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #e0e0e0;
        background: #fff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #111;
        cursor: pointer;
        transition:
            transform 0.18s cubic-bezier(0.33, 1, 0.68, 1),
            box-shadow 0.18s ease,
            background 0.18s ease;
    }

    /* Expand clickable area */
    .logo::before,
    .icon-btn::before {
        content: "";
        position: absolute;
        top: -12px;
        right: -12px;
        bottom: -12px;
        left: -12px;
        border-radius: 50%;
        z-index: 1;
    }

    .icon-btn svg {
        pointer-events: none;
        position: relative;
        z-index: 2;
    }

    .icon-btn:active {
        transform: scale(0.9);
        background: rgba(255, 255, 255, 0.6);
    }

    .cart-btn {
        background: linear-gradient(135deg, #ff416c, #ff4b2b);
        color: #fff;
        border: none;
        box-shadow: 0 4px 12px rgba(255, 75, 43, 0.4);
    }

    .cart-btn:active {
        background: linear-gradient(135deg, #e6395e, #e64225);
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
