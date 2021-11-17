"use strict";

(function (global, document) {
  // function that creates dummy data for demonstration
  // This is not part of api in calendar just for creating dummy data to show.
  // For adding data, see example7.js for reference.
  function createDummyData() {
    var date = new Date();
    var data = {};

    for (var i = 0; i < 10; i++) {
      data[date.getFullYear() + i] = {};

      for (var j = 0; j < 12; j++) {
        data[date.getFullYear() + i][j + 1] = {};

        for (var k = 0; k < Math.ceil(Math.random() * 10); k++) {
          var l = Math.ceil(Math.random() * 28);

          try {
            data[date.getFullYear() + i][j + 1][l].push({
              complete: "10",
              goal: "12",
              text: "Some Goals Here",
            });
          } catch (e) {
            data[date.getFullYear() + i][j + 1][l] = [];
            data[date.getFullYear() + i][j + 1][l].push({
              complete: "10",
              goal: "12",
              text: "Some Goals Here",
            });
          }
        }
      }
    }

    return data;
  }

  // creating the dummy static data
  var data = createDummyData();

  // initializing a new calendar object, that will use an html container to create itself
  var calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "small", // size of calendar, can be small | medium | large
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

  // initializing a new organizer object, that will use an html container to create itself
  var organizer = new Organizer(
    "organizerContainer", // id of html container for calendar
    calendar, // defining the calendar that the organizer is related to
    data // giving the organizer the static data that should be displayed
  );
})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
