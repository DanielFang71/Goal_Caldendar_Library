"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/legacy-calendar-proto.js
var require_legacy_calendar_proto = __commonJS({
  "src/legacy-calendar-proto.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var legacyPath = path.join(__dirname, "..", "pub", "js", "calendar.js");
    var src = fs.readFileSync(legacyPath, "utf8");
    function Calendar2() {
    }
    var fn = new Function("Calendar", `${src}; return Calendar.prototype;`);
    module2.exports = fn(Calendar2);
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Calendar: () => Calendar,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/calendar.ts
var DEFAULT_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var DEFAULT_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function normalizeTheme(theme) {
  const classic = {
    primary: "#4CAF50",
    primaryDark: "#4CAF50",
    text: "#FFFFFF",
    textDark: "#FFFFFF",
    fillColor: "#00acee",
    fillSpeed: "7s"
  };
  const modern = {
    primary: "#111827",
    // slate-900
    primaryDark: "#0B1220",
    text: "#F9FAFB",
    textDark: "#F9FAFB",
    fillColor: "#3B82F6",
    // blue-500
    fillSpeed: "6.5s"
  };
  const base = theme === "modern" ? modern : classic;
  if (!theme || typeof theme === "string") return base;
  return { ...base, ...theme };
}
function buildLegacyArgsFromOptions(opts) {
  const size = opts.size ?? "large";
  const startOfWeek = opts.startOfWeek ?? "Monday";
  const labelLen = opts.labelLength ?? 3;
  const t = normalizeTheme(opts.theme);
  const colors = [
    t.primary,
    t.primaryDark,
    t.text,
    t.textDark
  ];
  const legacyOptions = {};
  if (opts.placeholder != null) legacyOptions.placeholder = opts.placeholder;
  if (opts.months) legacyOptions.months = opts.months;
  if (opts.days) legacyOptions.days = opts.days;
  return {
    id: opts.containerId,
    size,
    labelSettings: [startOfWeek, labelLen],
    colors,
    options: legacyOptions,
    theme: t
  };
}
var Calendar = class {
  constructor(a, size, labelSettings, colors, options) {
    let id;
    let _size;
    let _labelSettings;
    let _colors;
    let _options;
    let theme = normalizeTheme(void 0);
    if (typeof a === "string") {
      id = a;
      _size = size;
      _labelSettings = labelSettings;
      _colors = colors;
      _options = options;
    } else {
      const mapped = buildLegacyArgsFromOptions(a);
      id = mapped.id;
      _size = mapped.size;
      _labelSettings = mapped.labelSettings;
      _colors = mapped.colors;
      _options = mapped.options;
      theme = mapped.theme;
    }
    const container = document.getElementById(id);
    if (!container) throw new Error(`Calendar container not found: ${id}`);
    if (typeof a !== "string") {
      container.style.setProperty("--goalcal-fill-color", theme.fillColor);
      container.style.setProperty("--goalcal-fill-speed", theme.fillSpeed);
    }
    this.id = id;
    this.size = _size;
    this.labelSettings = _labelSettings;
    this.colors = _colors;
    this.initday = 0;
    _options = _options || {};
    this.indicator = true;
    this.indicator_type = 1;
    this.indicator_pos = "bottom";
    this.goalsObj = [];
    const listPlaceholder = document.createElement("LI");
    listPlaceholder.className = "cjslib-list-placeholder";
    listPlaceholder.appendChild(document.createTextNode("No goals on this day"));
    listPlaceholder.style.cssText = "text-align: center; padding: 20px 0px;";
    this.placeholder = listPlaceholder.outerHTML;
    if (_options.placeholder != void 0) this.placeholder = _options.placeholder;
    let months = [...DEFAULT_MONTHS];
    if (_options.months != void 0 && _options.months.length == 12) months = _options.months;
    let label = [...DEFAULT_DAYS];
    if (_options.days != void 0 && _options.days.length == 7) label = _options.days;
    this.months = months;
    this.defaultLabels = label;
    this.label = [];
    this.labels = [];
    for (let i = 0; i < 7; i++) {
      this.label.push(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label[
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label.indexOf(_labelSettings[0]) + this.label.length >= label.length ? Math.abs(label.length - (label.indexOf(_labelSettings[0]) + this.label.length)) : label.indexOf(_labelSettings[0]) + this.label.length
        ]
      );
    }
    for (let i = 0; i < 7; i++) {
      this.labels.push(this.label[i].substring(0, _labelSettings[1]));
    }
    this.date = /* @__PURE__ */ new Date();
    this.today = /* @__PURE__ */ new Date();
    this.history = [];
    this.draw();
    this.update();
    this.setOnClickListener("days-blocks");
    this.setOnClickListener("month-slider");
    this.setOnClickListener("year-slider");
  }
};
var legacy = require_legacy_calendar_proto();
Object.assign(Calendar.prototype, legacy);
var calendar_default = Calendar;
Calendar.prototype.setFillFromRatio = function setFillFromRatio(ratio) {
  const percent = Math.max(0, Math.min(1, ratio)) * 100;
  const root = document.getElementById(this.id);
  if (!root) return;
  const startPx = 20;
  const endPx = 0;
  const range = startPx - endPx;
  const base = startPx - range * (percent / 100);
  const wiggle = Math.max(2, Math.round(range * 0.2));
  root.style.setProperty("--goalcal-fill-start", `${base}px`);
  root.style.setProperty("--goalcal-fill-end", `${Math.max(0, base - wiggle)}px`);
};

// src/index.ts
var index_default = calendar_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar
});
