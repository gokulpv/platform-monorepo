import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
        const [spotlightsRes, brandRes] = await Promise.all([
            fetch('http://localhost:8787/api/daily-spotlights'),
            fetch('http://localhost:8787/api/brand-settings')
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
