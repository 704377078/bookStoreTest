(function () {
    var that = me.define("orderList", {
        ctrl: function () {

        },
        //listCard: function () {
        //    var p = new Pagination("#pager",{
        //        autoLoad:true,
        //        pageSize:20,
        //        toPage: function (pageIndex) {
        //            Util.ajax({
        //                method: "POST",
        //                data: {
        //                    pageIndex: pageIndex,
        //                    pageSize: 20,
        //                    web_user_account:that.$scope.web_user_account,
        //                    is_send:that.$scope.is_send
        //                },
        //                url: Util.getApiUrl("course/listCourseCertificateApply")
        //            }, function (data) {
        //                if (pageIndex == 0) p.updateCount(data.count);
        //                that.$scope.data = data.list;
        //            });
        //        }
        //    })
        //},
        getDetail: function (apply, index) {
            me.show("orderDetail", {
                showType: 1,
                param: {}
            }).on("hide", function (newApply) {
                if(!newApply)return;
                that.$scope.data[index] = newApply;
            });
        }
    });
})();