# Remove Day Entry

## Summary
When Boo opens the modal for a day she already logged, show a "Remove Entry" button so she can clear it back to unlogged.

## Approach
- Add DELETE `/api/entries` endpoint (accepts `{ date }` in body, deletes by date+userId)
- Add `deleteEntry` to entry.service.ts
- DayModal: show a "Remove Entry" button only when an existing entry is passed in
- useCalendar: add `deleteEntry` handler that calls API + removes from local state
- Hard delete (not soft delete) — keeps it simple, no reason to retain cleared data

## One question
Should the remove button require a confirmation tap, or just remove immediately? My recommendation: remove immediately — it's easy to re-log a day, so a confirmation step adds friction for no real safety gain.

## Files Modified
- `src/domain/entry.ts` — add DeleteEntrySchema
- `src/domain/entry.service.ts` — add deleteEntry function
- `src/app/api/entries/route.ts` — add DELETE handler
- `src/components/DayModal.tsx` — add Remove Entry button + onDelete prop
- `src/viewmodels/useCalendar.ts` — add deleteEntry handler
- `src/components/Calendar.tsx` — pass deleteEntry to DayModal

## Tests
- `src/__tests__/domain/entry.test.ts` — DeleteEntrySchema validation
- `src/__tests__/components/DayModal.test.tsx` — remove button shown/hidden, calls onDelete
- `e2e/entry-flow.spec.ts` — remove entry flow

## Checklist
- [ ] Add DeleteEntrySchema + tests
- [ ] Add deleteEntry service function
- [ ] Add DELETE API handler
- [ ] Update DayModal with Remove button + tests
- [ ] Update useCalendar with deleteEntry
- [ ] Update Calendar to wire it up
- [ ] Update E2E tests
- [ ] Run all tests green
