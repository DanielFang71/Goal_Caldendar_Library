"use strict";

(function (global, document) {
  // initializing a new calendar object, that will use an html container to create itself
  var calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "small", // size of calendar, can be small | medium | large
    [
      "Sunday", // left most day of calendar labels
      3, // maximum length of the calendar labels
    ],
    [
      "#FFEB3B", // primary color
      "#FFEB3B", // primary dark color
      "#212121", // text color
      "#212121", // text dark color
    ]
  );
})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
