var cryptUtils =  require('../../utils/cryptUtils.js');
var errorResponse = require('../errorResponse.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/login', './login/postTest.js');
    handler.requiresAuthentication = false;
    
    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.password;
    };


    handler.post = function (req, res) {
        users.getUser( { username: req.body.email, password: req.body.password, ip: req.originatingAddress }, function (err, user) {
            if (err || !user) {
                errorResponse.sendNotFoundError(res, "Invalid username or password");
            }
            else if (user.deletedOn || !user.isActive) {
                errorResponse.sendAuthorizationError(res, "account suspended", null);
            }
            else {
                user.auth = cryptUtils.encryptAccessToken(user.accessToken);
                delete user.accessToken;

                res.json(user);
            }
        });
    };
    
    return handler;
}
module.exports = createAPI;