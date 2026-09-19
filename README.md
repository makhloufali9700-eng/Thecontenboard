# The Bridge Content Board

A content-planning and performance-tracking tool for **The Bridge by Ali** (Instagram/TikTok, Arabic content). Replaces an earlier localStorage-based prototype with a real backend so ideas, scripts, and metrics persist reliably across devices.

## Stack

- Next.js (App Router) + TypeScript
- Prisma + SQLite for persistent storage
- Tailwind CSS v4

## Data model

A single `Idea` entity carries the type/trigger/status/format tags, the summary and full script, and — once an idea is shot or posted — its post status, five performance metrics, and free-form notes. See `prisma/schema.prisma`.

## Getting started

```bash
npm install
npx prisma db push      # creates prisma/dev.db from the schema
npm run db:seed         # loads the 28 seed ideas
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Views

- **Board** (`/`) — every idea except Shot/Posted, as cards or a dense editable table. Filter by type, trigger, status. Every keystroke autosaves.
- **Performance** (`/performance`) — Shot and Posted ideas only, script next to its metrics, for side-by-side review.
- **Analytics** (`/analytics`) — counts and bar breakdowns by type/trigger/status. Parked ideas are excluded entirely.

## Notes

- Title, summary, script, and notes fields use `dir="auto"` so Arabic renders right-to-left automatically while the rest of the UI stays left-to-right.
- Edits are saved via a short debounce (not on blur), plus a flush on tab-close/hide, so nothing is lost if you navigate away mid-edit.
- `prisma/dev.db` is gitignored — regenerate it with the commands above.
