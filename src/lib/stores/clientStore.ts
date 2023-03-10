import { writable } from "svelte/store";
import data from "../../seed.json";

export const clients = writable<Client[]>([]);

export const loadClients = () => {
	clients.set(data.clients);
};

export const addClient = (clientToAdd: Client) => {
	clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: "active" }]);
	return clientToAdd;
};

export const updateClient = (clientToUpdate: Client) => {
	clients.update((prev: Client[]) =>
		prev.map((curClient: Client) =>
			curClient.id === clientToUpdate.id ? clientToUpdate : curClient
		)
	);

	return clientToUpdate;
};

export const getClientById = (id: string): Client | undefined => {
	return data.clients.find((client: Client) => client.id === id);
};
