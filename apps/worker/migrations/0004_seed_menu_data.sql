-- Seed menu data for Koi Resto Bar (t_koi)

-- 1. Categories
INSERT INTO categories (id, tenant_id, name, type) VALUES (1, 't_koi', 'Starters', 'food');
INSERT INTO categories (id, tenant_id, name, type) VALUES (2, 't_koi', 'Sushi & Rolls', 'food');
INSERT INTO categories (id, tenant_id, name, type) VALUES (3, 't_koi', 'Main Course', 'food');
INSERT INTO categories (id, tenant_id, name, type) VALUES (4, 't_koi', 'Desserts', 'food');
INSERT INTO categories (id, tenant_id, name, type) VALUES (5, 't_koi', 'Artisan Cocktails', 'drink');

-- 2. Menu Items
INSERT INTO menu_items (id, tenant_id, name, description, category_id, main_category_id, price, is_veg, prep_time_minutes, calories, rating_avg, rating_count) 
VALUES (1, 't_koi', 'Signature Dragon Fire Roll', 'Spicy tuna, cucumber, and avocado topped with seared salmon and unagi sauce.', 2, 2, 18.00, 0, 15, 450, 4.8, 120);

INSERT INTO menu_items (id, tenant_id, name, description, category_id, main_category_id, price, is_veg, prep_time_minutes, calories, rating_avg, rating_count) 
VALUES (2, 't_koi', 'Crispy Truffle Edamame', 'Steamed green soybean pods tossed in premium white truffle oil and sea salt.', 1, 1, 9.00, 1, 8, 180, 4.5, 85);

INSERT INTO menu_items (id, tenant_id, name, description, category_id, main_category_id, price, is_veg, prep_time_minutes, calories, rating_avg, rating_count) 
VALUES (3, 't_koi', 'Miso Glazed Black Cod', '24-hour miso-marinated cod, served with baby pak choi and ginger-soy glaze.', 3, 3, 32.00, 0, 25, 520, 4.9, 95);

INSERT INTO menu_items (id, tenant_id, name, description, category_id, main_category_id, price, is_veg, prep_time_minutes, calories, rating_avg, rating_count) 
VALUES (4, 't_koi', 'Spicy Kung Pao Chicken', 'Classic Sichuan style chicken with peanuts, dried red chilies, and scallions.', 3, 3, 22.00, 0, 20, 650, 4.6, 110);

INSERT INTO menu_items (id, tenant_id, name, description, category_id, main_category_id, price, is_veg, prep_time_minutes, calories, rating_avg, rating_count) 
VALUES (5, 't_koi', 'Matcha Lava Cake', 'Vibrant green tea molten cake with a liquid center, served with toasted sesame ice cream.', 4, 4, 12.00, 1, 15, 600, 4.7, 75);

INSERT INTO menu_items (id, tenant_id, name, description, category_id, main_category_id, price, is_veg, prep_time_minutes, calories, rating_avg, rating_count) 
VALUES (6, 't_koi', 'Wasabi Martini', 'Artisan cocktail with gin, fresh lime, and a subtle kick of wasabi.', 5, 5, 15.00, 1, 5, 210, 4.4, 50);

-- 3. Menu Item Images
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url, sort_order) VALUES ('t_koi', 1, 'menu/dragon_fire_roll.webp', 0);
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url, sort_order) VALUES ('t_koi', 2, 'menu/truffle_edamame.webp', 0);
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url, sort_order) VALUES ('t_koi', 3, 'menu/miso_black_cod.webp', 0);
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url, sort_order) VALUES ('t_koi', 4, 'menu/kung_pao_chicken.webp', 0);
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url, sort_order) VALUES ('t_koi', 5, 'menu/matcha_lava_cake.webp', 0);
INSERT INTO menu_item_images (tenant_id, menu_item_id, image_url, sort_order) VALUES ('t_koi', 6, 'menu/wasabi_martini.webp', 0);

-- 4. Ingredients
INSERT INTO ingredients (id, tenant_id, name) VALUES (1, 't_koi', 'Tuna');
INSERT INTO ingredients (id, tenant_id, name) VALUES (2, 't_koi', 'Salmon');
INSERT INTO ingredients (id, tenant_id, name) VALUES (3, 't_koi', 'Avocado');
INSERT INTO ingredients (id, tenant_id, name) VALUES (4, 't_koi', 'Truffle Oil');
INSERT INTO ingredients (id, tenant_id, name) VALUES (5, 't_koi', 'Edamame');
INSERT INTO ingredients (id, tenant_id, name) VALUES (6, 't_koi', 'Black Cod');
INSERT INTO ingredients (id, tenant_id, name) VALUES (7, 't_koi', 'Miso');
INSERT INTO ingredients (id, tenant_id, name) VALUES (8, 't_koi', 'Chicken');
INSERT INTO ingredients (id, tenant_id, name) VALUES (9, 't_koi', 'Peanuts');
INSERT INTO ingredients (id, tenant_id, name) VALUES (10, 't_koi', 'Matcha');
INSERT INTO ingredients (id, tenant_id, name) VALUES (11, 't_koi', 'Gin');

-- 5. Menu Item Ingredients mapping
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 1, 1);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 1, 2);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 1, 3);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 2, 4);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 2, 5);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 3, 6);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 3, 7);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 4, 8);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 4, 9);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 5, 10);
INSERT INTO menu_item_ingredients (tenant_id, menu_item_id, ingredient_id) VALUES ('t_koi', 6, 11);

-- 6. Allergens
INSERT INTO allergens (id, tenant_id, name) VALUES (1, 't_koi', 'Fish');
INSERT INTO allergens (id, tenant_id, name) VALUES (2, 't_koi', 'Soy');
INSERT INTO allergens (id, tenant_id, name) VALUES (3, 't_koi', 'Peanut');
INSERT INTO allergens (id, tenant_id, name) VALUES (4, 't_koi', 'Gluten');
INSERT INTO allergens (id, tenant_id, name) VALUES (5, 't_koi', 'Dairy');

-- 7. Menu Item Allergens mapping
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 1, 1);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 1, 2);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 2, 2);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 3, 1);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 3, 2);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 4, 3);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 4, 2);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 5, 5);
INSERT INTO menu_item_allergens (tenant_id, menu_item_id, allergen_id) VALUES ('t_koi', 5, 4);

-- 8. Tags
INSERT INTO tags (id, tenant_id, name) VALUES (1, 't_koi', 'Spicy');
INSERT INTO tags (id, tenant_id, name) VALUES (2, 't_koi', 'Vegan');
INSERT INTO tags (id, tenant_id, name) VALUES (3, 't_koi', 'Bestseller');
INSERT INTO tags (id, tenant_id, name) VALUES (4, 't_koi', 'Chef Choice');

-- 9. Menu Item Tags mapping
INSERT INTO menu_item_tags (tenant_id, menu_item_id, tag_id) VALUES ('t_koi', 1, 1);
INSERT INTO menu_item_tags (tenant_id, menu_item_id, tag_id) VALUES ('t_koi', 1, 3);
INSERT INTO menu_item_tags (tenant_id, menu_item_id, tag_id) VALUES ('t_koi', 2, 2);
INSERT INTO menu_item_tags (tenant_id, menu_item_id, tag_id) VALUES ('t_koi', 3, 4);
INSERT INTO menu_item_tags (tenant_id, menu_item_id, tag_id) VALUES ('t_koi', 3, 3);

-- 10. Ratings
INSERT INTO ratings (tenant_id, menu_item_id, user_id, rating, review) VALUES ('t_koi', 1, 101, 5, 'Best sushi roll I have ever had! The seared salmon is divine.');
INSERT INTO ratings (tenant_id, menu_item_id, user_id, rating, review) VALUES ('t_koi', 2, 102, 4, 'Great starter, love the truffle aroma.');
INSERT INTO ratings (tenant_id, menu_item_id, user_id, rating, review) VALUES ('t_koi', 3, 103, 5, 'The black cod is so buttery and flavorful.');

-- 11. Daily Spotlights
INSERT INTO daily_spotlights (tenant_id, menu_item_id, title, subtitle, start_date, end_date, priority) 
VALUES ('t_koi', 1, 'Chef Special', 'Try our signature Dragon Fire Roll today!', '2026-04-12', '2026-04-30', 1);

INSERT INTO daily_spotlights (tenant_id, menu_item_id, title, subtitle, start_date, end_date, priority) 
VALUES ('t_koi', 3, 'Fine Dining Selection', 'Exquisite Miso Glazed Black Cod', '2026-04-12', '2026-04-30', 2);
