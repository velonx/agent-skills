---
name: market-research
description: Size and describe a market - segments, customers, trends, pricing norms and demand signals - from public sources, with every number sourced. Use when the user asks how big a market is, who the customers are, whether there is demand, or wants a market overview for a product idea.
license: MIT
metadata:
  title: Market Research
  version: "1.0.0"
  author: Velonx
  category: research
  tags: [research, market, business, strategy]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [web-access]
  icon: chart
  dependencies: [web-research]
---

# Market Research

## Overview

Produces a sourced market overview: definition, size (top-down and bottom-up), segments, buyer needs, trends, pricing, and demand signals — with assumptions visible so the user can challenge them.

## When to Use

- "How big is the market for…", "who would buy…", "is there demand for…"
- Early product or startup validation, investor memo prep, go-to-market planning.

For a head-to-head look at specific competitors, use `competitive-analysis`.

## Usage

1. **Define the market** precisely: product category, geography, customer type (B2B/B2C), year.
2. **Size it two ways:**
   - *Top-down:* find published market estimates; note publisher, year and method. Estimates often disagree — show the range.
   - *Bottom-up:* `number of target customers × adoption rate × price`. Source each input; label assumptions as assumptions.
3. **Segment** by the dimension that changes buying behaviour (company size, use case, income, region).
4. **Customer needs:** what job they hire the product for, current alternatives, switching costs. Use reviews, forums and surveys as evidence.
5. **Trends:** 3–5 forces changing the market (regulation, technology, cost curves), each with a source.
6. **Pricing norms:** typical price points and models.
7. **Demand signals:** search trends, funding activity, job postings, community size.
8. **Output** as a brief with a TL;DR, the sections above, a sizing table with formulas, and a source list. End with the 3 biggest unknowns.

## Examples

**Prompt:** "How big is the market for AI meeting-notes tools for small businesses in India?"

The agent defines the segment (SMBs with 10–200 employees), finds SMB counts from government statistics, estimates adoption from comparable SaaS categories, applies local pricing, and shows the top-down range from analyst reports alongside the bottom-up estimate.

## Limitations

- Public market-size reports vary wildly in quality; treat them as rough ranges.
- Bottom-up numbers are only as good as their assumptions — they are shown so the user can change them.
- No access to paid databases.

## Changelog

- **1.0.0** — Initial release.
