# Stack Selection

The goal is never "coolest tech." It's the stack this user can build, debug, deploy free or cheap, and still maintain six months from now.

## Selection rules

1. **Boring wins.** Pick the tech with the biggest docs, the most Stack Overflow answers, the largest community. When you get stuck at midnight, ecosystem size is the feature that matters.
2. **One language across the stack when possible.** TypeScript front and back beats TS + Go for a solo builder — one mental model, shared types, shared validation.
3. **Free-tier deployable by default.** Assume zero budget unless told otherwise. The stack must run on Vercel/Netlify/Cloudflare/Railway/Supabase free tiers.
4. **Match the user's ceiling.** Don't hand Kubernetes to someone shipping their first app. Complexity is a cost paid monthly, forever.
5. **Verify versions at build time.** `npm view <pkg> version`, PyPI, or official docs — then pin. Never pin a version from memory; memory is stale by definition.

## Default stacks by project type

| Project type | Default stack | Deploy |
|---|---|---|
| Static site / portfolio / landing page | Astro + Tailwind (plain HTML/CSS/JS if truly tiny) | Vercel / Netlify / Cloudflare Pages / GitHub Pages |
| Full-stack web app (auth + DB) | Next.js App Router + TypeScript + Tailwind + Postgres (Supabase or Neon) + Drizzle or Prisma + Supabase Auth or Auth.js | Vercel |
| API / backend service | Node + Fastify or Hono, OR Python + FastAPI; Postgres; Docker | Railway / Render |
| Mobile app | React Native + Expo; Supabase backend | Expo EAS |
| Realtime (chat, live boards) | Full-stack default + Supabase Realtime or Socket.IO | as above |
| AI-powered feature | Full-stack default + provider SDK — API keys server-side ONLY, streamed responses, per-user rate limits | as above |
| Internal tool / dashboard | Next.js + shadcn/ui | Vercel |
| Script / automation | Python or Node script + GitHub Actions schedule | GitHub Actions |

Present the chosen stack as a table with a one-line WHY per row. "Because it's popular" is not a why; "shared types between API and UI eliminate a whole bug class" is.

## Service picks

- **Database:** Postgres by default. SQLite for local tools and tiny apps. Mongo only when data is genuinely document-shaped — not as a default.
- **Auth:** Never hand-rolled. Supabase Auth, Auth.js, or Clerk. Rolling your own crypto is how startups end up in the news.
- **Payments:** Razorpay for India-first products, Stripe for global. Tokenized checkout only — card data never touches your server or DB.
- **Email:** Resend or SES. **Storage:** Supabase Storage, S3, or Cloudflare R2.
- **Analytics:** Plausible/Umami (privacy-light) or PostHog (product analytics).

## When to deviate — and it's fine

- The user's team already knows stack X → weight X heavily; familiarity beats theoretical superiority.
- An existing codebase → extend it, don't propose a rewrite. Rewrites are almost always the wrong first answer.
- A hard constraint (offline-first, on-prem, unusual scale) → deviate, and name the constraint explicitly in the architecture doc so the choice is traceable.

## Refuse politely

- Microservices for an MVP — that's a scaling solution to a problem that doesn't exist yet.
- The framework-of-the-month with under two years of docs — the user pays that novelty tax, not you.
- DIY auth or DIY payment handling — hard no, explain why, offer the library.
