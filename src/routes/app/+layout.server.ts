import { AppwriteService } from '$lib/appwrite.server';
import { configStore } from '$lib/stores/config';
import { PageUtils } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	PageUtils.parseAuth(cookies);
	return {};
};
