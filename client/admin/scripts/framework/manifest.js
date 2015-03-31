define(['dynamicContentLoader'], function (dynamicContentLoader) {
    var manifest = {

        dynamicLoader: null

        , pages: {
            register: { pageUrl: '/pages/register/register.html' }
            , login: { externalPage: true, mainMenuLabel: false, pageTitle: 'Login', pageUrl: '/login.html', jsFiles: [], cssFiles: [], callback: null }
            , forgetPassword: { externalPage: true, mainMenuLabel: false, pageTitle: 'Forget Password', pageUrl: '/forgetPassword.html', jsFiles: [], cssFiles: [], callback: null }
            , resetPassword: { externalPage: true, mainMenuLabel: false, pageTitle: 'Reset Password', pageUrl: '/resetPassword.html', jsFiles: [], cssFiles: [], callback: null }
            , dashboard: { mainMenuLabel: 'Dashboard', pageTitle: 'Dashboard', icon: 'fa-dashboard', menuId: 'menuHome', pageUrl: '/pages/home/home.html', jsFiles: [], cssFiles: [], callback: null }
            , manageUsers: { mainMenuLabel: 'Manage Users', pageTitle: 'Manage Users', icon: 'fa-users', menuId: 'menuManageUsers', pageUrl: '/pages/userManagement/userManagement.html', jsFiles: [], cssFiles: [], callback: null }
            , profile: { mainMenuLabel: false, pageTitle: 'profile', icon: null, pageUrl: '/pages/profile/profile.html', jsFiles: [], cssFiles: [], callback: null }
           }
        , load: function (configName, segments) {
            if (this.pages[configName].externalPage)
                window.location = this.pages[configName].pageUrl;
            else {
                //to do with ayman
                //make the selected menu active
                $('#nav-accordion').find('li > a').removeClass("active");
                $('#nav-accordion').find('#' + this.pages[configName].menuId + ' a').addClass("active");
                //set the title for the current page
                $("#pageTitle").text(this.pages[configName].pageTitle);

                this.dynamicLoader.loadContentObj(this.pages[configName], segments);
            }
        }
    }

    manifest.dynamicLoader = new dynamicContentLoader('dynamicContentContainer', manifest.pages);

    for (var config in manifest.pages)
        if (manifest.pages[config].pageUrl)
            manifest.pages[config].pageName = config;

    return manifest;
});