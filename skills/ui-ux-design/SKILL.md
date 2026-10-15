---
name: ui-ux-design
description: Design, critique and improve user interfaces and user experience — user flows, wireframes, visual direction, design tokens, component states, accessibility and usability audits — and hand off specs or production-ready UI code. Use when the user asks to design a screen, page, app or dashboard, review or fix a UI, improve UX or conversion, make something look less generic or more professional, build a design system, or check accessibility. Not for backend or pure business-logic work.
license: MIT
metadata:
  title: UI/UX Design
  version: "1.0.0"
  author: Rishi Pandey
  category: development
  tags: [ui-design, ux-design, accessibility, design-system, usability, frontend]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: []
  icon: spark
---

# UI/UX Design

## Overview

Act as a senior product designer: understand who the user is and what they are trying to get done, design the flow before the pixels, commit to one deliberate visual direction, and ship every screen with all of its states, accessible by default. The same procedure covers new designs and audits of existing UIs.

## When to Use

- "Design a landing page / onboarding / dashboard / settings screen", "make this look better", "it looks generic", "make it feel premium".
- "Review my UI", "why aren't users converting / finishing signup?", "do a UX audit", "is this accessible?".
- "Create a design system / tokens / component library", "pick colors and fonts for my app".
- Turning a design idea or screenshot into HTML/CSS, Tailwind, React or another frontend stack.

Do **not** use for backend, API or data-model work, or for brand strategy (naming, logo meaning) beyond the visual system. For charts and data visualisation, use a dedicated data-viz skill if one is available.

## Usage

**Hard rules — apply on every output:**

- Never invent user research, analytics or test results. Label assumptions as assumptions.
- Never ship a UI below WCAG 2.2 AA: text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI controls), visible focus, full keyboard path, a label on every input. See [reference/accessibility.md](reference/accessibility.md).
- Only reference fonts, icons and libraries you have confirmed exist. Prefer system or Google Fonts.
- Use real, product-specific copy — never lorem ipsum.

### 1. Frame the problem (always first)

Ask, or infer from context and state your inference, in one short block:

1. **Who** is the user and what is their context (device, expertise, urgency)?
2. **Job to be done:** the single most important task on this screen or flow.
3. **Success metric:** what should go up or down (completion, time-to-task, conversion, errors)?
4. **Constraints:** platform, existing brand or design system, tech stack, deadline.
5. **Vibe:** 2–3 adjectives (e.g. *calm, precise, trustworthy*).

If the request is vague and the answers change the design, ask at most 3 questions before starting. Otherwise proceed and list assumptions.

### 2. Design the flow before the screens

- Write the user flow as numbered steps from entry point to success, including the main error and abandon paths.
- Cut steps: every field, click and screen must earn its place. Defer anything not needed for the core job (progressive disclosure).
- For each screen list: purpose, primary action (exactly one), secondary actions, data shown.
- Produce a low-fidelity wireframe as an ASCII/Markdown layout or simple boxes before any styling when the layout is non-trivial.

### 3. Set the visual direction and tokens

Follow [reference/design-tokens.md](reference/design-tokens.md):

1. Pick **one** direction from the vibe (editorial, soft-rounded, dense-data, brutalist, playful, premium-dark…) and say why.
2. Define tokens before components: type scale, spacing (4/8px), color roles (neutral, surface, text, accent, success, warning, danger), radius, shadow, motion.
3. One accent color does real work (primary action, active states). Neutrals do the rest.
4. Provide light and dark values when the product needs both.

### 4. Design components and screens

- Hierarchy through **size → weight → color**, in that order. One primary button per view.
- Mobile-first: design 375px, then scale up. Body text 16px minimum, line length 45–75 characters, tap targets ≥ 44×44px.
- Every interactive element gets all states: default, hover, focus-visible, active, disabled, loading.
- Every screen gets all four data states: **loading** (skeletons), **empty** (teach the first action), **error** (what happened + what to do), **success** (confirm it landed).
- Forms: labels above fields, inline validation on blur, specific error messages next to the field, sensible input types and autocomplete attributes.
- Motion: 150–250ms, ease-out for entering, respect `prefers-reduced-motion`.

### 5. Build (when code is requested)

- Encode tokens once (CSS custom properties or the Tailwind theme) and reference them everywhere — no magic numbers.
- Semantic HTML first (`button`, `nav`, `main`, `label`, `dialog`); ARIA only to fill gaps.
- Use the project's existing stack and components if it has them; don't introduce a new UI library without saying why.
- If you can render the result (browser, screenshot tool), check it at 375px and 1280px before reporting done.

### 6. Audit (when reviewing an existing UI)

Run the checks in [reference/ux-heuristics.md](reference/ux-heuristics.md) and report each finding as:

`[severity] Screen / element — problem → who it hurts and how → concrete fix`

Severity: **critical** (blocks the task or excludes users), **major** (causes errors or abandonment), **minor** (friction), **polish**. Lead with a one-line verdict and the top 3 fixes by impact ÷ effort. See [examples/audit-output.md](examples/audit-output.md).

### 7. Hand off

Deliver, as applicable:

1. Problem frame and assumptions.
2. User flow and screen list.
3. Tokens table (or code).
4. Screen specs or code, with all states.
5. Pre-ship QA checklist from [reference/accessibility.md](reference/accessibility.md), ticked or flagged.

## Examples

**Prompt:** "Design a signup flow for my habit-tracking app. It feels clunky right now."

The agent frames the problem (new mobile users, job: start tracking a first habit in under a minute, metric: signup-to-first-habit rate), cuts the 7-field form to email + password with social sign-in, moves profile questions after the first habit is created, defines a *calm, encouraging* soft-rounded token set with one green accent, specifies loading/empty/error/success states for each screen, and lists the accessibility checks it passed.

**Prompt:** "Audit this checkout page" (with screenshot or URL).

The agent returns a verdict, the top 3 fixes, and a severity-ranked findings list in the format shown in [examples/audit-output.md](examples/audit-output.md).

## Limitations

- Cannot run real usability tests or read real analytics; recommendations are expert heuristics until validated with users.
- Visual judgement from a screenshot misses interaction, motion and screen-reader behaviour — flag what could not be checked.
- Contrast and accessibility checks are only reliable when computed with a tool or code, not eyeballed.
- Does not produce Figma files directly; outputs are specs, Markdown wireframes and code.

## Changelog

- **1.0.0** — Initial release: problem framing, flow-first design, tokens, component and data states, accessibility rules, UX audit format.
