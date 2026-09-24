---
title: "A year of dividends on record"
description: "Pull the dividend statement from your broker's console and upload it to Margin, handling the stocks the matcher cannot place without guessing at them."
task: "Get your records in"
order: 3
updatedAt: 2026-09-23
readingTime: "5 min read"
connects: ["Broker console", "Margin"]
writes: "Records a financial year of dividends"
---

Dividends are paid into your bank account and never appear in a holdings file, so they sit outside the portfolio record unless something puts them there. A year of dividends missing from Margin understates your return by exactly what that year paid, and the gap grows with how long you have held.

## What the agent does

    POST /web/dividends/upload/csv

The file comes from the broker's console, where it usually sits with the interest statement under a name like Dividends and Interest. Upload it as it comes off the console, without reshaping it.

## The stocks it cannot place

When any row of the statement names a stock Margin cannot match, the upload writes nothing at all. The response comes back with `saved` false and the unmatched stocks listed under `stocksNotFound`, and the year stays exactly as it was. Recording only the matched rows would leave a year that looks complete while it understates your return, which is why Margin holds the whole upload back. Do not have the agent resolve the misses by similarity, since a symbol that looks close is often a different company.

A statement from a few years back is full of symbols as they stood on the ex-date, and many of the misses are companies that have since renamed themselves or merged into another listing. Finding out where each one went is tedious by hand and easy to delegate. Have the agent search the exchange announcements and the news for what the old symbol became, then look the successor up in Margin:

    GET /web/stock/find/{text}

Search by symbol, and by ISIN when the symbol finds nothing. Put each old symbol to the user alongside the successor and the filing that records the change, and let them choose, which is the same choice the Margin web app offers on this screen. A payout is cash, so recording a merged company's dividend against the listing it merged into loses nothing.

Once the user has chosen, upload the same file again without editing it, with `final` set to `true` and `stockSelections` carrying each choice as the `symbol` and `isin` from the `stocksNotFound` entry plus the Margin `stockId` the user picked. Rows whose stock was chosen go to that stock, and anything still unmatched is left out and reported again. Sending `final` is the user's decision to record the year without those rows, so the skill asks before it sends it and never sends it on the first upload. Each upload rewrites the whole year, so the payouts already recorded are not doubled. When the search finds no successor, as with a company that was delisted outright, the skill should say so plainly instead of picking the nearest match.

## Verifying without reading rows back

The per-record reads are closed to API tokens and answer 403, so an agent cannot list the payouts it just wrote. Two summary endpoints are open and are what a skill should check against:

    GET /web/dividends/counts     per year, how many stocks paid and the net amount
    GET /web/dividends/summary    totals, including totalRecords as a payout count

Read `counts` before and after and compare the year's `stockCount` and `netAmount` against the totals. Compare `stockCount` against `totalStocks` and not against a payout count: `counts` counts the stocks a year paid, while `summary`'s `totalRecords` counts payouts written, and the two differ by every stock that paid twice in a year. A skill that compares the wrong pair reports a discrepancy on a clean upload.

## A skill to start from

```markdown
---
name: dividends-to-margin
description: Download the broker's dividend statement for a financial year and
  upload it to Margin (go.marginapp.in). Use when asked to import, sync or record
  dividends for an FY.
allowed-tools: Bash(bash *), Bash(curl *), Bash(jq *), Bash(ls *), Bash(mv *), AskUserQuestion, WebSearch, Read, Write
---

Download the dividend statement as CSV for the financial year and upload it to
Margin.

Read `https://go.marginapp.in/llms.txt` before building the request.

## Input

The financial year. **When no year is given, do the current financial year to
date.** Do not ask which year.

For the year in progress, use today as the end date. A future end date makes the
console's date field revert silently and leaves the previous year's rows on
screen.

## 1. Download

Open the dividend report in the user's own browser. Stop and ask the user to log
in rather than entering credentials. Read the account id off the page and rename
the downloaded file with it.

## 2. Upload

    POST /web/dividends/upload/csv

Upload the file as it came off the console, under the trading account from
`GET /web/tradingAccount` (ask when two accounts sit at the same brokerage).
Get the user's go-ahead first. Never send `final` on this first upload.

When `stocksNotFound` is not empty, `saved` is false and nothing was written.

## 3. Resolve what did not match

For each entry of `stocksNotFound`, search the web for the old symbol's renames
and mergers and find what it trades as now. Check the successor with:

    GET /web/stock/find/{symbol}
    GET /web/stock/find/{isin}    when the symbol finds nothing

**Never pick a match yourself.** Show the user each old symbol with its
successor and the filing behind it, using AskUserQuestion. When no successor
turns up, say so; the listing was probably delisted and there is no stock to pick.

Then upload the same file again, unedited, with `final=true` and
`stockSelections` holding each confirmed `{symbol, isin, stockId}`, copying
`symbol` and `isin` from the `stocksNotFound` entry. `final` records the year
without any rows still unmatched, so ask before sending it. The upload rewrites
the year, so nothing doubles.

## 4. Verify against the counts

    GET /web/dividends/counts
    GET /web/dividends/summary

The row-by-row reads answer 403 to API tokens, so these are the only check. Read
counts before and after. Compare the year's `stockCount` against `totalStocks`,
never against a payout count: counts counts stocks, summary's `totalRecords`
counts payouts, and they differ by every stock that paid more than once.
```
