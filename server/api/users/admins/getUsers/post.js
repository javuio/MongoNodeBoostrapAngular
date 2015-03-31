var apiHandler = require('../../../apiHandler.js');
var errorResponse = require('../../../errorResponse.js');
var user = require('../../../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/api/users/admins/getUsers/', './users/admins/getUsers/postTest.js');

    handler.requiresPermission = 'AdminPortal';

    handler.validateData = function (req, res) {
        return true;
    };

    handler.securityCheck = function (req, res) {
        return true;
    };
    
    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {
            if (handler.securityCheck(req, res)) {
                user.getUsers( function (err, result) {
                    if (err)
                        errorResponse.sendError(res, 500, err);
                    else 
                        res.json(result);
                    
                });
            }
            else
                errorResponse.sendAuthorizationError(res, "not authorised");
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };
    return handler;
}
module.exports = createAPI;