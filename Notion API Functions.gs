/**
 * Written by: Zakaria Sekhri
 * File Name: Notion API Functions
 * File Purpose: Contains functions that interact with the notion API directly
 * File Functions: bulk_run(), notion_request(), create_db_item(), db_properties()
*/

/**
 * notion_request - makes a request to notion
 * param: url | str | the string to make the request to
 * param: method | str | the type of HTTP operation to perform
 * param: payload | JSON Object | the payload being passed to the notion servers
 * return JSON Document | the result of the post operation
 */
function notion_request(url, method, body) {
  var service = getService();
  
  if (service.hasAccess()) {
  //url = returnDBURL("942ac56dd5214eddb34b6b7b7a34e05f")
  //url = returnDBURL(db_course_id)
  //body = null;
  //method = "post";

    var options = {
      'method': method,
      'muteHttpExceptions': true,
      'headers': {
        'Notion-Version': notion_version, // refer https://developers.notion.com/reference/versioning
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    };

    if (body != "null") {
      options["body"] = body;
    }

    //console.log(options)

    var response = UrlFetchApp.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    //Logger.log(JSON.stringify(result, null, 2));

    return result;} else { // if the service doesnt have access do this
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }
}

/**
 * create_db_item - passes a formatted payload to create an item in a notion database
 * param: payload | JSON Object | the payload being passed to the notion servers
 * return JSON Document | the result of the post operation
 */
function create_db_item(payload) {

  var service = getService();
  
  if (service.hasAccess()) {
    //payload = JSON.stringify(test3())

  options = {
      "method": "post",
      "muteHttpExceptions": true,
      "headers": {
        "Content-Type": "application/json",
        "Notion-Version": notion_version, // refer https://developers.notion.com/reference/versioning
        "Authorization": 'Bearer ' + service.getAccessToken()
      },
      "payload" : payload
    };

    //Logger.log(options)
    var response = UrlFetchApp.fetch(returnPGURL(), options);
    var result = JSON.parse(response.getContentText());
    //Logger.log(JSON.stringify(result, null, 2));

    return result;

  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }
}

/**
 * db_properties - returns a formatted payload for notion database interaction
 * param: db_id | str | the notion database to config it for
 * param: properties | JSON Document | the properties for the object being created
 * return JSON Document
 */
function db_properties(db_id, properties) {
  var output = {
   "parent":{
      "database_id": db_id
   },
   "properties": properties,
    "children" : []
   }

   return output;
}
