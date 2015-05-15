$javuApp.controller('profileCtrl', ['$http', '$scope', 'authManager', function ($http, $scope, authManager) {

    if (!authManager.isUserLoggedIn()) {
        window.location.hash = '/login';
        return;
    }

    $scope.user = authManager.getCurrentUser();

    function customCheck() {

        if($scope.user.newPassword && !$scope.user.currentPassword){
            alert('Current password required');
            return false;
        }

        if($scope.user.newPassword != $scope.confirmPassword){
            alert('Password confirmation doesnt match');
            return false;
        }
        //$scope.currentPassword.$setValidity('Current Password is required.',$scope.newPassword && ! $scope.currentPassword);
        //$scope.confirmPassword.$setValidity('Confirmation does not match.',$scope.newPassword != $scope.confirmPassword);

        /// also trigger all the native html5 validations
        // return $("#changePasswordForm:first")[0].checkValidity();
        return document.querySelector("#changePasswordForm").checkValidity();
    }

    $scope.updateUser = function () {

        if (customCheck()) {

            //uiManager.showSpinner('saving', 2000);

            /*First update the user profile*/
            $http.post('/api/users/user/update', {user: $scope.user})
                .success (function (user) {
                    /*If all is well then check if password needs updating*/
                    delete $scope.user.newPassword;
                    delete $scope.user.currentPassword;
                    authManager.setCurrentUser($scope.user);
                });
        }


    };


}]);


