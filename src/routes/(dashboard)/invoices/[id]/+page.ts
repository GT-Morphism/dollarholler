import { getInvoiceById } from "$lib/stores/invoiceStore";
import type { PageLoad } from "./$types";

export const load = (({ params }) => {
	const id = params?.id;

	const invoice = getInvoiceById(id);

	return invoice;
}) satisfies PageLoad;
