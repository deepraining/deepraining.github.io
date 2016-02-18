$(function() {

    var $searchKeyword = $('#search-page-search-input'),
        $searchHint = $('#search-page-search-hint'),
        $searchHintContainer = $searchHint.find('> ul');

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
                url: app.url.search,
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

    $(document.body).click(function() {
        $searchHint.hide();
    });

});