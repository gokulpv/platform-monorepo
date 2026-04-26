-- Update spotlight images to use new high-quality category assets
UPDATE menu_item_images 
SET image_url = '/assets/categories/starters.png' 
WHERE tenant_id = 't_koi' AND menu_item_id = 1;

UPDATE menu_item_images 
SET image_url = '/assets/categories/main.png' 
WHERE tenant_id = 't_koi' AND menu_item_id = 3;
