"use strict";

(function (global, document) {
  // initializing a new calendar object, that will use an html container to create itself
  var calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "large", // size of calendar, can be small | medium | large
    [
      "Monday", // left most day of calendar labels
      3, // maximum length of the calendar labels
    ],
    [
      "#4CAF50", // primary color
      "#4CAF50", // primary dark color
      "#FFFFFF", // text color
      "#FFFFFF", // text dark color
    ]
  );
})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
