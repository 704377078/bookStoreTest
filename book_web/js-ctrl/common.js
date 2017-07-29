(function () {
    var that = me.define("common", {
        ctrl: function () {

        },
        getBillInfo: function () {
            Util.ajax({
                method: "POST",
                data: {
                    order_id:that.$scope.bills.order_id
                },
                url: Util.getApiUrl("course/getUserCourseInvoice")
            }, function (data) {
                that.$scope.bills = data;
            });
        }

    });
})();