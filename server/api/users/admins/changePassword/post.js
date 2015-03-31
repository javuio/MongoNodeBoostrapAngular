var cryptUtils = require('../../../../utils/cryptUtils.js');
var errorResponse = require('../../../errorResponse.js');
var apiHandler = require('../../../apiHandler.js');
var users = require('../../../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/api/users/admins/changePassword/', './users/admins/changePassword/postTest.js');
    handler.requiresPermission = 'AdminPortal';
    handler.validateData = function (req, res) {
        return req.body.currentPassword && req.body.newPassword;
    };
    
    handler.securityCheck = function (req, res) {
        return true;
    };
    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {

            users.updateCredentials(req.user.username, req.body.currentPassword, req.user.username, req.body.newPassword, function (err, updateCredentialsUser) {
                if (err) {
                    errorResponse.sendNotFoundError(res, "incorrect password");
                }
                else {
                    res.send(204); //success
                }
            });
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };
    
    return handler;
}
module.exports = createAPI;