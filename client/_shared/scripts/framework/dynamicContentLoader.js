///requires jquery, jquery.ba-hashchange (to bind to hashchange)
define(function () {
    function dynamicContentLoader(dynamicContentContainerID, pageTitleID, configs) {
        this.$dynamicContentContainer = $('#' + dynamicContentContainerID + ':first');
        if (this.$dynamicContentContainer.length == 0 && console.log)
            console.log('dynamicContentLoader couldnt find the container ' + dynamicContentContainerID);

        this.$pageTitle = $('#' + pageTitleID + ':first');

        this.configs = configs;
        this.callbacks = [];

        this._head = null;
        this._xhrObj = null;

        ///keeps track of current header
        this.currentHash;

        ///when the hash tag changes load that content from configs    
        $(window).bind('hashchange', this._createHashHandler('hashchange'));
        //$(window).bind('load', this._createHashHandler('load'));

        this.enableHashHandler=true;
    }


    dynamicContentLoader.prototype = {
        _createHashHandler: function (state) {

            var t= this;
            var defaultConfig;
            for (c in t.configs)
                if (t.configs[c].defaultPage)
                    defaultConfig = t.configs[c];

            return function () {
                console.log('state',state);
                if(!t.enableHashHandler) return;
                var newHash = window.location.hash.substring(1);
                newHash = newHash.replace('/', '');
                if (t.currentHash != newHash && t.configs) {
                    var segments = newHash.split('/');
                    var config;
                    if (segments[0] )
                        config = t.configs[segments[0]];
                    //else
                    //    config = defaultConfig;

                    t.loadContentObj(config, segments.splice(1));
                }
            }
        }
        , clear: function () {
            this.$dynamicContentContainer.empty();
            $('[dynamicContent=true]').remove();
        }
        /*
         Description:
         injects content from another page into a container

         PARAMS:
         configObj{
         pageName: is a string that is used to tag its resources to remove latter
         pageUrl: is the url where to find the page resource
         jsFiles: is an array of string urls where to find the needed js files
         cssFiles: is an array of string urls where to find the needed css files
         callback: is a function that is called when everything is loaded
         }
         */
        , loadContentObj: function (configObj, segments) {
            if (!configObj) {
                return;
            }
            if (typeof (configObj) == "string")
                configObj = this.configs[configObj];
            this.loadContent(configObj.pageName, configObj.pageUrl, configObj.jsFiles, configObj.cssFiles, segments, configObj.callback);
        }
        /*
         Description:
         injects content from another page into a container

         PARAMS:
         pageName: is a string that used to tag its resources to remove latter
         pageUrl: is the url where to find the page resource
         jsFiles: is an array of string urls where to find the needed js files
         cssFiles: is an array of string urls where to find the needed css files
         callback: is a function that is called when everything is loaded
         */
        , loadContent: function (pageName, pageUrl, jsFiles, cssFiles, segments, callback) {

            /// eliminate accidental duplicate calls
            if (this.lastPageLoaded == pageUrl) {
                console.warn(pageName + " tried to load more than one time");
                return;
            }
            else
                this.lastPageLoaded = pageUrl;

            console.log('dynamically load', pageName, pageUrl);

            //destroy old content resources
            this.clear();

            if (pageName && !pageUrl && this.configs && this.configs[pageName]) {// load from config
                this.loadContentObj(this.configs[pageName], segments);
                return;
            }

            ///fix mistake
            if (segments && !callback && typeof (segments) == 'function') {
                callback = segments;
                segments = null;
            }
            else if (segments) {
                ///must convert to string just in case someone pastes in url
                if (segments.join)
                    segments = segments.join("/");
                else
                    segments = '' + segments; /// make sure its a string
                if (segments[0] == '/' || segments[0] == '\\') segments = segments.substring(1);
                pageName = pageName + '/' + segments;
            }


            /// change url with hash so the the browser can keep history
            this.enableHashHandler = false;
            this.currentHash = pageName.replace('/', '');
            window.location.hash = pageName;
            this.enableHashHandler = true;
            //load new
            /// loads html file "/pages/[page]/[page.html]"
            var t = this;
            this.$dynamicContentContainer.hide().load(pageUrl //+ " #guts"
                , function (response, status, xhr) {
                    if (status == "error") {
                        debugger;
                        console.error("error loading " + pageUrl + " " + xhr.status + " " + xhr.statusText);
                        window.location.hash = xhr.status;

                    }
                    else {
                        //destroy old content resources
                        window.location.hash = t.currentHash;

                        t._loadCSSFiles(cssFiles);
                        t._loadJSFiles(jsFiles);
                        t.$dynamicContentContainer.fadeIn();
                        t.$pageTitle.html(pageName.replace('/', ''));
                        if (typeof (callback) == 'function') callback(segments && segments.length > 0 ? segments.split('/') : []);
                    }
                }
            );

            if (this.callbacks)
                for (var i = 0; i < this.callbacks.length; i++) {
                    this.callbacks[i](this.configs[pageName]);
                }
        }
        /// Get document head element
        , getHead: function () {
            if (this._head == null)
                this._head = document.getElementsByTagName("head")[0];
            return this._head;
        }
        /// loop and load all js Files
        , _loadJSFiles: function (jsFiles) {
            if (jsFiles == undefined || jsFiles == null || jsFiles.length == 0) return;
            if (typeof (jsFiles) == "string") jsFiles = [jsFiles];

            for (var i = 0; i < jsFiles.length; i++)
                this._loadFileSync(jsFiles[i], 'js');
        }
        /// loop and load all css Files
        , _loadCSSFiles: function (cssFiles) {
            if (cssFiles == undefined || cssFiles == null || cssFiles.length == 0) return;

            if (typeof (cssFiles) == "string") cssFiles = [cssFiles];

            for (var i = 0; i < cssFiles.length; i++)
                this._loadFileASync(cssFiles[i], 'css');

        }
        /// load file async -- not used
        , _loadFileASync: function (url, type) {

            // add the returned content to a newly created script tag
            switch (type) {
                case 'js':
                    var fileref = document.createElement('script');
                    fileref.setAttribute("type", "text/javascript");
                    fileref.setAttribute("src", url);
                    fileref.setAttribute("dynamicContent", true);
                    this.getHead().appendChild(fileref);
                    break;
                case 'css':
                    var fileref = document.createElement("link");
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", url);
                    fileref.setAttribute("dynamicContent", true);
                    this.getHead().appendChild(fileref);
                    break;
            }
        }
        /// load file synchronously 
        , _loadFileSync: function (url, type, tag) {
            // get some kind of XMLHttpRequest
            if (this._xhrObj == null) this._xhrObj = this._getXHR();
            var externalFile = url.indexOf('http') == 0;

            if (!externalFile) {
                // open and send a synchronous request
                this._xhrObj.open('GET', url, false);
                this._xhrObj.send('');
                // add the returned content to a newly created script tag
            }
            var e;
            switch (type) {
                case 'js':
                    e = document.createElement('script');
                    e.type = "text/javascript";
                    if (externalFile) e.src = url;
                    break;
                case 'css':
                    e = document.createElement('link');
                    e.type = "text/css";
                    e.rel = "stylesheet";
                    e.href = url;
                    break;
            }

            if (e) {
                e.setAttribute('dynamicContent', true);
                if (!externalFile) e.text = this._xhrObj.responseText;
                this.getHead().appendChild(e);

            }

        }
        /// get XMLHttpRequest object for sync load
        , _getXHR: function () {
            var xmlhttp;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        }
    };


    return dynamicContentLoader;
});