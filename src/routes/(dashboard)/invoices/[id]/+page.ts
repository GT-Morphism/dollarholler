import { getInvoiceById } from "$lib/stores/invoiceStore";
import type { PageLoad } from "./$types";

export const load = (({ params }) => {
	const id = params?.id;

	const invoice = getInvoiceById(id);

	console.log({ invoice });

	return invoice;
}) satisfies PageLoad;
