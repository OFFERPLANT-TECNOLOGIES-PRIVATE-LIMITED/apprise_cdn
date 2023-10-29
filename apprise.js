/* Apprise Js By OfferPlant*/
var base_url = "http://" + window.location.host + "/apprise/temp/";
//=======AUTO LOGOUT AFTER 2 Min of Inactivity ====//
var timeSinceLastMove = 0;
$(document).on('mousemove , keyup', function() {
    timeSinceLastMove = 0;
});

function checkTime() {
    timeSinceLastMove++;
    console.log(timeSinceLastMove);
    if (timeSinceLastMove > 5 * 60) {
        autologout();
    } else {
        setTimeout(checkTime, 10000);
    }
}

//=====INSERT BUTTON =========//
$(document).on('click',"#insert_btn", function() {
    $("#insert_frm").validate();

    if ($("#insert_frm").valid()) {
        var task = $("#insert_frm").attr('action');
        $(this).attr("disabled", true);
        $(this).html("Please Wait...");
        var data = $("#insert_frm").serialize();
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=' + task,
            'data': data,
            success: function(data) {
                console.log(data);
                //alert(data);
                var obj = JSON.parse(data);
                $('#insert_frm')[0].reset();
                if ($('#uploadForm').length != 0) {
                    $('#uploadForm')[0].reset();
                }
                //$.notify(obj.msg, obj.status);

                $("#insert_btn").html("Save Details");
                $("#insert_btn").removeAttr("disabled");
                if (obj.url != null) {
                    bootbox.alert(obj.msg, function() {
                        window.location.replace(obj.url);
                    });
                } else {
                    $.notify(obj.msg, obj.status);
                }
            }

        });
    }
});


//=====UPDATE BUTTON =========//
$(document).on('click',"#update_btn",function() {
    $("#update_frm").validate();

    if ($("#update_frm").valid()) {
        var task = $("#update_frm").attr('action');
        $(this).attr("disabled", true);
        $(this).html("Please Wait...");
        var data = $("#update_frm").serialize();
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=' + task,
            'data': data,
            success: function(data) {
                //alert(data);
                console.log(data);
                var obj = JSON.parse(data);
                //	$('#update_frm')[0].reset();

                $("#update_btn").html("Save Details");
                $("#update_btn").removeAttr("disabled");
                if (obj.url != null) {
                    bootbox.alert(obj.msg, function() {
                        window.location.replace(obj.url);
                    });
                } else {
                    $.notify(obj.msg, obj.status);
                }
            }

        });
    }
});
//=====Wa Send =========//
function wa_send(e){
    const link = $(e).data('link');
    const msg = $(e).data('msg');
    const img = $(e).data('img');
    const number = $(e).data('number');
    const pdf = $(e).data('pdf');
    let data = 'link='+link+'&msg='+msg+'&img='+img+'&pdf='+pdf+'&number='+number;
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=wa_send',
            'data': data,
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);
                if (obj.url != null) {
                    bootbox.alert(obj.msg, function() {
                        window.location.replace(obj.url);
                    });
                } else {
                    $.notify(obj.msg, obj.status);
                }
            }

        });
}

//=====DELETE BUTTON =========//
$(document).on('click', '.delete_btn', function() {
    var del_row = $($(this).closest("tr"));
    var id = $(this).attr("data-id");
    var table = $(this).attr("data-table");
    var pkey = $(this).attr("data-pkey");
    var per = $(this).attr("data-per");
    bootbox.confirm({
        message: "Do you really want to delete this?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            if (result == true) {
                $.ajax({
                    'type': 'POST',
                    'url': 'temp/master_process?task=master_delete',
                    'data': { 'id': id, 'table': table, 'pkey': pkey, 'permission': per },
                    success: function(data) {
                        //alert(data);
                        var obj = JSON.parse(data);
                        $.notify(obj.msg, obj.status);
                        del_row.hide(500);
                        location.reload();
                    }
                });
            }
        }
    });
});



//=====SET Fee BUTTON =========//
$(document).on('click', ".set_fee_btn", function() {
    var del_row = $($(this).closest("tr"));
    var fee_value = $(this).closest("tr").find(".fee_value").val();
    var sid = $(this).closest("tr").find(".fee_value").attr("data-id");
    if (fee_value === "" || fee_value === null) {
        $.notify("Sorry Fee Amount Can't be Empty", "info");
    } else {
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=set_fee',
            'data': { 'student_id': sid, 'course_fee': fee_value },
            success: function(data) {
                //alert(data);
                var obj = JSON.parse(data);
                $.notify(obj.msg, obj.status);
                del_row.css("background", "lightgreen");
            }
        });
    }

});

//=====STATUS BUTTON =========//
$(".status_btn").on('click', function() {
    var data_status = $(this).attr('data-status');
    var all_student = [];
    $('input[class="chk"]:checked').each(function() {
        all_student.push($(this).attr('value'));
    });
    var ct = all_student.length;
    if (ct >= 1) {
        bootbox.confirm({
            message: "Do you really want to " + data_status + " selected (" + ct + ") student ?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success btn-sm'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger btn-sm'
                }
            },
            callback: function(result) {
                if (result === true) {
                    $.ajax({
                        'type': 'POST',
                        'url': 'temp/master_process?task=update_status',
                        'data': { 'data_status': data_status, 'sid': all_student },
                        success: function(data) {
                            //alert(data);
                            //var obj = JSON.parse(data);
                            $.notify(ct + " Student(s) " + data_status + " Succesfully", "success");
                            location.reload();
                        }
                    });
                }
            }
        });
    } else {
        $.notify("Sorry ! No Student Selected ", "info");
    }
});

//=====ATTENDANCE BUTTON =========//
$("#att_btn").on('click', function() {
    //var data  =$("#att_frm").serialize();
    var att_date = $("#att_date").val();
    all_student = [];
    $('input[class="chk"]:checked').each(function() {
        all_student.push($(this).attr('value'));
    });
    var ct = all_student.length;
    if (ct >= 1) {
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=make_att',
            'data': { 'att_date': att_date, 'sel_id': all_student },
            success: function(data) {
                //alert(data);
                console.log(data);
                //var obj = JSON.parse(data);
                $.notify(ct + " Student(s) Succesfully Marked as Present", "success");
                //location.reload();
            }
        });
    } else {
        $.notify("Sorry ! No Student Selected ", "info");
    }
});


//=====ATTENDANCE BUTTON =========//
$(".allow_block_subject").on('click', function() {
    var student_id = $("#student_id").val();
    var st = $(this).data('status');
    subject_list = [];
    $('input[class="chk"]:checked').each(function() {
        subject_list.push($(this).attr('value'));
    });
    var ct = subject_list.length;
    if (ct >= 1) {
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=allow_subject',
            'data': { 'student_id': student_id, 'subject_list': subject_list, 'status': st },
            success: function(data) {
                //alert(data);
                console.log(data);
                //var obj = JSON.parse(data);
                $.notify(ct + " Subjects(s) " + st + " Succesfully ", "success");
                location.reload();
            }
        });
    } else {
        $.notify("Sorry ! No Subject Selected ", "danger");
    }
});

//=====BLOCK BUTTON =========//
$(document).on('click',".block_btn", function() {
    var del_row = $($(this).closest("tr"));
    var id = $(this).attr("data-id");
    var table = $(this).attr("data-table");
    var pkey = $(this).attr("data-pkey");
    bootbox.confirm({
        message: "Do you really want to BLOCK this?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-info'
            },
            cancel: {
                label: 'No',
                className: 'btn-warning'
            }
        },
        callback: function(result) {
            if (result == true) {
                $.ajax({
                    'type': 'POST',
                    'url': 'temp/master_process?task=master_block',
                    'data': { 'id': id, 'table': table, 'pkey': pkey },
                    success: function(data) {
                        //alert(data);
                        var obj = JSON.parse(data);
                        $.notify(obj.msg, obj.status);
                        del_row.hide(500);
                    }
                });
            }
        }
    });
});


//=====BLOCK USER =========//
$(".block_user").on('click', function() {
    var del_row = $($(this).closest("tr"));
    var id = $(this).attr("data-id");
    var st = $(this).attr("data-status");
    bootbox.confirm({
        message: "Do you really want to " + st + "  this User Account?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            if (result == true) {
                $.ajax({
                    'type': 'POST',
                    'url': 'temp/master_process?task=block_user',
                    'data': { 'id': id, 'data_status': st },
                    success: function(data) {
                        //alert(data);
                        var obj = JSON.parse(data);
                        $.notify(obj.msg, obj.status);
                        //del_row.hide(500); 
                        location.reload();
                    }
                });
            }
        }
    });
});

//========= LOGIN BUTTON ===========//
$("#login_btn").click(function() {
    $("#login_frm").validate();

    if ($("#login_frm").valid()) {
        $(this).attr("disabled", true);
        $(this).html("Please Wait...");
        var data = $("#login_frm").serialize();
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=verify_login',
            'data': data,
            success: function(data) {
                //alert(data);
                var obj = JSON.parse(data);

                if (obj.status.trim() == 'success') {
                    $.notify("Login Success...", obj.status);
                    window.location = obj.url;
                } else {
                    $.notify("Sorry Some Thing Went Wrong", "error");
                    $("#login_frm")[0].reset();
                    $("#login_btn").html("Secure Login");
                    $("#login_btn").attr("disabled", false);
                }
            }

        });
    }
});




//========= Login As  ===========//
$(document).on('click',".login_as",function() {
    //	alert("Login As");
    var user_name = $(this).attr("data-id");
    var user_pass = $(this).attr("data-code");
    const url = $(this).attr("data-url");
    var data = {
        'user_name': user_name,
        'user_pass': user_pass
    }
    $.ajax({
        'type': 'POST',
        'url': 'temp/master_process?task=login_as',
        'data': data,
        success: function(data) {
            //alert(data);
            var obj = JSON.parse(data);

            if (obj.status.trim() == 'success') {
                $.notify("Login Success...", obj.status);
                window.location = url;
            } else {
                $.notify("Sorry Some Thing Went Wrong", "error");
                $("#login_frm")[0].reset();
                $("#login_btn").html("Secure Login");
                $("#login_btn").attr("disabled", false);
            }
        }

    });
});

//===========UPLOAD IMAGES ==============//
$('#uploadimg').change(function() {
    $("#uploadForm").submit();
});

$("#uploadForm").on('submit', (function(e) {
    e.preventDefault();
    if ($('#insert_btn').length != 0) {
        $("#insert_btn").attr("disabled", true);
    }
    $.ajax({
        url: "temp/master_process?task=upload",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log(data);
            //alert(data);
            var obj = JSON.parse(data);
            $("#targetimg").val(obj.id);
            $("#display").html("<img src='temp/upload/" + obj.id + "' width='100px' height='100px' class='img-thumbnail'>");
            $.notify(obj.msg, obj.status);
            $("#insert_btn").attr("disabled", false);
        },
        error: function() {}
    });
}));


//===========UPLOAD Signature PROOF ==============//
$('#upload_sign').change(function (){
		$("#sign_proof").submit();
});

$("#sign_proof").on('submit',(function(e){
	e.preventDefault();
	$.ajax({
	url: "temp/master_process?task=upload",
	type: "POST",
	data:  new FormData(this),
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		var obj = JSON.parse(data);
		//alert(data);
		$("#target_sign_proof").val(obj.id);
		$("#student_sign_display").html("<img src='temp/upload/"+obj.id +"' width='100px' height='100px' class='img-thumbnail'>");
		$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
}));

//===========UPLOAD ID PROOF ==============//

$('#upload_id_proof').change(function() {
    $("#id_proof").submit();
});

$("#id_proof").on('submit', (function(e) {
    e.preventDefault();
    $.ajax({
        url: "temp/master_process?task=upload",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            var obj = JSON.parse(data);
            //alert(data);
            $("#target_id_proof").val(obj.id);
            $("#student_id_display").html("<img src='temp/upload/" + obj.id + "' width='100px' height='100px' class='img-thumbnail'>");
            $.notify(obj.msg, obj.status);
        },
        error: function() {}
    });
}));


//===========UPLOAD EDUCATIONAL PROOF ==============//
$('#upload_edu_proof').change(function() {
    $("#edu_proof").submit();
});

$("#edu_proof").on('submit', (function(e) {
    e.preventDefault();
    $.ajax({
        url: "temp/master_process?task=upload",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            var obj = JSON.parse(data);
            //alert(data);
            $("#target_edu_proof").val(obj.id);
            $("#student_edu_display").html("<img src='temp/upload/" + obj.id + "' width='100px' height='100px' class='img-thumbnail'>");
            $.notify(obj.msg, obj.status);
        },
        error: function() {}
    });
}));

//===========UPLOAD EDUCATIONAL logo ==============//
$('#upload_cntr_logo').change(function() {
    $("#cntr_logo").submit();
});

$("#cntr_logo").on('submit', (function(e) {
    e.preventDefault();
    $.ajax({
        url: "temp/master_process?task=upload",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            var obj = JSON.parse(data);
            //alert(data);
            $("#target_logo").val(obj.id);
            $("#logo_display").html("<img src='temp/upload/" + obj.id + "' width='100px' height='100px' class='img-thumbnail'>");
            $.notify(obj.msg, obj.status);
        },
        error: function() {}
    });
}));





//=========SELECT ALL CHECK BOX WITH SAME NAME =======//
function selectAll(source) {
    // $('select[name="data_tbl_length"]').val("-1").trigger('change');
    // checkboxes = document.getElementsByName('data_tbl_length').val('-1');
    checkboxes = document.getElementsByName('sel_id[]');
    for (var i in checkboxes)
        checkboxes[i].checked = source.checked;
}

function ajax_call(url, data, target) {
    var data = this.value;
    $.ajax({
        'type': 'POST',
        'url': url,
        'data': data,
        success: function(data) {
            //var obj = JSON.parse(data);
            $(target).show();
            $(target).html(data);
        }
    });
}

//===========LOGOUT WITH CONFIRAMTION ==========//
function logout() {
    bootbox.confirm({
        message: "Do you really want to logout ?",
        buttons: {
            confirm: {
                label: '<i class="fa fa-check"></i> Logout',
                className: 'btn-success'
            },
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            if (result == true) {
                $.ajax({
                    'type': 'POST',
                    'url': 'temp/master_process?task=logout',
                    success: function(data) {
                        //alert(data);
                        var obj = JSON.parse(data);

                        window.location = 'login';
                        $.notify(obj.msg, obj.status);
                    }
                });
            }
        }
    });
}

function autologout() {
    $.ajax({
        'type': 'POST',
        'url': 'temp/master_process?task=logout',
        success: function(data) {
            //alert(data);
            var obj = JSON.parse(data);

            window.location = 'login';
            $.notify(obj.msg, obj.status);
        }
    });
}
//===========ADD SINGLE DATA ===========//
$("#add_btn").click(function() {
    var msg = $(this).attr('data-msg');
    var table = $(this).attr('data-table');
    var col = $(this).attr('data-col');
    bootbox.prompt(msg, function(udata) {

        if (udata) {
            var tdata = { "table": table, 'col': col, 'value': udata };
            $.ajax({
                'type': 'POST',
                'url': 'temp/master_process?task=add_data',
                'data': tdata,
                success: function(data) {
                    ////alert(data);
                    var obj = JSON.parse(data);
                    $.notify(obj.msg, obj.status);
                }
            });
        }
    });
});

//======FORGET PASSWORD USING PROMPT BOX =======/
$("#forget_password").click(function() {
    bootbox.prompt("Enter Username /Center Code ", function(data) {
        if (data) {
            $.ajax({
                'type': 'POST',
                'url': 'temp/master_process?task=forget_password',
                'data': 'user_name=' + data,
                success: function(data) {
                    //alert(data);
                    var obj = JSON.parse(data);
                    $.notify(obj.msg, obj.status);
                }
            });
        }
    });
});


//======Change PASSWORD of Logged In User =======/
$("#change_password").click(function() {
    $(this).attr("disabled", true);
    $(this).html("Please Wait...");
    $("#update_frm").validate();

    if ($("#update_frm").valid()) {
        var cp = $("#current_password").val();
        var np = $("#new_password").val();
        var rp = $("#repeat_password").val();
        if (np != rp) {
            $.notify("New password and Repeat password Not matched", "error");

        } else {
            $.ajax({
                'type': 'POST',
                'url': 'temp/master_process?task=change_password',
                'data': 'new_password=' + np + '&current_password=' + cp,
                success: function(data) {
                    ////alert(data);
                    var obj = JSON.parse(data);
                    if (obj.status.trim() == 'success') {
                        $.notify(obj.msg, obj.status);
                        // $.notify("Password Changed Succesfully", obj.status);
                        $("#update_frm")[0].reset();
                        logout();
                    } else {
                        $.notify(obj.msg, "error");
                        // $.notify("Sorry! Unable to Chanage Password ", "error");
                        $("#update_frm")[0].reset();
                        $("#change_password").attr("disabled", false);
                    }
                }
            });
        }
    }

});



//======ADD NEW COURSE TYPE PROMPT BOX =======/
$("#add_course_type").click(function() {
    bootbox.prompt("Enter Course Type name ", function(data) {
        if (data && data.length) {
            $.ajax({
                'type': 'POST',
                'url': 'temp/master_process?task=add_course_type',
                'data': 'course_type=' + data,
                success: function(data) {
                    // alert(data);
                    var obj = JSON.parse(data);
                    $.notify(obj.msg, obj.status);
                    location.reload();
                }
            });
        }else{
            $.notify('Please Enter Course Type name', 'error');
        }
    });
});


function populate(frm, data) {
    //$("#edit_modal").show();
    $.each(data, function(key, value) {
        var ctrl = $('[name=' + key + ']', frm);
        switch (ctrl.prop("type")) {
            case "radio":
            case "checkbox":
                ctrl.each(function() {
                    if ($(this).attr('value') == value) $(this).attr("checked", value);
                });
                break;
            case "select":
                $("option", ctrl).each(function() {
                    if (this.value == value) { this.selected = true; }
                });
                break;
            default:
                ctrl.val(value);
        }
    });
}

function json2table(selector, myList) {
    var columns = addAllColumnHeaders(myList, selector);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector + ' thead').append(headerTr$);

    return columnSet;
}

// === Dynamic District Section From State ==/
function getdistrict(val) {
    // 	alert(val);
    $.ajax({
        type: "GET",
        url: "temp/master_process.php?task=get_dist",
        data: 'state_code=' + val,
        success: function(data) {
            console.log(data);
            $("#district-list").html(data);
        }
    });
}


//======SEND SMS ANY TIME =======/
$("#send_sms").click(function() {

    var mobile = $("#mobile").val();
    var message = $("#message").val();

    var allmobile = mobile.replace(/\s/g, "");
    var ct = allmobile.length;
    //alert(ct);
    if ((ct % 10) != 0 || ct < 10) {
        $.notify("Sorry! Invalid Mobile Number", "error");
    } else if (message == '') {
        $.notify("SMS can't be blank", "info");
    } else {
        $("#send_sms").html("Sending...");
        $("#send_sms").attr("disabled", true);
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=send_sms',
            'data': { 'mobile': mobile, 'sms': message },
            success: function(data) {
                //alert(data);
                $("#send_sms").html("Sent Succesfully");
                $("#send_sms").attr("disabled", false);
                var obj = JSON.parse(data);
                $.notify(obj.msg, obj.status);
                $("#sms_frm")[0].reset();

            }
        });
    }
});


//=====INSERT Item in Table =========//
$("#add_item_btn").on('click', function() {
    $("#item_frm").validate();


    if ($("#item_frm").valid()) {
        var task = $("#item_frm").attr('action');
        $(this).attr("disabled", true);
        $(this).html("Please Wait...");
        var data = $("#item_frm").serialize();
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=' + task,
            'data': data,
            success: function(data) {
                var obj = JSON.parse(data);
                if (obj.url != null) {
                    bootbox.alert(obj.msg, function() {
                        window.location.replace(obj.url);
                    });
                } else {
                    $.notify(obj.msg, obj.status);
                }
                $("#add_item_btn").html("Add Item");
                $("#add_item_btn").removeAttr("disabled");
            }

        });
    }
});


//==== Create HTML TO PDF ============//
function createpdf(file) {
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#content')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function(element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },

        function(dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.save(file + '.pdf');
        }, margins
    );
}


function exportxls() {
    var tab_text = "<table border='1px'><tr>";
    var textRange;
    var j = 0;
    tab = document.getElementById('data_tbl'); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    // tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "export.xls");
    } else //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}


//=====INSERT Item in Table =========//
$("#course_id").on('change', function() {

    var id = $(this).val();
    var data = 'id=' + id;
    $.ajax({
        'type': 'POST',
        'url': 'temp/master_process?task=get_course',
        'data': data,
        success: function(data) {
            //console.log(data);
            var obj = JSON.parse(data);
            $("#course_data").css('display', 'inline');
            $("#course_data").html(obj.data.course_duration + " " + obj.data.course_unit);

        }

    });
});

//=====INSERT Item in Table =========//
$("#center_id").on('change', function() {

    var id = $(this).val();
    var data = 'id=' + id;
    $.ajax({
        'type': 'POST',
        'url': 'temp/master_process?task=get_wallet',
        'data': data,
        success: function(data) {
            //console.log(data);
            var obj = JSON.parse(data);
            $("#wallet_amount").css('display', 'inline');
            $("#wallet_amount").html(obj.center_wallet);

        }

    });
});


//=====INSERT Item in Table =========//
$('body').on('click', "#add_wallet", function() {
    $("#wallet_frm").validate();

    if ($("#wallet_frm").valid()) {
        var task = $("#wallet_frm").attr('action');
        $(this).attr("disabled", true);
        $(this).html("Please Wait...");
        var data = $("#wallet_frm").serialize();
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=add_to_wallet',
            'data': data,
            success: function(data) {
                //alert(data);
                var obj = JSON.parse(data);
                if (obj.url != null) {
                    bootbox.alert(obj.msg, function() {
                        window.location.replace(obj.url);
                    });
                } else {
                    $.notify(obj.msg, obj.status);
                }
            }
        });
    }
});


//=====Attendance BUTTON =========//
$("#add_to_att").on('click', function() {
    var batch_id = $("#batch_id").val();
    var all_student = [];
    $('input[class="chk"]:checked').each(function() {
        all_student.push($(this).attr('value'));
    });
    var ct = all_student.length;
    if (ct >= 1) {
        bootbox.confirm({
            message: "Do you really want to add selected (" + ct + ") student to attendance list ?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success btn-sm'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger btn-sm'
                }
            },
            callback: function(result) {
                if (result == true) {
                    $.ajax({
                        'type': 'POST',
                        'url': 'temp/master_process?task=add_to_att',
                        'data': { 'sel_id': all_student, 'batch_id': batch_id },
                        'dataType': 'JSON',
                        success: function(data) {
                            //	console.log(res);
                            $.notify(res.msg, res.status);
                            // 			if(res.status =='success')
                            // 			{
                            // 			$.notify( ct + " Student(s) Successfully Added to Attendance List","success");
                            // 			}
                            // 			else{

                            // 			}

                        }
                    });
                }
            }
        });
    } else {
        $.notify("Sorry ! No Student Selected ", "danger");
    }
});
$('.select2').select2({
    placeholder: 'Select an option'
});
$('.form-control').keypress(function(e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13) {
        e.preventDefault();
        var inputs = $(this).closest('form').find('.form-control');
        if (inputs.index(this) + 1 == inputs.length) {
            $("#update_btn").trigger('click');
        } else {
            inputs.eq(inputs.index(this) + 1).focus();
        }
    }
});

$(document).keydown(function(e) {
    //CTRL + V keydown combo

    if (e.ctrlKey && e.keyCode == 83) { //S
        e.preventDefault();
        $("#update_btn").trigger('click');
    }

});

$(document).on('click', ".bootbox-close-button", function() {
    // Close Modal With Cross Button 
    $("#appmodal").modal('hide');
});

// function selectAll(source) {
//     checkboxes = document.getElementsByName('sel_id[]');
//     for (var i in checkboxes)
//         checkboxes[i].checked = source.checked;
// }

function ajax_call(url, data, target) {
    var data = this.value;
    $.ajax({
        'type': 'POST',
        'url': url,
        'data': data,
        success: function(data) {
            //var obj = JSON.parse(data);
            $(target).show();
            $(target).html(data);
        }
    });
}


/*=========== ONLINE EXAM ===============*/

//=====ACTIVE / BLOCK BUTTON =========//
$(".add_remove_question").on('click', function() {
    var data_task = $(this).attr('data-task');
    var data_status = $(this).attr('data-status');
    var set_id = $(this).attr('data-set');
    var all_id = [];
    $('input[class="chk"]:checked').each(function() {
        all_id.push($(this).attr('value'));
    });
    var ct = all_id.length;
    if (ct >= 1) {
        bootbox.confirm({
            message: "Do you really want to " + data_status + " selected (" + ct + ") records ?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success btn-sm'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger btn-sm'
                }
            },
            callback: function(result) {
                if (result == true) {
                    $.ajax({
                        'type': 'POST',
                        'url': 'temp/master_process?task=' + data_task,
                        'data': { 'all_id': all_id, 'set_id': set_id },
                        success: function(data) {
                            console.log(data);
                            //var obj = JSON.parse(data);
                            $.notify(ct + " question(s) " + data_status + " Successfully", "success");
                            location.reload();
                        }
                    });
                }
            }
        });
    } else {
        $.notify("Sorry ! No Record Selected ", "info");
    }
});


$("#finish_set").on('click', function() {
    var set_id = $(this).attr('data-set');
    $.ajax({
        'type': 'POST',
        'url': 'temp/master_process?task=finish_set',
        'data': { 'set_id': set_id },
        success: function(data) {
            //console.log(data);
            var obj = JSON.parse(data);
            if (obj.url != null) {
                bootbox.alert(obj.msg, function() {
                    window.location.replace(obj.url);
                });
            } else {
                $.notify(obj.msg, obj.status);
            }
        }
    });
});
//   $(document).ready(function() {
// //     $('#data_tbl').DataTable( {
// //         responsive: true
// //     } );
// //   } );
$(document).ready(function() {
    $('#data_tbl').dataTable({
        aLengthMenu: [
            [10, 25, 50, 100, 500, -1],
            [10, 25, 50, 100, 500, "All"]
        ],
        iDisplayLength: 10,
        responsive: true
    });
    $('select').addClass('form-select');
    $('select').css("padding", "0px 0px 0px 5px");
});



function fetch_data(task, param = null) {
    var api_url = base_url + 'master_process.php?task=' + task;
    var data = $.parseJSON($.ajax({
        url: api_url,
        method: 'POST',
        dataType: "json",
        data: param,
        async: false,
        cache: false,
    }).responseText);
    return data; // .staus .url .id	
}


function get_day(ele) {
    var date = new Date($("#" + ele).val());
    day = date.getDay();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var day = weekday[day];
    return day;
}


//=====Update Role Checkbox  =========//
$(document).on('change', ".update_role", function() {
    var st = 'remove';
    if ($(this).prop('checked') == true) {
        st = 'add';
    }
    var role = $(this).data('role');
    var user_type = $(this).attr("data-user");
    var table = $(this).attr("data-table");
    var pkey = $(this).attr("data-pkey");
    $.ajax({
        'type': 'POST',
        'url': base_url + 'master_process?task=update_role',
        'data': { 'user_type': user_type, 'table_name': table, 'role_name': role, 'user_task': st },
        success: function(data) {
            console.log(data);
            var obj = JSON.parse(data);
            $.notify(obj.msg, obj.status);
        }
    });
});

// Reset Configuration  

$(document).on('click', '#reset_config', function() {
    var del_row = $($(this).closest("tr"));
    var id = $(this).attr("data-id");
    var table = $(this).attr("data-table");
    var pkey = $(this).attr("data-pkey");
    var per = $(this).attr("data-per");
    bootbox.confirm({
        message: "Do you really want to reset all configuration ?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function(result) {
            if (result == true) {
                $.ajax({
                    'type': 'POST',
                    'url': 'temp/master_process?task=reset_config',
                    'data': {},
                    success: function(data) {
                        //var obj = JSON.parse(data);
                        //$.notify("Data Reset Success", "success");
                        location.reload();
                    }
                });
            }
        }
    });
});

//=====GET AREA FROM PINCODE =========//
$(document).on('change blur', "#pincode", function() {
    var pincode = $(this).val();
    $.ajax({
        'type': 'POST',
		'dataType':'JSON',
        'url': 'https://morg.in/api/api.php?token=FREE&task=get_area',
        'data': { 'pincode': pincode},
        success: function(res) {
            console.log(res.data);
			var str ='';
			for(var i=0; i<res.count; i++)
			{
				var single = res.data[i];
				var str =str + "<option value='"+single.id+"'>"+ single.locality_name+"</option>";
			}
			$("#locality_id").html(str);
        }
    });
});


$(document).on('change blur', "#locality_id", function() {
    var locality_id = $(this).val();
    $.ajax({
        'type': 'POST',
		'dataType':'JSON',
        'url': 'https://morg.in/api/api.php?token=FREE&task=get_address',
        'data': { 'id': locality_id},
        success: function(res) {
            //console.log(res.data);
			var address = res.data[0];
			console.log(address);
			$("#pincode").val(address.pincode);
			$("#locality_id").val(address.id);
			$("#locality_name").val(address.locality_name);
			$("#post_office").val(address.post_office);
			$("#sub_district_name").val(address.sub_district_name);
			$("#district_name").val(address.district_name);
			$("#state_name").val(address.state_name);
        }
    });
});


// NEW CENTER APPLY 


//========= LOGIN BUTTON ===========//
$("#apply_btn").click(function() {
    $("#apply_for_center").validate();

    if ($("#apply_for_center").valid()) {
        $(this).attr("disabled", true);
        var data = $("#apply_for_center").serialize();
        $.ajax({
            'type': 'POST',
            'url': 'temp/master_process?task=apply_for_center',
            'data': data,
            success: function(data) {
                //alert(data);
                var obj = JSON.parse(data);
                
                 if (obj.url != null) {
                bootbox.alert(obj.msg, function() {
                    window.location.replace(obj.url);
                });
                } else {
                    $.notify(obj.msg, obj.status);
                }
            }

        });
    }
});
