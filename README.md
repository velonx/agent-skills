# Velonx Agent Skills

**Open-source skills for AI agents.**

Velonx Skills is an open-source registry of reusable AI agent skills. This repository is the source of truth: every skill lives here as a plain `SKILL.md` file. The website, [aiskills.velonx.in](https://aiskills.velonx.in), is a discoverable interface over this repository.

[![Validate skills](https://github.com/velonx/agent-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/velonx/agent-skills/actions/workflows/validate.yml)
![License: MIT](https://img.shields.io/badge/license-MIT-4d6947)

## What is a skill?

A skill is a folder of instructions (plus optional examples and scripts) that an agent loads **only when a task needs it**. Until then, only its `name` and one-line `description` sit in the agent's context. Skills turn "improvise every time" into "follow the procedure that works".

```text
skills/code-review/
├── SKILL.md           ← instructions + metadata (required)
└── examples/
    └── review-output.md
```

Skills here follow the [Agent Skills](https://agentskills.io) format, so they work in Claude as-is and in any agent that can read Markdown instructions.

## Why this exists

Good agent workflows get rewritten from scratch in every team. A shared, reviewed, versioned registry means you can find a skill that already works, read exactly what it does before you use it, and improve it for everyone.

## Skills

| Skill | Category | What it does |
|---|---|---|
| [web-research](skills/web-research) | Research | Multi-source research with citations |
| [web-search](skills/web-search) | Research | Quick single-fact lookups |
| [academic-research](skills/academic-research) | Research | Papers and literature reviews |
| [market-research](skills/market-research) | Research | Market size, segments, demand |
| [competitive-analysis](skills/competitive-analysis) | Research | Competitor matrix and positioning gaps |
| [code-review](skills/code-review) | Development | Prioritised, actionable PR review |
| [code-documentation](skills/code-documentation) | Development | Accurate docstrings and READMEs |
| [github-integration](skills/github-integration) | DevOps | Issues, PRs and CI through `gh` |
| [pdf-analysis](skills/pdf-analysis) | Documents | Text, tables and fields from PDFs |
| [data-analysis](skills/data-analysis) | Data & Analytics | Clean, analyse, chart tabular data |
| [sql-analysis](skills/sql-analysis) | Data & Analytics | Safe read-only SQL for questions |
| [email-assistant](skills/email-assistant) | Productivity | Inbox triage and drafts, approval first |

The full machine-readable list is [registry/skills.json](registry/skills.json).

## Install a skill

> **CLI: coming soon.** A `velonx` CLI is planned (see [ROADMAP.md](ROADMAP.md)). Until then, install manually:

1. Open the skill's folder on GitHub, e.g. [`skills/web-research`](skills/web-research).
2. Download or copy the whole folder.
3. Put it in your agent's skills directory:
   - **Claude Code:** `.claude/skills/<name>/` in your project, or `~/.claude/skills/<name>/` for all projects.
   - **Other agents:** wherever your agent loads instructions from, or paste `SKILL.md` into its system prompt / custom instructions.
4. Ask for the task in plain language. The agent loads the skill when the description matches.

Full guide: [docs/getting-started.md](docs/getting-started.md).

## Create a skill

```bash
git clone https://github.com/<you>/agent-skills && cd agent-skills
npm install
mkdir skills/my-skill   # then write skills/my-skill/SKILL.md
npm run validate
```

Walkthrough: [docs/creating-a-skill.md](docs/creating-a-skill.md) · Rules: [SPECIFICATION.md](SPECIFICATION.md) · Process: [CONTRIBUTING.md](CONTRIBUTING.md)

## How the registry works

```text
skills/*/SKILL.md → npm run validate → npm run registry → registry/skills.json → aiskills.velonx.in
```

- Every PR that touches `skills/**` is validated by GitHub Actions: schema, structure, Markdown, links, duplicates and safety patterns.
- After a merge to `main`, CI regenerates `registry/skills.json` and commits it. **Don't edit it by hand** — PRs that do are rejected.
- The website ([velonx/skills-web](https://github.com/velonx/skills-web)) reads `registry/skills.json` at build time and is told to rebuild when it changes.

Details: [ARCHITECTURE.md](ARCHITECTURE.md).

## Repository layout

| Path | What |
|---|---|
| `skills/` | One folder per skill |
| `registry/schema.json` | JSON Schema for skill frontmatter |
| `registry/categories.json` | Category list (maintainers) |
| `registry/skills.json` | Generated registry — don't edit |
| `scripts/` | Validator and registry generator (Node ≥ 20) |
| `test/` | Validator tests (`npm test`) |
| `docs/` | Guides |

## License

This repository is licensed under the **MIT License** ([LICENSE](LICENSE)). This was chosen explicitly: it's the most permissive widely understood license, so skills can be used in commercial and open-source agents alike.

- **Code** (`scripts/`, `test/`, workflows): MIT.
- **Documentation** (`*.md` outside `skills/`): MIT.
- **Skills**: each skill declares its own `license` in its frontmatter, chosen from an allowlist of permissive licenses (MIT, Apache-2.0, BSD, ISC, MPL-2.0, CC-BY-4.0, CC0-1.0, Unlicense). That declaration applies to everything in the skill's folder. If a skill says MIT, it's MIT.
- By contributing, you agree your contribution is licensed under the license declared for the file(s) you change (MIT for everything outside `skills/`).

## Community

Maintained by the Velonx open-source community.

- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Security: [SECURITY.md](SECURITY.md)
- Roadmap: [ROADMAP.md](ROADMAP.md) · Changelog: [CHANGELOG.md](CHANGELOG.md)
- Contributors: [github.com/velonx/agent-skills/graphs/contributors](https://github.com/velonx/agent-skills/graphs/contributors)
