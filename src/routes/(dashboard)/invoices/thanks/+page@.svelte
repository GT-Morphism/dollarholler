<script lang="ts">
	import { goto } from "$app/navigation";
	import { tweened } from "svelte/motion";
	import { onMount } from "svelte";
	import { blur } from "svelte/transition";

	let progress = tweened(100, { duration: 3000 });

	onMount(async () => {
		await progress.set(0);
		goto("/invoices");
	});
</script>

<svelte:head>
	<title>Thank You | The Dollar Holler</title>
</svelte:head>

<div
	transition:blur={{ duration: 500 }}
	class="center h-screen w-screen bg-whisper bg-thankYou bg-center bg-no-repeat"
>
	<div>
		<h1 class="text-[3.5rem] font-black leading-none text-daisyBush">Thank You</h1>
		<p class="text-lg text-daisyBush">Your payment has been received</p>
	</div>
</div>
