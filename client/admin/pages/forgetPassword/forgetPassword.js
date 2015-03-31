
define({
    init: function () {
        $('#frmForgetPassword').bootstrapValidator({
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
                            message: 'The email address is required and cannot be empty'
                        },
                        emailAddress: {
                            message: 'The email address is invalid'
                        }
                    }
                }
            }
        });

        $('#btnSend:first').click(function () {
            api.post('api/users/forgetPassword', { username: $("#txtEmail").val() }, function (err, result) {
                if (err) {
                    showAlert('warning', err.message);
                }
                else
                    showAlert('success', 'Please check your email to reset your password');
            });
        });

        $('#btnBack').click(function () {

            window.location.href = "/login.html";

        });

        $("#frmForgetPassword input").keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                $('#btnSend:first').trigger("click");
            }
        });

    }
});