# Sample output — code-review

**Verdict:** merge after fixes (1 blocker, 1 major, 2 minor).

**[blocker]** `src/api/orders.ts:88` — `deleteOrder` no longer checks `order.userId === session.userId`.
→ Any signed-in user can delete any order by ID.
→ Restore the ownership check, and add a test that deletes another user's order and expects 403.

**[major]** `src/db/migrations/0042_add_status.sql:3` — `ALTER TABLE orders ADD COLUMN status TEXT NOT NULL` with no default.
→ Fails on the existing 120k rows in production.
→ Add `DEFAULT 'pending'`, or backfill in a separate step.

**[minor]** `src/api/orders.ts:61` — `parseInt(req.query.page)` without a radix or NaN check.
→ `?page=abc` gives `NaN` and an empty page instead of a 400.
→ Validate and default to 1.

**[minor]** `test/orders.test.ts` — the new `status` field isn't asserted anywhere.

No security issues elsewhere in the diff; the refactor of `formatTotal` looks correct.
