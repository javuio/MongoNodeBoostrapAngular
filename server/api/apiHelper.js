var logger = require('../utils/logger.js');

module.exports = {
    init: function (app) {
        app.all('/*', function (req, res, next) {
            var forwardHeader = req.headers['x-forwarded-for'];
            req.originatingAddress = (forwardHeader ? forwardHeader.substring(0, forwardHeader.indexOf(':')) : undefined) || req.ip;
            if (req.url.substring(0, 5) == '/api/') {
                var log = { "url": req.url, "method": req.method, "headers": req.headers };
                var p = log.headers.password;
                log.headers.password = 'xxxxx';
                log.originatingAddress = req.originatingAddress;
                logger.log('info', log);
                log.headers.password = p;
                console.log(">> " + req.url);
            }
            else
                logger.log('debug', req.url);


            next();  // call next() here to move on to next middleware/router
        });
    }
};