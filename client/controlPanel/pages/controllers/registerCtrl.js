$javuApp.controller('registerCtrl', ['$http', '$scope','authManager', function ($http, $scope,authManager) {


    $scope.register = function () {
        var frm = document.querySelector('#frmRegistrationForm');

        var txt = document.querySelector('#txtConfirm');
        if ($scope.user.password != $scope.user.passwordConfirmation)
            txt.setCustomValidity("Password doesn't match");
        else
            txt.setCustomValidity('');


        if (frm.checkValidity()) {

            $http.post('/api/users/user', $scope.user)
                .success(function (user) {

                    authManager.login( $scope.user.email, $scope.user.password)
                        .success(function (user) {
                            window.location.hash="/";
                        })
                        .error(function (err) {

                        });
                })
                .error(function (err) {
                    debugger;
                    if (err.code == 'duplicateUsername')
                        uiManager.showAlert('danger', err.message);
                    else
                        uiManager.showAlert('danger', 'An error occurred while attempting to register your account. Please try again latter');
                }
            );
        }
    };

}]);

