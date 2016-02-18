$(function() {
    var $selectAll = $('#inbox-select-all'),
        $reverseSelected = $('#inbox-reverse-selected'),
        $markSelected = $('#inbox-mark-selected'),
        $deleteSelected = $('#inbox-delete-selected'),
        $count = $('#inbox-count').find('span');

    var unreadMessageMarkUrl = app.url.unread_message_mark,
        deleteMessageUrl = app.url.delete_message;

    $selectAll.click(function(e) {
        $('input[name="ids"]').prop("checked", true);
    });
    $reverseSelected.click(function(e) {
        var $notSelected = $('input[name="ids"]').not("input:checked"),
            $selected = $('input[name="ids"]:checked');
        $notSelected.prop("checked", true);
        $selected.prop("checked", false);
    });
    $markSelected.click(function(e) {
        var $selected = $('input[name="ids"]:checked'),
            i = 0, il = $selected.length,
            $item, unreadIds = [];
        if (il === 0) return;
        for (; i < il; i++) {
            $item = $($selected[i]);
            if ($item.parent().parent().hasClass('unread')) {
                unreadIds.push(parseInt($item.val()));
            }
        }
        if (unreadIds.length === 0) return;
        $.getJSON(unreadMessageMarkUrl, {
            ids: unreadIds
        }, function(res) {
            if (res.success) {
                for (i = 0; i < il; i++) {
                    $item = $($selected[i]);
                    $item.parent().parent().removeClass('unread active').addClass('read');
                }
                $selected.prop("checked", false);
                $count.text(parseInt($count.text()) - unreadIds.length);
            }    
        });

    });
    $deleteSelected.click(function(e) {
        var $selected = $('input[name="ids"]:checked'),
            i = 0, il = $selected.length,
            $item, ids = [], unreadCount = 0;
        if (il === 0) return;
        for (; i < il; i++) {
            $item = $($selected[i]);
            ids.push(parseInt($item.val()));
            if ($item.parent().parent().hasClass('unread')) {
                unreadCount += 1;
            }
        }
        if (ids.length === 0) return;
        $.getJSON(deleteMessageUrl, {
            ids: ids
        }, function(res) {
            if (res.success) {
                for (i = 0; i < il; i++) {
                    $('#message-' + ids[i]).remove();
                }
                $count.text(parseInt($count.text()) - unreadCount);
            }    
        });

    });
});