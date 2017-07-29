me.ready(function () {
    me.global({
        timeGMTToString: function (str, format) {
            if (!str) return;
            str = str.split(' ');
            var date_str = str[0];
            var time_str = "";
            if (str.length > 1)
                time_str = str[1];
            date_str = date_str.split('-');
            time_str = time_str.split(':');
            var date = new Date();
            date.setFullYear(date_str[0], date_str[1] - 1, date_str[2]);
            date.setHours(time_str[0], time_str.length > 1 ? time_str[1] : 0, time_str.length > 2 ? time_str[2] : 0, time_str.length > 3 ? time_str[3] : 0);
            return me.global.dateToString(date, format);
        },

        timespanToString: function (timespan, format) {
            if (!timespan) return "";

            var temp = /^\/Date\((\d+)\)\/$/i.exec(timespan);;
            if (temp) {
                timespan = parseFloat(temp[1]);
            } else {
                return "";
            }

            var date = new Date(timespan);
            return me.global.dateToString(date, format);
        },

        dateToString: function (date, format) {
            var o = {
                "M+": date.getMonth() + 1, //month
                "d+": date.getDate(), //day
                "h+": date.getHours(), //hour
                "m+": date.getMinutes(), //minute
                "s+": date.getSeconds(), //second
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1,
						RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }

            return format;
        },

		generateMbx: function (scope, pageTitle) {
			var from = me.param() ? me.param().from : null;
			if (!from) return;

			if (typeof from == "string") {
				from = [from];
			}

			from.push(pageTitle);

			scope.fromList = from;
		},

		showPop: function (elId, intervals) {
			$('#' + elId).modal('show');
			$('#' + elId).on('hidden.bs.modal', function (e) {
				if (intervals) {
					me.utils.each(intervals, function (interval) {
						clearInterval(interval);
					})
				};
				me.hide();
			});
		},

		hidePop: function (elId, data) {
			/*取消showPop时绑定的默认hide事件*/
			$('#' + elId).unbind("hidden.bs.modal");
			$('#' + elId).on('hidden.bs.modal', function (e) {
				me.hide(data);
			});

			$('#' + elId).modal('hide');
		},

		isShowMenu: function (roleId) {
		    if (!me.global.user) {
		        return;
		    }

		    for (var i = 0; i < roleId.length; i++) {
		        if (roleId[i] == me.global.user.RoleId) {
		            return true;
		        }
		    }

		    return false;
		},

		uploadFile: function (accept, size, callback, progressCallback, multi, beginUpload) {
		    File.upload({
		        multi: multi == undefined ? true : multi,
				param:{
					token:me.global.token
				},
		        url: Util.getApiUrl("uploadfile", null, Config.upload_api),
		        accept: accept, //"image/jpeg,image/png",
		        before: function (files) {
		            size = size || 1024 * 1024 * 5 * 100; // 默认40M限制
		            if (files[0].size > size) {
		                Util.info("文件大小不能超过" + (size / 1024 / 1024) + "MB");
		                return false;
		            }

		            if (beginUpload) beginUpload(files);
		            Util.showLoading();
		        },
		        after: function (data) {
		            Util.hideLoading();
		            var res = JSON.parse(data).data;

		            if (callback) callback(res);
		        },
		        error: function () {
		            Util.hideLoading();
		            Util.info("上传失败");
		        },
		        progress: function (value) {
		            if (progressCallback) progressCallback(value);
		        }
		    });
		},
		isNum:function (num) {
			return /^\d+(\.\d+)?$/.test(num);
		},

		myshow: function (page, options) {
		    return me.show(page, options);
		},

		getSiteList: function (callback) {
		    if (me.global.site_dict_arr) {
		        callback && callback();
		        return;
		    }
		    Util.ajax({
		        method: "POST",
		        data: {},
		        url: Util.getApiUrl("get_site_list")
		    }, function (data) {
		        me.global("site_dict_arr", data);
		        me.global("site_dict_map", Util.toMap(data, "site_id"));
		        me.global.getSystemList(data, callback);
		    });
		},

		getSystemList: function (data, callback) {
		    var system_dict_arr = [];
		    var system_dict_map = {};
		    $.each(data, function (index, site) {
		        if (!system_dict_map[site.system_id]) {
		            system_dict_arr.push(site);
		            system_dict_map[site.system_id] = site;
		        }
		    });
		    me.global("system_dict_arr", system_dict_arr);
		    me.global("system_dict_map", system_dict_map);
		    callback && callback();
		}

    });

    me.global("res", Config.res);

	me.global("api", Config.api);

	me.global("upload_api", Config.upload_api);

	me.global("LETTER_MAP",["A","B","C","D","E","F","G","H","I","J","K","L","M"]);

});