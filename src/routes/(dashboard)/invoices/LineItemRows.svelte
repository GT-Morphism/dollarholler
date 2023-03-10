<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "$lib/components/Button.svelte";
	import CircledAmount from "$lib/components/CircledAmount.svelte";
	import LineItemRow from "./LineItemRow.svelte";
	import {
		addThousandsSeparator,
		centsToDollars,
		sumLineItems,
		twoDecimals
	} from "$lib/utils/moneyHelpers";

	export let lineItems: LineItem[] | undefined = undefined;
	export let discount: number | undefined = 0;
	export let isEditable: boolean = true;

	let dispatch = createEventDispatcher();
	let subtotal = "0.00";
	let discountedAmount: string = "0.00";
	let totalAmount: string = "0.00";

	$: if (sumLineItems(lineItems) > 0) {
		subtotal = centsToDollars(sumLineItems(lineItems));
	}

	$: if (subtotal && discount) {
		discountedAmount = centsToDollars(sumLineItems(lineItems) * (discount / 100));
	}

	$: {
		const plainSubtotal = subtotal.replace(",", "");
		totalAmount = addThousandsSeparator(
			twoDecimals(Number(plainSubtotal) - Number(discountedAmount))
		);
	}
</script>

<!-- <svelte:window
	on:keydown={(event) => {
		if (event.key === "Enter") {
			dispatch("addLineItem");
		}
	}}
/> -->

<div class="invoice-line-item border-b-2 border-daisyBush pb-2">
	<div class="table-header">Description</div>

	<div class="table-header text-right">Unit Price</div>

	<div class="table-header text-center">Qty</div>

	<div class="table-header text-right">Amount</div>
</div>

{#if lineItems}
	{#each lineItems as lineItem, index}
		<LineItemRow
			{lineItem}
			on:removeLineItem
			on:updateLineItem
			canDelete={index > 0}
			isRequired={index === 0}
			{isEditable}
		/>
	{/each}
{/if}

<div class="invoice-line-item">
	<div class="col-span-1 print:hidden sm:col-span-2">
		{#if isEditable}
			<Button
				label="+ Line Item"
				style="textOnly"
				isAnimated={false}
				on:click={() => {
					dispatch("addLineItem");
				}}
			/>
		{/if}
	</div>
	<div class="py-5 text-right font-bold text-monsoon print:col-span-3">Subtotal</div>
	<div class="py-5 text-right font-mono print:col-span-2">${subtotal}</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-1 py-5 text-right font-bold text-monsoon print:col-span-3 sm:col-span-2">
		Discount
	</div>
	<div class="relative print:col-span-1">
		<input
			type="number"
			name="discount"
			min="0"
			max="100"
			disabled={!isEditable}
			bind:value={discount}
			class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-lavenderIndigo focus:outline-none print:pr-0"
		/>
		<span class="absolute right-0 top-2 font-mono">%</span>
	</div>
	<div class="py-5 text-right font-mono print:col-span-1">${discountedAmount}</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-3 print:col-span-6 sm:col-span-6">
		<CircledAmount label="Total: " amount={"$" + totalAmount} />
	</div>
</div>

<style lang="postcss">
	.table-header {
		@apply hidden text-sm font-bold text-daisyBush print:block sm:block;
	}
</style>
