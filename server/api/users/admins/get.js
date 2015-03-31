var apiHandler = require('../../apiHandler.js');
var errorResponse = require('../../errorResponse.js');
var user = require('../../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/api/users/admins/', './users/admins/getTest.js');

    handler.requiresPermission = 'AdminPortal';

    handler.validateData = function (req, res) {
        return true;
    };

    handler.securityCheck = function (req, res) {
        return true;
    };
    
    handler.get = function (req, res) {
        if (handler.validateData(req, res)) {
            if (handler.securityCheck(req, res)) {
                user.getUserByUsername(req.user.username, function (errMerchant, resultMerchant) {
                    if (errMerchant)
                        errorResponse.sendError(res, 500, errMerchant);
                    else if (resultMerchant)
                        res.json(resultMerchant);
                    else {
                        errorResponse.sendNotFoundError(res, "admin not found");
                    }
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