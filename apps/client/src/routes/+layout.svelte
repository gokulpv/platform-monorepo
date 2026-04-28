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
</svelte:head>

{@render children()}
