<script lang="ts">
    import Header from "$lib/components/shared/Header.svelte";
    import DishRecommendations from "$lib/components/dish/DishRecommendations.svelte";
    import ARViewer from "$lib/components/ar/ARViewer.svelte";
    import { fade } from "svelte/transition";

    interface Props {
        children?: any;
        actions?: any;
        otherDishes: any[];
        activeDishId: string;
        dishImage: string;
        isArMounted?: boolean;
        isArVisible?: boolean;
        isImageFound?: boolean;
        onArReady?: () => void;
    }

    let { 
        children, 
        actions,
        otherDishes, 
        activeDishId, 
        dishImage,
        isArMounted = false, 
        isArVisible = false,
        isImageFound = false,
        hasBeenPlaced = false,
        onArReady,
    }: Props = $props();
</script>

<div class="dish-detail-page" class:ar-active={isArVisible}>
    <!-- Static Canvas for AR -->
    <canvas id="camerafeed" class:visible={isArVisible}></canvas>

    <!-- Stunning Scanning Overlay -->
    {#if isArVisible && !isImageFound && !hasBeenPlaced}
        <div class="scanning-overlay" transition:fade={{ duration: 300 }}>
            <div class="scan-line"></div>
            <div class="scan-vignette"></div>
            
            <div class="tech-corners">
                <div class="corner tl"></div>
                <div class="corner tr"></div>
                <div class="corner bl"></div>
                <div class="corner br"></div>
            </div>
        </div>
    {/if}

    <!-- Logic Controller -->
    {#if isArMounted}
        <ARViewer isVisible={isArVisible} onReady={onArReady} />
    {/if}

    <div class="page-content">
        <Header
            showLogo={false}
            showBack={true}
            showCart={true}
            showVegToggle={true}
            forceSolid={!isArVisible}
        />

        <main class="content">
            <div class="middle-section">
                {#if !isArVisible}
                    <div class="main-content-slot" transition:fade={{ duration: 300 }}>
                        {@render children?.()}
                    </div>
                {/if}
                
                <div class="persistent-actions">
                    {@render actions?.()}
                </div>
            </div>

            <div class="recommendations-wrapper">
                <DishRecommendations dishes={otherDishes} activeId={activeDishId} />
            </div>
        </main>
    </div>
</div>

<style>
    .dish-detail-page {
        height: 100svh;
        overflow: hidden;
        background: #fdfaf9;
        max-width: 500px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .dish-detail-page.ar-active {
        background: rgba(0, 0, 0, 0.85);
        transition: background 0.8s cubic-bezier(0.85, 0, 0.15, 1);
    }

    #camerafeed {
        position: fixed;
        top: 0;
        left: 50%;
        translate: -50% 0;
        width: 100vw;
        height: 100vh;
        max-width: 500px;
        z-index: 1;
        background: #000;
        opacity: 0;
        pointer-events: none;
        object-fit: cover;
        /* Professional Sharp Square Wipe: Originating from Center */
        clip-path: inset(calc(45% - 120px) calc(50% - 120px) calc(55% - 120px) calc(50% - 120px) round 0px);
        transition: 
            clip-path 0.9s cubic-bezier(0.85, 0, 0.15, 1),
            opacity 0.6s ease;
        will-change: clip-path;
    }

    #camerafeed.visible {
        opacity: 1;
        pointer-events: auto;
        clip-path: inset(0% 0% 0% 0% round 0px);
    }

    .page-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 10;
        height: 100%;
        overflow: hidden;
        background: transparent;
        pointer-events: none;
        transition: opacity 0.8s cubic-bezier(0.85, 0, 0.15, 1);
    }

    .ar-active .page-content {
        opacity: 0.75;
    }

    .page-content > :global(*) {
        pointer-events: auto;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 16px 0;
    }

    .middle-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .main-content-slot {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .persistent-actions {
        margin-top: auto;
        z-index: 30;
    }

    .recommendations-wrapper {
        z-index: 20;
    }

    /* Scanning Overlay Styles */
    .scanning-overlay {
        position: absolute;
        inset: 0;
        z-index: 5;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .scan-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
    }

    .scan-line {
        position: absolute;
        top: 0;
        left: 50%;
        translate: -50% 0;
        width: 180px;
        height: 2px;
        background: linear-gradient(to right, transparent, #39FF14, transparent);
        box-shadow: 0 0 15px #39FF14;
        animation: scan 2.5s ease-in-out infinite;
        opacity: 0.8;
    }

    .tech-corners {
        position: absolute;
        width: 180px;
        height: 180px;
        top: 45%;
        left: 50%;
        translate: -50% -50%;
    }

    .corner {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 2px solid #39FF14;
        opacity: 0.8;
        box-shadow: 0 0 10px rgba(57, 255, 20, 0.4);
    }

    .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
    .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
    .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
    .br { bottom: 0; right: 0; border-left: none; border-top: none; }

    @keyframes scan {
        0%, 100% { top: 35%; opacity: 0; }
        20%, 80% { opacity: 0.8; }
        50% { top: 55%; }
    }
</style>
