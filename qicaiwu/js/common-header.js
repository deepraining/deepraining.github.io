
$(function() {

    var $header = $('#header'),
        $searchForm = $('#header-search-form'),
        $searchKeyword = $('#header-search-keyword'),
        $searchHint = $('#header-search-hint'),
        $searchHintContainer = $('#header-search-hint-container');

    var searchHintUrl = '/qicaiwu4/ajax/search.php',
        notifyRequestUrl = '/qicaiwu4/ajax/notify.php';

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
                url: searchHintUrl,
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
                    url: notifyRequestUrl,
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
