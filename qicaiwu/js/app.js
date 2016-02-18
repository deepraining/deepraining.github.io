
var app = app || {};

/* 浏览器检测 */
app.browserSniff = function() {
    var nAgt = navigator.userAgent,
        name = navigator.appName,
        fullVersion = "" + parseFloat(navigator.appVersion),
        majorVersion = parseInt(navigator.appVersion, 10),
        nameOffset,
        verOffset,
        ix;

    // MSIE 11
    if ((navigator.appVersion.indexOf("Windows NT") !== -1) && (navigator.appVersion.indexOf("rv:11") !== -1)) {
        name = "IE";
        fullVersion = "11;";
    }
    // MSIE
    else if ((verOffset=nAgt.indexOf("MSIE")) !== -1) {
        name = "IE";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset=nAgt.indexOf("Chrome")) !== -1) {
        name = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset=nAgt.indexOf("Safari")) !== -1) {
        name = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset=nAgt.indexOf("Version")) !== -1) {
            fullVersion = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset=nAgt.indexOf("Firefox")) !== -1) {
        name = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset=nAgt.lastIndexOf(" ") + 1) < (verOffset=nAgt.lastIndexOf("/"))) {
        name = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset + 1);

        if (name.toLowerCase() == name.toUpperCase()) {
            name = navigator.appName;
        }
    }
    // Trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }
    if ((ix = fullVersion.indexOf(" ")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }
    // Get major version
    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = "" + parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // Return data
    return {
        name:       name, 
        version:    majorVersion, 
        ios:        /(iPad|iPhone|iPod)/g.test(navigator.platform)
    };
}();


/* 全局 ajax url */
app.url = app.url || {};
/* 根地址 */
app.url.base = './server/';

app.url.waterfall_images_vertical = app.url.base + 'waterfall.json';
app.url.waterfall_images_horizontal = app.url.base + 'waterfall-horizontal.json';
app.url.waterfall_images_panel = app.url.base + 'waterfall-panel.json';
app.url.waterfall_images_list = app.url.base + 'waterfall-list.json';

app.url.waterfall_albums_list = app.url.base + 'waterfall-album-list.json';
app.url.waterfall_albums_block = app.url.base + 'waterfall-album-block.json';

app.url.waterfall_collections_list = app.url.base + 'waterfall-collection-list.json';
app.url.waterfall_collections_block = app.url.base + 'waterfall-collection-block.json';

app.url.waterfall_galleries_list = app.url.base + 'waterfall-gallery-list.json';
app.url.waterfall_galleries_block = app.url.base + 'waterfall-gallery-block.json';

app.url.waterfall_users_list = app.url.base + 'waterfall-user-list.json';
app.url.waterfall_users_block = app.url.base + 'waterfall-user-block.json';

app.url.waterfall_tag = app.url.base + 'waterfall-tags.json';

app.url.namecard = app.url.base + 'namecard.json';
app.url.atwho = app.url.base + 'atwho.json';
app.url.search = app.url.base + 'search.json';
app.url.upload = app.url.base + 'fileupload.php';
app.url.unread_message_mark = app.url.base + "unread-message-mark.json";
app.url.delete_message = app.url.base + "unread-message-mark.json";
app.url.get_friends = app.url.base + "get-friends.json";
app.url.create_album_photos = app.url.base + "create-album-photos.json";
app.url.save_album = app.url.base + 'save-album.json';
/**
 * 收藏请求(图片，专辑，精选集)
 * format: 
 */
app.url.like_request = app.url.base + 'like-image.json';
/**
 * 收藏确定
 * format: 
 */
app.url.like_submit = app.url.base + 'like-image-submit.json';
/**
 * 取消收藏
 * format: 
 */
app.url.unlike = app.url.base + 'like-image-submit.json';

/**
 * 添加到精选集请求
 * format: 
 */
app.url.add_to_collection_request = app.url.base + 'add-to-collection.json';
/**
 * 快捷创建精选集
 * format:
 */
app.url.add_to_collection_create = app.url.base + 'create-collection.json';
/**
 * 添加到精选集确定
 * format: 
 */
app.url.add_to_collection_submit = app.url.base + 'add-to-collection-submit.json';

/**
 * 添加到专辑请求
 * format: 
 */
app.url.add_to_album_request = app.url.base + 'add-to-album.json';
/**
 * 快捷创建专辑
 * format:
 */
app.url.add_to_album_create = app.url.base + 'create-album.json';
/**
 * 添加到专辑确定
 * format:
 */
app.url.add_to_album_submit = app.url.base + 'add-to-album-submit.json';
/**
 * 添加到画廊请求
 * format: 
 */
app.url.add_to_gallery_request = app.url.base + 'add-to-gallery.json';
/**
 * 添加到画廊确定
 * format:
 */
app.url.add_to_gallery_submit = app.url.base + 'add-to-gallery-submit.json';
/**
 * 编辑标签(图片，专辑，精选集)
 * format: 
 */
app.url.edit_tag_request = app.url.base + 'edit-tag.json';
/**
 * 编辑标签
 * format: 
 */
app.url.edit_tag_submit = app.url.base + 'edit-tag-submit.json';
/**
 * 播放器项目请求
 * format:
 */
app.url.request_player_images = app.url.base + 'player.json';
/**
 * 举报
 * format:
 */
app.url.report = app.url.base + 'like-image-submit.json';
/**
 * 我的标签
 * format:
 */
app.url.return_my_tags = app.url.base + 'images-tags.json';
/**
 * 关注
 * format:
 */
app.url.follow = app.url.base + 'relation-follow.json';
/**
 * 取消关注
 * format:
 */
app.url.unfollow = app.url.base + 'relation-unfollow.json';
/**
 * 评论
 * format:
 */
app.url.comment_request = app.url.base + 'comment.json';
/**
 * 删除评论
 * format:
 */
app.url.comment_delete = app.url.base + 'like-image-submit.json';
/**
 * 赞评论
 * format:
 */
app.url.comment_star = app.url.base + 'like-image-submit.json';
/**
 * 提交评论
 * format:
 */
app.url.comment_submit = app.url.base + 'comment-submit.json';
/**
 * 头部 search hint
 * format:
 */
app.url.header_search_hint = app.url.base + 'search.json';
/**
 * 头部 notify
 * format:
 */
app.url.header_notify = app.url.base + 'notify.json';
/**
 * 下载图片，返回各种不同的尺寸
 * format:
 */
app.url.download = app.url.base + 'download.json';
/**
 * 专辑描述
 * format:
 */
app.url.album_description = app.url.base + 'album-description.json';
/**
 * 专辑标签
 * format:
 */
app.url.album_tags = app.url.base + 'album-tag.json';
/**
 * 删除
 * format: 
 */
app.url.delete = app.url.base + 'like-image-submit.json';


/**
 * 1. /image/{{imageId}} -> ./image-xxx.htm
 * 2. /user/{{authorId}} -> ./user-xxx.htm
 * 3. /album/{{albumId}} -> ./album-xxx.htm
 * 4. /collection/{{collectionId}} -> ./collection-xxx.htm
 * 5. /gallery/{{galleryId}} -> ./gallery-xxx.htm
 * 6. /user/{{userId}} -> ./user-xxx.htm
 * 7. /user/{{ownerId}} -> ./user-xxx.htm
 * 8. /tag/{{tagId}} -> ./tag-xxx.htm
 */


/* 全局模板 */
app.tpl = app.tpl || {};

/* 后面所有的模板必须要用 ' '(space, 1+) 链接，而不能直接链接，否则播放按钮和添加按钮会连载一起 */

/* 多个同为 display: inline-block 的元素放在一起，若元素代码(<a></a>    <a></a>)之间至少有一个空格，则视图中元素之间会自动有一定的间隔，否则他们之间没有间隔 */

/**
 * data-type: 1: image, 2: album, 3: collection
 * data-waterfall: image(1: vertical, 2: horizontal, 3: block, 4: list), album,collection,gallery(1: list, 2: block)
 */
//图片 垂直(通常)
app.tpl.image_vertical  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 只选择用于批处理(通常 批处理)
app.tpl.image_vertical_only_with_select  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 编辑按钮和删除按钮(专辑列表，上传的图片)
app.tpl.image_vertical_with_edit  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 选择用于批处理 编辑按钮，删除按钮(专辑列表 批处理)
app.tpl.image_vertical_with_select_and_edit  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 删除按钮(精选集列表)
app.tpl.image_vertical_with_delete  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 选择用于批处理 删除按钮(精选集列表 批处理)
app.tpl.image_vertical_with_select_and_delete  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 编辑按钮和删除按钮(收藏的图片 编辑标签)
app.tpl.image_vertical_with_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 选择用于批处理 编辑按钮，删除按钮(收藏的图片 编辑标签 批处理)
app.tpl.image_vertical_with_select_and_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');


//图片 水平
app.tpl.image_horizontal  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 只选择用于批处理
app.tpl.image_horizontal_only_with_select  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 编辑按钮和删除按钮
app.tpl.image_horizontal_with_edit  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 选择用于批处理  编辑按钮，删除按钮
app.tpl.image_horizontal_with_select_and_edit  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 删除按钮
app.tpl.image_horizontal_with_delete  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 选择用于批处理  删除按钮
app.tpl.image_horizontal_with_select_and_delete  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 编辑按钮和删除按钮
app.tpl.image_horizontal_with_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 水平 选择用于批处理  编辑按钮，删除按钮
app.tpl.image_horizontal_with_select_and_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell image-cell-by-background only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="2" style="position: absolute; heigth: 236px;background-image: url({{thumbnailSrc}})">',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');


/* 拼板模板与水平一样(除 data-waterfall="2/4" 之外) */
app.tpl.image_panel = app.tpl.image_horizontal.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_only_with_select = app.tpl.image_horizontal_only_with_select.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_with_edit = app.tpl.image_horizontal_with_edit.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_with_select_and_edit = app.tpl.image_horizontal_with_select_and_edit.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_with_delete = app.tpl.image_horizontal_with_delete.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_with_select_and_delete = app.tpl.image_horizontal_with_select_and_delete.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_with_edit_tag = app.tpl.image_horizontal_with_edit_tag.replace(/data-waterfall="2"/g, 'data-waterfall="4"');
app.tpl.image_panel_with_select_and_edit_tag = app.tpl.image_horizontal_with_select_and_edit_tag.replace(/data-waterfall="2"/g, 'data-waterfall="4"');


//图片 方块
app.tpl.image_block  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 只选择用于批处理
app.tpl.image_block_only_with_select  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 编辑按钮和删除按钮
app.tpl.image_block_with_edit  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 选择用于批处理  编辑按钮和删除按钮
app.tpl.image_block_with_select_and_edit  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 删除按钮
app.tpl.image_block_with_delete  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 选择用于批处理  删除按钮
app.tpl.image_block_with_select_and_delete  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 编辑按钮和删除按钮
app.tpl.image_block_with_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 选择用于批处理  编辑按钮和删除按钮
app.tpl.image_block_with_select_and_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="./image-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');


//图片 列表(不能用于批处理，因为包含了 image_cell，无法做到批处理)
app.tpl.image_list = [
    '{{#items}}',
        '<div class="image-list" data-id="{{imageId}}" data-type="1" data-waterfall="4" style="float: left;">',
            '<div class="image-cell">',
                '<a class="img" href="./image-xxx.htm">',
                    '<img src="{{thumbnailSrc}}">',
                '</a>',
                '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                    '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '</div>',
                '<div class="details">',
                    '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="./image-xxx.htm" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="./user-xxx.htm" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
                '</div>',*/
                '<p class="description">{{{description}}}</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 列表 编辑按钮和删除按钮
app.tpl.image_list_with_edit  = [
    '{{#items}}',
        '<div class="image-list" data-id="{{imageId}}" data-type="1" data-waterfall="4" style="float: left;">',
            '<div class="image-cell" style="width: 236px; height: 236px;">',
                '<a class="img" href="./image-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="236px">',
                '</a>',
                '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                    '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="编辑" href="./image-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="4" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                '<div class="details">',
                    '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="./image-xxx.htm" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="./user-xxx.htm" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
                '</div>',*/
                '<p class="description">{{{description}}}</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 列表 删除按钮
app.tpl.image_list_with_delete  = [
    '{{#items}}',
        '<div class="image-list" data-id="{{imageId}}" data-type="1" data-waterfall="4" style="float: left;">',
            '<div class="image-cell" style="width: 236px; height: 236px;">',
                '<a class="img" href="./image-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="236px">',
                '</a>',
                '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                    '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="4" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                '<div class="details">',
                    '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="./image-xxx.htm" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="./user-xxx.htm" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
                '</div>',*/
                '<p class="description">{{{description}}}</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 列表 编辑按钮和删除按钮
app.tpl.image_list_with_edit_tag  = [
    '{{#items}}',
        '<div class="image-list" data-id="{{imageId}}" data-type="1" data-waterfall="4" style="float: left;">',
            '<div class="image-cell" style="width: 236px; height: 236px;">',
                '<a class="img" href="./image-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="236px">',
                '</a>',
                '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                    '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="编辑标签"  onclick="editTag({{imageId}}, 1)"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="4" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                '<div class="details">',
                    '<div class="title"><a href="./image-xxx.htm" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="./image-xxx.htm" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="./user-xxx.htm" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
                '</div>',*/
                '<p class="description">{{{description}}}</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');



//专辑 列表
app.tpl.album_list = [
    '{{#items}}',    
        '<div class="album-cell-list left" data-id="{{albumId}}" data-type="2" data-waterfall="1">',
            '<div class="album-cell left">',
                '<a class="img" href="./album-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 列表 可编辑
app.tpl.album_list_with_edit = [
    '{{#items}}',    
        '<div class="album-cell-list left" data-id="{{albumId}}" data-type="2" data-waterfall="1">',
            '<div class="album-cell left">',
                '<a class="img" href="./album-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="添加到画廊" onclick="addToGallery({{albumId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="编辑" href="./album-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 列表 可删除(无添加到画廊)
app.tpl.album_list_with_delete = [
    '{{#items}}',    
        '<div class="album-cell-list left" data-id="{{albumId}}" data-type="2" data-waterfall="1">',
            '<div class="album-cell left">',
                '<a class="img" href="./album-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 列表 可编辑
app.tpl.album_list_with_edit_tag = [
    '{{#items}}',    
        '<div class="album-cell-list left" data-id="{{albumId}}" data-type="2" data-waterfall="1">',
            '<div class="album-cell left">',
                '<a class="img" href="./album-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="添加到画廊" onclick="addToGallery({{albumId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="编辑标签" onclick="editTag({{albumId}}, 2)" ><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 方块
app.tpl.album_block = [
    '{{#items}}',
        '<div class="album-cell left" data-id="{{albumId}}" data-type="2" data-waterfall="2">',
            '<a class="img" href="./album-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>专辑</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 方块 可编辑
app.tpl.album_block_with_edit = [
    '{{#items}}',
        '<div class="album-cell left" data-id="{{albumId}}" data-type="2" data-waterfall="2">',
            '<a class="img" href="./album-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="添加到画廊" onclick="addToGallery({{albumId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="./album-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>专辑</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 方块 可删除
app.tpl.album_block_with_delete = [
    '{{#items}}',
        '<div class="album-cell left" data-id="{{albumId}}" data-type="2" data-waterfall="2">',
            '<a class="img" href="./album-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>专辑</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//专辑 方块 可编辑
app.tpl.album_block_with_edit_tag = [
    '{{#items}}',
        '<div class="album-cell left" data-id="{{albumId}}" data-type="2" data-waterfall="2">',
            '<a class="img" href="./album-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="添加到画廊" onclick="addToGallery({{albumId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑标签" onclick="editTag({{albumId}}, 2)" ><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./album-xxx.htm" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>专辑</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 列表
app.tpl.collection_list = [
    '{{#items}}',    
        '<div class="collection-cell-list left" data-id="{{collectionId}}" data-type="3" data-waterfall="1">',
            '<div class="collection-cell left">',
                '<a class="img" href="./collection-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 列表 可编辑
app.tpl.collection_list_with_edit = [
    '{{#items}}',    
        '<div class="collection-cell-list left" data-id="{{collectionId}}" data-type="3" data-waterfall="1">',
            '<div class="collection-cell left">',
                '<a class="img" href="./collection-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="编辑" href="./collection-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 列表 可删除
app.tpl.collection_list_with_delete = [
    '{{#items}}',    
        '<div class="collection-cell-list left" data-id="{{collectionId}}" data-type="3" data-waterfall="1">',
            '<div class="collection-cell left">',
                '<a class="img" href="./collection-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 列表 可编辑
app.tpl.collection_list_with_edit_tag = [
    '{{#items}}',    
        '<div class="collection-cell-list left" data-id="{{collectionId}}" data-type="3" data-waterfall="1">',
            '<div class="collection-cell left">',
                '<a class="img" href="./collection-xxx.htm">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="编辑标签" onclick="editTag({{collectionId}}, 3)"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="./image-xxx.htm" class="" title="{{title}}">',
                        '<img src="{{thumbnailSrc}}">',
                    '</a>',
                '</div>',
                '{{/thumbnails}}',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 方块
app.tpl.collection_block = [
    '{{#items}}',
        '<div class="collection-cell left" data-id="{{collectionId}}" data-type="3" data-waterfall="2">',
            '<a class="img" href="./collection-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>精选集</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 方块 可编辑
app.tpl.collection_block_with_edit = [
    '{{#items}}',
        '<div class="collection-cell left" data-id="{{collectionId}}" data-type="3" data-waterfall="2">',
            '<a class="img" href="./collection-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="编辑" href="./collection-xxx.htm/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>精选集</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 方块 可删除
app.tpl.collection_block_with_delete = [
    '{{#items}}',
        '<div class="collection-cell left" data-id="{{collectionId}}" data-type="3" data-waterfall="2">',
            '<a class="img" href="./collection-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>精选集</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//精选集 方块 可编辑
app.tpl.collection_block_with_edit_tag = [
    '{{#items}}',
        '<div class="collection-cell left" data-id="{{collectionId}}" data-type="3" data-waterfall="2">',
            '<a class="img" href="./collection-xxx.htm">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="编辑标签" onclick="editTag({{collectionId}}, 3)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="./collection-xxx.htm" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="./user-xxx.htm" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '<div class="images-count"><span>{{imagesCount}}</span></div>',
                '<div class="album-collection-mark"><span>精选集</span></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');


/**
 * type: 1: user, 2: gallery
 */
//画廊 列表
app.tpl.gallery_list = [
    '{{#items}}',
        '<div class="gallery-cell-list left">',
            '<div class="image">',
                '<a href="./gallery-xxx.htm"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="./gallery-xxx.htm" class="name" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>粉丝：</span> <span>{{fansCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>画廊拥有者：</span> <a href="./user-xxx.htm" data-name-card="{{ownerId}}" data-type="1">{{ownerName}}</a></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="./image-xxx.htm" class="" title="{{title}}">',
                            '<img src="{{thumbnailSrc}}">',
                        '</a>',
                    '</div>',
                    '{{/thumbnails}}',
                '</div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//画廊 方块
app.tpl.gallery_block = [
    '{{#items}}',
        '<div class="gallery-cell left">',
            '<div class="image">',
                '<a class="" href="./gallery-xxx.htm"><img width="100px" height="100px" src="{{thumbnailSrc}}"></a>',
            '</div>',
            '<div class="info">',
                '<p><a class="" href="./gallery-xxx.htm" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a></p>',
                '<p>粉丝 {{fansCount}}</p>',
                '<p>',
                    '<a class="slim-btn" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//画廊 列表
app.tpl.gallery_list_with_edit_tag = [
    '{{#items}}',
        '<div class="gallery-cell-list left">',
            '<div class="image">',
                '<a href="./gallery-xxx.htm"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{galleryId}}, 4)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="./gallery-xxx.htm" class="name" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>粉丝：</span> <span>{{fansCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>画廊拥有者：</span> <a href="./user-xxx.htm" data-name-card="{{ownerId}}" data-type="1">{{ownerName}}</a></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="./image-xxx.htm" class="" title="{{title}}">',
                            '<img src="{{thumbnailSrc}}">',
                        '</a>',
                    '</div>',
                    '{{/thumbnails}}',
                '</div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//画廊 方块
app.tpl.gallery_block_with_edit_tag = [
    '{{#items}}',
        '<div class="gallery-cell left">',
            '<div class="image">',
                '<a class="" href="./gallery-xxx.htm"><img width="100px" height="100px" src="{{thumbnailSrc}}"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{galleryId}}, 4)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="info">',
                '<p><a class="" href="./gallery-xxx.htm" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a></p>',
                '<p>粉丝 {{fansCount}}</p>',
                '<p>',
                    '<a class="slim-btn" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//用户 列表
app.tpl.user_list = [
    '{{#items}}',
        '<div class="user-cell-list left">',
            '<div class="image">',
                '<a href="./user-xxx.htm"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="./user-xxx.htm" class="name" data-name-card="{{userId}}">{{userName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>关注：</span> <span>{{followingCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>粉丝：</span> <span>{{fansCount}}</span></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="./image-xxx.htm" class="" title="{{title}}">',
                            '<img src="{{thumbnailSrc}}">',
                        '</a>',
                    '</div>',
                    '{{/thumbnails}}',
                '</div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//用户 列表(可编辑标签)
app.tpl.user_list_with_edit_tag = [
    '{{#items}}',
        '<div class="user-cell-list left">',
            '<div class="image">',
                '<a href="./user-xxx.htm"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{userId}}, 5)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="./user-xxx.htm" class="name" data-name-card="{{userId}}">{{userName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>关注：</span> <span>{{followingCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>粉丝：</span> <span>{{fansCount}}</span></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="./image-xxx.htm" class="" title="{{title}}">',
                            '<img src="{{thumbnailSrc}}">',
                        '</a>',
                    '</div>',
                    '{{/thumbnails}}',
                '</div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//用户 方块
app.tpl.user_block = [
    '{{#items}}',
        '<div class="user-cell left">',
            '<div class="image">',
                '<a href="./user-xxx.htm"><img src="{{thumbnailSrc}}" width="75px" height="75px" class="gravatar img-rounded"></a>',
            '</div>',
            '<div class="user-cell-container">',
                '<h5 class="user-cell-name"><a href="./user-xxx.htm" data-name-card="{{userId}}">{{userName}}</a></h5>',
                '<ul class="fs13 overflow-hidden mgt10 mgb10">',
                    '<li class="left mgr20">',
                        '<span class="mgr5 color999">粉丝</span><a href="./user-xxx.htm/followers" class="color-01a0d8"><span>{{fansCount}}</span></a>',
                    '</li>',
                    '<li class="left">',
                        '<span class="mgr5 color999">关注</span><a href="./user-xxx.htm/following" class="color-01a0d8"><span>{{followingCount}}</span></a>',
                    '</li>',
                '</ul>',
                '<p>',
                    '<a class="slim-btn" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//用户 方块(可编辑标签)
app.tpl.user_block_with_edit_tag = [
    '{{#items}}',
        '<div class="user-cell left">',
            '<div class="image">',
                '<a href="./user-xxx.htm"><img src="{{thumbnailSrc}}" width="75px" height="75px" class="gravatar img-rounded"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{userId}}, 5)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="user-cell-container">',
                '<h5 class="user-cell-name"><a href="./user-xxx.htm" data-name-card="{{userId}}">{{userName}}</a></h5>',
                '<ul class="fs13 overflow-hidden mgt10 mgb10">',
                    '<li class="left mgr20">',
                        '<span class="mgr5 color999">粉丝</span><a href="./user-xxx.htm/followers" class="color-01a0d8"><span>{{fansCount}}</span></a>',
                    '</li>',
                    '<li class="left">',
                        '<span class="mgr5 color999">关注</span><a href="./user-xxx.htm/following" class="color-01a0d8"><span>{{followingCount}}</span></a>',
                    '</li>',
                '</ul>',
                '<p>',
                    '<a class="slim-btn" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//评论
app.tpl.comment = [
    '{{#items}}',
        '<div class="comment-wrapper" id="comment-{{commentId}}">',
            '<a href="{{userUrl}}" data-name-card="{{userId}}">',
                '<img alt="{{username}}" class="comment-avatar" src="{{avatarSrc}}" width="48" height="48">',
            '</a>',
            '<div class="comment">',
                '<div class="comment-header ">',
                    '<div class="comment-actions">',
                    '{{#if isSelf}}',
                        '<a class="comment-action comment-action-delete" data-id="{{commentId}}" title="删除">删除</a>',
                    '{{else}}',
                        '<a class="comment-action comment-action-report" data-id="{{commentId}}" onclick="report({{commentId}},{{commentType}}); return !1;" title="举报">举报</a>',
                        '<a class="comment-action comment-action-reply" data-id="{{commentId}}" title="回复">回复</a>',
                        '<a class="comment-action comment-action-star" data-id="{{commentId}}" title="支持">赞(<span>{{starsCount}}</span>)</a>',
                    '{{/if}}',
                    '</div>',
                    '<div class="comment-header-text">',
                        '<a href="{{userUrl}}" class="author" data-name-card="{{userId}}">{{username}}</a>',
                        '&nbsp;&nbsp;',
                        '<span class="timestamp">',
                            '<time title="{{postedTime}}">{{postedTime}}</time>',
                        '</span>',
                    '</div>',
                '</div>',
                '<div class="comment-content">',
                    '<div class="edit-comment-hide">',
                        '<div class="comment-body">',
                        '{{{commentContent}}}',
                        '</div>',
                    '</div>',
                    '{{#subItems}}',
                        '<div class="comment-wrapper" id="comment-{{commentId}}">',
                            '<a href="{{userUrl}}" data-name-card="{{userId}}">',
                                '<img alt="{{username}}" class="comment-avatar" src="{{avatarSrc}}" width="48" height="48">',
                            '</a>',
                            '<div class="comment">',
                                '<div class="comment-header ">',
                                    '<div class="comment-actions">',
                                    '{{#if isSelf}}',
                                        '<a class="comment-action comment-action-delete" data-id="{{commentId}}" title="删除">删除</a>',
                                    '{{else}}',
                                        '<a class="comment-action comment-action-report" data-id="{{commentId}}" onclick="report({{commentId}},{{commentType}}); return !1;" title="举报">举报</a>',
                                        '<a class="comment-action comment-action-reply" data-id="{{commentId}}" title="回复">回复</a>',
                                    '{{/if}}',
                                    '</div>',
                                    '<div class="comment-header-text">',
                                        '<a href="{{userUrl}}" class="author" data-name-card="{{userId}}">{{username}}</a>',
                                        '&nbsp;&nbsp;',
                                        '<span class="timestamp">',
                                            '<time title="{{postedTime}}">{{postedTime}}</time>',
                                        '</span>',
                                    '</div>',
                                '</div>',
                                '<div class="comment-content">',
                                    '<div class="edit-comment-hide">',
                                        '<div class="comment-body">',
                                        '{{{commentContent}}}',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '{{/subItems}}',
                '</div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//子评论
app.tpl.sub_comment = [
    '{{#items}}',
        '<div class="comment-wrapper" id="comment-{{commentId}}">',
            '<a href="{{userUrl}}" data-name-card="{{userId}}">',
                '<img alt="{{username}}" class="comment-avatar" height="48" src="{{avatarSrc}}" width="48">',
            '</a>',
            '<div class="comment">',
                '<div class="comment-header ">',
                    '<div class="comment-actions">',
                    '{{#if isSelf}}',
                        '<a class="comment-action comment-action-delete" data-id="{{commentId}}" title="删除">删除</a>',
                    '{{else}}',
                        '<a class="comment-action comment-action-report" data-id="{{commentId}}" onclick="report({{commentId}},{{commentType}}); return !1;" title="举报">举报</a>',
                        '<a class="comment-action comment-action-reply" data-id="{{commentId}}" title="回复">回复</a>',
                    '{{/if}}',
                    '</div>',
                    '<div class="comment-header-text">',
                        '<a href="{{userUrl}}" class="author" data-name-card="{{userId}}">{{username}}</a>',
                        '&nbsp;&nbsp;',
                        '<span class="timestamp">',
                            '<time title="{{postedTime}}">{{postedTime}}</time>',
                        '</span>',
                    '</div>',
                '</div>',
                '<div class="comment-content">',
                    '<div class="edit-comment-hide">',
                        '<div class="comment-body">',
                        '{{{commentContent}}}',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//name card
app.tpl.namecard = [
    '<div class="inner">',
        '<div class="user-info">',
            '<div class="user-img">',
                /* 只能用isUser的真假来判断，因为handlebars不支持 if 的 === 判断 */
                //'<a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}" title="{{nickname}}">',
                '<a target="_blank" href="./user-xxx.htm" title="{{nickname}}">',
                    '<img src="{{avatar_src}}" alt="{{nickname}}">',
                '</a>',
            '</div>',
            '<div class="info">',
                //'<a class="nick" target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}">{{nickname}}</a>',
                '<a class="nick" target="_blank" href="./user-xxx.htm">{{nickname}}</a>',
                '<p class="signature">{{signature}}</p>',
            '</div>',
        '</div>',
        '<ul class="relation-info">',
            '{{#if isUser}}',
            //'<li><a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}/followings">关注&nbsp;&nbsp;<em>{{following_count}}</em></a></li>',
            '<li><a target="_blank" href="./user-xxx-following.htm">关注&nbsp;&nbsp;<em>{{following_count}}</em></a></li>',
            '{{/if}}',
            //'<li><a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}/followers">粉丝&nbsp;&nbsp;<em>{{fans_count}}</em></a></li>',
            '<li><a target="_blank" href="./user-xxx-follower.htm">粉丝&nbsp;&nbsp;<em>{{fans_count}}</em></a></li>',
            //'<li class="last"><a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}/images">上传&nbsp;&nbsp;<em>{{images_count}}</em></a></li>',
            '<li class="last"><a target="_blank" href="./user-xxx-images-uploaded-vertical.htm">上传&nbsp;&nbsp;<em>{{images_count}}</em></a></li>',
        '</ul>',
        '<div  class="resume">',
            '<p>{{introduction}}</p>',
        '</div>',
        '<div class="relative">',
            '<a class="slim-btn right relation-follow-btn" rel="nofollow" data-action="follow" data-id="{{id}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                /*'<img src="./image/loading-32.gif" class="invisible" width="20px" height="20" style="display: inline-block; margin-right: 6px; margin-top: -1px;">',*/
                '<span>{{#if followed}}已关注{{else}}关注{{/if}}</span>',
            '</a>',
        '</div>',
    '</div>'
].join(' ');

//tag cell
app.tpl.tag = [
    '{{#items}}',
        '<div class="tag-cell left" style="background: rgb({{color}}); background: rgba({{color}},.6)">',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="5" data-id="{{tagId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<p class="name"><a href="./tag-xxx.htm">{{tagName}}</a></p>',
            '<p class="follow-text">关注</p>',
            '<p class="follow-count">{{followCount}}</p>',
        '</div>',
    '{{/items}}'
].join(' ');


//app.namecard构造函数，初始化默认设置
app.NameCard = function() {
    var self = this;

    self.$win = null;            // 窗体
    self.$triggerList = [];        // 触发名片的节点
    self.$card = null;            // 名片容器
    self.$cardContent = null    // 名片内容容器
    self.cardTemplate = ''        // 名片内容模板
    self.myCardTemplate = ''    // 自己的名片内容模板
    self.dataList = {};            // 本页名片数据缓存
    self.apiUrl = app.url.namecard; // '?user_id=123'
    self.showDelay = 300;            // 延时响应
    self.hideDelay = 500;        // 延时隐藏
    // 延时隐藏时间必须大于延时响应时间
    self.hideDelay = (self.hideDelay <= self.showDelay) ? self.showDelay + 100 : self.hideDelay;
    self.isLocked = false;        // 名片的显示锁定

    self.winSize = {            // 窗口大小
        width : 0, height : 0
    };
    self.winScroll = {            // 窗口滚动距离
        left : 0, top : 0
    };
    self.cardSize = {            // 名片的尺寸
        width : 0, height : 0
    };
    self.cardPosition = {        // 名片的位置（相对于Document左上角）
        left : 0, top : 0
    };
    self.cardOffset = {            // 名片的偏移位置（相对于触发对象）
        left : 30, right : 30, top : 10, bottom : 3
    };
    self.trigerSize = {            // 触发对象的尺寸
        width : 0, height : 0
    };
    self.trigerPosition = {        // 触发对象的位置（相对于Document左上角）
        left : 0, top : 0
    };
};

app.NameCard.prototype = {
    init : function(opt) {
        var self = this;

        self.showDelay = opt.showDelay || self.showDelay;
        self.hideDelay = opt.hideDelay || self.hideDelay;
        self.$win = $(window);
        self.winSize = {
            width : self.$win.width(),
            height : self.$win.height()
        };
        self.winScroll = {
            left : self.$win.scrollLeft(),
            top : self.$win.scrollTop()
        };

        self.$win.resize(function(evt) {
            self.winSize = {
                width : self.$win.width(),
                height : self.$win.height()
            };
        });

        self.$win.scroll(function(evt) {
            self.winScroll = {
                left : $(this).scrollLeft(),
                top : $(this).scrollTop()
            };
            // console.log('window.scroll', self.winScroll);
        });

        self.$card = $('<div class="name-card" id="name-card" style="display:none;"></div>');
        self.$cardContent = $('<div class="content"></div>');
        self.$card.append(self.$cardContent);
        $('body').append(self.$card);
        self.cardSize = {
            width : self.$card.outerWidth(),
            height : self.$card.outerHeight()
        };
        // console.log('size', self.cardSize);
        self.$card.mouseover(function(evt) {
            self.isLocked = true;
        }).mouseout(function(evt) {
            self.isLocked = false;
            self.hideCard();
        });


        self.cardTemplate = app.tpl.namecard;

        self.$triggerList = $('[' + opt.triggerType + ']');    // 获取所有带 opt.triggerType 属性的节点
        $('body').on('mouseover', '[' + opt.triggerType + ']', function(evt) {
            var $item = $(this),
                type = parseInt($item.attr('data-type')),
                id = $item.attr(opt.triggerType);

            /* type: 1: user, 2: gallery */
            /* 默认为用户 */
            if (!type) type = 1;
            self.isLocked = true;
            var timer = setTimeout(function() {
                if (self.isLocked) {
                    self.trigerSize = {
                        width : $item.outerWidth(),
                        height : $item.outerHeight()
                    };
                    // console.log('item', size);
                    self.trigerPosition = $item.offset();
                    self.readData(id, type);
                    self.showCard();
                }
            }, self.showDelay);
        }).on('mouseout', '[' + opt.triggerType + ']', function(evt) {
            self.isLocked = false;
            self.hideCard();
        });
    },

    // 从本页缓存中读取数据
    /* type: 1: user, 2: gallery */
    readData : function(id, type) {
        var self = this, 
            data;

        if (type === 1) data = self.dataList['user_' + id];
        else if (type === 2) data = self.dataList['gallery_' + id];

        if (data) {
            self.initCardContent(data);
        } else {
            self.getData(id, type);
        }
    },

    /* type: 1: user, 2: gallery */
    getData : function(id, type) {
        var self = this;

        $.getJSON(self.apiUrl, {
            id : id, 
            type: type/*,
            _xiamitoken:_xiamitoken*/
        }, function(rsp) {
            if (rsp.status == 1) {
                var data = rsp.data;
                
                self.getDataCallback(data, type);
            }
        });
    },
    //取回数据后缓存
    getDataCallback : function(data, type) {
        var self = this, typeText;

        if ( type === 1) typeText = 'user';
        else if ( type === 2) typeText = 'gallery';

        if (!self.dataList[typeText + '_' + data.id]) {
            self.dataList[typeText + '_' + data.id] = data;
            self.showCard(data);
            self.initCardContent(data);
        }
    },

    showCard : function() {
        var self = this;
        var className = '';

        if (self.winSize.width - self.trigerPosition.left > self.cardSize.width) {    // 在右边显示
            className += 'r';
            self.cardPosition.left = self.trigerPosition.left - self.cardOffset.left;
        } else {    // 在左边显示
            className += 'l';
            self.cardPosition.left = self.trigerPosition.left + self.trigerSize.width - self.cardSize.width + self.cardOffset.right;
        }

        //self.trigerPosition.top 相对于文档
        if (self.trigerPosition.top - self.winScroll.top > self.cardSize.height) {    // 在上方显示
            className += 't';
            self.cardPosition.top = self.trigerPosition.top - self.cardSize.height - self.cardOffset.top;
        } else {    // 在上方显示
            className += 'b';
            self.cardPosition.top = self.trigerPosition.top + self.trigerSize.height + self.cardOffset.bottom;
        }

        self.$card.removeClass('name-card-rt');
        self.$card.removeClass('name-card-rb');
        self.$card.removeClass('name-card-lt');
        self.$card.removeClass('name-card-lb');
        self.$card.addClass('name-card-' + className);
        self.$card.css({
            left : self.cardPosition.left,
            top : self.cardPosition.top
        });
        self.$card.fadeIn(200);
        // self.$card.css('display', '');
    },

    hideCard : function() {
        var self = this;

        var timer = setTimeout(function() {
            if (!self.isLocked) {
                self.$card.fadeOut(100);
                // self.$card.css('display', 'none');
            }
        }, self.hideDelay);
    },

    initCardContent : function(data) {
        var self = this;

        self.$cardContent.html('');
        self.$cardContent.append((Handlebars.compile(self.cardTemplate))(data));
    },
};