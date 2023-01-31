/**
 * Written by: Zakaria Sekhri
 * File Name: Notion Functions
 * File Purpose: Contains support functions relating to notion functionality
 * File Functions: returnDBURL, returnPGURL, buildCourseProperties
 * buildEventProperties, buildHomeworkProperties, buildResourceProperties
*/

/**
 * returnDBURL - returns the notion page endpoint
 * param: id | str | the database id to onfig the endpoint with
 * return str | the notion pages endpoint
 */
function returnDBURL(id) {
  return "https://api.notion.com/v1/databases/"+ id +"/query"
}

/**
 * returnPGURL - returns the notion page endpoint
 * return str | the notion pages endpoint
 */
function returnPGURL() {
  return "https://api.notion.com/v1/pages"
}

/**
 * buildCourseProperties - converts a config object to notion appropriate json
 * param: info | JSON Document | the JSON object with the config
 * return JSON Document | formatted JSON
 */
function buildCourseProperties(info) {
  var output = { };

  if (info["Name"]) {
    output["Name"] = { "title":[{"text": { "content": info["Name"] }}]}
  }

  if (info["Shorthand"]) {
    output["Shorthand"] = { "rich_text": [{"type": "text","text": { "content": info["Shorthand"]}}] }
  }

  if (info["Status"]) {
    output["Status"] = { "select": {"name": info["Status"]}}
  }

  if (info["Day"]) { // [{"name": "B" } , {"name": "C"}]
    output["Day"] = { "multi_select" : [] }
    for (var i = 0;i<info["Day"].length;i++) {
      console.log(info["Day"][i])
      output["Day"]["multi_select"].push({"name" : info["Day"][i]})
    }
  }

  if (info["Professor"]) {
    output["Professor"] = { "rich_text": [{"type": "text","text": { "content": info["Professor"]}}] }
  }

  if (info["Time"]) {
    output["Time"] = { "rich_text": [{"type": "text","text": { "content": info["Time"]}}] }
  }

  if (info["Course Code"]) {
    output["Course Code"] = { "rich_text": [{"type": "text","text": { "content": info["Course Code"]}}] }
  }

  if (info["Location"]) {
    output["Location"] = { "rich_text": [{"type": "text","text": { "content": info["Location"]}}] }
  }

  if (info["Semester"]) {
    output["Semester"] = {"relation": [ { "id": info["Semester"]}]}
  }

  if (info["Slate Page"]) {
    output["Slate Page"] = {"url": info["Slate Page"]}
  }

  if (info["Main Folder"]) {
    output["Main Folder"] = {"url": info["Main Folder"]}
  }

  if (info["Assignment Info"]) {
    output["Assignment Info"] = {"url": info["Assignment Info"]}
  }

  if (info["Assignment Work"]) {
    output["Assignment Work"] = {"url": info["Assignment Work"]}
  }

  if (info["Notes"]) {
    output["Notes"] = {"url": info["Notes"]}
  }

  if (info["Resources"]) {
    output["Resources"] = {"url": info["Resources"]}
  }

  if (info["Knowledge Folder"]) {
    output["Knowledge Folder"] = {"url": info["Knowledge Folder"]}
  }

  if (info["Knowledge Doc"]) {
    output["Knowledge Doc"] = {"url": info["Knowledge Doc"]}
  }
  
  return output;
}

/**
 * buildEventProperties - converts a config object to notion appropriate json
 * param: info | JSON Document | the JSON object with the config
 * return JSON Document | formatted JSON
 */
function buildEventProperties(info) {
  var output = { } 

  // 
  // type = Class, Work Period, Meta, Reading Period, OTHER

  
  if (info["Name"]) {
    output["Name"] = { "title":[{"text": { "content": info["Name"] }}]}
  }

  if (info["Type"]) {
    output["Type"] = { "select": {"name": info["Type"]}}
  }

  if (info["Date"]) {
    output["Date"] = {
      "date": {
        "start": info["Date"][0], 
        "end": info["Date"][1], 
        "time_zone": "America/Toronto"}
      } //
  }

  if (info["Related Course"]) {
    output["Related Course"] = {"relation": [ { "id": info["Related Course"]}]} //courses[info["Related Course"]]["id"]
  }

  if (info["Related Resources"]) {
    output["Related Resources"] = {"relation": [ { "id": info["Related Resources"]}]}
  }

  return output
}

/**
 * buildHomeworkProperties - converts a config object to notion appropriate json
 * param: info | JSON Document | the JSON object with the config
 * return JSON Document | formatted JSON
 */
function buildHomeworkProperties(info) {
  var output = { }

  // Type = Reading, Assignment, Quiz, Exam, Meta, Project
  // Status = Not Started, In progress, Waiting, Complete, Not Doing, Missed, Yet to Hand in
  // Due date (end date, include time)
  // work
  // ["name", "type", "status", "due date", "class shorthand", "work url"]

  if (info["Name"]) {
    output["Name"] = { "title":[{"text": { "content": info["Name"] }}]}
  }

  if (info["Type"]) {
    output["Type"] = { "select": {"name": info["Type"]}}
  }

  if (info["Status"]) {
    output["Status"] = { "select": {"name": info["Status"]}}
  }

  if (info["Due Date"][0]) {
    output["Due Date"] = {"date": {"start": info["Due Date"][0]} } //, "time_zone": "America/Toronto"
  }

  if (info["Due Date"][1]) {
    output["Due Date"] = {"date": {"end": info["Due Date"][1]} }
  }

  if (info["Work"]) {
    output["Work"] = {"url": info["Work"]}
  }

  if (info["Related Course"]) {
    output["Related Course"] = {"relation": [ { "id": info["Related Course"]}]}
  }

  return output
}

/**
 * buildResourceProperties - converts a config object to notion appropriate json
 * param: info | JSON Document | the JSON object with the config
 * return JSON Document | formatted JSON
 */
function buildResourceProperties(info) {
  var output = { }
   // "Name" : "test",
   // "Type" : "", // External, Notes, Assignment Info, Class Content, Assignment Work, Review Material
   // "URL Source" : "",
   // "Related Course" : "",
   // "Related Event" : "",
   // "Related Task" : "",
   // "Related Homework" : "",};

  if (info["Name"]) {
    output["Name"] = { "title":[{"text": { "content": info["Name"] }}]}
  }

  if (info["Type"]) {
    output["Type"] = { "select": {"name": info["Type"]}}
  }

  if (info["URL Source"]) {
    output["URL Source"] = {"url": info["URL Source"]}
  }

  if (info["Related Course"]) {
    output["Related Course"] = {"relation": [ { "id": info["Related Course"]}]} // courses[info["Related Course"]]["id"]
  }

  if (info["Related Event"]) {
    output["Related Event"] = {"relation": [ { "id": info["Related Event"]}]}
    }

  //Logger.log(output)
  return output
  //return JSON.stringify(output)
}
