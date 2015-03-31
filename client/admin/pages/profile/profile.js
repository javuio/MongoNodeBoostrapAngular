
define({
    init: function () {
        require(['adminManager'], function (adminManager) {
            
            var currentAdmin = adminManager.getCurrentAdmin();
            $("#txtFName").val(currentAdmin.firstName);
            $("#txtLName").val(currentAdmin.lastName);
            $("#txtEmail").val(currentAdmin.username);
        
        $('#imgProfile').click(function () {
            $('#ifProfilrImage').click();
        });
        $('#btnUpdateProfile:first').click(function () {
            api.post('api/users/admins/updateUserProfile', {
                firstName: $("#txtFName").val(),
                lastName: $("#txtLName").val(),
                email: $("#txtEmail").val()
            }, function (err, result) {
                if (err) {
                    showAlert('warning', err.message);

                }
                else {
                    showAlert('success', 'Operation done successfully');
                    var currentAdmin = adminManager.getCurrentAdmin();
                    currentAdmin.firstName= $("#txtFName").val();
                    currentAdmin.lastName = $("#txtLName").val();
                    adminManager.setCurrentAdmin(null);
                    return false;
                }
            });
            return false;
            var file = $('#ifProfilrImage')[0].files[0];
            if (file) {
                /*   $.ajax({
                       type: 'post',
                       url: 'api/users/updateUserProfile?name=' + file.name,
                       data: file,
                       success: function () {
                           // do something
                       },
                       xhrFields: {
                           // add listener to XMLHTTPRequest object directly for progress (jquery doesn't have this yet)
                           onprogress: function (progress) {
                               // calculate upload progress
                               var percentage = Math.floor((progress.total / progress.totalSize) * 100);
                               // log upload progress to console
                               console.log('progress', percentage);
                               if (percentage === 100) {
                                   console.log('DONE!');
                               }
                           }
                       },
                       processData: false,
                       contentType: file.type
                   });*/
            }

           
        });
});
        $('#btnChangePassword:first').click(function () {

            api.post('api/users/changePassword', {
                currentPassword: $("#txtOldPassword").val(),
                newPassword: $("#txtNewPassword").val()
            }, function (err, result) {
                if (err)
                    showAlert('warning', err.message);
                else {
                    showAlert('success', 'Operation done successfully');
                }
            });
            return false;
        });
     
        $('#changePasswordForm').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                txtOldPassword: {
                    validators: {
                        notEmpty: {
                            message: 'required '
                        }
                    }
                },
                txtNewPassword: {
                    validators: {
                        notEmpty: {
                            message: 'required'
                        }, regexp: {
                            regexp: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message: 'Use at least 8 characters, least 1 number and both lower and uppercase letters and special characters'
                        },
                        identical: {
                            field: 'txtConfirmPassword',
                            message: 'The password should be the same as confirm password '
                        }
                    }
                },
                txtConfirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'required'
                        },
                        identical: {
                            field: 'txtNewPassword',
                            message: 'The confirm password should be the same as password '
                        }
                    }
                }
            }
        });
        $('#profileForm').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                txtName: {
                    validators: {
                        notEmpty: {
                            message: 'required '
                        }
                    }
                },
                txtdisplyName: {
                    validators: {
                        notEmpty: {
                            message: 'required'
                        }
                    }
                },
                txtEmail: {
                    validators: {
                        notEmpty: {
                            message: 'required'
                        },
                        emailAddress: {
                            message: 'The email address is invalid'
                        }
                    }
                }
            }
        });


    }
});
