import { env } from "$env/dynamic/private";
import type { Handle, HandleFetch } from "@sveltejs/kit";

function subdomainFromHost(hostname: string): string | null {
  const parts = hostname.split(".");
  if (parts.length > 1 && parts[0] !== "localhost") {
    return parts[0];
  }
  return null;
}

export const handle: Handle = async ({ event, resolve }) => {
  const fromHost = subdomainFromHost(event.url.hostname);
  event.locals.subdomain = fromHost ?? (env.TENANT_FALLBACK?.trim() || "t_koi");

  return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  const base = env.WORKER_BASE_PATH?.trim().replace(/\/$/, "");
  if (!base || (request.url !== base && !request.url.startsWith(`${base}/`))) {
    return fetch(request);
  }

  const headers = new Headers(request.headers);
  const tenant =
    event.locals.subdomain?.trim() || env.TENANT_FALLBACK?.trim() || "t_koi";
  headers.set("x-tenant-subdomain", "t_koi");
  return fetch(new Request(request, { headers }));
};
