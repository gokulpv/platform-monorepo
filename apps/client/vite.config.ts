import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 5174,
		https: {
			key: fs.readFileSync(path.resolve(__dirname, './certs/key.pem')),
			cert: fs.readFileSync(path.resolve(__dirname, './certs/cert.pem'))
		}
	}
});
