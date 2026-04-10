# Extra Self Care Day — 3rd Day Type

## Summary
Add a third day type option ("Extra Self Care") alongside the existing "Good Day" and "Tough Day". This includes a data model migration from boolean to enum, a new orchid/lavender color palette, an over-the-top petal burst celebration animation, and updated UI across the modal, calendar cells, stats, and legend.

## Why
The app currently only captures two states — good or tough. "Extra Self Care" gives Boo a way to celebrate days she intentionally prioritized self-care, with a premium visual feel that makes it feel special and rewarding.

## Data Model Change

**Current:** `didBinge: Boolean`
**New:** `dayType: DayType` enum with values `GOOD`, `TOUGH`, `SELF_CARE`

Prisma enum added to schema, migration run, service/DTO/schema all updated.

The `didBinge` column is dropped and replaced. No backward compatibility shim — this is a clean cut.

## Technical Approach

### 1. Database + Domain Layer
- Add `DayType` enum to Prisma schema (`GOOD`, `TOUGH`, `SELF_CARE`)
- Replace `didBinge Boolean` with `dayType DayType` on Entry model
- Migration: add enum + column, backfill existing rows (`didBinge=true` -> `TOUGH`, `didBinge=false` -> `GOOD`), drop old column
- Update `entry.ts`: `CreateEntrySchema` uses `z.enum(["GOOD", "TOUGH", "SELF_CARE"])`, `EntryDTO` uses `dayType: string`
- Update `entry.service.ts`: `toDTO`, `upsertEntry`, `getEntriesForMonth` all reference `dayType`
- Update `route.ts`: no structural changes needed (schema validation handles it)

### 2. Orchid Color Palette (globals.css)
New palette added to `@theme`:
```
--color-orchid-50 through orchid-600
```
Lavender/purple tones: `#f3eef8`, `#e8dff5`, `#d1c0ea`, `#b89bdb`, `#9b7fc4`, `#7f62ab`

### 3. DayModal UI
- Change from `didBinge: boolean` state to `dayType: "GOOD" | "TOUGH" | "SELF_CARE"` state
- Layout: 2-column top row (Good Day / Tough Day), full-width row below (Extra Self Care) spanning both columns
- Self Care button: orchid palette, gradient border (lavender-to-pink shimmer), 🌸 emoji
- When Self Care selected: notes placeholder changes to "What are you doing to take care of yourself today?"
- `onSave` signature changes from `(dateKey, didBinge, notes)` to `(dateKey, dayType, notes)`

### 4. CalendarDay Updates
- `getStatusIcon`: return "🌸" for `SELF_CARE`
- `getStatusLabel`: return "Self care day" for `SELF_CARE`
- `getBgClasses`: return orchid-50/orchid-100 for `SELF_CARE`

### 5. Calendar Stats + Legend
- Stats bar: add `🌸 N self care` counter
- Legend: add orchid dot for "Self care day"
- Stat calculation: count entries where `dayType === "SELF_CARE"`

### 6. Celebration: Petal Burst Animation
New component `PetalShower.tsx` (sibling to `LeafShower.tsx`):
- Triggered when saving a Self Care day (instead of leaf shower)
- ~15 animated flower petals (pink, lavender, soft gold) burst from center, drift outward and down
- CSS keyframes only (`transform` + `opacity` — GPU-accelerated, no `filter` or `box-shadow` on particles)
- Sparkle dots: 8-10 tiny star shapes that twinkle (scale + opacity pulse) and fade out
- Duration: ~3.5s total, same pattern as LeafShower cleanup
- Calendar cell gets `animate-bloom` (already exists) with orchid-tinted glow variant

New CSS keyframes in globals.css:
- `@keyframes petalBurst` — radial outward drift with rotation
- `@keyframes sparkle` — scale pulse + fade
- `@keyframes shimmer` — gradient border animation for the Self Care button

### 7. useCalendar ViewModel
- `saveEntry` signature: `(dateKey, dayType, notes)` instead of `(dateKey, didBinge, notes)`
- Celebration logic: leaf shower for `GOOD`, petal shower for `SELF_CARE`, nothing for `TOUGH`
- New state: `showPetalShower` + `clearPetalShower`
- API call body: `{ date, dayType, notes }`

### 8. GrowingVine
- Check if it needs updating — currently counts `goodDays`. Self care days should also count as positive for vine growth.

## Files Modified
- `prisma/schema.prisma` — enum + field change
- `prisma/migrations/XXXXXX_add_day_type_enum/migration.sql` — generated
- `src/domain/entry.ts` — schema + DTO
- `src/domain/entry.service.ts` — toDTO, upsert, query
- `src/app/api/entries/route.ts` — no structural change (passes through)
- `src/styles/globals.css` — orchid palette, new keyframes
- `src/components/DayModal.tsx` — 3-button layout, dayType state
- `src/components/CalendarDay.tsx` — 3rd status handling
- `src/components/Calendar.tsx` — stats, legend, petal shower integration
- `src/viewmodels/useCalendar.ts` — dayType in save, petal shower state

## Files Created
- `src/components/PetalShower.tsx` — celebration animation for self care days

## Files Updated (Tests)
- `src/__tests__/domain/entry.test.ts` — schema now validates dayType enum
- `src/__tests__/components/DayModal.test.tsx` — 3rd button, dayType state
- `src/__tests__/components/CalendarDay.test.tsx` — self care icon/label/colors
- `src/__tests__/components/Calendar.test.tsx` — stats include self care count, legend entry
- `src/__tests__/components/PetalShower.test.tsx` — new (mirrors LeafShower tests)
- `e2e/entry-flow.spec.ts` — add self care day logging flow

## Checklist
- [x] Write/update unit tests for domain schema (dayType enum validation)
- [x] Update Prisma schema: add DayType enum, replace didBinge with dayType
- [x] Run migration (with backfill of existing data)
- [x] Update entry.ts (schema + DTO)
- [x] Update entry.service.ts (toDTO, upsert, getEntriesForMonth)
- [x] Write/update unit tests for DayModal (3rd button, dayType)
- [x] Write/update unit tests for CalendarDay (self care icon/label)
- [x] Add orchid color palette to globals.css
- [x] Add new CSS keyframes (petalBurst, sparkle, shimmer)
- [x] Update DayModal component (3-option layout, orchid styling, dynamic placeholder)
- [x] Update CalendarDay component (self care status)
- [x] Create PetalShower component + tests
- [x] Update useCalendar viewmodel (dayType, petal shower state)
- [x] Update Calendar component (stats, legend, petal shower)
- [x] Update Calendar tests (stats, legend)
- [x] Update e2e/entry-flow.spec.ts (self care day flow)
- [x] Run all tests and verify green (87/87 pass, 0 TS errors)
