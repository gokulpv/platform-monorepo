import { apiFetch } from "$lib/server/api-fetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  try {
    const [spotlightsRes, brandRes] = await Promise.all([
      apiFetch(event, "/api/daily-spotlights"),
      apiFetch(event, "/api/brand-settings"),
    ]);

    let spotlights = [];
    if (spotlightsRes.ok) {
      spotlights = await spotlightsRes.json();
      console.log("SPOTLIGHTS DATA:", JSON.stringify(spotlights, null, 2));
    } else {
      console.error("Spotlights fetch failed:", await spotlightsRes.text());
    }

    let brand = null;
    if (brandRes.ok) {
      brand = await brandRes.json();
    } else {
      console.error("Brand settings fetch failed:", await brandRes.text());
    }

    return {
      spotlights,
      brand,
    };
  } catch (error) {
    console.error("Critical failure during home data load:", error);
    return {
      spotlights: [],
      brand: null,
    };
  }
};
