var Util = (function () {
	var that;
	var obj = function () {
		this.ajaxCount = 0;
		that = this;
		that.popId = [];

	};

	obj.prototype = {
		getQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return "";
		},

		info: function (msg, success) {
			$(".util_pop_info").remove();

			var innerDiv = document.createElement("div");
			innerDiv.className = "util_pop_info";
			if (success) {
				innerDiv.className += " success";
			}
			innerDiv.innerHTML = msg;

			document.body.appendChild(innerDiv);
			setTimeout(function () {
				$(".util_pop_info").remove();
			}, 3000);
		},

		getApiUrl: function (method, param, baseurl) {
		    baseurl = baseurl || Config.api;

		    var url;
		    if (method && method.indexOf("http://") >= 0)
		        url = method;
		    else {
		        url = baseurl.replace("{method}", method);
		    }

		    if (param) {
		        for (var key in param) {
		            if (url.indexOf("?") < 0) url += "?";
		            else url += "&";
		            url += key + "=" + param[key];
		        }
		    }
		    return url;
		},

		ajax: function (option, callback, noloading) {
		    if (!noloading) that.showLoading();

		    option.data || (option.data = {});
		    option.data.token = Util.getQueryString("token")||"OvkrrJnZiRt9ISZET1WQsDW7ZiVVv2pRvDcEDcPEF3HfI7co9DwW7T95WzhhQONlNs62LW0dHCDg%0A186khy8A63gOgFaNpbPhgnc5BKe83WZZamkGNZ%2Boyqr1gsedl1%2FNxuvQPw%3D%3D%0A";

		    var startTime = new Date();
		    me.ajax(option, function (data) {
		        if (!noloading) that.hideLoading();

		        if (me._param.config.debug) {
		        	console.group && console.group("ajax");
		        	console.log("%c链接", "font-weight:bold;");
		        	console.log(option.url);
		        	console.log("%c参数", "font-weight:bold;");
		        	console.log(JSON.stringify(option.data))
		        	console.log("%c返回", "font-weight:bold;");
		        	console.log(data.data);
		        	console.log("%c执行时间 " + (new Date() - startTime), "font-weight:bold;");
		        	console.groupEnd && console.groupEnd();
		        }
		        
		        if (data.resultCode) {
		            data.resultMsg && Util.info(data.resultMsg);

                    if (data.resultCode == 100) {
		        		location.replace("login.html");
		        		return;
		        	}

		        	return;
		        }

		        callback(data.data);
		    }, function (msg, status) {
		        if (!noloading) that.hideLoading();
		        if (status != 0) Util.info("请重试");
		    });
		},

		showLoading: function () {
			this.ajaxCount++;

			var loading = document.getElementById("loading");
			if (!loading) {
				loading = document.createElement("div");
				loading.innerHTML = "<img src='images/loading.gif' />";
				loading.id = "loading";
				document.body.appendChild(loading);
			}
		},

		hideLoading: function () {
			this.ajaxCount--;
			if (this.ajaxCount <= 0) {
				var loading = document.getElementById("loading");
				if (loading) {
					document.body.removeChild(loading);
				}
				this.ajaxCount = 0;
			}
		},

		//数组转key-value
		toMap: function(arr, idField){
			if (!arr) return {};

			var map = {};
			arr.forEach(function(item){
				map[item[idField]] = item;
			});
			return map;
		},

		isPhone: function(phone) {
			return /^1[358]\d{9}$/.test(phone);
		},

		isNum: function (num) {
			return /^\d+(\.\d+)?$/.test(num);
		},

		isLink: function (link) {
		    return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(link);
		},

		page: function (arr, pageIndex, pageSize) {
			if (!arr || arr.length == 0) return [];

			arr = angular.copy(arr);
			return arr.splice(pageIndex * pageSize, pageSize);
		},

		decentString: function (str) {
			return /^[a-zA-Z_\d]+$/.test(str);
		},

		decentStringZH: function (str) {
			return /^[a-zA-Z_\d\u4e00-\u9fa5]+$/.test(str);
		},

		idnumber: function (str) {
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			return reg.test(str);
		},

		isMail: function (str) {
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
		},

	    /*数组合并，去重*/
		mergeArray: function (arr1, arr2, field) {
		    for (var i = 0 ; i < arr1.length ; i++) {
		        for (var j = 0 ; j < arr2.length ; j++) {
		            if (arr1[i] && arr2[j]) {

		                if (field) {
		                    if (arr1[i][field] === arr2[j][field]) {
		                        arr1.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
		                    }
		                } else {
		                    if (arr1[i] === arr2[j]) {
		                        arr1.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
		                    }
		                }
		            }

		        }
		    }
		    for (var i = 0; i < arr2.length; i++) {
		        arr1.push(arr2[i]);
		    }
		    return arr1;
		},

		preventDefault: function () {
		    var e = e || window.event;
		    //如果提供了事件对象，则这是一个非IE浏览器
		    if (e && e.stopPropagation)
		        //因此它支持W3C的stopPropagation()方法
		        e.stopPropagation();
		    else
		        //否则，我们需要使用IE的方式来取消事件冒泡 
		        window.event.cancelBubble = true;

		    //如果提供了事件对象，则这是一个非IE浏览器 
		    if (e && e.preventDefault)
		        //阻止默认浏览器动作(W3C) 
		        e.preventDefault();
		    else
		        //IE中阻止函数器默认动作的方式 
		        window.event.returnValue = false;
		    return false;
		}

	};

	return new obj();
})();

