<script lang="ts">
	import { clickOutside } from "$lib/actions/ClickOutside";
	import { swipe } from "$lib/actions/Swipe";
	import AdditionalOptions from "$lib/components/AdditionalOptions.svelte";
	import ThreeDotsIcon from "$lib/components/Icon/ThreeDotsIcon.svelte";
	import ViewIcon from "$lib/components/Icon/ViewIcon.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { convertDate, isLate } from "$lib/utils/dateHelpers";
	import { centsToDollars, invoiceTotal, sumLineItems } from "$lib/utils/moneyHelpers";
	import SendIcon from "$lib/components/Icon/SendIcon.svelte";
	import EditIcon from "$lib/components/Icon/EditIcon.svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";
	import SlidePanel from "$lib/components/SlidePanel.svelte";
	import InvoiceForm from "./InvoiceForm.svelte";
	import ConfirmDelete from "./ConfirmDelete.svelte";
	import Cancel from "$lib/components/Icon/Cancel.svelte";

	export let invoice: Invoice;
	let isAdditionalMenuShowing: boolean = false;
	let isOptionsDisabled: boolean = false;
	let isModalShowing: boolean = false;
	let isInvoiceFormShowing: boolean = false;
	let triggerReset: boolean = false;

	const handleSendInvoice = () => {
		console.log("sending");
	};

	const handleEdit = () => {
		isInvoiceFormShowing = true;
		isAdditionalMenuShowing = false;
	};

	const handleDelete = () => {
		isModalShowing = true;
		isAdditionalMenuShowing = false;
	};

	const getInvoiceLable = () => {
		if (invoice.invoiceStatus === "draft") {
			return "draft";
		} else if (invoice.invoiceStatus === "sent" && !isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return "sent";
		} else if (invoice.invoiceStatus === "sent" && isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return "late";
		} else if (invoice.invoiceStatus === "paid") {
			isOptionsDisabled = true;
			return "paid";
		} else {
			return "draft";
		}
	};
</script>

<div class="relative">
	<div
		class="invoice-table invoice-row relative z-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
		use:swipe={{ triggerReset }}
		on:outOfView={() => {
			triggerReset = false;
		}}
	>
		<div class="status"><Tag label={getInvoiceLable()} className="ml-auto lg:ml-0" /></div>
		<div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
		<div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
		<div class="clientName truncate text-base font-bold lg:text-xl">
			{invoice.client.name}
		</div>
		<div class="amount text-right font-mono text-sm font-bold lg:text-lg">
			${centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount))}
		</div>
		<div class="lg:center viewButton hidden text-sm lg:text-lg">
			<a href="/invoices/{invoice.id}" class="text-pastelPurple hover:text-daisyBush"
				><ViewIcon /></a
			>
		</div>
		<div
			class="lg:center moreButton relative hidden text-sm lg:text-lg"
			use:clickOutside={() => {
				isAdditionalMenuShowing = false;
			}}
		>
			<button
				class="text-pastelPurple hover:text-daisyBush"
				on:click={() => {
					isAdditionalMenuShowing = !isAdditionalMenuShowing;
				}}><ThreeDotsIcon /></button
			>
			{#if isAdditionalMenuShowing}
				<AdditionalOptions
					options={[
						{
							label: "Send",
							icon: SendIcon,
							onClick: handleSendInvoice,
							disabled: isOptionsDisabled
						},
						{
							label: "Edit",
							icon: EditIcon,
							onClick: handleEdit,
							disabled: isOptionsDisabled
						},
						{
							label: "Delete",
							icon: TrashIcon,
							onClick: handleDelete,
							disabled: false
						}
					]}
				/>
			{/if}
		</div>
	</div>

	<!-- swipe to reveal -->
	<div class="absolute inset-0 z-rowActions flex items-center justify-around lg:hidden">
		<button
			class="action-button"
			on:click={() => {
				triggerReset = true;
			}}
		>
			<Cancel width={32} height={32} />
			Cancel
		</button>

		{#if !isOptionsDisabled}
			<button class="action-button" on:click={handleEdit}>
				<EditIcon width={32} height={32} />
				Edit
			</button>

			<button class="action-button" on:click={handleSendInvoice}>
				<SendIcon width={32} height={32} />
				Send
			</button>
		{/if}

		<button class="action-button" on:click={handleDelete}>
			<TrashIcon width={32} height={32} />
			Trash
		</button>

		<a href="/invoices/{invoice.id}" class="action-button" on:click={handleDelete}>
			<ViewIcon width={32} height={32} />
			View
		</a>
	</div>
</div>

<!-- confirm delete modal -->
<ConfirmDelete {invoice} bind:isDeleteModalShowing={isModalShowing} />

<!-- slide panel -->
{#if isInvoiceFormShowing}
	<SlidePanel
		bind:isVisible={isInvoiceFormShowing}
		on:click={() => {
			isInvoiceFormShowing = false;
		}}
	>
		<InvoiceForm
			formState="edit"
			{invoice}
			closePanel={() => {
				isInvoiceFormShowing = false;
			}}
		/>
	</SlidePanel>
{/if}

<style lang="postcss">
	.action-button {
		@apply flex cursor-pointer flex-col items-center justify-center font-bold text-daisyBush;
	}

	.invoice-row {
		grid-template-areas:
			"invoiceNumber invoiceNumber"
			"clientName amount"
			"dueDate status";
	}

	@media (min-width: 1024px) {
		.invoice-row {
			grid-template-areas: "status dueDate invoiceNumber clientName amount viewButton moreButton";
		}
	}

	.invoice-row .status {
		grid-area: status;
	}

	.invoice-row .dueDate {
		grid-area: dueDate;
	}

	.invoice-row .invoiceNumber {
		grid-area: invoiceNumber;
	}

	.invoice-row .clientName {
		grid-area: clientName;
	}

	.invoice-row .amount {
		grid-area: amount;
	}

	.invoice-row .viewButton {
		grid-area: viewButton;
	}

	.invoice-row .moreButton {
		grid-area: moreButton;
	}
</style>
