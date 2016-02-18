$(function() {
    var $receiver = $('#message-receiver'),
        $startSelectBtn = $('#message-select-friends-btn');

    var $modalGetFriends,
        $modalGetFriendsTitle,
        $modalGetFriendsBody,
        $modalGetFriendsContent,
        $modalGetFriendsSubmit;

    var getFriendsReqeustUrl = app.url.get_friends;

    function guaranteeModalGetFriends() {
        var modalHtml = '';
        if ($('#modal-get-friends').length === 0) {
            $('<div class="modal fade" id="modal-get-friends" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>').appendTo(document.body);
            modalHtml = '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="modal-get-friends-title"></h4>' +
                  '</div>' +
                  '<div class="modal-body" id="modal-get-friends-body">' +
                    '<div class="modal-inner-content"></div>' +
                  '</div>' +
                  '<div class="modal-footer" id="modal-get-friends-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                    '<button type="button" class="btn btn-primary" id="modal-get-friends-submit">确定</button>' +
                  '</div>' +
                '</div>' +
            '</div>';
            $('#modal-get-friends').html(modalHtml);

            $modalGetFriends = $('#modal-get-friends');
            $modalGetFriendsTitle = $('#modal-get-friends-title');
            $modalGetFriendsBody = $('#modal-get-friends-body');
            $modalGetFriendsContent = $modalGetFriendsBody.find('.modal-inner-content');
            $modalGetFriendsSubmit = $('#modal-get-friends-submit');

            $modalGetFriendsSubmit.click(function(event) {
                handleModalSubmit();
                return !1;
            });
        }
    }

    function handleGetFriendsModal() {
        if ($modalGetFriendsContent.html() != '') {
            $modalGetFriends.modal('show');
            return;
        }

        $modalGetFriendsTitle.text('选择好友');
        $.getJSON(getFriendsReqeustUrl, function(res) {
            var i, il, item, htmlStr, tempStr;
            if (res.success) {
                htmlStr = '<ul class="clearfix">';
                for (i = 0, il = res.data.length; i < il; i++) {
                    item = res.data[i];
                    tempStr = '<li class="left" style="float: left;width: 92px;overflow: hidden;margin-right: 4px;padding: 5px 0px;white-space: nowrap;">' + 
                        '<label><input name="friend" data-name="' + item.name + '" data-id="' + item.id + '" type="checkbox" style="margin-right: 5px"></label>' +
                        item.name +
                        '</li>';
                    htmlStr += tempStr;
                }
                htmlStr += '</ul>';
            }
            $modalGetFriendsContent.html(htmlStr);
            $modalGetFriends.modal('show');
        });
    }

    function handleModalSubmit() {
        var $selected = $('input[name="friend"]:checked'),
            i = 0, il = $selected.length,
            $item, strings = [], originValue = $receiver.val();

        if (il === 0) return;

        for (; i < il; i++) {
            $item = $($selected[i]);
            strings.push($item.attr('data-name') + '(' + $item.attr('data-id') + ')');
        }
        if (originValue === '') {
            $receiver.val(strings.join(','));
        }
        else {
            $receiver.val(originValue + ',' +strings.join(','));
        }
        $modalGetFriends.modal('hide');
    }

    $startSelectBtn.click(function(event) {
        guaranteeModalGetFriends();
        handleGetFriendsModal();
        return !1;
    });

    
});