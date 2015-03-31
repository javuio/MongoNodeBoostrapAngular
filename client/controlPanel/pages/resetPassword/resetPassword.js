
define({
    init: function () {
        require(['uiManager', 'masterPageController'], function (uiManager,masterPageController) {
            var tempAuthKey = null;
            var userToken = null;
            tempAuthKey = masterPageController.getParameterByName("tempAuthKey");
            
            //show Spinner 
            uiManager.showSpinner();
            api.get('api/users/tempAuthKey', {
                tempAuthKey: tempAuthKey
            }, function (err, result) {
                uiManager.hideSpinner();
                if (err)
                    showAlert('warning', err.message);
                else {
                    $("#bodyContainer").removeClass("hidden");
                    userToken = result.userToken;
                    $("#userEmail").html(result.email);
                }
            });


            $("input").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $('#btnResetPassword:first').trigger("click");
                }
            });
            $('#btnResetPassword:first').click(function () {

                if ($('#frmResetPassword:first')[0].triggerValidationUI()) {
                    uiManager.showSpinner();
                    api.post('api/users/resetPassword', {
                        tempAuthKey: tempAuthKey,
                        userToken: userToken,
                        password: $("#txtPassword").val()
                    }, function (err, result) {
                        uiManager.hideSpinner();
                        if (err)
                            showAlert('warning', err.message);
                        else {
                            require(['authManager'], function (authManager) {
                                authManager.setCurrentUser(result);

                                $("#bodyContainer").addClass('hidden');
                                var redirectPage = getParameterByName("redirectPage");
                                showAlert('success', 'Password has been reset successfully, we will redirect you in 5 sec.');
                                if (redirectPage == null || redirectPage == '')
                                    redirectPage = "/index.html";
                                setTimeout(function () { window.location = redirectPage; }, 5000);
                            });
                        }
                    });
                }
            });
        });
    }
});