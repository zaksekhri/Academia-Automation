/**
 * Written by: Zakaria Sekhri
 * File Name: Google Calendar
 * File Purpose: Contains functions relating to google calendar
 * File Functions: createCalendarEvent
*/

/**
 * createCalendarEvent - Creates an event using the academia calendar
 * param: title | str  | The event title
 * param: start | Date | Start date
 * param: end   | Date | End date
 * param: options | JSON Document | contains the config for the description and locations
 */
function createCalendarEvent(title, start, end, options) {
  var calendar = CalendarApp.getCalendarById(academia_id);
  
  // creates a calendar event
  var event = calendar.createEvent(title, start, end, {
    // tertiary operators to check if these are null
    description : options["desc"] != null ? options["desc"] : null,
    location : options["location"] != null ? options["location"] : null
  });
}
