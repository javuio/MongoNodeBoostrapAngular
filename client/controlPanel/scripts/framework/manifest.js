define(['dynamicContentLoader', 'uiManager'], function (dynamicContentLoader, uiManager) {
    var manifest = {

        dynamicLoader: null

        , pages: {
            register: {pageUrl: '/pages/register/register.html'}
            , login: {externalPage: true, pageTitle: 'Login', pageUrl: '/pages/login/login.html'}
            , forgetPassword: {pageTitle: 'Forget Password', pageUrl: '/pages/forgetPassword/forgetPassword.html'}
            , resetPassword: {pageTitle: 'Reset Password', pageUrl: '/resetPassword.html'}
            , dashboard: {
                defaultPage: true,
                mainMenuLabel: 'Dashboard',
                pageTitle: 'Dashboard',
                className: 'mnuDashboard',
                menuId: 'menuDashboard',
                pageUrl: '/pages/dashboard/dashboard.html'
            }
            , page1: {
                mainMenuLabel: 'Page 1',
                pageTitle: 'Page 1',
                menuId: 'mnuPage1',
                pageUrl: '/pages/page1/page1.html'
            }
            , profile: {pageTitle: 'profile', pageUrl: '/pages/profile/profile.html'}
            , '404': {pageTitle: 'Page not Found', pageUrl: '/pages/404/404.html'}
        }
        , load: function (configName, segments) {

            if (configName == '')
                configName = 'dashboard';

            if (typeof(this.pages[configName]) == 'undefined') {
                console.log('configName "' + configName + '" was not found redirecting to 404');
                configName = "404";

            }
            this.dynamicLoader.loadContentObj(this.pages[configName], segments);

        }
    };

    manifest.dynamicLoader = new dynamicContentLoader('dynamicContentContainer', 'pageTitle', manifest.pages);

    /* Important fix pageName because thats what would be used in the tag*/
    for (var config in manifest.pages) {
        if (manifest.pages[config].pageUrl)
            manifest.pages[config].pageName = config;
    }

    return manifest;
});