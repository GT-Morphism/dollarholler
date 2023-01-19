import supabase from "$lib/utils/supabase";
import { writable } from "svelte/store";

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
	const { data, error } = await supabase.from("invoice").select("*, client(id, name),lineItems(*)");

	if (error) {
		console.error(error);
		return;
	}

	invoices.set(data as Invoice[]);
};

export const getInvoiceById = async (id: string): Promise<Invoice | undefined> => {
	const { data, error } = await supabase
		.from("invoice")
		.select("*, client(id, name), lineItems(*)")
		.eq("id", id);

	if (error) {
		console.error(error);
		return;
	}

	if (data) return data[0] as Invoice;

	console.warn(`No invoice with id ${id}`);
};

export const addInvoice = (invoiceToAdd: Invoice) => {
	invoices.update((prev: Invoice[]) => [...prev, invoiceToAdd]);
	return invoiceToAdd;
};

export const updateInvoice = (invoiceToUpdate: Invoice) => {
	invoices.update((prev: Invoice[]) =>
		prev.map((cur: Invoice) => (cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
	);
	return invoiceToUpdate;
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
	invoices.update((prev: Invoice[]) => {
		return prev.filter((cur: Invoice) => {
			return cur.id !== invoiceToDelete.id;
		});
	});
	return invoiceToDelete;
};
