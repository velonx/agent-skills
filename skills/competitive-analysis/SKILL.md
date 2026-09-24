---
name: competitive-analysis
description: Compare specific competitors on features, pricing, positioning, strengths and weaknesses using their public materials, and turn that into a comparison matrix and positioning gaps. Use when the user names competitors, asks who competes with a product, or wants to know how to differentiate.
license: MIT
metadata:
  title: Competitive Analysis
  version: "1.0.0"
  author: Velonx
  category: research
  tags: [research, competitors, strategy, positioning]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [web-access]
  icon: users
  dependencies: [web-research]
---

# Competitive Analysis

## Overview

Builds an evidence-based picture of a competitive landscape: who the real competitors are, how they compare on what customers care about, and where the gaps are.

## When to Use

- "Who are the competitors of…", "compare X vs Y vs Z", "how do we differentiate from…"
- Pricing decisions, pitch decks, product roadmap discussions.

## Usage

1. **Identify competitors** in three rings: direct (same product, same customer), indirect (different product, same job), and the status quo (spreadsheets, doing nothing). Aim for 3–6 total; confirm the list with the user.
2. **Pick comparison criteria** from the customer's point of view: core features, pricing model and entry price, target customer, integrations, onboarding, support, notable limits.
3. **Gather evidence** from each competitor's site, pricing page, docs, changelog, and third-party reviews. Record the date — pricing changes often.
4. **Build the matrix:** competitors as columns, criteria as rows. Use ✓ / partial / ✗ plus short notes; link the source for every non-obvious cell.
5. **Positioning:** for each competitor write a one-line "for whom / why they win / where they're weak".
6. **Gaps and recommendations:** 3–5 underserved needs or positioning angles, each tied to evidence from step 3.
7. Separate **facts** (from their materials) from **inferences** (your reading of them).

## Examples

**Prompt:** "Compare Notion, Obsidian and Logseq for a developer team's docs."

The agent builds a matrix covering collaboration, offline use, Markdown/Git friendliness, pricing and plugins, then notes that the gap is "Git-native docs with real-time collaboration".

## Limitations

- Only public information; no access to private roadmaps or sales data.
- Review sites can be biased or out of date — they are cited, not trusted blindly.

## Changelog

- **1.0.0** — Initial release.
