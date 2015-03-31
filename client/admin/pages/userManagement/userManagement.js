
define({
    init: function () {

        require(['dataTable', 'dataTableBootstrap', 'bootstrapValidator', 'moment'], function () {
            $("#div-loading").show();
            api.post('api/users/admins/getUsers', {}, function (err, result) {
                if (err) {
                    showAlert('warning', err.message);
                }
                else {

                    var nCloneTh = document.createElement('th');
                    var nCloneTd = document.createElement('td');
                    nCloneTd.innerHTML = '<img src="images/details_open.png">';
                    nCloneTd.className = "center";
                    var $customerItem = $("<tr></tr>");
                    for (var i = 0; i < result[0].length; i++) {
                        $customerItem.append("<td>" + moment(result[0][i].registerDate).format('MM/D/YY h:mm a') + "</td>"); // date
                        $customerItem.append("<td>" + (result[0][i].firstName == null ? "" : result[0][i].firstName) + "</td>");
                        $customerItem.append("<td>" + (result[0][i].lastName == null ? "" : result[0][i].lastName) + "</td>");
                        $customerItem.append("<td>" + result[0][i].username + "</td>");
                        $customerItem.append("<td>" + (result[0][i].role ? (result[0][i].role.length > 20 ? result[0][i].role.substring(0, 20) + "..." : result[0][i].role) : "") + "</td>"); // Amount
                        $("#hidden-table-info tbody").append($customerItem);
                        $customerItem = $("<tr></tr>");
                    }
                    $('#hidden-table-info thead tr').each(function () {
                        nCloneTh.innerText = 'edit';
                        this.insertBefore(nCloneTh, this.childNodes[0]);
                    });

                    $('#hidden-table-info tbody tr').each(function () {
                        this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
                    });

                    /*
                     * Initialse DataTables, with no sorting on the 'details' column
                     */
                    var oTable = $('#hidden-table-info').dataTable({
                        "aoColumnDefs": [
                            { "bSortable": false, "aTargets": [0] }
                        ],
                        "bFilter":false,
                        "bLengthChange": false,
                        "aaSorting": [[1, 'asc']]
                    });


                    $(document).off('click', '#hidden-table-info tbody td img');
                    $(document).on('click', '#hidden-table-info tbody td img', function () {

                        var nTr = $(this).parents('tr')[0];
                        if (oTable.fnIsOpen(nTr)) {
                            /* This row is already open - close it */
                            this.src = "images/details_open.png";
                            oTable.fnClose(nTr);
                        }
                        else {
                            /* Open this row */

                            this.src = "images/details_close.png";
                            oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');

                            $('#profileForm').bootstrapValidator({
                                // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
                                feedbackIcons: {
                                    valid: 'glyphicon glyphicon-ok',
                                    invalid: 'glyphicon glyphicon-remove',
                                    validating: 'glyphicon glyphicon-refresh'
                                },
                                fields: {
                                    txtFName: {
                                        validators: {
                                            notEmpty: {
                                                message: 'required '
                                            }
                                        }
                                    },
                                    txtLName: {
                                        validators: {
                                            notEmpty: {
                                                message: 'required'
                                            }
                                        }
                                    },

                                    txtNewPassword: {
                                        validators: {

                                            identical: {
                                                field: 'txtConfirmPassword',
                                                message: 'The confirm password should be the same as password '
                                            }
                                        }
                                    },

                                    txtConfirmPassword: {
                                        validators: {
                                            identical: {
                                                field: 'txtNewPassword',
                                                message: 'The confirm password should be the same as password '
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                    $(document).off('click', '#hidden-table-info tbody td input[id="btnUpdate"]');
                    $(document).on('click', '#hidden-table-info tbody td input[id="btnUpdate"]', function () {

                        var tbl = $(this).parents('div').first().parents('div').first();
                        var fName = tbl.find("#txtFName").val();
                        var lName = tbl.find("#txtLName").val();
                        var email = tbl.find("#txtEmail").val();
                        var password = tbl.find("#txtNewPassword").val();

                        $("#profileForm").data('bootstrapValidator').resetForm();
                        if ($('#profileForm').data('bootstrapValidator').validate().isValid()) {
                            api.post('api/users/admins/updateUser', {
                                firstName: fName,
                                lastName: lName,
                                email: email,
                                password: password,
                            }, function (err, result) {
                                if (err) {
                                    showAlert('warning', err.message);
                                }
                                else {
                                    tbl.parents('tr').prev()[0].cells[2].innerText = fName;
                                    tbl.parents('tr').prev()[0].cells[3].innerText = lName;
                                    tbl.parents('tr').prev().find('img').click();
                                    //showAlert('success', 'You have successfully updated the customers information');

                                }
                            });
                        }
                        return false;
                    });
                }
                $("#div-loading").hide();
            });
        });

        function fnFormatDetails(oTable, nTr) {
            var aData = oTable.fnGetData(nTr);
            var sOut = '<form id="profileForm" role="form" ><div class="col-md-12">';
            sOut += '<div class="col-md-6">'
            sOut += '<div class="row"><div class="form-group"><label>Email</label><input type="email" class="form-control" id="txtEmail" value="' + aData[4] + '" name="txtEmail" disabled placeholder="Email"></div></div>';
            sOut += '<div class="row"><div class="form-group"><label>First Name</label><input type="text" class="form-control" id="txtFName"  value="' + aData[2] + '"  name="txtFName" placeholder="First Name"></div></div>';
            sOut += '<div class="row"><div class="form-group"><label>Last Name</label><input type="text" class="form-control" id="txtLName"  value="' + aData[3] + '"  name="txtLName" placeholder="Last Name"></div></div>';
            sOut += '</div>'
            sOut += '<div class="col-md-6">'
            sOut += '<div class="row"><div class="form-group"><label>New Password:</label><input type="password"  class="form-control" id="txtNewPassword"  name="txtNewPassword"  /></div></div>';
            sOut += '<div class="row"><div class="form-group"><label>Confirm Password:</label><input type="password"  class="form-control" id="txtConfirmPassword"  name="txtConfirmPassword"  /></div></div>';
            sOut += '<input  id="btnUpdate"  type="submit"  class="btn btn-primary pull-right saveUpdatesBtn" value="Save" />';
            sOut += '</div>'
            sOut += '</div></form>';
            return sOut;

        }
    }
});
