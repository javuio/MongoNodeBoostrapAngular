
define('masterPageController', ['manifest', 'authManager','profileControl'], function (manifest, authManager,profileControl) {

    function masterPageController(manifest) {
        this.subPagesManifest = manifest;
    }

    masterPageController.prototype = {
        init: function (options) {
            if (!options) options = {};

            var t = this;
            /// override the login and logout handlers in auth manager
            authManager.logoutHandler = function () {
                profileControl.setUser(null);
                if (options.logoutHandler) {
                    options.logoutHandler(function () {
                        return t._logOutHandler();
                    });
                }
                else
                    return t._logOutHandler();
            };
            authManager.loginHandler = function (user) {
                profileControl.setUser(user);
                if (options.loginHandler) {
                    options.loginHandler(user, function () {
                        return t._loginHandler(user);
                    });
                }
                else
                    return t._loginHandler(user);
            };

            authManager.attemptAutoLogin();

            /// set the main dynamic controller container
            this.$dynamicContentContainer = $('#dynamicContentContainer:first');

            /// handle any access denied api reply with a kickout to login
            api.accessDeniedHandle = this._logOutHandler;
        }
        /// loads a page config. basically a hop for the dcl
        , load: function (configName, segments) {
            this.subPagesManifest.load(configName, segments);
        }
        , _logOutHandler: function () {
            /// load the login page
            this.load('login');
            /// clear the profile control in the top right side of the page
            profileControl.clear();

        }
        , _loginHandler: function (user) {
            var hash = window.location.hash.replace('#','').split('/')[0];
            if(hash == '' || hash == 'login')
                hash= 'dashboard';

            this.load(hash);
        }
        , kickOutIfNotLoggedIn: function () {
            if (!authManager.isUserLoggedIn()) {
                this.load('login');
                return true;
            }
            else
                return false;
        }
        ,getParameterByName:function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    return new masterPageController(manifest);
});