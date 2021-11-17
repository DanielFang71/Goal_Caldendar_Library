"use strict";

(function (global, document) {
  // initializing a new calendar object, that will use an html container to create itself
  var calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "medium", // size of calendar, can be small | medium | large
    [
      "Monday", // left most day of calendar labels
      3, // maximum length of the calendar labels
    ],
    [
      "#3F51B5", // primary color
      "#3F51B5", // primary dark color
      "#FFFFFF", // text color
      "#BDBDBD", // text dark color
    ]
  );
})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
