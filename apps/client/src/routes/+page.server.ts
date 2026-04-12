import { apiFetch } from "$lib/server/api-fetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  try {
    const response = await apiFetch(event, "brand-settings");
    const brand = await response.json();
    return brand;
  } catch (error) {
    console.error("Failed to fetch branding:", error);
    return { brand: null };
  }
};
