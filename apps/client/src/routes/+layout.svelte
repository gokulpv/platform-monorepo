<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { onNavigate } from "$app/navigation";

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		
		// Skip view transition when navigating between dish detail pages
		if (navigation.from?.route.id === '/dish/[id]' && navigation.to?.route.id === '/dish/[id]') {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	
	<!-- 8th Wall & Three.js Engine (Module Support) -->
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

{@render children()}
