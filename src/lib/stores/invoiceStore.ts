import { writable } from "svelte/store";
import data from "../../seed.json";

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
	invoices.set(data.invoices);
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
	invoices.update((prev) => {
		return prev.filter((cur) => {
			return cur.id !== invoiceToDelete.id;
		});
	});
	return invoiceToDelete;
};
