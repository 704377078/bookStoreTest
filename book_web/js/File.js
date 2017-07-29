var File = (function () {
	var that;
	var obj = function () {
		that = this;

		window.addEventListener("load", that._init, false);
	}

	obj.prototype = {
		upload: function (options) {
			that._initByOptions(options);
			that.fileInput.click();
		},

		doUpload: function (callback) {
		    that.options.param || (that.options.param = {});

		    var index = 0,
		        fileCount = this.files.length,
		        rlt = [];

		    for (var i = 0; i < fileCount; i++) {
		        that._uploadFile(this.files[i], function (responseText) {
		            rlt.push(JSON.parse(responseText).data);
		            index++;

		            if (index >= fileCount) {
		                callback && callback(rlt);
		            }
		        });
		    }
		},

		_initByOptions: function (options) {
			that.fileInput.value = "";
			that.options = {
				multi: false,
				url: "",
				accept: "",
				param: null,
			    async: false, // 异步上传，选择文件后不做上传动作
				before: function () { },
				after: function () { },
				progress: function () { }
			};

			if (options) {
				for (var i in options) {
					that.options[i] = options[i];
				}
			}

			// multiple
			if (that.options.multi) that.fileInput.setAttribute("multiple", "multiple");
			else that.fileInput.removeAttribute("multiple");

			// accept
			that.fileInput.setAttribute("accept", that.options.accept || "");
		},

		_init: function () {
			var ipt = document.createElement("input");
			ipt.style.display = "none";
			ipt.setAttribute("type", "file");
			ipt.addEventListener("change", that._fileChange, false);
			document.body.appendChild(ipt);

			that.fileInput = ipt;
		},

		_fileChange: function () {
			if (that.options.before) {
				var result = that.options.before(this.files);
				if (result == false) return;
			}

			if (that.options.async) {
			    var rlt = [],
			        fileIndex = 0,
			        fileCount = this.files.length;

			    that.files = this.files;

			    for (var i = 0; i < fileCount; i++) {
			        var file = this.files[i];

			        var reader = new FileReader();
			        reader.onload = function (e) {
			            rlt.push(this.result);
			            fileIndex++;

			            if (fileIndex >= fileCount) {
			                that.options.onChoose && that.options.onChoose(rlt);
			            }
			        }
			        //读取文件内容
			        reader.readAsDataURL(file);
			    }
			    
			} else {
			    for (var i = 0; i < this.files.length; i++) {
			        that._uploadFile(this.files[i]);
			    }
			}
		},

		_uploadFile: function (file, callback) {
			var xhr = new XMLHttpRequest();

			xhr.upload.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					that.options.progress && that.options.progress(evt.loaded / evt.total);
				}
				else {
					// No data to calculate on
				}
			}, false);

			xhr.addEventListener("load", function () {

			}, false);

			xhr.open("post", that.options.url);

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
						console.log(xhr.responseText)
						that.options.after && that.options.after(xhr.responseText, file);
						callback && callback(xhr.responseText);
						xhr = null;
					}
				}
			}

			xhr.onerror = function () {
				that.options.error && that.options.error();
			}

			// Send the file (doh)
			if ("getAsBinary" in file) {
				//FF 3.5+
				xhr.sendAsBinary(file.getAsBinary());
			} else {
				var formData = new FormData();
				formData.append("attachment", file);
				formData.append("type", file.name.substring(file.name.indexOf(".")));

				if (that.options.param) {
					for (var p in that.options.param) {
						formData.append(p, that.options.param[p]);
					}
				}

				xhr.send(formData);
			}
		}
	}

	return new obj();
})();