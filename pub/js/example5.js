"use strict";

(function (global, document) {
  // initializing a new calendar object, that will use an html container to create itself
  var calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "medium", // size of calendar, can be small | medium | large
    [
      "周一", // left most day of calendar labels
      3, // maximum length of the calendar labels
    ],
    [
      "#FFEB3B", // primary color
      "#FFEB3B", // primary dark color
      "#212121", // text color
      "#212121", // text dark color
    ],
    {
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
    }
  );
})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
