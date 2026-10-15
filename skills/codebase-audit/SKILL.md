---
name: codebase-audit
description: Audit a whole codebase across five dimensions — code quality, security, efficiency, accessibility and testing — and return a scored report with prioritised, file-referenced findings and a fix plan. Use when the user asks to audit, health-check or assess a repository or project, asks "how good is this codebase", wants a pre-launch, handover or due-diligence review, or wants to know what to fix first. For reviewing a single diff or pull request, use a code-review skill instead.
license: MIT
metadata:
  title: Codebase Audit
  version: "1.0.0"
  author: Rishi Pandey
  category: development
  tags: [audit, code-quality, security, performance, accessibility, testing]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [filesystem, shell]
  icon: code
  dependencies: [code-review]
---

# Codebase Audit

## Overview

A repeatable, evidence-based audit of an entire repository. The agent maps the project, runs the tools the project already has, reads the code that matters most, and scores five dimensions — **code quality, security, efficiency, accessibility and testing** — then delivers a report that says what is wrong, where, why it matters, and what to fix first.

## When to Use

- "Audit my codebase / repo / project", "do a health check", "how good is this code?", "what should we fix first?"
- Before a launch, a handover, an acquisition or open-sourcing; when inheriting an unfamiliar project.
- When the user names any of the five dimensions for a whole project ("security audit of this app", "is our test coverage OK?").

Do **not** use for a single diff or PR (use `code-review`), for fixing issues (audit first, fix only when asked), or for penetration testing of live systems.

## Usage

**Hard rules:**

- **Read-only by default.** Do not modify, reformat or commit code during the audit. Fix only when the user asks, after the report.
- **No new installs or external uploads without asking.** Run linters, type-checkers, tests and scanners the project already declares. Ask before installing tools or running anything that sends code or dependency data to a third-party service.
- **Never run destructive or production-touching commands** (migrations, deploys, seed scripts against real databases, scripts that send email or payments).
- **Never print secrets.** If you find one, report its file and line with the value redacted (`sk_live_****`), and recommend rotation.
- **Evidence or it didn't happen.** Every finding cites `path:line` (or a command and its output). Mark anything unverified as *suspected*.

### 1. Scope and map

1. Confirm scope: whole repo or specific packages; which dimensions (default: all five); depth (*quick* ≈ top issues only, *standard*, *deep*).
2. Map the project: languages, frameworks, entry points, package manifests, build/test/lint config, CI workflows, deployment files. Use `git ls-files`, manifest files and the README.
3. Get size and hotspots: lines of code by language, largest files, most-changed files (`git log --format= --name-only | sort | uniq -c | sort -rn | head -20`). Hotspots — large *and* frequently changed — get the deepest reading.
4. Note what does **not** apply (e.g. accessibility for a backend-only library) and say so in the report rather than scoring it.

### 2. Run existing tooling

Run what the project already has and record command, exit status and a summary of output:

- Lint / format check, type-check, build.
- Tests, with coverage if configured.
- Dependency audit using the ecosystem's own tool (`npm audit`, `pip-audit`, `cargo audit`, `govulncheck`, `bundle audit`…) — ask first if it is not installed or needs network access the user hasn't approved.

If something fails to run, that is a finding (testing or quality), not a reason to stop.

### 3. Audit each dimension

Work through the checklists in [reference/checklists.md](reference/checklists.md), reading code rather than guessing from file names. Focus order: entry points and request handlers → auth and data access → hotspots → shared utilities → UI.

1. **Code quality** — structure, duplication, complexity, naming, error handling, dead code, typing, consistency, documentation, dependency health.
2. **Security** — injection, authn/authz, secrets, input validation, unsafe deserialisation, SSRF, path traversal, crypto, dependency CVEs, security headers, logging of sensitive data. Use OWASP Top 10 as the frame.
3. **Efficiency** — N+1 queries, missing indexes or pagination, work in loops, blocking I/O on hot paths, memory growth, bundle size, caching, unnecessary re-renders.
4. **Accessibility** (if there is a UI) — semantic HTML, labels, keyboard access, focus, contrast, alt text, ARIA misuse, reduced motion. Target WCAG 2.2 AA.
5. **Testing** — does the suite run and pass, what is covered, are critical paths and failure cases tested, test quality (assertions, flakiness, mocking), CI enforcement.

### 4. Score

Score each applicable dimension 0–10 using the rubric in [reference/scoring.md](reference/scoring.md). The overall score is the average of applicable dimensions, but **cap the overall at 4 if any critical security finding is open**. Always show the evidence behind each score.

### 5. Report

Use the format in [examples/audit-report.md](examples/audit-report.md):

1. **Summary** — one-line verdict, overall score, scorecard table, top 5 actions by impact ÷ effort.
2. **Findings by dimension**, each as:
   `[severity] path/to/file.ext:line — problem → impact (concrete scenario) → fix (effort: S/M/L)`
   Severity: **critical**, **high**, **medium**, **low**. Group repeated issues into one finding with a count and representative locations.
3. **Strengths** — what is done well (keep it short and specific).
4. **Fix plan** — *Now* (criticals, this week), *Next* (highs, this sprint), *Later* (the rest).
5. **Method and limits** — commands run, what was not checked and why.

Save the report as `AUDIT.md` (or the name the user wants) only if the user asks for a file; otherwise reply inline. After the report, offer to fix the *Now* items.

## Examples

**Prompt:** "Audit this repo before we launch next week."

The agent confirms all five dimensions at standard depth, maps a Next.js + Postgres app, runs `npm run lint`, `npm test -- --coverage` and `npm audit`, reads the API routes and auth middleware first, and finds a SQL query built with string concatenation, an admin route without a role check, an N+1 query on the dashboard and unlabelled form inputs. It returns a 5.1/10 report capped at 4 for the open critical, with a *Now / Next / Later* plan.

**Prompt:** "Just check security and testing on the `payments` package."

The agent narrows scope, skips the other three dimensions (marked *not assessed*), and reports only those two scores.

See [examples/audit-report.md](examples/audit-report.md) for a full report.

## Limitations

- Static reading plus the project's own tools; it does not replace a penetration test, load test or manual screen-reader testing.
- Large repositories are sampled: hotspots and critical paths get full reads, the rest is spot-checked — the report says which.
- Scores are a structured judgement, comparable over time for the same project, not across unrelated projects.
- Cannot see production configuration, infrastructure or runtime data unless it is in the repository.

## Changelog

- **1.0.0** — Initial release: five-dimension audit, scoring rubric, severity-ranked findings, fix plan.
