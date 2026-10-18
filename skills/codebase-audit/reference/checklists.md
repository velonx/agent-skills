# Audit Checklists

Use these as prompts for where to look, not as boxes to tick blindly. Record a finding only when you have seen the evidence.

## 1. Code quality

- **Structure:** clear module boundaries; no god files (> ~500 lines) or god functions (> ~50 lines, deep nesting > 3); business logic separated from I/O and UI.
- **Duplication:** copy-pasted blocks that should be one function; several implementations of the same utility.
- **Complexity:** long parameter lists, boolean flag arguments, deeply nested conditionals, clever one-liners nobody can read.
- **Naming and consistency:** names say what things are; one style for files, casing, imports and error handling across the repo.
- **Error handling:** no swallowed errors (`catch {}`), no generic catch-and-continue, errors carry context, user-facing errors are safe.
- **Types and contracts:** type-checker passes; no widespread `any` / untyped dicts at boundaries; inputs validated at the edges.
- **Dead code:** unused exports, files, feature flags, commented-out blocks.
- **Configuration:** no hard-coded environment values; config validated at startup.
- **Dependencies:** outdated majors, abandoned packages, duplicates doing the same job, heavy packages for trivial tasks, missing lockfile.
- **Docs:** README explains setup, run, test; non-obvious decisions documented.

## 2. Security (OWASP Top 10 frame)

- **Injection:** SQL/NoSQL/command/template built by string concatenation with user input; `eval`, `exec`, `child_process` with untrusted input.
- **Broken access control:** routes or resolvers without auth; missing ownership checks (IDOR: `/orders/:id` returns any user's order); admin functions guarded only in the UI.
- **Authentication:** password hashing (bcrypt/argon2/scrypt, not MD5/SHA-1); session/JWT expiry, signature verification, algorithm pinning; rate limiting on login and reset.
- **Secrets:** keys, tokens, passwords or private keys in code, config, tests, history (`git log -p -S`), or client bundles; `.env` committed.
- **Input and output handling:** XSS (`dangerouslySetInnerHTML`, `innerHTML`, unescaped templates); file uploads (type, size, storage path); path traversal; open redirects; SSRF on URL fetches.
- **Deserialisation:** `pickle`, YAML `load`, Java/PHP object deserialisation of untrusted data.
- **Cryptography:** homemade crypto, static IVs, `Math.random` for tokens, disabled TLS verification.
- **Configuration:** debug mode in production config, permissive CORS (`*` with credentials), missing security headers (CSP, HSTS), verbose error pages.
- **Logging:** passwords, tokens or personal data in logs; no audit log for sensitive actions.
- **Dependencies:** known CVEs from the ecosystem audit tool; note whether the vulnerable path is actually reachable.

## 3. Efficiency

- **Database:** N+1 queries (query inside a loop or per-item resolver); missing indexes on filtered/joined columns; `SELECT *` on wide tables; unbounded queries without pagination or limits.
- **Algorithms:** nested loops over large collections, repeated work inside loops, linear lookups that should be maps/sets.
- **I/O:** synchronous file/network calls on request paths; sequential awaits that could run concurrently; no timeouts or retries on external calls.
- **Memory:** unbounded caches or arrays, large files read fully into memory, listeners or intervals never cleaned up.
- **Caching:** repeated expensive computations or fetches with no cache; caches with no invalidation.
- **Frontend:** bundle size, unused dependencies shipped to the client, unoptimised images, no code-splitting, unnecessary re-renders, layout thrashing.
- **Infrastructure in repo:** container images far larger than needed, missing compression, no CDN for static assets.

Distinguish *measured* problems from *likely* problems; recommend measuring before large optimisations.

## 4. Accessibility (UI projects, WCAG 2.2 AA)

- Semantic elements (`button`, `a`, `nav`, `main`, headings in order) instead of clickable `div`s.
- Every form control has a label; errors are announced and tied to fields (`aria-describedby`).
- Full keyboard path; visible `:focus-visible`; no `outline: none` without replacement; dialogs trap and return focus.
- Text contrast ≥ 4.5:1, large text and UI components ≥ 3:1 — compute from the design tokens, don't eyeball.
- Images have meaningful `alt` or `alt=""` if decorative; icon-only buttons have accessible names.
- ARIA used correctly (no `role="button"` on a real button, no `aria-hidden` on focusable elements).
- `lang` set on `<html>`; page titles unique; `prefers-reduced-motion` respected.
- If the project has an a11y linter (e.g. `eslint-plugin-jsx-a11y`) or test tooling (e.g. axe), run it.

## 5. Testing

- Does the suite run from a clean checkout with the documented command? Does it pass? How long does it take?
- Coverage overall and, more importantly, on critical paths: auth, payments, data writes, permission checks.
- Failure cases tested, not only happy paths (invalid input, timeouts, permission denied).
- Test quality: meaningful assertions (not just "does not throw"), no tests that always pass, minimal over-mocking, deterministic (no real time, network or order dependence).
- Test types in proportion: unit for logic, integration for boundaries, a few end-to-end for critical flows.
- CI runs tests, lint and type-check on every PR and blocks merges on failure.
- Skipped or disabled tests (`.skip`, `xit`, `@pytest.mark.skip`) — count them and check why.
