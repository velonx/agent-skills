# Architecture

Velonx Skills is two repositories in the [Velonx](https://github.com/velonx) GitHub organization, joined by one data contract.

```text
                    Velonx (GitHub organization)
                               │
              ┌────────────────┴────────────────┐
              ▼                                 ▼
     velonx/agent-skills                velonx/skills-web
     source of truth                    website (Next.js)
     skills/*/SKILL.md                  reads the registry
     validation + registry              renders + searches
              │                                 ▲
              └──── registry/skills.json ───────┘
                                                │
                                                ▼
                                       aiskills.velonx.in
```

**The rule:** GitHub → registry → website. Never the other way round. `agent-skills` is useful on its own — clone it and you have every skill, the spec, and the tooling. The website adds discovery, nothing more.

---

## A. Components

| Component | Lives in | Responsibility |
|---|---|---|
| Skills | `agent-skills/skills/<name>/` | One folder per skill. `SKILL.md` is the only required file. |
| Specification | `agent-skills/SPECIFICATION.md` | Human-readable rules for a skill. |
| Schema | `agent-skills/registry/schema.json` | Machine-readable frontmatter rules (JSON Schema draft-07). |
| Categories | `agent-skills/registry/categories.json` | The category list. Maintainer-edited. |
| Validator | `agent-skills/scripts/validate.mjs` | Schema, structure, Markdown, links, duplicates, safety patterns. |
| Registry generator | `agent-skills/scripts/build-registry.mjs` | Validates, then writes `registry/skills.json`. |
| CI | `agent-skills/.github/workflows/` | `validate.yml` on PRs, `registry.yml` on `main`. |
| Website | `skills-web/` (Phase 4) | Next.js App Router, static pages from the registry. |

### Why skill metadata is nested under `metadata:`

The [Agent Skills](https://agentskills.io) format that Claude and other agents load only allows `name`, `description`, `license`, `compatibility`, `allowed-tools` and `metadata` at the top level of the frontmatter. Putting Velonx fields (`title`, `version`, `tags`…) at the top level would make skills fail those loaders. So Velonx fields live under `metadata:`, and **every skill in this repo can be dropped into an agent's skills folder unchanged**. The generated registry flattens them, so consumers never see the nesting.

## B. Repository structure

```text
agent-skills/                         skills-web/  (see its README for the current layout)
├── README.md                         ├── app/
├── ARCHITECTURE.md                   │   ├── page.tsx                 home
├── SPECIFICATION.md                  │   ├── skills/page.tsx          list + filters
├── CONTRIBUTING.md                   │   ├── skills/[slug]/page.tsx   generated per skill
├── CODE_OF_CONDUCT.md                │   ├── categories/[slug]/page.tsx
├── SECURITY.md                       │   ├── search/page.tsx
├── CHANGELOG.md · ROADMAP.md         │   ├── docs/ · submit/ · changelog/
├── LICENSE                           │   └── sitemap.ts · robots.ts
├── registry/                         ├── components/   PaperCard, SkillCard, SearchBar,
│   ├── schema.json      (source)     │                 InstallationBlock, CodeBlock, …
│   ├── categories.json  (source)     ├── lib/
│   └── skills.json      (generated)  │   ├── registry.ts   fetch + type the registry
├── skills/                           │   └── search.ts     local search (swappable)
│   └── <name>/                       └── .github/workflows/deploy.yml
│       ├── SKILL.md     (required)
│       ├── README.md    (optional)
│       ├── examples/    (optional)
│       └── scripts/ reference/ …
├── docs/
├── scripts/  lib · validate · build-registry
├── test/     validator tests + fixtures
└── .github/  workflows · issue templates · PR template · CODEOWNERS
```

## C. Data flow

```text
skills/<name>/SKILL.md ──► validate ──► build-registry ──► registry/skills.json
                                                                │
      skills-web (build time) ◄── raw.githubusercontent.com ◄───┘
             │   + SKILL.md bodies (by `path`) for detail pages
             ▼
   static HTML per skill/category ──► aiskills.velonx.in
```

`registry/skills.json` holds everything list and search views need: name, title, description, version, author, license, category, tags, platforms, requirements, dates, `path` and `files`. Detail pages also fetch the skill's `SKILL.md` via `path` and render it. The registry has a top-level `"version": 1`; breaking changes to its shape bump that number.

## D. Contribution flow

```text
fork ─► add skills/<name>/SKILL.md ─► npm run validate ─► open PR
   ─► validate.yml (schema, structure, links, duplicates, safety, tests,
                    "registry/skills.json not hand-edited")
   ─► maintainer review (CODEOWNERS) ─► merge to main
   ─► registry.yml regenerates skills.json and commits it
   ─► dispatch to skills-web ─► rebuild ─► live
```

Full contributor instructions: [CONTRIBUTING.md](CONTRIBUTING.md).

## E. Deployment flow

- **agent-skills** isn't deployed. Its output is `registry/skills.json` on `main`.
- **skills-web** deploys to Vercel (or any static-capable host). Pull requests get preview deployments; `main` is production at `aiskills.velonx.in` (CNAME `skills` → the host).
- The site fetches the registry **at build time only**. No GitHub token reaches the browser; if one is needed for rate limits it stays in a server-side env var (never `NEXT_PUBLIC_*`).

## F. GitHub → website sync

```text
merge to agent-skills/main ─► registry.yml ─► commit skills.json (if changed)
                                         └──► repository_dispatch "registry-updated" ─┐
skills-web rebuild.yml ◄── hourly check: has agent-skills/main moved? ◄───────────────┤ (fallback)
   └─ pull registry @ that exact commit ─► test ─► build ─► deploy hook ─► live       │
```

1. A merge to `agent-skills/main` touching `skills/**` runs `registry.yml`. It validates, regenerates `skills.json`, commits it as `github-actions[bot]` with `[skip ci]` if it changed, then calls the Vercel deploy hook (`VERCEL_DEPLOY_HOOK_URL`). Vercel's build pulls `agent-skills/main`; if it fails, the old site stays live.
2. It then sends `repository_dispatch` (`registry-updated`, payload `{sha}`) to `velonx/skills-web` — on **every** run, not only when `skills.json` changed, because editing a `SKILL.md` body changes its page without changing the registry file. Needs the `SKILLS_WEB_DISPATCH_TOKEN` secret (below); without it the step is skipped.
3. `skills-web/.github/workflows/rebuild.yml` runs on that event, on a manual trigger, and **hourly** as a fallback. The hourly run only rebuilds when `agent-skills/main` has moved since the last rebuild (tracked with an Actions cache key per commit), so it costs a few seconds when nothing changed.
4. The rebuild pulls every registry file from **one** agent-skills commit into `.registry/` (`scripts/pull-registry.mjs`), runs tests and a full build as a gate, then calls the host's deploy hook (`VERCEL_DEPLOY_HOOK_URL` secret). A registry that breaks the build never reaches production.

**Why pull files instead of fetching during the build?** Next.js stores `fetch` results in `.next/cache`, which hosts keep between builds, so a rebuild could silently serve the old registry. Pulling into `.registry/` first also pins a build to a single commit and shows it in the site footer (`registry @ abc1234`).

**No loops:** pushes made with `GITHUB_TOKEN` never trigger workflows; `registry.yml` ignores `registry/skills.json` in its path filter; the commit message carries `[skip ci]`; and `skills-web` never writes to `agent-skills`.

**Replaceable:** the website only needs "the agent-skills files at some commit". Dispatch can be swapped for a webhook, cron-only, or a registry API without touching the skills repo.

**Secrets to set up**

| Secret | Where | What |
|---|---|---|
| `SKILLS_WEB_DISPATCH_TOKEN` | `agent-skills` → Settings → Secrets → Actions | Fine-grained token, resource owner **velonx**, repository **skills-web** only, permission **Contents: Read and write**. Optional: without it, updates arrive within the hour. |
| `VERCEL_DEPLOY_HOOK_URL` | `agent-skills` → Settings → Secrets → Actions | Vercel deploy hook. `registry.yml` calls it after every run, so a merge goes live in about a minute. Add it to `skills-web` too if you want the hourly fallback to deploy. |

> If branch protection is enabled on `agent-skills/main`, allow `github-actions[bot]` to push, or switch step 1 to open an automated PR instead.

> GitHub pauses scheduled workflows in repositories with no activity for 60 days. The dispatch path is unaffected; re-enable the schedule from the Actions tab if needed.

## G. Skill schema

- Rules: [SPECIFICATION.md](SPECIFICATION.md)
- Machine-readable: [registry/schema.json](registry/schema.json)
- Output contract: `registry/skills.json` — see "Registry format" in the specification.

## H. Development phases

| Phase | Scope | Status |
|---|---|---|
| 1 | Repo, docs, spec, schema, 12 sample skills | ✅ |
| 2 | Validation (+ tests, PR workflow) | ✅ |
| 3 | Registry generation (+ `main` workflow, dispatch hook) | ✅ |
| 4 | `skills-web`: Next.js + TypeScript + Tailwind, design system, home | ✅ |
| 5 | Skills list, detail pages, categories, search | ✅ |
| 6 | Connect website to registry | ✅ (build-time fetch; done with 4–5) |
| 7 | GitHub links: "View on GitHub", "Edit this skill" | ✅ (on every skill page) |
| 8 | Contribution UX: submit page → GitHub new-file/PR flow | ✅ (aiskills.velonx.in/submit) |
| 9 | Automatic rebuilds (dispatch receiver + hourly fallback) | ✅ |
| 10 | Deploy to aiskills.velonx.in | next |

## Security model

- Skills are **untrusted content**. Nothing in this project ever executes a submitted skill — CI only parses files.
- Automated checks catch obvious secrets, destructive commands and obfuscated payloads; **maintainer review is the real gate**. See [SECURITY.md](SECURITY.md).
- CI runs with `contents: read` on PRs. Only the `main` workflow can write, and only to `registry/skills.json`.
- The website is static; there is no user data and no backend in V1.

## Decisions

| Decision | Why |
|---|---|
| No database in V1 | GitHub is the source of truth; the registry is a file. Add a DB only for accounts, analytics or bookmarks. |
| Velonx fields under `metadata:` | Keeps skills loadable by Claude and other Agent Skills loaders unchanged. |
| Scripts are plain Node ESM (`.mjs`) with 2 dependencies (`ajv`, `yaml`) | Runs on Node 20 with no build step. Move to TypeScript if the tooling grows. |
| Registry committed by CI, not by hand | Anyone who clones the repo gets the registry; CI blocks PRs that edit it by hand. |
| Only 6 body sections required | Installation, requirements and compatibility come from metadata, so the website renders them consistently. Skills may still add those sections. |
| CLI marked "coming soon" | Nothing documents a command that doesn't exist yet. The registry is already machine-readable for it. |
| License: MIT | Repo default for code, docs and skills; each skill declares its own license from an allowlist. See README. |
