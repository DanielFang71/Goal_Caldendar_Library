/* server.js - Express server*/
"use strict";
const log = console.log;
log("Express server");

const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "/pub")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/index.html"));
});

app.get("/examples.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example.html"));
});

app.get("/examples2.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example2.html"));
});

app.get("/examples3.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example3.html"));
});

app.get("/examples4.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example4.html"));
});

app.get("/examples5.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example5.html"));
});

app.get("/examples6.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example6.html"));
});

app.get("/examples7.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example7.html"));
});

app.get("/examples8.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example8.html"));
});

app.get("/examples9.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/example9.html"));
});

app.get("/pub/css/calendar.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/css/calendar.css"));
});

app.get("/pub/js/calendar.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/calendar.js"));
});

app.get("/pub/js/example.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example.js"));
});
app.get("/pub/js/example2.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example2.js"));
});
app.get("/pub/js/example3.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example3.js"));
});
app.get("/pub/js/example4.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example4.js"));
});
app.get("/pub/js/example5.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example5.js"));
});
app.get("/pub/js/example6.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example6.js"));
});
app.get("/pub/js/example7.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example7.js"));
});
app.get("/pub/js/example8.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example8.js"));
});
app.get("/pub/js/example9.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/pub/js/example9.js"));
});

// Error codes
app.get("/problem", (req, res) => {
  // You can indicate a status code to send back
  // by default it is 200, but it's up to you
  // if you want to send something
  res.status(500).send("There was a problem on the server");

  // don't send nonsense status codes like this one:
  //res.status(867).send('There was a problem on the server')
});

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
}); // localhost development port 5000  (http://localhost:5000)
// We've bound that port to localhost to go to our express server.
// Must restart web server when you make changes to route handlers.
