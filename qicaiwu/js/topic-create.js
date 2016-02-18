$(function() {
    var $description = $('#topic-description'),
        $descriptionIndication = $('#topic-description-indication'),
        $title = $('#topic-title'),
        $titleIndication = $('#topic-title-indication'),
        $submit = $('#topic-submit'),
        insertedFiles = {};
    $description.summernote({
        lang: 'zh-CN',
        height: 200,
        tabsize: 2,
        codemirror: {
          theme: 'monokai'
        },
        onInsertImages: function(files) {
            for (var i = 0, il = files.length; i < il; i++) {
                if (!insertedFiles[files[i].name]) insertedFiles[files[i].name] = files[i];
            }
         //console.log(insertedFiles);   
        },
        toolbar: [
            //[groupname, [button list]]
            ['style', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['picture', ['picture']],
            ['video', ['video']],
            ['link', ['link']],
            ['hr', ['hr']],
            ['fullscreen', ['fullscreen']],
            ['codeview', ['codeview']],
            ['undo', ['undo']],
            ['redo', ['redo']],

        ]
    });

    function submitTopic() {
        var title = $.trim($title.val()),
            description = $description.code();
console.log(title, description);        $.post(app.url.like_submit, {
            title: title,
            description: description
        }, function(data) {
            if (data.success) {
                //location.href = data.url;
            }    
        }, 'json');
    }
    
    $submit.click(function(event) {
        var $items,
            uploadedCount = 0,
            completedCount = 0,
            errorCount = 0;

        if ($.trim($title.val()) === '') {
            $titleIndication.show();
            $title.focus();
            $title.one('keyup', function() {
                $titleIndication.hide();
            });
            return;
        }
        //编辑器默认内容为："<p><br></p>"
        if ($description.code() === "<p><br></p>") {
            $descriptionIndication.text('内容不能为空');
            $descriptionIndication.show();
            return;
        }

        if ($.isEmptyObject(insertedFiles)) {
            submitTopic();
            return;
        }

        $descriptionIndication.text('正在上传图片，请稍后...').show();

        for (var filename in insertedFiles) {
            $items = $('img[data-filename="' + filename + '"]');
            if ($items.length) {
                uploadedCount += 1;
                (new Uploader({
                    file: insertedFiles[filename],
                    server: app.url.upload,
                    onload: function(url, status, xhr, options) {
                        completedCount += 1;
                        $('img[data-filename="' + options.filename + '"]').attr('src', url).removeAttr('data-filename');
                        $descriptionIndication.text('图片 ' + options.filename + ' 上传完成');
console.log('success', uploadedCount, completedCount, errorCount);                        if (uploadedCount === completedCount && errorCount === 0) {
                            $descriptionIndication.hide();
                            submitTopic();
                        }
                        else if (uploadedCount === completedCount) {
                            $descriptionIndication.hide();
                            //do retry, or other
                        }
                    },
                    onerror: function(res, status, xhr, type, options) {
                        completedCount += 1;
                        errorCount += 1;
                        $('img[data-filename="' + options.filename + '"]').removeAttr('src');
                        $descriptionIndication.text('图片 ' + options.filename + ' 上传出错');
console.log('error', uploadedCount, completedCount, errorCount);                        if (uploadedCount === completedCount) {
                            $descriptionIndication.hide();
                            //do retry, or other
                        }
                    }
                })).send();
            }
        }
    });

    //用于调试
    window.insertedFiles = insertedFiles;
});

function noop() {}

function Uploader(options) {
    var defaults = {
            file: null,//blob文件对象
            method: 'post',//get, post
            server: '',//服务器地址
            headers: {},
            extraFormData: {},//额外表单数据
            fileFieldName: 'file',//文件字段名
            sendAsBinary: false,//是否发送二级制数据
            withCredentials: false,
            onprogress: noop,//进度回调函数, 参数: percentage, xhr, options
            onload: noop,//上传成功的回调函数，参数: response, statusCode, xhr, options
            onerror: noop//上传出错的回调，参数: response, statusCode, xhr, type(server|http|abort), options
        },
        me = this;
    me.options = $.extend({}, defaults, options);
    me.options.filename = me.options.file.name;
    me._init();
}

Uploader.prototype = {
    _init: function() {
        this._status = 0;
        this._response = null;
    },

    send: function() {
        var opts = this.options,
            xhr = this._initAjax(),
            server = opts.server,
            formData, binary;

        if ( opts.sendAsBinary ) {
            server += (/\?/.test( server ) ? '&' : '?') +
                    $.param( opts.extraFormData );

            binary = opts.file;
        } else {
            formData = new FormData();
            $.each( opts.extraFormData, function( k, v ) {
                formData.append( k, v );
            });

            formData.append( opts.fileFieldName, opts.file );
        }

        if ( opts.withCredentials && 'withCredentials' in xhr ) {
            xhr.open( opts.method, server, true );
            xhr.withCredentials = true;
        } else {
            xhr.open( opts.method, server );
        }

        this._setRequestHeader( xhr, opts.headers );

        if ( binary ) {
            // 强制设置成 content-type 为文件流。
            xhr.overrideMimeType &&
                    xhr.overrideMimeType('application/octet-stream');

            xhr.send( binary );
        } else {
            xhr.send( formData );
        }
    },

    getResponse: function() {
        return this._response;
    },

    getResponseAsJson: function() {
        return this._parseJson( this._response );
    },

    getStatus: function() {
        return this._status;
    },

    abort: function() {
        var xhr = this._xhr;

        if ( xhr ) {
            xhr.upload.onprogress = noop;
            xhr.onreadystatechange = noop;
            xhr.abort();

            this._xhr = xhr = null;
        }
    },

    destroy: function() {
        this.abort();
    },

    _initAjax: function() {
        var me = this,
            xhr = new XMLHttpRequest(),
            opts = this.options;

        if ( opts.withCredentials && !('withCredentials' in xhr) &&
                typeof XDomainRequest !== 'undefined' ) {
            xhr = new XDomainRequest();
        }

        xhr.upload.onprogress = function( e ) {
            var percentage = 0;

            if ( e.lengthComputable ) {
                percentage = e.loaded / e.total;
            }

            opts.onprogress(percentage, xhr, opts);
        };

        xhr.onreadystatechange = function() {

            if ( xhr.readyState !== 4 ) {
                return;
            }

            xhr.upload.onprogress = noop;
            xhr.onreadystatechange = noop;
            me._xhr = null;
            me._status = xhr.status;

            if ( xhr.status >= 200 && xhr.status < 300 ) {
                me._response = xhr.responseText;
                return opts.onload(me._response, me._status, xhr, opts);
            } else if ( xhr.status >= 500 && xhr.status < 600 ) {
                me._response = xhr.responseText;
                return opts.onerror(me._response, me._status, xhr, 'server', opts);
            }


            return opts.onerror(me._response, me._status, xhr, me._status ? 'http' : 'abort', opts);
        };

        me._xhr = xhr;
        return xhr;
    },

    _setRequestHeader: function( xhr, headers ) {
        $.each( headers, function( key, val ) {
            xhr.setRequestHeader( key, val );
        });
    },

    _parseJson: function( str ) {
        var json;

        try {
            json = JSON.parse( str );
        } catch ( ex ) {
            json = {};
        }

        return json;
    }
}