# Goal_Caldendar_Library — Refresh Req (P0/P1/P2)

> Owner: Ruikai Fang (DanielFang71)
> 
> This repo is a UofT CSC309-era project. The goal of this refresh is to make it easier to understand, run, and (optionally) evolve into a reusable JS library.

## Non-goals
- Do **not** rewrite the library into React/Vue/etc in this refresh.
- Do **not** change the core UX/visual design unless needed for clarity.
- Do **not** publish to npm in P0 (can be considered in P1).

## Scope by phase

### P0 — Make it easy to run + easy to understand (docs + demo)
**Success criteria**
- A new reader can run the demo locally in \< 2 minutes.
- README clearly explains:
  - what the project is
  - what the “library API” is at a high level
  - how to run demos
  - where the core code lives
- Add a minimal “screenshot/gif placeholder” section in README.

**Deliverables**
- Updated `README.md` with:
  - Quickstart
  - Demo pages list
  - API entry point summary (Calendar constructor + common methods)
  - Project structure map
- A `docs/WORKING_PLAN.md` with clear checkpoints.
- A `docs/STATUS.md` that tracks what’s done + what’s next.

### P1 — Library-ize (clean separation + build + exports)
**Success criteria**
- Demo site and library code are separated (`src/` vs `demo/` or similar).
- Package entrypoint exports the library (not `server.js`).
- Provide ESM (and optionally CJS) builds in `dist/`.
- Basic config for bundling (e.g., tsup/rollup/vite library mode).

### P2 — Modernize API + types + basic tests
**Success criteria**
- Typed public API (TypeScript or JSDoc types).
- Convert constructor to options object (reduce positional args).
- Add basic unit tests for date math (month boundaries, leap year, start-of-week).

