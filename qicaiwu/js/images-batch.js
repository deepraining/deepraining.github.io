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
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        play(ids);
    });
    //收藏
    $likeSelected.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        like(ids);
    });
    //添加到精选集
    $addSelectedTo.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        addToCollection(ids);
    });
    //添加到专辑
    $addSelectedToAlbum.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        addToAlbum(ids);
    });
    //添加到画廊
    $addSelectedToGallery.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        addToGallery(ids);
    });
    //删除 todo: ajax
    $deleteSelected.click(function() {
        var $items = $('.image-cell.selected'),
            i = 0, il = $items.length, ids = [];
        if (il <= 0) return !1;
        for (; i < il; i++) {
            ids.push(parseInt($($items[i]).attr('data-image-id')));
        }
        //todo: ajax

        //依赖按钮的显示
        if ($('.icon-align-vertical').hasClass('active')) $waterfall.waterfall('removeItems', '.image-cell.selected');
        else if ($('.icon-align-horizontal').hasClass('active')) $waterfall.waterfall_horizontal('removeItems', '.image-cell.selected');
        else if ($('.icon-align-block').hasClass('active')) $waterfall.waterfall_block('removeItems', '.image-cell.selected');
        
    });

});