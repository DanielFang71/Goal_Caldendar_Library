// Auto-generated (one-time) from pub/js/calendar.js
// Goal: remove runtime eval/new Function.

export type LegacyProto = Record<string, any>

const legacyProto: LegacyProto = {
  addData: function(objs) {
  let data = {};
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    let date = obj.date;
    let goal = obj.goal;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    for (let i = 0; i < 10; i++) {
      data[date.getFullYear() + i] = {};
      for (let j = 0; j < 12; j++) {
        data[date.getFullYear() + i][j + 1] = {};
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
  return { complete: complete, goal: goal, text: text };
  },
  addGoalToObjs: function(date, goal) {
  this.goalsObj.push({ date: date, goal: goal });
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
  var backSvg =
    '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' +
    this.colors[3] +
    '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>';
  var nextSvg =
    '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' +
    this.colors[3] +
    '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>';

  var theCalendar = document.createElement("DIV");
  theCalendar.className = "cjslib-calendar cjslib-size-" + this.size;

  document.getElementById(this.id).appendChild(theCalendar.cloneNode(true));

  var theContainers = [],
    theNames = ["year", "month", "labels", "days"];
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

  var theRows = [],
    theDays = [],
    theRadios = [];
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
      theIndicator.className =
        "cjslib-day-indicator cjslib-indicator-pos-" + this.indicator_pos;
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

  document.getElementById(this.id).innerHTML =
    "<style>.cjslib-day-indicator { color: " +
    this.colors[1] +
    "; background-color: " +
    "FFFFFF" +
    "; } .cjslib-indicator-type-numeric { color: " +
    this.colors[2] +
    "; } .cjslib-day.cjslib-day-today > .cjslib-day-num { border-color: " +
    this.colors[1] +
    " !important; }</style>";
  document.getElementById(this.id).appendChild(theCalendar.cloneNode(true));
  },
  update: function() {
  document.getElementById(
    this.id + "-year"
  ).innerHTML = this.date.getFullYear();
  document.getElementById(this.id + "-month").innerHTML = this.months[
    this.date.getMonth()
  ];

  for (var i = 1; i <= 42; i++) {
    document.getElementById(this.id + "-day-num-" + i).innerHTML = "";
    document.getElementById(this.id + "-day-" + i).className =
      this.id + " cjslib-day cjslib-day-listed";
  }

  var firstDay = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    1
  ).getDay();
  var lastDay = new Date(
    this.date.getMonth() + 1 > 11
      ? this.date.getFullYear() + 1
      : this.date.getFullYear(),
    this.date.getMonth() + 1 > 12 ? 0 : this.date.getMonth() + 1,
    0
  ).getDate();

  var previousLastDay = new Date(
    this.date.getMonth() < 0
      ? this.date.getFullYear() - 1
      : this.date.getFullYear(),
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

    if (this.date.getMonth() == this.today.getMonth())
      if (i == this.today.getDate())
        document.getElementById(
          this.id + "-day-" + (firstDayLabelPos + i)
        ).className += " cjslib-day-today";
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
  ).onclick = function () {
    if (
      document.getElementById(calendarInstance.id + "-day-num-" + blockId)
        .innerHTML.length > 0
    ) {
      calendarInstance.changeDateTo(
        document.getElementById(calendarInstance.id + "-day-num-" + blockId)
          .innerHTML,
        blockId
      );
      callback();
    }
  };
  },
  setOnClickListener: function(
  theCase,
  backCallback,
  nextCallback
) {
  var calendarId = this.id;

  backCallback = backCallback || function () {};
  nextCallback = nextCallback || function () {};

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
      ).onclick = function () {
        calendarInstance.back("month");
        backCallback();
      };
      document.getElementById(
        calendarId + "-month-next"
      ).onclick = function () {
        calendarInstance.next("month");
        nextCallback();
      };
      break;
    case "year-slider":
      document.getElementById(calendarId + "-year-back").onclick = function () {
        calendarInstance.back("year");
        backCallback();
      };
      document.getElementById(calendarId + "-year-next").onclick = function () {
        calendarInstance.next("year");
        nextCallback();
      };
      break;
  }
  },
}

export default legacyProto
