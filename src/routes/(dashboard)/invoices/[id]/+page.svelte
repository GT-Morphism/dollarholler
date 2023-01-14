<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import SvelteMarkdown from "svelte-markdown";
	import { settings, loadSettings } from "$lib/stores/settingsStore";
	import Button from "$lib/components/Button.svelte";
	import { convertDate } from "$lib/utils/dateHelpers";
	import LineItemRows from "../LineItemRows.svelte";
	import { snackbar } from "$lib/stores/snackbarStore";

	export let data: Invoice;

	let isEditable: boolean = false;
	let copyLinkLabel: string = "Copy Link";

	const printInvoice = () => {
		window.print();
	};

	const copyLink = () => {
		navigator.clipboard.writeText($page.url.href);

		snackbar.send({
			message: "Link copied to clipboard",
			type: "success"
		});
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

<div
	class="fixed z-0 mb-16 flex w-full max-w-screen-lg flex-col justify-between gap-y-5 px-4 md:flex-row lg:px-0"
>
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
		<Button label="Print" style="outline" isAnimated={false} on:click={printInvoice} />
		<Button label={copyLinkLabel} on:click={copyLink} />
		<Button label="Send" on:click={sendInvoice} />
		<Button label="Pay Invoice" on:click={payInvoice} />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-8 px-5 shadow-invoice md:py-16 md:px-32"
>
	<div class="col-span-6 sm:col-span-3">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="Compressed.fm"
		/>
	</div>

	<div class="col-span-6 pt-4 sm:col-span-2 sm:col-start-5">
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

	<div class="col-span-6 sm:col-span-3">
		<div class="label">Bill To:</div>
		<p>
			<strong>{data.client.name}</strong><br />
			{data.client.email}<br />
			{data.client.street}<br />
			{data.client.city}, {data.client.state}
			{data.client.zip}
		</p>
	</div>

	<div class="col-span-6 sm:col-span-2 sm:col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.dueDate)}</p>
	</div>

	<div class="col-span-3 sm:col-span-2 sm:col-start-5">
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
		<SvelteMarkdown source={data.notes ? data.notes : "No notes"} />
	</div>

	<div class="col-span-6">
		<div class="label">Terms and Conditions</div>
		<SvelteMarkdown source={data.terms ? data.terms : "No terms apply"} />
	</div>
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
