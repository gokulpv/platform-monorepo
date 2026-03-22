import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { D1Database } from '@cloudflare/workers-types'

type Bindings = {
  DB: D1Database
}

type Variables = {
  tenantId: string
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.use('/*', cors({
  origin: (origin) => origin, // Allow any origin for local dev + credentials
  credentials: true,
  allowHeaders: ['Content-Type', 'x-tenant-subdomain'],
}))

// --- In-Memory Isolate Cache ---
// Global Map to remember resolved domains instantly for warm worker isolates
const tenantCache = new Map<string, string>()

// --- Global Tenant Middleware ---
// This runs on EVERY /api/* route automatically
app.use('/api/*', async (c, next) => {
  const subdomain = c.req.header('x-tenant-subdomain')
  console.log('subdomain', subdomain)
  if (!subdomain) {
    return c.json({ error: 'Missing x-tenant-subdomain header' }, 400)
  }

  // 1. Check ultra-fast memory cache
  let tenantId = tenantCache.get(subdomain)

  // 2. If missed, query D1 and save to cache
  if (!tenantId) {
    const tenant = await c.env.DB.prepare('SELECT id FROM tenant WHERE subdomain = ?')
      .bind(subdomain)
      .first<{ id: string }>()

    if (!tenant) {
      return c.json({ error: 'Tenant not found' }, 404)
    }

    tenantId = tenant.id
    tenantCache.set(subdomain, tenantId)
  }

  // Bind the resolved tenant ID to this request's context
  c.set('tenantId', tenantId)
  await next()
})

const routes = app
  .get('/api/brand-settings', async (c) => {
    const tenantId = c.get('tenantId')
    console.log('tenantId', tenantId)
    const brand = await c.env.DB.prepare('SELECT * FROM brand_settings WHERE tenant_id = ?').bind(tenantId).first()
    return c.json(brand)
  })

export type AppType = typeof routes

export default app
