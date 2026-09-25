# Contributing

Thanks for helping build Velonx Skills. Everything happens on GitHub — there's no separate submission system.

## Ways to contribute

- **Add a skill** — the main one. Read on.
- **Improve a skill** — clearer steps, better examples, a fix. Bump the version and add a changelog line.
- **Request a skill** — [open a skill request](https://github.com/velonx/agent-skills/issues/new?template=skill-request.md).
- **Report a bug** in a skill or the tooling — [bug report](https://github.com/velonx/agent-skills/issues/new?template=bug-report.md).
- **Security issue** — don't open an issue; see [SECURITY.md](SECURITY.md).

## The flow

```text
Fork → branch → add skills/<name>/SKILL.md → npm run validate → PR
     → CI validates → maintainer review → merge
     → registry regenerated automatically → live on skills.velonx.com
```

## Quickest way: the web form

[skills.velonx.com/submit](https://skills.velonx.com/submit) builds a valid `SKILL.md` from a short form, checks it against the same schema as CI, and opens GitHub with the file pre-filled. GitHub forks the repo and opens a pull request for you. You can finish the instructions in GitHub's editor.

Prefer git? Follow the steps below.

## Step by step

1. **Check it doesn't exist.** Search [registry/skills.json](registry/skills.json) and open PRs. If something close exists, improve it instead.
2. **Fork and clone**, then install tooling (Node 20+):
   ```bash
   git clone https://github.com/<you>/agent-skills
   cd agent-skills
   npm install
   git checkout -b add-my-skill
   ```
3. **Create the folder** `skills/<name>/` (lowercase kebab-case) and write `SKILL.md`. Copy an existing skill such as [`skills/web-search/SKILL.md`](skills/web-search/SKILL.md) as a starting point. Rules: [SPECIFICATION.md](SPECIFICATION.md). Walkthrough: [docs/creating-a-skill.md](docs/creating-a-skill.md).
4. **Validate locally:**
   ```bash
   npm run validate
   ```
   Errors look like this and tell you exactly what to fix:
   ```text
   ERROR  skills/my-skill/SKILL.md
          Missing required field: license
   ```
5. **Try it for real.** Install the skill in an agent (see [docs/getting-started.md](docs/getting-started.md)) and run the prompts from your `## Examples`. Reviewers will ask how you tested it.
6. **Open a pull request.** Fill in the template. One skill per PR.

**Don't** edit `registry/skills.json` — CI generates it after merge, and PRs that change it fail.

## Changing an existing skill

- Bump `metadata.version` per [semver rules](SPECIFICATION.md#4-versioning).
- Add a line to the skill's `## Changelog`.
- Keep the `name` — renaming breaks everyone who installed it. To replace a skill, add the new one and set `deprecated: "use <new-name>"` on the old one.

## What reviewers look for

- **Useful:** solves a real, recurring task better than the agent does without it.
- **Triggers correctly:** the `description` says what it does *and* when to use it.
- **Clear procedure:** numbered steps, concrete commands, a defined output format.
- **Safe:** no secrets, no destructive or hidden actions, confirmation before irreversible steps. See [SECURITY.md](SECURITY.md).
- **Honest:** real limitations listed; no claims the skill can't back up.
- **Licensed:** a permissive license from the allowlist, and you have the right to publish it.

Automated validation is not a substitute for review. A maintainer reads every file.

## Tooling changes

Changes to `scripts/`, `registry/schema.json` or workflows need a test in `test/` and an update to [SPECIFICATION.md](SPECIFICATION.md) if rules change. Run `npm test` before opening the PR.

## Maintainers

Reviews are routed by [CODEOWNERS](.github/CODEOWNERS) to `@velonx/maintainers`. Maintainers merge after CI is green and one approving review.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
