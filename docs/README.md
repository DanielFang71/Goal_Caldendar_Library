# Docs / Demo (GitHub Pages)

This folder is the source for the GitHub Pages demo.

- Entry: `docs/index.html`
- The workflow copies `docs/` into the Pages artifact and also copies the latest `dist/*` into `assets/goalcalendar/`.

Local preview:

```bash
npm ci
npm run build
node server.js
```

(For GitHub Pages, we deploy as a static site; `server.js` is only for local dev.)
