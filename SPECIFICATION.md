# Skill Specification

Version 1 · machine-readable form: [registry/schema.json](registry/schema.json)

A skill is a folder of instructions (and optional resources) an AI agent loads when a task needs it. This document defines what a valid Velonx skill is. `npm run validate` enforces everything marked **must**.

## 1. Folder layout

```text
skills/<name>/
├── SKILL.md        required — frontmatter + instructions
├── README.md       optional — notes for humans browsing GitHub
├── examples/       optional — sample inputs/outputs
├── scripts/        optional — helper code the agent may run
└── reference/      optional — longer material loaded on demand
```

- `<name>` **must** be lowercase kebab-case (`a-z`, `0-9`, single hyphens), max 64 characters.
- `<name>` **must** equal the `name` in the frontmatter, and be unique.
- Relative links in Markdown **must** resolve to files inside the skill folder. Skills are installed on their own, so links to the rest of the repo would break.
- Text files **must** be under 1 MB.

## 2. Frontmatter

`SKILL.md` **must** start with YAML frontmatter between `---` lines.

```yaml
---
name: web-research
description: Research a question across several reliable web sources and return a sourced answer. Use when the user asks to look into a topic, verify a claim, or needs citations.
license: MIT
compatibility: Optional free-text environment notes.
metadata:
  title: Web Research
  version: "1.0.0"
  author: Velonx
  category: research
  tags: [research, web, search]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [web-access]
---
```

### Top level (Agent Skills standard)

Only these keys are allowed at the top level, so skills load in Claude and other Agent Skills–compatible agents unchanged.

| Key | Required | Rules |
|---|---|---|
| `name` | yes | kebab-case, ≤ 64 chars, equals folder name |
| `description` | yes | 40–1024 chars, no `<` or `>`. Say **what it does and when to use it** — agents decide whether to load the skill from this text alone. |
| `license` | yes | One of: `MIT`, `Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `ISC`, `MPL-2.0`, `CC-BY-4.0`, `CC0-1.0`, `Unlicense` |
| `compatibility` | no | ≤ 500 chars of environment notes |
| `allowed-tools` | no | Agent-specific tool allowlist, passed through untouched |
| `metadata` | yes | Velonx registry fields, below |

### `metadata` (Velonx registry)

| Key | Required | Rules |
|---|---|---|
| `title` | yes | Display name, 2–60 chars, unique (case-insensitive) |
| `version` | yes | Semver `MAJOR.MINOR.PATCH`, **quoted** (`"1.0.0"`) |
| `author` | yes | Person, team or org shown on the website |
| `category` | yes | An id from [registry/categories.json](registry/categories.json): `development`, `research`, `data`, `writing`, `devops`, `productivity`, `ai`, `documents`, `other` |
| `tags` | yes | 1–8 unique kebab-case tags, ≤ 30 chars each |
| `platforms` | yes | ≥ 1 of `generic`, `claude`, `openai`, `gemini`, `cursor` |
| `requirements` | yes | Capabilities needed (may be `[]`): `web-access`, `filesystem`, `code-execution`, `shell`, `git`, `github-cli`, `database`, `email-access`, `browser` |
| `repository` / `homepage` / `documentation` | no | `https://` URLs |
| `icon` | no | Icon name for the website (e.g. `search`, `code`, `doc`) |
| `featured` | no | `true` to feature on the home page (maintainers only) |
| `deprecated` | no | `true` or a short reason / replacement name |
| `createdAt` / `updatedAt` | no | `YYYY-MM-DD`. Normally omitted — the registry takes them from git history. |
| `dependencies` | no | Names of other skills in this registry that this one builds on |

Unknown keys are rejected so typos get caught.

## 3. Body

After the frontmatter, `SKILL.md` **must** contain exactly one `# Title` and these `##` sections (any order, case-insensitive):

| Section | Purpose |
|---|---|
| `## Overview` | What the skill does, in 1–3 sentences |
| `## When to Use` | Trigger phrases and situations; when **not** to use it |
| `## Usage` | The procedure the agent follows — numbered steps, concrete commands, output format |
| `## Examples` | At least one realistic prompt and what the agent does |
| `## Limitations` | What it can't do or gets wrong |
| `## Changelog` | One bullet per version, newest first |

Optional sections: `## Installation`, `## Requirements`, `## Compatibility`, or anything else useful. The website builds installation, requirements and compatibility panels from metadata, so these sections are only needed for extra detail.

Code fences **must** be closed.

**Writing guidance:** write for the agent, in the imperative ("Run…", "Report…"). Put hard safety rules at the top of `## Usage`. Prefer a clear output format over prose. Keep `SKILL.md` under ~500 lines; move long reference material to `reference/` and link it.

## 4. Versioning

Skills use [Semantic Versioning](https://semver.org):

- **MAJOR** (`2.0.0`) — behaviour changes that break how people use it: different output format, removed steps, new hard requirement.
- **MINOR** (`1.1.0`) — new capability, backwards-compatible: extra steps, new optional output, broader triggers.
- **PATCH** (`1.0.1`) — fixes and wording that don't change behaviour.

Every PR that changes a skill's behaviour **must** bump `metadata.version` and add a `## Changelog` entry. Pre-release tags (`1.1.0-beta.1`) are allowed.

## 5. Safety rules

A skill **must not** contain:

- API keys, tokens, passwords, private keys or any credentials
- destructive commands (e.g. recursive deletes of `/` or `~`, disk formatting)
- piping remote scripts into a shell, or decode-and-execute patterns
- obfuscated or minified code
- hidden network calls, data exfiltration or credential harvesting
- instructions that tell the agent to bypass user confirmation for irreversible actions

Validation flags obvious patterns automatically. Maintainers review everything else by hand — see [SECURITY.md](SECURITY.md).

## 6. Registry format

`npm run registry` writes `registry/skills.json`. It is generated — never edit it by hand.

```json
{
  "version": 1,
  "skills": [
    {
      "name": "web-research",
      "title": "Web Research",
      "description": "…",
      "version": "1.0.0",
      "author": "Velonx",
      "license": "MIT",
      "category": "research",
      "tags": ["research", "web", "search", "citations"],
      "platforms": ["generic", "claude", "openai", "gemini", "cursor"],
      "requirements": ["web-access"],
      "icon": "search",
      "featured": true,
      "deprecated": false,
      "createdAt": "2026-09-25",
      "updatedAt": "2026-09-25",
      "path": "skills/web-research/SKILL.md",
      "files": ["SKILL.md", "examples/sample-answer.md"]
    }
  ]
}
```

- Skills are sorted by `name`.
- Optional fields (`compatibility`, `dependencies`, `repository`, `homepage`, `documentation`, `icon`) appear only when set.
- `createdAt` / `updatedAt` come from frontmatter if present, otherwise from git history of the skill folder, otherwise `null`.
- The top-level `version` changes only when the registry shape changes in a breaking way.
