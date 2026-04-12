import { env } from '$env/dynamic/private';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Hono worker origin (no trailing slash).
 * Set `WORKER_BASE_PATH` in `.env`, Cloudflare Pages, or CI.
 */
export function getWorkerBaseUrl(): string {
	const raw = env.WORKER_BASE_PATH?.trim();
	if (!raw) return 'http://localhost:8787';
	return raw.replace(/\/$/, '');
}

/** Tenant when the host does not carry a subdomain (env `TENANT_FALLBACK` or default). */
export function getDefaultTenantFallback(): string {
	return env.TENANT_FALLBACK?.trim() || 't_koi';
}

/** Value for `x-tenant-subdomain` (host-derived `locals.subdomain` or env default). */
export function resolveTenantForApi(locals: App.Locals): string {
	const fromLocals = locals.subdomain?.trim();
	if (fromLocals) return fromLocals;
	return getDefaultTenantFallback();
}

const workerApiPathPrefix = '/api';

function workerApiUrl(path: string): string {
	let segment = path.trim().replace(/^\/+/, '');
	if (segment.startsWith('api/')) segment = segment.slice(4);
	return `${getWorkerBaseUrl()}${workerApiPathPrefix}/${segment}`;
}

export function isWorkerRequest(url: string): boolean {
	const base = getWorkerBaseUrl();
	return url === base || url.startsWith(`${base}/`);
}

/**
 * Calls the worker under `/api/...` using the request-scoped `fetch` so `handleFetch` can attach tenant headers.
 * @param path - Route segment after `/api/` (with or without leading slashes), e.g. `brand-settings`
 */
export function apiFetch(
	event: Pick<RequestEvent, 'fetch' | 'locals'>,
	path: string,
	init?: RequestInit
): Promise<Response> {
	return event.fetch(workerApiUrl(path), init);
}
