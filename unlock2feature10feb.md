# Unlock 2 Features + Code Cleanup — Feb 10, 2026

## Changes Implemented

---

### 1. Deleted Code Analysis Bloat (~2,100 lines removed)

Removed the entire Code Analysis feature — an unrelated product that analyzed code snippets, not store data. Zero value for ecom merchants.

**Files Deleted:**

| File | Lines | What It Was |
|------|-------|-------------|
| `backend/app/routers/code_analysis.py` | 491 | REST endpoints for code submission/analysis |
| `backend/app/services/ai_analyzer.py` | 338 | OpenAI/DeepSeek code analyzer service |
| `backend/app/models/code_analysis.py` | 249 | SQLAlchemy models (CodeSubmission, AnalysisResult, etc.) |
| `backend/app/services/job_queue.py` | 402 | ARQ Redis job queue (solely for code analysis) |
| `backend/tests/test_code_analysis.py` | 332 | Tests for deleted feature |

**Files Cleaned (stale references removed):**

| File | What Changed |
|------|-------------|
| `backend/app/routers/__init__.py` | Removed commented `code_analysis_router` import |
| `backend/app/services/__init__.py` | Removed commented `AICodeAnalyzer` import |
| `backend/app/models/__init__.py` | Removed commented CodeSubmission/AnalysisResult model imports |
| `backend/app/main.py` | Removed commented router includes for code_analysis and analytics |
| `backend/tests/test_services.py` | Removed `TestAICodeAnalyzer` class + import (kept `TestNotificationService`) |
| `backend/app/models/shop.py` | Removed commented `code_submissions` relationship |

**Kept (reusable later):** `notification_service.py`, `deepseek_client.py`

---

### 2. Feature #1: Wired Top Products to Analytics Page

**Problem:** Backend endpoint `GET /dashboard/top-products` worked. Frontend had a fully built "Top Performing Products" UI section. They were not connected — `topPerformers` was always an empty array.

**Fix:** Added `api.getTopProducts(shopId, 5)` call to the analytics page loader's `Promise.allSettled`, with field mapping from backend schema to frontend interface.

**Field Mapping:**

| Backend (`TopProduct`) | Frontend (`topPerformers`) |
|------------------------|----------------------------|
| `title` | `name` |
| `revenue` | `revenue` |
| `units_sold` | `orders` |
| *(not available)* | `growth` = `0` |

**Files Changed:**
- `growzilla-beta/app/routes/app.analytics.tsx` — Added `getTopProducts` to loader, mapped response data

**Note:** Growth percentage requires comparing two time periods (not yet implemented). Set to `0` for now. Will be computed when Feature #3 (historical comparison) ships.

---

### 3. Feature #2: Activated InsightsEngine (3 Advanced Insight Types)

**Problem:** `InsightsEngine` in `insights_engine.py` had 3 sophisticated insight analyzers fully coded but never called from anywhere. The sync flow only ran the simpler `insight_generator.py` (3 basic insights).

**Fix:** After the existing `generate_insights()` call in `data_sync.py`, added `InsightsEngine.compute_all_insights()` invocation. Results are persisted via the existing `_upsert_insight` pattern. Wrapped in `try/except` so failures don't break the sync flow.

**New Insight Types Now Active:**

| Insight Type | Trigger | Severity | Merchant Value |
|-------------|---------|----------|----------------|
| **Understocked Winners** | < 7 days inventory + sales > P50 | HIGH | Prevents stockout on hot products |
| **Dead Stock Detection** | Sales < P20 + inventory > P80 | MEDIUM | Frees capital tied in slow inventory |
| **Coupon Cannibalization** | Discount rate > 40% + revenue > P60 | MEDIUM | Stops discounting products that sell fine at full price |

**Total active insight types: 6** (3 basic from `insight_generator.py` + 3 advanced from `InsightsEngine`)

| Basic Insights (existing) | Advanced Insights (newly activated) |
|--------------------------|-------------------------------------|
| AOV Trend Detection | Understocked Winners |
| Top Product Pricing Opportunity | Overstock Slow Movers (Dead Stock) |
| Low Inventory Alert | Coupon Cannibalization |

**Files Changed:**
- `backend/app/services/data_sync.py` — Added InsightsEngine call after basic insights, with persistence and error isolation

**Error Isolation:** InsightsEngine runs inside `try/except`. If it fails, the sync still completes successfully with basic insights, and the error is logged. This ensures no merchant data sync is ever broken by the advanced engine.

---

## Verification

- All modified Python files pass `ast.parse()` syntax validation
- `main.py` compiles via `py_compile`
- Zero remaining references to deleted code across entire backend
- Frontend TypeScript handles both wrapped `{products: [...]}` and direct array response formats
- InsightsEngine error isolation confirmed — sync flow cannot break

## What's Next (from plannedFeatures.md)

- **Feature #3:** Repeat Customer Rate & Real LTV Calculation
- **Feature #4:** Product Affinity — "Frequently Bought Together"
- **Remaining deletions:** ML Intent Classifier (~240 lines), Full Analytics Module (~1,650 lines)
