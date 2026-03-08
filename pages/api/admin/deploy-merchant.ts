import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import { getMerchants, upsertMerchant, slugify } from '@/lib/admin/merchants';
import type { MerchantDeploy, DeployMerchantRequest } from '@/types/admin';
import crypto from 'crypto';

const RENDER_API = 'https://api.render.com/v1';
const BACKEND_API_URL = 'https://ecomdash-api.onrender.com';
const GITHUB_ORG = 'Growzilla';
const TEMPLATE_REPO = 'ShopifyDashboardProduct';
const DEFAULT_SCOPES = 'read_analytics,read_orders,read_products';

function getRenderKey(): string {
  const key = process.env.RENDER_API_KEY;
  if (!key) throw new Error('RENDER_API_KEY not set');
  return key;
}

function getGithubToken(): string {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) throw new Error('GITHUB_ACCESS_TOKEN not set');
  return token;
}

async function renderFetch(path: string, options: { method?: string; body?: unknown } = {}) {
  const res = await fetch(`${RENDER_API}${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${getRenderKey()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function githubFetch(path: string, options: { method?: string; body?: unknown } = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `token ${getGithubToken()}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: list all merchants
  if (req.method === 'GET') {
    if (!requireAuth(req, res)) return;
    return res.json({ data: getMerchants() });
  }

  // POST: deploy a new merchant
  if (req.method === 'POST') {
    if (!requireAuth(req, res)) return;

    const { merchant, storeUrl, clientId, clientSecret, email, scopes } =
      req.body as DeployMerchantRequest;

    if (!merchant || !clientId || !clientSecret) {
      return res.status(400).json({ error: 'merchant, clientId, and clientSecret are required' });
    }

    const slug = slugify(merchant);
    const repoName = `growzilla-${slug}`;
    const serviceName = `growzilla-${slug}`;
    const appUrl = `https://${serviceName}.onrender.com`;
    const finalScopes = scopes || DEFAULT_SCOPES;
    const id = crypto.randomUUID();

    const deploy: MerchantDeploy = {
      id,
      merchant: slug,
      storeUrl: storeUrl || '',
      status: 'deploying',
      clientId,
      clientSecret: clientSecret.slice(0, 8) + '...',
      email: email || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    upsertMerchant(deploy);

    const logs: string[] = [];

    try {
      // Step 1: Create GitHub repo from template
      logs.push('Creating GitHub repo from template...');
      const repoRes = await githubFetch(`/repos/${GITHUB_ORG}/${TEMPLATE_REPO}/generate`, {
        method: 'POST',
        body: {
          owner: GITHUB_ORG,
          name: repoName,
          private: true,
          description: `Growzilla custom app for ${slug}`,
        },
      });

      let githubRepo = `${GITHUB_ORG}/${repoName}`;
      if (repoRes.ok || repoRes.status === 201) {
        logs.push(`GitHub repo created: ${githubRepo}`);
      } else if (repoRes.status === 422) {
        logs.push(`GitHub repo already exists: ${githubRepo}`);
      } else {
        logs.push(`GitHub repo creation failed (${repoRes.status}), continuing...`);
      }

      // Step 2: Push merchant-specific configs to the repo
      logs.push('Pushing merchant configs...');

      // shopify.app.toml
      const tomlContent = `# Growzilla Custom App — ${slug}
# Generated: ${new Date().toISOString()}

client_id = "${clientId}"
name = "Growzilla ${slug.charAt(0).toUpperCase() + slug.slice(1)}"
application_url = "${appUrl}"
embedded = true

[build]
automatically_update_urls_on_dev = true

[webhooks]
api_version = "2026-04"

  [[webhooks.subscriptions]]
  topics = [ "app/scopes_update" ]
  uri = "/webhooks/app/scopes_update"

  [[webhooks.subscriptions]]
  topics = [ "app/uninstalled" ]
  uri = "/webhooks/app/uninstalled"

  [[webhooks.subscriptions]]
  topics = [ "products/update" ]
  uri = "/webhooks/products/update"

  [[webhooks.subscriptions]]
  topics = [ "orders/create" ]
  uri = "/webhooks/orders/create"

  [[webhooks.subscriptions]]
  topics = [ "orders/updated" ]
  uri = "/webhooks/orders/updated"

  [webhooks.privacy_compliance]
  customer_data_request_url = "/webhooks/customers/data_request"
  customer_deletion_url = "/webhooks/customers/redact"
  shop_deletion_url = "/webhooks/shop/redact"

[access_scopes]
scopes = "${finalScopes}"

[auth]
redirect_urls = [ "${appUrl}/auth/callback" ]
`;

      await githubFetch(`/repos/${githubRepo}/contents/shopify.app.toml`, {
        method: 'PUT',
        body: {
          message: `Configure shopify.app.toml for ${slug}`,
          content: Buffer.from(tomlContent).toString('base64'),
          branch: 'main',
        },
      });
      logs.push('shopify.app.toml pushed');

      // render.yaml
      const renderYaml = `# Render Blueprint — Growzilla ${slug}
services:
  - type: web
    name: ${serviceName}
    runtime: node
    region: oregon
    plan: starter
    buildCommand: npm install && npx prisma generate && npx prisma migrate deploy && npm run build
    startCommand: npm run start
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: SHOPIFY_API_KEY
        sync: false
      - key: SHOPIFY_API_SECRET
        sync: false
      - key: BACKEND_API_URL
        value: ${BACKEND_API_URL}
      - key: SHOPIFY_APP_URL
        value: ${appUrl}
      - key: SCOPES
        value: ${finalScopes}
      - key: DATABASE_URL
        fromDatabase:
          name: growzilla-${slug}-db
          property: connectionString
    autoDeploy: true

databases:
  - name: growzilla-${slug}-db
    plan: free
    region: oregon
`;

      // Get current render.yaml SHA first (for update)
      const existingFile = await githubFetch(`/repos/${githubRepo}/contents/render.yaml`);
      const renderPutBody: Record<string, unknown> = {
        message: `Configure render.yaml for ${slug}`,
        content: Buffer.from(renderYaml).toString('base64'),
        branch: 'main',
      };
      if (existingFile.ok && existingFile.data?.sha) {
        renderPutBody.sha = existingFile.data.sha;
      }
      await githubFetch(`/repos/${githubRepo}/contents/render.yaml`, {
        method: 'PUT',
        body: renderPutBody,
      });
      logs.push('render.yaml pushed');

      // Step 3: Create Render service + DB
      logs.push('Creating Render infrastructure...');

      // Get owner ID
      const ownerRes = await renderFetch('/owners');
      if (!ownerRes.ok) {
        throw new Error(`Render API failed: ${ownerRes.status}`);
      }
      const ownerId = ownerRes.data?.[0]?.owner?.id;
      if (!ownerId) throw new Error('Could not determine Render owner ID');

      // Create database
      logs.push('Creating Render database...');
      const dbRes = await renderFetch('/postgres', {
        method: 'POST',
        body: {
          name: `growzilla-${slug}-db`,
          plan: 'free',
          region: 'oregon',
          ownerId,
          databaseName: `growzilla_${slug.replace(/-/g, '_')}`,
          databaseUser: 'growzilla',
        },
      });

      let dbConnectionString = '';
      if (dbRes.ok) {
        dbConnectionString = dbRes.data?.connectionString || '';
        logs.push(`Database created: growzilla-${slug}-db`);
      } else {
        logs.push(`Database creation: ${dbRes.status} (may already exist)`);
      }

      // Create web service
      logs.push('Creating Render web service...');
      const envVars = [
        { key: 'NODE_ENV', value: 'production' },
        { key: 'SHOPIFY_API_KEY', value: clientId },
        { key: 'SHOPIFY_API_SECRET', value: clientSecret },
        { key: 'BACKEND_API_URL', value: BACKEND_API_URL },
        { key: 'SHOPIFY_APP_URL', value: appUrl },
        { key: 'SCOPES', value: finalScopes },
      ];
      if (dbConnectionString) {
        envVars.push({ key: 'DATABASE_URL', value: dbConnectionString });
      }

      const svcRes = await renderFetch('/services', {
        method: 'POST',
        body: {
          name: serviceName,
          ownerId,
          type: 'web_service',
          autoDeploy: 'yes',
          serviceDetails: {
            runtime: 'node',
            region: 'oregon',
            plan: 'starter',
            buildCommand:
              'npm install && npx prisma generate && npx prisma migrate deploy && npm run build',
            startCommand: 'npm run start',
            healthCheckPath: '/',
            envVars,
            repo: `https://github.com/${githubRepo}`,
          },
        },
      });

      let renderServiceId = '';
      if (svcRes.ok) {
        renderServiceId = svcRes.data?.service?.id || svcRes.data?.id || '';
        logs.push(`Service created: ${serviceName} (${renderServiceId})`);
      } else {
        logs.push(`Service creation: ${svcRes.status} — ${JSON.stringify(svcRes.data).slice(0, 200)}`);
      }

      // Step 4: Update ALLOWED_ORIGINS on shared backend
      logs.push('Updating ALLOWED_ORIGINS on shared backend...');
      try {
        await updateAllowedOrigins(slug, storeUrl);
        logs.push('ALLOWED_ORIGINS updated');
      } catch (e) {
        logs.push(`ALLOWED_ORIGINS update failed: ${e instanceof Error ? e.message : 'unknown'}`);
      }

      // Build install link
      const installLink = storeUrl
        ? `https://${storeUrl.replace(/^https?:\/\//, '')}/admin/oauth/install?client_id=${clientId}`
        : '';

      // Update merchant record
      const updated: MerchantDeploy = {
        ...deploy,
        status: 'live',
        githubRepo,
        renderServiceId,
        renderServiceUrl: appUrl,
        installLink,
        updatedAt: new Date().toISOString(),
      };
      upsertMerchant(updated);

      return res.json({
        success: true,
        merchant: updated,
        installLink,
        logs,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      logs.push(`FAILED: ${errorMsg}`);
      upsertMerchant({ ...deploy, status: 'failed', error: errorMsg, updatedAt: new Date().toISOString() });
      return res.status(500).json({ success: false, error: errorMsg, logs });
    }
  }

  // PATCH: update merchant (add credentials, change status)
  if (req.method === 'PATCH') {
    if (!requireAuth(req, res)) return;

    const { id, ...updates } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });

    const { updateMerchantStatus } = await import('@/lib/admin/merchants');
    const updated = updateMerchantStatus(id, updates);
    if (!updated) return res.status(404).json({ error: 'Merchant not found' });

    return res.json({ data: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function updateAllowedOrigins(slug: string, storeUrl?: string) {
  const renderKey = getRenderKey();

  // Find the ecomdash-api service
  const servicesRes = await fetch(`${RENDER_API}/services?type=web_service&limit=50`, {
    headers: { Authorization: `Bearer ${renderKey}`, Accept: 'application/json' },
  });
  if (!servicesRes.ok) throw new Error('Failed to list Render services');

  const services = await servicesRes.json();
  const backend = services.find(
    (s: { service: { name: string } }) =>
      s.service?.name === 'ecomdash-api' || s.service?.name === 'ecomdash-app'
  );
  if (!backend?.service?.id) throw new Error('ecomdash-api service not found on Render');

  const serviceId = backend.service.id;

  // Get current env vars
  const envRes = await fetch(`${RENDER_API}/services/${serviceId}/env-vars`, {
    headers: { Authorization: `Bearer ${renderKey}`, Accept: 'application/json' },
  });
  if (!envRes.ok) throw new Error('Failed to get env vars');

  const envVars = await envRes.json();
  const originsVar = envVars.find((v: { key: string }) => v.key === 'ALLOWED_ORIGINS');
  const currentOrigins = originsVar?.value || '';

  // Add new origins
  const newOrigins = [`growzilla-${slug}.onrender.com`];
  if (storeUrl) {
    const domain = storeUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    newOrigins.push(domain);
  }

  const originsToAdd = newOrigins.filter((o) => !currentOrigins.includes(o));
  if (originsToAdd.length === 0) return;

  const updatedOrigins = currentOrigins
    ? `${currentOrigins},${originsToAdd.join(',')}`
    : originsToAdd.join(',');

  // Update env var
  await fetch(`${RENDER_API}/services/${serviceId}/env-vars`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${renderKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify([
      ...envVars.map((v: { key: string; value: string }) => ({ key: v.key, value: v.value })),
      ...(originsVar ? [] : [{ key: 'ALLOWED_ORIGINS', value: updatedOrigins }]),
    ].map((v: { key: string; value: string }) =>
      v.key === 'ALLOWED_ORIGINS' ? { key: v.key, value: updatedOrigins } : v
    )),
  });
}
