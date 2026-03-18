# PWA Setup

## Summary
Convert Boo's Garden into a Progressive Web App so it can be installed on iPhone home screen like a native app. Uses a photo of the user's dog as the app icon.

## Approach
- Add web app manifest with app name, theme colors, and icon
- Add meta tags for iOS standalone mode
- Generate icon sizes from the dog photo (192x192, 512x512)
- Add a basic service worker for offline splash/caching

## Files
- `public/manifest.json` — PWA manifest
- `public/icons/` — App icons generated from dog photo
- `public/sw.js` — Service worker
- `src/app/layout.tsx` — Add manifest link + iOS meta tags

## Checklist
- [ ] Create icon files from dog photo
- [ ] Create manifest.json
- [ ] Create service worker
- [ ] Update layout.tsx with PWA meta tags
- [ ] Verify build passes
