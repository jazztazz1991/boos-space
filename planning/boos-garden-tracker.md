# Boo's Garden — Daily Wellness Tracker

## Summary
A personal wellness tracking app for "Boo" (the user's wife) to log daily binge eating habits via a beautiful calendar interface. The site is themed around **houseplants and botanical illustrations** inspired by the watercolor/greenery calendar aesthetic from the reference images. The title will be **"Boo's Garden"** — a cozy, personal name that frames daily tracking as tending a garden, with no reference to binge eating in branding.

## Tech Stack
- **Framework**: Next.js 14 (App Router at `src/app/`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (no inline styles per architecture rules)
- **Auth**: NextAuth.js with Credentials provider (username/password)
- **Database**: SQLite via Prisma ORM (lightweight, no external DB needed)
- **Testing**: Jest + React Testing Library (unit/component), Playwright (E2E)

## Theme & Design Direction
Inspired by the reference calendar images:
- **Color palette**: Soft sage greens, warm cream/ivory backgrounds, muted dusty rose, leaf/moss greens, touches of gold/amber
- **Botanical elements**: Leaf/vine decorative borders, subtle plant illustrations, watercolor-style accents via CSS gradients and shadows
- **Typography**: Clean serif for headings (via Google Fonts — Playfair Display), sans-serif body (Inter)
- **Calendar style**: Clean grid with soft rounded cards, gentle shadows, plant-themed status indicators (🌿 good day, 🥀 tough day)
- **Overall feel**: Warm, nurturing, private, like a personal garden journal

## Architecture

### Directory Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout — imports globals.css
│   ├── page.tsx                # Redirects to /calendar or /login
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── calendar/
│   │   └── page.tsx            # Main calendar view (protected)
│   └── api/
│       ├── auth/[...nextauth]/
│       │   └── route.ts        # NextAuth API route
│       └── entries/
│           └── route.ts        # CRUD for calendar entries
├── domain/
│   ├── entry.ts                # Entry type & validation
│   └── entry.service.ts        # Business logic for entries
├── components/
│   ├── Calendar.tsx             # Calendar grid component
│   ├── CalendarDay.tsx          # Individual day cell
│   ├── DayModal.tsx             # Modal for viewing/editing a day
│   ├── PlantIcon.tsx            # Decorative plant SVG components
│   └── AuthGuard.tsx            # Protects routes requiring auth
├── viewmodels/
│   └── useCalendar.ts           # Calendar state & derived data
├── lib/
│   ├── auth.ts                  # NextAuth config
│   ├── prisma.ts                # Prisma client singleton
│   └── utils.ts                 # Date helpers
├── styles/
│   └── globals.css              # Tailwind directives + custom theme
└── __tests__/
    ├── domain/
    │   ├── entry.test.ts
    │   └── entry.service.test.ts
    └── components/
        ├── Calendar.test.tsx
        ├── CalendarDay.test.tsx
        └── DayModal.test.tsx
e2e/
├── login.spec.ts
├── calendar.spec.ts
└── entry-flow.spec.ts
prisma/
└── schema.prisma
```

### Data Model (Prisma)
```prisma
model User {
  id       String  @id @default(cuid())
  username String  @unique
  password String  // bcrypt hashed
  entries  Entry[]
}

model Entry {
  id        String   @id @default(cuid())
  date      DateTime @unique
  didBinge  Boolean
  notes     String?
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Key Design Decisions
1. **SQLite** — This is a personal single-user app; no need for Postgres. Simple file-based DB.
2. **Credentials provider only** — No OAuth needed; simple username/password for privacy.
3. **Single user seeded** — We'll seed one user account (Boo) rather than having a registration flow. This keeps it simple and private.
4. **Calendar as primary view** — Month grid is the main interface. Click a day to toggle status and add notes.
5. **Plant metaphor for status** — A thriving leaf (🌿) for good days, a wilted flower (🥀) for tough days. Unmarked days show a seed (🌱) to encourage logging.

### API Routes
- `GET /api/entries?month=2026-03` — Fetch all entries for a month
- `POST /api/entries` — Create/update an entry for a specific date
- All routes require authentication middleware
- Input validated with Zod schemas
- Returns minimal DTOs (no raw DB objects)

## Files to Create/Modify
- `package.json` — New (Next.js project init)
- `tailwind.config.ts` — Custom houseplant theme colors
- `prisma/schema.prisma` — Data model
- `prisma/seed.ts` — Seed default user
- `src/app/layout.tsx` — Root layout with globals.css import
- `src/app/page.tsx` — Root redirect
- `src/app/login/page.tsx` — Login page
- `src/app/calendar/page.tsx` — Calendar page
- `src/app/api/auth/[...nextauth]/route.ts` — Auth endpoint
- `src/app/api/entries/route.ts` — Entries CRUD endpoint
- `src/domain/entry.ts` — Entry types + validation
- `src/domain/entry.service.ts` — Entry business logic
- `src/components/*.tsx` — All UI components
- `src/viewmodels/useCalendar.ts` — Calendar view model
- `src/lib/*.ts` — Auth config, Prisma client, utilities
- `src/styles/globals.css` — Global styles + Tailwind
- `src/__tests__/**` — Unit + RTL tests
- `e2e/**` — Playwright E2E tests
- `scripts/assert-globals-import.ts` — Lint script per GLOBAL_STYLE rule

## Checklist
- [x] Initialize Next.js project with TypeScript + Tailwind
- [x] Set up Prisma schema + SQLite + seed script
- [x] Configure NextAuth.js with credentials provider
- [x] Create domain types and validation (entry.ts)
- [x] Create entry service with tests (entry.service.ts + tests)
- [x] Create API routes with auth middleware + input validation
- [x] Create globals.css with houseplant theme
- [x] Create root layout importing globals.css
- [x] Create login page with botanical styling
- [x] Create Calendar component + RTL tests
- [x] Create CalendarDay component + RTL tests
- [x] Create DayModal component + RTL tests
- [x] Create useCalendar view model
- [x] Create AuthGuard component
- [x] Create PlantIcon decorative components
- [x] Wire up calendar page with all components
- [x] Create assert-globals-import script
- [x] Add E2E tests (login, calendar, entry flow)
- [x] Run all tests and verify build
- [x] Seed database with default user
