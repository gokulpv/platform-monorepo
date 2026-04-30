<script>
    import { resolveImagePath } from "$lib/utils/image";

    let {
        showLogo = true,
        showBack = false,
        showVegToggle = true,
        showCart = false,
        showSearch = true,
        forceSolid = false,
        searchQuery = $bindable(""),
        logoUrl = "/assets/logos/koi.png",
        goBack = () => window.history.back(),
    } = $props();
</script>

<section class="nav-container" class:solid={forceSolid} style="view-transition-name: main-header">
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

    {#if showSearch}
        <div class="search-container">
            <svg
                class="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
            >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
                type="text"
                placeholder="Search..."
                bind:value={searchQuery}
                aria-label="Search dishes"
            />
        </div>
    {/if}

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
        gap: 8px;
        background: transparent;
        transition: background 0.15s ease;
    }

    .nav-container.solid {
        background: #ffffff;
        border-bottom: 1px solid #eee;
    }

    .left-actions,
    .right-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
    }

    .search-container {
        flex: 1;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 100px;
        padding: 0 12px;
        height: 36px;
        gap: 8px;
        transition: all 0.2s ease;
        border: 1px solid transparent;
    }

    .search-container:focus-within {
        background: #fff;
        border-color: #eee;
    }

    .search-icon {
        color: #888;
    }

    .search-container input {
        border: none;
        background: none;
        flex: 1;
        width: 100%;
        font-size: 0.9rem;
        font-family: inherit;
        outline: none;
        color: #111;
        font-weight: 500;
    }

    .search-container input::placeholder {
        color: #aaa;
    }

    .logo {
        display: block;
        position: relative;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #fff;
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

    .icon-btn:active {
        transform: scale(0.96);
        background: rgba(255, 255, 255, 0.7);
    }

    .cart-btn {
        background: linear-gradient(135deg, #ff416c, #ff4b2b);
        color: #fff;
        border: none;
    }

    .veg-toggle {
        display: flex;
        align-items: center;
        gap: 4px;
        background: #fff;
        padding: 2px 8px 2px 2px;
        border-radius: 100px;
        cursor: pointer;
        border: 1px solid #eee;
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

    @media (max-width: 360px) {
        .veg-toggle {
            display: none;
        }
    }
</style>
