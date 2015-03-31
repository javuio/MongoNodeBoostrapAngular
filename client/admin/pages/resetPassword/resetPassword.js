
define({
    init: function () {

        var tempAuthKey = null;
        var userToken = null;
        tempAuthKey = getParameterByName("tempAuthKey");
        //for testing
        //tempAuthKey = 123123;
        api.get('api/users/tempAuthKey', {
            tempAuthKey: tempAuthKey
        }, function (err, result) {
            if (err)
                showAlert('warning', err.message);
            else {
                $("#bodyContainer").removeClass("hidden");
                userToken = result.userToken;
                $("#userEmail").html(result.email);
            }
        });

        $('#frmResetPassword').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The passwrd is required and cannot be empty'
                        }, regexp: {
                            regexp: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message: 'Use at least 8 characters, least 1 number and both lower and uppercase letters and special characters'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: 'The password should be the same as confirm password '
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'The confirm passwrd is required and cannot be empty'
                        },
                        identical: {
                            field: 'password',
                            message: 'The confirm password should be the same as password '
                        }
                    }
                }
            }
        });

        $('#btnResetPassword:first').click(function () {
            api.post('api/users/resetPassword', {
                tempAuthKey: tempAuthKey,
                userToken: userToken,
                password: $("#txtPassword").val()
            }, function (err, result) {
                if (err)
                    showAlert('warning', err.message);
                else {
                    require(['authManager'], function (authManager) {
                        authManager.setCurrentUser(result);

                        $("#bodyContainer").addClass('hidden');
                        var redirectPage = getParameterByName("redirectPage");
                        if (redirectPage != null && redirectPage != '') {
                            showAlert('success', 'Password has been reset successfully, we will redirect you in 5 sec.');

                            setTimeout(function () { window.location = redirectPage; }, 5000);
                        }
                        else {
                            showAlert('success', 'Password has been reset successfully');
                        }
                    });
                }
            });
        });
    }
});