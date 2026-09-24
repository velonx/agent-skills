---
name: code-review
description: Review a diff, branch or pull request for correctness bugs, security issues and maintainability problems, and report prioritised findings with file and line references. Use when the user asks to review code, check a PR, look for bugs before merging, or asks "what could break".
license: MIT
metadata:
  title: Code Review
  version: "1.1.0"
  author: Velonx
  category: development
  tags: [code-review, development, git, quality]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [filesystem, git]
  icon: code
  featured: true
---

# Code Review

## Overview

A focused review procedure that finds problems that matter — bugs, security holes, data loss, broken contracts — before style nits, and explains each finding so the author can act on it.

## When to Use

- "Review this PR / diff / branch", "anything wrong with this?", "is this safe to merge?"
- Before a release, after a large refactor, or when onboarding to unfamiliar code.

## Usage

1. **Get the change.** For a branch: `git diff <base>...HEAD`. For a PR: fetch the diff. Note which files changed and why (PR description, commit messages).
2. **Understand intent** before judging: what is this change supposed to do? If unclear, say so — that is itself a finding.
3. **Read the surrounding code**, not just the diff: callers of changed functions, tests, config. Most real bugs are in how new code meets old code.
4. **Check, in priority order:**
   1. Correctness — logic errors, off-by-one, null/undefined, wrong conditions, race conditions, error paths.
   2. Security — injection, missing auth checks, secrets in code, unsafe deserialisation, path traversal.
   3. Data safety — migrations, destructive operations, backwards compatibility.
   4. Contracts — changed function signatures, API responses, config keys; are all callers updated?
   5. Tests — do tests cover the new behaviour and the failure cases?
   6. Maintainability — duplication, needless complexity, naming. Keep these brief.
5. **Report** each finding as:
   `[severity] path/to/file.ext:line — what is wrong → concrete scenario that breaks → suggested fix`
   Severity: **blocker**, **major**, **minor**, **nit**.
6. Lead with a one-line verdict: *ready to merge*, *merge after fixes*, or *needs rework*.
7. Don't pad: if there are no real issues, say so.

## Examples

**Prompt:** "Review my branch before I open the PR."

See [examples/review-output.md](examples/review-output.md) for a complete review in the expected format.

## Requirements

- Read access to the repository and `git`.

## Limitations

- Static reading only unless tests are run separately; runtime behaviour may differ.
- Large diffs (>1,500 lines) should be reviewed in parts.

## Changelog

- **1.1.0** — Findings now include a concrete failure scenario; added verdict line.
- **1.0.0** — Initial release.
