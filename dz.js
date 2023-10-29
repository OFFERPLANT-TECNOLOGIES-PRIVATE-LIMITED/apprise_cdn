 "use stric";
          
  // $(function() {
   Dropzone.autoDiscover = false;
  var myDropzone = new Dropzone("#dZUpload",{
        url: 'function/master_process?task=upload_school',
        parallelUploads: 3,
        maxFiles :3,
        uploadMultiple:true,
        acceptedFiles:'.png,.jpg,.jpeg',
        addRemoveLinks: true,
        autoProcessQueue: false,
        init: function(){
        this.on("sending", function(file, xhr, formData){
                var id = $("#id").val();
                var table = $("#table").val();
                formData.append("id", id);
                formData.append("table", table);
      });
    },
        success: function (file, response) {
            const obj = JSON.parse(response);
            $.notify(obj.msg, obj.status);
            setTimeout( function(){
                location.reload();
            },1500);
            // var imgName = response;
            // file.previewElement.classList.add("dz-success");
            // console.log("Successfully uploaded :" + imgName);
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        },
        removedfile: function(file){
          var name = file.name;
          var dataId = $("#dataId").val();
          $.ajax({
            type: 'post',
            url: 'function/master_process?task=remove_img',
            data: {id: dataId, name: name, request: 1},
            success: function(response){
              console.log('success'+response);
            },
          });
          var _ref;
          return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement): void 0;
        },
       
    });

$("#upload_btn").click(function(){
    myDropzone.processQueue();
});
// });
