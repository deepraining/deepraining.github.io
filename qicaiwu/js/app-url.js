var app = app || {};


/* 全局 ajax url */
app.url = app.url || {};
/* 根地址 */
app.url.base = './server/';
/**
 * 收藏请求(图片，专辑，精选集)
 * format: 
 */
app.url.like_request = app.url.base + 'like_image.json';
/**
 * 收藏确定
 * format: 
 */
app.url.like_submit = app.url.base + 'like_image_submit.json';
/**
 * 取消收藏
 * format: 
 */
app.url.unlike = app.url.base + 'like_image_submit.json';

/**
 * 添加到精选集请求
 * format: 
 */
app.url.add_to_collection_request = app.url.base + 'add_to_collection.json';
/**
 * 快捷创建精选集
 * format:
 */
app.url.add_to_collection_create = app.url.base + 'create_collection.json';
/**
 * 添加到精选集确定
 * format: 
 */
app.url.add_to_collection_submit = app.url.base + 'add_to_collection_submit.json';

/**
 * 添加到专辑请求
 * format: 
 */
app.url.add_to_album_request = app.url.base + 'add_to_album.json';
/**
 * 快捷创建专辑
 * format:
 */
app.url.add_to_album_create = app.url.base + 'create_album.json';
/**
 * 添加到专辑确定
 * format:
 */
app.url.add_to_album_submit = app.url.base + 'add_to_album_submit.json';
/**
 * 添加到画廊请求
 * format: 
 */
app.url.add_to_gallery_request = app.url.base + 'add_to_gallery.json';
/**
 * 添加到画廊确定
 * format:
 */
app.url.add_to_gallery_submit = app.url.base + 'add_to_gallery_submit.json';
/**
 * 编辑标签(图片，专辑，精选集)
 * format: 
 */
app.url.edit_tag_request = app.url.base + 'edit_tag.json';
/**
 * 编辑标签
 * format: 
 */
app.url.edit_tag_submit = app.url.base + 'edit_tag_submit.json';
/**
 * 播放器项目请求
 * format:
 */
app.url.request_player_images = app.url.base + 'player.json';
/**
 * 举报
 * format:
 */
app.url.report = app.url.base + 'like_image_submit.json';
/**
 * 我的标签
 * format:
 */
app.url.return_my_tags = app.url.base + 'images_tags.json';
/**
 * 关注
 * format:
 */
app.url.follow = app.url.base + 'relation_follow.json';
/**
 * 取消关注
 * format:
 */
app.url.unfollow = app.url.base + 'relation_unfollow.json';
/**
 * 评论
 * format:
 */
app.url.comment_request = app.url.base + 'comment.json';
/**
 * 删除评论
 * format:
 */
app.url.comment_delete = app.url.base + 'like_image_submit.json';
/**
 * 赞评论
 * format:
 */
app.url.comment_star = app.url.base + 'like_image_submit.json';
/**
 * 提交评论
 * format:
 */
app.url.comment_submit = app.url.base + 'comment_submit.json';
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
app.url.album_description = app.url.base + 'album_description.json';
/**
 * 专辑标签
 * format:
 */
app.url.album_tags = app.url.base + 'album_tag.json';
/**
 * 删除
 * format: 
 */
app.url.delete = app.url.base + 'like_image_submit.json';


