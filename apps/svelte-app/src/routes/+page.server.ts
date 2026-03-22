import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	return [
		{ subdomain: 'nike' },
		{ subdomain: 'spotify' },
		{ subdomain: 'google' }
	];
};

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const response = await fetch(`http://localhost:8787/api/brand-settings`);
		const brand = await response.json();
		return brand;
	} catch (error) {
		console.error('Failed to fetch branding:', error);
		return { brand: null };
	}
};