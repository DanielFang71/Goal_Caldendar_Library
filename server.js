/* server.js - Express server (demo site)
 *
 * NOTE (P1): This server is for the demo pages only.
 * The npm package entrypoint is built to dist/ via `npm run build`.
 */
"use strict";
const log = console.log;

const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "/pub")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/index.html"));
});

// legacy demo routes
for (let i = 1; i <= 9; i++) {
  app.get(i === 1 ? "/examples.html" : `/examples${i}.html`, (req, res) => {
    res.sendFile(path.join(__dirname + `/pub/example${i === 1 ? "" : i}.html`));
  });
}

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`GoalCalendar demo server listening on port ${port}...`);
});
