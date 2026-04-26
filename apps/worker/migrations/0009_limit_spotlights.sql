-- Keep only the 'Fine Dining Selection' spotlight for both tenants to avoid carousel behavior
DELETE FROM daily_spotlights 
WHERE title NOT LIKE '%Fine Dining%';
