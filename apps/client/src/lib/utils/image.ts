import { PUBLIC_IMAGE_BASE_URL } from '$env/static/public';

/**
 * Resolves a partial image path using the configured base URL.
 * Handles both absolute URLs and relative paths.
 */
export function resolveImagePath(path: string | null | undefined): string {
	if (!path) return '';

	// Absolute remote URLs or data URIs
	if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
		return path;
	}

	// Root-relative path (e.g. /assets/menu/photo.webp): use as-is so we don't double-prefix
	// PUBLIC_IMAGE_BASE_URL when the API/DB already includes /assets/…
	if (path.startsWith('/')) {
		return path;
	}

	const base = PUBLIC_IMAGE_BASE_URL.endsWith('/')
		? PUBLIC_IMAGE_BASE_URL
		: `${PUBLIC_IMAGE_BASE_URL}/`;
	return `${base}${path}`;
}
