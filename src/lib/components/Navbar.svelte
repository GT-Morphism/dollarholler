<script lang="ts">
	import { page } from "$app/stores";
	import Close from "./Icon/Close.svelte";
	import Hamburger from "./Icon/Hamburger.svelte";
	const navBarLinkClasses = "font-bold text-white hover:text-goldenFizz";

	let isNavShowing = false;
</script>

<svelte:head>
	{#if isNavShowing}
		<style lang="postcss">
			body {
				@apply overflow-hidden md:overflow-auto;
			}
		</style>
	{/if}
</svelte:head>

<!-- mobile nav control -->
<button
	class="fixed right-6 top-6 z-navBarToggle md:hidden"
	class:text-goldenFizz={isNavShowing}
	class:text-daisyBush={!isNavShowing}
	on:click={() => {
		isNavShowing = !isNavShowing;
	}}
>
	{#if isNavShowing}
		<Close width={32} height={32} />
	{:else}
		<Hamburger width={32} height={32} />
	{/if}
</button>

<header
	class="fixed z-navBar min-h-screen w-full -translate-x-full bg-daisyBush text-center transition-transform md:relative md:col-span-3 md:translate-x-0"
	class:translate-x-0={isNavShowing}
>
	<div class="mt-10 mb-10 md:mb-24">
		<a href="/"><img src="/images/dollarholler.svg" alt="The Dollar Holler" class="mx-auto" /></a>
	</div>

	<nav>
		<ul class="list-none text-2xl font-bold">
			<li class="mb-6">
				<a
					class={navBarLinkClasses}
					class:active={$page.url.pathname === "/invoices"}
					href="/invoices">Invoices</a
				>
			</li>
			<li class="mb-6">
				<a
					class={navBarLinkClasses}
					class:active={$page.url.pathname === "/clients"}
					href="/clients">Clients</a
				>
			</li>
			<li class="mb-6">
				<a class={navBarLinkClasses} href="#">Settings</a>
			</li>
			<li class="mb-6">
				<a class={navBarLinkClasses} href="#">Logout</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	nav ul li a.active {
		@apply px-8 text-robinEggBlue transition-[padding];

		background: url("/images/active-nav--left.svg") left top no-repeat,
			url("/images/active-nav--right.svg") right top no-repeat;
	}

	nav ul li a.active:hover {
		@apply px-9;
	}
</style>
