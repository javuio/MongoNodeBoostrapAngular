
define({
    init: function () {
        require(['uiManager'], function (uiManager) {

            var $frm = $('#frmForgetPassword:first');
            $('#btnSend:first').click(function () {

                if ($frm[0].checkValidity()) {
                    uiManager.showSpinner();
                    api.post('api/users/forgetPassword', { username: $("#txtEmail").val() }, function (err, result) {
                        uiManager.hideSpinner();
                        if (err) {
                            uiManager.showAlert('warning', err.message);
                        }
                        else
                            uiManager.showAlert('success', 'Please check your email to reset your password');
                    });
                }
                return false;
            });

            $('#btnBack:first').click(function () {
                require(['masterPageController'], function(masterPageController){
                    masterPageController.load('login');
                });
            });

            $frm.keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $('#btnSend:first').trigger("click");
                }
            });

        });
    }
});