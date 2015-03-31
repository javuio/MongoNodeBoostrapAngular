
define({
    init: function () {

        
        $('#btnRegister:first').click(function () {
            hideAlert();
            var email = $('#txtEmail:first').val();
            var $password = $('#txtPassword:first');
            var password = $password.val();
            var $passwordConfirmation = $('#txtConfirm:first');

            if (password.length < 6)
                $password[0].setCustomValidity("Password is too short must be at least 6 charecters");
            else
                $password[0].setCustomValidity('');

            if (password != $passwordConfirmation.val())
                $passwordConfirmation[0].setCustomValidity("Password doesn't match");                            
            else
                $passwordConfirmation[0].setCustomValidity('');


            if ($('#divRegistrationForm:first').triggerValidationUI()) {

                api.post('/api/user'
                , { username: email, password: password }
                , function (err,user) {
                    
                    if (err){
                        if (err.code == 409)
                            showAlert('danger',err.message);
                    }
                    else {
                        require(['authManager','masterPageController']   
                        , function (authManager, masterPageController) {

                            authManager.login(email
                               ,password
                               , function (err, result) {
                                   if (err)
                                       showAlert('warning', err.message);

                                   else
                                       masterPageController.load('home');

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
});
