<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let label: string = "";
	export let isAnimated: boolean = true;
	export let style:
		| "primary"
		| "secondary"
		| "destructive"
		| "outline"
		| "textOnly"
		| "textOnlyDestructive" = "primary";

	export let iconLeft: typeof SvelteComponent | null = null;
	export let iconRight: typeof SvelteComponent | null = null;
</script>

<button
	on:click|preventDefault
	class="button"
	class:isAnimated
	class:primary={style === "primary"}
	class:secondary={style === "secondary"}
	class:outline={style === "outline"}
	class:textOnly={style === "textOnly"}
	class:textOnlyDestructive={style === "textOnlyDestructive"}
	class:destructive={style === "destructive"}
>
	{#if iconLeft}
		<div class="mr-2">
			<svelte:component this={iconLeft} />
		</div>
	{/if}

	{label}

	{#if iconRight}
		<div class="mr-2">
			<svelte:component this={iconRight} />
		</div>
	{/if}
</button>

<style lang="postcss">
	.isAnimated {
		@apply translate-y-0 shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover;
	}

	.primary {
		@apply bg-lavenderIndigo text-white;
	}

	.secondary {
		@apply bg-gallery text-daisyBush;
	}

	.destructive {
		@apply bg-scarlet text-goldenFizz;
	}

	.textOnly {
		@apply bg-transparent px-0 text-lavenderIndigo hover:underline;
	}

	.textOnlyDestructive {
		@apply bg-transparent px-0 text-scarlet underline hover:no-underline;
	}

	.outline {
		@apply border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
	}
</style>
