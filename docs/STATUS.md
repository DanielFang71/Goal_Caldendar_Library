# Status

## Current PR
- PR#2 (P1): Package-ize (build + exports)

## Last updated
- 2026-01-26

## Progress
### PR#1 (P0): Docs + Quickstart
- [x] Merged

### PR#2 (P1): npm package structure
- [x] Create `src/` and move library code there (keep `pub/` as demo)
- [x] Add build via `tsup` → outputs `dist/` (ESM + CJS)
- [x] Add minimal `.d.ts` stubs for Calendar public surface (temporary; proper typing in P2)
- [x] Update `package.json` entrypoints/exports for npm consumption
- [x] Keep `server.js` as demo server (not package entry)
- [ ] Open PR

## Next
- Open PR#2.
- After merge: P2 types + tests.
