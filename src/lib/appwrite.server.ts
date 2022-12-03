import { Client, Databases, Query, type Models } from 'node-appwrite';

let client = new Client();
let database = new Databases(client);

export const AppwriteService = {
	setClient: (endpoint: string, projectId: string, apiKey: string) => {
		client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
		database = new Databases(client);
	},
	listDocuments: async <T extends Models.Document>(
		databaseId: string,
		collectionId: string,
		limit = 10,
		offset = 0,
		queries: string[] = []
	) => {
		queries.push(Query.limit(limit));
		queries.push(Query.offset(offset));

		return await database.listDocuments<T>(databaseId, collectionId, queries);
	},
	deleteDocument: async (databaseId: string, collectionId: string, documentId: string) => {
		return await database.deleteDocument(databaseId, collectionId, documentId);
	}
};