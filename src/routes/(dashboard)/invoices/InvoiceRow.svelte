<script lang="ts">
	import AdditionalOptions from "$lib/components/AdditionalOptions.svelte";
	import ThreeDotsIcon from "$lib/components/Icon/ThreeDotsIcon.svelte";
	import ViewIcon from "$lib/components/Icon/ViewIcon.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { convertDate, isLate } from "$lib/utils/dateHelpers";
	import { centsToDollars, sumLineItems } from "$lib/utils/moneyHelpers";
	import SendIcon from "$lib/components/Icon/SendIcon.svelte";
	import EditIcon from "$lib/components/Icon/EditIcon.svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";

	export let invoice: Invoice;
	let isAdditionalMenuShowing = false;
	let isOptionsDisabled = false;

	const handleSendInvoice = () => {
		console.log("sending");
	};
	const handleEdit = () => {
		console.log("editing");
	};
	const handleDelete = () => {
		console.log("deleting");
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
			return "archive";
		}
	};
</script>

<div
	class="invoice-table invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
>
	<div class="status"><Tag label={getInvoiceLable()} className="ml-auto lg:ml-0" /></div>
	<div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
	<div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
	<div class="clientName truncate text-base font-bold lg:text-xl">
		{invoice.client.name}
	</div>
	<div class="amount text-right font-mono text-sm font-bold lg:text-lg">
		${centsToDollars(sumLineItems(invoice.lineItems))}
	</div>
	<div class="lg:center viewButton hidden text-sm lg:text-lg">
		<a href="#" class="text-pastelPurple hover:text-daisyBush"><ViewIcon /></a>
	</div>
	<div class="lg:center moreButton relative hidden text-sm lg:text-lg">
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

<style lang="postcss">
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