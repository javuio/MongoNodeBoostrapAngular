define({
    init: function () {

        var user;
        require(['authManager'], function (authManager) {
            if (!authManager.isUserLoggedIn()) {
                window.location.hash ='login';
                return;
            }

            user = authManager.getCurrentUser();
            $('#firstName:first').val(user.firstName);
            $('#lastName:first').val(user.lastName);
        });

        function customCheck() {
            var currentPassword = $('#currentPassword:first')[0];
            var newPassword = $('#newPassword:first')[0];
            var confirmPassword = $('#confirmPassword:first')[0];


            if (newPassword.value && ! currentPassword.value)
                currentPassword.setCustomValidity('Current Password is required.');
            else
                currentPassword.setCustomValidity('');

            if (newPassword.value != confirmPassword.value)
                confirmPassword.setCustomValidity('Confirmation does not match.');
            else
                confirmPassword.setCustomValidity('');

            /// also trigger all the native html5 validations
            return $("#changePasswordForm:first")[0].checkValidity();
        }


        $('#saveButton:first').click(function () {


            if (customCheck()) {
                require(['uiManager'], function (uiManager) {
                    uiManager.showSpinner('saving', 2000);

                    user.firstName = $('#firstName:first').val();
                    user.lastName = $('#lastName:first').val();
                    var currentPassword = $("#currentPassword:first").val();
                    var newPassword = $('#newPassword:first').val();

                    /*First update the user profile*/
                    api.post('api/users/user/update', {user:user} /// updated based on user token not ID
                        , function (err, user) {
                            /*If all is well then check if password needs updating*/
                            if (err) {
                                uiManager.showAlert('warning', err.message);
                                uiManager.hideSpinner();
                                return;
                            }
                            else {

                                var finalize = function(err,user){
                                    uiManager.hideSpinner();
                                    uiManager.showAlert('success', 'Your profile has been saved');
                                    require(['authManager'], function (authManager) {
                                        authManager.setCurrentUser(user);
                                    });
                                };

                                if (newPassword && newPassword != currentPassword) {
                                    api.post('api/users/changePassword', {
                                        currentPassword: currentPassword,
                                        newPassword: newPassword.value
                                    }, finalize);
                                }
                                else
                                    finalize(null,user);
                            }

                        });


                });
                /// to stop the submit button from redirecting the location
                return false;
            }


        });
    }
});


