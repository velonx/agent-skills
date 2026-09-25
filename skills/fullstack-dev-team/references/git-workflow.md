# Git Discipline

History is documentation. Write it as if someone will read it — they will, and it's usually future-you at the worst possible moment.

## Project start

`git init` before the first source file. Write `.gitignore` BEFORE the first commit — once junk is in history, it's in history:

```
node_modules/
.env
.env.*
!.env.example
dist/
build/
.next/
coverage/
.DS_Store
__pycache__/
```

First commit: `chore: scaffold project`.

## Conventional commits

Format: `type(scope): imperative summary` — types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`.

**Examples:**
- `feat(auth): add OTP login via Supabase`
- `fix(cart): prevent negative quantities on rapid clicks`
- `refactor(api): extract invoice logic into service layer`
- `docs(readme): add env var table and quickstart`

Commit at every working checkpoint — small, atomic, each one buildable. Never commit broken code to main; a bisectable history is a debugging superpower you buy one commit at a time.

## Branching

- **Solo:** `main` + short-lived feature branches (`feat/checkout`), merge when green, delete the branch. Direct-to-main is acceptable only for docs/config one-liners.
- **Team:** branch → PR → review → squash-merge. Protect `main`; CI must pass before merge. PR description covers what, why, and how to test — screenshots for anything visual.

## Never commit

Secrets (if one leaks: **rotate first**, scrub history second — see `security.md`), `node_modules` or build artifacts, large binaries (object storage or Git LFS), and graveyards of commented-out code — deleting is safe, git remembers everything.

## Releases

Tag milestones with semver: `git tag v1.0.0`. Major = breaking, minor = features, patch = fixes. The commit types above generate a changelog almost for free.

## Fixing mistakes — the safe versions

- Wrong last commit message or forgot a file (not yet pushed): `git commit --amend`.
- Discard local file changes: `git restore <file>`.
- Undo local commits, keep the work: `git reset --soft HEAD~1`.
- Already pushed a mistake: `git revert <sha>` — never force-push a shared branch; rewriting shared history breaks everyone else's clone.
