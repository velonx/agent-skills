# Security Standards

Security is a phase gate, not a feature request. Run the pre-ship checklist at the bottom before every ship, and read this file for any REVIEW or SECURITY mode task.

## The ten that actually bite (OWASP, translated to indie reality)

1. **Injection** — never concatenate user input into SQL or shell commands. ORM or parameterized queries only. Same rule for `exec`/`spawn`.
2. **Broken auth** — use a library (Supabase Auth / Auth.js / Clerk). Passwords hashed with argon2 or bcrypt via a maintained library, never DIY. Session cookies: `httpOnly`, `secure`, `sameSite`.
3. **Sensitive data exposure** — HTTPS everywhere, never log secrets or PII, hash passwords (don't encrypt them — encryption implies decryption).
4. **Broken access control** — check OWNERSHIP on every resource fetch (`where userId = session.user.id`), not just "is logged in." Fetching `/invoices/123` must fail for a user who doesn't own invoice 123. This IDOR pattern is the single most common hole in indie apps.
5. **XSS** — rely on framework escaping; `dangerouslySetInnerHTML` only after sanitizing (DOMPurify); set a Content-Security-Policy.
6. **Misconfiguration** — no default credentials, no stack traces in prod responses, no `*` CORS with credentials, no directory listing.
7. **Vulnerable dependencies** — `npm audit` / `pip-audit` in CI, lockfile committed, no abandoned packages (check last release date before adding).
8. **SSRF** — never fetch a user-supplied URL raw; allowlist hosts if the feature genuinely needs remote fetching.
9. **No rate limiting** — login, signup, OTP, and every expensive endpoint (AI calls, email sends) get limits. Upstash Ratelimit or middleware counters. Without this, one script empties the free tier overnight.
10. **Mass assignment** — never spread `req.body` into a DB write. Pick fields explicitly; a Zod/Pydantic schema doubles as the allowlist.

## Secrets discipline

- `.env` is gitignored from commit #1. A committed `.env.example` with fake values documents what's needed.
- Validate env vars at boot with a schema — misconfiguration should fail at startup, not at 2 a.m. in production.
- Keys stay server-side. Anything prefixed `NEXT_PUBLIC_` / `VITE_` ships to the browser — treat it as public.
- If a secret ever touches git history: **rotate it FIRST**, then scrub history (`git filter-repo`). Rotation is the fix; scrubbing is cosmetics — assume anything committed is compromised.

## File uploads (when the app has them)

Validate type and size server-side (client checks are decoration), generate random filenames, store in object storage — never the web root — and never execute or serve uploads raw.

## Security headers — baseline to set

`Content-Security-Policy` (start strict, loosen deliberately), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` or CSP `frame-ancestors`, `Referrer-Policy: strict-origin-when-cross-origin`, and HSTS in production.

## Pre-ship checklist

- [ ] Every input validated server-side (client validation is UX, not security)
- [ ] Every query scoped to the authenticated user — spot-check by requesting another user's resource ID
- [ ] No secrets in code, git history, or the client bundle — grep the build output for key prefixes
- [ ] Rate limits on auth and expensive endpoints
- [ ] Dependency audit run; high/critical findings fixed
- [ ] Errors: generic message to the user, detailed log to the server
- [ ] Security headers set
- [ ] Auth manually attacked once: another user's ID, expired session, direct URL to a protected page

Every red item gets fixed before ship. No exceptions, no "later."
