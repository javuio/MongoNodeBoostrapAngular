var path = require('path');
var fs = require("fs");
var apiHelper = require('../api/apiHelper.js');

module.exports = function (app,config) {

    apiHelper.init(app);
    var apis = new Array();

    function loadAPI(path, file, loadSubFolders) {
        console.log(path + "/" + file);
        if (file.indexOf('.') > 0) {
            if (file != 'apiHandler.js') {
                var fn = require(path + "/" + file);
                if (typeof (fn) != 'function') return;
                var api = fn(app);
                if (api && api.register) {
                    apis.push(api);
                    api.register(app);
                }
            }
        }
        else if (loadSubFolders) {
            var subpath = path + '/' + file;
            fs.readdirSync(subpath).forEach(function (file) {
                loadAPI(subpath, file, true)
            });
        }
    }

    fs.readdirSync(__dirname + "/../api/").forEach(function (file) {
        loadAPI(__dirname + '/../api/', file, true)
    });


/// Test API's /////////////////////////////////////////////////////////////////

    var testAPIs = function (testName) {
        if (!testName && process.argv.length > 4) {
            testName = process.argv[4].toLowerCase();
        }
        if (testName)testName = testName.toLowerCase();
        for (var i = 0; i < apis.length; i++) {
            if (!testName || (apis[i].requireTest().name && apis[i].requireTest().name.toLowerCase() == testName)) {
                apis[i].requireTest().test(app);
            }
        }
        if (config.testMode) {
            setTimeout(function () {
                process.exit(0);
            }, 30000); // set timeout so process does exits after executing tests
        }
    };

    return testAPIs;
};