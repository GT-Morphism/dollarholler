<script lang="ts">
	import { clients, loadClients } from "$lib/stores/clientStore";
	import { onMount } from "svelte";
	import Button from "$lib/components/Button.svelte";
	import Search from "$lib/components/Search.svelte";
	import ClientRow from "./ClientRow.svelte";
	import ClientRowHeader from "./ClientRowHeader.svelte";
	import BlankStateClients from "./BlankStateClients.svelte";
	import SlidePanel from "$lib/components/SlidePanel.svelte";
	import ClientForm from "./ClientForm.svelte";

	let isClientFormShowing: boolean = false;

	onMount(() => {
		loadClients();
	});
</script>

<svelte:head>
	<title>Clients | The Dollar Holler</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- search field -->
	{#if $clients.length > 0}
		<Search />
	{:else}
		<div />
	{/if}

	<!-- add new client -->
	<div>
		<Button
			label="+ Client"
			on:click={() => {
				isClientFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- display clients -->
<div>
	{#if $clients === null}
		Loading...
	{:else if $clients.length <= 0}
		<BlankStateClients />
	{:else}
		<!-- client header row -->
		<ClientRowHeader className="text-daisyBush" />
		<!-- client rows -->
		<div class="flex flex-col-reverse">
			{#each $clients as client}
				<ClientRow {client} />
			{/each}
		</div>
	{/if}
</div>

<!-- add client slide panel -->
{#if isClientFormShowing}
	<SlidePanel
		bind:isVisible={isClientFormShowing}
		on:click={() => {
			isClientFormShowing = false;
		}}
	>
		<ClientForm
			closePanel={() => {
				isClientFormShowing = false;
			}}
		/>
	</SlidePanel>
{/if}
