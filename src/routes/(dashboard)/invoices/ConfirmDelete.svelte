<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { deleteInvoice } from "$lib/stores/invoiceStore";
	import { centsToDollars, sumLineItems } from "$lib/utils/moneyHelpers";

	export let isDeleteModalShowing: boolean = false;
	export let invoice: Invoice;
	export let closePanel: () => void = () => {};
</script>

<Modal bind:isVisible={isDeleteModalShowing}>
	<div class="flex flex-col items-center justify-between gap-6">
		<div class="text-center text-xl font-bold text-daisyBush">
			Are you sure you want to delete this invoice to <span class="text-scarlet"
				>{invoice.client.name}</span
			>
			for
			<span class="text-scarlet">${centsToDollars(sumLineItems(invoice.lineItems))}</span> ?
		</div>
		<div class="flex gap-x-4">
			<Button
				label="Cancel"
				isAnimated={false}
				style="secondary"
				on:click={() => {
					isDeleteModalShowing = false;
				}}
			/>
			<Button
				label="Yes, Delete It"
				isAnimated={false}
				style="destructive"
				on:click={() => {
					deleteInvoice(invoice);
					isDeleteModalShowing = false;
					closePanel();
				}}
			/>
		</div>
	</div>
</Modal>
