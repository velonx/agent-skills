# Example: UX audit output

**Prompt:** "Audit our checkout page — mobile conversion is low." (screenshot of a 375px checkout attached)

---

**Verdict:** Needs work — three issues likely cause most mobile drop-off; none needs a redesign.

**Assumptions:** Mostly first-time mobile buyers; no analytics were shared, so impact estimates are heuristic.

**Top 3 fixes (impact ÷ effort):**

1. Move the "Pay now" button above the fold and make it the only filled button.
2. Offer guest checkout; ask for account creation on the confirmation page.
3. Show shipping cost in the order summary before the address step.

**Findings:**

- `[critical] Payment form / card number field — no visible label, placeholder disappears on typing → screen-reader users hear "edit text" and sighted users lose context mid-entry → add a visible <label>, keep the placeholder as a format hint ("1234 5678 9012 3456").`
- `[critical] Pay now button — #9ca3af text on #e5e7eb (1.9:1) → fails WCAG AA and reads as disabled → use --accent background with --accent-fg text (≥ 4.5:1).`
- `[major] Account step — mandatory account creation before payment → adds 3 fields and a password rule at the moment of highest commitment → make guest checkout the default.`
- `[major] Shipping cost — revealed only after address entry → surprise cost is a leading cause of abandonment → show "Shipping: from ₹49" in the summary from the start.`
- `[minor] Promo code field — expanded by default above payment → draws attention and sends users off to search for codes → collapse behind a "Have a promo code?" link.`
- `[minor] Address form — no autocomplete attributes → users retype data the browser already has → add autocomplete="shipping street-address", "postal-code", etc.`
- `[polish] Error state — "Error 402" on a declined card → users don't know what to do → "Your card was declined. Try another card or check the details with your bank."`

**Could not check:** keyboard order, screen-reader announcements and loading behaviour (static screenshot only).

**QA checklist:** contrast ✗, labels ✗, tap targets ✓ (48px), 375px layout ✓, error copy ✗, keyboard — not tested.
