---
title: "When Margin cannot read your broker's file"
description: "Which brokers' files Margin reads today for holdings, trades, dividends and the funds statement, why a broker is missing from the list, and how to send its format so it can be added."
feature: "Uploads"
order: 1
updatedAt: 2026-09-21
readingTime: "4 min read"
---

Every upload in Margin starts by asking which brokerage the file came from, because each broker writes its own column headers, date format and wording for the same facts. Margin reads a file by matching it against a layout it has been shown. When you pick a broker for which no layout exists, the dialog says **We cannot read a [broker] … statement yet**. This page explains what sits behind that message and what to do about it, and the feature guides link here whenever they reach it.

## What Margin reads today

| Upload | Read as downloaded | Through the Other layout |
|---|---|---|
| Holdings | Zerodha, Groww, Upstox, AngelOne | Yes, CSV |
| Trades | Zerodha, Groww, Upstox, AngelOne | Yes, CSV |
| Dividends | Zerodha | No |
| Funds statement | Zerodha | Yes, CSV |

"Read as downloaded" means the file goes in exactly as the broker's console or app exported it. The Other layout is a fixed set of column headers that Margin publishes in the upload dialog, with a **Download template** button, for you to save a file into.

## Why a broker is missing

The reason is always the same: Margin does not know the file format for that broker yet. Nothing about the broker is unsupported in principle. A layout is added once someone shows us a real export from that broker, so the list above grows one statement at a time.

Formats also drift. A broker can rename a column or change a date format between one year's export and the next, and the first person to download the new shape sees an upload refused, which is sent in through the same route as a new broker.

## What to send

Margin needs the shape of the file, and nothing that identifies you.

- The header row, exactly as the file has it.
- One or two data rows, with amounts, names and dates changed if you prefer. What matters is the position of each field and how the dates and numbers are written.
- Which upload it is for: holdings, trades, dividends or the funds statement.
- For an Excel export, the sheet name and the row the headers sit on, since these files often carry a title block above the table.

The trading accounts, client codes, bank references and payment descriptions that fill a real statement are not needed and are better left out.

## How to send it

**1. Feedback from inside the app**

- Open the feedback form from the speech-bubble icon in the top bar of any page. The dividend upload dialog also has a **Send the format** button that opens the same form with the request already written.
- Pick **I want something** as the category.
- Paste the header row and a sample row into the message. The form takes text only, so paste the rows into it.

**2. Email**

Send the file, or the rows above, to [support@marginapp.in](mailto:support@marginapp.in). Use this route when you would rather share the whole export, since the feedback form has no attachment.

## What happens next

The format is mapped on Margin's side and the broker is added to the layouts the upload dialog knows. Nothing changes in your account until then, and nothing you sent is uploaded to your ledger. Once the broker is on the list, you upload the file as downloaded, the same as any supported brokerage.

## Meanwhile, the Other layout

You do not have to wait for holdings, trades or the funds statement. Add a trading account with a brokerage of **Other**, open the upload dialog for it, and the **Expected file format** panel lists the columns. Save your broker's export as a CSV with those headers and it goes in like any other file. The one thing to keep in mind is that the Other account is a separate ledger from the broker's own name, so once the broker is added you can either carry on with the Other account or move to a new one.

Dividends have no Other layout, so a dividend statement from a broker outside the supported list waits for its format to be added.

## Where to go next

- [The funds statement, net invested and charges](/guides/funds-statement-ledger) walks through the funds upload, including the Other layout for it.
- [Tradebook into Margin](/recipes/tradebook-into-margin) and [Dividends into Margin](/recipes/dividends-into-margin) cover the same uploads through the API, for agents.
