<script>
	import BlankRow from "$lib/components/BlankRow.svelte";
	import InvoiceRowHeader from "./InvoiceRowHeader.svelte";
</script>

<div>
	<div class="-mt-8 lg:-mt-12">
		<h2
			class="mb-10 bg-arrowLeftUp bg-left bg-no-repeat pt-14 pl-24 font-handwriting text-2xl font-bold text-caribbeanGreen md:bg-arrowRightUp md:bg-right md:pl-0 md:pr-28 md:text-right md:text-4xl"
		>
			Add Your First Invoice
		</h2>
	</div>
	<InvoiceRowHeader className="text-fog" />

	<BlankRow />
	<BlankRow />
	<BlankRow />
</div>
