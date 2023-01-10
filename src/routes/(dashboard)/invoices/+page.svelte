<script lang="ts">
	import { invoices, loadInvoices } from "$lib/stores/invoiceStore";
	import { onMount } from "svelte";
	import CircledAmount from "$lib/components/CircledAmount.svelte";
	import Search from "$lib/components/Search.svelte";
	import InvoiceRow from "./InvoiceRow.svelte";
	import { centsToDollars, sumInvoices } from "$lib/utils/moneyHelpers";
	import BlankState from "./BlankState.svelte";
	import InvoiceRowHeader from "./InvoiceRowHeader.svelte";
	import Button from "$lib/components/Button.svelte";
	import SlidePanel from "$lib/components/SlidePanel.svelte";
	import InvoiceForm from "./InvoiceForm.svelte";

	let isInvoiceFormShowing = false;

	onMount(() => {
		loadInvoices();
	});
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- search field -->
	{#if $invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}
	<!-- new invoice button -->
	<div>
		<Button
			label="+ Invoice"
			on:click={() => {
				isInvoiceFormShowing = true;
			}}
		/>
	</div>
</div>

<div>
	{#if $invoices === null}
		Loading...
	{:else if $invoices.length <= 0}
		<BlankState />
	{:else}
		<!-- list of invoices -->
		<!-- header -->
		<InvoiceRowHeader className="text-daisyBush" />
		<!-- invoices -->
		<div class="flex flex-col-reverse">
			{#each $invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount label="Total" amount={"$" + centsToDollars(sumInvoices($invoices))} />
	{/if}
</div>

<!-- slide panel -->
{#if isInvoiceFormShowing}
	<SlidePanel
		bind:isVisible={isInvoiceFormShowing}
		on:click={() => {
			isInvoiceFormShowing = false;
		}}><InvoiceForm /></SlidePanel
	>
{/if}
