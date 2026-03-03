# Required Environment Variables — Growzilla Dashboard

## Core (Required)
| Variable | Description | Where |
|----------|-------------|-------|
| `ECOMDASH_API_URL` | Backend API base URL | Local + Vercel |
| `ADMIN_PASSWORD` | Admin console login password | Local + Vercel |
| `ADMIN_SECRET` | HMAC signing secret for admin sessions | Local + Vercel |
| `USER_SECRET` | HMAC signing secret for user sessions | Local + Vercel |

## Whop Integration (Optional — legacy, being replaced by backend)
| Variable | Description | Where |
|----------|-------------|-------|
| `WHOP_META_ACCESS_TOKEN` | Meta API token for Whop dashboard | Vercel |
| `WHOP_META_PIXEL_ID` | Meta Pixel ID for Whop | Vercel |
| `WHOP_META_AD_ACCOUNT_ID` | Meta Ad Account ID for Whop | Vercel |
| `WHOP_META_CONVERSIONS_API_TOKEN` | Meta CAPI token for Whop | Vercel |
| `WHOP_API_KEY` | Whop API key | Vercel |
| `WHOP_AIRTABLE_API_KEY` | Airtable API key for Whop data | Vercel |
| `WHOP_AIRTABLE_BASE_ID` | Airtable base ID for Whop data | Vercel |

## Admin Backend Access
| Variable | Description | Where |
|----------|-------------|-------|
| `RENDER_API_KEY` | Render API key (for admin backend calls) | Local only |

## Defaults
- `ECOMDASH_API_URL` defaults to `https://ecomdash-api.onrender.com`
- `NODE_ENV` = `production` on Vercel, `development` locally
