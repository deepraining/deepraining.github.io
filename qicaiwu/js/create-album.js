
/* todo: 需要修改代码，以兼容编辑专辑和精选集 */

$(function() {

    //解决编辑器的遮罩问题
    $('#header').css({'position': 'fixed', 'top': 0, 'left': 0, 'z-index': 900});

    //初始化描述框
    //video插件有bug，并且不支持国内视频，暂时不用
    $('#album-description').summernote({
        lang: 'zh-CN',
        height: 200,
        tabsize: 2,
        codemirror: {
          theme: 'monokai'
        },
        toolbar: [
            ['style', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            //['picture', ['picture']],
            //['video', ['video']],
            ['link', ['link']],
            ['hr', ['hr']],
            ['fullscreen', ['fullscreen']],
            ['codeview', ['codeview']],
            ['undo', ['undo']],
            ['redo', ['redo']],

        ]
    });

    var $top = $('#manage-top'),
        $middle = $('#manage-middle'),
        $albumInfoWrapper = $('#album-info-wrapper'),
        $bottom = $('#manage-bottom'),

        //全选
        $selectAll = $('#manage-select-all'),

        //反选
        $reverseSelected = $('#manage-reverse-selected'),

        //删除选中项目
        $deleteSelected = $('#manage-delete-selected'),

        //全选
        $originSelectAll = $('#origin-select-all'),

        //反选
        $originReverseSelected = $('#origin-reverse-selected'),

        //添加选中项目到专辑
        $originAddSelected = $('#origin-add-selected'),

        
        $manageSearch = $('#manage-search'),

        //过滤搜索框
        $manageSearchKeyword = $('#manage-search-keyword'),

        //过滤搜索确定按钮
        $manageSearchSubmit = $('#manage-search-submit'),

        //
        $manageFilterContent = $('#manage-filter-content'),

        //内容过滤的下拉选项，所有内容，仅标题，仅标签
        $manageFilterContentSelect = $manageFilterContent.find('> select'),

        //
        $manageFilterAuthorization = $('#manage-filter-authorization'),

        //协议过滤的下拉选项
        $manageFilterAuthorizationSelect = $manageFilterAuthorization.find('> select'),

        //
        $manageFilterSort = $('#manage-filter-sort'),

        //排序
        $manageFilterSortSelect = $manageFilterSort.find('> select'),

        //起始时间
        $manageFilterTimeStart = $('#manage-filter-time-start'),

        //结束时间
        $manageFilterTimeEnd = $('#manage-filter-time-end'),

        //
        $stepNext = $('#step-next'),

        //下一步按钮
        $stepNextBtn = $stepNext.find('> button'),

        //列表项
        $albumTabList = $('#album-tab-list'),

        //信息项
        $albumTabInfo = $('#album-tab-info'),

        //保存专辑
        $saveAlbum = $('#save-album'),

        //原图片列表
        $originImageList = $('#origin-image-list'),

        //专辑图片列表
        $albumImageList = $('#album-image-list'),

        //标题
        $albumTitle = $('#album-title'),

        //标题提示
        $albumTitleIndication = $('#album-title-indication'),

        //标签
        $albumTags = $('#album-tags'),

        //描述
        $albumDescription = $('#album-description'),
        
        //上次点击上传文件项目的索引(按下ctrl或shift不更改)
        lastOriginClickIndex = -1,
        lastAlbumClickIndex = -1,

        //用于点击事件选择框为改变值，却触发了change事件
        lastReservedStartTime = '',
        lastReservedEndTime = '',
        
        
        //按顶部确定按钮后请求的数据，每次请求后会重新生成，但在列表中以分页的方式获取的数据则是追加
        //键名 image_id
        originItems = {},
        albumItems = {},
        //正在拖动中的项目
        draggingItems = {};

    // 当有文件添加进待选区域时执行，负责view的创建
    function addFileToOrigin( file ) {
        var $li = $( '<li id="origin_image_' + file.id + '" class="origin_image_item" draggable="true">' +
                '<img src="' + file.thumbnailSrc + '" width="80px" height="80px">' +
                '</li>' );

            

        $li.click(onClickOriginListItem);

        $li[0].ondragstart = onItemDragStart;
        $li[0].ondragend = onItemDragEnd;
        
        $li.appendTo( $originImageList );
    }

    function onItemDragStart(event) {
        var $this = $(event.target).parent(),
            $items = $originImageList.find('> li.selected'),
            il = $items.length,
            i, $item, id, pureId,
            ids = [];
        
        //清空原来的数据
        draggingItems = {};

        if ($this.hasClass('selected')) {
            for (i = 0; i < il; i++) {
                id = $($items[i]).attr('id');
                pureId = id.split("_")[2];
                draggingItems['image_' + pureId] = originItems['image_' + pureId];
            }
        }
        else {
            id = $this.attr('id');
            pureId = id.split("_")[2];
            draggingItems['image_' + pureId] = originItems['image_' + pureId];
        }
    }

    function onItemDragEnd(event) {
        draggingItems = {};
    }

    $middle[0].ondragover = function(event) {
        event.preventDefault();
    };

    $middle[0].ondrop = function (event) {
        $.each(draggingItems, function(k, v) {
            if ($('#album_' + k).length === 0) {
                addFileToAlbum(v);
                albumItems[k] = v;
            }
        });
    };

    // 当有文件添加进专辑列表时执行，负责view的创建
    function addFileToAlbum( file ) {
        var $li = $( '<li id="album_image_' + file.id + '">' +
                '<img src="' + file.thumbnailSrc + '" width="80px" height="80px">' +
                '</li>' );

            

        $li.click(onClickAlbumListItem);
        
        $li.appendTo( $albumImageList );
    }

    // 负责origin view, items的销毁
    function removeFilesFromOrigin( ids ) {
        var i, il = ids.length,
            $li, id;

        if (typeof ids ==='string') {
            $li = $('#origin_image_' + ids);
            //移除drag事件监听
            $li[0].ondragstart = null;
            $li[0].ondragend = null;
            $li.off().remove();
            delete originItems[ 'image_' + ids ];
        }
        else if ($.isArray(ids)) {
            for (i = 0; i < il; i++) {
                id = ids[i];
                $li = $('#origin_image_' + id);
                $li[0].ondragstart = null;
                $li[0].ondragend = null;
                $li.off().remove();
                delete originItems[ 'image_' + id ];
            }
        }
    }

    // 负责 album view, items的销毁
    function removeFilesFromAlbum( ids ) {
         var i, il = ids.length,
            $li, id;

        if (typeof ids ==='string') {
            $li = $('#album_image_' + ids);
            $li.off().remove();
            delete albumItems[ 'image_' + ids ];
        }
        else if ($.isArray(ids)) {
            for (i = 0; i < il; i++) {
                id = ids[i];
                $li = $('#album_image_' + id);
                $li.off().remove();
                delete albumItems[ 'image_' + id ];
            }
        }
    }

    function onClickOriginListItem (event) {
        var $this = $(this),
            $items = $originImageList.find('> li'),
            $selectedItems,
            $selectedItem,
            currentIndex = $this.index(),
            start, end, i, id, data;
        if (lastOriginClickIndex === -1) {
            lastOriginClickIndex = currentIndex;
            $items.removeClass('selected');
            $this.addClass('selected');
        }
        else if (event.shiftKey) {
            //if (lastClickIndex === currentIndex) return;
            start = Math.min(lastOriginClickIndex, currentIndex);
            end = Math.max(lastOriginClickIndex, currentIndex);
            $items.removeClass('selected');
            for (i=start; i <= end; i++) {
                $($items[i]).addClass('selected');
            }
        }
        else if (event.ctrlKey) {
            $this.toggleClass('selected');
        }
        else {
            lastOriginClickIndex = currentIndex;
            $items.removeClass('selected');
            $this.addClass('selected');
        }
    }

    function onClickAlbumListItem (event) {
        var $this = $(this),
            $items = $albumImageList.find('> li'),
            $selectedItems,
            $selectedItem,
            currentIndex = $this.index(),
            start, end, i, id, data;
        if (lastAlbumClickIndex === -1) {
            lastAlbumClickIndex = currentIndex;
            $items.removeClass('selected');
            $this.addClass('selected');
        }
        else if (event.shiftKey) {
            //if (lastClickIndex === currentIndex) return;
            start = Math.min(lastAlbumClickIndex, currentIndex);
            end = Math.max(lastAlbumClickIndex, currentIndex);
            $items.removeClass('selected');
            for (i=start; i <= end; i++) {
                $($items[i]).addClass('selected');
            }
        }
        else if (event.ctrlKey) {
            $this.toggleClass('selected');
        }
        else {
            lastAlbumClickIndex = currentIndex;
            $items.removeClass('selected');
            $this.addClass('selected');
        }
    }

    //点击列表其他地方，取消选择
    $originImageList.on('click', function(event) {
        event.target === event.currentTarget && (
            $(this).find('> li').removeClass('selected')
        )
    });

    //点击列表其他地方，取消选择
    $albumImageList.on('click', function(event) {
        event.target === event.currentTarget && (
            $(this).find('> li').removeClass('selected')
        )
    });



    //全选
    $selectAll.click(function() {
        $albumImageList.find('> li').addClass('selected');
        return !1
    });

    //反选
    $reverseSelected.click(function() {
        /*var $items = $albumImageList.find('> li'),
            il = $items.length,
            i, $item;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            $item.hasClass('selected') ? $item.removeClass('selected') : $item.addClass('selected');
        }*/

        var $items = $albumImageList.find('> li');
        $items.toggleClass('selected');

        return !1
    });

    //删除选中项目
    $deleteSelected.click(function() {
        var $items = $albumImageList.find('> li.selected'),
            il = $items.length,
            i, $item, id, pureId;
        if (il <= 0) return;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            id = $item.attr('id');
            pureId = id.split('_')[2];
            removeFilesFromAlbum(pureId);
        }
    });

    //全选
    $originSelectAll.click(function() {
        $originImageList.find('> li').addClass('selected');
        return !1
    });

    //反选
    $originReverseSelected.click(function() {
        /*var $items = $originImageList.find('> li'),
            il = $items.length,
            i, $item;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            $item.hasClass('selected') ? $item.removeClass('selected') : $item.addClass('selected');
        }*/

        var $items = $originImageList.find('> li');
        $items.toggleClass('selected');
        return !1
    });

    //添加选中项目到专辑
    $originAddSelected.click(function() {
        var $items = $originImageList.find('> li.selected'),
            il = $items.length,
            i, $item, id, pureId;
        if (il <= 0) return;
        for (i=0; i < il; i++) {
            $item = $($items[i]);
            id = $item.attr('id');
            pureId = id.split("_")[2];
            if ($('#album_image_' + pureId).length === 0) {
                albumItems['image_' + pureId] = originItems['image_' + pureId];
                addFileToAlbum(albumItems['image_' + pureId]);
            }
        }
    });

    function renderRequestedData(json) {
        var data,
            i = 0, 
            il = json.data.length,
            oldWidth = $originImageList.width();
        for (; i < il; i++) {
            data = json.data[i];
            addFileToOrigin(data);
            originItems['image_' + data.id] = data;
        }
        $originImageList.width(oldWidth + il * 92);
    }

    //enter键
    $manageSearchKeyword.keydown(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();
        if (event.which === 13 && $.trim(keyword) != '') {
            $.post(app.url.create_album_photos, {
                filterContent: filterContent,
                authorization: filterAuthorization,
                sort: filterSort,
                startTime: filterTimeStart,
                endTime: filterTimeEnd
            }, function(json) {
                renderRequestedData(json);
            }, "json");
        }
    });

    //提交按钮
    $manageSearchSubmit.click(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();
        if ($.trim(keyword) != '') {
            $.post(app.url.create_album_photos, {
                filterContent: filterContent,
                authorization: filterAuthorization,
                sort: filterSort,
                startTime: filterTimeStart,
                endTime: filterTimeEnd
            }, function(json) {
                renderRequestedData(json);
            }, "json");
        }
    });

    //内容过滤改变
    $manageFilterContentSelect.change(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();
        $.post(app.url.create_album_photos, {
            filterContent: filterContent,
            authorization: filterAuthorization,
            sort: filterSort,
            startTime: filterTimeStart,
            endTime: filterTimeEnd
        }, function(json) {
            renderRequestedData(json);
        }, "json");
    });

    //授权选项改变
    $manageFilterAuthorizationSelect.change(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();
        $.post(app.url.create_album_photos, {
            filterContent: filterContent,
            authorization: filterAuthorization,
            sort: filterSort,
            startTime: filterTimeStart,
            endTime: filterTimeEnd
        }, function(json) {
            renderRequestedData(json);
        }, "json");
    });

    //排序改变
    $manageFilterSortSelect.change(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();
        $.post(app.url.create_album_photos, {
            filterContent: filterContent,
            authorization: filterAuthorization,
            sort: filterSort,
            startTime: filterTimeStart,
            endTime: filterTimeEnd
        }, function(json) {
            renderRequestedData(json);
        }, "json");
    });

    //开始时间改变
    $manageFilterTimeStart.change(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();
            //startDate = filterTimeStart.split('-'),
            //endDate = filterTimeEnd.split('-');

        //用于点击事件选择框为改变值，却触发了change事件
        if (lastReservedStartTime === filterTimeStart) return !1;

        lastReservedStartTime = filterTimeStart;

        if (filterTimeEnd === '' || (new Date(filterTimeStart)).getTime() <= (new Date(filterTimeEnd)).getTime()) {
            $.post(app.url.create_album_photos, {
                filterContent: filterContent,
                authorization: filterAuthorization,
                sort: filterSort,
                startTime: filterTimeStart,
                endTime: filterTimeEnd
            }, function(json) {
                renderRequestedData(json);
            }, "json");
        }
    });

    //结束时间改变
    $manageFilterTimeEnd.change(function(event) {
        var keyword = $manageSearchKeyword.val(),
            filterContent = $manageFilterContentSelect.val(),
            filterAuthorization = $manageFilterAuthorizationSelect.val(),
            filterSort = $manageFilterSortSelect.val(),
            filterTimeStart = $manageFilterTimeStart.val(),
            filterTimeEnd = $manageFilterTimeEnd.val();

        //用于点击事件选择框为改变值，却触发了change事件
        if (lastReservedEndTime === filterTimeEnd) return !1;

        lastReservedEndTime = filterTimeEnd;

        if (filterTimeStart === '' || (new Date(filterTimeStart)).getTime() <= (new Date(filterTimeEnd)).getTime()) {
            $.post(app.url.create_album_photos, {
                filterContent: filterContent,
                authorization: filterAuthorization,
                sort: filterSort,
                startTime: filterTimeStart,
                endTime: filterTimeEnd
            }, function(json) {
                renderRequestedData(json);
            }, "json");
        }
    });

    //拖动排序
    $albumImageList.sortable();

    //启用日期选择器插件
    $manageFilterTimeStart.datepicker({"orientation": "auto bottom", "language": "zh-CN", "format": "yyyy-mm-dd", "autoclose": true});
    $manageFilterTimeEnd.datepicker({"orientation": "auto bottom", "language": "zh-CN", "format": "yyyy-mm-dd", "autoclose": true});

    //点击下一步
    $stepNextBtn.click(function(event){
        $middle.css({"bottom": 150});
        $middle.show();
        $bottom.show();
        $albumInfoWrapper.hide();
        $selectAll.show();
        $reverseSelected.show();
        $deleteSelected.show();
        $albumTabList.parent().addClass('active');
        $albumTabInfo.parent().removeClass('active');
    });

    //切换到图片列表
    $albumTabList.click(function(event){
        if ($(this).parent().hasClass('active')) return !1;
        $middle.css({"bottom": 150});
        $middle.show();
        $bottom.show();
        $albumInfoWrapper.hide();
        $selectAll.show();
        $reverseSelected.show();
        $deleteSelected.show();
        $albumTabList.parent().addClass('active');
        $albumTabInfo.parent().removeClass('active');
    });

    //切换到信息页面
    $albumTabInfo.click(function(event){
        if ($(this).parent().hasClass('active')) return !1;
        $middle.css({"bottom": 0});
        $middle.hide();
        $bottom.hide();
        $albumInfoWrapper.show();
        $selectAll.hide();
        $reverseSelected.hide();
        $deleteSelected.hide();
        $albumTabList.parent().removeClass('active');
        $albumTabInfo.parent().addClass('active');
    });

    //保存专辑
    $saveAlbum.click(function(event) {
        //todo: 获取description应该先上传图片
        var title = $.trim($albumTitle.val()),
            tags = $.trim($albumTags.val()).split(','),
            description = $albumDescription.code();
        if (title === '') {
            $albumTabInfo.trigger('click');
            $albumTitle.focus();
            $albumTitleIndication.show();
            //一次性事件
            $albumTitle.one('keyup', function() {
                $albumTitleIndication.hide();
            });
            return;
        }
        //排序
        var id, $item, index;
        for (id in albumItems ) {
            $item = $('#album_' + id);
            index = $item.index();
            albumItems[id].index = index;
        }
        $.post(app.url.save_album, {
            title: title,
            tags: tags,
            description: description,
            items: albumItems
        }, function(data) {
            //跳转到创建的新专辑
            if (data.success) {
                location.href = data.url;
            }    
        }, "json");

    });

    var $tags = $('#my-tags').find('.tag');
    //点击标签事件函数
    $tags.click(function(event) {
        var $this = $(this),
            inputValue = $.trim($albumTags.val());
        if (inputValue === '') {
            $albumTags.val($this.text());
        }
        else {
            $albumTags.val(inputValue + ',' + $this.text());
        }
    });

    



    /**
     * json:
     * {
     *   currentPage: 1,
     *   totalPages: 10,
     *   data: [
     *       {
     *       id: ,title: ,tags: ,description: ,authorization: ,thumbnailSrc: ,rotation: ,
     *     }
     *   ],
     * }
     *
     */
    $.getJSON(app.url.create_album_photos, function(json){
        renderRequestedData(json);
        
    });

    //用于调试
    window.originItems = originItems;
    window.albumItems = albumItems;
    window.draggingItems = draggingItems;
});