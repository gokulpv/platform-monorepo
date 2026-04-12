import { apiFetch } from "$lib/server/api-fetch";
import type { PageServerLoad } from "./$types";

/** Run `load` during `vite build` and emit static HTML for `/`. Use a reachable `WORKER_BASE_PATH` at build time (see `.env.production` for production builds; local dev still uses `.env`). */
export const prerender = true;

export const load: PageServerLoad = async (event) => {
  try {
    const response = await apiFetch(event, "/api/brand-settings");
    const brand = await response.json();
    return brand;
  } catch (error) {
    console.error("Failed to fetch branding:", error);
    return { brand: null };
  }
};
