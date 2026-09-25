# UI/UX Playbook

Design before code. Retrofitting design onto a built UI doubles the work and halves the result. This file is read in Phase 2 of a full build, or any time the user asks for design help.

## Kill the generic AI look

Symptoms: purple-to-blue gradient hero, Inter on white cards, emoji section headers, everything centered, lorem ipsum, three identical feature cards with stock icons. Users can smell it instantly. The antidote:

1. **Pick ONE distinct direction** from the vibe adjectives collected in Phase 0 — e.g. editorial, brutalist, soft and rounded, dense-data, playful, premium-dark. Commit to it everywhere.
2. **One accent color doing real work** (primary actions, active states), neutrals for everything else. Two accents is a decision; five is a mess.
3. **Real copy from the first draft.** Write actual microcopy for the actual product — button labels, empty states, error messages. Placeholder text hides bad layout.
4. **A deliberate type pairing.** One display face with character for headings, one workhorse for body. Verify the fonts exist on Google Fonts before referencing them.

## Design tokens — define first, code second

- **Type scale:** pick a ratio (1.25 is safe) and derive sizes — e.g. 13 / 16 / 20 / 25 / 31 / 39px. Never freehand font sizes mid-build.
- **Spacing:** 4/8px system only. Every margin and padding is a multiple of 4. Randomness in spacing reads as sloppiness even when nobody can name why.
- **Color:** 60-30-10 (dominant / secondary / accent). Body text contrast ≥ 4.5:1 against its background — check it with a contrast tool, don't eyeball it.
- **Radius and shadow:** pick one personality (sharp, soft, or pill) and apply it consistently. Mixed radii scream "assembled from snippets."

Encode tokens as CSS variables or the Tailwind theme — one source of truth, changed in one place.

## Layout rules

- Mobile-first: design the 375px view, then expand. The reverse produces broken phones.
- Reading width: 65–75 characters max for body text.
- Whitespace is a feature. When a layout feels off, add space before adding elements.
- Hierarchy through size → weight → color, in that order. If everything is bold, nothing is.

## The four-states rule

Every screen ships with four designed states, because users will hit all four:

1. **Loading** — skeletons over spinners; they preserve layout and feel faster.
2. **Empty** — teach the first action ("No invoices yet — create your first one"), never a blank void.
3. **Error** — say what happened and what to do next, in human words. Never raw error dumps.
4. **Success** — confirm the action landed.

A happy-path-only design is half a design.

## Accessibility non-negotiables

Semantic HTML first (`<button>`, not a div with onClick), a label on every input, visible focus states, a complete keyboard path through every flow, alt text on meaningful images, the contrast minimum above, and `prefers-reduced-motion` respected. This is table stakes, not a feature — and it's most of what makes a UI feel professional.

## Micro-interactions and perceived speed

- Transitions 150–250ms; anything longer feels laggy, anything instant feels broken.
- Buttons get all five states: default, hover, active, disabled, loading.
- Optimistic UI for actions that almost always succeed (likes, toggles) — update immediately, reconcile in the background, roll back on failure.

## Pre-ship design QA

- [ ] Clean at 375px width
- [ ] Survives 200% text zoom
- [ ] Full keyboard-only pass completed
- [ ] All four states reachable and styled on every screen
- [ ] Squint test: blur your eyes — is the hierarchy still obvious?
