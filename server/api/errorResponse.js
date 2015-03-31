var logger = require('../utils/logger.js');
var config = require('../config.js');

function errorResponse() {
    this.code;
    this.message;
    this.debugMode = config.debugMode;
}

errorResponse.prototype = {
    setDebugMode: function (debugMode) {
        this.debugMode = debugMode;
    },
    sendValidationError: function (res, message, debug) {
        this.sendError(res, 'VALIDATION', message, debug);
    },
    sendNotFoundError: function (res, message, debug) {
        this.sendError(res, 'NOTFOUND', message, debug);
    },
    sendAuthorizationError: function (res, message, debug) {
        this.sendError(res, 'AUTHORIZATION', message, debug);
    },
    sendAuthenticationError: function (res, message, debug) {
        this.sendError(res, 'AUTHENTICATION', message, debug);
    }
    ,sendInvalidUserID: function (res, message, debug) {
        this.sendError(res, 'INVU', message, debug);
    }
    
    ,sendError: function (res, innerCode , message, debug) {
        var responseCode = this.getHttpErrorCode(innerCode);
        var responseBody = { code: innerCode, message: message };
        if (this.debugMode) {
            responseBody.debug = debug;
        }

        res.send(responseCode, responseBody);
        
        //log the error
        if (responseCode >= 400 && responseCode < 500) {
            logger.log('warning', 'warning error', { code: innerCode, message: message });
        }
        else if (responseCode >= 500 && responseCode < 600) {
            logger.log('error', 'internal error', { code: innerCode, message: message });
        }
    },
    sendCustomInnerCode: function (res, innerCode , message, debug) {
        var responseCode = 400;
        var responseBody = { code: innerCode, message: message };
        if (this.debugMode) {
            responseBody.debug = debug;
        }
        res.send(responseCode, responseBody);
        logger.log('warning', 'warning error', { code: innerCode, message: message, debug: debug });
    }
    
    ,getHttpErrorCode: function (innerCode) {
        var code = innerCode;
        switch (innerCode.toString().toUpperCase()) {
            case "VALIDATION":
            case "INVU":
                code = 400;
                break;
            case "NOTFOUND":
                code = 404;
                break;
            case "AUTHORIZATION":
                code = 403;
                break;
            case "AUTHENTICATION":
                code = 401;
                break;
        }
        return code;
    }
};

module.exports = new errorResponse();