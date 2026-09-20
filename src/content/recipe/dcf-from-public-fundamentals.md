---
title: "A DCF from public fundamentals"
description: "Point an agent at a company's published financials, agree a small set of forward assumptions with it, and save the resulting valuation against the stock in Margin."
task: "Value a stock"
order: 2
updatedAt: 2026-09-17
readingTime: "4 min read"
connects: ["Public fundamentals", "Margin"]
writes: "Saves a forward projection against one stock"
---

The spreadsheet recipe assumes you already have a model. This one is for the first pass on a company you have just started looking at, where building a sheet before you know whether the business is worth your time is the wrong order of work.

The mechanics are the same as the spreadsheet route. Margin computes, the agent carries assumptions across, and the save stores what came back. What changes is where the base year comes from and how the forward assumptions get set.

## The base year is read, the forward years are argued

A company's published financials give you the trailing twelve month figures the `baseYear` field wants: revenue, operating profit, other income, depreciation, interest, tax and EPS. An agent can read those off a fundamentals page and convert them to one consistent unit.

Nothing on that page tells you what the next ten years look like. Historic growth is the obvious anchor and the obvious trap, since it is the reason a stock is priced the way it is and extrapolating it usually reproduces the current price rather than testing it. The useful shape is for the agent to propose a small set of assumptions, say where each one came from, and let you move them before anything is saved.

Because `POST /web/projection/dcf` saves nothing and touches no account data, this can be a conversation. Three scenarios cost three calls and leave no trace.

## Say when a number could not be sourced

An agent reading a web page will sometimes not find depreciation, or will find a figure in millions on a page whose other rows are in crores. The instruction that matters is to stop and say so. A skill that fills a gap with a plausible number produces a valuation that looks complete and is not, and the fabricated input is invisible in the output.

## A skill to start from

```markdown
---
name: dcf-from-fundamentals
description: Build a DCF from a company's published fundamentals and save it as a
  valuation on the matching stock in Margin (go.marginapp.in). Use when asked to
  value a company from public financials rather than from a spreadsheet.
allowed-tools: Bash(bash *), Bash(jq *), Bash(curl *), AskUserQuestion, Read, Write, WebFetch
---

Read a company's fundamentals and save a forward DCF against the matching stock
in Margin. Same endpoints and save mechanics as the spreadsheet flow, different
source for the numbers.

Read `https://go.marginapp.in/llms.txt` before building any payload.

**Margin computes the DCF. This skill never does.** Do not compute revenue, PAT,
EPS, present values or intrinsic value.

## 1. Read the base year

Pull the trailing twelve month revenue, operating profit, other income,
depreciation, interest, tax and EPS. Convert everything to one unit, and check
EPS sits on the same basis as the profit figures.

**Never invent a figure.** If a number cannot be sourced from the page, say which
one and stop. Do not substitute a plausible value, and do not derive one from a
ratio unless the user asks for it.

Watch for mixed units on one page. A row in millions among rows in crores is the
error that survives all the way to a saved valuation.

## 2. Propose the forward assumptions

Offer a small set: revenue growth, operating margin, tax rate, cash conversion,
discount rate and the terminal pair. For each, say where it came from, whether
that is the company's own history, a sector norm, or a plain assumption.

Historic growth is an anchor and not an answer. Extrapolating it tends to
reproduce the current price rather than test it, so put it to the user as one
scenario rather than the scenario.

Terminal growth must be below the terminal discount rate. The two go together;
sending one without the other is a 400.

## 3. Compute, and iterate

    POST /web/projection/dcf

Saves nothing and touches no account data, so run as many scenarios as the user
wants. Show intrinsic values, `terminalValuePercentage`, `price` and `priceAsOf`
each time.

## 4. Save only when asked

    POST /web/stockOfInterest/track/{stockId}
    POST /web/projection/stockOfInterest

A first pass often should not be saved at all. Ask rather than assuming the run
ends in a write.
```
