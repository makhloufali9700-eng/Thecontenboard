# The Bridge Content Board

A content-planning and performance-tracking tool for **The Bridge by Ali** (Instagram/TikTok, Arabic content). Replaces an earlier localStorage-based prototype with a real backend so ideas, scripts, and metrics persist reliably across devices.

## Stack

- Next.js (App Router) + TypeScript
- Prisma + PostgreSQL for persistent storage
- Tailwind CSS v4

## Data model

A single `Idea` entity carries the type/trigger/status/format tags, the summary and full script, and — once an idea is shot or posted — its post status, five performance metrics, and free-form notes. See `prisma/schema.prisma`.

## Deploying (Vercel + Neon Postgres)

No terminal required beyond the initial `git push` — this is meant to be reachable from a phone/tablet browser.

1. Create a free Postgres database at [neon.tech](https://neon.tech) and copy its connection string.
2. Import this repo into [vercel.com](https://vercel.com), on the `claude/bridge-content-board-app-82ybtr` branch.
3. In the Vercel project's Environment Variables, add `DATABASE_URL` set to the Neon connection string (Production, Preview, and Development).
4. Deploy. The build runs `prisma db push`, which creates the tables in your Postgres database automatically.
5. Open the deployed URL — the first request to an empty database auto-populates it with the 28 seed ideas (see `src/lib/ensureSeeded.ts`). No manual seed step needed.

## Local development

```bash
npm install
# set DATABASE_URL in .env to a reachable Postgres instance (e.g. a Neon connection string)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the database auto-seeds on first load, same as in production.

## Views

- **Board** (`/`) — every idea except Shot/Posted, as cards or a dense editable table. Filter by type, trigger, status. Every keystroke autosaves.
- **Performance** (`/performance`) — Shot and Posted ideas only, script next to its metrics, for side-by-side review.
- **Analytics** (`/analytics`) — counts and bar breakdowns by type/trigger/status. Parked ideas are excluded entirely.

## Notes

- Title, summary, script, and notes fields use `dir="auto"` so Arabic renders right-to-left automatically while the rest of the UI stays left-to-right.
- Edits are saved via a short debounce (not on blur), plus a flush on tab-close/hide, so nothing is lost if you navigate away mid-edit.
- `prisma/seed.mjs` (`npm run db:seed`) is still available for manually resetting a database back to the original 28 ideas.
