---
title: "A Practical DCF Valuation Guide for Indian Equity Investors"
description: "DCF valuation sounds complex but the core logic is simple: a stock is worth the present value of its future cash flows. Here's how to apply it to Indian equities."
publishedAt: 2026-03-27
author: "Margin Team"
category: "Valuation"
readingTime: "8 min read"
---

Price targets from brokerages are everywhere. "Target: ₹1,200. Buy." No derivation, no assumptions, no explanation of what has to be true for that number to make sense. For an investor trying to build conviction, this is almost useless information.

DCF — Discounted Cash Flow — valuation is the antidote. It forces you to make your assumptions explicit, which means you can be wrong in a way you can learn from. And unlike reading a broker note, the act of building a DCF is itself an act of research: you have to understand the business to fill in the inputs.

This guide walks through how DCF works, how to apply it to Indian listed companies, and how to use it alongside its inverse — Reverse DCF — to sharpen your thinking.

## The core idea: money now vs money later

A rupee received today is worth more than a rupee received a year from now. If you had ₹100 today, you could invest it and have ₹112 next year (at a 12% return). So ₹112 a year from now is "worth" ₹100 today, when discounted at 12%.

DCF extends this logic to a business. A company generates cash flows every year into the future. Each of those future cash flows, when discounted back to today at an appropriate rate, has a present value. The sum of all those present values is the intrinsic value of the business.

**Intrinsic Value = Sum of (Future Cash Flows / (1 + Discount Rate)^Year)**

In practice, you model cash flows for a specific period — usually 5 to 10 years — and then add a **terminal value** representing all cash flows beyond that horizon. The terminal value typically represents the majority of a company's intrinsic value, which is both important and humbling: most of a stock's value lies in what happens after your projection window.

## Inputs for an Indian equity DCF

### 1. Free Cash Flow

Free Cash Flow (FCF) is what the business actually generates after maintaining and growing its asset base. The typical formula:

**FCF = Operating Profit (EBIT) × (1 – Tax Rate) + Depreciation – Capital Expenditure – Change in Working Capital**

For Indian companies, you'll find EBIT, depreciation, and capex in the annual report and quarterly results. Working capital changes can be computed from the balance sheet. SEBI-mandated disclosures make this data accessible for all listed companies, though reading it requires some practice.

For businesses with stable, predictable cash flows — consumer staples, utilities, large private sector banks — FCF is relatively straightforward to project. For businesses with lumpy capex or high working capital intensity — capital goods, real estate, infrastructure — DCF becomes harder and the margin of safety requirement should be higher.

### 2. Revenue Growth Rate

Your revenue growth assumption is the most influential input in the model. A 5-percentage-point difference in the assumed growth rate can change the intrinsic value by 30–50% or more.

For Indian companies, think about:
- Historical revenue growth over 5 and 10 years (normalise for any unusual periods)
- Industry tailwinds: India's consumption growth, formalisation trends, digital penetration
- Competitive position: is this company gaining or losing share?
- Management's own guidance and capital allocation track record

Be conservative. Indian equity markets have a tendency to price in optimistic scenarios. The edge in fundamental investing is usually in being more realistic than the consensus, not more optimistic.

### 3. Operating Margin

What fraction of revenue actually reaches operating profit? Margins tell you about competitive advantages — pricing power, cost discipline, scale benefits. A company with stable or expanding margins in a growing market is compounding value. A company with compressing margins is often destroying it even as revenue grows.

For an Indian mid-cap in a competitive sector, assume some mean reversion in margins if they're at cyclical peaks. For an Indian monopoly or near-monopoly (think exchanges, some speciality chemicals), margins can be assumed to be more persistent.

### 4. Discount Rate

The discount rate represents the return you require from an equity investment, reflecting its risk. A common starting point for Indian equities:

- **Risk-free rate**: ~7% (approximate yield on 10-year Indian government bonds)
- **Equity risk premium**: 4–6% for large stable businesses; 6–9% for smaller or riskier ones
- **Total discount rate**: 11–16% depending on the business quality and size

Using a discount rate below 11% for Indian equities is rarely justified. The risk-free rate alone is 7%; equity must offer a meaningful premium for the additional uncertainty.

### 5. Terminal Growth Rate

What rate does the business grow at perpetuity, beyond your projection period? The terminal growth rate should never exceed the long-run nominal GDP growth rate of the economy — because no business can grow faster than the economy forever without eventually becoming the economy.

For India, long-run nominal GDP growth is approximately 10–12%. A reasonable terminal growth rate for a quality Indian business is 5–8%. Using anything above 8% requires very strong justification.

## A worked example: consumer brand with stable margins

Suppose you're looking at a mid-cap FMCG company with:
- Current revenue: ₹5,000 crore
- Current EBIT margin: 18%
- Tax rate: 25%
- Capex roughly equal to depreciation (maintenance-heavy business)
- Working capital stable

**Your assumptions:**
- Revenue growth: 14% per year for 5 years, then 9% for years 6–10
- Operating margin: 18% stable (no expansion assumed)
- Discount rate: 12%
- Terminal growth rate: 6%

Running these numbers produces a 10-year FCF projection and a terminal value. Discounting everything back at 12% gives you an intrinsic value — say, ₹8,200 crore. Divide by shares outstanding to get intrinsic value per share.

If the current market cap is ₹6,500 crore, there's a potential margin of safety. If the market cap is ₹11,000 crore, the market is pricing in assumptions more optimistic than yours. You can either update your assumptions or decline to invest.

The key is that you now know *why* you're buying or not buying, and *what would have to change* to alter your conclusion.

## Reverse DCF: the more useful half

Standard DCF asks: "Given my assumptions, what is this stock worth?"

Reverse DCF asks: "Given the current market price, what does the market believe about this company's growth?"

Reverse DCF is often more immediately useful because it bypasses the difficulty of forecasting and instead exposes the question you actually need to answer: *Do I agree with what the market is implying?*

If a stock trades at ₹2,340 and your Reverse DCF shows the market is pricing in 18.4% annual revenue growth for the next decade at a 12% discount rate — and your research suggests 12–14% growth is more realistic — you have a specific, falsifiable disagreement with the market. That's a much sharper investment thesis than "I think this stock will go up."

Conversely, if the market is only implying 6% growth for a company you believe will grow at 15%, the implied growth rate is probably wrong and the stock is potentially undervalued.

## What DCF cannot do

DCF is not a precision instrument. A 10-year projection of any business involves substantial uncertainty. The output — an intrinsic value per share — should be understood as a range, not a point estimate.

The purpose of DCF isn't to produce the exact right number. It's to:

1. Force you to make your assumptions explicit and defensible
2. Identify what matters most (which inputs the valuation is most sensitive to)
3. Understand the market's implicit thesis via Reverse DCF
4. Apply a margin of safety — buy when the market price is meaningfully below your intrinsic value estimate

Indian equity markets, particularly in small and mid-caps, frequently misprice stocks because investors aren't doing this analysis. The edge isn't in knowing the future better than everyone else — it's in doing the analysis more carefully and systematically than the average market participant.

## Getting started

Start with one stock you know well. A company whose products you use, whose annual reports you've read, whose industry you understand. Build a simple 5-year DCF with conservative assumptions. Run the Reverse DCF at the current price. Compare what you believe with what the market believes.

The goal isn't to get it right the first time. The goal is to build a practice of thinking about intrinsic value that gets better with every company you analyse.

Over time, this practice compounds — not just your portfolio, but your understanding of how businesses create value and how markets sometimes get that wrong.
