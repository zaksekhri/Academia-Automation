/**
 * Written by: Zakaria Sekhri
 * File Name: Google Drive Functions
 * File Purpose: Contains all functions in relation to google drive
 * File Functions: create_semester_folder, create_course_folders
 * create_notes, create_notes_doc, buildAssignmentWorkFolder
*/

/**
 * create_semester_folder - creates the semester folder
 * return JSON Document | the url and id of the created folder
 */
function create_semester_folder() {
  var folder = DriveApp.getFolderById(sheridan_id);

  var semester = 3;
  var name = "Semester " + 3;
  var semester_folder = folder.createFolder(name);

  var output = {
    'url' : semester_folder.getUrl(),
    'id' : semester_folder.getId()
  }

  //Logger.log(output)
  return output
}

/**
 * create_course_folders - creates the standard folder structure for a course in google drive
 * param: semester_id | str | the google folder 
 * param: courseName  | str | the course name
 * param: courseSH    | str | the course shorthand
 * return JSON Document | contains the id and url to the created folders
 */
function create_course_folders(semester_id = String, courseName = String, courseSH = String) {
  var semester_folder = DriveApp.getFolderById(semester_id);
  var class_folder = semester_folder.createFolder(courseName);

  var assignment_info_folder = class_folder.createFolder("Assignment Info");

  var assignment_work = class_folder.createFolder("Assignment Work");

  var knowledge = class_folder.createFolder("Knowledge");
  var knowledge_doc = DriveApp.getFileById(knowledge_doc_id).makeCopy("!0 " + courseSH + " - Knowledge Doc", knowledge);
  var eval_doc = DriveApp.getFileById(exp_eval_id).makeCopy("!1 " + courseSH + " - Experience Eval", knowledge);
  var kasses_doc = DriveApp.getFileById(knowledge_assesment_id).makeCopy("!1 " + courseSH + " - Knowledge Assesment Prep", knowledge);

  var notes = class_folder.createFolder("Notes");
  DriveApp.getFileById(notes_template_id).makeCopy("! Notes Template", notes);

  var resources = class_folder.createFolder("Resources");
  resources.createFolder("unsorted");

  var output = {
    'main_folder' : [class_folder.getId(),class_folder.getUrl()],
    'assignment_info' : [assignment_info_folder.getId(),assignment_info_folder.getUrl()],
    'assignment_work' : [assignment_work.getId(),assignment_work.getUrl()],
    'notes' : [notes.getId(),notes.getUrl()],
    'resoures' : [resources.getId(),resources.getUrl()],
    'knowledge' : [knowledge.getId(),knowledge.getUrl()],
    'knowledge_doc' : [knowledge_doc.getId(),knowledge_doc.getUrl()],
    'knowledge_eval_doc' : [eval_doc.getId(),eval_doc.getUrl()],
    'knowledge_assesment_doc' : [kasses_doc.getId(),kasses_doc.getUrl()]
  }

  //Logger.log(output)
  return output
}

/**
 * create_notes_doc - creates and returns information for the notes doc 
 * param: notes_folder_id | str | the drive note folder id for 
 * param: courseSH        | str | the course shorthand
 * param: classNumb       | int | the class number this doc is for
 * return JSON Document | contains the id and url for the notes doc
 */
function create_notes_doc(notes_folder_id = String, courseSH = String, classNumb) {
  //notes_folder_id = "1pe4GAsyX_Xw236zqA0AYxX1k0pB0M5sM";
  //courseSH = "TC"
  //classNumb = 5;

  var notes_doc = DriveApp.getFileById(notes_template_id).makeCopy(courseSH + " - Class " + classNumb + " Notes" , DriveApp.getFolderById(notes_folder_id));

  return [notes_doc.getName(), notes_doc.getUrl()];
}

/**
 * buildAssignmentWorkFolder - creates a folder to contain
 * param: shortHand | str | the course shorthand
 * param: title     | str | the homework title
 * return str | the folder url
 */
function buildAssignmentWorkFolder(shortHand, title) {
  var folder = DriveApp.getFolderById(lookup_work_folder_id(shortHand))

  var nfolder = folder.createFolder(title)

  return nfolder.getUrl()
}
