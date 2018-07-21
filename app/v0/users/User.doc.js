/**
 * 
 * @api {get} /user:id Get User
 * @apiName getUser
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * @apiParam  {Number} id User id
 *
 * @apiSuccess {Number} ud User id
 * @apiSuccess {String} name User name
 * 
 * @apiParamExample  {Object} Request-Example:
 * {
 *     id: 1,
 * }
 * 
 * @apiSuccessExample {Object} Success-Response:
 * {
 *     id: 1,
 *     name: Ekoar
 * }
 * 
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }

 */