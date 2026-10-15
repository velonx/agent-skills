# Example: Codebase audit report

**Prompt:** "Audit this repo before we launch next week." (Next.js 14 + Prisma + Postgres SaaS, ~18k lines of TypeScript)

---

## Summary

**Verdict:** At risk — one critical security issue blocks launch; the rest is fixable within a sprint.

**Overall: 4.0 / 10** (mean 5.6, capped at 4.0 because of an open critical security finding)

| Dimension | Score | Key evidence |
|---|---|---|
| Code quality | 7 | Lint and type-check pass; 2 god files; inconsistent error handling |
| Security | 3 | SQL injection in search; admin route lacks role check |
| Efficiency | 6 | N+1 on dashboard; unpaginated `/api/invoices` |
| Accessibility | 5 | 14 unlabelled inputs; custom dropdown not keyboard-operable |
| Testing | 7 | 212 tests pass in 41s; 0% coverage on billing webhooks |

**Top 5 actions (impact ÷ effort):**

1. Parameterise the search query — `src/app/api/search/route.ts:27` (S)
2. Add role check to `/api/admin/*` middleware (S)
3. Add tests for the Stripe webhook handler (M)
4. Replace per-row project lookup on the dashboard with one `include` query (S)
5. Label all form inputs and replace the custom dropdown with a native `<select>` or an accessible listbox (M)

## Findings

### Security

- `[critical] src/app/api/search/route.ts:27 — query built with template string: prisma.$queryRawUnsafe(\`... LIKE '%${q}%'\`) → any visitor can read or modify the database via q → use prisma.$queryRaw with tagged template parameters (effort: S)`
- `[critical] src/middleware.ts:14 — /api/admin matcher checks session but not role → any signed-in user can call admin endpoints (e.g. POST /api/admin/users/:id/plan) → check session.user.role === "admin" and add a test (effort: S)`
- `[high] src/lib/auth.ts:51 — password reset tokens generated with Math.random() → predictable tokens allow account takeover → use crypto.randomBytes(32) (effort: S)`
- `[medium] npm audit — 3 high advisories in transitive deps (next-auth → jose) → reachable only via JWE decryption, which the app does not use → upgrade next-auth to the patched minor (effort: S)`

### Efficiency

- `[high] src/app/dashboard/page.tsx:40 — prisma.project.findUnique inside invoices.map (N+1) → ~200 queries per page load for active accounts → single findMany with include: { project: true } (effort: S)`
- `[medium] src/app/api/invoices/route.ts:12 — returns all invoices without limit → response grows unbounded; 6 MB for the largest seed account → add cursor pagination (effort: M)`

### Code quality

- `[medium] src/lib/billing.ts (812 lines), src/app/settings/page.tsx (640 lines) — god files mixing data access, formatting and UI → hard to test and review → split by responsibility (effort: M)`
- `[medium] 11 locations, e.g. src/lib/email.ts:33 — catch (e) {} swallows errors → failed emails go unnoticed → log with context and rethrow or return a result type (effort: S)`

### Accessibility

- `[high] 14 inputs across 5 forms, e.g. src/components/InviteForm.tsx:22 — placeholder used instead of <label> → screen-reader users cannot identify fields → add visible labels (effort: S)`
- `[high] src/components/Select.tsx — div-based dropdown with onClick only → unusable by keyboard → use native <select> or a listbox with arrow-key support (effort: M)`

### Testing

- `[high] src/app/api/webhooks/stripe/route.ts — no tests → a regression silently breaks subscription renewals → add tests for signature failure, checkout.session.completed and invoice.payment_failed (effort: M)`
- `[low] 6 skipped tests (it.skip) in tests/settings.test.ts — skipped since March with no linked issue → fix or delete (effort: S)`

## Strengths

- Strict TypeScript with `noUncheckedIndexedAccess`; zero type errors.
- CI runs lint, type-check and tests on every PR and blocks merge on failure.
- Environment variables validated at startup with a schema.

## Fix plan

- **Now (before launch):** both critical security findings, reset-token generation.
- **Next (this sprint):** dashboard N+1, webhook tests, form labels, dropdown.
- **Later:** pagination, god-file split, error handling, skipped tests, dependency upgrades.

## Method and limits

Commands run: `npm ci`, `npm run lint` (pass), `npx tsc --noEmit` (pass), `npm test -- --coverage` (212 passed, 61% lines), `npm audit --omit=dev` (3 high, transitive). Full reads: API routes, middleware, auth, billing, dashboard. Spot-checked: remaining components. Not checked: production infrastructure, runtime performance under load, screen-reader behaviour.
