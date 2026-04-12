import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(`http://localhost:8787/api/brand-settings`);
		const brand = await response.json();
		return brand;
	} catch (error) {
		console.error('Failed to fetch branding:', error);
		return { brand: null };
	}
};