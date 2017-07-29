(function () {
    var that = me.define("backOrderList", {
        ctrl: function () {

        },
        listBill: function () {
            var p = new Pagination("#billList_pager",{
                autoLoad:true,
                pageSize:10,
                toPage: function (pageIndex) {
                    Util.ajax({
                        method: "POST",
                        data: {
                            pageIndex: pageIndex,
                            pageSize: 10,
                            invoice_status:that.$scope.invoice_status,
                            web_user_account:that.$scope.web_user_account
                        },
                        url: Util.getApiUrl("course/listUserCourseInvoice")
                    }, function (data) {
                        if (pageIndex == 0) p.updateCount(data.count);
                        that.$scope.data = data.list;
                    });
                }
            })
        },
        getBills: function (bills) {
            me.show("pop/billCheck", {
                showType: 1,
                style: "pop",
                param: angular.copy(bills)
            })
        },
        sendBills: function (item) {
            me.show("pop/billSend", {
                showType: 1,
                style: "pop",
                param: angular.copy(item)
            }).on("hide", function (newItem) {
                if(!newItem)return;
                that.listBill();
            });
        }
    });
})();