import { getInvoiceById } from "$lib/stores/invoiceStore";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	const id = params.id;

	const invoice = await getInvoiceById(id);

	return invoice;
}) satisfies PageLoad;
