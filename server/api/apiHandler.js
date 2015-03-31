var passport = require('passport');
var errorResponse = require('./errorResponse.js');
var apiAuthorization = require('./apiAuthorization');

function apiHandler(route, testPath) {
    if (route == undefined)
        throw new Error('route undefined');
    if (testPath == undefined)
        console.warn('> Warning: Test undefined for ' + route);
    else
        this.testPath = testPath;
    
    /// make sure path starts with /api/
    if (route.indexOf('/') != 0) route = '/' + route;
    if (route.indexOf('/api') != 0) route = '/api' + route;
    if (route[route.length - 1] == '/') route = route.substring(0, route.length - 1);

    //this.validRequestSchema = null;
    this.route = route;
    this.app = null;

    /// requires a user to be logged in -- default true
    this.requiresAuthentication = true;

    /// requires a user to be logged in and has specific permissions
    this.requiresPermission = undefined;

}

apiHandler.prototype = {
    requireTest: function () { return this.testPath? require(this.testPath):{ test: function () { return true } }; }

    , validateData: function ( req, res, callback ) {
        callback (new Error( "validateData not implemented for " + this.route ));
    }

    , _checkUserPermissions : function (permission, userId, callback) {
        apiAuthorization.checkUserPermission(permission, userId, callback);
    }
    ,init: function(req,res){
        /// used to initialize the api before logic run
    }
    , _createHandler: function (verbHandler) {
        var t = this;
        var validatationWrapper = function(req,res){
            t.init(req,res);
            if (t.validateData (req,res)){

                if (t.requiresPermission != undefined && t.requiresPermission.length > 0) {

                    t._checkUserPermissions(t.requiresPermission,req.user.userId ,function (err, result) {
                        if (err) {
                            res.send(500, err);
                        }
                        else if (result == null) {
                            errorResponse.sendAuthorizationError(res,"You are not authorized",{"message": "apiHandler: You are not authorized", "code": "NoPermission"});
                            console.log("You are not authorized");
                        }
                        else if (result == true) {
                            verbHandler(req, res);
                        }
                    });
                }
                else
                    verbHandler(req, res);
            }
            else
                errorResponse.sendValidationError(res,"Invalid Parameters");
        };

        return validatationWrapper;

    }
    , register: function (app) {
        
        console.log('register api', this.route);
        this.app = app;
        if (this.get) {
            app.get(this.route, this.authenticate(), this._createHandler(this.get));
            app.get(this.route + "/:key", this.authenticate(), this._createHandler(this.get));
        }

        if (this.post)
            app.post(this.route, this.authenticate(), this._createHandler(this.post));
        if (this.put)
            app.put(this.route + "/:key", this.authenticate(), this._createHandler(this.put));
        if (this.delete)
            app.delete(this.route + "/:key", this.authenticate(), this._createHandler(this.delete));
        
        if (this._afterRegister)
            this._afterRegister();
    }
    , _afterRegister: undefined
    , get: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , post: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , put: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , del: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , handleGenericError: function (req, res, err) {
        var exposeErrorDetails = true; // TODO: read from configuration
        if (exposeErrorDetails) {
            res.send(400, ({ message: JSON.stringify(err), code: 'error' }));
        }
        else {
            res.send(500, ({ message: 'An error has occurred', code: 'error' }));
        }
    }
    
    , authenticate: function () {
        var _self = this;
        if (this.requiresAuthentication) {
            return function (req, res, next) {
                passport.authenticate('token', { session: false }, function (err, user, info) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return errorResponse.sendAuthenticationError(res, "invalid user token or auth", null);
                    }
                    if (user.deletedOn || !user.isActive || (user.isActive[0] == 0)) {
                        return errorResponse.sendAuthorizationError(res, "account suspended", null);
                    }
                    req.user = user;
                    _self.authorize()(req, res, next);
                })(req, res, next);
            }
        }
        else {
            return function (req, res, next) { next(); }
        }
    }
    
    , authorize: function () {
        var _self = this;
        return function (req, res, next) {
            if (_self.requiresPermission != undefined) {
                if (_self.requiresPermission == '')
                    next();
                else {
                    _self._checkUserPermissions(_self.requiresPermission, req.user.userId, function (err, result) {
                        if (err) {
                            return next(err);
                        }
                        else if (result == null) {
                            errorResponse.sendAuthorizationError(res, "You are not authorized", null)
                        }
                        else if (result == true) {
                            next();
                        }
                    });
                }
            }
            else {
                errorResponse.sendAuthorizationError(res, "Secure API with no permissions", null);
            }
        }
    }
}

module.exports = apiHandler;
