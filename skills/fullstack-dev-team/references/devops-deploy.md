# DevOps & Shipping

Deployment is a feature. An app that only runs on localhost doesn't exist yet. Read this for Phase 7 or any SHIP-mode task.

## Environments

`local → preview (per-PR) → production`. Separate env vars per environment, separate databases — local code pointed at production data is an incident waiting for a keystroke.

## CI — GitHub Actions baseline

Every push and PR: install → lint → typecheck → test → build. Starter workflow (adapt commands to the actual stack, and verify action versions are current before committing):

```yaml
name: ci
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test -- --run
      - run: npm run build
```

A red CI that blocks merge is worth more than any amount of "be careful."

## Where to deploy

| What | Where | Notes |
|---|---|---|
| Static site | Vercel / Netlify / Cloudflare Pages / GitHub Pages | zero-config, free |
| Next.js full-stack | Vercel | native platform, preview deploys per PR |
| Container / API / worker | Railway / Render / Fly.io | free tiers cold-start — note it in the README |
| Postgres | Supabase / Neon | free tiers fine for MVP |
| Mobile | Expo EAS | build + store submission |
| Cron / scheduled jobs | GitHub Actions `schedule` or host-native cron | free |

## Database migrations

Schema changes travel ONLY through migration files (`drizzle-kit`, `prisma migrate`, `alembic`) — committed to git, applied on deploy. Hand-editing a production schema is untracked, unrepeatable, and unrollbackable. Prefer expand-contract: add the new column first, migrate data, drop the old one in a later release.

## Launch checklist

- [ ] Production env vars set on the host — diffed against `.env.example` so nothing's missing
- [ ] Custom domain connected, HTTPS live (automatic on the hosts above)
- [ ] Error monitoring wired (Sentry free tier) — launching without it is launching blind
- [ ] Uptime ping configured (UptimeRobot or a scheduled action)
- [ ] Backup story known: what's backed up, how it restores
- [ ] The deployed URL opened in a browser and the core flow clicked through — never announce a link that hasn't been loaded

## Rollback

Know the undo BEFORE deploying, not during the outage: Vercel/Railway/Render support instant rollback to the previous deployment from the dashboard. Databases are why migrations stay additive-first. Write the one-line rollback instruction into the README's deploy section.
