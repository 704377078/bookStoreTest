(function () {
    var that = me.define("userList", {
        ctrl: function () {
            that.listUser();
        },
        listUser:function(){
            var data = {
                count:3,
                pageSize:10,
                pageIndex:0,
                list:[
                    {
                        id:1,
                        name:"秋秋秋",
                        phone:"15958110699",
                        email:"50448347@qq.com",
                        address:"浙江省杭州市杭州电子科技大学",
                        num:1
                    },
                    {
                        id:2,
                        name:"秋秋秋",
                        phone:"15958110699",
                        email:"50448347@qq.com",
                        address:"浙江省杭州市杭州电子科技大学",
                        num:1
                    },
                    {
                        id:3,
                        name:"秋秋秋",
                        phone:"15958110699",
                        email:"50448347@qq.com",
                        address:"浙江省杭州市杭州电子科技大学",
                        num:1
                    }
                ]
            };
            that.$scope.data = data.list;
        },

        //listCase: function () {
        //    that.$scope.pager = new Pagination("#case_pager",{
        //        autoLoad:true,
        //        pageSize:10,
        //        toPage: function (pageIndex) {
        //            Util.ajax({
        //                method: "POST",
        //                data: {
        //                    pageIndex: pageIndex,
        //                    pageSize: 10,
        //                    category_item_id: that.$scope.category_item_id
        //                },
        //                url: Util.getApiUrl("course/listSlideQuestion")
        //            }, function (data) {
        //                if (pageIndex == 0) that.$scope.pager.updateCount(data.count);
        //                that.$scope.questionList = data.list;
        //                that.$scope.cl_ids = data.cl_ids;
        //            });
        //        }
        //    })
        //},

        //显示历史订单
        historyOrder:function(item){
            me.show("orderList",{
                showType:1,
                param:{
                    id:item.id
                }
            }).on("hide",function(){

            });
        }
    });
})();