/**
 * Written by: Zakaria Sekhri
 * File Name: things to do
 * File Purpose: The functions that will do data entry into notion or google drive
 *                    - basically use these funnctions
 * File Functions: quick_resources(), quick_homework(), quick_event(), semester_init()
*/

/**
 * quick_resources - Inputs the given data into the resource database
 */
function quick_resources() {
  // types = External, Notes, Assignment Info, Class Content, Assignment Work, Review Material
  // ["name", "type", "class shorthand", "url"]
  /*
    ["", "", lookup_course_id(clas1), ""], 
    ["", "", lookup_course_id(clas2), ""], 
    ["", "", lookup_course_id(clas3), ""], 
  //*/

  clas1 = ""
  clas2 = ""
  clas3 = ""

  var items = [ 
  ]

  for (var i=0;i<items.length;i++) {
    create_resource(items[i][0], items[i][1], items[i][2], items[i][3], "")
  }
}

/**
 * quick_homework - Inputs the given data into the homework database
 */
function quick_homework() {
  /*
  Type = Reading, Assignment, Quiz, Exam, Meta, Project
  Status = Not Started, In progress, Waiting, Complete, Not Doing, Missed, Yet to Hand in
  Due date (end date, include time)
  work
  ["name", "type", "status", due date ["start" mandatory, "end" optional], "class shorthand", "work url"]
  year-month-dateThour:minutes
  [clas +" - ", "", "", ["2023-", "2022-"], lookup_course_id(clas), ""], 
  [clas +" - ", "", "", ["2023-", "2022-"], lookup_course_id(clas), buildAssignmentWorkFolder(clas, "")], 
  [clas +" - ", "", "", ["2023-"], lookup_course_id(clas), ""], 
  [clas +" - ", "", "", ["2023-"], lookup_course_id(clas), buildAssignmentWorkFolder(clas, "")], 
  buildAssignmentWorkFolder(clas, "title") 
  buildAssignmentWorkFolder(clas, "") 
  //*/

  clas = "";

  var items = [ 
  ]

  for (var i=0;i<items.length;i++) {
    create_homework(items[i][0], items[i][1], items[i][2], items[i][3], items[i][4], items[i][5])
  }
}

/**
 * quick_event - Inputs the given data into the event database
 */
function quick_event() {
  // type = Class, Work Period, Meta, Reading Period, OTHER
  // ["name", "type", "starting time", "end time", "class"]
  // ["", "", "", "", lookup_course_id(clas)],


  clas = "";

  var items = [
  ]

  for (var i=0;i<items.length;i++) {
    create_event(items[i][0], items[i][1], items[i][2], items[i][3], items[i][4], items[i][5])
    create_note(courses[items[i][4]]["notes"], items[i][4], items[i][0].split(" ")[3])
  }
}

/**
 * semester_init - Initializes the courses for a new semester
 */
function semester_init() {
  var semester_id = "19179A-UX5wOmbXyaMko1hQav4lDide8P";
   // the above is the id for the semester 4 folder

  coursas = [
    {
    "sem-id" : "", // the semester 4 notion ID
    'sem_folder' : semester_id,
    'name' : "",
    'sh' : "",
    'status' : "",
    'days' : [""], // 0 Sunday, 1 Monday, 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday, 6 Saturday
    'days_start' : [""], // year-month-day
    'times' : [], // 24h format| day = [start h, end h] || multi-day = [day 1, day 2]
    'time' : "",
    'locations' : "",
    'professor' : "",
    'course_code' : ""
    },
  ]

  for (var i = 0 ; i<coursas.length;i++){
    create_course(coursas[i]);
  }
}
