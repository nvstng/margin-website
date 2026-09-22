---
title: "Broker alerts priced from your own DCF"
description: "Turn each saved valuation into the price at which its implied return would reach your threshold, and write that price into your broker as a notification-only alert."
task: "Act on what Margin computes"
order: 1
updatedAt: 2026-09-17
readingTime: "5 min read"
connects: ["Margin", "Broker"]
writes: "Creates, updates and removes alerts in your broker account"
---

A watchlist tells you a price moved, but not whether the move made the stock worth buying, because the price you would buy at depends on what you think the business is worth, and that number sits in your valuation and not in your broker.

Every stock you track in Margin has a saved DCF, and that DCF implies a return at any given price, so it also implies the price at which the return would reach whatever threshold you use. This recipe has an agent compute that price for each stock and write it into your broker as an alert.

## Prices you set yourself, and prices to solve for

Stocks on a watch list carry a valuation, and the alert price has to be derived from it. Stocks you hold often carry a price you set yourself, and Margin returns those directly:

    GET /web/holdings

Each entry carries `userPrices`, the BUY IF ABOVE and BUY IF BELOW prices you entered. There is nothing to compute for these. A BUY IF BELOW becomes a `<=` alert and a BUY IF ABOVE becomes a `>=` alert, and the recipe's whole job is to keep the broker in step with what you typed in Margin.

## Solving for the price on the rest

    GET /web/valuation/{stockOfInterestId}
    GET /web/projection/stockOfInterest?stockOfInterestId={id}&valuationId={id}
    POST /web/projection/dcf

Read the saved projection, feed its assumptions back into the compute endpoint, and read the response. Each projected year carries the intrinsic value with and without terminal value, and `expectedReturnFromProfit` and `expectedReturnFromCashFlow`, the annualised return implied if the stock is held to that year.

The intrinsic value at a given year is a function of the assumptions and not of today's quote, which is what makes the inversion straightforward: the return implied at a price falls as the price rises, so the price delivering a target annualised return over a chosen holding period follows from the intrinsic value at that year. Recomputing instead of reading a stored figure matters because the saved projection was priced against the quote of the day it was saved, and `priceAsOf` in the fresh response tells you how current the comparison is.

## Reconcile, do not recreate

A skill that deletes every alert and writes the set again on each run will destroy alerts you created by hand, and the broker's alert count drifts if a delete half-fails.

Build it as a reconciliation instead. Read the alerts that exist, build the plan from Margin, and diff the two into four buckets: create, update, keep and delete. Show the diff, then apply only what the user approves. A stable naming convention for skill-created alerts is what lets the next run tell its own alerts from yours.

## Notification only

Broker alert APIs can attach an order to an alert, and a skill that computes a target price should not also place the trade. The recipe exists to put the price in front of you at the moment it matters, and the decision after that is yours to make.

## A skill to start from

```markdown
---
name: dcf-price-alerts
description: Set up, update and remove notification-only price alerts in the
  broker, priced from Margin valuations. Use when asked to create, refresh,
  review or clear price alerts.
allowed-tools: Bash(bash *), Bash(jq *), Bash(curl *), AskUserQuestion, Read, Write
---

Price alerts that notify and nothing else, priced from Margin and never
hand-computed here.

Read `https://go.marginapp.in/llms.txt` before building any request.

**Every alert is notification only.** Never attach an order to an alert, whatever
the broker's API allows.

## 1. Read the two halves

Holdings, for the prices the user set themselves:

    GET /web/holdings

Each entry carries `userPrices`. BUY IF BELOW becomes `<=`, BUY IF ABOVE becomes
`>=`. Nothing to compute.

The watch list, for the ones that need solving:

    GET /web/stocksList
    GET /web/stocksList/{id}

## 2. Recompute each saved valuation

    GET /web/valuation/{stockOfInterestId}
    GET /web/projection/stockOfInterest?stockOfInterestId={id}&valuationId={id}
    POST /web/projection/dcf

Feed the saved assumptions back through the compute endpoint rather than reading
a stored intrinsic value. The saved projection was priced against the quote of
the day it was saved. Check `priceAsOf` on the fresh response and say when a
quote is stale.

**Margin computes the valuation.** Derive the target price from the intrinsic
values the response returns. Do not reimplement the DCF.

## 3. Build the plan

One row per alert: symbol, operator, price, and where the price came from. Two
sources only, a user price or a solved target. A row whose price cannot be traced
to one of them is a bug; drop it and say so.

## 4. Reconcile against what exists

Read the broker's current alerts and diff against the plan into create, update,
keep and delete.

**Never clear all alerts and rewrite them.** Alerts the user made by hand are not
yours to delete. Match on the naming convention this skill uses and leave
everything else alone.

## 5. Show the diff and wait

Print the four buckets with counts. Apply only after the user says go ahead, and
treat deletes as the part to confirm explicitly.
```
