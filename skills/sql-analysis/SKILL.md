---
name: sql-analysis
description: Explore a database schema, write safe read-only SQL to answer business questions, and explain the results and the query. Use when the user asks a question about data that lives in a SQL database, wants a query written or debugged, or needs a metric defined in SQL.
license: MIT
metadata:
  title: SQL Analysis
  version: "1.0.0"
  author: Velonx
  category: data
  tags: [sql, data, database, analytics]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [database]
  icon: db
---

# SQL Analysis

## Overview

Answers questions from relational databases (PostgreSQL, MySQL, SQLite, BigQuery, Snowflake…) by learning the schema first and running only read-only queries, then explaining both the answer and the SQL.

## When to Use

- "How many users signed up last week?", "top customers by revenue", "why is this query slow?"
- Writing or reviewing SQL, defining a metric precisely.

## Usage

**Read-only by default.** Only run `SELECT` / `WITH` / `EXPLAIN`. Never run `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE` or `GRANT` unless the user explicitly asks and confirms the exact statement.

1. **Learn the schema:** list tables and columns (`information_schema`), primary/foreign keys, and row counts of the tables you'll touch. Look at a few sample rows.
2. **Define the metric in words** before writing SQL ("active user = at least one order in the last 30 days, excluding test accounts"). Confirm ambiguous definitions.
3. **Write the query** with CTEs named for what they hold, explicit join conditions, and explicit time zones for date logic.
4. **Protect the database:** add `LIMIT` while exploring; check `EXPLAIN` before running anything that scans large tables.
5. **Sanity-check results:** totals vs known numbers, no join fan-out (compare row counts before/after joins), NULL handling.
6. **Report:** the answer, a small result table, the final SQL, and assumptions.

## Examples

**Prompt:** "What's our 30-day retention for users who signed up in August?"

The agent finds `users(created_at)` and `events(user_id, occurred_at)`, confirms that "retained" means any event on days 25–35, writes a cohort query with CTEs, and reports the rate with the SQL.

## Limitations

- Needs a database connection or tool supplied by the user's environment.
- SQL dialects differ; the agent states which dialect it wrote for.

## Changelog

- **1.0.0** — Initial release.
