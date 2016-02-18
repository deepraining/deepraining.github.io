/* 删除元素之前一定要先取消事件绑定 */
$(function() {
    var $comment = $('#comment'),
        $commentList = $('#comment-list'),
        $paginationContainer = $comment.find('.pagination-container');



    var template = Handlebars.compile(app.tpl.comment),
        subTemplate = Handlebars.compile(app.tpl.sub_comment);

    var requestedDatas = [];

    $('#comment-edit-form').submit(function(event) {
        var $this = $(this),
            $input = $this.find('textarea'),
            commentText = $.trim($input.val()),
            isValidText = commentText != '',
            data = {},
            tplData = {};
        tplData.items = [];
        if (!isValidText) return !1;
        data.username = app.user.username;
        data.userId = app.user.id;
        data.commentContent = commentText;
        $.getJSON(app.url.comment_submit, {
            content: commentText
        }, function(res) {
            if (res.success) {
                $.extend(data, res.data);
                $input.val('');
                tplData.items.push(data);
                $commentList.prepend(template(tplData));
                requestedDatas = [];
            }
        });
        return !1;
    });

    $.getJSON(app.url.comment_request, {
        page: 1
    }, function(data) {
        if (data.success) {
            $commentList.html(template(data));    
            $paginationContainer.html(formatPagination(data.currentPage, data.totalPages));
            requestedDatas[data.currentPage] = data;
        }
    });

    $paginationContainer.on('click', 'li > a', function(event) {
        var $this = $(this),
            page = parseInt($this.attr('data-page'));
        if ($this.parent().hasClass('active') || $this.parent().hasClass('disabled')) return !1;
        if (requestedDatas[page]) {
            $commentList.html(template(requestedDatas[page]));    
            $paginationContainer.html(formatPagination(page, requestedDatas[page].totalPages));
            return !1;
        }
        $.getJSON(app.url.comment_request, {page: page}, function(data) {
            if (data.success) {
                $commentList.html(template(data));    
                $paginationContainer.html(formatPagination(page, data.totalPages));
                requestedDatas[page] = data;
            }
        });
        return !1;
    });
    $commentList.on('click', '.comment-action-delete', function(event) {
        var $this = $(this),
            commentId = $this.attr('data-id');
        $.getJSON(app.url.comment_delete, {
            id: commentId
        }, function(data) {
            if (data.success) {
                $comment = $('#comment-' + commentId);
                $comment.fadeOut(function() {
                    $comment.remove();
                });
                requestedDatas = [];
            }    
        });
        return !1;
    });
    $commentList.on('click', '.comment-action-star', function(event) {
        var $this = $(this), commentId, $span;
        if (!$this.attr('data-id')) $this = $this.parent();
        commentId = $this.attr('data-id');
        $span = $this.find('span');
        $.getJSON(app.url.comment_star, {
            id: commentId
        }, function(data) {
            if (data.success) {
                $span.text(parseInt($span.text()) + 1);
            }    
        });
        return !1;
    });
    $commentList.on('click', '.comment-action-reply', function(event) {
        var $this = $(this),
            id = $this.attr('data-id'),
            index = id.indexOf('-'),
            $comment,
            $container;
        if (index != -1) id = id.slice(0, index);
        $comment = $('#comment-' + id);
        $container = $comment.find('> .comment > .comment-content');
            
        var editBoxStr = '<form class="clearfix" action="/" method="post" style="margin: 20px; padding: 10px; background: #f5f9fa">' +
                        '<div class="comment-edit-box">' +
                            '<textarea class="form-control" rows="3" name="message"></textarea>' +
                        '</div>' +
                        '<div class="overflow-hidden mgt20 mgr20">' +
                            '<input class="right slim-btn slim-btn-info" type="submit">' +
                            '<a class="slim-btn right mgr20 cancel-reply-btn">取消</a>' +
                        '</div>' +
                    '</form>';
        
        var $editBox = $(editBoxStr),
            $input = $editBox.find('textarea'),
            $cancel = $editBox.find('.cancel-reply-btn');
        $container.append($editBox);

        //提交
        $editBox.submit(function(event) {
            var commentText = $.trim($input.val()),
                isValidText = commentText != '',
                data = {},
                tplData = {};
            tplData.items = [];
            if (!isValidText) return !1;
            data.username = app.user.username;
            data.userId = app.user.id;
            data.commentContent = commentText;
            $.getJSON(app.url.comment_submit, {content: commentText}, function(res) {
                if (res.success) {
                    $.extend(data, res.data);
                    $editBox.remove();
                    tplData.items.push(data);
                    $container.append(subTemplate(tplData));
                    requestedDatas = [];
                }
            });
            return !1;
        });

        //取消
        $cancel.click(function(e) {
            $cancel.off();
            $editBox.fadeOut(function() {
                $editBox.off().remove();
            });
            return !1;
        });

        return !1;
    });





    var $commentListPopular = $('#comment-list-popular'),
        $commentTabAll = $('#comment-tab-all'),
        $commentTabAllParent = $commentTabAll.parent(),
        $commentTabPopular = $('#comment-tab-popular'),
        $commentTabPopularParent = $commentTabPopular.parent();

    var popularCommentsRequested = !1;

    $commentTabAll.click(function(event) {
        if ($commentTabAllParent.hasClass('active')) return !1;
        $commentTabAllParent.addClass('active');
        $commentTabPopularParent.removeClass('active');
        $commentList.show();
        $paginationContainer.show();
        $commentListPopular.hide();
        
        return !1;
    });
    $commentTabPopular.click(function(event) {
        if ($commentTabPopularParent.hasClass('active')) return !1;
        if (!popularCommentsRequested) {
            $commentListPopular.html('<p style="height: 200px; background: url(./image/loading-32.gif) no-repeat center"></p>');
            $.getJSON(app.url.comment_request, {
                page: 1
            }, function(data) {
                if (data.success) {
                    $commentListPopular.html(template(data));    
                    popularCommentsRequested = true;
                }
            });
        }
        
        $commentTabAllParent.removeClass('active');
        $commentTabPopularParent.addClass('active');
        $commentList.hide();
        $paginationContainer.hide();
        $commentListPopular.show();
        
        return !1;
        
    });
});
