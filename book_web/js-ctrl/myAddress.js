(function () {
    var that = me.define("myAddress", {
        ctrl: function () {

        },
        addressUpdate:function(){
            me.show("pop/addressUpdate",{
                showType:1,
                style:"pop",
                param:{}
            }).on("hide",function(teacher){
                if(!teacher)return;
            })
        },
        showMyShop:function(){
            me.show("myShop",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMyOrder:function(){
            me.show("myOrder",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMyCollect:function(){
            me.show("myCollect",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMyAddress:function(){
            me.show("myAddress",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMyReject:function(){
            me.show("myReject",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMyData:function(){
            me.show("myData",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMySale:function(){
            me.show("mySale",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        },
        showMyNum:function(){
            me.show("myNum",{
                showType:0,
                param:{}
            }).on("hide",function(item){
                if(!item)return;

            })
        }

    });
})();