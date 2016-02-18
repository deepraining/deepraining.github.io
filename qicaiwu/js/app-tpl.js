var app = app || {};

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
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 只选择用于批处理(通常 批处理)
app.tpl.image_vertical_only_with_select  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 编辑按钮和删除按钮(专辑列表，上传的图片)
app.tpl.image_vertical_with_edit  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 选择用于批处理 编辑按钮，删除按钮(专辑列表 批处理)
app.tpl.image_vertical_with_select_and_edit  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}}, 1);return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="1" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 删除按钮(精选集列表)
app.tpl.image_vertical_with_delete  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 选择用于批处理 删除按钮(精选集列表 批处理)
app.tpl.image_vertical_with_select_and_delete  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 编辑按钮和删除按钮(收藏的图片 编辑标签)
app.tpl.image_vertical_with_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 垂直 选择用于批处理 编辑按钮，删除按钮(收藏的图片 编辑标签 批处理)
app.tpl.image_vertical_with_select_and_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="1" style="position: absolute; width: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="2" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 只选择用于批处理
app.tpl.image_block_only_with_select  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 编辑按钮和删除按钮
app.tpl.image_block_with_edit  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 选择用于批处理  编辑按钮和删除按钮
app.tpl.image_block_with_select_and_edit  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
                '<img src="{{thumbnailSrc}}" width="236px">',
            '</a>',
            '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
            '<div class="overlay"></div>',
            '<div class="select"><i class="icon icon-select"></i></div>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="3" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            '<div class="details">',
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 删除按钮
app.tpl.image_block_with_delete  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 选择用于批处理  删除按钮
app.tpl.image_block_with_select_and_delete  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 编辑按钮和删除按钮
app.tpl.image_block_with_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');

//图片 方块 选择用于批处理  编辑按钮和删除按钮
app.tpl.image_block_with_select_and_edit_tag  = [
    '{{#items}}',
        '<div class="image-cell only-with-select" data-id="{{imageId}}" data-type="1" data-waterfall="3" style="width: 236px; height: 236px;">',
            '<a class="img" href="/image/{{imageId}}">',
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
                '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
            '</div>',
        '</div>',
    '{{/items}}'
].join(' ');


//图片 列表(不能用于批处理，因为包含了 image_cell，无法做到批处理)
app.tpl.image_list = [
    '{{#items}}',
        '<div class="image-list" data-id="{{imageId}}" data-type="1" data-waterfall="4" style="float: left;">',
            '<div class="image-cell">',
                '<a class="img" href="/image/{{imageId}}">',
                    '<img src="{{thumbnailSrc}}">',
                '</a>',
                '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                    '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '</div>',
                '<div class="details">',
                    '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="/image/{{imageId}}" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="/user/{{authorId}}" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
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
                '<a class="img" href="/image/{{imageId}}">',
                    '<img src="{{thumbnailSrc}}" width="236px">',
                '</a>',
                '<div class="cover intense-image" data-image="{{intenseImageSrc}}" data-title="{{imageTitle}}  -  {{authorName}}"></div>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="1" data-id="{{imageId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{imageId}});return !1;"><i class="icon icon-fullscreen"></i></a>',
                    '<a class="button" title="添加到精选集" onclick="addToCollection({{imageId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="编辑" href="/image/{{imageId}}/edit"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete" data-type="1" data-waterfall="4" data-id="{{imageId}}"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                '<div class="details">',
                    '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="/image/{{imageId}}" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="/user/{{authorId}}" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
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
                '<a class="img" href="/image/{{imageId}}">',
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
                    '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="/image/{{imageId}}" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="/user/{{authorId}}" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
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
                '<a class="img" href="/image/{{imageId}}">',
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
                    '<div class="title"><a href="/image/{{imageId}}" class="" title="{{imageTitle}}">{{imageTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                '</div>',
            '</div>',
            '<div class="info">',
                /*'<div class="imageTitle">',
                    '<a href="/image/{{imageId}}" class="image-list-title">{{imageTitle}}</a>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<a href="/user/{{authorId}}" data-name-card="{{authorId}}" class="image-list-author">{{authorName}}</a>',
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
                '<a class="img" href="/album/{{albumId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="img" href="/album/{{albumId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="添加到画廊" onclick="addToGallery({{albumId}});return !1;"><i class="icon icon-add-to"></i></a>',
                    '<a class="button" title="编辑" href="/album/{{albumId}}/edit"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="img" href="/album/{{albumId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="img" href="/album/{{albumId}}">',
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
                    '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>专辑</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
            '<a class="img" href="/album/{{albumId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/album/{{albumId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="添加到画廊" onclick="addToGallery({{albumId}});return !1;"><i class="icon icon-add-to"></i></a>',
                '<a class="button" title="编辑" href="/album/{{albumId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/album/{{albumId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="2" data-id="{{albumId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{albumId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{albumId}}" data-type="2" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/album/{{albumId}}">',
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
                '<div class="title"><a href="/album/{{albumId}}" class="" title="{{albumTitle}}">{{albumTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<a class="img" href="/collection/{{collectionId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="img" href="/collection/{{collectionId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="编辑" href="/collection/{{collectionId}}/edit"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="img" href="/collection/{{collectionId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="img" href="/collection/{{collectionId}}">',
                    '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
                '</a>',
                '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
                '<div class="buttons">',
                    '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                    '<a class="button" title="编辑标签" onclick="editTag({{collectionId}}, 3)"><i class="icon icon-edit-small"></i></a>',
                    '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="1"><i class="icon icon-delete-small"></i></a>',
                '</div>',
                
                '<div class="details">',
                    '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                    '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
                    '<div class="images-count"><span>{{imagesCount}}</span></div>',
                    '<div class="album-collection-mark"><span>精选集</span></div>',
                '</div>',
            '</div>',
            '<div class="content">',
                '{{#thumbnails}}',
                '<div class="{{#if ../typeLarge}}item-large{{else}}item{{/if}}">',
                    '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
            '<a class="img" href="/collection/{{collectionId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/collection/{{collectionId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="编辑" href="/collection/{{collectionId}}/edit"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/collection/{{collectionId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
            '<a class="img" href="/collection/{{collectionId}}">',
                '<img src="{{thumbnailSrc}}" width="200px" height="200px">',
            '</a>',
            '<div class="like" title="{{#if liked}}取消收藏{{else}}收藏{{/if}}" data-action="like" data-type="3" data-id="{{collectionId}}" data-result="{{#if liked}}1{{else}}0{{/if}}"><i class="icon icon-like {{#if liked}}active{{/if}}"></i></div>',
            '<div class="buttons">',
                '<a class="button" title="全屏浏览" onclick="play({{collectionId}}, 2);return !1;"><i class="icon icon-expand"></i></a>',
                '<a class="button" title="编辑标签" onclick="editTag({{collectionId}}, 3)"><i class="icon icon-edit-small"></i></a>',
                '<a class="button" title="删除" data-action="delete"  data-id="{{collectionId}}" data-type="3" data-waterfall="2"><i class="icon icon-delete-small"></i></a>',
            '</div>',
            
            '<div class="details">',
                '<div class="title"><a href="/collection/{{collectionId}}" class="" title="{{collectionTitle}}">{{collectionTitle}}</a></div>',
                '<div class="author"><a href="/user/{{authorId}}" class="" title="{{authorName}}" data-name-card="{{authorId}}">{{authorName}}</a></div>',
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
                '<a href="/gallery/{{galleryId}}"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="/gallery/{{galleryId}}" class="name" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>粉丝：</span> <span>{{fansCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>画廊拥有者：</span> <a href="/user/{{ownerId}}" data-name-card="{{ownerId}}" data-type="1">{{ownerName}}</a></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="" href="/gallery/{{galleryId}}"><img width="100px" height="100px" src="{{thumbnailSrc}}"></a>',
            '</div>',
            '<div class="info">',
                '<p><a class="" href="/gallery/{{galleryId}}" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a></p>',
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
                '<a href="/gallery/{{galleryId}}"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{galleryId}}, 4)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="/gallery/{{galleryId}}" class="name" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>粉丝：</span> <span>{{fansCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>画廊拥有者：</span> <a href="/user/{{ownerId}}" data-name-card="{{ownerId}}" data-type="1">{{ownerName}}</a></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a class="" href="/gallery/{{galleryId}}"><img width="100px" height="100px" src="{{thumbnailSrc}}"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{galleryId}}, 4)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="info">',
                '<p><a class="" href="/gallery/{{galleryId}}" data-name-card="{{galleryId}}" data-type="2">{{galleryName}}</a></p>',
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
                '<a href="/user/{{userId}}"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="/user/{{userId}}" class="name" data-name-card="{{userId}}">{{userName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>关注：</span> <span>{{followingCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>粉丝：</span> <span>{{fansCount}}</span></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a href="/user/{{userId}}"><img width="180px" height="180px" src="{{thumbnailSrc}}"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{userId}}, 5)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="content">',
                '<p>',
                    '<a href="/user/{{userId}}" class="name" data-name-card="{{userId}}">{{userName}}</a>',
                    '<a class="slim-btn mgl20" data-action="follow" data-id="{{galleryId}}" data-type="{{#if isUser}}1{{else}}2{{/if}}" data-result="{{#if followed}}1{{else}}0{{/if}}" title="{{#if followed}}取消关注{{else}}加关注{{/if}}">',
                        '<i class="icon {{#if followed}}icon-followed-small{{else}}icon-follow-small{{/if}}" style="margin-right: 6px; margin-top: -1px;"></i>',
                        '<span style="font-size: 12px;">{{#if followed}}已关注{{else}}关注{{/if}}</span>',
                    '</a>',
                '</p>',
                '<p style="font-size: 13px;"><span>关注：</span> <span>{{followingCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>粉丝：</span> <span>{{fansCount}}</span></p>',
                
                '<div class="items">',
                    '{{#thumbnails}}',
                    '<div class="item">',
                        '<a href="/image/{{imageId}}" class="" title="{{title}}">',
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
                '<a href="/user/{{userId}}"><img src="{{thumbnailSrc}}" width="75px" height="75px" class="gravatar img-rounded"></a>',
            '</div>',
            '<div class="user-cell-container">',
                '<h5 class="user-cell-name"><a href="/user/{{userId}}" data-name-card="{{userId}}">{{userName}}</a></h5>',
                '<ul class="fs13 overflow-hidden mgt10 mgb10">',
                    '<li class="left mgr20">',
                        '<span class="mgr5 color999">粉丝</span><a href="/user/{{userId}}/followers" class="color-01a0d8"><span>{{fansCount}}</span></a>',
                    '</li>',
                    '<li class="left">',
                        '<span class="mgr5 color999">关注</span><a href="/user/{{userId}}/following" class="color-01a0d8"><span>{{followingCount}}</span></a>',
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
                '<a href="/user/{{userId}}"><img src="{{thumbnailSrc}}" width="75px" height="75px" class="gravatar img-rounded"></a>',
                '<div class="edit" title="编辑标签" onclick="editTag({{userId}}, 5)"><i class="icon icon-edit-small"></i></div>',
            '</div>',
            '<div class="user-cell-container">',
                '<h5 class="user-cell-name"><a href="/user/{{userId}}" data-name-card="{{userId}}">{{userName}}</a></h5>',
                '<ul class="fs13 overflow-hidden mgt10 mgb10">',
                    '<li class="left mgr20">',
                        '<span class="mgr5 color999">粉丝</span><a href="/user/{{userId}}/followers" class="color-01a0d8"><span>{{fansCount}}</span></a>',
                    '</li>',
                    '<li class="left">',
                        '<span class="mgr5 color999">关注</span><a href="/user/{{userId}}/following" class="color-01a0d8"><span>{{followingCount}}</span></a>',
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
                '<a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}" title="{{nickname}}">',
                    '<img src="{{avatar_src}}" alt="{{nickname}}">',
                '</a>',
            '</div>',
            '<div class="info">',
                '<a class="nick" target="_blank" href="#">{{nickname}}</a>',
                '<p class="signature">{{signature}}</p>',
            '</div>',
        '</div>',
        '<ul class="relation-info">',
            '{{#if isUser}}',
            '<li><a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}/followings">关注&nbsp;&nbsp;<em>{{following_count}}</em></a></li>',
            '{{/if}}',
            '<li><a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}/followers">粉丝&nbsp;&nbsp;<em>{{fans_count}}</em></a></li>',
            '<li class="last"><a target="_blank" href="/{{#if isUser}}user{{else}}gallery{{/if}}/{{id}}/images">上传&nbsp;&nbsp;<em>{{images_count}}</em></a></li>',
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
            '<p class="name"><a href="/tag/{{tagId}}">{{tagName}}</a></p>',
            '<p class="follow-text">关注</p>',
            '<p class="follow-count">{{followCount}}</p>',
        '</div>',
    '{{/items}}'
].join(' ');
