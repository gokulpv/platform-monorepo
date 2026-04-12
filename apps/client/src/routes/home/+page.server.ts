import { apiFetch } from '$lib/server/api-fetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	try {
		const [spotlightsRes, brandRes] = await Promise.all([
			apiFetch(event, 'daily-spotlights'),
			apiFetch(event, 'brand-settings')
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
