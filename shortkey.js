
var user_type = localStorage.getItem("user_type");
if(user_type == 'ADMIN'){
shortcut.add("F1", function() {
          window.location='index';
    }); 
shortcut.add("alt+s", function() {
          window.location='add_student';
    });
shortcut.add("alt+m", function() {
          window.location='strength';
    }); 
shortcut.add("alt+r", function() {
          window.location='result_view';
    }); 
shortcut.add("alt+c", function() {
          window.location='add_course';
    }); 
shortcut.add("alt+v", function() {
          window.location='manage_course';
    }); 
shortcut.add("alt+p", function() {
          window.location='add_paper';
    });
shortcut.add("alt+f", function() {
          window.location='add_center';
    }); 
shortcut.add("ctrl+m", function() {
          window.location='manage_center';
    });
shortcut.add("ctrl+r", function() {
          window.location='ref_center';
    }); 
shortcut.add("F2", function() {
          window.location='send_sms';
    });
shortcut.add("F3", function() {
          window.location='print_result';
    });
shortcut.add("F4", function() {
          window.location='admin_download_student';
    }); 
shortcut.add("alt+u", function() {
          window.location='show_user';
    });
shortcut.add("alt+t", function() {
          window.location='txn_view';
    });
shortcut.add("alt+w", function() {
          window.location='wallet_txn';
    });
shortcut.add("alt+i", function() {
          window.location='account_txn';
    });
// shortcut.add("F5", function() {
//           window.location='event';
//     }); 
shortcut.add("F6", function() {
          window.location='notice';
    }); 
shortcut.add("F7", function() {
          window.location='add_to_gallery';
    });
shortcut.add("F8", function() {
          window.location='show_enquery';
    }); 
shortcut.add("alt+l", function() {
          window.location='docs_upload';
    });
shortcut.add("alt+k", function() {
          window.location='show_topics';
    }); 
shortcut.add("alt+v", function() {
          window.location='video';
    });
shortcut.add("alt+q", function() {
          window.location='question';
    }); 
shortcut.add("ctrl+q", function() {
          window.location='show_question';
    });
shortcut.add("alt+o", function() {
          window.location='order_view';
    }); 
shortcut.add("ctrl+o", function() {
           window.location='add_product';
    });
shortcut.add("alt+a", function() {
          window.location='our_team';
    }); 
shortcut.add("f9", function() {
          window.location='req_complain';
    });
shortcut.add("f10", function() {
          window.location='complain';
    });
shortcut.add("f11", function() {
          window.location='shop';
    }); 
shortcut.add("alt+j", function() {
          window.location='fee_entry';
    });
shortcut.add("alt+k", function() {
          window.location='search_to_pay';
    });
shortcut.add("alt+t", function() {
          window.location='collection_report';
    }); 
shortcut.add("ctrl+s", function() {
          //alert("CTRL +S");
          $("#update_btn").trigger('click');
    });
    
shortcut.add("ctrl+f", function() {
          //alert("CTRL +f");
          $("#search_text").focus();
    });

}
