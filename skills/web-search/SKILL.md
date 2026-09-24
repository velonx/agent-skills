---
name: web-search
description: Answer a single factual question quickly with one or two web lookups and a source link. Use for quick facts, current values, definitions, dates, or finding an official page - escalate to web-research when the answer is disputed or needs synthesis.
license: MIT
metadata:
  title: Web Search
  version: "1.0.0"
  author: Velonx
  category: research
  tags: [search, web, lookup, facts]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [web-access]
  icon: search
---

# Web Search

## Overview

The fast path: one well-formed query, one or two trustworthy results, one short answer with a link. Optimised for speed and precision, not depth.

## When to Use

- "What is…", "when did…", "who is the current…", "link me to…"
- Current values that change: versions, prices, office holders, schedules.
- Finding the official page, docs or download for something.

## Usage

1. Write the most specific query you can (names, versions, year). Add `site:` for official sources when you know the domain.
2. Pick the most authoritative result — official source first, then a reputable secondary source.
3. Open it and confirm the fact is actually on the page and current.
4. Answer in one or two sentences, then the source: `Source: <title> — <url> (checked <date>)`.
5. If two good sources disagree, or no source is clearly authoritative, say so and suggest the `web-research` skill.

## Examples

**Prompt:** "What's the latest stable Node.js LTS?"
**Agent:** searches `site:nodejs.org releases`, opens the releases page, answers with the version and the page link and date checked.

**Prompt:** "Link me to the Postgres docs for window functions."
**Agent:** returns the official docs URL for the current major version.

## Limitations

- Deliberately shallow — not for contested or multi-part questions.
- "Current" facts can go stale; always include the date checked.

## Changelog

- **1.0.0** — Initial release.
