import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		host: true,
		port: 5174,
		https: fs.existsSync(path.resolve(__dirname, './certs/key.pem'))
			? {
				key: fs.readFileSync(path.resolve(__dirname, './certs/key.pem')),
				cert: fs.readFileSync(path.resolve(__dirname, './certs/cert.pem'))
			}
			: undefined
	}
});
