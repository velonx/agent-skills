# Design Tokens

Define tokens first and code second. One source of truth, changed in one place.

## Avoid the generic AI look

Symptoms: purple-to-blue gradient hero, Inter on white cards, emoji headings, everything centered, three identical feature cards with stock icons, lorem ipsum. Fixes:

1. Commit to one visual direction and apply it everywhere.
2. One accent color doing real work; everything else neutral.
3. A deliberate type pairing: a display face with character for headings, a workhorse for body (or one well-chosen family with weight contrast).
4. Asymmetry and density chosen on purpose, not centered-by-default.
5. Real content and copy from the first draft.

## Type scale

Pick a ratio and derive sizes. Never freehand sizes mid-build.

| Ratio | Feel | Example sizes (px, base 16) |
|---|---|---|
| 1.125 | Dense, data-heavy apps | 14 / 16 / 18 / 20 / 23 / 26 |
| 1.25 | Safe default | 13 / 16 / 20 / 25 / 31 / 39 |
| 1.333 | Editorial, marketing | 12 / 16 / 21 / 28 / 38 / 50 |

- Body line-height 1.5–1.6; headings 1.1–1.3.
- Use at most 2 families and 3–4 weights.

## Spacing

4/8px system: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Related items sit closer together than unrelated ones (proximity). When a layout feels off, add space before adding elements.

## Color roles

Name tokens by role, not hue, so themes can change without renaming:

| Token | Use |
|---|---|
| `--bg` / `--surface` / `--surface-raised` | Page, cards, popovers |
| `--text` / `--text-muted` | Body text, secondary text (both ≥ 4.5:1 on their surface) |
| `--border` | Dividers, input outlines (≥ 3:1 for input borders) |
| `--accent` / `--accent-fg` | Primary actions, links, active state |
| `--success` / `--warning` / `--danger` | Status; never rely on color alone — pair with icon or text |

- Proportion: roughly 60% dominant neutral, 30% secondary, 10% accent.
- Dark mode is not inverted light mode: lower saturation, raise surfaces with lighter tones instead of shadows, avoid pure `#000` backgrounds and pure `#fff` text.

## Radius, shadow, motion

- Radius personality: sharp (0–4px), soft (8–12px) or pill (full). Apply consistently; nested radius = outer radius − padding.
- Shadows: 2–3 elevation levels only.
- Motion: `--duration-fast: 150ms`, `--duration-base: 200ms`, `--duration-slow: 300ms`; ease-out for entering, ease-in for leaving.

## Example (CSS custom properties)

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --text-sm: 0.8125rem; --text-base: 1rem; --text-lg: 1.25rem;
  --text-xl: 1.5625rem; --text-2xl: 1.9375rem;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px;
  --bg: #faf9f7; --surface: #ffffff; --text: #1c1b19; --text-muted: #5c5a55;
  --border: #8a877f; --accent: #2f6b4f; --accent-fg: #ffffff;
  --danger: #b42318; --success: #1f7a4d; --warning: #8a5a00;
  --radius: 10px; --duration-base: 200ms;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #161614; --surface: #1f1f1c; --text: #ecebe7; --text-muted: #a9a69f;
    --border: #6f6c65; --accent: #6cc59a; --accent-fg: #0d1f16;
  }
}
```

Verify every text/background pair with a contrast checker before shipping.
