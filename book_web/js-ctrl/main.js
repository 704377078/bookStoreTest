(function () {
    var that = me.define("main", {
        ctrl: function () {

        },
        listCourse: function () {
            var p = new Pagination("#pager",{
                autoLoad:true,
                pageSize:10,
                toPage: function (pageIndex) {
                    Util.ajax({
                        method: "POST",
                        data: {
                            pageIndex: pageIndex,
                            pageSize: 10,
                            course_name:that.$scope.course_name
                        },
                        url: Util.getApiUrl("course/listCourse")
                    }, function (data) {
                        if (pageIndex == 0) p.updateCount(data.count);
                        that.$scope.data = data.list;
                    });
                }
            })
        }
    });
})();