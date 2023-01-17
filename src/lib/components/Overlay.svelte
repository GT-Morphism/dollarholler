<script lang="ts">
	import { fade } from "svelte/transition";
	export let overlayZIndex: string = "z-overlay";
</script>

<svelte:head>
	<style lang="postcss">
		body {
			@apply overflow-hidden;
		}
	</style>
</svelte:head>

<div transition:fade class="fixed inset-0 {overlayZIndex} bg-blueGem opacity-60" />
