# Debugging Protocol

Debugging is a search problem. Random changes — "shotgun debugging" — expand the search space; this protocol shrinks it until the bug has nowhere left to hide.

## The seven steps

1. **Read the whole error.** Bottom-up for JS and Python stack traces. The answer is literally in the message more than half the time; skimming it is the most common debugging failure.
2. **Reproduce reliably.** A bug that can't be reproduced can't be verified as fixed. Find the smallest input/sequence that triggers it.
3. **Isolate.** Binary-search the surface: comment out half, `git bisect` across commits, or build a minimal repro file. Each cut halves the suspects.
4. **Inspect actual state.** Log or breakpoint at the boundary where good data turns bad. Log the VALUE (`console.log({ user })`), not breadcrumbs (`"here 1"`).
5. **One hypothesis, one change.** Test a single cause with a single edit. Wrong? Revert fully, next hypothesis. Stacked guesses create second bugs on top of the first.
6. **Fix the root cause.** If the fix feels like a patch over a mystery, keep digging — an ununderstood fix is a rescheduled bug.
7. **Lock it in.** Add a regression test, and record the cause in the commit: `fix(cart): clamp qty to >=1 (race between click handler and state update)`.

## Common classes — symptom → first check

| Symptom | Check first |
|---|---|
| `undefined is not a function` / `NoneType has no attribute` | Data shape ≠ assumption. Log the object at the boundary it crossed. |
| Works locally, dies in prod | Missing env vars, dev-vs-prod build mode, case-sensitive imports on Linux. |
| CORS error | Server-side headers/origin config. The fix is never in the frontend. |
| Async weirdness / intermittent | Missing `await`, state set after unmount, two writes racing. |
| Hydration mismatch (Next.js) | Non-deterministic render: `Date.now()`, `Math.random()`, or a browser-only API in server-rendered code. |
| Infinite re-render (React) | Unstable object/function in a dependency array. |
| 401/403 loops | Cookie flags, token expiry, server clock skew. |
| "It worked yesterday" | `git diff` yesterday..today. Did the lockfile change? Did a dependency update? |

## Anti-hallucination while debugging

Never invent an explanation for an error that hasn't been verified. If the trace points into a library's internals, read that library's actual docs or issue tracker before theorizing. "I don't know yet — let me check X" is a professional sentence; a confident wrong diagnosis costs the user hours.

## Stuck for 30+ minutes

- Rubber-duck it in writing: state what you expected, what happened, what's been ruled out. The act of writing finds the gap surprisingly often.
- Check that installed versions match the docs being read.
- Build a 20-line minimal repro — this alone resolves half of all stuck states.
- Search the exact error text in quotes.
- Then ask the user for the missing context (full error, the actual file, env details) instead of guessing around the hole.
