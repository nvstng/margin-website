---
name: write-guide
description: Write a product guide page for the Margin website (src/content/guide/) from a GitHub issue or a feature name, with real screenshots captured from the running app. Use this whenever the user asks to add, write, create or draft a guide, a how-to, a walkthrough or documentation for a Margin feature, or points at a "Guide:" issue in nvstng/margin-website, even if they do not say the word guide. Also use it when asked to add screenshots or images to an existing guide.
---

# Write a Margin guide

A guide explains one Margin feature to someone using the app: what is on the screen, what they can change, what each change does to the numbers, and where the feature leads next. It is read by investors, not developers, and it lives at `src/content/guide/<slug>.md`.

The guide must describe the app as it is built, not as the home page sells it. The marketing copy in `src/components/highlight-*.astro` is where most guide issues start, and it is often a step removed from the real mechanics. Read the app source before writing a word.

## Where things are

| What | Where |
|---|---|
| Guide content | `src/content/guide/*.md` |
| Frontmatter schema | `src/content/config.ts` (`guide` collection) |
| Guide page template, TOC, lightbox | `src/pages/guides/[slug].astro`, `src/components/guide-toc.astro`, `src/components/image-lightbox.astro` |
| Image and caption styling | `src/components/prose-styles.astro` |
| Home page feature blurbs | `src/components/highlight-*.astro` |
| App source (React) | `../margin-js/margin-web/src/` |
| Running app | `http://localhost:3101` (needs Google sign-in) |
| Running site | `http://localhost:3201` after `npm run build` or `npm run dev` |
| Screenshots | `src/assets/images/<feature>-<what>.webp` |

## Workflow

### 1. Read the brief

- `gh issue view <n> --repo nvstng/margin-website` if an issue number was given. The issue body lists what the reader needs explained and the `feature:` value to use in frontmatter.
- Read one existing guide end to end for voice and shape. `src/content/guide/qualitative-screening.md` is a good one.
- Read `src/content/config.ts` for the frontmatter fields.

### 2. Read the app source

This is the step that separates a useful guide from a paraphrase of the home page. Find the view for the feature in `../margin-js/margin-web/src/view/<feature>/` and read the main component fully, plus the domain and service files it imports. Look for:

- which fields are editable and which are computed (`editable: true`, `readOnly`, `valueSetter`)
- validation and the messages it shows (these tell you the rules the reader will hit)
- context menus, keyboard shortcuts, dialogs, toggles, collapsed panels
- what is saved on Save and what is deliberately not (grep for the save handler and the repository call)
- in-app instruction panels and helper text, which are the developer's own summary

Write down anything that contradicts the highlight component. Those contradictions are the most valuable sentences in the guide.

### 3. Draft the guide

Frontmatter, matching the schema exactly:

```yaml
---
title: "Using the DCF valuation grid"
description: "One or two sentences. Shown on the guides index card and as the meta description."
feature: "Valuation"
order: 1
updatedAt: 2026-09-20
readingTime: "10 min read"
---
```

`feature` groups guides on the index page, so reuse an existing value when the feature fits one (`Dashboard`, `Screening`, `Valuation`, ...). `order` sorts within the group. `readingTime` is roughly 200 words a minute.

Structure the body in screen order, the order a user meets things, not the order the code defines them. A guide for a data entry screen usually runs:

1. One short paragraph saying what the screen is and what recalculates when
2. Opening the feature (where it lives in the nav, desktop or mobile)
3. Each panel or region in turn, top to bottom
4. Any right-click, keyboard or bulk-edit mechanics as their own section, with a summary list
5. What Save persists and what it does not
6. Where to go next, linking two or three related guides with `/guides/<slug>`

For each region, split the bullets into **what you set** and **what Margin computes**. Readers skim for the first list.

The UI is documentation too. Where a control is labelled and a user can follow it unaided, do not restate it: skip lists of dropdown options, card labels, table columns, filter names, button positions and confirmation dialogs. Write down only what the screen does not print: the rule behind a validation message, which rows a figure is summed from, what a setting must stay consistent with, what an upload or save does and does not change, and what a gap or a wrong input does to the numbers downstream. Before adding a sentence, ask whether the reader would learn it by looking at the screen; if so, cut it. A guide for a screen with many rules is usually 1500 to 2500 words.

Every `##` heading becomes an entry in the sticky left-hand index, so keep headings short and specific. Aim for 8 to 14 sections on a full screen guide.

When the feature is an upload and the reader's broker may not be on the list, do not explain unsupported brokers in the guide. Link to `/guides/unsupported-broker-formats`, which covers the reason (the file format has not been shown to us yet), what to send and how, in one place.

Do not name a brokerage in a feature guide as the one that is supported ("for Zerodha it goes in as Console exports it"). The list grows, and every such sentence goes stale when it does. Write "a supported brokerage" and let `/guides/unsupported-broker-formats` hold the list, which is the one place to update. Naming a brokerage is fine where the sentence is about that brokerage's own quirk, such as a date format only it uses.

Writing rules for guides:

- Plain language. Say "the value lands in every year below" rather than "the value is propagated to subsequent periods".
- Name the control exactly as the UI labels it, in bold: **Apply to years below**, **Show NPV & Intrinsic Value Columns**.
- Say why a control exists when the code makes the reason clear. "Growth % has no fill down, by design" is worth more than listing which columns have it.
- Do not invent behaviour. If you are unsure whether something is saved, grep the save handler.
- No em-dashes, no "Not X but Y", no short epigram closers. Audit for these before finishing.

### 4. Capture screenshots

Screenshots need the app signed in, and sign-in is Google OAuth that only the user can complete. Ask them to sign in at `http://localhost:3101` in the Chrome window the extension opens, or in their own Chrome (the session is shared across the profile). Do not attempt to sign in yourself.

Once in, drive the app to each state and capture with the `computer` tool's `zoom` action on the exact region, `save_to_disk: true`. Zoom gives a crisp crop at device pixel ratio; a scaled full screenshot does not. Capture one image per idea, and only for ideas the prose keeps. The same rule as the prose applies: an image of a labelled dialog or a menu of options is the UI repeating itself, so favour states that show a rule in action:

- the main grid or table, showing which cells are editable
- a validation failing, with the message that explains the rule
- a result or warning produced by a gap, a duplicate or a wrong input
- a filter or setting combined in a way the reader would not find alone
- assumption panels with a non-default state showing (a what-if price applied, a warning visible)

Four to six images is usual for a full screen guide. Delete any captured image the final prose does not reference.

Enter values to reach the state you want, then **navigate away or reload without pressing Save**. The user's data must be as they left it. Say so in the final summary.

Convert and place:

```bash
cwebp -q 82 <saved>.png -o src/assets/images/<feature>-<what>.webp
```

Name files by feature and content, lowercase with hyphens: `dcf-right-click-menu.webp`, `dividends-ex-date-picker.webp`.

### 5. Place images in the guide

Image, then a caption paragraph that is a single `*italic*` line. The prose styles rely on exactly that pairing to centre and colour the caption, and the lightbox reads the caption from it.

```markdown
![Alt text that describes what is in the picture](../../assets/images/dcf-right-click-menu.webp)

*Right-clicking Year 3's margin. The menu also shows the Ctrl/Cmd+Enter shortcut.*
```

Put the image directly under the sentence that first needs it, not in a gallery at the end. Alt text describes the picture; the caption says what to notice in it.

The page template already gives every guide a sticky section index on the left and click-to-enlarge on every image. Nothing needs adding for those.

### 6. Link from the home page

If a `src/components/highlight-<feature>.astro` exists for the feature, add a "Read the guide" link beside its call to action so the marketing blurb points at the explanation. Copy the markup from `highlight-dcf.astro`.

### 7. Build and check

```bash
npm run build
```

Then open `http://localhost:3201/guides/<slug>` and check:

- every image renders and the caption sits centred under it
- the index on the left lists the sections and follows scroll
- clicking an image opens it enlarged
- the guide appears under the right feature heading on `/guides`

Audit the prose mechanically before calling it done, since rereading misses these: grep for em-dashes, for "not ... but" and "rather than" constructions, for sentences opening with "That", and for paragraphs whose last sentence is under eight words and reads as a verdict.

### 8. Report

Do not commit. Summarise what was written, the images captured, the home page link, and state plainly that nothing in the app was saved.

## Example: what a good section looks like

```markdown
## Filling a value down the years

Typing the same margin into ten rows is the part of a DCF that goes wrong quietly. The grid gives you three ways to avoid it, on the Margin, Ratio, Rate, Multiplier and Shares increase columns.

**1. Ctrl/Cmd+Enter while editing**

- Type the value into a cell and press **Ctrl+Enter** or **Cmd+Enter** instead of Enter.
- The value lands in that year and in every year below it.

**2. Right-click, Apply to years below**

- Right-click a cell that already holds a value.
- Choose **Apply to years below**. Same result as Ctrl/Cmd+Enter, without retyping the number.

![The right-click menu on an operating margin cell](../../assets/images/dcf-right-click-menu.webp)

*Right-clicking Year 3's margin. The menu also shows the Ctrl/Cmd+Enter shortcut for the same action.*
```

Notice: the section opens with why the feature exists, each method is a numbered bold label with two bullets, the control names match the UI, and the image sits where the reader first needs it.
