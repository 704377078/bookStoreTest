(function () {
    var that = me.define("bookUpdate", {
        ctrl: function () {
            that.$scope.model = me.param()||{};
        },

        //getDetail: function () {
        //    Util.ajax({
        //        method: "POST",
        //        data: { notice_id: that.$scope.model.notice_id },
        //        url: Util.getApiUrl("notice/getNotice")
        //    }, function (data) {
        //        me.utils.extend(that.$scope.model, data);
        //        that.createEditor();
        //    })
        //},
        uploadFile: function () {
            me.show("common/imageCropper", {
                showType: 1,
                style: "pop",
                param: {
                    title: "上传封面"
                }
            }).on("hide", function (data) {
                if (!data) return;
                that.$scope.model.banner_img_url = data.path;
                that.$scope.model.banner_img = data.res_id;
            });
        },

        submit: function () {
            that.$scope.model.content = that.$scope.um_1.getContent();

            if (!that.check()) return;

            Util.ajax({
                method: "POST",
                data: that.$scope.model,
                url: Util.getApiUrl("notice/upsertNotice")
            }, function (data) {
                that.$scope.model.create_time = me.global.dateToString(new Date(), "yyyy-MM-dd hh:mm:ss");
                that.$scope.model.notice_id = data;
                Util.info("提交成功", true);
                me.hide(that.$scope.model)
            })
        },

        check: function () {
            if (!that.$scope.model.notice_title) {
                Util.info("请填写标题");
                return false;
            }
            
            return true;
        }
    });
})();