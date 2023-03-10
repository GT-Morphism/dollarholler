<script lang="ts">
	import { clickOutside } from "$lib/actions/ClickOutside";
	import AdditionalOptions from "$lib/components/AdditionalOptions.svelte";
	import ThreeDotsIcon from "$lib/components/Icon/ThreeDotsIcon.svelte";
	import ViewIcon from "$lib/components/Icon/ViewIcon.svelte";
	import EditIcon from "$lib/components/Icon/EditIcon.svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";
	import ActivateIcon from "$lib/components/Icon/ActivateIcon.svelte";
	import ArchiveIcon from "$lib/components/Icon/ArchiveIcon.svelte";
	import Cancel from "$lib/components/Icon/Cancel.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { centsToDollars, sumInvoices } from "$lib/utils/moneyHelpers";
	import SlidePanel from "$lib/components/SlidePanel.svelte";
	import ClientForm from "./ClientForm.svelte";
	import { swipe } from "$lib/actions/Swipe";

	export let client: Client;

	let triggerReset: boolean = false;
	let isAdditionalMenuShowing: boolean = false;
	let isClientFormShowing: boolean = false;

	const receivedInvoices = (): number => {
		if (client?.invoices) {
			// find invoices that have been paid
			const paidInvoices: Invoice[] = client.invoices.filter(
				(invoice: Invoice) => invoice.invoiceStatus === "paid"
			);

			// get the sum of all them
			return sumInvoices(paidInvoices);
		}

		return 0;
	};

	const balanceInvoices = (): number => {
		if (client?.invoices) {
			// find invoices that have not been paid
			const notPaidInvoices: Invoice[] = client.invoices.filter(
				(invoice: Invoice) => invoice.invoiceStatus !== "paid"
			);

			return sumInvoices(notPaidInvoices);
		}

		return 0;
	};

	const handleClientEdit = () => {
		isClientFormShowing = true;
		isAdditionalMenuShowing = false;
	};

	const activateClient = () => {
		client.clientStatus = "active";
		isAdditionalMenuShowing = false;
	};

	const archiveClient = () => {
		client.clientStatus = "archive";
		isAdditionalMenuShowing = false;
	};

	const handleClientDelete = () => console.log("deleting");
</script>

<div class="relative">
	<div
		class="client-table client-row relative z-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
		use:swipe={{ triggerReset }}
		on:outOfView={() => {
			triggerReset = false;
		}}
	>
		<div class="status self-center">
			<Tag label={client.clientStatus} />
		</div>
		<div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
			{client.name}
		</div>
		<div class="received font-mono text-sm font-bold lg:text-right lg:text-lg">
			${centsToDollars(receivedInvoices())}
		</div>
		<div class="balance text-right font-mono text-sm font-bold text-scarlet lg:text-lg">
			${centsToDollars(balanceInvoices())}
		</div>
		<div class="view relative hidden items-center justify-center lg:flex">
			<a href="/clients/{client.id}" class="text-pastelPurple hover:text-daisyBush"><ViewIcon /></a>
		</div>
		<div
			class="three-dots relative hidden items-center justify-center lg:flex"
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
						{ label: "Edit", icon: EditIcon, onClick: handleClientEdit, disabled: false },
						{
							label: "Activate",
							icon: ActivateIcon,
							onClick: activateClient,
							disabled: client.clientStatus === "active"
						},
						{
							label: "Archive",
							icon: ArchiveIcon,
							onClick: archiveClient,
							disabled: client.clientStatus === "archive"
						},
						{
							label: "Delete",
							icon: TrashIcon,
							onClick: handleClientDelete,
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

		<button class="action-button" on:click={handleClientEdit}>
			<EditIcon width={32} height={32} />
			Edit
		</button>

		{#if client.clientStatus === "active"}
			<button class="action-button" on:click={archiveClient}>
				<ArchiveIcon width={32} height={32} />
				Archive
			</button>
		{/if}

		{#if client.clientStatus === "archive"}
			<button class="action-button" on:click={activateClient}>
				<ActivateIcon width={32} height={32} />
				Activate
			</button>
		{/if}

		<button class="action-button" on:click={handleClientDelete}>
			<TrashIcon width={32} height={32} />
			Trash
		</button>

		<a href="/clients/{client.id}" class="action-button">
			<ViewIcon width={32} height={32} />
			View
		</a>
	</div>
</div>

<!-- slide panel -->
{#if isClientFormShowing}
	<SlidePanel
		bind:isVisible={isClientFormShowing}
		on:click={() => {
			isClientFormShowing = false;
		}}
	>
		<ClientForm
			formState="edit"
			{client}
			closePanel={() => {
				isClientFormShowing = false;
			}}
		/>
	</SlidePanel>
{/if}

<style lang="postcss">
	.client-row {
		grid-template-areas:
			"clientName status"
			"received balance";
	}

	@media (min-width: 1024px) {
		.client-row {
			grid-template-areas: "status clientName received balance view threeDots";
		}
	}

	.client-name {
		grid-area: clientName;
	}

	.status {
		grid-area: status;
	}

	.received {
		grid-area: received;
	}

	.received:before {
		@apply block text-xs font-bold lg:hidden;
		content: "Received: ";
	}

	.balance {
		grid-area: balance;
	}

	.balance:before {
		@apply block text-xs font-bold lg:hidden;
		content: "Balance: ";
	}

	.view {
		grid-area: view;
	}

	.three-dots {
		grid-area: threeDots;
	}
</style>
