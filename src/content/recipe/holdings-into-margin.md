---
title: "Holdings from your broker into Margin"
description: "Read live holdings from your broker and post them to Margin without downloading a CSV, into the trading account that holds your earlier import."
task: "Get your records in"
order: 1
updatedAt: 2026-09-17
readingTime: "4 min read"
connects: ["Broker", "Margin"]
writes: "One holdings import, recorded in the trading account you send"
---

Holdings move every time you buy or sell, so the copy Margin holds goes stale between imports. The manual route is to open the broker's console, export the holdings file and upload it. An agent can skip the file entirely when your broker exposes holdings over an API or an MCP server, reading the current position list and posting it straight to Margin.

## What the agent does

    POST /web/stockOfInterest/upload/json

The body carries the positions and a `tradingAccountId`, and everything else in this recipe follows from how that field behaves.

## What the trading account decides

An import replaces what is on record **in the trading account you send**, and leaves every other trading account alone. Send it to an account your earlier imports did not use and the same portfolio is recorded a second time instead of replacing the first, with nothing in the response to tell you it happened. The `changes` count in the response covers only the account the import landed in, so it looks correct either way.

So the upload is not the first call to make:

    GET /web/tradingAccount

Each account it returns carries its brokerage, the name you gave it in the web app and `holdingCount`, how many holdings are recorded in it now, which shows where your earlier imports sit. When exactly one account matches the broker the holdings came from, the agent sends its id. When two do, as with a personal account and a family account at the same broker, it asks you which one, naming each. When none does, it asks before adding one with `POST /web/tradingAccount`, since every such call opens a new account.

Older skills send a `brokerageName` instead, and Margin still accepts it, but a name alone lands on the oldest trading account at that brokerage. For anyone with a second account at the same broker that is the wrong account, so a skill should send the id.

Holdings recorded twice cannot be cleared with a token. You clear them in the web app, where Delete All on the dashboard can remove one brokerage's holdings and leave the rest, and importing again does not undo the duplicate.

## Checking it landed

Read `GET /web/holdings` before the import as well as after, and compare the two. Match entries on `isin` and not on `stockSymbol`, because symbols get reused and renamed across listings while the ISIN stays put. A stock you do not hold has no entry at all, so an entry disappearing is a real change and not a quantity falling to zero. Each entry's `units` is your whole position across every account, and its `brokerages` list splits that by trading account, so compare what you sent against the entry carrying the account you imported into.

## Where an agent should stop and ask

Getting your go-ahead matters more before the upload than before the read, since the read is free and repeatable while the write replaces a portfolio. A sensible skill shows you the diff it is about to cause and names the trading account it will replace, then waits for you to approve it.

## A skill to start from

This is illustrative and not something to run unchanged. Your broker, your account names and your own preferences all belong in it. Save it as `.claude/skills/holdings-to-margin/SKILL.md` in the project you keep your investing work in.

```markdown
---
name: holdings-to-margin
description: Read current holdings from the broker and upload them to Margin
  (go.marginapp.in) with no CSV download. Use when asked to sync, refresh or
  import holdings.
allowed-tools: Bash(bash *), Bash(jq *), Bash(curl *), AskUserQuestion, Read, Write
---

Read live holdings from the broker and post them to Margin as a brokerage import.

Margin publishes its own API contract at `https://go.marginapp.in/llms.txt`. Fetch
it before building any request. It is the authority on endpoints, payload shapes
and limits, and it changes. Never work from memory and never from this file.

    curl -sS https://go.marginapp.in/llms.txt -o /tmp/margin-llms.txt

## 1. Check the token

The token lives at `~/.margin/token` and starts with `mgn_`. Send it as
`Authorization: Bearer <token>`. A 401 means it is revoked and the user mints a
new one at https://go.marginapp.in/settings on the API Tokens tab.

## 2. Decide the trading account before anything else

    GET /web/tradingAccount

An import replaces only what is on record in the trading account you send. An
account the earlier imports did not use records a second copy of the portfolio,
silently. One account at the broker: use its id. Two: ask the user, naming each.
None: ask before creating one with `POST /web/tradingAccount`. Send
`tradingAccountId`, never `brokerageName`, which lands on the oldest account at
that brokerage. Never default to "Other".

## 3. Read the holdings and the current record

Read the broker's holdings, and read `GET /web/holdings` in the same step so the
diff at step 4 has a before.

## 4. Show the diff and wait

Print what would change: stocks appearing, stocks disappearing, and units moving.
Name the trading account the upload will replace. Do not upload until the user says
go ahead.

## 5. Upload

    POST /web/stockOfInterest/upload/json

## 6. Verify

Read `GET /web/holdings` again and compare against step 3, matching on `isin` and
not on `stockSymbol`, and reading the `brokerages` entry for the account you sent. Report what actually changed instead of repeating the
response's own counts.
```

The instruction to fetch `llms.txt` on every run is there because Margin's contract has changed under skills written against it before, and a skill carrying its own copy of the endpoints breaks in ways that are hard to spot.
