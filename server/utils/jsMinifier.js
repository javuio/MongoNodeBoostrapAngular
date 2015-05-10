var path = require('path');
var fs = require('fs');
var uglify = require("uglify-js");


var util = {
    minifyFolder: function (path, minifySubFldrs) {
        console.log('Minify JS Scripts in ',path);
        var files = fs.readdirSync(path);
        var jsFiles = [];
        var subFolders = new Array();
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.indexOf('.js') > 1
                && !(file.indexOf('.map') > 0 || file == 'all.min.js'))
                jsFiles.push(path + "/" + file);
            else if (file.indexOf('.') == -1)
                subFolders.push(path + file);

        }

        if (jsFiles.length > 0) {
            var filePath = path + '/all.min.js';


            var sm=uglify.SourceMap({file :filePath + ".map" });
            //uglify.OutputStream({source_map:sm});

            var uglified = uglify.minify(jsFiles,{source_map:sm});


            fs.writeFile(filePath, uglified.code, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Script generated and saved:", filePath);
                }
            });


            fs.writeFile(filePath + ".map", sm.toString(), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Script generated and saved:", filePath);
                }
            });
        }

        if (minifySubFldrs && subFolders.length > 0)
            subFolders.forEach(function (folder) {
                util.minifyFolder(folder, minifySubFldrs);
            });
    }
    , minifyFolders: function (foldersConfig) {
        foldersConfig.forEach(function (f) {
            util.minifyFolder(f.path, f.minifySubFolder);
        });
    }
};
module.exports = util;