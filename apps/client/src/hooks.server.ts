import type { Handle, HandleFetch } from '@sveltejs/kit';
import {
	getDefaultTenantFallback,
	isWorkerRequest,
	resolveTenantForApi
} from '$lib/server/api-fetch';

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
	event.locals.subdomain = fromHost ?? getDefaultTenantFallback();

	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (!isWorkerRequest(request.url)) {
		return fetch(request);
	}

	const headers = new Headers(request.headers);
	headers.set('x-tenant-subdomain', resolveTenantForApi(event.locals));
	return fetch(new Request(request, { headers }));
};
