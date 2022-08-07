/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
  "POST /evaluation/create": "EvaluationController.create",

  "POST /feedback/create": "FeedbackController.create",

  "GET /evaluation/json": "EvaluationController.json",

  "GET /evaluation/read/:id": "EvaluationController.read",
  "GET /feedback/read/:id": "FeedbackController.read",
  "GET /feedback/json": "FeedbackController.json",
  "GET /feedback/populateDetail": "FeedbackController.populateDetail",

  "GET /evaluation/populate/:id": "EvaluationController.populate",

  "GET /feedback/:id/evaluation": "FeedbackController.populate",

  "GET /feedback/populate/": "FeedbackController.populate",


  "GET /evaluation/:id/feedback": "EvaluationController.populate",

  "GET /evaluation/:id/populateFeedbacks": "EvaluationController.populateFeedbacks",

  "POST /course/create": "CourseController.create",

  "GET /course/json": "CourseController.json",

  "POST /student/create": "StudentController.create",

  "GET /student/json": "StudentController.json",

  "GET /course/:id/student": "CourseController.populate",

  "GET /student/:id/course": "StudentController.populate",

  "GET /student/read/:id": "StudentController.read",

  "DELETE /course/:id": "CourseController.delete",

  "GET /course/read/:id": "CourseController.read",

  "POST /student/course/remove/:id": "StudentController.remove",

  "POST /course/update/:id": "CourseController.update",

  "GET /export_excel/exportexcel/:id": "ExportExcelController.exportexcel",
};
