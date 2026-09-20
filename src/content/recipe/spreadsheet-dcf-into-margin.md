---
title: "A spreadsheet DCF into Margin"
description: "Move a valuation you already keep in a spreadsheet into Margin, letting Margin compute every derived figure so the saved projection matches what the app shows."
task: "Value a stock"
order: 1
updatedAt: 2026-09-17
readingTime: "5 min read"
connects: ["Spreadsheet", "Margin"]
writes: "Saves a forward projection against one stock"
---

Most people who value stocks have a spreadsheet. It holds years of assumptions, a layout they trust, and formulas they have argued with. Moving one of those into Margin by hand is an hour of typing per company, which is why valuations stay in the sheet and the portfolio never sees them.

An agent can read the sheet and make the calls. The interesting part is what it must not do.

## The agent never computes the valuation

Margin computes the DCF:

    POST /web/projection/dcf

This turns assumptions into every derived figure and saves nothing, so an agent can call it freely to check a mapping or compare two scenarios. Revenue per year, PAT, EPS, present values, intrinsic value and the implied return all come back from that one call.

The save endpoint stores rows verbatim. An agent that computes EPS itself and saves its own number produces a projection that disagrees with what the app shows when you open it, and the disagreement is silent. Reading the sheet's formulas and reimplementing them in the skill is the same failure with more steps. The skill's job is to carry assumptions across and let the server derive the rest.

## What the compute call needs

The body has four parts, and the units are where mappings go wrong:

- `baseYear`, the trailing twelve month year zero everything grows from, with `revenue`, `operatingProfit`, `otherIncome`, `depreciation`, `interest`, `tax` and `eps`. Absolute figures in one consistent unit, and the share count is derived as PAT divided by EPS, so EPS has to sit on the same unit basis as the profit figures.
- `years`, one row per projected year with `revenueGrowthRate`, `operatingMargin`, `otherIncomeRatio`, `depreciationRatio`, `interestRatio`, `taxRate`, `cashFlowMultiplier` and `numberOfSharesGrowth`. Rates and ratios are whole percents here, so `15` means fifteen percent, while `cashFlowMultiplier` is a plain multiplier where `0.8` means eighty percent of profit converts to cash.
- `discountRates`, one rate per five year band, as decimals. Ten projected years take two entries.
- `terminalGrowthRate` and `terminalDiscountRate`, decimals, optional, and the two travel together. Sending one without the other is a 400 naming the one you left out. Terminal growth has to be below the terminal discount rate, because a perpetuity growing at or above its discount rate has no finite value, and a pair breaking that rule is rejected rather than valued as though the terminal were worth nothing.

`symbol` is required and the server prices the valuation from its own last synced quote, so there is no price field and the skill should not look a price up.

## Saving it

Saving needs a `stockOfInterestId` rather than a stock id, and one call resolves it:

    POST /web/stockOfInterest/track/{stockId}
    POST /web/projection/stockOfInterest

The track call returns `alreadyTracked`, which is false when the stock was not in any list, holding or trade and has just been added to the account. Worth telling the user, since it means the skill changed more than a valuation.

## What to report back

The compute response carries `terminalValuePercentage` on each intrinsic value. A valuation that is mostly terminal value rests on the growth assumption rather than on the years you forecast, and reporting that share is more useful than reporting intrinsic value alone. `priceAsOf` is worth reading too, because a quote can be several days old for a thinly traded stock and the implied return is only as current as the price it was compared against.

## A skill to start from

```markdown
---
name: spreadsheet-dcf-to-margin
description: Read a DCF from a spreadsheet and save it as a valuation on the
  matching stock in Margin (go.marginapp.in). Use when asked to push, sync or
  recreate a spreadsheet valuation in Margin.
allowed-tools: Bash(bash *), Bash(jq *), Bash(curl *), AskUserQuestion, Read, Write
---

Read a DCF from a spreadsheet and save it as a forward projection in Margin.

Read `https://go.marginapp.in/llms.txt` before building any payload. It is the
authority on endpoints, fields, units and errors. Never build a payload from
memory or from this file.

**Margin computes the DCF. This skill never does.** `POST /web/projection/dcf`
turns the assumptions into every derived figure. Do not compute revenue, PAT,
EPS, present values or intrinsic value, and do not reimplement the sheet's
formulas. The save endpoint stores rows verbatim, so anything computed here
disagrees silently with what the app shows.

## 1. Read the sheet

Pull the base year figures and the per-year assumptions. Convert to one consistent
unit and check EPS sits on the same basis as the profit figures, because the share
count is derived as PAT divided by EPS.

Rates and ratios go in as whole percents. `cashFlowMultiplier` is a plain
multiplier. Discount rates and the terminal pair are decimals. Mixing the two
conventions is the most common failure.

## 2. Compute, and show the user

    POST /web/projection/dcf

Saves nothing, so call it as often as needed. Show the user the intrinsic values,
`terminalValuePercentage`, `price` and `priceAsOf` before asking whether to save.

Report `terminalValuePercentage`. A valuation that is mostly terminal value rests
on the growth assumption rather than on the forecast years.

## 3. Resolve the stock

    POST /web/stockOfInterest/track/{stockId}

Resolve the symbol with `GET /web/stock/find/{text}` first. When `alreadyTracked`
comes back false the stock has just been added to the account, so say so.

## 4. Save, once the user says go ahead

    POST /web/projection/stockOfInterest

Send the rows the compute call returned. Do not adjust them.
```

Reading the live contract on every run matters more for this recipe than for the upload ones, because the payload has more fields and two of them were once spelled differently. A skill carrying a stale field list gets a 400 that names a field the author never wrote.
