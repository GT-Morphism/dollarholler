<script lang="ts">
	import { invoices, loadInvoices } from "$lib/stores/invoiceStore";
	import { onMount } from "svelte";
	import CircledAmount from "$lib/components/CircledAmount.svelte";
	import Search from "$lib/components/Search.svelte";
	import InvoiceRow from "./InvoiceRow.svelte";
	import { centsToDollars, sumInvoices } from "$lib/utils/moneyHelpers";
	import BlankState from "./BlankState.svelte";
	import InvoiceRowHeader from "./InvoiceRowHeader.svelte";

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
		<button
			class="relative translate-y-0 whitespace-nowrap rounded-lg bg-lavenderIndigo px-5 py-2 font-sansSerif text-base font-black text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover lg:px-10 lg:py-3 lg:text-xl"
			>+ Invoice</button
		>
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
