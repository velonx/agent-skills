# Scoring Rubric

Score each applicable dimension from 0 to 10. Pick the band whose description fits best, then adjust ±1 for evidence on either side. Mark dimensions that do not apply as *n/a* — never score them 0.

| Score | Meaning |
|---|---|
| 9–10 | Exemplary. No high or critical findings; strong practices enforced by tooling or CI. |
| 7–8 | Solid. No critical findings, at most a few highs with clear fixes; good habits mostly consistent. |
| 5–6 | Mixed. Some highs or many mediums; practices exist but are applied inconsistently. |
| 3–4 | Weak. A critical finding or many highs; important practices missing. |
| 0–2 | Failing. Multiple criticals, or the dimension is essentially absent (e.g. no tests at all). |

## Severity definitions

| Severity | Definition | Examples |
|---|---|---|
| **critical** | Exploitable now, causes data loss, or blocks core use | SQL injection on a public route; live secret in repo; no auth on admin API; checkout unusable by keyboard |
| **high** | Likely to cause incidents, outages or exclusion soon | Missing ownership checks; N+1 on the main page; zero tests on payments; unlabelled signup form |
| **medium** | Real cost to maintainability, performance or users, not urgent | Duplicated business logic; unbounded list endpoint; flaky tests |
| **low** | Polish and hygiene | Naming inconsistencies; minor dead code; missing README section |

## Overall score

- Overall = mean of applicable dimension scores, one decimal.
- If any **critical security** finding is open, cap the overall at **4.0** and say so.
- Report the score next to a one-line verdict: *healthy* (≥ 8), *needs attention* (5–7.9), *at risk* (< 5).
