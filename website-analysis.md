# Website Analysis & Improvement Suggestions

## What the website currently shows

The site is a minimal static page (Mobirise-built) with: hero tagline, 6 feature cards (Valuation, Allocation, Custom Price Anchors, Holdings/Trades, Analyse, Exchange support), a "Privacy Vault" section, a single "Free" pricing tier, and a basic "How it works" tab strip.

---

## Areas of Improvement

### 1. Massively undersells the product's depth

The product has ~20+ major feature areas (DCF modeling, XIRR, capital gains/tax, segmental analysis, Kanban boards, AI-powered fundamentals sync, rich notes, stock lists, TradingView charts) — the website shows only 6. The most compelling differentiators (Reverse DCF, AI-powered financial data extraction, XIRR, capital gains/tax calculations, Kanban for portfolio workflow) are completely absent.

### 2. No screenshots or live demo of the actual app

The hero image is an AI-generated cockpit image, not the actual product. Real product screenshots build far more credibility than stock art. The "Live demo" button exists but presumably leads to a signup form, not an actual demo.

### 3. "How it works" tabs are broken / misleading

The tab IDs (`#tabs1-1j_tab0`) don't match the content `div` IDs (`#tab1`, `#tab2`…), so the tabs likely don't switch content correctly. The content inside each tab is also extremely thin — one sentence per step.

### 4. The hero copy is weak

*"Stop wasting your valuable time in managing your portfolio stocks in excel files"* is a negative framing and grammatically rough. The product's actual differentiation (Reverse DCF, AI fundamentals sync, XIRR, capital gains) would be far more compelling as the lead message.

### 5. India-specific context is buried

The product only supports NSE/BSE (Indian markets). The website has zero mention of India until the small "Current Support" card. Indian retail investors are the target audience — lean into that. Mention INR, ₹, Indian tax rules (STCG/LTCG), Zerodha/Groww/Upstox by name prominently (they're already in the code, just not the website).

### 6. Missing social proof

No testimonials, no user count, no "used by X investors", no logos of supported brokerages.

### 7. Privacy Vault section is confusing

It reads like marketing copy for a third-party product (Databunker). It doesn't explain what data is stored or why users should care. This section needs a concrete, user-facing explanation: "We never store your broker login credentials. Trade data is stored encrypted."

### 8. Mobirise branding leakage

The navbar logo links to `https://mobirise.com` (line 39), image alt tags say "Mobirise Website Builder", and the footer badge exposes the site builder. These should all be fixed.

### 9. No "Start now" destination clarity

The CTAs all point to `#form02-6` but there's no form section in the HTML. Either the form is missing or the anchor is broken.

### 10. No mention of Kanban / workflow features

The Kanban board for portfolio workflow is a genuinely unique feature — no other portfolio tracker has this. It deserves its own section.

### 11. SEO is essentially non-existent

`<meta name="description" content="">` is empty. Page title is just "Home". No structured data, no OG tags for social sharing.

---

## Priority Order for Fixes

| Priority | Fix |
|---|---|
| P0 | Fix broken nav logo link (points to mobirise.com) |
| P0 | Fix broken tabs (ID mismatch) |
| P0 | Fix missing/broken `#form02-6` anchor |
| P1 | Replace AI cockpit image with real product screenshots |
| P1 | Rewrite hero copy to lead with concrete value |
| P1 | Add missing feature sections (Tax/XIRR, Reverse DCF, AI sync, Kanban) |
| P1 | Call out Zerodha/Groww/Upstox prominently |
| P2 | Add SEO meta tags |
| P2 | Rewrite Privacy Vault section for user clarity |
| P2 | Remove all Mobirise attribution |
| P3 | Add social proof / testimonials section |

---

## Full Product Feature Inventory (from codebase)

Features currently NOT represented on the website:

- Reverse DCF valuation with implied growth rate calculations
- Segmental / Sum-of-Parts analysis
- XIRR calculations
- Capital gains & tax calculations (STCG/LTCG, jurisdiction-aware)
- AI-powered financial data extraction (Perplexity API)
- Annual/quarterly fundamentals (P&L, Balance Sheet, Cash Flow, TTM)
- Rich text notes per stock (Lexical editor)
- Kanban boards for portfolio workflow
- Stock watchlists / custom collections
- Stock tagging system
- TradingView chart integration
- Brokerage support: Zerodha, Groww, Upstox (CSV/Excel import)
- Background jobs: daily BSE/NSE master data sync
- Dashboard column customization
- Sell preview calculations
