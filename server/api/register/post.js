var cryptUtils = require('../../utils/cryptUtils.js');
var errorResponse = require('../errorResponse.js');
var logger = require('../../utils//logger.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/register', './register/postTest.js');

    handler.requiresAuthentication = false;

    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.password;
    };

    handler.post = function (req, res) {

        if (!(req.body.username))
            req.body.username = req.body.email;

        req.body.roleName = 'ControlPanelUser';

        users.registerUser(req.body, "std", function (err, data) {
            if (err) {
                if (err.errorCode == 'duplicateUsername')
                    errorResponse.sendCustomInnerCode(res, err.errorCode, 'Username already exists');
                else
                    handler.handleGenericError(req, res, err);
            }
            else {
                // Login user
                users.getUser({
                    username: req.body.email,
                    password: req.body.password,
                    ip: req.originatingAddress
                }, function (err, user) {
                    if (err || !user)
                        errorResponse.sendAuthenticationError(res, "unable to login user", err);
                    else if (user.deletedOn || !user.isActive || (user.isActive[0] == 0))
                        errorResponse.sendAuthorizationError(res, "account suspended", null);
                    else {
                        logger.log("event", "standard user registered", {
                            event: "userRegistered",
                            username: req.body.email,
                            type: "standard"
                        });
                        res.json({
                            auth: cryptUtils.encryptAccessToken(user.accessToken),
                            userToken: user.userToken
                        });
                    }
                });
            }
        });

    };

    return handler;
}
module.exports = createAPI;