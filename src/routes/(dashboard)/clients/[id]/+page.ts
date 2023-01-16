import { getClientById } from "$lib/stores/clientStore";
import type { PageLoad } from "./$types";

export const load = (({ params }) => {
	const id = params.id;

	const client = getClientById(id);

	return client;
}) satisfies PageLoad;
