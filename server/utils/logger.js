
var wLogger = require('winston');
var config = require('../config.js');

wLogger.init = function (config) {
    wLogger.setLevels({ debug: 0, info: 1, silly: 2, event: 3, warn: 4, error: 5 });
    wLogger.addColors({ debug: 'grey', info: 'cyan', silly: 'magenta', event:'green', warn: 'yellow', error: 'red' });
    wLogger.remove(wLogger.transports.Console);
    wLogger.add(wLogger.transports.Console, { level: 'silly', colorize: true });
    wLogger.add(wLogger.transports.File, { filename: '../../node.log', maxsize: 5000, maxFiles: 3 });
    /*
    if (config.enableRemoteLogging) {
        if (!config.loggly || !config.loggly.subdomain ||
            !config.loggly.inputToken || !config.loggly.username || !config.loggly.password) {
            wLogger.log("error", "bad loggly configuration");
        }
        else {
            require('winston-loggly');
            wLogger.add(wLogger.transports.Loggly, {
                level: config.loggly.level ? config.loggly.level : 'event',
                subdomain: config.loggly.subdomain,
                inputToken: config.loggly.inputToken,
                auth: { username: config.loggly.username , password: config.loggly.password },
                tags: config.loggly.tags ? config.loggly.tags : ["NodeJS"],
                json: true
            });
        }
    }
    */
};
wLogger.init(config);
module.exports = wLogger;