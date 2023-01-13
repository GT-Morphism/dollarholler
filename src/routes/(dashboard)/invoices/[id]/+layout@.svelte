<script lang="ts">
	import { afterNavigate, goto } from "$app/navigation";
	import ArrowLeftIcon from "$lib/components/Icon/ArrowLeftIcon.svelte";
	import type { AfterNavigate } from "@sveltejs/kit";

	let previousPage: string | undefined = undefined;

	afterNavigate((navigation: AfterNavigate) => {
		previousPage = navigation?.from?.url?.pathname;
	});
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === "Escape") {
			goto(previousPage || "/invoices");
		}
	}}
/>

<div class="h-full min-h-screen w-screen bg-whisper pt-12 pb-32">
	<main class="mx-auto min-h-screen max-w-screen-lg">
		<a href={previousPage ? previousPage : "/invoices"} class="fixed top-7 left-7 text-pastelPurple"
			><ArrowLeftIcon /></a
		>
		<slot />
	</main>
</div>
