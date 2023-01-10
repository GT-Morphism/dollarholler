<script lang="ts">
	export let label = "";
	export let isAnimated = true;
	export let style: "primary" | "secondary" | "destructive" = "primary";
</script>

<button
	on:click|preventDefault
	class="relative  whitespace-nowrap rounded-lg px-5 py-2 font-sansSerif text-base font-black lg:px-10 lg:py-3 lg:text-xl"
	class:isAnimated
	class:primary={style === "primary"}
	class:secondary={style === "secondary"}
	class:destructive={style === "destructive"}>{label}</button
>

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
</style>
