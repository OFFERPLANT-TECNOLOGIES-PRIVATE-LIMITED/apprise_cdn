//===========UPLOAD IMAGES ==============//

$("#chairman_photo").on('change',(function(e){
   e.preventDefault();
   var table = $('#chairman_photo').data('table');
   var field = $('#chairman_photo').data('field');
   var img =  document.getElementById('chairman_photo');
   var file = img.files[0];
   var formData = new FormData();
    formData.append('uploadimg', file);
   // console.log(formData);
	$.ajax({
	url: "function/master_process?task=upload",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
// 		console.log(data);
		//alert(data);
		var obj = JSON.parse(data);
		$("#targetimg").val(obj.id);
		$("#chairman_photo_display").html("<img src='"+obj.src+"/"+obj.id+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeImg(this)' data-id='"+obj.id+"' data-table='"+table+"' data-field='"+field+"' data-target='targetimg' data-display='chairman_photo_display'><i class='fa fa-times' aria-hidden='true'></i></a>");
		$.notify(obj.msg,obj.status);
		$("#insert_btn").attr("disabled", false);
	},
	error: function(){} 	        
	});
}));

//===========UPLOAD IMAGES 2 ==============//

$("#principal_photo").on('change',(function(e){
   e.preventDefault();
   var table = $('#principal_photo').data('table');
   var field = $('#principal_photo').data('field');
   var img =  document.getElementById('principal_photo');
   var file = img.files[0];
   var formData = new FormData();
    formData.append('uploadimg', file);
    //console.log(formData);
	$.ajax({
	url: "function/master_process?task=upload",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
// 		console.log(data);
		//alert(data);
		var obj = JSON.parse(data);
		$("#targetPrincipal").val(obj.id);
		$("#principal_photo_display").html("<img src='"+obj.src+"/"+obj.id+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeImg(this)' data-id='"+obj.id+"' data-table='"+table+"' data-field='"+field+"' data-target='targetimg' data-display='principal_photo_display'><i class='fa fa-times' aria-hidden='true'></i></a>");
		$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
}));

//===========UPLOAD  MULTI IMAGES  ==============//

$("#slider").on('change',(function(e){
   const inputId = "#slider";
   const displayId = "slider_img";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    //formData.append('uploadimg', file);
    
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "temp/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 2  ==============//

$("#hygiene_photo").on('change',(function(e){
   const inputId = "#hygiene_photo";
   const displayId = "hygiene";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));


//===========UPLOAD  MULTI IMAGES 3 ==============//

$("#exchange_photo").on('change',(function(e){
   const inputId = "#exchange_photo";
   const displayId = "exchange";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 4 ==============//

$("#alumni_photo").on('change',(function(e){
   const inputId = "#alumni_photo";
   const displayId = "alumni";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 5 ==============//

$("#ranking_photo").on('change',(function(e){
   const inputId = "#ranking_photo";
   const displayId = "ranking";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 5 ==============//

$("#academic_photo").on('change',(function(e){
   const inputId = "#academic_photo";
   const displayId = "academic";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 6 ==============//

$("#curicular_photo").on('change',(function(e){
   const inputId = "#curicular_photo";
   const displayId = "curicular";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 7 ==============//

$("#awards_photo").on('change',(function(e){
   const inputId = "#awards_photo";
   const displayId = "awards";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

//===========UPLOAD  MULTI IMAGES 7 ==============//

$("#other_photo").on('change',(function(e){
   const inputId = "#other_photo";
   const displayId = "other";
   var table = $(inputId).data('table');
   var type = $(inputId).data('type');
   var file = $(inputId)[0].files;
   var formData = new FormData();
   var error = '';
    for(var count = 0; count<file.length; count++)
   {
      var name = file[count].name;
      var extension = name.split('.').pop().toLowerCase();

      if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
      {
          error += "Invalid " + count + " Image File"
      }
      else
     {
        formData.append("file[]", file[count]);
     }
   }
    formData.append("type", type);
    formData.append("table", table);
    if(error ==''){
	$.ajax({
	url: "function/master_process?task=upload_multi",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		//var temp = '';
		//	console.log(obj.img_name);
    $.each(obj.img_name, function (key, val) {
        // console.log(val);
        	 $("#"+displayId).append("<img src='"+obj.src+"/"+val+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val+"' data-table='"+table+"' data-type='"+type+"' data-display='"+displayId+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
    //$("#building_photo_display").html(temp);
	$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
    }
}));

function removeImg(ele){
    const id = $(ele).data('id');
    const table = $(ele).data('table');
    const field = $(ele).data('field');
    const target = $(ele).data('target');
    const display = $(ele).data('display');
    const data = 'id='+id+'&table='+table+'&field='+field;
    	bootbox.confirm({
		message: "Do you really want to Delete this Image?",
		buttons: 
		{
			confirm: {
				label: 'Yes',
				className: 'btn-info'
			},
			cancel: {
				label: 'No',
				className: 'btn-warning'
			}
		}, 
		callback: function (result) {
			if(result==true)
			{
    $.ajax({
	url: "function/master_process?task=remove_img",
	type: "POST",
    data: data,
	success: function(data){
		var obj = JSON.parse(data);
		$("#"+target).val('no_img');
		$("#"+display).html("");
		$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
	}
}
});
}

function removeMultiImg(ele){
    const id = $(ele).data('id');
    const name = $(ele).data('name');
    const table = $(ele).data('table');
    const type = $(ele).data('type');
    const target = $(ele).data('target');
    const display = $(ele).data('display');
    const data = 'id='+id+'name'+name+'&table='+table+'&type='+type;
    	bootbox.confirm({
		message: "Do you really want to Delete this Image?",
		buttons: 
		{
			confirm: {
				label: 'Yes',
				className: 'btn-info'
			},
			cancel: {
				label: 'No',
				className: 'btn-warning'
			}
		}, 
		callback: function (result) {
			if(result==true)
			{
    $.ajax({
	url: "temp/master_process?task=remove_multi_img",
	type: "POST",
    data: data,
	success: function(data){
		var obj = JSON.parse(data);
		var temp='';
// 		console.log(obj.img_name);
		 $.each(obj.img_name, function (key, val) {
        //console.log(val.photo);
        temp += "<img src='"+obj.src+"/"+val.photo+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val.photo+"' data-table='"+table+"' data-type='"+type+"' data-target='targetimg' data-display='"+display+"'><i class='fa fa-times' aria-hidden='true'></i></a>";
       });
// 		$("#"+target).val('no_img');
		$("#"+display).html(temp);
		$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
	}
}
});
}

// for multi images show
$( document ).ready(function() {
    const table = 'slider';
    const src = 'temp/upload';
 	$.ajax({
	url: "temp/master_process?task=show_multi_img",
	type: "POST",
    data: 'table='+table,
	success: function(data){
		//alert(data);
		var obj = JSON.parse(data);
		let temp = '';
// 		console.log(obj);
 $.each(obj.img_name, function (key, val) {
       // console.log(val);
        	 $("#slider_img").append("<img src='"+src+"/"+val.photo+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeMultiImg(this)' data-id='"+val.id+"' data-name='"+val.photo+"' data-table='"+table+"' data-type='"+val.type+"' data-display='"+val.type+"'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });
	},
	error: function(){} 	        
	});
});

// for single image show
$( document ).ready(function() {
 const table = 'slider';
 const src = 'uplaod';
 var slider = $('#targetimg').val();
 var principal = $('#targetPrincipal').val();
 var chairman_photo_display = $('#chairman_photo_display').val();
 var principal_photo_display = $('#principal_photo_display').val();
 if(chairman !='no_img.jpg' || principal !='no_img.jpg'){
 if(chairman_photo_display !=''){
    $("#chairman_photo_display").html("<img src='temp/upload/"+obj.id +"' width='100px' height='100px' class='img-thumbnail'>");
   
}else if(principal_photo_display !=''){
     $("#principal_photo_display").html("<img src='temp/upload/"+obj.id +"' width='100px' height='100px' class='img-thumbnail'>");
}else{
    $("#chairman_photo_display").html("<img src='"+src+"/"+chairman+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeImg(this)' data-id='"+chairman+"' data-table='"+table+"' data-field='chairman_photo' data-display='chairman_photo_display'><i class='fa fa-times' aria-hidden='true'></i></a>");
    $("#principal_photo_display").html("<img src='"+src+"/"+principal+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeImg(this)' data-id='"+principal+"' data-table='"+table+"' data-field='principal_photo' data-display='chairman_photo_display'><i class='fa fa-times' aria-hidden='true'></i></a>");
}
}
});

//===========UPLOAD  cover pic  ==============//
$("#coverPic").on('change',(function(e){
   e.preventDefault();
   var table = $('#coverPic').data('table');
   var field = $('#coverPic').data('field');
   var img =  document.getElementById('coverPic');
   var file = img.files[0];
   var formData = new FormData();
    formData.append('uploadimg', file);
    //console.log(formData);
	$.ajax({
	url: "function/master_process?task=upload",
	type: "POST",
    data: formData,
	contentType: false,
	cache: false,
	processData:false,
	success: function(data){
// 		console.log(data);
		//alert(data);
		var obj = JSON.parse(data);
		$("#targetCoverPic").val(obj.id);
		$("#coverPic_display").html("<img src='"+obj.src+"/"+obj.id+"' width='100px' height='100px' class='img-thumbnail'><a href='#' class='icn' onclick='removeImg(this)' data-id='"+obj.id+"' data-table='"+table+"' data-field='"+field+"' data-target='targetimg' data-display='principal_photo_display'><i class='fa fa-times' aria-hidden='true'></i></a>");
		$.notify(obj.msg,obj.status);
	},
	error: function(){} 	        
	});
}));