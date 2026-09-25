# Testing Strategy

Tests exist to let you change code without fear. Test what breaks the business; skip what doesn't. Read this in Phase 5 of a build or for any QA-mode task.

## The pragmatic pyramid

1. **Unit tests (many, milliseconds)** — pure logic: pricing math, validation schemas, date handling, parsers, formatters. Vitest for TS, pytest for Python.
2. **Integration tests (some)** — API routes against a test database. Does the route reject unauthenticated calls? Reject malformed input? Return only the caller's rows?
3. **E2E tests (few, gold)** — the 3–5 "money flows" in Playwright: signup → core action → (payment if any). If these pass, the product fundamentally works. If only these exist, that's still a respectable baseline for an MVP.

## What NOT to test

Implementation details (internal state, private functions), third-party libraries (they have their own tests), styling, trivial getters. Chasing a coverage percentage is vanity; covering the critical paths is the metric.

## Write tests that mean something

- Name = behavior: `rejects expired coupon`, not `test3`. Failing test names should read like a bug report.
- Arrange–Act–Assert, one behavior per test.
- Hit the unhappy paths hardest: empty input, huge input, malformed input, duplicates, unauthorized access. Happy paths rarely break; edges always do.
- Deterministic: no real network calls, fake timers instead of real clocks, seeded fixture data. A flaky test is worse than no test — it trains everyone to ignore red.

## Honesty protocol

RUN the suite and paste the real summary output — pass/fail counts, not a description of them. A test that can't be fixed right now gets an explicit `skip` with a TODO and a sentence to the user, never silent deletion. Never report results that weren't produced; fabricated green is the one unforgivable QA sin.

## Pre-ship manual QA (ten minutes, catches what automation misses)

- [ ] Fresh clone → follow the README quickstart exactly — does it actually run?
- [ ] Full flow on a 375px mobile viewport
- [ ] One pass with network throttled to slow 3G
- [ ] Refresh mid-flow; hit the back button — does state survive sanely?
- [ ] Double-click every submit button — duplicates created?
- [ ] Log out, log back in — session and data intact?
