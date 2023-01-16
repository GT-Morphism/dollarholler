<script lang="ts">
	import CircledAmount from "$lib/components/CircledAmount.svelte";
	import Search from "$lib/components/Search.svelte";
	import InvoiceRow from "../../invoices/InvoiceRow.svelte";
	import { centsToDollars, sumInvoices } from "$lib/utils/moneyHelpers";
	import BlankStateInvoices from "../../invoices/BlankStateInvoices.svelte";
	import InvoiceRowHeader from "../../invoices/InvoiceRowHeader.svelte";
	import Button from "$lib/components/Button.svelte";
	import SlidePanel from "$lib/components/SlidePanel.svelte";

	import EditIcon from "$lib/components/Icon/EditIcon.svelte";
	import ClientForm from "../ClientForm.svelte";
	import { isLate } from "$lib/utils/dateHelpers";

	export let data: Client;

	let isClientFormShowing: boolean = false;
	let isEditingClient: boolean = false;
	let emptyClient: Client = {} as Client;

	const editClient = () => {
		isEditingClient = true;
		isClientFormShowing = true;
	};

	const getDraft = (): string => {
		if (!data.invoices || data.invoices.length < 1) return "0.00";

		const draftInvoices = data.invoices.filter(
			(invoice: Invoice) => invoice.invoiceStatus === "draft"
		);

		return centsToDollars(sumInvoices(draftInvoices));
	};

	const getPaid = (): string => {
		if (!data.invoices || data.invoices.length < 1) return "0.00";

		const paidInvoices = data.invoices.filter(
			(invoice: Invoice) => invoice.invoiceStatus === "paid"
		);

		return centsToDollars(sumInvoices(paidInvoices));
	};

	const getOverdue = (): string => {
		if (!data.invoices || data.invoices.length < 1) return "0.00";

		const overdueInvoices = data.invoices.filter(
			(invoice: Invoice) => invoice.invoiceStatus === "sent" && isLate(invoice.dueDate)
		);

		return centsToDollars(sumInvoices(overdueInvoices));
	};

	const getOutstanding = (): string => {
		if (!data.invoices || data.invoices.length < 1) return "0.00";

		const outstandingInvoices = data.invoices.filter(
			(invoice: Invoice) => invoice.invoiceStatus === "sent" && !isLate(invoice.dueDate)
		);

		return centsToDollars(sumInvoices(outstandingInvoices));
	};
</script>

<svelte:head>
	<title>Invoices from {data.name}</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- search field -->
	{#if data.invoices && data.invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}
	<!-- new client button -->
	<div>
		<Button
			label="+ Client"
			on:click={() => {
				isClientFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- title & edit -->
<div class="mb-7 flex w-full items-center justify-between">
	<h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.name}</h1>
	<Button
		label="Edit"
		style="textOnly"
		isAnimated={false}
		iconLeft={EditIcon}
		on:click={editClient}
	/>
</div>

<!-- data summary block -->
<div class="mb-10 grid gap-4 rounded-lg bg-gallery py-7 px-10 lg:grid-cols-4">
	<div class="summary-block">
		<div class="label">Total Overdue</div>
		<div class="number"><sup>$</sup>{getOverdue()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Outstanding</div>
		<div class="number"><sup>$</sup>{getOutstanding()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Draft</div>
		<div class="number"><sup>$</sup>{getDraft()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Paid</div>
		<div class="number"><sup>$</sup>{getPaid()}</div>
	</div>
</div>

<!-- list of invoices -->
<div>
	{#if data.invoices === null || !data.invoices}
		Loading...
	{:else if data.invoices.length <= 0}
		<BlankStateInvoices />
	{:else}
		<!-- header -->
		<InvoiceRowHeader className="text-daisyBush" />
		<!-- invoices -->
		<div class="flex flex-col-reverse">
			{#each data.invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<div class="flex items-center justify-between">
			<a
				class="button flex translate-y-0 gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-0.5 hover:shadow-coloredHover"
				href="/clients">Back to Clients</a
			>
			<CircledAmount label="Total" amount={"$" + centsToDollars(sumInvoices(data.invoices))} />
		</div>
	{/if}
</div>

<!-- slide panel -->
{#if isClientFormShowing}
	<SlidePanel
		bind:isVisible={isClientFormShowing}
		on:click={() => {
			isClientFormShowing = false;
		}}
		><ClientForm
			closePanel={() => {
				isClientFormShowing = false;
			}}
			formState={isEditingClient ? "edit" : "create"}
			client={isEditingClient ? data : emptyClient}
		/>
	</SlidePanel>
{/if}

<style lang="postcss">
	.summary-block {
		@apply text-center;
	}

	.label {
		@apply text-sm font-black text-[#A397AD];
	}

	sup {
		@apply relative -top-2;
	}

	.number {
		@apply truncate text-[2.2rem] font-black text-purple;
	}
</style>
