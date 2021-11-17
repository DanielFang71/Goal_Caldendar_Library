"use strict";

(function (global, document) {
  // initializing a new calendar object, that will use an html container to create itself
  let calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "medium", // size of calendar, can be small | medium | large
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

  // creating the dummy static data
  let goal = calendar.createGoal("10", "12", "Some Goals Here");
  let objs = calendar.addGoalToObjs(new Date("2020-12-1"), goal);
  let data = calendar.addData(objs);

  // initializing a new organizer object, that will use an html container to create itself
  let organizer = new Organizer(
    "organizerContainer", // id of html container for calendar
    calendar, // defining the calendar that the organizer is related to
    data // giving the organizer the static data that should be displayed
  );
})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
