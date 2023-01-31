/**
 * Written by: Zakaria Sekhri
 * File Name: Notion
 * File Purpose: Contains functions that handle something to notion
 * File Functions: create_course(), create_event(), create_homework()
 * create_resource(), return_resource_id(), lookup_course_id(), 
 * lookup_work_folder_id()
*/

/**
 * create_course - creates a course in notion, google drive and on google calendar based on the provided info
 * param: course | JSON Document | contains the config information for the course
 */
function create_course(course) {
  db_id = db_course_id;
  folder_output = create_course_folders(course['sem_folder'], course['name'], course['sh']);

  var config = {
    "Name" : course["name"],
    "Shorthand" : course["sh"],
    "Status" : course["status"],
    "Day" : course["days"],
    "Professor" : course["professor"],
    "Time" : course["time"],
    "Location" : course["locations"],
    "Course Code" : course["course_code"],
    "Semester" : course["sem-id"],
    "Main Folder" : folder_output["main_folder"][1],
    "Assignment Info" : folder_output["assignment_info"][1],
    "Assignment Work" : folder_output["assignment_work"][1],
    "Notes" : folder_output["notes"][1],
    "Resources" : folder_output["resoures"][1],
    "Knowledge Folder" : folder_output["knowledge"][1],
    "Knowledge Doc" : folder_output["knowledge_doc"][1],
    "Slate Page" : course["slate"]
  };

  var created_course = create_db_item(JSON.stringify(db_properties(db_id, buildCourseProperties(config))));
  
  create_course_classes(course["sh"],course["days"],course["days_start"],course["times"], created_course["id"], folder_output["notes"][0])
}

/**
 * create_event - Creates an event object in notion
 * param: name       | str | the name of the event
 * param: type       | str | the type of event
 * param: start_date | Date | the start date for the event
 * param: end_date   | Date | the end date for the event
 * param: course_id  | str | the notion id for the related course object
 * return JSON Document | the return from the result of making the object
 */
function create_event(name, type, start_date, end_date, course_id) {
  var db_id = db_events_id

  // type = Class, Work Period, Meta, Reading Period, OTHER

  var config = {
    "Name" : name,
    "Type" : type,
    "Date" : [start_date, end_date], // needs start AND end AND TIME
    "Related Course" : course_id,
   // "Related Events" : "",
   // "Preceding Event(s)" : "",
   // "Succeeding Event(s)" : "",
   // "Related Resources" : "",
   // "Related Tasks" : "",
  }

  var rep2 = create_db_item(JSON.stringify(db_properties(db_id, buildEventProperties(config))))

  //Logger.log(rep2)
  return rep2
}

/**
 * create_homework - Creates a homework object in notion
 * param: name      | str  | the title of the homework
 * param: type      | str  | the type of the homework
 * param: status    | str  | the status of the homework
 * param: due_date  | Date | when the homework needs to be submitted before
 * param: course_id | str  | the notion id for the related course object
 * param: url       | str  | a url to the associated google drive folder
 */
function create_homework(name, type, status, due_date, course_id, url) {
  var db_id = db_homework_id

  var config = {
    "Name" : name,
    "Type" : type,
    "Status" : status,
    "Due Date" : due_date,
    "Work" : url,
    "Related Course" : course_id,
    //"Related Events" : "",
    //"Related Resources" : "",
    //"Related Tasks" : "",
  }

  var rep2 = create_db_item(JSON.stringify(db_properties(db_id, buildHomeworkProperties(config))))

  //Logger.log(rep2)
}

/**
 * create_note - Creates the notes doc and object to represent it in notion
 * param: notes_folder_id | str | the 
 * param: classhSH        | str | the course shorthand
 * param: number          | str | the class number this is for
 * param: event_id        | str | the notion id of the related event
 * return JSON Document | the return from the result of making the object
 */
function create_note(notes_folder_id, classhSH, number, event_id) {
  var doc = create_notes_doc(notes_folder_id, classhSH, number);

  var output = create_resource(classhSH + " - Class " + number + " Notes", "Notes", lookup_course_id(classhSH), doc[1], event_id);

  return output
}

/**
 * create_resource - creates a notion object to represent a resource
 * param: name      | str | the resource name
 * param: type      | str | the resource type
 * param: course_id | str | the notion id for the related course
 * param: url       | str | the url to the resource
 * param: event_id  | str | the notion id for the relation event
 * return JSON Document | the return from the result of making the object
 */
function create_resource(name, type, course_id, url, event_id) {
  var db_id = db_resources_id

  var config = {
    "Name" : name,
    "Type" : type, // External, Notes, Assignment Info, Class Content, Assignment Work, Review Material
    "URL Source" : url,
    "Related Course" : course_id,
    "Related Event" : event_id,
    //"Related Task" : "",
    //"Related Homework" : "",
  };

  var rep2 = create_db_item(JSON.stringify(db_properties(db_id, buildResourceProperties(config))))
}

/**
 * <functionName> - <desc>
 * param: argname | {datatype} | <desc>
 * return {datatype} | <desc>
 */
function return_resource_id(title, classNumb) {}

/**
 * lookup_course_id - returns the id for the course in notion based on the shorthand
 * param: shortHand | str | the course shorthadn to filter for
 * return str | returns either the course id or "No ID"
 */
function lookup_course_id(shortHand) {
  //var shortHand = "ITM"

  var cours = notion_request(returnDBURL(db_course_id), "post", "null")["results"]

  for (var i = 0; i<cours.length;i++) {
    try {
      if (shortHand == cours[i]["properties"]["Shorthand"]["rich_text"][0]["plain_text"]) {
        return cours[i]["id"];
      }
    } catch(err) {
      console.log("no shorthand for \"" + shortHand + "\"")
    }
  }

  return "No ID";
}

/**
 * lookup_work_folder_id - returns the folder id from notion based on the shorthand
 * param: shortHand | str | the course shorthadn to filter for
 * return str | returns either the course id or "No Folder ID"
 */
function lookup_work_folder_id(shortHand) {
  //var shortHand = "ITPM"

  var cours = notion_request(returnDBURL(db_course_id), "post", "null")["results"]

  for (var i = 0; i<cours.length;i++) {
    try {
      if (shortHand == cours[i]["properties"]["Shorthand"]["rich_text"][0]["plain_text"]) {
        var thing = cours[i]["properties"]["Assignment Work"]["url"].split("/");

        return thing[thing.length-1];
      }
    } catch(err) {
      console.log("no folder for \"" + shortHand + "\" with that shorthand")
    }
  }

  return "No Folder ID";
}
