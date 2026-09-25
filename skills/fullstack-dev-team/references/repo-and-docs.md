# Portfolio-Grade Repo & Docs

The repo is the product's resume — and the builder's. Optimize it for a 30-second cold scan by a stranger: recruiter, investor, or first contributor. Read this for Phase 6 or any DOCS-mode task.

## The 30-second test

Landing on the repo, a stranger must find within thirty seconds: **what it is** (one line), **what it looks like** (screenshot or GIF), **where it runs** (live link), and **how to run it** (a quickstart that actually works). Miss any one and the repo fails the scan — most readers never scroll past it.

## README anatomy, in order

```markdown
# ProjectName
One-line value prop — what it does, for whom.

[Live Demo](url) · [Demo Video](url)

![screenshot](docs/screenshot.png)

## Features
3–6 bullets of user-visible outcomes — not tech internals.

## Tech stack
One line or small table — include the WHY for the interesting choices.

## Quickstart
clone → install → cp .env.example .env → fill vars → run dev
Then a table of env vars: name · purpose · where to get it.
TEST THIS FROM A FRESH CLONE — a broken quickstart torches credibility instantly.

## Architecture
3–6 lines or one diagram: how data flows through the system.

## Roadmap
Honest three buckets: done / next / someday.

## License · Author
MIT badge, link to the builder's site/LinkedIn/GitHub.
```

A real screenshot beats three paragraphs of description. Store images in `docs/`, not the repo root.

## docs/ folder — grows with the project

- `ARCHITECTURE.md` — the map: components, data flow, where things live.
- `API.md` — endpoints, auth requirements, one request/response example each.
- `DECISIONS.md` — a running ADR log. One paragraph per decision beats zero:

```markdown
## 2026-07 — Drizzle over Prisma
Context: solo project, edge deploys planned.
Decision: Drizzle ORM.
Why: lighter runtime, SQL-transparent, edge-compatible.
Revisit when: team grows past 3 or schema complexity explodes.
```

Six months later, the WHY is the only part anyone wishes they'd written down.

## Repo hygiene

- `LICENSE` file present — MIT by default unless there's a reason otherwise.
- `.env.example` kept current with every var the app reads.
- Folder names that mean something; no `final_v2_REAL.js` fossils.
- Non-obvious `package.json` scripts documented in the README.
- Delete commented-out code — git is the archive.

## Code comments and API docs

WHY over WHAT, always. JSDoc/docstrings on exported and public functions only — internal one-liners don't need ceremony. `TODO(name): context` so TODOs are traceable, not tombstones.

## The recruiter pass — final gate before docs are "done"

Open the repo cold, incognito, and read only the README top to bottom. Would this impress in thirty seconds flat? Fix whatever wouldn't.
