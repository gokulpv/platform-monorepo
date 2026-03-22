-- Create the tenant table
CREATE TABLE IF NOT EXISTS tenant (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subdomain TEXT UNIQUE NOT NULL
);

-- Create the brand defaults table
CREATE TABLE IF NOT EXISTS brand_settings (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    location TEXT,
    logo_url TEXT,
    overlay_url TEXT,
    model_url TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    font_family TEXT,
    FOREIGN KEY (tenant_id) REFERENCES tenant(id) ON DELETE CASCADE
);

-- Seed an example local tenant
INSERT INTO tenant (id, name, subdomain) VALUES ('t_1', 'Apple Inc', 'apple');
INSERT INTO brand_settings (id, tenant_id, location, primary_color) VALUES ('bs_1', 't_1', 'Cupertino', '#000000');
