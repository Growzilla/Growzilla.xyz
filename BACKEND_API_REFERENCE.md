# EcomDash Backend API - Complete Reference for Dashboard Integration

> **Purpose**: This document provides everything needed to build a new dashboard app that connects to the EcomDash backend API deployed at `https://ecomdash-api.onrender.com`. It covers every endpoint, data model, response schema, the Shopify data pipeline, and the exact frontend integration patterns used by the existing growzilla-beta app.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Base URL & Authentication](#2-base-url--authentication)
3. [Shop Identification Flow](#3-shop-identification-flow)
4. [API Endpoints - Complete Reference](#4-api-endpoints---complete-reference)
5. [Database Models & Stored Data](#5-database-models--stored-data)
6. [Shopify Data Sync Pipeline](#6-shopify-data-sync-pipeline)
7. [Insight Generation Engine](#7-insight-generation-engine)
8. [Response Schemas (TypeScript)](#8-response-schemas-typescript)
9. [Frontend Integration Patterns](#9-frontend-integration-patterns)
10. [Error Handling & Fallback Strategy](#10-error-handling--fallback-strategy)
11. [Known Limitations & Gotchas](#11-known-limitations--gotchas)

---

## 1. Architecture Overview

```
┌──────────────────────┐     ┌─────────────────────────────┐     ┌──────────────┐
│  Your New Dashboard  │────▶│  FastAPI Backend (Render)    │────▶│  PostgreSQL   │
│  (Any framework)     │     │  ecomdash-api.onrender.com  │     │  (Render)     │
└──────────────────────┘     └─────────────────────────────┘     └──────────────┘
                                        │
                                        │ Background sync tasks
                                        ▼
                              ┌─────────────────────┐
                              │  Shopify GraphQL API │
                              │  (2025-01 version)   │
                              └─────────────────────┘
```

**Stack**:
- **Backend**: Python FastAPI + SQLAlchemy 2.0 (async) + asyncpg
- **Database**: PostgreSQL on Render
- **Shopify API**: GraphQL Admin API (version 2025-01)
- **Data sync**: Background tasks triggered on shop creation/manual sync
- **Insights**: Rule-based engine (no AI calls in MVP) analyzing order + product data

---

## 2. Base URL & Authentication

### Base URL
```
https://ecomdash-api.onrender.com
```

### Authentication
**Current state: No authentication middleware is enforced on API routes.** The backend accepts requests without JWT tokens. It uses these headers when provided:

```http
Content-Type: application/json
Authorization: Bearer <shopify-access-token>    # Optional, not validated by middleware
X-Shopify-Access-Token: <shopify-access-token>  # Optional, not validated by middleware
```

**Important**: The API is effectively open. All endpoints accept requests from any client in `ALLOWED_ORIGINS`. The only "auth" is the admin bootstrap endpoint which checks `admin_key == SECRET_KEY`.

### CORS
Allowed origins are configured server-side via the `ALLOWED_ORIGINS` env var (comma-separated). Your dashboard domain must be added there.

---

## 3. Shop Identification Flow

The backend identifies merchants by **shop UUID** (not domain). Here's the full flow:

### Step 1: Resolve Domain → UUID
```
GET /api/shops/{shop_domain}
```
If the shop exists, you get back its UUID. If not (404), register it.

### Step 2: Register Shop (if needed)
```
POST /api/shops
Body: { "domain": "store.myshopify.com", "accessToken": "shpat_xxx", "scopes": "read_products,read_orders" }
```
This creates the shop record, encrypts the access token, and **automatically triggers a background data sync** (products + orders + insight generation).

### Step 3: Use UUID for All Subsequent Calls
Every dashboard/insights endpoint requires `shop_id` as a UUID query parameter:
```
GET /api/dashboard/stats?shop_id=<uuid>
GET /api/insights?shop_id=<uuid>
```

### Resolution Helper (from existing frontend)
```typescript
async function resolveShopId(client, shopDomain, accessToken): Promise<string | null> {
  try {
    const shop = await client.getShop(shopDomain);  // GET /api/shops/{domain}
    return shop.id;
  } catch {
    const newShop = await client.registerShop(domain, accessToken, scopes);  // POST /api/shops
    return newShop.id;
  }
}
```

---

## 4. API Endpoints - Complete Reference

### 4.1 Health Endpoints (no prefix)

#### `GET /`
Root endpoint. Returns API name and status.
```json
{ "name": "EcomDash V2 API", "version": "2.0.0", "status": "running" }
```

#### `GET /health`
Basic health check.
```json
{ "status": "healthy", "timestamp": "2026-02-10T12:00:00Z", "version": "2.0.0" }
```

#### `GET /health/ready`
Readiness probe. Checks database connectivity.
```json
{ "status": "ready", "checks": { "database": "connected" }, "timestamp": "..." }
```

#### `GET /health/live`
Liveness probe. Always returns alive if server is running.
```json
{ "status": "alive", "timestamp": "..." }
```

---

### 4.2 Shop Endpoints (prefix: `/api/shops`)

#### `POST /api/shops` - Register/Update Shop
Creates or updates a shop after OAuth. **Triggers automatic background data sync.**

**Request Body**:
```json
{
  "domain": "store.myshopify.com",
  "accessToken": "shpat_xxxxxxxxxxxx",
  "scopes": "read_products,read_orders"
}
```
Note: `accessToken` can also be sent as `access_token` (field alias: `accessToken`).

**Response** (201 Created):
```json
{
  "id": "a1b2c3d4-...",
  "domain": "store.myshopify.com",
  "scopes": "read_products,read_orders",
  "deepModeEnabled": false,
  "clarityProjectId": null,
  "lastSyncAt": null,
  "syncStatus": "pending",
  "createdAt": "2026-02-10T10:00:00Z"
}
```

#### `GET /api/shops/{shop_domain}` - Get Shop by Domain
**Path param**: `shop_domain` (string, e.g., `testingground-9560.myshopify.com`)

**Response** (200):
```json
{
  "id": "a1b2c3d4-...",
  "domain": "testingground-9560.myshopify.com",
  "scopes": "read_products,read_orders",
  "deepModeEnabled": false,
  "clarityProjectId": null,
  "lastSyncAt": "2026-02-10T10:05:00Z",
  "syncStatus": "completed",
  "createdAt": "2026-02-10T10:00:00Z"
}
```
**Errors**: 404 if shop not found, 503 if database unavailable.

#### `PATCH /api/shops/{shop_domain}` - Update Shop Settings
**Request Body** (all optional):
```json
{
  "deepModeEnabled": true,
  "clarityProjectId": "abc123"
}
```

#### `DELETE /api/shops/{shop_domain}` - Delete Shop
Deletes shop and all associated data (products, orders, insights). Returns 204 No Content.

#### `POST /api/shops/{shop_id}/sync` - Trigger Data Sync
**Path param**: `shop_id` (UUID)

**Request Body**:
```json
{ "fullSync": false }
```
Note: The frontend currently sends a POST with **no body**. The backend expects `ShopSyncRequest` which defaults `fullSync` to `false`.

**Response**:
```json
{
  "message": "Sync started",
  "shopId": "a1b2c3d4-...",
  "syncStarted": true
}
```

---

### 4.3 Dashboard Endpoints (prefix: `/api/dashboard`)

#### `GET /api/dashboard/stats?shop_id={uuid}` - Dashboard Statistics
Returns yesterday vs 7-day-average comparison metrics.

**Query params**:
- `shop_id` (UUID, required)

**Response**:
```json
{
  "yesterdayRevenue": 1247.50,
  "weekAvgRevenue": 1089.32,
  "yesterdayOrders": 18,
  "weekAvgOrders": 15,
  "yesterdayAov": 69.31,
  "weekAvgAov": 72.62,
  "revenueDelta": 14.5,
  "ordersDelta": 20.0,
  "aovDelta": -4.6
}
```

**Behavior**:
- If DB is unavailable (`session is None`): returns **demo data** with hardcoded values
- If shop not found: returns **all zeros**
- If shop exists but no orders: returns **all zeros** (NOT demo data)
- On exception: falls back to **demo data**

**Delta calculations**: `((yesterday - weekAvg) / weekAvg) * 100` — represents percentage change.

#### `GET /api/dashboard/revenue-chart?shop_id={uuid}&period={period}` - Revenue Chart
Returns daily revenue/orders data for charting.

**Query params**:
- `shop_id` (UUID, required)
- `period` (string, optional): `"7d"` (default), `"30d"`, or `"90d"`

**Response**:
```json
{
  "data": [
    { "date": "2026-02-03", "revenue": 1050.00, "orders": 12, "aov": 87.50 },
    { "date": "2026-02-04", "revenue": 890.50, "orders": 10, "aov": 89.05 },
    ...
  ],
  "period": "7d",
  "totalRevenue": 7450.00,
  "totalOrders": 85
}
```

**Behavior**:
- No DB: returns **demo chart** (7 fake data points)
- Shop not found / no orders: returns **empty** `{ data: [], period, totalRevenue: 0, totalOrders: 0 }`
- On exception: falls back to **demo chart**

#### `GET /api/dashboard/top-products?shop_id={uuid}&limit={n}&period={period}` - Top Products
Returns top-selling products ranked by revenue.

**Query params**:
- `shop_id` (UUID, required)
- `limit` (int, default 10, max 50)
- `period` (string): `"7d"`, `"30d"` (default), or `"90d"`

**Response**:
```json
{
  "products": [
    {
      "id": "gid://shopify/Product/123",
      "title": "Premium Widget",
      "revenue": 2450.00,
      "unitsSold": 35,
      "imageUrl": null
    },
    ...
  ],
  "period": "30d"
}
```

**How revenue is calculated**: Iterates through all order `line_items` JSONB, extracts `originalTotalSet.shopMoney.amount` and aggregates by `product.id`.

#### `GET /api/dashboard/summary?shop_id={uuid}` - Complete Dashboard Summary
**Single call** that combines stats + revenue chart (7d) + top products (5, 30d) + active insights count.

**Response**:
```json
{
  "stats": { ... DashboardStats ... },
  "revenueChart": { ... RevenueChartData ... },
  "topProducts": [ ... TopProduct[] ... ],
  "activeInsightsCount": 3
}
```

This is the **recommended endpoint** for initial dashboard load — one HTTP request instead of four.

---

### 4.4 Insights Endpoints (prefix: `/api/insights`)

#### `GET /api/insights?shop_id={uuid}` - List Active Insights
Returns paginated, filterable list of AI-generated business insights.

**Query params**:
- `shop_id` (UUID, required)
- `page` (int, default 1)
- `page_size` (int, default 20, max 100)
- `severity` (string, optional): `"critical"`, `"high"`, `"medium"`, `"low"`
- `type` (string, optional): see Insight Types below

**Response**:
```json
{
  "items": [
    {
      "id": "b2c3d4e5-...",
      "shopId": "a1b2c3d4-...",
      "type": "inventory_alert",
      "severity": "high",
      "title": "3 products running low on stock",
      "actionSummary": "Review inventory for: Widget A, Widget B, Widget C...",
      "expectedUplift": "Prevent stockout lost revenue",
      "confidence": 0.95,
      "payload": {
        "low_stock_count": 3,
        "products": [
          { "id": "gid://shopify/Product/123", "title": "Widget A", "inventory": 2 }
        ]
      },
      "adminDeepLink": "/products?inventory_quantity_max=5",
      "createdAt": "2026-02-10T10:05:00Z",
      "dismissedAt": null
    }
  ],
  "total": 3,
  "page": 1,
  "pageSize": 20,
  "hasMore": false
}
```

**Behavior when no DB**: Returns a single hardcoded demo insight about mobile conversion rates.

#### `GET /api/insights/{insight_id}` - Get Single Insight
Returns full insight details by UUID.

#### `POST /api/insights/{insight_id}/dismiss` - Dismiss Insight
Sets `dismissed_at` timestamp. Dismissed insights are excluded from list queries.

**Response**:
```json
{
  "id": "b2c3d4e5-...",
  "dismissedAt": "2026-02-10T12:00:00Z",
  "message": "Insight dismissed"
}
```

#### `POST /api/insights/{insight_id}/action` - Mark as Actioned
Records that user acted on the insight's recommendation.

**Response**:
```json
{ "message": "Insight marked as actioned", "id": "b2c3d4e5-..." }
```

#### `GET /api/insights/stats/{shop_id}` - Insight Statistics
Returns counts of insights by severity and type.

**Response**:
```json
{
  "total": 0,
  "active": 0,
  "dismissed": 0,
  "actioned": 0,
  "by_severity": { "high": 2, "medium": 1 },
  "by_type": { "inventory_alert": 1, "trend_detection": 1, "understocked_winner": 1 }
}
```

---

### 4.5 Admin Endpoint (temporary)

#### `POST /admin/bootstrap-shop?shop_domain={domain}&admin_key={key}`
Reads access token from the shared Prisma Session table and registers + tests the shop. Requires `SECRET_KEY` as admin_key. Used for debugging — not for dashboard integration.

---

## 5. Database Models & Stored Data

### 5.1 `shops` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated, used in all API calls |
| `domain` | VARCHAR(255), unique | e.g. `store.myshopify.com` |
| `access_token_encrypted` | TEXT | Fernet-encrypted Shopify access token |
| `scopes` | TEXT | OAuth scopes granted |
| `deep_mode_enabled` | BOOLEAN | Feature flag |
| `clarity_project_id` | VARCHAR(255) | Microsoft Clarity ID (optional) |
| `last_sync_at` | TIMESTAMP TZ | Last successful sync time |
| `sync_status` | VARCHAR(50) | `pending` / `syncing` / `completed` / `failed` |
| `created_at` | TIMESTAMP TZ | Auto-set |
| `updated_at` | TIMESTAMP TZ | Auto-updated |

### 5.2 `products` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | VARCHAR(255, PK) | Shopify GID: `gid://shopify/Product/123` |
| `shop_id` | UUID (FK → shops) | Owning shop |
| `title` | VARCHAR(500) | Product name |
| `handle` | VARCHAR(255) | URL-friendly slug |
| `status` | VARCHAR(50) | `active`, `draft`, `archived` |
| `product_type` | VARCHAR(255) | Shopify product type |
| `vendor` | VARCHAR(255) | Vendor name |
| `total_inventory` | INTEGER | Sum across all variants |
| `inventory_tracked` | BOOLEAN | Whether inventory is tracked |
| `price_min` | NUMERIC(10,2) | Lowest variant price |
| `price_max` | NUMERIC(10,2) | Highest variant price |
| `collections` | JSONB | Array of collection titles |
| `variants` | JSONB | Variant data (currently empty dict) |
| `featured_image_url` | TEXT | Main product image URL |
| `synced_at` | TIMESTAMP TZ | Last sync time |
| `created_at` | TIMESTAMP TZ | DB record creation time |

### 5.3 `orders` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | VARCHAR(255, PK) | Shopify GID: `gid://shopify/Order/123` |
| `shop_id` | UUID (FK → shops) | Owning shop |
| `order_number` | INTEGER | Numeric order number |
| `name` | VARCHAR(50) | Display name: `#1001` |
| `total_price` | NUMERIC(12,2) | Total including tax |
| `subtotal_price` | NUMERIC(12,2) | Before tax |
| `total_tax` | NUMERIC(12,2) | Tax amount |
| `total_discounts` | NUMERIC(12,2) | Discount amount |
| `currency` | VARCHAR(3) | `USD`, `CAD`, etc. |
| `financial_status` | VARCHAR(50) | `paid`, `pending`, `refunded`, etc. |
| `fulfillment_status` | VARCHAR(50) | `fulfilled`, `unfulfilled`, `partial` |
| `customer_id` | VARCHAR(255) | Shopify customer GID |
| `customer_email` | VARCHAR(255) | Customer email |
| `line_items` | JSONB | Array of line item objects (see below) |
| `line_item_count` | INTEGER | Number of line items |
| `discount_codes` | JSONB | Applied discount codes |
| `processed_at` | TIMESTAMP TZ | When order was processed (indexed!) |
| `synced_at` | TIMESTAMP TZ | Last sync time |

#### Line Item JSONB Structure
Each item in the `line_items` array:
```json
{
  "id": "gid://shopify/LineItem/456",
  "title": "Widget A",
  "quantity": 2,
  "amount": 49.98,
  "product_id": "gid://shopify/Product/123"
}
```
Note: The `amount` comes from `originalTotalSet.shopMoney.amount` in the Shopify GraphQL response.

### 5.4 `insights` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `shop_id` | UUID (FK → shops) | Owning shop |
| `type` | VARCHAR(50) | Insight type enum (see below) |
| `severity` | VARCHAR(20) | `critical`, `high`, `medium`, `low` |
| `title` | VARCHAR(255) | Human-readable title |
| `action_summary` | TEXT | Actionable description |
| `expected_uplift` | VARCHAR(100) | Expected business impact |
| `confidence` | FLOAT | 0.0 - 1.0 confidence score |
| `payload` | JSONB | Structured data specific to insight type |
| `admin_deep_link` | TEXT | Shopify admin URL path |
| `dismissed_at` | TIMESTAMP TZ | When user dismissed (null = active) |
| `actioned_at` | TIMESTAMP TZ | When user took action |
| `created_at` | TIMESTAMP TZ | Creation time (indexed) |
| `expires_at` | TIMESTAMP TZ | Auto-expiry (optional) |

### 5.5 Disabled Models (NOT in MVP)
The following models exist in code but are **not imported or used**:
- `AnalyticsEvent` - Web analytics tracking events
- `AnalyticsSession` - Session aggregation
- `ConversionFunnel` - Funnel configuration
- `ConversionEvent` - Conversion tracking
- `SessionReplay` - Session replay metadata
- `HeatmapData` - Click/scroll heatmaps

The analytics router is also disabled. Don't try to call `/api/v1/analytics/*` endpoints.

---

## 6. Shopify Data Sync Pipeline

### Trigger Points
1. **Auto on shop creation**: `POST /api/shops` triggers `sync_shop_data()` as a BackgroundTask
2. **Manual trigger**: `POST /api/shops/{shop_id}/sync`

### Sync Flow
```
sync_shop_data(shop_id)
  ├── Get shop from DB (decrypt access token)
  ├── _sync_products()
  │     ├── GraphQL: products(first: 50) with cursor pagination
  │     ├── Extracts: id, title, handle, status, productType, vendor,
  │     │            totalInventory, tracksInventory, priceRange, collections, featuredImage
  │     ├── UPSERT into products table (ON CONFLICT by id)
  │     └── Rate limited: 0.5s between pages
  │
  ├── _sync_orders()
  │     ├── GraphQL: orders(first: 50) with cursor pagination
  │     ├── Extracts: id, name, totalPriceSet, subtotalPriceSet, totalTaxSet,
  │     │            totalDiscountsSet, financialStatus, fulfillmentStatus,
  │     │            customer, processedAt, lineItems, discountCodes
  │     ├── UPSERT into orders table (ON CONFLICT by id)
  │     └── Rate limited: 0.5s between pages
  │
  ├── generate_insights() — Basic rule-based insights
  │     ├── Insight 1: AOV Trend (7d vs 30d comparison)
  │     ├── Insight 2: Top Product by Revenue (if >20% share)
  │     └── Insight 3: Low Inventory Alert (<=5 units remaining)
  │
  ├── InsightsEngine.compute_all_insights() — Advanced insights
  │     ├── Understocked Winners (high sales + low inventory)
  │     ├── Overstock Slow Movers (low sales + high inventory)
  │     └── Coupon Cannibalization (high discount rate on popular items)
  │
  └── Update shop.sync_status = "completed" + shop.last_sync_at = now()
```

### Shopify GraphQL Queries Used

**Products query** fetches: `id, title, handle, status, productType, vendor, totalInventory, tracksInventory, priceRangeV2 { minVariantPrice, maxVariantPrice }, featuredImage { url }, collections(first:10) { edges { node { title } } }`

**Orders query** fetches: `id, name, totalPriceSet, subtotalPriceSet, totalTaxSet, totalDiscountsSet, financialStatus, fulfillmentStatus, customer { id, email }, processedAt, lineItems(first:50) { edges { node { id, title, quantity, originalTotalSet, product { id } } } }, discountCodes`

---

## 7. Insight Generation Engine

### Insight Types Enum
| Type | Description |
|------|-------------|
| `traffic_sales_mismatch` | (Planned, not implemented) |
| `understocked_winner` | High sales velocity + low inventory |
| `overstock_slow_mover` | Low sales + high inventory (dead stock) |
| `coupon_cannibalization` | High discount usage on already popular products |
| `checkout_dropoff` | (Planned, not implemented) |
| `pricing_opportunity` | Top product drives >20% of revenue |
| `inventory_alert` | Products with <=5 units remaining |
| `trend_detection` | AOV trending up or down >5% |

### How Each Insight is Generated

**1. AOV Trend (`trend_detection`)**
- Compares 7-day AOV vs 30-day AOV
- Triggers when change >= 5%
- Severity: `low` (up) or `medium` (down)
- Payload: `{ aov_30d, aov_7d, change_pct }`

**2. Top Product Revenue (`pricing_opportunity`)**
- Finds product with highest revenue in 30 days
- Triggers when that product represents >= 20% of total revenue
- Severity: `medium`
- Payload: `{ product_id, product_title, revenue, units, revenue_share_pct }`

**3. Low Inventory (`inventory_alert`)**
- Finds active products with `inventory_tracked=true` AND `total_inventory <= 5` AND `> 0`
- Severity: `high`
- Payload: `{ low_stock_count, products: [{ id, title, inventory }] }`
- Admin deep link: `/products?inventory_quantity_max=5`

**4. Understocked Winners (`understocked_winner`)**
- Calculates sales velocity per product over 30 days
- Triggers when: daily_sales > P50 median AND days_remaining < 7
- Severity: `high`
- Payload: `{ product_id, product_title, current_inventory, daily_sales, days_remaining }`

**5. Overstock Slow Movers (`overstock_slow_mover`)**
- Triggers when: inventory > P80 percentile AND sales < P20 percentile
- Severity: `medium`
- Payload: `{ product_id, product_title, current_inventory, units_sold_30d }`

**6. Coupon Cannibalization (`coupon_cannibalization`)**
- Tracks discount_codes usage per product
- Triggers when: discount_rate > 40% AND revenue > P60 percentile
- Severity: `medium`
- Payload: `{ product_id, product_title, discount_rate, total_revenue }`

### Upsert Logic
Insights are **upserted by type**: if an active (non-dismissed) insight of the same type already exists for the shop, it gets **updated** with fresh data rather than creating a duplicate.

---

## 8. Response Schemas (TypeScript)

Copy these types directly into your dashboard app:

```typescript
// ===== Shop =====
interface Shop {
  id: string;               // UUID
  domain: string;           // e.g. "store.myshopify.com"
  scopes: string;           // e.g. "read_products,read_orders"
  deepModeEnabled: boolean;
  clarityProjectId?: string;
  lastSyncAt?: string;      // ISO 8601 datetime or null
  syncStatus: "pending" | "syncing" | "completed" | "failed";
  createdAt: string;        // ISO 8601
}

// ===== Dashboard Stats =====
interface DashboardStats {
  yesterdayRevenue: number;   // e.g. 1247.50
  weekAvgRevenue: number;    // 7-day daily average
  yesterdayOrders: number;    // e.g. 18
  weekAvgOrders: number;     // 7-day daily average (int)
  yesterdayAov: number;       // Average Order Value yesterday
  weekAvgAov: number;        // 7-day AOV average
  revenueDelta: number;      // % change: positive = up, negative = down
  ordersDelta: number;       // % change
  aovDelta: number;          // % change
}

// ===== Revenue Chart =====
interface RevenueDataPoint {
  date: string;      // "YYYY-MM-DD"
  revenue: number;
  orders: number;
  aov: number;       // revenue / orders for that day
}

interface RevenueChartData {
  data: RevenueDataPoint[];
  period: string;          // "7d", "30d", "90d"
  totalRevenue: number;
  totalOrders: number;
}

// ===== Top Products =====
interface TopProduct {
  id: string;              // Shopify GID: "gid://shopify/Product/123"
  title: string;
  revenue: number;
  unitsSold: number;
  imageUrl?: string | null;
}

// ===== Dashboard Summary (single call) =====
interface DashboardSummary {
  stats: DashboardStats;
  revenueChart: RevenueChartData;
  topProducts: TopProduct[];
  activeInsightsCount: number;
}

// ===== Insights =====
type InsightType =
  | "traffic_sales_mismatch"
  | "understocked_winner"
  | "overstock_slow_mover"
  | "coupon_cannibalization"
  | "checkout_dropoff"
  | "pricing_opportunity"
  | "inventory_alert"
  | "trend_detection";

type InsightSeverity = "critical" | "high" | "medium" | "low";

interface Insight {
  id: string;                    // UUID
  shopId: string;                // UUID
  type: InsightType;
  severity: InsightSeverity;
  title: string;
  actionSummary: string;         // Actionable recommendation text
  expectedUplift?: string;       // e.g. "+$850/month potential revenue"
  confidence: number;            // 0.0 - 1.0
  payload: Record<string, any>;  // Type-specific data (see Section 7)
  adminDeepLink?: string;        // Shopify admin path e.g. "/products?inventory_quantity_max=5"
  createdAt: string;             // ISO 8601
  dismissedAt?: string | null;   // null = active
}

interface PaginatedInsightsResponse {
  items: Insight[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

interface InsightDismissResponse {
  id: string;
  dismissedAt: string;
  message: string;
}
```

---

## 9. Frontend Integration Patterns

### Recommended Initialization Flow
```
1. App loads → resolve shop domain to UUID
2. Call GET /api/dashboard/summary?shop_id={uuid}
3. Render stats cards, revenue chart, top products, insights count
4. Call GET /api/insights?shop_id={uuid} for full insights list
5. User can dismiss/action individual insights via POST
6. User can trigger re-sync via POST /api/shops/{uuid}/sync
```

### API Client Pattern (from existing frontend)
```typescript
const BACKEND_URL = "https://ecomdash-api.onrender.com";
const TIMEOUT = 10000;  // 10s
const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000];  // exponential backoff

// Health check is cached for 60 seconds
// Retry on: timeout, network error, 5xx
// Safe requests return null on failure instead of throwing
```

### Key Request Patterns
```typescript
// Dashboard stats
GET /api/dashboard/stats?shop_id=<uuid>

// Revenue chart with period
GET /api/dashboard/revenue-chart?shop_id=<uuid>&period=7d

// Top products with limit
GET /api/dashboard/top-products?shop_id=<uuid>&limit=5&period=30d

// Full summary (recommended for initial load)
GET /api/dashboard/summary?shop_id=<uuid>

// Insights with filtering
GET /api/insights?shop_id=<uuid>&page=1&page_size=20&severity=high

// Dismiss insight
POST /api/insights/<insight_uuid>/dismiss

// Action insight
POST /api/insights/<insight_uuid>/action

// Trigger sync
POST /api/shops/<shop_uuid>/sync
Body: { "fullSync": false }  // or omit body (defaults work)
```

---

## 10. Error Handling & Fallback Strategy

### Backend Fallback Hierarchy
```
1. Database connected + shop exists + has data → REAL DATA (zeros are valid)
2. Database connected + shop exists + no data  → REAL ZEROS (not demo!)
3. Database connected + shop not found          → ZEROS or 404
4. Database unavailable (session is None)       → DEMO DATA (hardcoded)
5. Exception during query                       → DEMO DATA (hardcoded)
```

**Critical distinction**: An empty store with no orders returns `$0 / 0 orders` — this is intentional. Demo data only appears when the database itself is unreachable.

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created (shop registration) |
| 204 | No Content (shop deletion) |
| 400 | Bad request (invalid severity filter, already dismissed insight) |
| 404 | Not found (shop, insight) |
| 503 | Database unavailable |
| 500 | Unexpected server error |

---

## 11. Known Limitations & Gotchas

1. **No auth middleware**: API routes are open. Anyone with the shop UUID can read data. Plan for auth if this dashboard is user-facing.

2. **Field naming**: Backend uses Pydantic aliases for camelCase responses. When sending data TO the backend, both `snake_case` and `camelCase` work (Pydantic `populate_by_name=True`).

3. **syncShop body**: The existing frontend sends `POST /api/shops/{id}/sync` with no body. The backend expects `ShopSyncRequest` (with `fullSync` defaulting to `false`). This works because FastAPI parses an empty body as defaults.

4. **Shopify API version**: Hardcoded to `2025-01`. If Shopify deprecates this version, the sync will break.

5. **No webhooks**: Data only updates on manual sync or shop creation. There are no Shopify webhooks for real-time order updates.

6. **Line item structure inconsistency**: The sync stores `product_id` directly in line items, but the `top-products` aggregation looks for `item.product.id` (nested). Both paths are handled but check both when parsing.

7. **Background sync is fire-and-forget**: No way to poll sync progress. Check `shop.syncStatus` by re-fetching the shop to see if sync completed.

8. **Rate limiting**: Shopify rate limit is handled (0.5s between calls, exponential backoff on 429). Backend-side rate limiting exists in config but is not enforced.

9. **Insight deduplication**: Only one active insight per type per shop. Dismissing an insight allows a new one of that type to be created on next sync.

10. **Currency**: All financial values are in the shop's currency (from Shopify `shopMoney`). The currency code is stored per order but dashboard stats don't normalize across currencies.
