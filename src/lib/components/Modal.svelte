<script lang="ts">
	import { fade } from "svelte/transition";
	import Cancel from "./Icon/Cancel.svelte";
	import Overlay from "./Overlay.svelte";
	import Portal from "./Portal.svelte";

	export let isVisible = false;
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === "Escape") {
			isVisible = false;
		}
	}}
/>

{#if isVisible}
	<Portal>
		<Overlay overlayZIndex="z-modalOverlay" />
		<div transition:fade class="center fixed inset-0 z-modal">
			<div class="relative w-full max-w-[450px] rounded-lg bg-white px-10 py-7">
				<button
					on:click={() => {
						isVisible = false;
					}}
					class="absolute right-4 top-4 text-pastelPurple hover:text-daisyBush"><Cancel /></button
				>
				<slot />
			</div>
		</div>
	</Portal>
{/if}
