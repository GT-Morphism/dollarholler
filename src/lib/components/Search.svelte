<script>
	import SearchIcon from "./Icon/SearchIcon.svelte";
</script>

<div class="relative flex w-full items-baseline">
	<div class="mr-2 mt-auto text-pastelPurple"><SearchIcon /></div>
	<input
		type="text"
		name="search"
		placeholder="Search by Keyword"
		class="w-full border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base text-black outline-none focus:border-solid focus:border-b-lavenderIndigo md:w-[14rem] lg:w-72 lg:text-xl"
	/>
	<button class="font-sansSerif text-base font-black text-pastelPurple lg:text-xl">Search</button>
</div>
