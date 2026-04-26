-- Seed Imperial tenant
INSERT OR IGNORE INTO tenant (id, name, subdomain) VALUES ('t_imperial', 'Imperial Fine Dining', 'imperial');
INSERT OR IGNORE INTO brand_settings (id, tenant_id, location, logo_url, primary_color, secondary_color, font_family) 
VALUES ('bs_imperial', 't_imperial', 'Palace Road, Bengaluru', '/assets/logos/imperial_logo.png', '#1A2B3C', '#C0A04D', 'Playfair Display');

-- Clone categories for Imperial (id + 100 to avoid conflicts if they were explicit, but they are AUTOINCREMENT here)
INSERT INTO categories (tenant_id, name, type) 
SELECT 't_imperial', name, type FROM categories WHERE tenant_id = 't_koi';

-- Associate some menu items (this is a bit simpler than full cloning but enough for testing)
INSERT INTO menu_items (tenant_id, name, description, category_id, main_category_id, price)
SELECT 't_imperial', name, description, 
    (SELECT id FROM categories WHERE tenant_id = 't_imperial' AND name = (SELECT name FROM categories WHERE id = mi.category_id)),
    (SELECT id FROM categories WHERE tenant_id = 't_imperial' AND name = (SELECT name FROM categories WHERE id = mi.main_category_id)),
    price 
FROM menu_items mi WHERE tenant_id = 't_koi';

-- Clone images (simplified)
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url)
SELECT 't_imperial', 
    (SELECT id FROM menu_items WHERE tenant_id = 't_imperial' AND name = (SELECT name FROM menu_items WHERE id = mii.menu_item_id)),
    image_url
FROM menu_item_images mii WHERE tenant_id = 't_koi';
