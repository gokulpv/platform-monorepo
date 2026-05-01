<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { initAR } from "../../../routes/test/AR";

    interface Props {
        isVisible?: boolean;
        onReady?: () => void;
    }

    let { isVisible = false, onReady }: Props = $props();

    onMount(async () => {
        if (browser) {
            console.log("ARViewer: Activating engine...");
            // Call the original initAR function
            // It will find the 'camerafeed' canvas in the layout
            await initAR();
            
            if (onReady) onReady();
        }
    });

    onDestroy(() => {
        if (browser && (window as any).XR8) {
            console.log("ARViewer: Stopping engine...");
            (window as any).XR8.stop();
        }
    });
</script>

<!-- 
  No DOM here. This component now acts as a logic controller 
  for the static canvas in the layout.
-->
