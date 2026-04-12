import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const base = env.WORKER_BASE_PATH?.trim().replace(/\/$/, '');
	if (!base) throw new Error('WORKER_BASE_PATH is not set');

	try {
		const [spotlightsRes, brandRes] = await Promise.all([
			event.fetch(`${base}/api/daily-spotlights`),
			event.fetch(`${base}/api/brand-settings`)
		]);

		const spotlights = await spotlightsRes.json();
		const brand = await brandRes.json();

		return {
			spotlights,
			brand
		};
	} catch (error) {
		console.error('Failed to fetch home data:', error);
		return {
			spotlights: [],
			brand: null
		};
	}
};
