
$(function(){
    /* 点击回到顶部 */
    $('#right-bottom-part .to-top').click(function(e) {
        e.preventDefault();
        var temp = setInterval(function() {
            $(window).scrollTop(Math.floor($(window).scrollTop()*0.2));
            if ($(window).scrollTop()==0) {
                clearInterval(temp);
            }
        }, 10);
    });

    /* show not supported for IE in upon header section */
    var htmlStr;
    if (app.browserSniff.name === 'IE' && app.browserSniff.version < 10 && !~document.referrer.indexOf('qicaiwu.com')) {
        htmlStr = [
            '<div class="alert alert-warning alert-dismissible fade in" role="alert" style="margin-bottom: 0;">',
            '<div style="width: 1000px; margin: 0 auto;">',
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>',
                '<p>您使用的浏览器 Internet Explorer ' + app.browserSniff.version + ' 不支持我们的核心组件和功能，并且可能发生页面混乱和未知错误。</p>',
                '<p>如果您想继续使用 Internet Explorer 浏览器，请升级到 Internet Explorer 10 及以上版本。</p>',
                '<p>我们推荐使用 <a href="http://www.google.cn/chrome/browser/desktop/index.html">Chrome</a> 或者 <a href="http://www.firefox.com.cn/download/">Firefox</a> 浏览器，可以获得最佳的浏览体验。（如果链接打不开，请百度 chrome, firefox）</p>',
            '</div>',
            '</div>'
        ];
        $('body').prepend(htmlStr.join(''));
    }

    //实例化一个 namecrad 原型对象
    (new app.NameCard()).init({
        triggerType : 'data-name-card'
    });

    //全部播放按钮
    $('#js-play-all-images').click(function(event) {
        var $items = $('.image-cell'),
            ids = [], 
            i = 0, il = $items.length;
        if (il === 0) return;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        play(ids, 1);
    });

    //images intense
    $(document).on('click', '.intense-image', function(event){
        if (app.browserSniff.name === 'IE' && app.browserSniff.version < 10) {
            showNotSupportedForIe();
            return;
        }
        Intense(event.target)
    });

    //监听收藏按钮
    $(document).on('click', '[data-action="like"]', function(event) {
        var $this = $(this),
            $icon = $this.hasClass('.icon-like') ? $this : $this.find('.icon-like'), /* 图标，可以是子级 */
            $text = $this.find('span'), /* 说明文字，必须是子级 */
            type = parseInt($this.attr('data-type')),    /* 1: image, 2: album, 3: collection, 5: tag */
            id = parseInt($this.attr('data-id')),
            result = parseInt($this.attr('data-result')); /* 0: 未收藏, 1: 已收藏 */

        //未收藏(tag 没有弹出框)
        if (!result && type === 5) {
            $.getJSON(app.url.like_submit, {
                id: id,
                type: type, 
            }, function(json){
                if (json.success) {
                    $this.attr({'title': '取消收藏', 'data-result': 1});
                    $icon.addClass('active');
                    $text.text('已收藏');
                }
            });
            return !1;
        } 
        else if (!result) {
            like(id, type, function() {
                $this.attr({'title': '取消收藏', 'data-result': 1});
                $icon.addClass('active');
                $text.text('已收藏');
            });
            return !1;
        }

        //已收藏
        $.getJSON(app.url.unlike, {
            id: id,
            type: type,
            multiple: !1
        }, function(data) {
            if (data.success) {
                $this.attr({'title': '收藏', 'data-result': 0});
                $icon.removeClass('active');
                $text.text('收藏');
            }
            else alert(data.msg);
        });
    });

    //监听 waterfall 中单个项目的删除按钮
    $(document).on('click', '[data-action="delete"]', function(event) {
        var $this = $(this),
            type = parseInt($this.attr('data-type')),    /* 1: image, 2: album, 3: collection */
            id = parseInt($this.attr('data-id')),
            waterfallTypeId = parseInt($this.attr('data-waterfall')), /* image(1: vertical, 2: horizontal, 3: block, 4: panel, 5: list), album,collection(1: list, 2: block) */
            typeText, waterfallType, cssType;

        switch (type) {
            case 1:
                typeText = 'image';
                cssType = '.image-cell';
                if (waterfallTypeId === 1) {
                    waterfallType = '';
                }
                else if (waterfallTypeId === 2) {
                    waterfallType = '_horizontal';
                }
                else if (waterfallTypeId === 3) {
                    waterfallType = '_block';
                }
                else if (waterfallTypeId === 4) {
                    waterfallType = '_panel';
                }
                else if (waterfallTypeId === 5) {
                    waterfallType = '_list';
                }
                break;
            case 2:
                typeText = 'album';
                if (waterfallTypeId === 1) {
                    waterfallType = '_list';
                    cssType = '.album-cell-list';
                }
                else if (waterfallTypeId === 2) {
                    waterfallType = '_block';
                    cssType = '.album-cell';
                }
                break;
            case 3:
                typeText = 'collection';
                if (waterfallTypeId === 1) {
                    waterfallType = '_list';
                    cssType = '.collection-cell-list';
                }
                else if (waterfallTypeId === 2) {
                    waterfallType = '_block';
                    cssType = '.collection-cell'
                }
                break;
        
        }

        $.getJSON(app.url.delete, {
            type: type,
            id: id
        }, function(data) {
            if (data.success) {
                $('#waterfall')['waterfall' + waterfallType]('removeItems', cssType + '[data-id="' + id + '"]');
            }    
        });
    });

    //监听关注按钮
    $(document).on('click', '[data-action="follow"]', function(event) {
        var $this = $(this),
            $icon = $this.find('.icon'), /* 图标，可以是子级 */
            $text = $this.find('span'), /* 说明文字，必须是子级 */
            id = parseInt($this.attr('data-id')),
            type = parseInt($this.attr('data-type')),/* 1: user, 2: gallery */
            result = parseInt($this.attr('data-result')); /* 0: 未关注, 1: 已关注 */

        if ($this.hasClass('disabled')) return !1;
        $this.addClass('disabled');
        
        /* 默认为用户 */
        if (!type) type = 1;

        if (!result) {
            $.getJSON(app.url.follow, {
                id: id,
                type: type
            }, function(data) {
                $this.removeClass('disabled');
                if (data.success) {
                    $this.attr({'title': '取消关注', "data-result": 1});
                    $icon.removeClass('icon-follow-small').addClass('icon-followed-small');
                    $text.text('已关注');
                }
                else alert(data.msg);
            })
        }
        else {
            $.getJSON(app.url.unfollow, {
                id: id,
                type: type
            }, function(data) {
                $this.removeClass('disabled');
                if (data.success) {
                    $this.attr({'title': '关注', "data-result": 0});
                    $icon.removeClass('icon-followed-small').addClass('icon-follow-small');
                    $text.text('关注');
                }
                else alert(data.msg);
            })
        }
       
    });

    //监听下载按钮
    $(document).on('click', '[data-action="download"]', function(event) {
        var $this = $(this),
            id = parseInt($this.attr('data-id')),
            type = parseInt($this.attr('data-type')),
            requested = parseInt($this.attr('data-requested'));
        if (requested) return;
        $.getJSON(app.url.download, {
            id: id,
            type: type
        }, function(data) {
            var i = 0, il = data.length,
                item, content = '';
            for (; i < il; i++) {
                item = data[i];
                content += '<p><a href="' + item.url + '">' + item.title + '</a></p>';
            }
            $this.popover({
                content: content,
                placement: 'top',
                html: true
            }).popover('show');
            $this.attr('data-requested', 1);
        });
    });

    //瀑布流切换到分页(layout参数表明 waterfall,pagination)
    $('#change-to-pagination').click(function(event) {
        var href = location.href,
            index;

        //去除锚链接部分
        if (~(index = href.indexOf('#'))) {
            href = href.slice(0,index);
        }
        
        //没有问号
        if (!~href.indexOf('?')) {
            location.href = href + '?layout=pagination&page=1';
            return !1;
        }
        //有问号，但没有layout参数
        else if (!~href.indexOf('layout')) {
            location.href = href + '&layout=pagination&page=1';
            return !1;
        }
        //有问号，也有layout参数
        else {
            location.href = href.replace('layout=waterfall', 'layout=pagination&page=1');
            return !1;
        }
    });

    //分页切换到瀑布流
    /* js中delete数组的元素不影响数组的length属性，哪怕删除到没有元素，length也不会改变，怪异的地方之一 */
    $('#change-to-waterfall').click(function(event) {
        var href = location.href,
            index, search,
            searchArray,
            i = 0, il,
            arr, newArray = [];
        
        //去除锚链接部分
        if (~(index = href.indexOf('#'))) {
            href = href.slice(0,index);
        }

        index = href.indexOf('?');
        search = href.slice(index + 1);
        href = href.slice(0, index);
        searchArray = search.split('&');
        il = searchArray.length;

        for (; i < il; i++) {
            arr = searchArray[i].split('=');
            if (arr[0] != 'layout' && arr[0] != 'page') newArray.push(searchArray[i]);
        }
        if (newArray.length <= 0) {
            location.href = href;
            return !1;
        }
        else {
            location.href = href + '?' + newArray.join('&');
            return !1;
        }
    });
});

/* common header */
$(function() {

    var $header = $('#header'),
        $searchForm = $('#header-search-form'),
        $searchKeyword = $('#header-search-keyword'),
        $searchHint = $('#header-search-hint'),
        $searchHintContainer = $('#header-search-hint-container');

    /* 如果输入框等于placeholder，或者去掉两端空格后等于空字符，不提交表单 */
    $searchForm.submit(function() {
        var queryValue = $searchKeyword.val();
        if ($.trim(queryValue) == '') return false;
    });
    


    /* search auto complete */
    var result_count = 0,//返回的结果数
        current_index = -1,//当前索引
        query_string = '',//当前查询字符串(去除了两遍的空白)
        last_query_string = '';//上次查询的字符串

    function renderSearchHint(json) {
        var htmlString = '', 
            i, il, item;
        
        current_index = -1;
        //为空则不进行任何操作
        if (json.length !== 0) {
            il = result_count = json.length;
            for (i = 0; i < il; i++) {
                item = json[i];
                htmlString += '<li><a href="' + item.src + '">' + item.text + '</a></li>';
            }
            $searchHintContainer.html(htmlString);
        }
    }
    $searchKeyword.on('input propertychange', function() {
        var self = $(this);
        query_string = $.trim(self.val());
        if ( query_string && query_string != last_query_string) {
            last_query_string = query_string;
            $.ajax({
                url: app.url.header_search_hint,
                data: {'key':query_string},
                cache: false,
                //data: json [obj{text, src}, obj, ...]
                success: function(json) {
                    renderSearchHint(json);
                    $searchHint.show();
                }
            });
        }
        else {
            $searchHint.hide();
        }
    });

    $searchKeyword.keydown(function(e) {
        var $li = $searchHintContainer.find('> li');
        
        // esc
        if (e.keyCode==27) {
            $searchHint.hide();
        }

        // enter
        if (e.keyCode==13) {
            if (current_index>=0) {
                var href = $($li[current_index]).find('> a').attr('href');
                window.location = href;
                return false;
            }
            else {
                return true;
            }
        }

        // down arrow
        if (e.keyCode==40) {
            if ($li.length<1) {
                return false;
            }
            if (current_index>=result_count-1) {
                current_index = -1;
            }
            $li.removeClass('selected');
            $($li[++current_index]).addClass('selected');
        }

        // up arrow
        if (e.keyCode==38) {
            if ($li.length<1) {
                return false;
            }
            if (current_index<=0) {
                current_index = result_count;
            }
            $li.removeClass('selected');
            $($li[--current_index]).addClass('selected');
        }
    });
    /**/

    /* notify popup */

    var $notifyPopup = $('#notify-popup'),
        $notifyPopupContainer = $('#notify-popup-container'),
        $notifyPopupInner = $('#notify-popup-inner-content'),
        $notifyPopupLoading = $('#notify-popup-loading'),
        $headerUser = $('#header-account'),
        $message = $headerUser.find('.header-message'),
        notifyRequested = !1;//是否请求过

    //data: json
    function renderNotifyPopup(data) {
        var content = '', i = 0, il = data.length, item;
        if (il <= 0) {
            content += '<div class="none">目前还没有消息</div>';
        } else {
            for (; i < il; i++) {
                item = data[i];
                content += '<li class="' + (item.read ? 'read':'') + '">' + item.msg + (item.read ? '':'<div class="icon"></div>') + '</li>';
            }
        }
        $notifyPopupInner.html(content);
        notifyRequested = true;

        //console.log('ok');

        var scrollBarHideDelay;
        $notifyPopup.find('.scroll-pane').jScrollPane({
            mouseWheelSpeed: 20,
            showArrows: true,
            hideFocus: true
        }).bind('jsp-scroll-y', function() {
            clearTimeout(scrollBarHideDelay);
            $('.jspDrag').show();
            if ($('.jspTrack').css('background-color')=='transparent') {
                scrollBarHideDelay = setTimeout(function() {
                    $('.jspDrag').fadeOut();
                }, 1000);
            }
        }).mousewheel(function(e) {
            e.preventDefault();
        });

        $('.jspTrack').mouseenter(function() {
            clearTimeout(scrollBarHideDelay);
            $('.jspDrag').show();
        }).mouseleave(function() {
            scrollBarHideDelay = setTimeout(function() {
                $('.jspDrag').fadeOut();
            }, 1000);
        }).click(function(e) {
            e.stopPropagation();
        });
    }
    
    function closeNotifyPopup() {
        if ($('#notify-popup:hidden').length) return;
        $notifyPopup.hide();
        $message.find('.num').remove();
        $notifyPopup.find('.content-block li').addClass('read');
        
    }

    //点击通知图标
    $message.click(function(e) {
        e.stopPropagation();
        $searchHint.hide();//隐藏搜索提示
        
        //notify-popup未显示
        if ($('#notify-popup:hidden').length) {
            if (!notifyRequested) {
                $.ajax({
                    url: app.url.header_notify,
                    cache: false,
                    success: function(data) {
                        $notifyPopupLoading.remove();
                        $notifyPopupContainer.show();
                        renderNotifyPopup(data);
                    }
                });
            }
            $notifyPopup.show();
        }
        //notify-popup已显示，点击关闭
        else {
            closeNotifyPopup();
        }

    });

    $notifyPopup.click(function(e) {
        e.stopPropagation();
        //console.log(e.target);
        if (e.target.tagName=='P' || e.target.tagName=='A') {
            $(e.target).parentsUntil('ul', 'li').addClass('read');
        }
    });
    /**/

    /* 鼠标进入 .user-nav, #footer-brief 隐藏消息弹出框 */

    $header.on('mouseenter', '.header-user, .footer-brief', function(e) {
        closeNotifyPopup();
    })

    /* body click */
    //跟$('#header-user').on('click')完全一样
    $('body').click(function() {
        closeNotifyPopup();
        $searchHint.hide();
    });

});


/* 图片批处理操作 */
$(function() {
    var $waterfall = $('#waterfall'),
        $batch = $('#images-action-batch'),
        $batchDetail = $('#images-action-batch-detail'),
        $batchManage = $('#images-batch-manage'),
        $selectAll = $('#images-select-all'),
        $reverseSelected = $('#images-reverse-selected'),
        $playSelected = $('#images-play-selected'),
        $likeSelected = $('#images-like-selected'),
        $addSelectedTo = $('#images-add-selected-to'),
        $addSelectedToAlbum = $('#images-add-selected-to-album'),
        $addSelectedToGallery = $('#images-add-selected-to-gallery'),
        $addTag = $('#images-add-tag'),
        $deleteSelected = $('#images-delete-selected'),
        $complete = $('#images-batch-complete');

    //点击进行批量处理
    $batchManage.click(function(event) {
        var $cells = $('.image-cell');
        $cells.addClass('only-with-select');
        //使用代理，后添加的也能有效
        $waterfall.on('click', '.image-cell', function(e) {
            $(this).toggleClass('selected');
        });
        //解决瀑布流后面加载的无法添加 only-with-select 类，并重写 waterfall options.callbacks.renderData 方法
        window.imagesActionBatchProccessing = true;
        $batch.hide();
        $batchDetail.show();
    });
    //点击取消批量处理
    $complete.click(function(event) {
        var $cells = $('.image-cell');
        $cells.removeClass('only-with-select selected');
        $waterfall.off('click', '.image-cell');
        window.imagesActionBatchProccessing = !1;
        $batch.show();
        $batchDetail.hide();
    });
    //全选
    $selectAll.click(function() {
        $('.image-cell.only-with-select').addClass('selected');
    });
    //反选
    $reverseSelected.click(function() {
        $('.image-cell.only-with-select').toggleClass('selected');
    });
    //全屏浏览
    $playSelected.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        play(ids);
    });
    //收藏
    $likeSelected.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        like(ids);
    });
    //添加到精选集
    $addSelectedTo.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        addToCollection(ids);
    });
    //添加到专辑
    $addSelectedToAlbum.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        addToAlbum(ids);
    });
    //添加到画廊
    $addSelectedToGallery.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        addToGallery(ids);
    });
    //添加标签
    $addTag.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        editTag(ids, 1);
    });
    //删除 todo: ajax
    $deleteSelected.click(function() {
        var $this = $(this),
            typeId = parseInt($this.attr('data-waterfall')),
            $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-id')));
        }
        //todo: ajax

        //依赖按钮的data-waterfall属性
        if (typeId === 1) $waterfall.waterfall('removeItems', '.image-cell.selected');
        else if (typeId === 2) $waterfall.waterfall_horizontal('removeItems', '.image-cell.selected');
        else if (typeId === 3) $waterfall.waterfall_block('removeItems', '.image-cell.selected');
        else if (typeId === 4) $waterfall.waterfall_panel('removeItems', '.image-cell.selected');
        else if (typeId === 5) $waterfall.waterfall_list('removeItems', '.image-cell.selected');
        
    });

});