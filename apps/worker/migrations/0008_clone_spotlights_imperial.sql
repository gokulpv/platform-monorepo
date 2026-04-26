-- Clone daily spotlights from Koi to Imperial
INSERT INTO daily_spotlights (tenant_id, menu_item_id, title, subtitle, start_date, end_date, priority)
SELECT 't_imperial', 
    (SELECT id FROM menu_items WHERE tenant_id = 't_imperial' AND name = (SELECT name FROM menu_items WHERE id = ds.menu_item_id)),
    title, subtitle, start_date, end_date, priority
FROM daily_spotlights ds WHERE tenant_id = 't_koi';
