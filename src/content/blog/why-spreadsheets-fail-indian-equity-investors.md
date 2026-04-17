---
title: "Why Your Portfolio Spreadsheet Is Lying to You"
description: "Most Indian equity investors track their portfolio in Excel. Here's why that approach systematically misleads you — and what serious investors use instead."
publishedAt: 2026-04-10
author: "Margin Team"
category: "Investing Mindset"
readingTime: "7 min read"
---

Every serious Indian equity investor has one. A sprawling Excel sheet with colour-coded tabs, hand-typed trade entries, and a set of SUMIF formulas that took an entire Sunday afternoon to get right. It works — until it doesn't.

The spreadsheet is the default tool for self-directed investors. And for good reason: it's flexible, free, and immediately available. But over time, the very flexibility that makes it appealing becomes the source of a slow, invisible problem. Your spreadsheet doesn't lie outright. It lies by omission, by drift, and by the questions it simply cannot answer.

## The hidden cost of manual entry

The most obvious failure mode of a spreadsheet is data integrity. Every time you trade — buy, sell, partial exit, corporate action — you need to log it manually. Miss one entry, and every downstream calculation is wrong. Transpose two digits in a quantity field, and your XIRR is off by several percentage points.

Over the course of an investing journey spanning years and dozens of stocks, the probability of zero errors approaches zero. Most investors don't realise the error is there. The sheet still produces numbers. The numbers just aren't right.

Indian brokers now support CSV exports from Zerodha, Groww, Upstox, AngelOne, and others. Importing from these files directly — rather than retyping — eliminates this entire class of error.

## Returns: what your CAGR isn't telling you

The most common metric in a homegrown spreadsheet is absolute return or a simple CAGR calculation: (current value / invested amount) ^ (1 / years) - 1. It feels right. It's easy to compute. But it's misleading for any portfolio where capital is added or withdrawn over time — which is every real portfolio.

Consider two investors who both end up with ₹20 lakhs from ₹10 lakhs invested over five years. Investor A put ₹10 lakhs in at the start. Investor B added money in tranches over three years. Their simple CAGR looks identical. Their actual returns are very different.

**XIRR** — the internal rate of return that accounts for the timing of every cash flow — is the only metric that tells the truth. It treats each investment as a separate event weighted by when it happened. It's the difference between knowing you earned 14% and knowing you actually earned 9% (or 19%).

The problem is that computing XIRR correctly in Excel requires a clean, complete cash flow table: every buy, every sell, every dividend, mapped to the exact date. One missing row and the formula silently returns a wrong answer. Most investors' spreadsheets don't have this. So most investors don't actually know what their portfolio earns.

## Valuation: the question your spreadsheet cannot ask

Here's what a spreadsheet fundamentally cannot do: tell you whether the stocks you own are cheap or expensive right now.

A spreadsheet tracks what happened. It tells you what you paid, what something is worth today, and what the difference is. It does not — cannot — help you answer the question every fundamental investor needs to answer before adding to a position: *at the current price, what growth rate is the market implying, and do I agree with that?*

This is the province of **DCF valuation** — discounted cash flow analysis. And while you can build a DCF model in Excel, almost nobody does it for their entire portfolio on an ongoing basis. It takes an hour per stock, minimum. Keeping it updated as prices and estimates change is a full-time job.

For a portfolio of 15–20 stocks — a common size for a serious Indian equity investor — that's 15–20 separate models, each requiring inputs you have to source, maintain, and update. In practice, investors either skip the valuation step or rely on analyst price targets they didn't derive themselves. Both approaches have obvious problems.

## The tax problem that compounds silently

Indian capital gains tax has a meaningful structure: Short-Term Capital Gains (STCG) at 20% for equity held under 12 months, Long-Term Capital Gains (LTCG) at 12.5% for equity held over 12 months, with a ₹1.25 lakh annual exemption on LTCG.

If you sell a position, the tax liability isn't just on the gain — it depends on which units you're selling, when you bought each lot, and whether the gain is short-term or long-term. FIFO (first in, first out) is the default for most brokers, but the tax implications of lot selection are significant for large positions built over time.

A spreadsheet that doesn't model this by lot will misstate your real post-tax return. It will also fail to help you make better sell decisions: sometimes it's worth waiting a few weeks to convert a STCG into an LTCG. Sometimes the math says otherwise. Without per-lot capital gains visibility, you're guessing.

## What serious investors actually need

The honest summary is this: a spreadsheet tracks numbers. It doesn't help you think. It tells you what is, not whether what is makes sense.

A purpose-built portfolio tool should do three things a spreadsheet cannot:

1. **Import trades automatically** from broker CSVs — eliminating manual entry errors
2. **Compute XIRR per stock, per list, and across the whole portfolio** — so you always know what you're actually earning
3. **Embed DCF valuation** — so every position has a current intrinsic value estimate and an implied growth rate at the current price

The goal isn't to replace investor judgment. It's to give investor judgment the right inputs — clean data, real returns, and a valuation framework — instead of a spreadsheet full of numbers that feel right but may not be.

If you've been running your portfolio off Excel and feel like something is off, it probably is. Not because you made mistakes — but because the tool itself cannot surface what you need to see.
