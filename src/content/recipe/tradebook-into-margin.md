---
title: "A financial year of trades into Margin"
description: "Drive the browser to pull a financial year's tradebook from your broker's console and upload it to Margin, which is what XIRR and capital gains are computed from."
task: "Get your records in"
order: 2
updatedAt: 2026-09-23
readingTime: "5 min read"
connects: ["Broker console", "Margin"]
writes: "Adds trades for the years you upload"
---

A holdings file says what you own now, while the tradebook says what you paid for it and when, which is what a return figure needs. Margin computes XIRR and realised gains from the tradebook, so a year missing from the record shifts both.

## Why this one drives a browser

Broker trading APIs are built for placing orders, so their trade endpoints usually return only the current day, and the rows often carry no ISIN. A tradebook with history lives in the broker's reporting console behind a login, as a download. An agent with browser control can open that page, set the financial year, download the file and hand it to Margin. Everything else in this recipe works the same way as the holdings upload.

## What the agent does

    POST /web/tradeBook/upload/csv     Zerodha, AngelOne, Other
    POST /web/tradeBook/upload/excel   Groww, Upstox

Both are multipart. `files` takes up to ten files of ten megabytes each, so several years and several accounts can go in one request. `brokerageName` is exactly one of `Zerodha`, `AngelOne`, `Groww`, `Upstox` or `Other`.

The response is a progress stream of concatenated JSON objects and not a single document, and the last one carries a `data` field with `insertedTradesCount` per financial year, `insertedStocks`, and `stocksNotFound` for rows skipped because the stock is unknown. A skill should read the final object and summarise those three, because an upload that reports success while skipping forty rows is the case you most need to catch.

## An upload adds, it does not replace

A tradebook upload adds trades. It does not clear the year first, which is what makes re-uploading a wider date range safe in some cases and duplicating in others. For the generic `Other` format the server derives a trade id from the row when `trade_id` is blank, so the same rows uploaded twice do not duplicate. For broker formats the file carries real trade ids and the same protection applies. Duplicates come from uploading a hand-edited file with the ids stripped out.

## Symbols that have changed since the trade

A tradebook reaches back years, and each row carries the symbol the stock traded under on the day of the trade. Companies rename themselves, change series or get absorbed into another listing, and the broker's older rows keep the old symbol, often with no ISIN beside it. Margin already follows an ISIN the company has since changed, so these rows land in `stocksNotFound` mostly when the file has no ISIN to follow or the listing no longer exists under any name.

Tracing each of those by hand means reading one company's corporate history after another. An agent can do the research for you: search the exchange announcements and the news for what the old symbol became, find the current symbol or ISIN, and confirm Margin knows it with `GET /web/stock/find/{text}`. Have it show you each old symbol next to the stock it now believes it is, with the announcement and date that support the link, and rewrite the rows only after you agree. Upload a file of just the corrected rows, so the rows already saved are not sent again.

A rename carries over cleanly, because the same shares simply trade under a new symbol. A merger does not: shares of the absorbed company were swapped for the acquirer's at a ratio, so the quantity and price on the old rows are wrong for the new listing. The skill should report a merged listing to you with the ratio it found and leave those rows alone.

## The date field to watch

Console date pickers for the year in progress tend to reject an end date in the future by silently reverting to their previous value, leaving the previous year's rows on screen with no error. A skill that sets `2026-04-01` to `2027-03-31` and reads whatever loads will file last year's trades under this year. Use today as the end date for the current financial year, and say in the summary that the file is year to date.

## A skill to start from

Illustrative, and it assumes your agent can drive your logged-in browser. Never let a skill type your broker credentials; have it stop and ask you to log in.

```markdown
---
name: tradebook-to-margin
description: Download a financial year's equity tradebook from the broker's
  console and upload it to Margin (go.marginapp.in). Use when asked to sync,
  refresh or import trades.
allowed-tools: Bash(bash *), Bash(curl *), Bash(jq *), Bash(ls *), Bash(mv *), AskUserQuestion, WebSearch, Read, Write
---

Download the tradebook as one file per financial year, then upload the files to
Margin in one request.

Read `https://go.marginapp.in/llms.txt` before building the request. It is the
authority on the payload and it has changed before.

## Input

The financial year. `2026-27`, `FY27` and `2026` all mean 1 April 2026 to
31 March 2027. **When no year is given, do the current financial year.** Do not
ask which year.

## 1. Get to the report

Open the broker's tradebook report in a tab of the user's own browser. If it
lands on a login screen, stop and ask the user to log in. Never enter broker
credentials.

Read the account id off the page and hold it for the rest of the run. Every
downloaded file gets renamed with it. If no account id is on the page the session
is not logged in, so stop rather than downloading a file you cannot attribute.

## 2. Set the range

`YYYY-YY` converts to `YYYY-04-01` through `(YYYY+1)-03-31`.

**For the year in progress, use today as the end date.** An end date in the future
makes the field revert to its previous value and the page then shows the previous
year's rows with no error at all. Tell the user the file is year to date.

## 3. Download and check the file

Confirm the row count and the date range inside the file before uploading. A file
whose earliest row predates the range you asked for is the reverted-date failure.

## 4. Upload

    POST /web/tradeBook/upload/csv    brokerageName=<broker>, files=@<csv>...

Get the user's go-ahead first. Send every year's file in one request, up to the
ten file limit.

## 5. Report what the stream said

The response is concatenated JSON objects, not one document. Read the final
object's `data` and report `insertedTradesCount` per year, and every entry of
`stocksNotFound`. Always surface skipped rows, and do not report the upload as
clean when the list is non-empty.

## 6. Trace symbols that changed

For each entry of `stocksNotFound`, search the web for the old symbol's
corporate actions and find what it trades as now. Check the candidate with:

    GET /web/stock/find/{symbol}
    GET /web/stock/find/{isin}    when the symbol finds nothing

Put each old symbol, its successor and the announcement that links them to the
user with AskUserQuestion. For a rename they confirm, rewrite the symbol (and
ISIN, when the file has the column) on those rows only and upload a file of just
those rows. **Never rewrite rows for a merger.** Report the swap ratio you found
and leave the rows for the user. When nothing links the old symbol to a current
listing, say so instead of guessing.
```
