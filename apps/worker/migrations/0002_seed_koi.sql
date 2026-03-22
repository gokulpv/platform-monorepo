-- Seed KOI tenant for Figma design testing
INSERT OR IGNORE INTO tenant (id, name, subdomain) VALUES ('t_koi', 'Koi Resto Bar', 'koi');
INSERT OR IGNORE INTO brand_settings (id, tenant_id, location, logo_url, primary_color, secondary_color, font_family) 
VALUES ('bs_koi', 't_koi', 'Mathikere, Bengaluru', 'https://png.pngtree.com/png-clipart/20230913/original/pngtree-koi-fish-vector-illustration-mascot-logo-vector-png-image_11060938.png', '#4A0404', '#FFB800', 'Outfit');
