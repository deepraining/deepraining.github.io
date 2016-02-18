var app = app || {};


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