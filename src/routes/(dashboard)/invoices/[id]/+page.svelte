<script lang="ts">
	import { onMount } from "svelte";
	import { settings, loadSettings } from "$lib/stores/settingsStore";
	import Button from "$lib/components/Button.svelte";
	import { convertDate } from "$lib/utils/dateHelpers";
	import LineItemRows from "../LineItemRows.svelte";

	export let data: Invoice;
	let isEditable: boolean = false;

	const printInvoice = () => {
		console.log("print invoice");
	};

	const copyLink = () => {
		console.log("copy link");
	};

	const sendInvoice = () => {
		console.log("Send Invoice");
	};

	const payInvoice = () => {
		console.log("Pay Invoice");
	};

	onMount(() => {
		loadSettings();
	});
</script>

<div class="fixed z-0 mb-16 flex w-full max-w-screen-lg justify-between">
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex items-center gap-4">
		<Button label="Print" style="outline" isAnimated={false} on:click={printInvoice} />
		<Button label="Copy Link" on:click={copyLink} />
		<Button label="Send" on:click={sendInvoice} />
		<Button label="Pay Invoice" on:click={payInvoice} />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-16 px-32 shadow-invoice"
>
	<div class="col-span-3">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="Compressed.fm"
		/>
	</div>

	<div class="col-span-2 col-start-5 pt-4">
		<div class="label">From</div>
		{#if $settings && $settings.myName && $settings.street && $settings.city && $settings.state && $settings.zip}
			<p>
				{$settings.myName}<br />
				{$settings.street}<br />
				{$settings.city}, {$settings.state}
				{$settings.zip}
			</p>
		{:else}
			<div class="center min-h-[68px] rounded bg-gallery">
				<a href="#" class="text-stone-600 underline hover:no-underline"
					>Add your contact information</a
				>
			</div>
		{/if}
	</div>

	<div class="col-span-3">
		<div class="label">Bill To:</div>
		<p>
			<strong>{data.client.name}</strong><br />
			{data.client.email}<br />
			{data.client.street}<br />
			{data.client.city}, {data.client.state}
			{data.client.zip}
		</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.dueDate)}</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Issue Date</div>
		<p>{convertDate(data.issueDate)}</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>{data.subject}</p>
	</div>

	<div class="col-span-6">
		<LineItemRows lineItems={data.lineItems} {isEditable} discount={data.discount} />
	</div>

	<div class="col-span-6">
		<div class="label">Notes</div>
		<p>{data.notes ? data.notes : "No notes"}</p>
	</div>

	<div class="col-span-6">
		<div class="label">Terms and Conditions</div>
		<p>{data.terms ? data.terms : "No terms apply"}</p>
	</div>
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
