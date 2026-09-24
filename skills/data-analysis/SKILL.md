---
name: data-analysis
description: Explore, clean and analyse tabular data (CSV, Excel, JSON) with code, then report insights with charts and the exact steps taken. Use when the user shares a dataset or asks what the data shows, wants trends, comparisons, anomalies, or a chart.
license: MIT
compatibility: Needs Python 3.10+ with pandas; matplotlib for charts.
metadata:
  title: Data Analysis
  version: "1.2.0"
  author: Velonx
  category: data
  tags: [data, analytics, python, visualization]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [code-execution, filesystem]
  icon: chart
  featured: true
---

# Data Analysis

## Overview

A disciplined analysis loop: understand the data, clean it transparently, answer the actual question, and show the evidence. Every number in the report can be traced to code.

## When to Use

- "What does this data show?", "why did X drop in March?", "chart revenue by region"
- Any CSV/Excel/JSON the user wants insights from.

For data in a live database, use `sql-analysis`.

## Usage

1. **Clarify the question** and what decision it supports. If the user just says "analyse this", propose 3 questions and pick the most useful.
2. **Profile the data** with pandas: shape, dtypes, `head()`, missing values per column, duplicates, value ranges, date coverage.
3. **Clean transparently.** Log every step (dropped rows, parsed dates, fixed types, outlier handling) with row counts before/after. Never silently drop data.
4. **Analyse** with the simplest method that answers the question: group-bys, rates, period-over-period change, distributions. Use statistics (confidence intervals, tests) only when comparing groups and say what they mean in plain words.
5. **Chart** only where it helps: one message per chart, labelled axes with units, a title that states the finding ("Refunds doubled after the March price change").
6. **Report:**
   - Top 3 findings, each with the number and the chart or table behind it.
   - Caveats (data gaps, small samples, correlation ≠ causation).
   - Cleaning log.
   - The code, so the user can rerun it.

## Examples

**Prompt:** "Here's our sales export. Why did Q2 revenue fall?"

The agent profiles 48k rows, finds 3% duplicate orders, removes them, splits revenue by region and product, and shows that the drop is almost entirely one product line in one region after a stock-out — with a chart and the query behind it.

## Limitations

- Large files (>1 GB) may need sampling; the agent says when it samples.
- Findings are descriptive; causal claims need experiments or domain knowledge.

## Changelog

- **1.2.0** — Cleaning log with before/after row counts.
- **1.1.0** — Chart titles state the finding.
- **1.0.0** — Initial release.
