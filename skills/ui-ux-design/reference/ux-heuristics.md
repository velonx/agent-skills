# UX Heuristics for Audits

Walk the primary flow as the target user, then check each heuristic. Record findings in the audit format from `SKILL.md`.

## Nielsen's 10 usability heuristics

1. **Visibility of system status** — feedback within ~100ms; progress shown for anything over 1s.
2. **Match with the real world** — the user's words, not internal jargon or database field names.
3. **User control and freedom** — undo, cancel, back; destructive actions confirmable or reversible.
4. **Consistency and standards** — same thing looks and behaves the same everywhere; follow platform conventions.
5. **Error prevention** — constraints, sensible defaults, confirmation before irreversible actions.
6. **Recognition over recall** — options visible; don't make users remember data between screens.
7. **Flexibility and efficiency** — shortcuts and bulk actions for experts without burdening novices.
8. **Aesthetic and minimalist design** — every element competes for attention; remove what doesn't serve the job.
9. **Help users recover from errors** — plain language, precise cause, constructive next step.
10. **Help and documentation** — contextual, searchable, task-focused.

## Laws worth checking

- **Hick's law:** more choices → slower decisions. Reduce or group options; highlight a recommended one.
- **Fitts's law:** important targets big and close to where the pointer or thumb already is.
- **Jakob's law:** users expect your product to work like the ones they already use.
- **Miller / chunking:** group long content (phone numbers, settings) into small chunks.
- **Peak-end rule:** invest in the most intense moment and the final step (confirmation, success).
- **Doherty threshold:** responses under ~400ms keep users in flow; use optimistic UI where safe.

## Conversion and friction checks

- Is the primary action the most visually dominant element above the fold?
- Count fields, clicks and screens to complete the core job. What can be removed, defaulted or deferred?
- Are costs, commitments and next steps clear before the user commits (pricing, shipping, data use)?
- Are trust signals present where anxiety peaks (payment, personal data)?
- No dark patterns: no pre-ticked consent, confirmshaming, hidden costs or hard-to-cancel flows.

## Content checks

- Headings say what the user gets, not what the company does.
- Button labels are verbs describing the outcome ("Create invoice", not "Submit").
- Empty states explain value and offer the first action.
- Error messages never blame the user and never show raw codes alone.
