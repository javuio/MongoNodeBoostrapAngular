$javuApp.controller('loginCtrl', ['$scope', '$http','uiManager','authManager'
    , function ($scope, $http,uiManager,authManager) {

         if (authManager.isUserLoggedIn()){
             authManager.logout();
            //return;
         }

        //uiManager.hideSidebar().hideTopMenu();

        if (window.localStorage) {
            $scope.email = window.localStorage.getItem("rememberUserName");
        }

        $scope.submit = function () {
            /// will auto navigate to dashboard on its own
            authManager.login( $scope.email, $scope.password)
                .success(function (user) {
                   // uiManager.showSidebar();
                   // uiManager.showTopMenu();
                    window.location.hash="/";
                    if($scope.rememberMe)
                        localStorage.setItem('rememberUserName', $scope.email);

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
