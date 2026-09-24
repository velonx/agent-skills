---
name: github-integration
description: Work with GitHub through the gh CLI - read and triage issues, summarise pull requests, check CI status, and draft issues or PR descriptions. Use when the user mentions GitHub issues, PRs, CI checks, releases, or asks for a repository activity summary.
license: MIT
compatibility: Requires the GitHub CLI (gh) installed and authenticated with gh auth login.
metadata:
  title: GitHub Integration
  version: "1.0.0"
  author: Velonx
  category: devops
  tags: [github, devops, issues, pull-requests]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [shell, github-cli]
  icon: github
---

# GitHub Integration

## Overview

Uses the official `gh` CLI for common GitHub tasks so the agent works with the user's existing authentication and permissions — no tokens in prompts or files.

## When to Use

- "What's open on the repo?", "summarise PR #42", "why is CI failing?", "draft an issue for this bug"
- Weekly repo activity summaries and triage.

## Usage

**Always read before you write.** Anything that changes GitHub state (comment, label, close, merge, create) must be shown to the user and confirmed first.

1. **Check access:** `gh auth status`. If not logged in, ask the user to run `gh auth login` themselves — never handle their token.
2. **Read** with JSON output so results are parseable:
   - Issues: `gh issue list --state open --limit 50 --json number,title,labels,updatedAt`
   - PRs: `gh pr list --json number,title,author,isDraft,reviewDecision`
   - One PR: `gh pr view 42 --json title,body,files,commits,reviews` and `gh pr diff 42`
   - CI: `gh pr checks 42`, then `gh run view <run-id> --log-failed`
3. **Summarise**: group issues by label/theme; for PRs give purpose, size, review state and blockers; for CI quote the failing step and the first real error line.
4. **Draft** issues/PR bodies as Markdown: context, steps to reproduce or change summary, expected vs actual, checklist.
5. **Write only after confirmation**, e.g. `gh issue create --title "…" --body-file draft.md`.

## Examples

**Prompt:** "Why is CI red on my PR?"
The agent runs `gh pr checks`, finds the failing job, pulls `--log-failed`, and reports: "`test (node 20)` fails in `orders.test.ts:41` — expected 403, got 200", with the likely cause.

## Requirements

- `gh` installed and authenticated by the user.

## Limitations

- Limited to what the user's `gh` account can see and do.
- Large logs are truncated to the failing step.

## Changelog

- **1.0.0** — Initial release.
