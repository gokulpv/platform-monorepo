<script lang="ts">
    import { onMount } from "svelte";
    import { initAR } from "./AR.ts";

    let started = $state(false);

    function handleStart() {
        started = true;
        initAR();
    }
</script>

<svelte:head>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>8th Wall Camera Feed</title>

    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.184.0/build/three.module.min.js",
                "three/addons/": "https://unpkg.com/three@0.184.0/examples/jsm/"
            }
        }
    </script>

    <script type="module">
        import * as THREE from "three";
        import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

        window.THREE = { ...THREE };
        window.THREE.GLTFLoader = GLTFLoader;
    </script>

    <script src="//cdn.8thwall.com/web/xrextras/xrextras.js"></script>
    <script
        async
        src="https://cdn.jsdelivr.net/npm/@8thwall/engine-binary@1/dist/xr.js"
        data-preload-chunks="image,slam"
    ></script>
</svelte:head>

<canvas id="camerafeed"></canvas>

{#if !started}
    <div class="overlay">
        <button onclick={handleStart}>Start AR Experience</button>
    </div>
{/if}

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
        background: #000;
    }

    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
    }

    .overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
    }

    button {
        padding: 16px 32px;
        font-size: 18px;
        font-weight: 600;
        color: white;
        background: #4fc3f7;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.2s;
        box-shadow: 0 4px 15px rgba(79, 195, 247, 0.4);
    }

    button:active {
        transform: scale(0.95);
    }
</style>
