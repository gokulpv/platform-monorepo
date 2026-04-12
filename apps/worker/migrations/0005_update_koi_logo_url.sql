-- Point Koi brand logo at static asset path (resolved with PUBLIC_IMAGE_BASE_URL on the client)
UPDATE brand_settings SET logo_url = 'logos/koi.png' WHERE tenant_id = 't_koi';
