# Goal Calendar Library (CSC309 project)

[![CI](https://github.com/DanielFang71/Goal_Caldendar_Library/actions/workflows/ci.yml/badge.svg)](https://github.com/DanielFang71/Goal_Caldendar_Library/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/goalcalendar)](https://www.npmjs.com/package/goalcalendar)

A UofT CSC309-era JavaScript calendar component with a **water-filling animation** inside day cells to visualize/encourage goal progress.

## Live demos

- Legacy demo (original static pages): https://danielfang71.github.io/Goal_Caldendar_Library/
- Modern docs/demo: https://danielfang71.github.io/Goal_Caldendar_Library/docs/
- Modern usage (npm API): https://danielfang71.github.io/Goal_Caldendar_Library/docs/usage.html

## Legacy vs modern API

- **Modern (recommended, npm)**: `new Calendar({ containerId, ... })` + `setData()`
- **Legacy (demo pages)**: `new Calendar(id, size, labelSettings, colors, options)` + `createGoal/addGoalToObjs/addData`

> The legacy API remains for compatibility with the original CSC309 project pages.

This repo contains:
- an **npm package** (`goalcalendar`) built into `dist/`
- a **demo site** served by a tiny Express server (`npm start`)

---

## What it looks like

**Gallery**

![Gallery](docs/assets/gallery.jpg)

**Calendar + water-fill + organizer**

![Example calendar](docs/assets/example6.png)

---

## Quickstart (run the demo locally)

```bash
npm install
npm start
```

Open:
- http://localhost:5000/ (intro)
- http://localhost:5000/gallery.html (examples gallery)
- http://localhost:5000/snippets.html (copy/paste snippets)
- http://localhost:5000/examples6.html (calendar + organizer)

---

## Install as a library (npm package)

> Note: this repo is prepared as a publishable npm package, but publishing to npm is optional.

```bash
npm install goalcalendar
```

### Minimal usage (classic theme)

```ts
import { Calendar } from 'goalcalendar'
import 'goalcalendar/style.css'

new Calendar({
  containerId: 'calendarContainer',
  // defaults:
  // theme: 'classic'
  // size: 'large'
  // startOfWeek: 'Monday'
})
```

### Modern theme + progress-driven water fill

```ts
import { Calendar } from 'goalcalendar'
import 'goalcalendar/style.css'
import 'goalcalendar/modern.css'

const cal = new Calendar({
  containerId: 'calendarContainer',
  theme: 'modern',
})

// Example progress (complete/goal => 0..1)
cal.setFillFromRatio(10 / 12)
```

### Data API (`setData`)

```ts
import { Calendar } from 'goalcalendar'
import 'goalcalendar/style.css'

const cal = new Calendar({ containerId: 'calendarContainer' })

cal.setData({
  '2026-01-01': [{ text: 'Gym', complete: 1, goal: 1 }],
  '2026-01-02': [{ text: 'Read', complete: 1, goal: 2 }],
})
```

### Water-fill customization (CSS variables)

You can customize the animation via CSS variables set on the calendar container:
- `--goalcal-fill-color`
- `--goalcal-fill-speed`
- `--goalcal-fill-start`
- `--goalcal-fill-end`

### Theme customization (CSS variables)

The library also exposes `--gcl-*` variables on `.cjslib-calendar` to make theming easier
(background, borders, text colors, hover styles, etc.).

---

## Project structure (high-level)

- `server.js` — demo server
- `pub/` — legacy demo pages + assets
- `src/` — package source (TypeScript wrapper + types)
- `dist/` — built package output (ESM + CJS + DTS + css)
- `tests/` — vitest tests
- `docs/` — req/plan/status + screenshots

---

## Notes / background

This is an older project. The refresh plan and progress are tracked here:
- `docs/REQ.md`
- `docs/WORKING_PLAN.md`
- `docs/STATUS.md`
