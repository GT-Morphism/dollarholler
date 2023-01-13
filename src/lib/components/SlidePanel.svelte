<script lang="ts">
	import ArrowLeftIcon from "./Icon/ArrowLeftIcon.svelte";
	import Overlay from "./Overlay.svelte";
	import Portal from "./Portal.svelte";

	export let isVisible = false;
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === "Escape") isVisible = false;
	}}
/>

{#if isVisible}
	<Portal>
		<Overlay />
		<div
			class="fixed right-0 top-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white px-5 pt-16 shadow-slidePanel lg:w-3/4 lg:py-20 lg:px-32"
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
