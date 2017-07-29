(function () {
    var that = me.define("orderDetail", {
        ctrl: function () {

        },
        //submit: function () {
        //    that.$scope.model.begin_time = $("#begin_time").val();
        //    that.$scope.model.end_time = $("#end_time").val();
        //    Util.ajax({
        //        method: "POST",
        //        data: that.$scope.model,
        //        url: Util.getApiUrl("course/updateCourseCertificateApply")
        //    }, function (data) {
        //        that.$scope.model.apply_id = data;
        //        Util.info("提交成功", true);
        //        me.hide(that.$scope.model);
        //    })
        //},
        uploadFile: function () {
            me.show("common/imageCropper", {
                showType: 1,
                style: "pop",
                param: {
                    title: "上传图片",
                    ratio: 3 / 4
                }
            }).on("hide", function (data) {
                if (!data) return;
                //path接收参数需要参考列表查询返回的路径参数，保持一致
                that.$scope.model.user_image_url =data.path;
                that.$scope.model.user_image= data.res_id;
            });
        }

    });
})();