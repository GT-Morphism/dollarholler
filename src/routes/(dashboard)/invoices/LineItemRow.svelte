<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";
	import { twoDecimals, dollarsToCents, centsToDollars } from "$lib/utils/moneyHelpers";

	let dispatch = createEventDispatcher();

	export let lineItem: LineItem;
	export let canDelete: boolean = false;
	export let isRequired: boolean = false;

	let unitPrice = centsToDollars(lineItem.amount / lineItem.quantity) || "0.00";
	let amount: string;

	$: {
		amount = twoDecimals(lineItem.quantity * Number(unitPrice));
		lineItem.amount = dollarsToCents(Number(amount));
	}
</script>

<div class="invoice-line-item border-b-2 border-fog py-4 sm:py-2">
	<div class="description">
		<label for="description" class="line-item-label">Description</label>
		<input
			class="line-item truncate"
			type="text"
			name="description"
			bind:value={lineItem.description}
			required={isRequired}
		/>
	</div>

	<div class="unitPrice">
		<label for="unitPrice" class="line-item-label">Unit Price</label>
		<input
			class="line-item text-right"
			type="number"
			name="unitPrice"
			step="0.01"
			min="0"
			required={isRequired}
			bind:value={unitPrice}
			on:blur={() => {
				unitPrice = twoDecimals(Number(unitPrice));
			}}
			on:input={() => {
				dispatch("updateLineItem");
			}}
		/>
	</div>

	<div class="qty">
		<label for="quantity" class="line-item-label text-center">Qty</label>
		<input
			class="line-item text-center"
			type="number"
			name="quantity"
			min="0"
			required={isRequired}
			bind:value={lineItem.quantity}
			on:input={() => {
				dispatch("updateLineItem");
			}}
		/>
	</div>

	<div class="amount">
		<label for="amount" class="line-item-label text-right">Amount</label>
		<input
			class="line-item text-right"
			type="number"
			name="amount"
			step="0.01"
			min="0"
			bind:value={amount}
			disabled
		/>
	</div>

	<div class="trash">
		{#if canDelete}
			<button
				class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo"
				on:click|preventDefault={() => {
					dispatch("removeLineItem", lineItem.id);
				}}><TrashIcon /></button
			>
		{/if}
	</div>
</div>

<style lang="postcss">
	input[type="text"],
	input[type="number"] {
		@apply h-10 w-full border-b-2 border-dashed border-stone-300;
	}

	input[type="text"] {
		@apply font-sansSerif text-xl font-bold;
	}

	input[type="number"] {
		@apply font-mono text-base;
	}

	input[type="text"]:focus,
	input[type="number"]:focus {
		@apply border-solid border-lavenderIndigo outline-none;
	}

	input[type="text"]:disabled,
	input[type="number"]:disabled {
		@apply border-b-0 bg-transparent px-0;
	}

	.line-item-label {
		@apply block sm:hidden;
	}
</style>
