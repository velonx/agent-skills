# Creating a skill

This walks through writing a skill from scratch. The rules are in [SPECIFICATION.md](../SPECIFICATION.md); this guide is about writing a *good* one.

## 1. Pick a task worth a skill

Good skills capture a procedure that is **recurring**, **multi-step**, and **easy to do badly** without guidance: reviewing code, researching with citations, extracting invoice fields. "Be concise" is a preference, not a skill.

## 2. Create the folder

```bash
mkdir -p skills/meeting-notes
```

## 3. Write the frontmatter

```yaml
---
name: meeting-notes
description: Turn a meeting transcript into decisions, action items with owners and dates, and open questions. Use when the user shares a transcript or recording notes, or asks to summarise a meeting.
license: MIT
metadata:
  title: Meeting Notes
  version: "1.0.0"
  author: Your Name
  category: productivity
  tags: [meetings, notes, summaries]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: []
---
```

The `description` is the most important line in the file. Agents decide whether to load the skill from it alone, so say **what it does** and **when to use it**, with the words users actually type.

## 4. Write the body

```markdown
# Meeting Notes

## Overview
One or two sentences.

## When to Use
- Trigger phrases and situations.
- When NOT to use it, and which skill to use instead.

## Usage
1. Numbered steps written as instructions to the agent.
2. Concrete commands or queries where relevant.
3. The exact output format.

## Examples
A realistic prompt and what the agent does.

## Limitations
What it can't do.

## Changelog
- **1.0.0** — Initial release.
```

Tips:

- **Be specific.** "Group action items by owner; format as `- [ ] Owner — task (due date)`" beats "list the action items".
- **Put safety first.** If the skill can send, delete, pay or publish, the first line of `## Usage` says to confirm with the user.
- **Show the output.** An example output in `examples/` teaches the format better than a description of it. Link it: `[examples/sample.md](examples/sample.md)`.
- **Keep it lean.** Under ~500 lines. Move long reference material into `reference/` and link it; the agent reads it only when needed.

## 5. Validate

```bash
npm install
npm run validate
```

Fix every `ERROR`. Messages name the file and the problem.

## 6. Test with a real agent

Copy the folder into your agent (see [getting-started.md](getting-started.md)), run your example prompts, and check:

- Does the agent load the skill when it should — and not when it shouldn't?
- Does it follow the steps and produce the format you specified?

Tweak the description and steps until it does. Then [open a PR](../CONTRIBUTING.md).
