<script lang="ts">
	export let overlayZIndex: string = "z-overlay";
</script>

<svelte:head>
	<style lang="postcss">
		body {
			@apply overflow-hidden;
		}
	</style>
</svelte:head>

<div class="fixed inset-0 {overlayZIndex} bg-blueGem opacity-60" />
