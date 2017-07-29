(function () {
    var that = me.define("imageCropper", {
        ctrl: function () {
            that.$scope.title = me.param().title;
            var ratio = me.param().ratio;
            me.global.showPop("modal_imageCropper");
            that.$scope.$$postDigest(function () {
                //初始化cropper插件
                $('#cropper_image').cropper({
                    aspectRatio: ratio,
                    zoomable: true,
                    preview: ".img-preview",
                    crop: function (e) {

                    }
                });

                //文件变更后，重新初始化cropper插件
                var URL = window.URL || window.webkitURL, blobURL;
                $('#image_file').on('change', function (evt) {
                    $("#cropper_image_container").show();
                    var files = this.files, file;
                    if (files && files.length) {
                        file = files[0];
                        that.type = file.name.substring(file.name.indexOf("."));
                        if (/^image\/\w+$/.test(file.type)) {
                            blobURL = URL.createObjectURL(file);
                            $("#cropper_image").one('built.cropper', function () {
                                URL.revokeObjectURL(blobURL); // Revoke when load complete
                            }).cropper('reset', true).cropper('replace', blobURL);
                        }
                    }
                });
            });
        },

        submit: function () {
            if (!$('#image_file').val()) {
                Util.info("请选择图片");
                return;
            }
            var result = $('#cropper_image').cropper('getCroppedCanvas').toDataURL();
            result = result.split(",")[1];
            Util.ajax({
                method: "POST",
                data: {
                    attachment: result,
                    type: that.type
                },
                url: Util.getApiUrl("upload/uploadBase64")
            }, function (data) {
                me.global.hidePop("modal_imageCropper", data);
            });
        }



    });
})();