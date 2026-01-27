# Notes (how to use + what changed)

## What this repo is
- Originally a UofT CSC309 course project (demo + library-like code).
- Refreshed to be consumable as an **npm package** while still keeping the legacy demo site.

## Two ways to use

### 1) Run the demo
```bash
npm install
npm start
```
Then open:
- http://localhost:5000/gallery.html
- http://localhost:5000/snippets.html
- http://localhost:5000/examples6.html

### 2) Use as a package
```bash
npm install goalcalendar
```
Then:
```ts
import { Calendar } from 'goalcalendar'
import 'goalcalendar/style.css'

new Calendar({ containerId: 'calendarContainer' })
```

## Water-fill animation
The water-fill is controlled via CSS variables:
- `--goalcal-fill-color`
- `--goalcal-fill-speed`
- `--goalcal-fill-start`
- `--goalcal-fill-end`

In addition, you can call:
- `calendar.setFillFromRatio(complete/goal)`

## Modern theme (opt-in)
- Import `goalcalendar/modern.css`
- Add `goalcal-theme-modern` class to the container
