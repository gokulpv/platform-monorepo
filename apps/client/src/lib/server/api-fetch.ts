import { WORKER_BASE_PATH } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";

function requireWorkerBase(): string {
  const base = WORKER_BASE_PATH?.trim().replace(/\/$/, "");
  if (!base) {
    throw new Error(
      "WORKER_BASE_PATH is not set; add it to .env, Cloudflare Pages, or your CI environment.",
    );
  }
  return base;
}

/**
 * `fetch` to the Hono worker: `{WORKER_BASE_PATH}{path}`.
 * Pass the exact path to append (e.g. `/api/brand-settings`). Uses `event.fetch` so `handleFetch` can add `x-tenant-subdomain`.
 */
export function apiFetch(
  event: Pick<RequestEvent, "fetch" | "locals">,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return event.fetch(`${requireWorkerBase()}${path}`, init);
}
