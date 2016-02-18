
/* waterfall-list */

;(function( $, window, document, undefined ) {

    'use strict';

    /*
     * defaults
     */
    var $window = $(window),
        pluginName = 'waterfallList',
        defaults = {
            itemCls: 'waterfall-list-item',  // the brick element class
            prefix: 'waterfall-list', // the waterfall elements prefix
            fitWidth: true, // fit the parent element width
            gutterHeight: 10, // the brick element vertical gutter
            cellPadding: 30, //
            align: 'center', // the brick align，'align', 'left', 'right'
            //minRow: 1,  // min rows
            //maxRow: undefined, // max rows, if undefined,max rows is infinite
            maxPage: undefined, // max page, if undefined,max page is infinite
            bufferPixel: -50, // decrease this number if you want scroll to fire quicker
            containerStyle: { // the waterfall container style
                'overflow': 'hidden'
            },
            resizable: true, // triggers layout when browser window is resized
            isFadeIn: false, // fadein effect on loading
            isAnimated: false, // triggers animate when browser window is resized
            animationOptions: { // animation options
            },
            isAutoPrefill: true,  // When the document is smaller than the window, load data until the document is larger
            //checkImagesLoaded: true, // triggers layout when images loaded. Suggest false
            path: undefined, // Either parts of a URL as an array (e.g. ["/popular/page/", "/"] => "/popular/page/1/" or a function that takes in the page number and returns a URL(e.g. function(page) { return '/populr/page/' + page; } => "/popular/page/1/")
            dataType: 'json', // json, jsonp, html
            params: {}, // params,{type: "popular", tags: "travel", format: "json"} => "type=popular&tags=travel&format=json"
            headers: {}, // headers variable that gets passed to jQuery.ajax()

            loadingMsg: '<div style="text-align:center;padding:10px 0; color:#999;"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><br />Loading...</div>', // loading html

            state: {
                isDuringAjax: false,
                isProcessingData: false,
                isResizing: false,
                isPause: false,
                curPage: 1 // cur page
            },

            // callbacks
            callbacks: {
                /*
                 * loading start
                 * @param {Object} loading $('#waterfall-loading')
                 */
                loadingStart: function($loading) {
                    $loading.show();
                    //console.log('loading', 'start');
                },

                /*
                 * loading finished
                 * @param {Object} loading $('#waterfall-loading')
                 * @param {Boolean} isBeyondMaxPage
                 */
                loadingFinished: function($loading, isBeyondMaxPage) {
                    if ( !isBeyondMaxPage ) {
                        $loading.fadeOut();
                        //console.log('loading finished');
                    } else {
                        //console.log('loading isBeyondMaxPage');
                        $loading.remove();
                    }
                },

                /*
                 * loading error
                 * @param {String} xhr , "end" "error"
                 */
                loadingError: function($message, xhr) {
                    $message.html('Data load faild, please try again later.');
                },

                /*
                 * render data
                 * @param {String} data
                 * @param {String} dataType , "json", "jsonp", "html"
                 */
                renderData: function (data, dataType) {
                    var tpl,
                        template;

                    if ( dataType === 'json' ||  dataType === 'jsonp'  ) { // json or jsonp format
                        tpl = $('#waterfall-list-tpl').html();
                        template = Handlebars.compile(tpl);

                        return template(data);
                    } else { // html format
                        return data;
                    }
                }
            },

            debug: false // enable debug
        };

    /*
     * Waterfall-list constructor
     */
    function WaterfallList(element, options) {
        this.$element = $(element);//waterfall container
        this.options = $.extend(true, {}, defaults, options);
        //this.rowsCount = 0; // rows number
        //this.cols = 0; //列数
        this.width = 0;//容器宽
        //this.height = 0;//容器高
        /**
         * 项目的样式数组
         * @example {left: , top: , width: , height: }
         */
        //this.styleQueue = [];
        /**
         * 全局项目的集合
         * @example {src: , width: }
         */
        this.itemsData = [];

        this._init();
    }


    WaterfallList.prototype = {
        constructor: WaterfallList,

        // Console log wrapper
        _debug: function () {
            if ( true !== this.options.debug ) {
                return;
            }

            if (typeof console !== 'undefined' && typeof console.log === 'function') {
                // Modern browsers
                // Single argument, which is a string
                if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
                    console.log( (Array.prototype.slice.call(arguments)).toString() );
                } else {
                    console.log( Array.prototype.slice.call(arguments) );
                }
            } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
                // IE8
                Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
            }
        },


        /*
         * _init
         * @callback {Object Function } and when instance is triggered again -> $element.waterfall()
         */
        _init: function( callback ) {
            var options = this.options,
                path = options.path;

            this._setWidth();//设置容器宽度
            this._initContainer();//初始化容器
            this.reLayout( callback );//重新布局

            if ( !path ) {
                this._debug('Invalid path');
                return;
            }

            // auto prefill
            if ( options.isAutoPrefill ) {
                this._prefill();
            }

            // bind resize
            if ( options.resizable ) {
                this._doResize();
            }

            // bind scroll
            this._doScroll();
        },

        /*
         * init waterfall container
         */
        _initContainer: function() {
            var options = this.options,
                prefix = options.prefix;

            // fix fixMarginLeft bug
            $('body').css({
                overflow: 'auto'
            });


            this.$element.css(this.options.containerStyle).addClass(prefix + '-container');
            this.$element.after('<div id="' + prefix + '-loading">' +options.loadingMsg+ '</div><div id="' + prefix + '-message" style="text-align:center;color:#999;"></div>');

            this.$loading = $('#' + prefix + '-loading');
            this.$message = $('#' + prefix + '-message');
        },


        
        
        /*
         * get items
         */
        _getItems: function( $content ) {
            var $items = $content.filter('.' + this.options.itemCls).css({
                'float': 'left'
            });

            return $items;
        },
        _setWidth: function() {
            this.width = this._getWidth();
        },
        _getWidth: function()  {
            var options = this.options,
                $container = options.fitWidth ?  this.$element.parent() : this.$element,
                containerWidth = $container[0].tagName === 'BODY' ? $container.width() - 20 : $container.width();
            return containerWidth;
        },


        /*
         * layout
         * $content = $('.' + itemCls) @senntyou
         */
        layout: function($content, callback) {
            var self = this,
                options = self.options,
                itemsData = self.itemsData,
                $items = options.isFadeIn ? self._getItems($content).css({ opacity: 0 }).animate({ opacity: 1 }) : self._getItems($content),
                //styleFn = (options.isAnimated && options.state.isResizing) ? 'animate' : 'css',
                //animationOptions = options.animationOptions,
                //cellWidth = options.cellWidth,    
                //cellHeight = options.cellHeight,
                //gutterWidth = options.gutterWidth,
                gutterHeight = options.gutterHeight,
                cellPadding = options.cellPadding,
                align = options.align,
                //rowsIndex = 0,//行数，从1开始
                //lastItemIndex = -1,//每行的最后一个项目的索引，从0开始
                //firstItemIndex = -1,//每行的第一个项目的索引，从0开始
                contaienrW = self.width,//容器宽度
                cols = self.cols,//列数
                //curItemsWidth,//当前行已存在的宽度
                //enough = true,//当前行的图片是否足够
                obj,
                i, j, k, 
                fixMarginLeft = 0,
                itemsLen, //项目总数
                styleLen;//样式的长度

            // append $items
            //this.$element.append($items);

            

            // place items
            for (i = 0, itemsLen = itemsData.length; i < itemsLen; i++) {
                // fixMarginLeft
                if ( align === 'center' ) {
                    fixMarginLeft = (this.$element.width() - itemsData[i].width  - 2 * cellPadding) /2;
                    fixMarginLeft = fixMarginLeft > 0 ? fixMarginLeft : 0;
                } else if ( align === 'left' ) {
                    fixMarginLeft = 0;
                } else if ( align === 'right' ) {
                    fixMarginLeft = this.$element.width() - itemsData[i].width  - 2 * cellPadding;
                }
                $($items[i]).css({/*'width': itemsData[i].width,*/ 'marginLeft': fixMarginLeft, 'marginRight': fixMarginLeft, 'marginBottom': gutterHeight, 'padding': cellPadding});
            }
            //$($items[itemsLen-1]).css({'marginBottom': 0});

            

            
            // update status
            this.options.state.isResizing = false;
            this.options.state.isProcessingData = false;

            // callback
            if ( callback ) {
                callback.call( $items );
            }
        },


        /*
         * relayout
         */
        reLayout: function( callback ) {
            var $content = this.$element.find('.' + this.options.itemCls);

            //this._resetHeight();
            this.layout($content , callback );
        },


        /*
         * prepend
         * @param {json} data
         * @param {Function} callback
         */
        prepend: function(data, callback) {
            this._handleResponse(data, callback, false);
        },

        /*
         * append
         * @param {json} data
         * @param {Function} callback
         */
        append: function(data, callback) {
            this._handleResponse(data, callback);
        },

        /*
         * remove item
         * @param {Number} index
         * @param {Function} callback
         */ 
        removeItems: function(index, callback ) {
            var i, len, $items, $item, idx,
                self = this;
            if (typeof(index) === 'number') {
                self.itemsData.splice(index, 1);
                self.$element.find('.' + self.options.itemCls).eq(index).remove();
            } else if ($.isArray(index)) {
                index = index.sort(function (param1, param2) {
                   var first = parseInt(param1);
                   var second = parseInt(param2);
                   
                   if (first == second)
                      return 0;
                   if (first < second)
                      return -1;
                   else
                      return 1; 
                });
                for (i = 0, len = index.length; i < len; i++) {
                    self.itemsData.splice(index[i]-i, 1);
                    self.$element.find('.' + self.options.itemCls).eq(index[i]-i).remove();
                }
            }
            else {
                $items = self.$element.find(index);
                for (i = 0, len = $items.length; i < len; i++) {
                    $item = $($items[i]);
                    idx = $item.index();
                    self.itemsData.splice(idx-i, 1);
                }
                $items.remove();
            }
            this.reLayout(callback);
        },

     
        /*
         * opts
         * @param {Object} opts
         * @param {Function} callback
         */
        option: function( opts, callback ){
            if ( $.isPlainObject( opts ) ){
                this.options = $.extend(true, this.options, opts);

                if ( typeof callback === 'function' ) {
                    callback();
                }

                // re init
                this._init();
            }
        },

        /*
         * prevent ajax request
         */
        pause: function(callback) {
            this.options.state.isPause = true;

            if ( typeof callback === 'function' ) {
                callback();
            }
        },


        /*
         * resume ajax request
         */
        resume: function(callback) {
            this.options.state.isPause = false;

            if ( typeof callback === 'function' ) {
                callback();
            }
        },

        /**
         * request data
         */
        _requestData: function(callback) {
            var self = this,
                options = self.options,
                maxPage = options.maxPage,
                curPage = options.state.curPage++, // cur page
                path = options.path,
                dataType = options.dataType,
                params = options.params,
                headers = options.headers,
                pageurl;

            if ( maxPage !== undefined && curPage > maxPage ){
                options.state.isBeyondMaxPage = true;
                options.callbacks.loadingFinished(self.$loading, options.state.isBeyondMaxPage);
                return;
            }

            // get ajax url
            pageurl = (typeof path === 'function') ? path(curPage) : path.join(curPage);

            self._debug('heading into ajax', pageurl+$.param(params));

            // loading start
            options.callbacks.loadingStart(self.$loading);

            // update state status
            options.state.isDuringAjax = true;
            options.state.isProcessingData = true;

            // ajax
            $.ajax({
                url: pageurl,
                data: params,
                headers: headers,
                dataType: dataType,
                success: function(data) {
                    self._handleResponse(data, callback);
                    self.options.state.isDuringAjax = false;
                },
                error: function(jqXHR) {
                    self._responeseError('error');
                }
            });
        },


        /**
         * handle response
         * @param {Object} data
         * @param {Function} callback
         * @param boolean isAppend
         */
        _handleResponse: function(data, callback, isAppend) {
            var self = this,
                options = self.options,
                content = $.trim(options.callbacks.renderData(data, options.dataType)),
                $content = $(content),
                checkImagesLoaded = options.checkImagesLoaded,
                i,len;

            if (typeof(isAppend) === "undefined") isAppend = true;

            if (isAppend) {
                for (i = 0, len = data.items.length; i < len; i++) {
                    self.itemsData.push(data.items[i]);
                }
                self.$element.append($content);
            }
            else {
                for (len = data.items.length - 1; len > -1; len--) {
                    self.itemsData.unshift(data.items[i]);
                }
                self.$element.prepend($content);
            }
            if ( !checkImagesLoaded ) {
               //isAppend ? self.$element.append($content) : self.$element.prepend($content);
               self.reLayout(callback);
               self.options.callbacks.loadingFinished(self.$loading, self.options.state.isBeyondMaxPage);
            } else {
                $content.imagesLoaded(function() {
                    //isAppend ? self.$element.append($content) : self.$element.prepend($content);
                    self.reLayout(callback);
                    self.options.callbacks.loadingFinished(self.$loading, self.options.state.isBeyondMaxPage);
                });
            }


        },

        /*
         * reponse error
         */
        _responeseError: function(xhr) {

            this.$loading.hide();
            this.options.callbacks.loadingError(this.$message, xhr);

            if ( xhr !== 'end' && xhr !== 'error' ) {
                xhr = 'unknown';
            }

            this._debug('Error', xhr);
        },


        _nearbottom: function() {
            var self = this,
                options = self.options,
                distanceFromWindowBottomToContainerBottom = $window.scrollTop() + $window.height() - self.$element.offset().top - self.$element.height();

            this._debug('math:', distanceFromWindowBottomToContainerBottom);

            return ( distanceFromWindowBottomToContainerBottom > options.bufferPixel );
        },

        /*
         * prefill
         */
        _prefill: function() {
            if ( this.$element.height() <= $window.height() ) {
                this._scroll();
            }
        },

        /*
         * _scroll
         */
        _scroll: function() {
            var self = this,
                options = self.options,
                state = options.state;

            if ( state.isProcessingData || state.isDuringAjax || state.isInvalidPage || state.isPause ) {
                return;
            }

            if ( !this._nearbottom() ) {
                return;
            }

            this._requestData(function() {
                var timer = setTimeout(function() {
                    self._scroll();
                }, 100);
            });
        },


        /*
         * do scroll
         */
        _doScroll: function() {
            var self = this,
                scrollTimer;

            $window.bind('scroll', function() {
                if ( scrollTimer ) {
                    clearTimeout(scrollTimer);
                }

                scrollTimer = setTimeout(function() {
                    //self._debug('event', 'scrolling ...');
                    self._scroll();
                }, 100);
            });
        },


        /*
         * resize
         */
        _resize: function() {
            var width = this.width,
                newWidth = this._getWidth(); // new width


            if ( newWidth !== width ) {
                //this._debug('event', 'resizing ...');
                this.options.state.isResizing = true;
                this.width = newWidth; // update columns
                this.reLayout(); // relayout
                this._prefill(); // prefill
            }
        },


        /*
         * do resize
         */
        _doResize: function() {
            var self = this,
                resizeTimer;

            $window.bind('resize', function() {
                if ( resizeTimer ) {
                    clearTimeout(resizeTimer);
                }

                resizeTimer = setTimeout(function() {
                    self._resize();
                }, 100);
            });
        }
    };


    $.fn[pluginName] = function(options) {
        if ( typeof options === 'string' ) { // plugin method
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function() {
                var instance = $.data( this, 'plugin_' + pluginName );

                if ( !instance ) {
                    instance._debug('instance is not initialization');
                    return;
                }

                if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) { //
                    instance._debug( 'no such method "' + options + '"' );
                    return;
                }

                //  apply method
                instance[options].apply( instance, args );
            });
        } else { // new plugin
            this.each(function() {
                if ( !$.data(this, 'plugin_' + pluginName) ) {
                    $.data(this, 'plugin_' + pluginName, new WaterfallList(this, options));
                }
            });
        }

        return this;
    };

}( jQuery, window, document ));

