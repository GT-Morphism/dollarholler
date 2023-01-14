<script lang="ts">
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>Error | The Dollar Holler</title>
</svelte:head>

<div class="center h-screen w-screen flex-col overflow-x-hidden text-center">
	<h1
		class="min-h-[250px] min-w-[430px] bg-error404 bg-center bg-no-repeat text-[11.25rem] font-black text-daisyBush"
	>
		{$page.status}
	</h1>
	<div class="relative -top-12">
		<h2 class="mb-1 text-2xl font-black text-daisyBush">Sorry!</h2>
		<p class="mb-4 text-daisyBush">{$page?.error?.message}</p>
		<a
			class="button bg-daisyBush text-white transition-transform duration-[450ms] hover:scale-95"
			href="/invoices">Back to Home</a
		>
	</div>
</div>
