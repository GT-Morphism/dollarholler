<script lang="ts">
	import { fly } from "svelte/transition";
	import { clickOutside } from "$lib/actions/ClickOutside";
	import ArrowLeftIcon from "./Icon/ArrowLeftIcon.svelte";
	import Overlay from "./Overlay.svelte";
	import Portal from "./Portal.svelte";

	export let isVisible = false;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape") isVisible = false;
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isVisible}
	<Portal>
		<Overlay />
		<div
			transition:fly={{ x: 1000, duration: 500 }}
			class="fixed right-0 top-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white px-5 pt-16 shadow-slidePanel lg:w-3/4 lg:py-20 lg:px-32"
			use:clickOutside={() => {
				isVisible = false;
			}}
		>
			<button
				on:click|preventDefault
				class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
				><ArrowLeftIcon /></button
			>
			<slot />
		</div>
	</Portal>
{/if}
