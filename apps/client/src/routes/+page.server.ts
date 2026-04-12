import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	try {
		const base = env.WORKER_BASE_PATH?.trim().replace(/\/$/, '');
		if (!base) throw new Error('WORKER_BASE_PATH is not set');
		const response = await event.fetch(`${base}/api/brand-settings`);
		const brand = await response.json();
		return brand;
	} catch (error) {
		console.error('Failed to fetch branding:', error);
		return { brand: null };
	}
};
