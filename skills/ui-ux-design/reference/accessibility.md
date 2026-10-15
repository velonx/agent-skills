# Accessibility and Pre-ship QA

Target: WCAG 2.2 level AA. Accessibility is most of what makes a UI feel professional — treat it as a baseline, not a feature.

## Non-negotiables

- **Contrast:** text ≥ 4.5:1; large text (≥ 24px, or ≥ 18.66px bold) and UI components/focus indicators ≥ 3:1.
- **Semantics:** native elements first — `<button>` for actions, `<a>` for navigation, real headings in order, landmarks (`header`, `nav`, `main`, `footer`).
- **Labels:** every input has a visible `<label>`; placeholders are hints, not labels. Icon-only buttons get an accessible name.
- **Keyboard:** every flow completes with keyboard alone; logical tab order; no keyboard traps; `Esc` closes dialogs and focus returns to the trigger.
- **Focus:** a visible `:focus-visible` style on every interactive element; never `outline: none` without a replacement.
- **Targets:** at least 24×24px (WCAG 2.2 minimum); aim for 44×44px on touch.
- **Color alone** never carries meaning — add text, icons or patterns.
- **Images:** meaningful images have alt text; decorative ones use `alt=""`.
- **Motion:** respect `prefers-reduced-motion`; nothing flashes more than 3 times per second; no autoplaying motion longer than 5 seconds without a pause control.
- **Errors:** identify the field, describe the problem in text, suggest the fix; announce dynamic messages with `aria-live`.
- **Zoom and reflow:** usable at 200% text zoom and at 320px width without horizontal scrolling.

## Pre-ship QA checklist

- [ ] Clean at 375px and 1280px widths
- [ ] Survives 200% text zoom
- [ ] Full keyboard-only pass completed
- [ ] Every interactive element has hover, focus-visible, active, disabled and loading states
- [ ] Loading, empty, error and success states reachable and styled on every screen
- [ ] All text/background pairs pass contrast (checked with a tool)
- [ ] Every input labelled; every error specific and next to its field
- [ ] Screen-reader spot check of the primary flow (VoiceOver, NVDA or TalkBack)
- [ ] `prefers-reduced-motion` and dark mode (if supported) verified
- [ ] Squint test: blur your eyes — is the primary action still obvious?
