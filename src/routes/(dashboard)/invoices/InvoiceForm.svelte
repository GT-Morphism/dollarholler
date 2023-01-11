<script lang="ts">
	import { v4 as uuid } from "uuid";
	import Button from "$lib/components/Button.svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";
	import LineItemRows from "./LineItemRows.svelte";

	const blankLineItem = {
		id: uuid(),
		description: "",
		quantity: 0,
		amount: 0
	};

	let lineItems: LineItem[] = [{ ...blankLineItem }];

	const addLineItem = () => {
		lineItems = [...lineItems, { ...blankLineItem, id: uuid() }];
	};

	const removeLineItem = (event: CustomEvent) => {
		lineItems = lineItems.filter((item) => item.id !== event.detail);
	};
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
	<!-- client -->
	<div class="field col-span-2">
		<label for="client">Client</label>
		<select name="client" id="client">
			<option value="zeal">ZEAL</option>
		</select>
	</div>
	<div class="field col-span-2 flex items-end gap-x-5">
		<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
		<Button style="outline" label="+ Client" isAnimated={false} />
	</div>

	<!-- invoice id -->
	<div class="field col-span-2">
		<label for="id">Invoice ID</label>
		<input type="number" name="id" />
	</div>

	<!-- due date -->
	<div class="field col-span-2">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" />
	</div>

	<!-- issue date -->
	<div class="field col-span-2 col-start-5">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" />
	</div>

	<!-- subject -->
	<div class="field col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" />
	</div>

	<!-- line items -->
	<div class="field col-span-6">
		<LineItemRows {lineItems} on:addLineItem={addLineItem} on:removeLineItem={removeLineItem} />
	</div>

	<!-- notes -->
	<div class="field col-span-6">
		<label for="notes"
			>Notes <span class="font-normal">(optional, displayed on invoice)</span></label
		>
		<textarea name="notes" id="notes" />
	</div>

	<!-- terms -->
	<div class="field col-span-6">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
		>
		<textarea name="terms" id="terms" />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>

	<!-- buttons -->
	<div class="field col-span-1">
		<!-- only visible if editing -->
		<Button
			style="textOnlyDestructive"
			label="Delete"
			isAnimated={false}
			on:click={() => {}}
			iconLeft={TrashIcon}
		/>
	</div>
	<div class="field col-span-4 flex justify-end gap-x-5">
		<Button style="secondary" label="Cancel" isAnimated={false} on:click={() => {}} />
		<Button label="Save" on:click={() => {}} />
	</div>
</form>
