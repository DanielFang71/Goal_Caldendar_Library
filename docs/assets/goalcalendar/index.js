"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Calendar: () => Calendar,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/a11y.ts
function applyCalendarA11y(calendarId) {
  const root = document.getElementById(calendarId);
  if (!root) return;
  const daysContainer = root.querySelector(".cjslib-days");
  if (!daysContainer) return;
  daysContainer.setAttribute("role", "grid");
  const rows = Array.from(daysContainer.querySelectorAll(".cjslib-row"));
  for (const row of rows) row.setAttribute("role", "row");
  const cells = Array.from(daysContainer.querySelectorAll(".cjslib-day"));
  for (const cell of cells) cell.setAttribute("role", "gridcell");
  const monthEl = root.querySelector(`#${calendarId}-month`);
  const yearEl = root.querySelector(`#${calendarId}-year`);
  const label = [monthEl?.textContent, yearEl?.textContent].filter(Boolean).join(" ");
  if (label) daysContainer.setAttribute("aria-label", label);
  const radios = Array.from(
    daysContainer.querySelectorAll(`input[type="radio"][name="${calendarId}-day-radios"]`)
  );
  function getActiveIndex() {
    const checkedIndex = radios.findIndex((r) => r.checked);
    return checkedIndex >= 0 ? checkedIndex : 0;
  }
  function syncTabIndexAndSelection() {
    const active = getActiveIndex();
    cells.forEach((cell, idx) => {
      cell.tabIndex = idx === active ? 0 : -1;
      const isSelected = radios[idx]?.checked ?? false;
      if (isSelected) cell.setAttribute("aria-selected", "true");
      else cell.setAttribute("aria-selected", "false");
      if (cell.classList.contains("cjslib-day-today")) cell.setAttribute("aria-current", "date");
      else cell.removeAttribute("aria-current");
    });
  }
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
  function focusCell(index) {
    const idx = clamp(index, 0, cells.length - 1);
    for (let i = 0; i < cells.length; i++) cells[i].tabIndex = i === idx ? 0 : -1;
    cells[idx]?.focus();
  }
  syncTabIndexAndSelection();
  for (const radio of radios) {
    radio.addEventListener("change", () => {
      syncTabIndexAndSelection();
    });
  }
  daysContainer.addEventListener("keydown", (e) => {
    const key = e.key;
    const activeEl = document.activeElement;
    const currentIndex = cells.findIndex((c) => c === activeEl);
    if (currentIndex < 0) return;
    let nextIndex = null;
    if (key === "ArrowRight") nextIndex = currentIndex + 1;
    if (key === "ArrowLeft") nextIndex = currentIndex - 1;
    if (key === "ArrowDown") nextIndex = currentIndex + 7;
    if (key === "ArrowUp") nextIndex = currentIndex - 7;
    if (nextIndex != null) {
      e.preventDefault();
      focusCell(nextIndex);
    }
  });
  daysContainer.addEventListener("focus", (e) => {
    if (e.target === daysContainer) focusCell(getActiveIndex());
  });
}

// src/legacy-calendar-proto.ts
var legacyProto = {
  addData: function(objs) {
    let data = {};
    for (let i = 0; i < objs.length; i++) {
      const obj = objs[i];
      let date = obj.date;
      let goal = obj.goal;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      for (let i2 = 0; i2 < 10; i2++) {
        data[date.getFullYear() + i2] = {};
        for (let j = 0; j < 12; j++) {
          data[date.getFullYear() + i2][j + 1] = {};
        }
      }
      try {
        data[year][month][day].push(goal);
      } catch (e) {
        data[year][month][day] = [];
        data[year][month][day].push(goal);
      }
    }
    return data;
  },
  createGoal: function(complete, goal, text) {
    return { complete, goal, text };
  },
  addGoalToObjs: function(date, goal) {
    this.goalsObj.push({ date, goal });
    return this.goalsObj;
  },
  changeColor: function(newColors) {
    this.colors = newColors;
  },
  changeSize: function(newSize) {
    this.size = newSize;
  },
  changeLableSetting: function(newLabelSettings) {
    this.labelSettings = newLabelSettings;
  },
  draw: function() {
    var backSvg = '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>';
    var nextSvg = '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>';
    var theCalendar = document.createElement("DIV");
    theCalendar.className = "cjslib-calendar cjslib-size-" + this.size;
    document.getElementById(this.id).appendChild(theCalendar.cloneNode(true));
    var theContainers = [], theNames = ["year", "month", "labels", "days"];
    for (var i = 0; i < theNames.length; i++) {
      theContainers[i] = document.createElement("DIV");
      theContainers[i].className = "cjslib-" + theNames[i];
      if (theNames[i] != "days") {
        if (theNames[i] != "month") {
          theContainers[i].style.backgroundColor = this.colors[1];
          theContainers[i].style.color = this.colors[3];
          if (theNames[i] != "labels") {
            var backSlider = document.createElement("DIV");
            backSlider.id = this.id + "-year-back";
            backSlider.insertAdjacentHTML("beforeend", backSvg);
            theContainers[i].appendChild(backSlider.cloneNode(true));
            var theText = document.createElement("SPAN");
            theText.id = this.id + "-" + theNames[i];
            theContainers[i].appendChild(theText.cloneNode(true));
            var nextSlider = document.createElement("DIV");
            nextSlider.id = this.id + "-year-next";
            nextSlider.insertAdjacentHTML("beforeend", nextSvg);
            theContainers[i].appendChild(nextSlider.cloneNode(true));
          }
        } else {
          theContainers[i].style.backgroundColor = this.colors[0];
          theContainers[i].style.color = this.colors[2];
          var backSlider = document.createElement("DIV");
          backSlider.id = this.id + "-month-back";
          backSlider.insertAdjacentHTML("beforeend", backSvg);
          theContainers[i].appendChild(backSlider.cloneNode(true));
          var theText = document.createElement("SPAN");
          theText.id = this.id + "-" + theNames[i];
          theContainers[i].appendChild(theText.cloneNode(true));
          var nextSlider = document.createElement("DIV");
          nextSlider.id = this.id + "-month-next";
          nextSlider.insertAdjacentHTML("beforeend", nextSvg);
          theContainers[i].appendChild(nextSlider.cloneNode(true));
        }
      }
    }
    for (var i = 0; i < this.labels.length; i++) {
      var theLabel = document.createElement("SPAN");
      theLabel.id = this.id + "-label-" + (i + 1);
      theLabel.appendChild(
        document.createTextNode(this.labels[i]).cloneNode(true)
      );
      theContainers[2].appendChild(theLabel.cloneNode(true));
    }
    var theRows = [], theDays = [], theRadios = [];
    for (var i = 0; i < 6; i++) {
      theRows[i] = document.createElement("DIV");
      theRows[i].className = "cjslib-row";
    }
    for (var i = 0, j = 0; i < 42; i++) {
      theRadios[i] = document.createElement("INPUT");
      theRadios[i].className = "cjslib-day-radios";
      theRadios[i].type = "radio";
      theRadios[i].name = this.id + "-day-radios";
      theRadios[i].id = this.id + "-day-radio-" + (i + 1);
      theDays[i] = document.createElement("LABEL");
      theDays[i].className = "cjslib-day";
      theDays[i].htmlFor = this.id + "-day-radio-" + (i + 1);
      theDays[i].id = this.id + "-day-" + (i + 1);
      var theText = document.createElement("SPAN");
      theText.className = "cjslib-day-num";
      theText.id = this.id + "-day-num-" + (i + 1);
      theDays[i].appendChild(theText.cloneNode(true));
      if (this.indicator) {
        var theIndicator = document.createElement("SPAN");
        theIndicator.className = "cjslib-day-indicator cjslib-indicator-pos-" + this.indicator_pos;
        if (this.indicator_type == 1)
          theIndicator.className += " cjslib-indicator-type-numeric";
        theIndicator.id = this.id + "-day-indicator-" + (i + 1);
        theDays[i].appendChild(theIndicator.cloneNode(true));
      }
      theRows[j].appendChild(theRadios[i].cloneNode(true));
      theRows[j].appendChild(theDays[i].cloneNode(true));
      if ((i + 1) % 7 == 0) {
        j++;
      }
    }
    for (var i = 0; i < 6; i++) {
      theContainers[3].appendChild(theRows[i].cloneNode(true));
    }
    for (var i = 0; i < theContainers.length; i++) {
      theCalendar.appendChild(theContainers[i].cloneNode(true));
    }
    document.getElementById(this.id).innerHTML = "<style>.cjslib-day-indicator { color: " + this.colors[1] + "; background-color: FFFFFF; } .cjslib-indicator-type-numeric { color: " + this.colors[2] + "; } .cjslib-day.cjslib-day-today > .cjslib-day-num { border-color: " + this.colors[1] + " !important; }</style>";
    document.getElementById(this.id).appendChild(theCalendar.cloneNode(true));
  },
  update: function() {
    document.getElementById(
      this.id + "-year"
    ).innerHTML = this.date.getFullYear();
    document.getElementById(this.id + "-month").innerHTML = this.months[this.date.getMonth()];
    for (var i = 1; i <= 42; i++) {
      document.getElementById(this.id + "-day-num-" + i).innerHTML = "";
      document.getElementById(this.id + "-day-" + i).className = this.id + " cjslib-day cjslib-day-listed";
    }
    var firstDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      1
    ).getDay();
    var lastDay = new Date(
      this.date.getMonth() + 1 > 11 ? this.date.getFullYear() + 1 : this.date.getFullYear(),
      this.date.getMonth() + 1 > 12 ? 0 : this.date.getMonth() + 1,
      0
    ).getDate();
    var previousLastDay = new Date(
      this.date.getMonth() < 0 ? this.date.getFullYear() - 1 : this.date.getFullYear(),
      this.date.getMonth() < 0 ? 11 : this.date.getMonth(),
      0
    ).getDate();
    this.initday = this.label.indexOf(this.defaultLabels[firstDay]);
    var firstDayLabel = this.defaultLabels[firstDay];
    var firstDayLabelPos = this.label.indexOf(firstDayLabel);
    for (var i = 0, j = previousLastDay; i < firstDayLabelPos; i++, j--) {
      document.getElementById(
        this.id + "-day-num-" + (firstDayLabelPos - i)
      ).innerHTML = j;
      document.getElementById(
        this.id + "-day-" + (firstDayLabelPos - i)
      ).className = this.id + " cjslib-day cjslib-day-diluted";
    }
    for (var i = 1; i <= lastDay; i++) {
      document.getElementById(
        this.id + "-day-num-" + (firstDayLabelPos + i)
      ).innerHTML = i;
      if (i == this.date.getDate())
        document.getElementById(
          this.id + "-day-radio-" + (firstDayLabelPos + i)
        ).checked = true;
      if (this.date.getMonth() == this.today.getMonth()) {
        if (i == this.today.getDate())
          document.getElementById(
            this.id + "-day-" + (firstDayLabelPos + i)
          ).className += " cjslib-day-today";
      }
    }
    for (var i = lastDay + 1, j = 1; firstDayLabelPos + i <= 42; i++, j++) {
      document.getElementById(
        this.id + "-day-num-" + (firstDayLabelPos + i)
      ).innerHTML = j;
      document.getElementById(
        this.id + "-day-" + (firstDayLabelPos + i)
      ).className = this.id + " cjslib-day cjslib-day-diluted";
    }
  },
  setupBlock: function(blockId, calendarInstance, callback) {
    document.getElementById(
      calendarInstance.id + "-day-" + blockId
    ).onclick = function() {
      if (document.getElementById(calendarInstance.id + "-day-num-" + blockId).innerHTML.length > 0) {
        calendarInstance.changeDateTo(
          document.getElementById(calendarInstance.id + "-day-num-" + blockId).innerHTML,
          blockId
        );
        callback();
      }
    };
  },
  setOnClickListener: function(theCase, backCallback, nextCallback) {
    var calendarId = this.id;
    backCallback = backCallback || function() {
    };
    nextCallback = nextCallback || function() {
    };
    var calendarInstance = this;
    switch (theCase) {
      case "days-blocks":
        for (var i = 1; i <= 42; i++) {
          calendarInstance.setupBlock(i, calendarInstance, backCallback);
        }
        break;
      case "month-slider":
        document.getElementById(
          calendarId + "-month-back"
        ).onclick = function() {
          calendarInstance.back("month");
          backCallback();
        };
        document.getElementById(
          calendarId + "-month-next"
        ).onclick = function() {
          calendarInstance.next("month");
          nextCallback();
        };
        break;
      case "year-slider":
        document.getElementById(calendarId + "-year-back").onclick = function() {
          calendarInstance.back("year");
          backCallback();
        };
        document.getElementById(calendarId + "-year-next").onclick = function() {
          calendarInstance.next("year");
          nextCallback();
        };
        break;
    }
  }
};
var legacy_calendar_proto_default = legacyProto;

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
var warnedLegacyConstructor = false;
var Calendar = class {
  constructor(a, size, labelSettings, colors, options) {
    let id;
    let _size;
    let _labelSettings;
    let _colors;
    let _options;
    let theme = normalizeTheme(void 0);
    if (typeof a === "string") {
      if (!warnedLegacyConstructor) {
        warnedLegacyConstructor = true;
        console.warn(
          "[goalcalendar] Legacy positional constructor is deprecated. Prefer new Calendar({ containerId, ...options })."
        );
      }
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
    this.applyA11y?.();
  }
};
Object.assign(Calendar.prototype, legacy_calendar_proto_default);
var calendar_default = Calendar;
Calendar.prototype.applyA11y = function applyA11y() {
  applyCalendarA11y(this.id);
};
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
function parseIsoDateKey(key) {
  const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(key);
  if (!m) throw new Error(`Invalid date key: ${key} (expected YYYY-MM-DD)`);
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  return new Date(y, mo - 1, d);
}
Calendar.prototype.setData = function setData(data) {
  this.goalsObj = [];
  const createGoal = this.createGoal;
  const addGoalToObjs = this.addGoalToObjs;
  const addData = this.addData;
  const keys = Object.keys(data);
  for (const key of keys) {
    const items = data[key] || [];
    const date = parseIsoDateKey(key);
    for (const item of items) {
      const complete = item.complete ?? 0;
      const goal = item.goal ?? 0;
      const text = item.text;
      addGoalToObjs.call(this, date, createGoal.call(this, complete, goal, text));
    }
  }
  this.data = addData.call(this, this.goalsObj);
  this.update();
};

// src/index.ts
var index_default = calendar_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar
});
