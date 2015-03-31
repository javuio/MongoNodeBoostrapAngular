$(document).ready(function () {
    if (console.log) console.log("document ready");

    require(['masterPageController', 'mainMenu', 'manifest', 'adminManager', 'uiManager', 'bootstrap'], function (masterPageController, mainMenu, manifest, adminManager, uiManager) {
        //disable and hide everything
        uiManager.hideSidebar();
        uiManager.disableMenu();

        var adminLoginHandler = function (user, callback) {
            if (user) {
                
                //needs some enhancement
                var adminValidationHandler = function (admin) {
                    if (admin) {
                        
                            //enable and show everything
                            uiManager.enableMenu();
                            uiManager.showSidebar();
                            callback(user);
                    }
                }
                var currentAdmin = adminManager.getCurrentAdmin();
                if (currentAdmin) {
                    adminValidationHandler(currentAdmin);
                }
                else
                    adminManager.getAdminByCurrentUser(adminValidationHandler);
            }
        }

        masterPageController.init({ loginHandler: adminLoginHandler });
        window.masterPageController = masterPageController;
        
        if (mainMenu)
            mainMenu.init({ pages: manifest.pages, dynamicLoader: manifest.dynamicLoader });
        else
            debugger;

        $('#profileLogout').click(function () {
            require(['authManager'], function (authManager) {
                authManager.logout();
                window.location = "/login.html";
            });
            return false;
        });
    });
});

if (console.log) console.log("index.js loaded");