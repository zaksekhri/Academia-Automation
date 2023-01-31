/**
 * Written by: Zakaria Sekhri
 * File Name: Classes
 * File Purpose: Contains the function that creates a course's classes
 * File Functions: create_course_classes()
*/

/**
 * create_course_classes - creates all class events in notion and google calendar and the notes docs for it
 * param: shortHand       | str | the class shorthand
 * param: days            | array of ints | 
 * param: days_start      | array of strs | an array of strings containing the initial dates for class sessions
 * param: times           | JSON Object | Contains JSON documents with the start and end time for each day
 * param: course_id       | str | the notion object id for the course
 * param: notes_folder_id | str | the notes folder id for the course
 */
function create_course_classes(shortHand, days, days_start, times, course_id, notes_folder_id) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  lock = true;
  week = 1
  items = [];

  //shortHand = "TEST";
  //days = [1, 3] // 0 sunday, 1 monday, 2 tuesday, 3 wednesday, 4 thursday, 5 friday, 6 saturday
  //days_start = ["2023-01-09", "2023-01-12"] // year-month-day
  //times = [[13, 16], [14, 17]] // day = [start h, end h] || multi-day = [day 1, day 2]

  // looks over 1 thru 16 to simulate a semester and has logic to handle each
  while (lock) {
    //if week 16 stop
    if (week == 16) {
      lock = false
      break
    } 

    // if week 8 do nothing
    if (week == 8) {
      // this is reading week so nothing
    } 

    // if week 1
    if (week == 1) { 
      for (var i = 0; i < days.length; i++) { // for each day, add an entry to the list
        items.push(get_start_end_date(increment_days_by(new Date(days_start[i]), 1), times[i][0], times[i][1]));
      }
    } else { // if any other week
        for (var i = 0; i < days.length; i++) { // for each day, add an entry to the list
          items.push(get_start_end_date(increment_by_weeks(increment_days_by(new Date(days_start[i]), 1), week-1), times[i][0], times[i][1]));
        }
    }

    week++ // iterate the week value
  }

  // for every entry, make a notion, google calendar event and notes doc entered into notion
  for (var i=0;i<items.length;i++) {  
    var name = shortHand +" - Class " + i // the name to use

    //console.log("start: " + items[i][0] + "\n" + "end: " + items[i][1])

    // creating the event in notion
    var event = create_event(name, "Class", items[i][0], items[i][1], course_id);

    // creating the event in google calendar
    createCalendarEvent(name, items[i][0], items[i][1], {desc: null, location: null});

    // creating the class notes doc
    var notes_doc = create_note(notes_folder_id, shortHand, i, event["id"])
   }
}
