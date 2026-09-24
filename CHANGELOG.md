# Changelog

Changes to the repository, specification and tooling. Each skill keeps its own changelog in its `SKILL.md`.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This project uses [Semantic Versioning](https://semver.org).

## [Unreleased]

## [0.1.0] — 2026-09-25

### Added
- Skill specification v1 and JSON Schema (`registry/schema.json`).
- Nine categories (`registry/categories.json`).
- Validator: schema, folder naming, required sections, closed code fences, internal links, duplicates, dependencies, safety patterns.
- Registry generator (`registry/skills.json`) with git-derived `createdAt` / `updatedAt`.
- GitHub Actions: PR validation, registry regeneration on `main`, website dispatch hook.
- 12 skills: web-research, web-search, academic-research, market-research, competitive-analysis, code-review, code-documentation, github-integration, pdf-analysis, data-analysis, sql-analysis, email-assistant.
- README, ARCHITECTURE, SPECIFICATION, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, ROADMAP, docs.
