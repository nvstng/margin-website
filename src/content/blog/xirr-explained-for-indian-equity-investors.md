---
title: "XIRR Explained: The Only Return Metric That Matters for Indian Investors"
description: "CAGR looks clean. Absolute returns feel intuitive. But if you're adding money to your portfolio over time, neither tells you what you actually earned. XIRR does."
publishedAt: 2026-04-03
author: "Margin Team"
category: "Portfolio Math"
readingTime: "5 min read"
---

When investors talk about returns, they usually reach for one of two numbers: absolute return ("I'm up 40%") or CAGR ("I've compounded at 18% a year"). Both are real metrics. Both are useful in specific contexts. And both can be deeply misleading for a portfolio that grows through regular additions.

The right metric for measuring what a self-directed equity investor actually earns is **XIRR** — Extended Internal Rate of Return. Understanding why makes you a more precise thinker about your own performance.

## What CAGR assumes (and why that's a problem)

CAGR — Compounded Annual Growth Rate — is built for a single lump sum. You invest ₹10 lakhs. Five years later it's ₹20 lakhs. CAGR = (20/10)^(1/5) - 1 = 14.87%.

This is perfectly accurate for that specific scenario. The problem arises the moment you add more capital. Which, for almost every real investor, is every month or every quarter.

Imagine you invested ₹5 lakhs in January 2021, added ₹3 lakhs in July 2022 when the market dipped, and added another ₹2 lakhs in March 2024. By April 2026, your portfolio is worth ₹18 lakhs. You invested ₹10 lakhs total.

What did you earn?

A simple calculation says 80% absolute, which sounds great. But was that over five years? Three years? The ₹2 lakhs you added in March 2024 has only been invested for two years. The original ₹5 lakhs has been working for over five years. Lumping them together and computing one CAGR produces a number that doesn't reflect the reality of any individual rupee's journey.

## How XIRR solves this

XIRR treats every cash flow as a separate event, weighted by when it occurred. Each investment is a negative cash flow (money leaving your pocket). The current portfolio value is a positive cash flow (money you'd receive if you liquidated today). XIRR finds the single annual rate that makes the net present value of all those dated cash flows equal to zero.

In practical terms: XIRR tells you what annual return would explain your entire investment history — including the timing of every rupee invested.

For the example above, XIRR might return something like 16.4% — accounting for the fact that your largest early investment had the longest time to compound, and your most recent addition has barely had time to do anything. That number is real in a way that simple CAGR cannot be.

## XIRR per stock vs XIRR for the portfolio

Here's where it gets genuinely useful for stock pickers.

You can — and should — compute XIRR at three levels:

**Per stock**: How well has each position actually performed, accounting for when you built it? You might find that a stock you consider a winner has an XIRR of 8% because you added heavily at the peak. You might find that a stock you consider mediocre has an XIRR of 24% because you bought most of it at the right time.

**Per list or sector**: If you group stocks by sector or conviction tier, XIRR by group tells you where your allocation decisions are actually paying off. Fundamental analysis might say a sector is attractive; XIRR tells you whether your execution in that sector has been good.

**Portfolio-wide**: Your overall XIRR is the honest answer to "how is my portfolio performing?" It's also the number to compare against an index. If the Nifty 50 delivered a 14% XIRR over your investment period (weighted by when you would have invested in an index fund), and your portfolio delivered 11%, that's a meaningful signal.

## The XIRR and Indian tax calculation connection

There's a second reason XIRR matters beyond measuring performance: it interacts directly with tax planning.

When you sell a stock, Indian tax rules (STCG at 20% for holdings under 12 months, LTCG at 12.5% for holdings over 12 months) apply per lot — each individual purchase separately. A position you built over three years has multiple lots with different tax treatments.

A pre-tax XIRR of 22% on a position you're considering selling could be a post-tax XIRR of 14% or 19%, depending entirely on which lots you're selling and their holding periods. Computing XIRR on a post-tax basis, accounting for actual capital gains liability, gives you the number that reflects what you actually pocket.

This is why portfolio analysis that treats XIRR and capital gains as separate concerns is incomplete. They're the same calculation viewed from different angles.

## How to compute XIRR correctly

In Excel, the `=XIRR(values, dates)` function handles this. You need a column of cash flows (negative for each investment, positive for current value) and a column of corresponding dates. Every buy, every sell, every dividend reinvestment — all of it needs to be there.

The failure mode is an incomplete cash flow table. Miss a large purchase, and your XIRR is meaningfully wrong. Include an entry with an incorrect date, and the time-weighting is off. This is why manual spreadsheet tracking tends to produce unreliable XIRR numbers: the underlying data is rarely complete.

Importing trades directly from broker CSVs — Zerodha, Groww, Upstox, AngelOne — eliminates this. When the trade history is complete and correct, XIRR can be trusted.

## The number that matters

At the end of every fiscal year, one question deserves a real answer: what did my portfolio earn?

Not "my portfolio is up ₹X lakhs." Not "I made Y% since I started." The real question is: given every rupee I invested, exactly when I invested it, what annual return have I earned?

That's XIRR. It's the only metric that takes the question seriously.
