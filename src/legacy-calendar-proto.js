// Legacy prototype methods extracted from the original pub/js/calendar.js.
//
// This file is intentionally plain JS for now to keep the diff small.
// P2 focuses on: options constructor + types + tests + theming knobs.

// NOTE: We load the original source file at build-time and export the prototype
// object we need.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const path = require('path')

const legacyPath = path.join(__dirname, '..', 'pub', 'js', 'calendar.js')
const src = fs.readFileSync(legacyPath, 'utf8')

// Execute the legacy file in a sandbox where `Calendar` is a function.
// This is a pragmatic bridge for P2.

function Calendar() {}

// eslint-disable-next-line no-new-func
const fn = new Function('Calendar', `${src}; return Calendar.prototype;`)

module.exports = fn(Calendar)
