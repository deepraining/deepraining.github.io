jQuery(function() {
    var $ = jQuery,    // just in case. Make sure it's not an other libaray.

        $topPart = $('#upload-top'),
        
        $leftPart = $('#upload-left'),

        $rightPart = $('#upload-right'),

        //全选
        $selectAll = $('#upload-select-all'),

        //反选
        $reverseSelected = $('#upload-reverse-selected'),

        //删除选中项目
        $deleteSelected = $('#upload-delete-selected'),

        //添加选中项目到专辑
        $addSelectedTo = $('#upload-add-selected-to'),

        //顺时针旋转
        $rotateSelectedC = $('#upload-rotate-selected-c'),

        //逆时针旋转
        $rotateSelectedI = $('#upload-rotate-selected-i'),

        //左边的标题栏
        $leftTitle = $('#upload-left-title'),

        //左边标题栏下的项目数
        $selectedItemsCount = $leftTitle.find('.itemsCount'),

        //左边标题栏下的批处理文本标志
        $batchTextMark = $('#upload-batch-text-mark'),

        //项目标题
        $itemTitle = $('#upload-item-title'),
        $itemTitleInput = $itemTitle.find('> input'),


        //项目标签
        $itemTags = $('#upload-item-tags'),
        $itemTagsInput = $itemTags.find('> input'),

        //项目描述
        $itemDescription = $('#upload-item-description'),
        $itemDescriptionInput = $itemDescription.find('> textarea'),

        //项目添加到
        $itemAddTo = $('#upload-item-add-to'),
        $itemAddToInput = $itemAddTo.find('> input'),

        //项目授权
        $itemAuthorize = $('#upload-item-authorize'),
        $itemAuthorizeSelect = $itemAuthorize.find('> select'),

        //上次点击上传文件项目的索引(按下ctrl或shift不更改)
        lastClickIndex = -1,
        
        $wrap = $('#uploader'),

        // 图片容器
        $queue = $('<ul class="filelist"></ul>')
            .appendTo( $wrap.find('.queueList') ),

        // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find('.statusBar'),

        // 文件总体选择信息。
        $info = $statusBar.find('.info'),

        // 上传按钮
        $upload = $wrap.find('.uploadBtn'),

        // 没选择文件之前的内容。
        $placeHolder = $wrap.find('.placeholder'),

        // 总体进度条
        $progress = $statusBar.find('.progress').hide(),

        // 添加的文件数量
        fileCount = 0,

        // 添加的文件总大小
        fileSize = 0,

        //每个文件的额外信息，包括 title, tags, description, album id, album name, authorizaton
        extraData = {},

        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 160 * ratio,
        thumbnailHeight = 160 * ratio,

        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding',

        // 所有文件的进度信息，key为file id
        percentages = {},

        supportTransition = (function(){
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                      'WebkitTransition' in s ||
                      'MozTransition' in s ||
                      'msTransition' in s ||
                      'OTransition' in s;
            s = null;
            return r;
        })(),

        // WebUploader实例
        uploader;

    if ( !WebUploader.Uploader.support() ) {
        alert( 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error( 'WebUploader does not support the browser you are using.' );
    }

    // 实例化
    uploader = WebUploader.create({
        pick: {
            id: '#filePicker',
            label: '点击选择图片'
        },
        dnd: '#uploader .queueList',
        paste: document.body,

        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },

        // swf文件路径
        //swf: BASE_URL + '/js/Uploader.swf',

        disableGlobalDnd: true,

        chunked: true,
        // server: 'http://webuploader.duapp.com/server/fileupload.php',
        server: app.url.upload,
        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,
        fileNumLimit: 500,
        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 5 * 1024 * 1024    // 5 M
    });

    // 拖拽时不接受 js, txt 文件。
    uploader.on( 'dndAccept', function( items ) {
        var denied = false,
            len = items.length,
            i = 0,
            // 修改js类型
            unAllowed = 'text/plain;application/javascript ';

        for ( ; i < len; i++ ) {
            // 如果在列表里面
            if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                denied = true;
                break;
            }
        }

        return !denied;
    });

    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: '#filePicker2',
        label: '继续添加'
    });

    // 当有文件添加进来时执行，负责view的创建
    function addFile( file ) {
        var pureName = file.name.slice(0, file.name.lastIndexOf('.')), //不含扩展名的文件名
            $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '<input class="name" value="' + pureName + '">' +
                '</li>' ),

            $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
            $prgress = $li.find('p.progress span'),
            $wrap = $li.find( 'p.imgWrap' ),
            $info = $('<p class="error"></p>'),

            showError = function( code ) {
                switch( code ) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;

                    case 'interrupt':
                        text = '上传暂停';
                        break;

                    default:
                        text = '上传失败，请重试';
                        break;
                }

                $info.text( text ).appendTo( $li );
            };

        //初始化文件标题，默认为文件名
        extraData[file.id] = {};
        extraData[file.id].title = pureName;

        if ( file.getStatus() === 'invalid' ) {
            showError( file.statusText );
        } else {
            // @todo lazyload
            $wrap.text( '预览中' );
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }

                var img = $('<img src="'+src+'">');
                $wrap.empty().append( img );
            }, thumbnailWidth, thumbnailHeight );

            percentages[ file.id ] = [ file.size, 0 ];
            file.rotation = 0;
        }

        file.on('statuschange', function( cur, prev ) {
            if ( prev === 'progress' ) {
                $prgress.hide().width(0);
            } else if ( prev === 'queued' ) {
                $li.off( 'mouseenter mouseleave' );
                $btns.remove();
            }

            // 成功
            if ( cur === 'error' || cur === 'invalid' ) {
                console.log( file.statusText );
                showError( file.statusText );
                percentages[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( 'interrupt' );
            } else if ( cur === 'queued' ) {
                percentages[ file.id ][ 1 ] = 0;
            } else if ( cur === 'progress' ) {
                $info.remove();
                $prgress.css('display', 'block');
            } else if ( cur === 'complete' ) {
                $li.append( '<span class="success"></span>' );
            }

            $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
        });

        $li.on( 'mouseenter', function() {
            $btns.stop().animate({height: 30});
        });

        $li.on( 'mouseleave', function() {
            $btns.stop().animate({height: 0});
        });

        $btns.on( 'click', 'span', function() {
            var index = $(this).index(),
                deg;

            switch ( index ) {
                case 0:
                    uploader.removeFile( file );
                    return;

                case 1:
                    file.rotation += 90;
                    break;

                case 2:
                    file.rotation -= 90;
                    break;
            }

            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                // use jquery animate to rotation
                // $({
                //     rotation: rotation
                // }).animate({
                //     rotation: file.rotation
                // }, {
                //     easing: 'linear',
                //     step: function( now ) {
                //         now = now * Math.PI / 180;

                //         var cos = Math.cos( now ),
                //             sin = Math.sin( now );

                //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                //     }
                // });
            }


        });

        $li.click(onClickListItem);
        //项目标题输入input
        //标题可以为空，有可能用户想要去掉标题
        $li.on('keyup', '.name', function(event) {
            var $this = $(this),
                $li = $(event.delegateTarget),
                textValue = $.trim($this.val()),
                id = $li.attr('id');
            /*if (textValue != '')*/ extraData[id].title = textValue;
            //同步到 #upload-left 标题输入框
            if ($queue.find('> li.selected').length === 1 && $li.hasClass('selected')) {
                $itemTitleInput.val(textValue);
            }
        });

        $li.appendTo( $queue );
    }

    // 负责view的销毁
    function removeFile( file ) {
        var $li = $('#'+file.id);

        delete percentages[ file.id ];
        updateTotalProgress();
        $li.off().find('.file-panel').off().end().remove();
    }

    function updateTotalProgress() {
        var loaded = 0,
            total = 0,
            spans = $progress.children(),
            percent;

        $.each( percentages, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;

        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatus();
    }

    function updateStatus() {
        var text = '', stats;

        if ( state === 'ready' ) {
            text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize( fileSize ) + '。';
        } else if ( state === 'confirm' ) {
            stats = uploader.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张照片，'+
                    stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
            }

        } else {
            stats = uploader.getStats();
            text = '共' + fileCount + '张（' +
                    WebUploader.formatSize( fileSize )  +
                    '），已上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }

        $info.html( text );
    }

    function setState( val ) {
        var file, stats;

        if ( val === state ) {
            return;
        }

        $upload.removeClass( 'state-' + state );
        $upload.addClass( 'state-' + val );
        state = val;

        switch ( state ) {
            //padding吧：最初始的状态
            case 'pedding':
                $placeHolder.removeClass( 'element-invisible' );
                $queue.parent().removeClass('filled');
                $queue.hide();
                $statusBar.addClass( 'element-invisible' );
                uploader.refresh();
                break;

            //有图片正待上传，待添加图片
            case 'ready':
                $placeHolder.addClass( 'element-invisible' );
                $( '#filePicker2' ).removeClass( 'element-invisible');
                $queue.parent().addClass('filled');
                $queue.show();
                $statusBar.removeClass('element-invisible');
                uploader.refresh();
                break;

            //正在上传
            case 'uploading':
                $( '#filePicker2' ).addClass( 'element-invisible' );
                $progress.show();
                $upload.text( '暂停上传' );
                break;

            //暂停上传
            case 'paused':
                $progress.show();
                $upload.text( '继续上传' );
                break;

            //上传完成后的确认
            case 'confirm':
                $progress.hide();
                $upload.text( '开始上传' ).removeClass( 'disabled' );
                $( '#filePicker2' ).removeClass( 'element-invisible' );

                stats = uploader.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setState( 'finish' );
                    return;
                }
                break;
            //上传完成
            case 'finish':
                stats = uploader.getStats();
                if ( stats.successNum ) {
                    alert( '上传成功' );
                } else {
                    // 没有成功的图片，重设
                    state = 'done';
                    location.reload();
                }
                break;
        }

        updateStatus();
    }

    function onClickListItem (event) {
        var $this = $(this),
            $items = $queue.find('> li'),
            $selectedItems,
            $selectedItem,
            currentIndex = $this.index(),
            start, end, i, id, data;
        if (lastClickIndex === -1) {
            lastClickIndex = currentIndex;
            $items.removeClass('selected');
            $this.addClass('selected');
        }
        else if (event.shiftKey) {
            //if (lastClickIndex === currentIndex) return;
            start = Math.min(lastClickIndex, currentIndex);
            end = Math.max(lastClickIndex, currentIndex);
            $items.removeClass('selected');
            for (i=start; i <= end; i++) {
                $($items[i]).addClass('selected');
            }
        }
        else if (event.ctrlKey) {
            $this.toggleClass('selected');
        }
        else {
            lastClickIndex = currentIndex;
            $items.removeClass('selected');
            $this.addClass('selected');
        }

        updateLeftPanel();
    }

    //更新左边面板
    function updateLeftPanel() {
        var $selectedItems,
            $selectedItem,
            id, data;

        //同步到 #upload-left 区域
        $selectedItems = $queue.find('> li.selected');
        if ($selectedItems.length === 1) {
            $selectedItem = $($selectedItems[0]);
            id = $selectedItem.attr('id');
            data = extraData[id];
            $batchTextMark.hide();
            $selectedItemsCount.text(1);
            $itemTitleInput.val(data.title);
            $itemTagsInput.val(data.tags);
            $itemDescriptionInput.val(data.description);
            $itemAddToInput.val(data.albumName);
            $itemAuthorizeSelect.val(data.authorization);
        }
        else {
            $selectedItems.length > 1 ? $batchTextMark.show() : $batchTextMark.hide();
            $selectedItemsCount.text($selectedItems.length);
            $itemTitleInput.val('');
            $itemTagsInput.val('');
            $itemDescriptionInput.val('');
            $itemAddToInput.val('');
            $itemAuthorizeSelect.val('');
        }
        //console.log($selectedItemsCount.text());
    }

    uploader.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentages[ file.id ][ 1 ] = percentage;
        updateTotalProgress();
    };

    uploader.onFileQueued = function( file ) {
        fileCount++;
        fileSize += file.size;

        if ( fileCount === 1 ) {
            $placeHolder.addClass( 'element-invisible' );
            $statusBar.show();
            $rightPart.css({'left': 281, 'top': 51});
            $topPart.show();
            $leftPart.show();
        }

        addFile( file );
        setState( 'ready' );
        updateTotalProgress();
    };

    uploader.onFileDequeued = function( file ) {
        fileCount--;
        fileSize -= file.size;

        if ( !fileCount ) {
            setState( 'pedding' );
            //以下三个操作会导致按钮‘点击选择图片’位置出错
            //$rightPart.css({'left': 0, 'top': 0});
            //$topPart.hide();
            //$leftPart.hide();
        }

        removeFile( file );
        updateTotalProgress();

    };

    uploader.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setState( 'confirm' );
                break;

            case 'startUpload':
                setState( 'uploading' );
                break;

            case 'stopUpload':
                setState( 'paused' );
                break;

        }
    });

    //处了 F_EXCEED_SIZE 外，其余的事件处理函数都有两个参数 errorCode 和 file, 而 F_EXCEED_SIZE 的参数为 errorCode, maxSize 和 file
    uploader.onError = function( code, file, realFile ) {
        var msg;
        switch(code) {
            case 'Q_EXCEED_NUM_LIMIT': 
                msg = '您添加的文件总数超出了限制，最多一次可添加 ' + uploader.options.fileNumLimit + ' 张';
                alert(msg);
                break;
            case 'Q_EXCEED_SIZE_LIMIT': 
                msg = '您所有添加的文件总大小超出了限制，最多一次可添加 ' + uploader.options.fileSizeLimit / (1024*1024) + ' M';
                alert(msg);
                break;
            case 'Q_TYPE_DENIED': 
                msg = '您添加的文件 ' + file.name + ' 不是通用图片格式，我们只接受 jpg, jpeg, png, gif, bmp 格式的图片';
                alert(msg);
                break;
            case 'F_EXCEED_SIZE': 
                msg = '您添加的文件 ' + realFile.name + ' 超出了限制，每张图片最大为 ' + uploader.options.fileSingleSizeLimit / (1024*1024) + ' M';
                alert(msg);
                break;
            case 'F_DUPLICATE': 
                msg = '您添加的文件 ' + file.name + ' 已经添加过';
                alert(msg);
                break;
        }
    };

    //给每个文件添加额外的字段
    uploader.on('uploadBeforeSend', function(block, data, headers) {
        if (extraData[block.file.id]) {
            $.each( extraData[block.file.id], function( k, v ) {
                data[k] = v;
            });
        }
    });

    //限制图片的大小
    /*uploader.on('beforeFileQueued', function(file) {
        console.log(file, file.id);//if (file._info.width < 600 || file._info.height < 600) return false;
    });*/

    //测试服务器端接收到的formdata，测试uploadAccept事件
    uploader.on('uploadAccept', function(block, ret) {
        console.log(block.file.id, ret);
    });

    //测试服务器端接收到的formdata，测试uploadSuccess事件
    uploader.on('uploadAccept', function(file, ret) {
        console.log(file.id, ret);
    });

    $upload.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }

        if ( state === 'ready' ) {
            uploader.upload();
        } else if ( state === 'paused' ) {
            uploader.upload();
        } else if ( state === 'uploading' ) {
            uploader.stop();
        }
    });

    //上传失败，重试
    $info.on( 'click', '.retry', function() {
        uploader.retry();
    } );

    //上传失败，忽略
    $info.on( 'click', '.ignore', function() {
        var $items = $queue.find('> li.state-error'),
            il = $items.length,
            i, $item, id;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            id = $item.attr('id');
            uploader.removeFile(id);
        }
        $upload.removeClass('disabled');
        $( '#filePicker2' ).removeClass( 'element-invisible' );
    } );

    //点击一个项目，按住ctrl键或shift多选
    //$queue.on('click', 'li', onClickListItem);



    //点击列表其他地方，取消选择
    $queue.on('click', function(event) {
        event.target === event.currentTarget && (
            $(this).find('> li').removeClass('selected'),
            $batchTextMark.hide(),
            $selectedItemsCount.text(0),
            $itemTitleInput.val(''),
            $itemTagsInput.val(''),
            $itemDescriptionInput.val(''),
            $itemAddToInput.val(''),
            $itemAuthorizeSelect.val('')
        )
    });

    $upload.addClass( 'state-' + state );
    updateTotalProgress();



    //全选
    $selectAll.click(function() {
        $queue.find('> li').addClass('selected');
        updateLeftPanel();
        return !1
    });

    //反选
    $reverseSelected.click(function() {
        /*var $items = $queue.find('> li'),
            il = $items.length,
            i, $item;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            $item.hasClass('selected') ? $item.removeClass('selected') : $item.addClass('selected');
        }*/
        var $items = $queue.find('> li');
        $items.toggleClass('selected');
        updateLeftPanel();
        return !1
    });

    //删除选中项目
    $deleteSelected.click(function() {
        var $items = $queue.find('> li.selected'),
            il = $items.length,
            i, $item, id;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            id = $item.attr('id');
            uploader.removeFile(id);
        }
    });

    //todo: 添加选中项目到专辑
    $addSelectedTo.click(function() {
        var $items = $queue.find('> li.selected'),
            il = $items.length,
            i, $item, id;

        //同步到leftpart的输入框
        $itemAddToInput.val('todo: abumName');
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            id = $item.attr('id');
            extraData[id].albumName = 'todo: abumName';
            extraData[id].albumId = 'todo: abumId';
        }
    });


    //逆时针旋转选中项目
    $rotateSelectedI.click(function() {
        var $items = $queue.find('> li.selected'),
            il = $items.length,
            $wrap,
            i, $item, id, file, deg;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            $wrap = $item.find( 'p.imgWrap' );
            id = $item.attr('id');
            file = uploader.getFile(id);
            file.rotation -= 90;
            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
             
            }
        }
    });

    //顺时针旋转选中项目
    $rotateSelectedC.click(function() {
        var $items = $queue.find('> li.selected'),
            il = $items.length,
            $wrap,
            i, $item, id, file, deg;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            $wrap = $item.find( 'p.imgWrap' );
            id = $item.attr('id');
            file = uploader.getFile(id);
            file.rotation += 90;
            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
             
            }
        }
    });

    //监听 #upload-left 标题输入
    //标题可以为空，有可能用户想要去掉标题
    $itemTitleInput.on('keyup', function(event) {
        var $this = $(this),
            textValue = $.trim($this.val()),
            $selectedItems = $queue.find('> li.selected'),
            il = $selectedItems.length,
            /*textNotNull = textValue != '',*/
            i, id, $item;

        if (il === 0) return;
        for (i=0; i < il; i++) {
            $item = $($selectedItems[i]);
            id = $item.attr('id');
            $item.find('.name').val(textValue);
            /*if (textNotNull)*/ extraData[id].title = textValue;
        }
    });

    //监听 #upload-left 标签输入
    $itemTagsInput.on('keyup', function(event) {
        var $this = $(this),
            textValue = $.trim($this.val()),
            $selectedItems = $queue.find('> li.selected'),
            il = $selectedItems.length,
            textNotNull = textValue != '',
            i, id, $item;

        if (il === 0) return;
        for (i=0; i < il; i++) {
            $item = $($selectedItems[i]);
            id = $item.attr('id');
            if (textNotNull) extraData[id].tags = textValue;
        }
    });

    //监听 #upload-left 描述输入
    $itemDescriptionInput.on('keyup', function(event) {
        var $this = $(this),
            textValue = $.trim($this.val()),
            $selectedItems = $queue.find('> li.selected'),
            il = $selectedItems.length,
            textNotNull = textValue != '',
            i, id, $item;

        if (il === 0) return;
        for (i=0; i < il; i++) {
            $item = $($selectedItems[i]);
            id = $item.attr('id');
            if (textNotNull) extraData[id].description = textValue;
        }
    });

    //授权
    $itemAuthorizeSelect.on('change', function(event) {
        var $this = $(this),
            textValue = $.trim($this.val()),
            $selectedItems = $queue.find('> li.selected'),
            il = $selectedItems.length,
            //textNotNull = textValue != '',
            i, id, $item;

        if (il === 0) return;
        for (i=0; i < il; i++) {
            $item = $($selectedItems[i]);
            id = $item.attr('id');
            /*if (textNotNull)*/ extraData[id].authorization = textValue;
        }
    });

    //拖动排序
    $queue.sortable();

    //关闭页面是需要确认
    window.onbeforeunload = function() {
        var needConfirm = state === 'ready' || state === 'uploading' || state === 'paused';
        if (needConfirm) return '上传没有完成，确认退出吗?';
    };

    /*
    $(document.body).on('mousedown', 'input', function() {
        event.target != event.currentTarget && $('input').blur();
    });
    */

    //调试用，生产环境需移除
    window.uploader = uploader;
    window.extraData = extraData;
});