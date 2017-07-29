(function () {
    var that = me.define("bookList", {
        ctrl: function () {
            that.listBook();
        },
        listBook:function(){
            var data = {
                count:3,
                pageSize:10,
                pageIndex:0,
                list:[
                    {
                        id:1,
                        name:"数学",
                        url:"封面地址",
                        author:"哒哒哒@qq.com",
                        cbs:"热门美出版社",
                        time:"2012-21-12"
                    },
                    {
                        id:2,
                        name:"数学",
                        url:"封面地址",
                        author:"哒哒哒@qq.com",
                        cbs:"热门美出版社",
                        time:"2012-21-12"
                    },
                    {
                        id:3,
                        name:"数学",
                        url:"封面地址",
                        author:"哒哒哒@qq.com",
                        cbs:"热门美出版社",
                        time:"2012-21-12"
                    }
                ]
            };
            that.$scope.data = data.list;
        },
        //listItem: function (param) {
        //    var p = new Pagination("#notice_pager", {
        //        autoLoad: true,
        //        pageSize: 20,
        //        toPage: function (pageIndex) {
        //            param.pageIndex = pageIndex;
        //            param.pageSize = 20;
        //
        //            Util.ajax({
        //                method: "POST",
        //                data: param,
        //                url: Util.getApiUrl("notice/listNotice")
        //            }, function (data) {
        //                if (pageIndex == 0) p.updateCount(data.count);
        //                that.$scope.data = data.list;
        //            });
        //        }
        //    })
        //},

        updateBook: function (item, index) {
            me.show("bookUpdate", {
                showType: 1,
                param: angular.copy(item)
            }).on("hide", function (newItem) {
                if (!newItem) return;

                if (index >= 0) {
                    that.$scope.data[index] = newItem;
                }
                else {
                    that.$scope.data.unshift(newItem);
                }
            });
        },

        delItem: function (item, index) {
            me.show("pop/modal", {
                showType: 1,
                style: "pop",
                param: "确定删除吗？"
            }).on("hide", function (isConfirm) {
                if (!isConfirm) return;
                Util.info("删除成功", true);
                that.$scope.data.splice(index, 1);

                //接口请求
                //Util.ajax({
                //    method: "POST",
                //    data: {
                //        id: item.id
                //    },
                //    url: Util.getApiUrl("notice/delNotice")
                //}, function () {
                //    Util.info("删除成功", true);
                //    that.$scope.data.splice(index, 1);
                //});
            });
        }
    });
})();