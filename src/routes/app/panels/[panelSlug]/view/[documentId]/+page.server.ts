import { AppwriteService } from '$lib/appwrite.server';
import { PageUtils } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { Models } from 'node-appwrite';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	PageUtils.parseAuth(cookies);
	const { panel, group } = PageUtils.parseParams(params);

	const id = params.documentId;

	if (!id) {
		throw error(404, { message: 'Document not found.' });
	}

	try {
		const document = await AppwriteService.getDocument<any & Models.Document>(
			panel.databaseId,
			panel.collectionId,
			id
		);

		return {
			panelDocument: document,

			panelSlug: params.panelSlug,
			group,
			panel
		};
	} catch (err: any) {
		throw error(500, { message: 'Could not load document: ' + err.message });
	}
};
