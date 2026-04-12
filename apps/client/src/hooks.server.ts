import { env } from '$env/dynamic/private';
import type { Handle, HandleFetch } from '@sveltejs/kit';

function subdomainFromHost(hostname: string): string | null {
	const parts = hostname.split('.');
	// e.g. 'apple.localhost' -> 'apple'; plain 'localhost' / single-label host -> none
	if (parts.length > 1 && parts[0] !== 'localhost') {
		return parts[0];
	}
	return null;
}

export const handle: Handle = async ({ event, resolve }) => {
	const fromHost = subdomainFromHost(event.url.hostname);
	const fallback = env.TENANT_FALLBACK?.trim();
	event.locals.subdomain = fromHost ?? fallback ?? 'koi';

	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	// Forward tenant to worker (subdomain or tenant id — worker resolves both)
	if (request.url.includes('localhost:8787')) {
		const fallback = env.TENANT_FALLBACK?.trim();
		request.headers.set('x-tenant-subdomain', event.locals.subdomain || fallback || 'koi');
	}

	return fetch(request);
};