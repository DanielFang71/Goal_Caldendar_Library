# Goal Calendar Library (CSC309 project)

A UofT CSC309-era JavaScript calendar component with a **water-filling animation** inside day cells to visualize/encourage goal progress.

This repo currently ships as a **demo site** (served by a tiny Express server) + the library code living under `pub/`.

## Quickstart (run locally)

**Prereqs:** Node.js (any reasonably modern version should work).

```bash
npm install
npm start
```

Then open:
- http://localhost:5000/ (intro page)
- http://localhost:5000/gallery.html (examples gallery)
- http://localhost:5000/api.html (API page)

There are also multiple standalone demo pages:
- http://localhost:5000/examples.html
- http://localhost:5000/examples2.html
- ...
- http://localhost:5000/examples9.html

## Project structure

- `server.js` — Express server to host the demo pages.
- `pub/` — static demo site + the “library” code
  - `pub/js/calendar.js` — **core Calendar implementation**
  - `pub/css/calendar.css` — styles + the **water-filling** CSS animation
  - `pub/index.html` — intro
  - `pub/gallery.html` — demo gallery
  - `pub/api.html` — API documentation page
  - `pub/example*.html` + `pub/js/example*.js` — demo configurations

## API overview (high-level)

The library exposes a global constructor:

```js
const calendar = new Calendar(
  "calendarContainer", // container element id
  "large",             // size: small | medium | large
  ["Monday", 3],        // label settings: start day + label length
  ["#4CAF50", "#4CAF50", "#FFFFFF", "#FFFFFF"], // theme colors
  {
    // optional: placeholder, months[], days[]
  }
);
```

Some notable methods (see code in `pub/js/calendar.js`):
- `createGoal(complete, goal, text)`
- `addGoalToObjs(date, goal)`
- `addData(objs)`
- `changeColor(newColors)`
- `changeSize(newSize)`

## Notes (2026 refresh)

This is an older project. A small refresh plan is tracked here:
- `docs/REQ.md`
- `docs/WORKING_PLAN.md`
- `docs/STATUS.md`

## Screenshot / demo

TODO: add a screenshot or GIF of the water-filling animation.
