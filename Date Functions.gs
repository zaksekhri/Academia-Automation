/**
 * Written by: Zakaria Sekhri
 * File Name: Date Functions
 * File Purpose: Contains functionality relating to Date objects
 * File Functions: get_start_end_date, increment_by_week
 * increment_by_weeks, increment_days_by, addHoursToDate
*/

/**
 * get_start_end_date - returns 2 dates based on the provided day and times
 * param: date   | Date | <desc>
 * param: startH | int  | The start hour
 * param: endH   | int  | The end hour
 * return array of Dates | Contains the start and end date objects
 */
function get_start_end_date(date, startH, endH) {
  startD = new Date(date.getTime())
  startD.setHours(startH)
  endD = new Date(date.getTime())
  endD.setHours(endH)

  return [startD, endD]
}

/**
 * increment_by_week - returns a date incremented by 1 week
 * param: start_date | Date | the date to increment from
 * return Date | the incremented date
 */
function increment_by_week(start_date = Date) {
  return increment_days_by(start_date, 7)
}

/**
 * increment_by_weeks - returns a date incremented by a provided amount of weeks
 * param: start_date | Date | the date to increment from
 * param: count      | int  | the number of days to increment by
 * return Date | the incremented date
 */
function increment_by_weeks(start_date = Date, count) {
  return increment_days_by(start_date, count *7)
}

/**
 * increment_days_by - returns a date incremented by a provided amount of days
 * param: start_date | Date | the date to increment from
 * param: count      | int  | the number of days to increment by
 * return Date | the incremented date
 */
function increment_days_by(start_date = Date, count) {
  var output_Date = new Date(start_date.getTime()+ (count * 24 * 60 * 60 * 1000));
  // https://stackoverflow.com/a/40893731

  return output_Date
}

/**
 * Written by not me, idk who
 * --
 * addHoursToDate - returns a date incremented by a provided amount of hours
 * param: start_date | Date | the date to increment from
 * return Date | the incremented date
 */
function addHoursToDate(startingDate, hours) {
  var newDate = new Date(startingDate.getTime());
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}
