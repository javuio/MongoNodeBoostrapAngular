$javuApp.controller('loginCtrl', ['$scope', '$http','uiManager','authManager'
    , function ($scope, $http,uiManager,authManager) {
        /*
         if (authManager.isUserLoggedIn()){
         masterPageController.load('dashboard');
         return;
         }
         */
        //uiManager.hideSidebar().hideTopMenu();

        if (window.localStorage) {
            $scope.userName = window.localStorage.getItem("rememberUserName");

        }

        $scope.submit = function () {
            /// will auto navigate to dashboard on its own
            authManager.login( $scope.username, $scope.password)
                .success(function (user) {
                   // uiManager.showSidebar();
                   // uiManager.showTopMenu();
                    window.location.hash="/";
                    if($scope.rememberMe)
                        localStorage.setItem('rememberUserName', $scope.username);

                })
                .error(function (err) {
                   // uiManager.showAlert('warning', err.message);
                });

        };

        $scope.forgotPassword = function () {
            window.location = '/forgetPassword';
        };

    }
]);
