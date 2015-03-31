
define(['uiManager'], function(uiManager) {
    return {
        init: function () {
            ///fix ui
            uiManager.hideSidebar().hideTopMenu();

            var frm = $('#frmRegistrationForm:first')[0];

            $('#btnRegister:first').click(function () {

                var email = $('#txtEmail:first').val();
                var $password = $('#txtPassword:first');
                var password = $password.val();
                var $passwordConfirmation = $('#txtConfirm:first');

               if (password != $passwordConfirmation.val())
                    $passwordConfirmation[0].setCustomValidity("Password doesn't match");
                else
                    $passwordConfirmation[0].setCustomValidity('');


                if (frm.checkValidity()) {

                    api.post('/api/register'
                        , {email: email, password: password, firstName: $('#txtFirstName:first').val(), lastName: $('#txtLastName:first').val() }
                        , function (err, user) {
                            if (err) {

                                if (err.code == 'duplicateUsername')
                                    uiManager.showAlert('danger', err.message);
                                else
                                    uiManager.showAlert('danger', 'An error occurred while attempting to register your account. Please try again latter');
                                return false;
                            }
                            else {
                                require(['authManager']
                                    , function (authManager) {

                                        authManager.login(email
                                            , password
                                            , function (err, result) {
                                                if (err) {
                                                    require(['uiManager'], function (uiManager) {
                                                        uiManager.showAlert('warning', err.message);
                                                    });
                                                }
                                            }
                                        );
                                    });
                            }

                        }
                    );
                    return false;
                }
            });

        }
    }
});
