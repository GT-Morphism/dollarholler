<script>
	import SearchIcon from "./Icon/SearchIcon.svelte";
</script>

<div class="relative flex w-full items-baseline">
	<div class="mr-2 mt-auto text-pastelPurple"><SearchIcon /></div>
	<input
		type="text"
		name="search"
		placeholder="Search by Keyword"
		class="search w-full border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base text-black outline-none focus:border-solid focus:border-b-lavenderIndigo md:w-[14rem] lg:w-72 lg:text-xl"
	/>
	<button
		class="pointer-events-none font-sansSerif text-base font-black text-pastelPurple transition-transform duration-[400ms] md:absolute md:left-8 lg:text-xl"
		>Search</button
	>
</div>

<style lang="postcss">
	@media (min-width: 768px) {
		::placeholder {
			color: transparent;
		}
	}

	input:not(:placeholder-shown) + button,
	input:focus + button {
		@apply pointer-events-auto text-lavenderIndigo md:translate-x-[14rem] lg:translate-x-[18rem];
	}

	input:focus + button:hover,
	input + button:focus {
		@apply text-daisyBush;
	}
</style>
