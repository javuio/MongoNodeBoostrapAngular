
define({
    init: function () {
        require(['authManager'], function (authManager) {
            if (authManager.isUserLoggedIn())
                window.location = "/index.html";
        });

        $('#frmLogin').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                txtEmail: {
                    validators: {
                        notEmpty: {
                            message: 'The username required and cannot be empty'
                        },
                        emailAddress: {
                            message: 'The email address is invalid'
                        }
                    }
                },
                txtPassword: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and cannot be empty'
                        }
                    }
                }
            }
        });

        $('#btnLogin:first').click(function () {
            require(['authManager']
                , function (authManager) {
                    authManager.login($('#txtEmail').val()
                       , $('#txtPassword').val()
                       , function (err, result) {
                           if (err)
                               showAlert('warning', err.message);
                           else {
                               api.post('api/login/std', {
                                   email: $('#txtEmail').val(),
                                   password: $("#txtPassword").val()
                               }, function (err, result) {
                                   if (err)
                                       showAlert('warning', err.message);
                                   else {
                                       window.location = "/index.html";
                                   }
                               });
                           }
                       });
                });
        });

        $("#frmLogin input").keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                $('#btnLogin:first').trigger("click");
            }
        });
    }
});
