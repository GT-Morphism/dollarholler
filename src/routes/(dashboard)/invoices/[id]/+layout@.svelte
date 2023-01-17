<script lang="ts">
	import { fly } from "svelte/transition";
	import { afterNavigate, goto } from "$app/navigation";
	import ArrowLeftIcon from "$lib/components/Icon/ArrowLeftIcon.svelte";
	import Snackbar from "$lib/components/Snackbar.svelte";
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

<div
	class="h-full min-h-screen w-screen bg-whisper pt-16 pb-32 print:bg-transparent print:pt-0 print:pb-0"
>
	<main transition:fly={{ y: 500, duration: 400 }} class="mx-auto min-h-screen max-w-screen-lg">
		<a
			href={previousPage ? previousPage : "/invoices"}
			class="fixed top-7 left-7 text-pastelPurple print:hidden"><ArrowLeftIcon /></a
		>
		<slot />
	</main>
</div>

<Snackbar />
