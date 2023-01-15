<script lang="ts">
	import AdditionalOptions from "$lib/components/AdditionalOptions.svelte";
	import ThreeDotsIcon from "$lib/components/Icon/ThreeDotsIcon.svelte";
	import ViewIcon from "$lib/components/Icon/ViewIcon.svelte";
	import EditIcon from "$lib/components/Icon/EditIcon.svelte";
	import TrashIcon from "$lib/components/Icon/TrashIcon.svelte";
	import ActivateIcon from "$lib/components/Icon/ActivateIcon.svelte";
	import ArchiveIcon from "$lib/components/Icon/ArchiveIcon.svelte";
	import Tag from "$lib/components/Tag.svelte";

	export let client: Client;

	let isAdditionalMenuShowing = false;
</script>

<div class="client-table rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
	<div><Tag className="ml-auto" label={client.clientStatus} /></div>
	<div class="truncate whitespace-nowrap text-base font-bold lg:text-xl">{client.name}</div>
	<div class="text-right font-mono text-sm font-bold lg:text-lg">$504.00</div>
	<div class="text-right font-mono text-sm font-bold text-scarlet lg:text-lg">$240.00</div>
	<div class="relative hidden items-center justify-center lg:flex">
		<a href="#" class="text-pastelPurple hover:text-daisyBush"><ViewIcon /></a>
	</div>
	<div class="relative hidden items-center justify-center lg:flex">
		<button
			class="text-pastelPurple hover:text-daisyBush"
			on:click={() => {
				isAdditionalMenuShowing = !isAdditionalMenuShowing;
			}}><ThreeDotsIcon /></button
		>
		{#if isAdditionalMenuShowing}
			<AdditionalOptions
				options={[
					{ label: "Edit", icon: EditIcon, onClick: () => console.log("editing"), disabled: false },
					{
						label: "Activate",
						icon: ActivateIcon,
						onClick: () => {
							client.clientStatus = "active";
							isAdditionalMenuShowing = false;
						},
						disabled: client.clientStatus === "active"
					},
					{
						label: "Archive",
						icon: ArchiveIcon,
						onClick: () => {
							client.clientStatus = "archive";
							isAdditionalMenuShowing = false;
						},
						disabled: client.clientStatus === "archive"
					},
					{
						label: "Delete",
						icon: TrashIcon,
						onClick: () => console.log("deleting"),
						disabled: false
					}
				]}
			/>
		{/if}
	</div>
</div>
