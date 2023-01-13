<script lang="ts">
	import { addClient, clients, loadClients } from "$lib/stores/clientStore";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { v4 as uuid } from "uuid";
	import { states } from "$lib/utils/states";
	import Button from "$lib/components/Button.svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";
	import LineItemRows from "./LineItemRows.svelte";
	import { today } from "$lib/utils/dateHelpers";
	import { addInvoice, updateInvoice } from "$lib/stores/invoiceStore";
	import ConfirmDelete from "./ConfirmDelete.svelte";
	import { snackbar } from "$lib/stores/snackbarStore";

	const blankLineItem: LineItem = {
		id: uuid(),
		description: "",
		quantity: 0,
		amount: 0
	};

	export let closePanel: () => void = () => {};
	export let formState: "create" | "edit" = "create";
	export let invoice: Invoice = {
		client: {} as Client,
		lineItems: [{ ...blankLineItem }] as LineItem[]
	} as Invoice;

	let isNewClient: boolean = false;
	let isModalShowing: boolean = false;
	let lineItems: LineItem[] = invoice.lineItems as LineItem[];
	let newClient: Partial<Client> = {};

	const addLineItem = () => {
		lineItems = [...lineItems, { ...blankLineItem, id: uuid() }];
	};

	const removeLineItem = (event: CustomEvent) => {
		lineItems = lineItems.filter((item) => item.id !== event.detail);
	};

	const updateLineItem = () => {
		// To enforce svelte to update "subtotal" when unit price or quantity
		// of line item changes (inside LineItemRow);
		lineItems = lineItems;
	};

	const handleSubmit = () => {
		if (isNewClient) {
			invoice.client = newClient as Client;
			addClient(newClient as Client);
		}

		if (formState === "create") {
			addInvoice(invoice);
			snackbar.send({
				message: "Your invoice was successfully created",
				type: "success"
			});
		} else {
			updateInvoice(invoice);
			snackbar.send({
				message: "Your invoice was successfully updated",
				type: "success"
			});
		}
		closePanel();
	};

	onMount(() => {
		loadClients();
	});
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
	{#if formState === "create"}
		Add an Invoice
	{:else}
		Edit Invoice for {invoice.client.name}
	{/if}
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
	<!-- client -->
	<div class="field col-span-6 md:col-span-4">
		{#if !isNewClient}
			<label for="client">Client</label>
			<div class="flex flex-wrap items-end gap-2 sm:flex-nowrap sm:gap-y-0 md:gap-x-5">
				<select
					name="client"
					id="client"
					required={!isNewClient}
					bind:value={invoice.client.id}
					on:change={() => {
						const selectedClient = $clients.find((client) => client.id === invoice.client.id);
						invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : "";
					}}
				>
					<option />
					{#each $clients as client}
						<option value={client.id}>{client.name}</option>
					{/each}
				</select>
				<div class="text-base font-bold leading-[2.25rem] text-monsoon lg:leading-[3.5rem]">or</div>
				<Button
					style="outline"
					label="+ Client"
					isAnimated={false}
					on:click={() => {
						isNewClient = true;
						invoice.client.id = "";
					}}
				/>
			</div>
		{:else}
			<label for="newClient">New Client's Name</label>
			<div class="flex flex-wrap items-end gap-2 sm:flex-nowrap sm:gap-y-0 md:gap-x-5">
				<input type="text" name="newClient" required={isNewClient} bind:value={newClient.name} />
				<div class="text-base font-bold leading-[2.25rem] text-monsoon lg:leading-[3.5rem]">or</div>
				<Button
					style="outline"
					label="Existing Client"
					isAnimated={false}
					on:click={() => {
						isNewClient = false;
						newClient = {};
					}}
				/>
			</div>
		{/if}
	</div>

	<!-- invoice id -->
	<div class="field col-span-6 row-start-1 md:col-span-2 md:row-start-auto">
		<label for="invoiceNumber">Invoice ID</label>
		<input type="number" name="invoiceNumber" required bind:value={invoice.invoiceNumber} />
	</div>

	<!-- new client -->
	{#if isNewClient}
		<div class="field col-span-6 grid gap-x-5" transition:slide>
			<div class="field col-span-6">
				<label for="email">Client's Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required={isNewClient}
					bind:value={newClient.email}
				/>
			</div>

			<div class="field col-span-6">
				<label for="street">Client's Street</label>
				<input type="text" name="street" id="street" bind:value={newClient.street} />
			</div>

			<div class="field col-span-2">
				<label for="city">Client's City</label>
				<input type="text" name="city" id="city" bind:value={newClient.city} />
			</div>

			<div class="field col-span-2">
				<label for="state">Client's State</label>
				<select name="state" id="state" bind:value={newClient.state}>
					<option />
					{#each states as state}
						<option value={state.value}>{state.name}</option>
					{/each}
				</select>
			</div>

			<div class="field col-span-2">
				<label for="zip">Client's Zip</label>
				<input type="text" name="zip" id="zip" bind:value={newClient.zip} />
			</div>
		</div>
	{/if}

	<!-- due date -->
	<div class="field col-span-3 sm:col-span-2">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" min={today} required bind:value={invoice.dueDate} />
	</div>

	<!-- issue date -->
	<div class="field col-span-3 sm:col-span-2 md:col-start-5">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" min={today} bind:value={invoice.issueDate} />
	</div>

	<!-- subject -->
	<div class="field col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" bind:value={invoice.subject} />
	</div>

	<!-- line items -->
	<div class="field col-span-6">
		<LineItemRows
			bind:discount={invoice.discount}
			{lineItems}
			on:addLineItem={addLineItem}
			on:removeLineItem={removeLineItem}
			on:updateLineItem={updateLineItem}
		/>
	</div>

	<!-- notes -->
	<div class="field col-span-6">
		<label for="notes"
			>Notes <span class="font-normal">(optional, displayed on invoice)</span></label
		>
		<textarea name="notes" id="notes" bind:value={invoice.notes} />
	</div>

	<!-- terms -->
	<div class="field col-span-6">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
		>
		<textarea name="terms" id="terms" bind:value={invoice.terms} />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>

	<!-- buttons -->
	<div class="field col-span-2">
		<!-- only visible if editing -->
		{#if formState === "edit"}
			<Button
				style="textOnlyDestructive"
				label="Delete"
				isAnimated={false}
				on:click={() => {
					isModalShowing = true;
				}}
				iconLeft={TrashIcon}
			/>
		{/if}
	</div>
	<div class="field col-span-4 flex justify-end gap-x-5">
		<Button style="secondary" label="Cancel" isAnimated={false} on:click={closePanel} />
		<button
			class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
			type="submit">Save</button
		>
	</div>
</form>

<ConfirmDelete {invoice} bind:isDeleteModalShowing={isModalShowing} {closePanel} />
