---
name: code-documentation
description: Write or update docstrings, READMEs and API docs that match what the code actually does, verified by reading the implementation. Use when the user asks to document code, write a README, explain a module, or fix out-of-date docs.
license: MIT
metadata:
  title: Code Documentation
  version: "1.1.0"
  author: Velonx
  category: development
  tags: [documentation, development, readme, docstrings]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [filesystem]
  icon: doc
---

# Code Documentation

## Overview

Documentation that is accurate first and complete second. The agent reads the implementation, traces behaviour, and documents what the code does — including edge cases and errors — in the style already used by the project.

## When to Use

- "Document this function / module / API", "write a README", "our docs are out of date"
- Before open-sourcing a project or handing it over.

## Usage

1. **Detect conventions.** Find existing docstrings and docs; match their format (JSDoc, Google/NumPy docstrings, rustdoc…), tone and heading structure. If none exist, use the language's most common convention.
2. **Read the code path**, not just the signature: inputs, outputs, side effects (I/O, network, mutation), thrown errors, defaults.
3. **Docstrings:** one-line summary; parameters and return value only when not obvious from types; side effects; errors raised; a short example for public APIs. Don't restate the code.
4. **README** in this order: what it is (one sentence) → install → minimal working example → configuration → common tasks → contributing/license. Test that every command and snippet you include actually matches the code (script names, flags, env vars).
5. **Mark uncertainty.** If behaviour is ambiguous, leave a `TODO(docs):` note rather than guessing.
6. Keep diffs limited to docs unless asked to change code.

## Examples

**Prompt:** "Add docstrings to `billing/invoice.py`."

The agent notices the project uses Google-style docstrings, reads each function, documents that `finalize()` raises `InvoiceLockedError` if already sent, and skips trivial private helpers.

## Limitations

- Cannot document runtime behaviour it can't see (external services, env-specific config) — flags those.
- Does not generate API reference sites; it writes the source docs those tools consume.

## Changelog

- **1.1.0** — Verifies README commands against the code; `TODO(docs)` for uncertain behaviour.
- **1.0.0** — Initial release.
