var cryptUtils = require('../../../utils/cryptUtils.js');
var errorResponse = require('../../errorResponse.js');
var apiHandler = require('../../apiHandler.js');
var validator = require('../../../utils/validator.js');
var users = require('../../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/users/user');

    handler.requiresAuthentication = false;

    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.password;
    };

    handler.post = function (req, res) {

        req.body.roles = ['cp'];
        req.body.isActive = true;
        users.registerUser(req.body, function (err, data) {
            if (err) {
                if (err.errorCode == 'duplicateUsername')
                    errorResponse.sendCustomInnerCode(res, err.errorCode, 'Username already exists');
                else
                    handler.handleGenericError(req, res, err);
            }
            else
                res.json(data);

        });

    };

    return handler;
}
module.exports = createAPI;