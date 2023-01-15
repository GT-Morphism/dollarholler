<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import CheckIcon from "$lib/components/Icon/CheckIcon.svelte";
	import { addClient } from "$lib/stores/clientStore";

	import { states } from "$lib/utils/states";

	export let closePanel: () => void = () => {};
	export let formState: "edit" | "create" = "create";
	export let client: Client = {} as Client;

	const handleSubmit = () => {
		addClient(client);
		closePanel();
	};
</script>

<!-- Heading -->
<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
	{#if formState === "create"}
		Add new Client
	{:else}
		Edit existing Client
	{/if}
</h2>

<!-- Form -->

<form class="grid grid-cols-6 gap-y-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
	<!-- client name -->
	<div class="col-span-6">
		<label for="clientName">Client Name</label>
		<input bind:value={client.name} type="text" name="clientName" required />
	</div>

	<!-- client email -->
	<div class="col-span-6">
		<label for="email">Client E-Mail Address</label>
		<input bind:value={client.email} type="email" name="email" required />
	</div>

	<!-- client address -->
	<div class="col-span-6">
		<label for="street">Address</label>
		<input bind:value={client.street} type="text" name="street" />
	</div>

	<!-- client city -->
	<div class="col-span-2">
		<label for="city">City</label>
		<input bind:value={client.city} type="text" name="city" />
	</div>

	<!-- client state -->
	<div class="col-span-2">
		<label for="state">State</label>
		<select bind:value={client.state} name="state" id="state">
			<option />
			{#each states as state}
				<option value={state.value}>{state.name}</option>
			{/each}
		</select>
	</div>

	<!-- client zip -->
	<div class="col-span-2">
		<label for="zip">Zip Code</label>
		<input bind:value={client.zip} type="text" name="zip" minlength="5" />
	</div>

	<div class="col-span-6 mt-5 flex justify-end gap-x-4">
		<Button style="secondary" label="Cancel" isAnimated={false} on:click={closePanel} />
		<button
			class="button flex translate-y-0 gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-0.5 hover:shadow-coloredHover"
			type="submit"><CheckIcon />Save</button
		>
	</div>
</form>
