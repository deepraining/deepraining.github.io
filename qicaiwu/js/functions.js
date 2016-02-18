
/* 显示不支持IE的弹出框 */
function showNotSupportedForIe() {
    var htmlStr = [
        '<div id="ieNotSupportedWarningOverlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #333; opacity: .5; z-index: 10000;"></div>',
        '<div id="ieNotSupportedWarning" class="alert alert-warning alert-dismissible fade in" role="alert" style="position: fixed; top: 50%; left: 50%; width: 1000px; height: 106px; margin-left: -500px; margin-top: -53px; z-index: 10001;">',
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>',
            '<p>您使用的浏览器 Internet Explorer ' + app.browserSniff.version + ' 不支持该组件。</p>',
            '<p>如果您想继续使用 Internet Explorer 浏览器，请升级到 Internet Explorer 10 及以上版本。</p>',
            '<p>我们推荐使用 <a target="_blank" href="http://www.google.cn/chrome/browser/desktop/index.html">Chrome</a> 或者 <a target="_blank" href="http://www.firefox.com.cn/download/">Firefox</a> 浏览器，可以获得最佳的浏览体验。（如果链接打不开，请百度 chrome, firefox）</p>',
        '</div>'
    ];
    $('body').append(htmlStr.join(''));
    $('#ieNotSupportedWarning').on('closed.bs.alert', function () {
        $('#ieNotSupportedWarningOverlay').remove();
    })
}

/**
 * @param id int/array
 * @param int type 1: image, 2: album, 3: collection
 * @paam object options iPlayer init options
 *
 */
function play(id, type, options) {
    if (app.browserSniff.name === 'IE' && app.browserSniff.version < 10) {
        showNotSupportedForIe();
        return;
    }
    var items = [],
        multiple = !1,
        options = options || {},
        shareCodeId,
        i = 0,
        il = 10;//相同图片10个动画
    
    if (!type) type = 1;
    if ($.isArray(id)) {
        multiple = true;
        shareCodeId = id.join(',');
    }
    else shareCodeId = id;
    
    options.shareCode = 'http://www.qicaiwu.com/embed?id=' + encodeURIComponent(shareCodeId) + '&type=' + encodeURIComponent(type);
    $.getJSON(app.url.request_player_images, {
        type: type,
        id: id,
        multiple: multiple
    }, function(data) {
        //产品环境中使用这段代码
        /*if (type === 1 && !multiple) {
            for (; i < il; i++) {
                items[i] = data[0];
            }
        }
        else*/ items = data;
        player.play(items, options);
    });
}

/**
 * dialog
 */

function showDialog(content, title) {
    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-dialog').length === 0) {
            $('<div class="modal fade" id="modal-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-dialog-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-dialog-body">' +
                    '<div class="modal-inner-content"></div>' +
                  '</div>' +
                  '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-dialog').html(modalHtml);
        }
    }
    
    guaranteeModal();
    var $dialog = $('#modal-dialog'),
        $title = $('#modal-dialog-title'),
        $content = $('#modal-dialog-body').find('.modal-inner-content');

    /* 保证界面正常 */
    if (!title) {
        title = '&nbsp;';
    }
    $title.html(title);
    $content.html(content);
    $dialog.modal('show');
}

/**
 * 没有登录，则跳转至登录界面
 * 返回false, 阻止接下来的操作
 * if (requireLogin() === !1) return;
 */
function requireLogin() {
    var returnUrl = location.href;

    if (!app.user || !app.user.id) {
        location.href = 'http://www.qicaiwu.com/login?return=' + encodeURIComponent(returnUrl);
        return !1;
    }
}


/**
 * 收藏
 * @param id int/array
 * @param int type 1: image, 2: album, 3: collection
 */
function like(id, type, callback) {
    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-like').length === 0) {
            $('<div class="modal fade" id="modal-like" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-like-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-like-body">' +
                    '<div class="modal-inner-content"></div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-like-footer">' +
                    '<img id="modal-like-loading" src="./image/loading-32.gif" class="mgr10 visible-hidden">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-like-submit">确定</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-like').html(modalHtml);
        }
    }
    function handleRequest(data, id, type, multiple, callback) {

        var $like = $('#modal-like'),
            $title = $('#modal-like-title'),
            $body = $('#modal-like-body'),
            $content = $body.find('.modal-inner-content'),
            $submit = $('#modal-like-submit'),
            $loading = $('#modal-like-loading');

        var i, il;
            
        var title,
            content = '<h4>添加标签&nbsp;&nbsp;<span class="small">（多个标签用英文逗号,分隔）</span></h4>' +
            '<input type="text" class="form-control" id="modal-like-tags-input" value="">';

        /* 初始化，有可能上次出现错误未完成 */
        $submit.removeClass('disabled');
        $loading.addClass('visible-hidden');
        switch(type) {
            //image
            case 1: 
                title = '收藏图片';
                break;
            //album
            case 2: 
                title = '收藏专辑';
                break;
            case 3:
                title = '收藏精选集';
                break;
            /*case 4:
                title = '收藏画廊';
                break;*/
        }
        
        $title.html(title + ' - <span class="text-success">' + data.title + '</span>');

        if (data.myTags.length > 0) {
            content += '<h4 class="mgt20">我的标签</h4><p id="modal-like-my-tags">';
            for (i = 0, il = data.myTags.length; i < il; i++) {
                content += '<span class="tag">' + data.myTags[i] + '</span>';
            }
            content += '</p>';
        }
        if (data.recommendTags.length > 0) {
            content += '<h4>推荐标签</h4><p id="modal-like-recommend-tags">';
            for (i = 0, il = data.recommendTags.length; i < il; i++) {
                content += '<span class="tag">' + data.recommendTags[i] + '</span>';
            }
            content += '</p>';
        }
        $content.html(content);

        var $input = $('#modal-like-tags-input'),
            $tags = $content.find('.tag');

        //点击标签事件函数
        $tags.click(function(event) {
            var $this = $(this),
                inputValue = $.trim($input.val());
            if (inputValue === '') {
                $input.val($this.text());
            }
            else {
                $input.val(inputValue + ',' + $this.text());
            }
        });
        //提交事件
        $submit.click(function(event) {
            var inputValue = $.trim($input.val()),
                tags = inputValue.split(','),
                $this = $(this);

            if ($this.hasClass('disabled')) return;
            $this.addClass('disabled');
            $loading.removeClass('visible-hidden');
            $tags.off();
            $submit.off();
            $.getJSON(app.url.like_submit, {
                id: id,
                type: type, 
                multiple: true,
                tags: tags
            }, function(json){
                if (json.success) {
                    $loading.addClass('visible-hidden');
                    $this.removeClass('disabled');
                    $like.modal('hide');
                    callback();
                }
                else alert(data.msg);
            });
        });
        $like.modal('show');
    }

    if (requireLogin() === !1) return;
    
    guaranteeModal();
    if (!type) type = 1;
    var multiple = false;
    if ($.isArray(id)) multiple = true;

    $.getJSON(app.url.like_request, {
        id: id, 
        type: type, 
        multiple: multiple
    }, function(data){
        if (data.success) {
            handleRequest(data, id, type, multiple, callback);
        }
        else alert(data.msg);
        
    })
}





/**
 * 添加到精选集
 */
function addToCollection(id) {
    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-add-to-collection').length === 0) {
            $('<div class="modal fade" id="modal-add-to-collection" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-add-to-collection-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-add-to-collection-body">' +
                    '<div class="modal-inner-content">' +
                        '<ul class="nav nav-tabs" role="tablist">' +
                            '<li role="presentation" class="active"><a href="#modal-add-to-collection-select" aria-controls="modal-add-to-collection-select" role="tab" data-toggle="tab">选择精选集</a></li>' +
                            '<li role="presentation"><a href="#modal-add-to-collection-create" aria-controls="modal-add-to-collection-create" role="tab" data-toggle="tab">创建精选集</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div role="tabpanel" class="tab-pane active" id="modal-add-to-collection-select"></div>' +
                            '<div role="tabpanel" class="tab-pane" id="modal-add-to-collection-create">' +
                                '<h6>精选集名称</h6>' +
                                '<input type="text" class="form-control" id="modal-add-to-collection-create-title" value="">' +
                                '<p id="modal-add-to-collection-create-title-hint" class="fs13 mgt10 mgb10 text-warning" style="display: none;">标题不能为空</p>' +
                                '<h6>精选集描述</h6>' +
                                '<textarea class="form-control" id="modal-add-to-collection-create-description" rows="3" value=""></textarea>' +
                                '<p class="mgt20"><button type="button" class="btn btn-success btn-sm" id="modal-add-to-collection-create-submit">保存</button></p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-add-to-collection-footer">' +
                    '<img id="modal-add-to-collection-loading" src="./image/loading-32.gif" class="mgr10 visible-hidden">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-add-to-collection-submit">确定</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-add-to-collection').html(modalHtml);

            $('#modal-add-to-collection-create-title').focus(function() {
                $('#modal-add-to-collection-create-title-hint').hide();
            });

            //添加创建精选集事件监听
            $('#modal-add-to-collection-create-submit').click(function(event) {
                var $titleHint = $('#modal-add-to-collection-create-title-hint'),
                    title = $.trim($('#modal-add-to-collection-create-title').val()),
                    description = $.trim($('#modal-add-to-collection-create-description').val()),
                    content = '';
                if (title === '') {
                    $titleHint.html('标题不能为空').show();
                    return;
                }
                $.getJSON(app.url.add_to_collection_create, {
                    title: title,
                    description: description
                }, function(data) {
                    var $modalAddSelect = $('#modal-add-to-collection-select');
                    if ($modalAddSelect.length) $('#modal-add-to-collection-select').find('input').removeAttr('checked');
                    if (data.success) {
                        content += '<div class="radio pdl20 pdt5 pdb5 fs13 bdb-eeeeee"><label><input type="radio" name="selectCollection" id="selectCollectionId' + data.id + '" value="' + data.id + '" checked>' + data.title + '</label></div>';

                        $(content).prependTo($modalAddSelect);

                        $('[aria-controls="modal-add-to-collection-select"]').tab('show');
                    }
                    else alert(data.msg);
                });
                
            });

        }
    }
    
    function handle(data, id, multiple) {
        var $add = $('#modal-add-to-collection'),
            $title = $('#modal-add-to-collection-title'),
            $submit = $('#modal-add-to-collection-submit'),
            $select = $('#modal-add-to-collection-select'),
            $loading = $('#modal-add-to-collection-loading');

        var i, il, item,
            content = '';
        /* 初始化，有可能上次出现错误未完成 */
        $submit.removeClass('disabled');
        $loading.addClass('visible-hidden');

        $title.html('添加图片 - <a class="text-success" href="#">' + data.title + '</a> - 到精选集');

        if (data.collections.length > 0) {
            for (i = 0, il = data.collections.length; i < il; i++) {
                item = data.collections[i];
                content += '<div class="radio pdl20 pdt5 pdb5 fs13 bdb-eeeeee"><label><input type="radio" name="selectCollection" id="selectCollectionId' + item.id + '" value="' + item.id + '" ';
                if (i === 0) content += 'checked>';
                else content += '>';
                content += item.title + '</label></div>';
            }
        }
        
        $select.html(content);


        $submit.click(function(event) {
            var $this = $(this),
                collectionId = $('input[name="selectCollection"]:checked').val();

            if ($this.hasClass('disabled')) return;
            $this.addClass('disabled');
            $loading.removeClass('visible-hidden');
            $submit.off();
            $.getJSON(app.url.add_to_collection_submit, {
                id: id,
                collectionId: collectionId
            }, function(json){
                if (json.success) {
                    $this.removeClass('disabled');
                    $loading.addClass('visible-hidden');
                    $add.modal('hide');
                }
                else alert(data.msg);
            });
        });
        
        $add.modal('show');
    }
    
    if (requireLogin() === !1) return;

    guaranteeModal();
    
    var multiple = false;
    if ($.isArray(id)) multiple = true;

    $.getJSON(app.url.add_to_collection_request, {
        id: id,
        multiple: multiple
    }, function(data){
        handle(data, id, multiple);
    })
}





/**
 * 添加到专辑
 */
function addToAlbum(id) {
    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-add-to-album').length === 0) {
            $('<div class="modal fade" id="modal-add-to-album" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-add-to-album-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-add-to-album-body">' +
                    '<div class="modal-inner-content">' +
                        '<ul class="nav nav-tabs" role="tablist">' +
                            '<li role="presentation" class="active"><a href="#modal-add-to-album-select" aria-controls="modal-add-to-album-select" role="tab" data-toggle="tab">选择专辑</a></li>' +
                            '<li role="presentation"><a href="#modal-add-to-album-create" aria-controls="modal-add-to-album-create" role="tab" data-toggle="tab">创建精选集</a></li>' +
                        '</ul>' +
                        '<div class="tab-content">' +
                            '<div role="tabpanel" class="tab-pane active" id="modal-add-to-album-select"></div>' +
                            '<div role="tabpanel" class="tab-pane" id="modal-add-to-album-create">' +
                                '<h6>专辑名称</h6>' +
                                '<input type="text" class="form-control" id="modal-add-to-album-create-title" value="">' +
                                '<p id="modal-add-to-album-create-title-hint" class="fs13 mgt10 mgb10 text-warning" style="display: none;">标题不能为空</p>' +
                                '<h6>专辑描述</h6>' +
                                '<textarea class="form-control" id="modal-add-to-album-create-description" rows="3" value=""></textarea>' +
                                '<p class="mgt20"><button type="button" class="btn btn-success btn-sm" id="modal-add-to-album-create-submit">保存</button></p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-add-to-album-footer">' +
                    '<img id="modal-add-to-album-loading" src="./image/loading-32.gif" class="mgr10 visible-hidden">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-add-to-album-submit">确定</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-add-to-album').html(modalHtml);

            $('#modal-add-to-album-create-title').focus(function() {
                $('#modal-add-to-album-create-title-hint').hide();
            });

            //添加创建精选集事件监听
            $('#modal-add-to-album-create-submit').click(function(event) {
                var $titleHint = $('#modal-add-to-album-create-title-hint'),
                    title = $.trim($('#modal-add-to-album-create-title').val()),
                    description = $.trim($('#modal-add-to-album-create-description').val()),
                    content = '';
                if (title === '') {
                    $titleHint.html('标题不能为空').show();
                    return;
                }
                $.getJSON(app.url.add_to_album_create, {
                    title: title,
                    description: description
                }, function(data) {
                    var $modalAddSelect = $('#modal-add-to-album-select');
                    if ($modalAddSelect.length) $('#modal-add-to-album-select').find('input').removeAttr('checked');
                    if (data.success) {
                        content += '<div class="radio pdl20 pdt5 pdb5 fs13 bdb-eeeeee"><label><input type="radio" name="selectAlbum" id="selectAlbumId' + data.id + '" value="' + data.id + '" checked>' + data.title + '</label></div>';

                        $(content).prependTo($modalAddSelect);

                        $('[aria-controls="modal-add-to-album-select"]').tab('show');
                    }
                    else alert(data.msg);
                });
                
            });

        }
    }

    function handle(data, id, multiple) {
        var $add = $('#modal-add-to-album'),
            $title = $('#modal-add-to-album-title'),
            $submit = $('#modal-add-to-album-submit'),
            $select = $('#modal-add-to-album-select'),
            $loading = $('#modal-add-to-album-loading');

        var i, il, item,
            content = '';
        /* 初始化，有可能上次出现错误未完成 */
        $submit.removeClass('disabled');
        $loading.addClass('visible-hidden');

        $title.html('添加图片 - <a class="text-success" href="#">' + data.title + '</a> - 到专辑');

        if (data.albums.length > 0) {
            for (i = 0, il = data.albums.length; i < il; i++) {
                item = data.albums[i];
                content += '<div class="radio pdl20 pdt5 pdb5 fs13 bdb-eeeeee"><label><input type="radio" name="selectAlbum" id="selectAlbumId' + item.id + '" value="' + item.id + '" ';
                if (i === 0) content += 'checked>';
                else content += '>';
                content += item.title + '</label></div>';
            }
        }
        
        $select.html(content);


        $submit.click(function(event) {
            var $this = $(this),
                albumId = $('input[name="selectAlbum"]:checked').val();

            if ($this.hasClass('disabled')) return;
            $this.addClass('disabled');
            $loading.removeClass('visible-hidden');
            $submit.off();
            $.getJSON(app.url.add_to_album_submit, {
                id: id,
                albumId: albumId
            }, function(json){
                if (json.success) {
                    $this.removeClass('disabled');
                    $loading.addClass('visible-hidden');
                    $add.modal('hide');
                }
                else alert(data.msg);
            });
        });
        
        $add.modal('show');
    }

    
    if (requireLogin() === !1) return;
    
    guaranteeModal();
    
    var multiple = false;
    if ($.isArray(id)) multiple = true;

    $.getJSON(app.url.add_to_album_request, {
        id: id,
        multiple: multiple
    }, function(data){
        handle(data, id, multiple);
    })
}





/**
 * 添加到画廊
 * @param type int/array 1: image, 2: album
 */
function addToGallery(id, type) {
    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-add-to-gallery').length === 0) {
            $('<div class="modal fade" id="modal-add-to-gallery" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-add-to-gallery-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-add-to-gallery-body">' +
                    '<div class="modal-inner-content" id="modal-add-to-gallery-select"></div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-add-to-gallery-footer">' +
                    '<img id="modal-add-to-gallery-loading" src="./image/loading-32.gif" class="mgr10 visible-hidden">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-add-to-gallery-submit">确定</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-add-to-gallery').html(modalHtml);

        }
    }
  
    function handle(data, id, multiple) {
        var $add = $('#modal-add-to-gallery'),
            $title = $('#modal-add-to-gallery-title'),
            $submit = $('#modal-add-to-gallery-submit'),
            $select = $('#modal-add-to-gallery-select'),
            $loading = $('#modal-add-to-gallery-loading');

        var i, il, item,
            content = '';
        /* 初始化，有可能上次出现错误未完成 */
        $submit.removeClass('disabled');
        $loading.addClass('visible-hidden');

        $title.html('添加图片 - <a class="text-success" href="#">' + data.title + '</a> - 到画廊');

        if (data.galleries.length > 0) {
            for (i = 0, il = data.galleries.length; i < il; i++) {
                item = data.galleries[i];
                content += '<div class="radio pdl20 pdt5 pdb5 fs13 bdb-eeeeee"><label><input type="radio" name="selectGallery" id="selectGalleryId' + item.id + '" value="' + item.id + '" ';
                if (i === 0) content += 'checked>';
                else content += '>';
                content += item.title + '</label></div>';
            }
        }
        
        $select.html(content);


        $submit.click(function(event) {
            var $this = $(this),
                galleryId = $('input[name="selectGallery"]:checked').val();

            if ($this.hasClass('disabled')) return;
            $this.addClass('disabled');
            $loading.removeClass('visible-hidden');
            $submit.off();
            $.getJSON(app.url.add_to_gallery_submit, {
                id: id,
                galleryId: galleryId
            }, function(json){
                if (json.success) {
                    $this.removeClass('disabled');
                    $loading.addClass('visible-hidden');
                    $add.modal('hide');
                }
                else alert(data.msg);
            });
        });
        
        $add.modal('show');
    }  
    
    if (requireLogin() === !1) return;

    guaranteeModal();
    
    var multiple = false;
    if ($.isArray(id)) multiple = true;

    $.getJSON(app.url.add_to_gallery_request, {
        id: id,
        type: type,
        multiple: multiple
    }, function(data){
        handle(data, id, multiple);
    })
}




/**
 * 显示我的标签，不需要隐藏，会导向另一个页面
 */
function showTags(type) {

    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-tags').length === 0) {
            $('<div class="modal fade" id="modal-tags" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-tags-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-tags-body">' +
                    '<div class="modal-inner-content"></div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-like-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-tags').html(modalHtml);
        }
    }
    
    if (requireLogin() === !1) return;

    guaranteeModal();
    var $tags = $('#modal-tags'),
        $title = $('#modal-tags-title'),
        $body = $('#modal-tags-body'),
        $content = $body.find('.modal-inner-content');

    if ($content.html() != '') {
        $tags.modal('show');
        return;
    }
    $.getJSON(app.url.return_my_tags, function(data){
        var i, il,
            content = '',
            tempContent = '';

        $title.html('我的标签');

        if (data.length > 0) {
            for (i = 0, il = data.length; i < il; i++) {
                tempContent = '<a class="tag" href="' + data[i].url + '">'+ data[i].tagName + '</a>';
                content += tempContent;
            }
        }
        
        $content.html(content);

        
        $tags.modal('show');
    })
}




/**
 * 举报 
 * @param type int 
 * 1: 图片, 2: 专辑, 3: 精选集, 4: 画廊, 5:用户
 * 6: 图片评论, 7: 专辑评论, 8: 精选集评论, 9: 画廊留言, 10: 用户留言
 * 11: 小组, 12: 话题, 13: 话题回复
 */
function report(id, type) {

    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-report').length === 0) {
            $('<div class="modal fade" id="modal-report" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-report-title">举报评论</h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-report-body">' +
                    '<div class="modal-add-content">' +
                        '<textarea class="form-control" rows="3" id="modal-report-input"></textarea>' +
                    '</div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-report-footer">' +
                    '<img id="modal-report-loading" src="./image/loading-32.gif" class="mgr10 visible-hidden">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-report-submit">确定</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
            $('#modal-report').html(modalHtml);
        }
    }
    
    if (requireLogin() === !1) return;

    guaranteeModal();
    var $report = $('#modal-report'),
        $input = $('#modal-report-input'),
        $submit = $('#modal-report-submit'),
        $loading = $('#modal-report-loading');
    /* 初始化，有可能上次出现错误未完成 */
    $submit.removeClass('disabled');
    $loading.addClass('visible-hidden');
    $input.val('');

    $submit.click(function(event) {
        var $this = $(this),
            reportText = $input.val();
        if ($this.hasClass('disabled')) return;
        $this.addClass('disabled');
        $loading.removeClass('visible-hidden');
        $submit.off();
        $.getJSON(app.url.report, {
            id: id,
            type: type,
            text: reportText
        }, function(data) {
            if (data.success) {
                $this.removeClass('disabled');
                $loading.addClass('visible-hidden');
                $input.val('');
                $report.modal('hide');
            }
            else alert(data.msg);
        });
    });
    $report.modal('show');
}

/**
 * 编辑标签
 * @param id int/array
 * @param int type 1: image, 2: album, 3: collection
 */
function editTag(id, type) {
    function guaranteeModal() {
        var modalHtml = '';
        if ($('#modal-edit-tag').length === 0) {
            $('<div class="modal fade" id="modal-edit-tag" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-edit-tag-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-edit-tag-body">' +
                    '<div class="modal-inner-content"></div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-edit-tag-footer">' +
                    '<img id="modal-edit-tag-loading" src="./image/loading-32.gif" class="mgr10 visible-hidden">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-edit-tag-submit">确定</button>' +
                  '</div>' +
                '</div>' +
                '</div>';
              $('#modal-edit-tag').html(modalHtml);
        }
    }
    function handleRequest(data, id, type, multiple) {

        var $editTag = $('#modal-edit-tag'),
            $title = $('#modal-edit-tag-title'),
            $body = $('#modal-edit-tag-body'),
            $content = $body.find('.modal-inner-content'),
            $submit = $('#modal-edit-tag-submit'),
            $loading = $('#modal-edit-tag-loading');

        var i, il;
            
        var title,
            content = '<h4>' + (multiple ? '添加' : '编辑') + '标签&nbsp;&nbsp;<span class="small">（多个标签用英文逗号,分隔）</span></h4>' +
            '<input type="text" class="form-control" id="modal-edit-tag-tags-input" value="' + (data.originTags.length ? data.originTags.join(',') : '') + '">';

        /* 初始化，有可能上次出现错误未完成 */
        $submit.removeClass('disabled');
        $loading.addClass('visible-hidden');
        
        switch(type) {
            //image
            case 1: 
                title = '图片';
                break;
            //album
            case 2: 
                title = '专辑';
                break;
            case 3:
                title = '精选集';
                break;
            case 4:
                title = '画廊';
                break;
            case 5:
                title = '用户';
                break;
        }
        
        $title.html('编辑' + title + ' - <span class="text-success">' + data.title + '</span> - 标签');

        if (data.myTags.length > 0) {
            content += '<h4 class="mgt20">我的标签</h4><p id="modal-edit-tag-my-tags">';
            for (i = 0, il = data.myTags.length; i < il; i++) {
                content += '<span class="tag">' + data.myTags[i] + '</span>';
            }
            content += '</p>';
        }
        if (data.recommendTags.length > 0) {
            content += '<h4>推荐标签</h4><p id="modal-edit-tag-recommend-tags">';
            for (i = 0, il = data.recommendTags.length; i < il; i++) {
                content += '<span class="tag">' + data.recommendTags[i] + '</span>';
            }
            content += '</p>';
        }
        $content.html(content);

        var $input = $('#modal-edit-tag-tags-input'),
            $tags = $content.find('.tag');

        //点击标签事件函数
        $tags.click(function(event) {
            var $this = $(this),
                inputValue = $.trim($input.val());
            if (inputValue === '') {
                $input.val($this.text());
            }
            else {
                $input.val(inputValue + ',' + $this.text());
            }
        });
        //提交事件
        $submit.click(function(event) {
            var inputValue = $.trim($input.val()),
                tags = inputValue.split(','),
                $this = $(this);

            if ($this.hasClass('disabled')) return;
            $this.addClass('disabled');
            $loading.removeClass('visible-hidden');
            $tags.off();
            $submit.off();
            $.getJSON(app.url.edit_tag_submit, {
                id: id,
                type: type, 
                multiple: true,
                tags: tags
            }, function(json){
                if (json.success) {
                    $loading.addClass('visible-hidden');
                    $this.removeClass('disabled');
                    $editTag.modal('hide');
                }
                else alert(data.msg);
            });
        });
        $editTag.modal('show');
    }

    if (requireLogin() === !1) return;
    
    guaranteeModal();
    if (!type) type = 1;
    var multiple = false;
    if ($.isArray(id)) multiple = true;

    $.getJSON(app.url.edit_tag_request, {
        id: id, 
        type: type, 
        multiple: multiple
    }, function(data){
        if (data.success) {
            handleRequest(data, id, type, multiple);
        }
        else alert(data.msg);
        
    })
}


//格式化分页
function formatPagination(currentPage, totalPages) {
    var ret = '<ul class="pagination">', 
        i, end,
        prevPage = currentPage - 1,
        nextPage = currentPage + 1;
    if (totalPages <= 10) {
        for (i = 1; i<= totalPages; i++) {
            if (i != currentPage) {
                ret += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
            }
            else {
                ret += '<li class="active"><a data-page="' + i + '">' + i + '</a></li>';
            }
        }
        
    }
    else if (currentPage <= 8) {
        for (i = 1; i<= 8; i++) {
            if (i != currentPage) {
                ret += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
            }
            else {
                ret += '<li class="active"><a data-page="' + i + '">' + i + '</a></li>';
            }
        }
        ret += '<li class="disabled"><a>...</a></li>';
        ret += '<li><a href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
        ret += '<li><a href="#" data-page="' + nextPage + '">下一页</a></li>';
    }
    else if (currentPage >= totalPages - 7) {
        ret += '<li><a href="#" data-page="' + prevPage + '">上一页</a></li>';
        ret += '<li><a href="#" data-page="1">1</a></li>';
        ret += '<li class="disabled"><a>...</a></li>';
        for (i = totalPages - 7; i<= totalPages; i++) {
            if (i != currentPage) {
                ret += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
            }
            else {
                ret += '<li class="active"><a data-page="' + i + '">' + i + '</a></li>';
            }
        }
    }
    else {
        ret += '<li><a href="#" data-page="' + prevPage + '">上一页</a></li>';
        ret += '<li><a href="#" data-page="1">1</a></li>';
        ret += '<li class="disabled"><a>...</a></li>';
        for (i = currentPage - 2, end = currentPage + 2; i<= end; i++) {
            if (i != currentPage) {
                ret += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
            }
            else {
                ret += '<li class="active"><a data-page="' + i + '">' + i + '</a></li>';
            }
        }
        ret += '<li class="disabled"><a>...</a></li>';
        ret += '<li><a href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
        ret += '<li><a href="#" data-page="' + nextPage + '">下一页</a></li>';
    }
    ret += '</ul>';

    return ret;
}


function getRandomColor() {
    function randomColor() {
        return Math.floor(Math.random() * 256);
    }
    var maxValue = 204,/* cc */
        r = randomColor(),
        g = randomColor(),
        b = randomColor();
    if (r > maxValue && b > maxValue && b > maxValue) {
        return getRandomColor();
    }
    return [r,g,b].join(',');
};

