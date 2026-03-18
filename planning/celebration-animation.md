# Celebration Animation — Bloom + Leaf Shower

## Summary
When the user saves a "Good Day" entry, two animations play:
1. **Bloom** — The day cell pulses with a golden ring and the icon scales up briefly
2. **Leaf shower** — Several leaf SVGs drift down from the top of the screen with gentle sway, fading out before reaching the bottom

## Approach
- Create a `LeafShower` component that renders animated falling leaves using CSS keyframes
- Track a "just celebrated" date key in the calendar state to trigger the bloom on the specific cell
- Bloom is a CSS animation applied conditionally to the CalendarDay that was just saved
- Leaf shower is rendered as a fixed overlay, auto-removes after animation completes (~3s)
- Only triggers on Good Day saves, not Tough Day

## Files
- `src/components/LeafShower.tsx` — Falling leaves overlay
- `src/components/CalendarDay.tsx` — Add bloom animation class
- `src/components/Calendar.tsx` — Wire up celebration trigger
- `src/viewmodels/useCalendar.ts` — Track celebratingDate state
- `src/styles/globals.css` — Add bloom + leaf-fall keyframes
- `src/__tests__/components/LeafShower.test.tsx` — RTL test

## Checklist
- [ ] Add bloom + leaf-fall keyframes to globals.css
- [ ] Create LeafShower component
- [ ] Add celebratingDate state to useCalendar
- [ ] Add bloom class to CalendarDay
- [ ] Wire celebration into Calendar on good day save
- [ ] Add RTL tests
- [ ] Verify build and tests pass
