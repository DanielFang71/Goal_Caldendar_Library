# Working Plan (token-safe / resumable)

This plan is written to be resumable if the agent run is interrupted.

## Conventions
- Each phase is its own PR:
  - PR#1: P0 docs + demo usability
  - PR#2: P1 library build/exports
  - PR#3: P2 types + tests
- Always update `docs/STATUS.md` before finishing a work session.

## PR#1 (P0): Docs + Quickstart

### Checkpoint P0.0 — Baseline
- [ ] Confirm repo structure and existing demo entrypoints.
- [ ] Confirm how to run locally.

### Checkpoint P0.1 — README overhaul
- [ ] Add `Quickstart` section (install + run server + open pages).
- [ ] Add `What is this?` section.
- [ ] Add `Project structure` section.
- [ ] Add `API overview` section (Calendar constructor + key methods).
- [ ] Add `Demo pages` section (index/gallery/api/examples).

### Checkpoint P0.2 — Small paper-cuts
- [ ] Fix obvious typos in README (Calendar spelling, etc.) without renaming repo.
- [ ] Ensure the `npm start` script works (server port, instructions).

### Checkpoint P0.3 — Open PR
- [ ] Commit changes.
- [ ] Push branch.
- [ ] Open PR to `main` with clear summary.

## PR#2 (P1): Library build/exports
(TBD after P0 is reviewed/merged)

## PR#3 (P2): Types + tests
(TBD after P1 is reviewed/merged)
