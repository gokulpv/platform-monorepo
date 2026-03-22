import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const host = event.url.hostname;
	const parts = host.split('.');
	// Derive subdomain: e.g. 'apple.localhost' -> 'apple'
	// Default to 'apple' if no subdomain is present (pure localhost)
	const subdomain = parts.length > 1 && parts[0] !== 'localhost' ? parts[0] : 'apple';

	event.locals.subdomain = subdomain;

	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	// Forward the tenant subdomain to the backend worker
	if (request.url.includes('localhost:8787')) {
		request.headers.set('x-tenant-subdomain', event.locals.subdomain || 'apple');
	}

	return fetch(request);
};