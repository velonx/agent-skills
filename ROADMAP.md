# Roadmap

## V1 — the open-source loop

- [x] Skill specification and JSON Schema
- [x] Skills repository with 12 sample skills
- [x] Automated validation on pull requests
- [x] Registry generation on `main`
- [ ] Website ([velonx/skills-web](https://github.com/velonx/skills-web)): home, skills, categories, search, docs
- [ ] Skill pages generated from `SKILL.md`, with installation guides per platform
- [ ] "View on GitHub" and "Edit this skill" links
- [ ] Automatic website rebuild on registry change
- [ ] Live at aiskills.velonx.in

## V2 — tools

- `velonx` CLI: `search`, `install`, `update`, `list`, `info`, built on `registry/skills.json`
- Read-only registry API: `GET /api/skills`, `/api/skills/:slug`, `/api/categories`, `/api/search?q=`
- Better search (typo tolerance, ranking)
- Install counts and basic analytics
- Contributor pages, bookmarks, discussions

## V3 — trust and discovery

- Skill collections ("starter pack for data teams")
- Compatibility testing across agents
- Automated skill tests (prompt → expected behaviour)
- Community profiles and verified authors
- Smarter discovery and recommendations

Priorities move with community demand. [Open a feature request](https://github.com/velonx/agent-skills/issues/new?template=feature-request.md) to weigh in.
