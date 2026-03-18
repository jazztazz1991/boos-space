# Growing Vines Feature

## Summary
Add decorative vines on the left and right sides of the calendar that grow leaves based on the number of good days logged in the current month. Each good day adds a leaf to the vine, creating a visual "garden growing" effect that rewards positive days.

## Approach
- Create a `GrowingVine` component that renders an SVG vine with a variable number of leaves
- Leaves appear along the vine from bottom to top as good days accumulate
- Max leaves = days in month, actual leaves = number of good (non-binge) days
- Subtle grow-in animation when leaves appear
- One vine on each side of the calendar card (mirrored)
- Pass `goodDays` and `totalDays` as props from the Calendar component

## Files
- `src/components/GrowingVine.tsx` — New component
- `src/components/Calendar.tsx` — Integrate vines on sides
- `src/__tests__/components/GrowingVine.test.tsx` — RTL tests
- `src/styles/globals.css` — Add leaf grow animation

## Checklist
- [x] Add leaf-grow animation to globals.css
- [x] Create GrowingVine component
- [x] Add RTL tests for GrowingVine
- [x] Integrate into Calendar component
- [x] Verify build and tests pass
