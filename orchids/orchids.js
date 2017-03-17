/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var orchids = {};

	var app = __webpack_require__(5);

	// for debug
	//orchids.app = app;

	orchids.init = app.init;
	orchids.registerPage = app.registerPage;
	orchids.registerDialog = app.registerDialog;
	orchids.registerFragment = app.registerFragment;
	orchids.startPage = app.startPage;
	orchids.startPageForResult = app.startPageForResult;
	orchids.startDialog = app.startDialog;
	orchids.startDialogForResult = app.startDialogForResult;
	orchids.back = app.back;
	orchids.start = app.start;

	orchids.getPage = app.getPageById;
	orchids.getDialog = app.getDialogById;
	orchids.getCurrentPage = app.getCurrentPageInstance;
	orchids.getCurrentDialog = app.getCurrentDialogInstance;

	window.orchids = orchids;

	module.exports = orchids;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.26.1@css-loader/index.js!./orchids.css", function() {
				var newContent = require("!!./../../node_modules/.0.26.1@css-loader/index.js!./orchids.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".orchids {\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n.orchids:before,\r\n.orchids:after {\r\n    box-sizing: border-box;\r\n}\r\n.orchids-page,\r\n.orchids-dialog {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #ffffff;\r\n    overflow: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n    z-index: 1;\r\n}\r\n.orchids-dialog {\r\n    z-index: 2;\r\n}\r\n/* animation */\r\n.orchids-page.orchids-with-animation,\r\n.orchids-dialog.orchids-with-animation {\r\n    transition: all .5s;\r\n    opacity: 0;\r\n}\r\n.orchids-page.orchids-with-animation.orchids-active,\r\n.orchids-dialog.orchids-with-animation.orchids-active {\r\n    opacity: 1;\r\n}\r\n.orchids-page.orchids-horizontal,\r\n.orchids-dialog.orchids-horizontal {\r\n    transform: translateX(100%);\r\n}\r\n.orchids-page.orchids-horizontal.orchids-active,\r\n.orchids-dialog.orchids-horizontal.orchids-active {\r\n    transform: translateX(0);\r\n}\r\n.orchids-page.orchids-vertical,\r\n.orchids-dialog.orchids-vertical {\r\n    transform: translateY(100%);\r\n}\r\n.orchids-page.orchids-vertical.orchids-active,\r\n.orchids-dialog.orchids-vertical.orchids-active {\r\n    transform: translateY(0);\r\n}\r\n\r\n/* fragment */\r\n.orchids-fragment {\r\n    position: absolute;\r\n    background: #ffffff;\r\n    overflow: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n    z-index: 1;\r\n}\r\n.orchids-fragment.orchids-horizontal {\r\n    top: 0;\r\n    height: 100%;\r\n}\r\n.orchids-fragment.orchids-vertical {\r\n    left: 0;\r\n    width: 100%;\r\n}\r\n.orchids-fragments-container,\r\n.orchids-sub-fragments-container{\r\n    position: absolute;\r\n    overflow: hidden;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n.orchids-fragments-container.orchids-with-animation,\r\n.orchids-sub-fragments-container.orchids-with-animation {\r\n    transition: all .5s;\r\n}\r\n.orchids-fragments-container.orchids-horizontal,\r\n.orchids-sub-fragments-container.orchids-horizontal {\r\n    height: 100%;\r\n    transform: translateX(0);\r\n}\r\n.orchids-fragments-container.orchids-vertical,\r\n.orchids-sub-fragments-container.orchids-vertical {\r\n    width: 100%;\r\n    transform: translateY(0);\r\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * app singleton instance
	 * @type {{}}
	 */
	var app = {
	    // app singleton default option
	    option: {
	        /**
	         * background of root element
	         */
	        backgroundColor: '#ffffff',
	        /**
	         * start page with route or not
	         * if set to true, the url will be changed when a page is started
	         * like: url?orchidsPage=pageName&orchidsOption=serializedData
	         */
	        route: !1,
	        /**
	         * whether to use animation when switch between pages
	         * default: true
	         */
	        animate: !0,
	        /**
	         * animation direction of switching page
	         * horizontal/vertical, default: horizontal
	         */
	        animateDirection: 'horizontal',
	        /**
	         * whether to use animation when switch between fragments
	         * default: true
	         */
	        fragmentAnimate: !0,
	        /**
	         * animation direction of switching fragment
	         * horizontal/vertical, default: horizontal
	         */
	        fragmentAnimateDirection: 'horizontal'
	    },
	    // default dialog option
	    defaultDialogOption: {
	        /**
	         * background of root element
	         */
	        backgroundColor: '#ffffff',
	        /**
	         * whether to use animation when switch between pages
	         * default: true
	         */
	        animate: !0,
	        /**
	         * animation direction of switching page
	         * horizontal/vertical, default: horizontal
	         */
	        animateDirection: 'vertical',
	        /**
	         * whether current dialog is singleton or not
	         */
	        singleton: !0
	    },
	    // default fragment option
	    defaultFragmentOption: {
	        /**
	         * background of root element
	         */
	        backgroundColor: '#ffffff',
	        /**
	         * whether to use animation when switch between sub fragments
	         * default: true
	         */
	        subFragmentAnimate: !0,
	        /**
	         * animation direction of switching sub fragment
	         * horizontal/vertical, default: horizontal
	         */
	        subFragmentAnimateDirection: 'horizontal'
	    }
	};


	var util = __webpack_require__(6),
	    page = __webpack_require__(7),
	    dialog = __webpack_require__(9),
	    fragment = __webpack_require__(10),
	    container = __webpack_require__(8);

	app.pages = container.pages;
	app.pagesAttributes = container.pagesAttributes;
	app.pagesInstances = container.pagesInstances;
	app.dialogs = container.dialogs;
	app.dialogsAttributes = container.dialogsAttributes;
	app.dialogsInstances = container.dialogsInstances;
	app.dialogsSingletonInstances = container.dialogsSingletonInstances;
	app.fragments = container.fragments;
	app.fragmentsAttributes = container.fragmentsAttributes;

	    /**
	     * total page count of current app
	     * @type {number}
	     */
	    var pageCount = 0,
	        dialogCount = 0;
	/**
	 * initialize app
	 */
	app.init = function(option) {
	    util.extend(true, app.option, option || {});
	};
	/**
	 * on pop state
	 * @param event
	 */
	app.onpopstate = function (event) {
	    var dialogInstance,
	        prevDialogInstance,
	        pageInstance,
	        i, il, dialogsInstancesKeys;

	    // if user page back by press back button of phone, close all dialogs first
	    dialogsInstancesKeys = Object.keys(app.dialogsInstances);
	    if (!!dialogsInstancesKeys.length) {
	        for (il = dialogsInstancesKeys.length, i = il - 1; i >= 0; i--) {
	            // first dialog
	            i <= 0 ? (
	                pageInstance = app.getCurrentPage(),
	                    dialogInstance = app.dialogsInstances[dialogsInstancesKeys[i]],
	                    dialogInstance.forResult && !!pageInstance.page.onPageResult && pageInstance.page.onPageResult(dialogInstance.dialog.__orchids__result || {}),
	                    // destroy
	                    dialogInstance.dialog.__orchids__destroy(),
	                    app.deleteCurrentDialog()
	            ) : (
	                // at least two dialogs
	                prevDialogInstance = app.dialogsInstances[dialogsInstancesKeys[i - 1]],
	                    dialogInstance = app.dialogsInstances[dialogsInstancesKeys[i]],
	                    dialogInstance.forResult && !!prevDialogInstance.dialog.onDialogResult && prevDialogInstance.dialog.onDialogResult(dialogInstance.dialog.__orchids__result || {}),
	                    // destroy
	                    dialogInstance.dialog.__orchids__destroy(),
	                    app.deleteCurrentDialog()
	            );
	        }
	    }
	    app.pageBack();
	};
	/**
	 * start current application
	 * if current url has orchidsPage parameter, it'will start the "orchidsPage" specified page, not the page "pageName"
	 *
	 * @param pageName
	 * @param data Data to initialize a Page, and will be use by onCreate method
	 */
	app.start = function (pageName, data) {
	    var params = (function () {
	            var params = {};
	            !!location.search && (
	                location.search.slice(1).split('&').map(function (item) {
	                    params[item.split('=')[0]] = item.split('=')[1]
	                })
	            );
	            return params;
	        })(),
	        orchidsPage,
	        orchidsData;


	    // if user call back page by phone button, keep it
	    // here we do not consider other action, like forward, refresh, for this is main for wechat webapp using
	    window.onpopstate = app.onpopstate;

	    // tell the first page and option by the parameter
	    if (!!params.orchidsPage) {
	        orchidsPage = decodeURIComponent(params.orchidsPage);
	        try {
	            orchidsData = JSON.parse(decodeURIComponent(params.orchidsData));
	        } catch (e) {
	            orchidsData = {};
	        }

	        app.startPage(orchidsPage, orchidsData);
	        return;
	    }

	    app.startPage(pageName, data);

	};
	/**
	 * initialize a Page and show it
	 * @param pageName The name of a Page Object
	 * @param data Data to initialize a Page, and will be use by onCreate method
	 * @param forResult Whether current page is initialized by startPageForResult or not
	 * @param prepareResultData Parameter to be used by the next page's prepareForResult method
	 */
	app.startPageInner = function (pageName, data, forResult, prepareResultData) {
	    var pageObject = app.pages[pageName], // the Page Object
	        option, // Page option
	        instance, // instance of page
	        prevPageInstance;

	    // has dialog active
	    if (Object.keys(app.dialogsInstances).length >= 1) {
	        console.error('Current application has dialog present, please close it and then start another page.');
	        return;
	    }

	    if (!pageObject) {
	        console.error('The Page "' + pageName + '" you called is not registered, please register it before initialize.');
	        return;
	    }

	    // call prev page's __orchids__hide method
	    prevPageInstance = app.getCurrentPage();
	    !!prevPageInstance && prevPageInstance.page.__orchids__hide();

	    option = util.extend(true, {}, pageObject.option);
	    // pageId
	    option.pageId = ++pageCount;
	    // route
	    option.route = app.option.route;
	    instance = new pageObject.page(option, data || {});
	    forResult && instance.prepareForResult(prepareResultData);
	    app.pagesInstances[option.pageId] = {
	        name: pageName,
	        forResult: !!forResult,
	        page: instance
	    };
	};

	/**
	 * start a page
	 * @param pageName
	 * @param data Parameter to use by new page's onCreate method
	 */
	app.startPage = function (pageName, data) {
	    app.startPageInner(pageName, data, !1)
	};
	/**
	 * start a page for result
	 * @param pageName
	 * @param data Parameter to use by new page's onCreate method
	 * @param prepareResultData Parameter to be used by the next page's prepareForResult method
	 */
	app.startPageForResult = function (pageName, data, prepareResultData) {
	    app.startPageInner(pageName, data, !0, prepareResultData)
	};

	/**
	 * initialize a Dialog and show it
	 * @param dialogName The name of a Dialog Object
	 * @param data Data to initialize a Dialog, and will be use by onCreate method
	 * @param forResult Whether current dialog is initialized by startDialogForResult or not
	 * @param prepareResultData Parameter to be used by the next dialog's prepareForResult method
	 */
	app.startDialogInner = function (dialogName, data, forResult, prepareResultData) {
	    var dialogObject = app.dialogs[dialogName], // the Dialog Object
	        option, // Dialog option
	        instance, // instance of dialog
	        existedSingletonInstance; //

	    if (!dialogObject) {
	        console.error('The Dialog "' + dialogName + '" you called is not registered, please register it before initialize.');
	        return;
	    }

	    // singleton
	    if (dialogObject.option.singleton) {
	        Object.keys(app.dialogsInstances).map(function (id) {
	            var dialog = app.dialogsInstances[id];
	            if (dialog.name == dialogName) {
	                existedSingletonInstance = dialog;
	                return !1;
	            }
	        });
	        if (!!existedSingletonInstance) {
	            console.error('The Dialog "' + dialogName + '" is singleton, and is active in current application, please do not use it twice');
	            return;
	        }
	        Object.keys(app.dialogsSingletonInstances).map(function (name) {
	            var singletonInstance;
	            if (name == dialogName) {
	                singletonInstance = app.dialogsSingletonInstances[name];
	                // update forResult and active attribute
	                instance = singletonInstance;
	                return !1;
	            }
	        });
	        if (!!instance) {
	            app.dialogsInstances[instance.id] = {
	                name: dialogName,
	                forResult: !!forResult,
	                dialog: instance.dialog
	            };
	            forResult ? instance.dialog.__orchids__show(!0, prepareResultData) : instance.dialog.__orchids__show();
	            return;
	        }
	    }


	    option = util.extend(true, {}, dialogObject.option);
	    // dialogId
	    option.dialogId = ++dialogCount;

	    instance = new dialogObject.dialog(option, data || {});
	    forResult && instance.prepareForResult(prepareResultData);

	    dialogObject.option.singleton && (
	        app.dialogsSingletonInstances[dialogName] = {
	            id: option.dialogId,
	            dialog: instance
	        }
	    );

	    app.dialogsInstances[option.dialogId] = {
	        name: dialogName,
	        forResult: !!forResult,
	        dialog: instance
	    };
	};

	/**
	 * start a dialog
	 * @param dialogName
	 * @param data Parameter to use by new dialog's onCreate method
	 */
	app.startDialog = function (dialogName, data) {
	    app.startDialogInner(dialogName, data, !1)
	};
	/**
	 * start a dialog for result
	 * @param dialogName
	 * @param data Parameter to use by new dialog's onCreate method
	 * @param prepareResultData Parameter to be used by the next dialog's prepareForResult method
	 */
	app.startDialogForResult = function (dialogName, data, prepareResultData) {
	    app.startDialogInner(dialogName, data, !0, prepareResultData)
	};

	/**
	 * register a Page Object
	 * @param pageName New name of new Page Object
	 * @param extendAttributes Attributes to be extended to new Page Object
	 *     attributes to use
	 *     {
	 *         id, // current page id
	 *         el, // current page root element
	 *         option // current page option
	 *     }
	 *     methods to override
	 *     {
	 *         // render a page after a page is initialized
	 *         onCreate: function(){},
	 *         // pre handle before destroy a page
	 *         onDestroy: function() {},
	 *         // called when back page from other page
	 *         onShow: function () {},
	 *         // called when start another page
	 *         onHide: function () {},
	 *         // called when the child page destroyed and return the value by setResult method.
	 *         onPageResult: function(data) {},
	 *         // receive data from the previous page, startPageForResult method's second parameter
	 *         prepareForResult: function(data) {}
	 *     }
	 *     methods to call
	 *     {
	 *         // set the result if this page is called by startPageForResult method,
	 *         // and the returned value will be used as the param of the onPageResult method of last page
	 *         setResult: function(data) {},
	 *         // show fragment specified by id
	 *         showFragment: function(id) {},
	 *         // get fragment specified by id, default return the first fragment
	 *         getFragment: function(id) {}
	 *     }
	 * @param option Option to initialize a Page
	 *     {
	 *         backgroundColor: '#ffffff',
	 *         animate: !0,
	 *         animateDirection: 'horizontal',
	 *         // sub fragments
	 *         // note that, current page element should have a child node
	 *         // which has 'data-orchids-fragments' attribute,
	 *         // and it must has position-relative or position-absolute width specified width and height
	 *         // or fragments will not be rendered correctly
	 *         fragments: [
	 *             'name1',
	 *             'name2'
	 *         ],
	 *         fragmentAnimate: !0,
	 *         fragmentAnimateDirection: 'horizontal'
	 *     }
	 * @param superPageName Super Page Object, default is Page
	 */

	app.registerPage = function (pageName, extendAttributes, option, superPageName) {
	    var newPage, // new Page Object
	        superPagesExtendAttributes = [], // all super extend attributes
	        superPagesOptions = [], // all super options
	        tempOption,
	        i, il;

	    /**
	     * get all super extend attributes
	     *
	     * @param superPageName
	     */
	    function getSuperPagesExtendAttributes(superPageName) {
	        var superPage = app.pages[superPageName],
	            superOption = superPage.option,
	            superExtendAttributes = app.pagesAttributes[superPageName];

	        !!superExtendAttributes && superPagesExtendAttributes.unshift(superExtendAttributes);
	        !!superOption && superPagesOptions.unshift(superOption);
	        !!superPage.superPage && getSuperPagesExtendAttributes(superPage.superPage);
	    }

	    if (!pageName || typeof pageName != 'string') {
	        console.error('Register a Page Object needs a explicit string name');
	        return;
	    }

	    if (!!app.pagesAttributes[pageName]) {
	        console.error('page "' + pageName + '" has been registered, and now is override, but this is a incorrect handle, so here is the message');
	    }

	    if (arguments.length == 1) {
	        console.error('Register page "' + pageName + '" with no extend attributes is not ok, please check it');
	        return;
	    }
	    else if (arguments.length == 2) {
	        option = {};
	        superPageName = '';
	    }
	    else if (arguments.length == 3 && typeof arguments[2] == 'string') {
	        superPageName = option;
	        option = {};
	    }

	    // put extendAttributes to pagesAttributes container
	    app.pagesAttributes[pageName] = extendAttributes;

	    newPage = page();
	    tempOption = util.extend(!0, {}, app.option);
	    // no superPage
	    if (!!superPageName) {
	        getSuperPagesExtendAttributes(superPageName);
	        for (i = 0, il = superPagesExtendAttributes.length; i < il; i++) {
	            util.extend(!0, newPage.prototype, superPagesExtendAttributes[i]);
	        }

	        for (i = 0, il = superPagesOptions.length; i < il; i++) {
	            util.extend(!0, tempOption, superPagesOptions[i]);
	        }
	    }
	    util.extend(!0, newPage.prototype, extendAttributes);
	    util.extend(!0, tempOption, option);

	    tempOption.pageName = pageName;
	    app.pages[pageName] = {
	        superPage: superPageName,
	        option: tempOption,
	        page: newPage
	    };
	};

	/**
	 * register a Dialog Object
	 * @param dialogName New name of new Dialog Object
	 * @param extendAttributes Attributes to be extended to new Dialog Object
	 *     attributes to use
	 *     {
	 *         id, // current dialog id
	 *         el, // current dialog root element
	 *         option // current dialog option
	 *     }
	 *     methods to override
	 *     {
	 *         // render a dialog after a dialog is initialized
	 *         onCreate: function(){},
	 *         // pre handle before destroy a dialog
	 *         onDestroy: function() {},
	 *         // called when the child dialog destroyed and return the value by setResult method.
	 *         onDialogResult: function(data) {},
	 *         // receive data from the previous dialog, startDialogForResult method's second parameter
	 *         prepareForResult: function(data) {}
	 *     }
	 *     methods to call
	 *     {
	 *         // set the result if this dialog is called by startDialogForResult method,
	 *         // and the returned value will be used as the param of the onDialogResult method of last dialog
	 *         setResult: function(data) {}
	 *     }
	 * @param option Option to initialize a Dialog
	 *     {
	 *         backgroundColor: '#ffffff',
	 *         animate: !0,
	 *         animateDirection: 'vertical',
	 *         singleton: !0 // whether current dialog is singleton or not, if true, it will be only created once, and will not be destroyed
	 *     }
	 * @param superDialogName Super Dialog Object, default is Dialog
	 */
	app.registerDialog = function (dialogName, extendAttributes, option, superDialogName) {
	    var newDialog, // new Dialog Object
	        superDialogsExtendAttributes = [], // all super extend attributes
	        superDialogsOptions = [], // all super options
	        tempOption,
	        i, il;

	    /**
	     * get all super extend attributes
	     *
	     * @param superDialogName
	     */
	    function getSuperDialogsExtendAttributes(superDialogName) {
	        var superDialog = app.dialogs[superDialogName],
	            superOption = superDialog.option,
	            superExtendAttributes = app.dialogsAttributes[superDialogName];

	        !!superExtendAttributes && superDialogsExtendAttributes.unshift(superExtendAttributes);
	        !!superOption && superDialogsOptions.unshift(superOption);
	        !!superDialog.superDialog && getSuperDialogsExtendAttributes(superDialog.superDialog);
	    }

	    if (!dialogName || typeof dialogName != 'string') {
	        console.error('Register a Dialog Object needs a explicit string name');
	        return;
	    }

	    if (!!app.dialogsAttributes[dialogName]) {
	        console.error('dialog "' + dialogName + '" has been registered, and now is override, but this is a incorrect handle, so here is the message');
	    }

	    if (arguments.length == 1) {
	        console.error('Register dialog "' + dialogName + '" with no extend attributes is not ok, please check it');
	        return;
	    }
	    else if (arguments.length == 2) {
	        option = {};
	        superDialogName = '';
	    }
	    else if (arguments.length == 3 && typeof arguments[2] == 'string') {
	        superDialogName = option;
	        option = {};
	    }

	    // put extendAttributes to dialogsAttributes container
	    app.dialogsAttributes[dialogName] = extendAttributes;

	    newDialog = dialog();
	    tempOption = util.extend(!0, {}, app.defaultDialogOption);
	    // no superDialog
	    if (!!superDialogName) {
	        getSuperDialogsExtendAttributes(superDialogName);
	        for (i = 0, il = superDialogsExtendAttributes.length; i < il; i++) {
	            util.extend(!0, newDialog.prototype, superDialogsExtendAttributes[i]);
	        }

	        for (i = 0, il = superDialogsOptions.length; i < il; i++) {
	            util.extend(!0, tempOption, superDialogsOptions[i]);
	        }
	    }
	    util.extend(!0, newDialog.prototype, extendAttributes);
	    util.extend(!0, tempOption, option);

	    tempOption.dialogName = dialogName;
	    app.dialogs[dialogName] = {
	        superDialog: superDialogName,
	        option: tempOption,
	        singleton: !!tempOption.singleton,
	        dialog: newDialog
	    };
	};

	/**
	 * register a Fragment Object
	 * @param fragmentName New name of new Fragment Object
	 * @param extendAttributes Attributes to be extended to new Fragment Object
	 *     attributes to use
	 *     {
	 *         id, // current fragment id
	 *         el, // current fragment root element
	 *         option // current fragment option
	 *     }
	 *     methods to override
	 *     {
	 *         // render a fragment after a fragment is initialized
	 *         onCreate: function(){},
	 *         // pre handle before destroy a fragment
	 *         onDestroy: function() {},
	 *         // called when showed, not include first show while created
	 *         onShow: function () {},
	 *         // called when show another fragment
	 *         onHide: function () {},
	 *     }
	 *     methods to call
	 *     {
	 *         // show sub fragment specified by id
	 *         showSubFragment: function(id) {},
	 *         // get sub fragment specified by id, default return the first fragment
	 *         getSubFragment: function(id) {}
	 *     }
	 * @param option Option to initialize a Fragment
	 *     {
	 *         backgroundColor: '#ffffff',
	 *         // sub fragments
	 *         // note that, current fragment element should have a child node
	 *         // which has 'data-orchids-sub-fragments' attribute,
	 *         // and it must has position-relative or position-absolute width specified width and height
	 *         // or fragments will not be rendered correctly
	 *         subFragments: [
	 *             'name1',
	 *             'name2'
	 *         ],
	 *         subFragmentAnimate: !0,
	 *         subFragmentAnimateDirection: 'horizontal'
	 *     }
	 * @param superFragmentName Super Fragment Object, default is Fragment
	 */

	app.registerFragment = function (fragmentName, extendAttributes, option, superFragmentName) {
	    var newFragment, // new Fragment Object
	        superFragmentsExtendAttributes = [], // all super extend attributes
	        superFragmentsOptions = [], // all super options
	        tempOption,
	        i, il;

	    /**
	     * get all super extend attributes
	     *
	     * @param superFragmentName
	     */
	    function getSuperFragmentsExtendAttributes(superFragmentName) {
	        var superFragment = app.fragments[superFragmentName],
	            superOption = superFragment.option,
	            superExtendAttributes = app.fragmentsAttributes[superFragmentName];

	        !!superExtendAttributes && superFragmentsExtendAttributes.unshift(superExtendAttributes);
	        !!superOption && superFragmentsOptions.unshift(superOption);
	        !!superFragment.superFragment && getSuperFragmentsExtendAttributes(superFragment.superFragment);
	    }

	    if (!fragmentName || typeof fragmentName != 'string') {
	        console.error('Register a Fragment Object needs a explicit string name');
	        return;
	    }

	    if (!!app.fragmentsAttributes[fragmentName]) {
	        console.error('fragment "' + fragmentName + '" has been registered, and now is override, but this is a incorrect handle, so here is the message');
	    }

	    if (arguments.length == 1) {
	        console.error('Register fragment "' + fragmentName + '" with no extend attributes is not ok, please check it');
	        return;
	    }
	    else if (arguments.length == 2) {
	        option = {};
	        superFragmentName = '';
	    }
	    else if (arguments.length == 3 && typeof arguments[2] == 'string') {
	        superFragmentName = option;
	        option = {};
	    }

	    // put extendAttributes to fragmentsAttributes container
	    app.fragmentsAttributes[fragmentName] = extendAttributes;

	    newFragment = fragment();
	    tempOption = util.extend(!0, {}, app.defaultFragmentOption);
	    // no superFragment
	    if (!!superFragmentName) {
	        getSuperFragmentsExtendAttributes(superFragmentName);
	        for (i = 0, il = superFragmentsExtendAttributes.length; i < il; i++) {
	            util.extend(!0, newFragment.prototype, superFragmentsExtendAttributes[i]);
	        }

	        for (i = 0, il = superFragmentsOptions.length; i < il; i++) {
	            util.extend(!0, tempOption, superFragmentsOptions[i]);
	        }
	    }
	    util.extend(!0, newFragment.prototype, extendAttributes);
	    util.extend(!0, tempOption, option);

	    tempOption.fragmentName = fragmentName;
	    app.fragments[fragmentName] = {
	        superFragment: superFragmentName,
	        option: tempOption,
	        fragment: newFragment
	    };
	};
	/**
	 * get page object
	 * @param index
	 * @returns {*}
	 */
	app.getPage = function (index) {
	    typeof index == 'undefined' && (index = -1);
	    var keys = Object.keys(app.pagesInstances);
	    return app.pagesInstances[keys[(keys.length + index) % keys.length]];
	};

	/**
	 * get page object
	 * @param id Page id, if not set, return current page
	 * @returns {*}
	 */
	app.getPageById = function (id) {
	    var keys;
	    if (!id) {
	        keys = Object.keys(app.pagesInstances);
	        if (!keys.length) return null;
	        return app.pagesInstances[keys[keys.length - 1]].page;
	    }
	    else {
	        try {
	            return app.pagesInstances[id].page;
	        } catch (e) {
	            return null;
	        }

	    }
	};
	/**
	 * get current page object
	 * @returns {*}
	 */
	app.getCurrentPage = function () {
	    return app.getPage(-1);
	};
	/**
	 * get current page instance
	 * @returns {*}
	 */
	app.getCurrentPageInstance = function () {
	    return app.getPage(-1).page;
	};
	/**
	 * get prev page object
	 * @returns {*}
	 */
	app.getPrevPage = function () {
	    return app.getPage(-2);
	};

	/**
	 * delete page object
	 * @param index
	 * @returns {*}
	 */
	app.deletePage = function (index) {
	    typeof index == 'undefined' && (index = -1);
	    var keys = Object.keys(app.pagesInstances);
	    delete app.pagesInstances[keys[(keys.length + index) % keys.length]];
	};

	/**
	 * delete current page object
	 * @returns {*}
	 */
	app.deleteCurrentPage = function () {
	    return app.deletePage(-1);
	};

	/**
	 * get dialog object
	 * @param id Dialog id, if not set, return current dialog
	 * @returns {*}
	 */
	app.getDialogById = function (id) {
	    var keys;
	    if (!id) {
	        keys = Object.keys(app.dialogsInstances);
	        if (!keys.length) return null;
	        return app.dialogsInstances[keys[keys.length - 1]].dialog;
	    }
	    else {
	        try {
	            return app.dialogsInstances[id].dialog;
	        } catch (e) {
	            return null;
	        }
	    }
	};


	/**
	 * get dialog object
	 * @param index
	 * @returns {*}
	 */
	app.getDialog = function (index) {
	    typeof index == 'undefined' && (index = -1);
	    var keys = Object.keys(app.dialogsInstances);
	    return app.dialogsInstances[keys[(keys.length + index) % keys.length]];
	};

	/**
	 * get current dialog object
	 * @returns {*}
	 */
	app.getCurrentDialog = function () {
	    return app.getDialog(-1);
	};
	/**
	 * get current dialog instance
	 * @returns {*}
	 */
	app.getCurrentDialogInstance = function () {
	    try {
	        return app.getDialog(-1).dialog;
	    }
	    catch (e) {
	        return null;
	    }
	};
	/**
	 * get prev dialog object
	 * @returns {*}
	 */
	app.getPrevDialog = function () {
	    return app.getDialog(-2);
	};

	/**
	 * delete dialog object
	 * @param index
	 * @returns {*}
	 */
	app.deleteDialog = function (index) {
	    typeof index == 'undefined' && (index = -1);
	    var keys = Object.keys(app.dialogsInstances);
	    delete app.dialogsInstances[keys[(keys.length + index) % keys.length]];
	};

	/**
	 * delete current dialog object
	 * @returns {*}
	 */
	app.deleteCurrentDialog = function () {
	    return app.deleteDialog(-1);
	};
	/**
	 * back to prev page or prev dialog
	 */
	app.back = function () {
	    // has dialog active
	    if (Object.keys(app.dialogsInstances).length >= 1) {
	        app.dialogBack();
	        return;
	    }

	    app.option.route ? (
	        Object.keys(app.pagesInstances).length >= 2 && history.back()
	    ) : app.pageBack();
	};

	/**
	 * back to prev page
	 */
	app.pageBack = function () {
	    var instance,
	        prevInstance;

	    // if current pages remain only 1, back action is invalid.
	    if (Object.keys(app.pagesInstances).length <= 1) return;

	    instance = app.getCurrentPage();
	    prevInstance = app.getPrevPage();
	    // for result
	    instance.forResult && (
	        !!prevInstance.page.onPageResult && prevInstance.page.onPageResult(instance.page.__orchids__result || {})
	    );
	    // destroy
	    instance.page.__orchids__destroy();
	    // call prev page's __orchids__show method
	    prevInstance.page.__orchids__show();
	    app.deleteCurrentPage();
	};


	/**
	 * back to page
	 */
	app.dialogBack = function () {
	    var instance,
	        prevInstance,
	        prevPageInstance;

	    // if current dialogs remain 0, back action is invalid.
	    if (Object.keys(app.dialogsInstances).length <= 0) return;

	    instance = app.getCurrentDialog();
	    // for result
	    instance.forResult && (
	        prevInstance = app.getPrevDialog(),
	            !!prevInstance ? (
	                !!prevInstance.dialog.onDialogResult && prevInstance.dialog.onDialogResult(instance.dialog.__orchids__result || {})
	            ) : (
	                prevPageInstance = app.getPrevPage(),
	                !!prevPageInstance.page.onPageResult && prevPageInstance.page.onPageResult(instance.dialog.__orchids__result || {})
	            )
	    );
	    // destroy
	    instance.dialog.__orchids__destroy();
	    app.deleteCurrentDialog();
	};

	module.exports = app;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * from jquery (https://github.com/jquery/jquery/blob/master/src/core.js#L131)
	 * @returns {*|{}}
	 */
	var class2type = {},
	    hasOwn = class2type.hasOwnProperty,
	    isWindow = function( obj ) {
	        return obj != null && obj === obj.window;
	    },
	    isPlainObject = function( obj ) {
	        // Not plain objects:
	        // - Any object or value whose internal [[Class]] property is not "[object Object]"
	        // - DOM nodes
	        // - window
	        if ( typeof obj !== "object" || obj.nodeType || isWindow( obj ) ) {
	            return false;
	        }

	        if ( obj.constructor &&
	            !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
	            return false;
	        }

	        // If the function hasn't returned already, we're confident that
	        // |obj| is a plain object, created by {} or constructed with new Object
	        return true;
	    },
	    extend = function() {
	        var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false;

	        // Handle a deep copy situation
	        if ( typeof target === "boolean" ) {
	            deep = target;

	            // Skip the boolean and the target
	            target = arguments[ i ] || {};
	            i++;
	        }

	        // Handle case when target is a string or something (possible in deep copy)
	        if ( typeof target !== "object" && typeof target != 'function' ) {
	            target = {};
	        }

	        // Extend jQuery itself if only one argument is passed
	        if ( i === length ) {
	            target = this;
	            i--;
	        }

	        for ( ; i < length; i++ ) {
	            // Only deal with non-null/undefined values
	            if ( (options = arguments[ i ]) != null ) {
	                // Extend the base object
	                for ( name in options ) {
	                    src = target[ name ];
	                    copy = options[ name ];

	                    // Prevent never-ending loop
	                    if ( target === copy ) {
	                        continue;
	                    }

	                    // Recurse if we're merging plain objects or arrays
	                    if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
	                        if ( copyIsArray ) {
	                            copyIsArray = false;
	                            clone = src && Array.isArray(src) ? src : [];

	                        } else {
	                            clone = src && isPlainObject(src) ? src : {};
	                        }

	                        // Never move original objects, clone them
	                        target[ name ] = extend( deep, clone, copy );

	                        // Don't bring in undefined values
	                    } else if ( copy !== undefined ) {
	                        target[ name ] = copy;
	                    }
	                }
	            }
	        }

	        // Return the modified object
	        return target;
	    };

	module.exports = {
	    extend: extend
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var util = __webpack_require__(6),
	    container = __webpack_require__(8);

	var newPage = function () {
	    /**
	     *
	     * @param option Option to initialize page
	     * @param data Parameter to be used by onCreate method
	     * @constructor
	     */
	    function Page(option, data) {
	        var self = this;
	        self.option = util.extend(true, {}, option);
	        self.__orchids__data = data || {};
	        /**
	         * current fragment instances
	         * @type {{}}
	         * @private
	         */
	        self.__orchids__fragmentsInstances = {};
	        /**
	         * current active fragment id
	         * @type {number}
	         * @private
	         */
	        self.__orchids__currentFragmentId = 1;
	        self.__orchids__init();
	    }

	    Page.prototype = {
	        constructor: Page,
	        __orchids__init: function() {
	            var self = this,
	                classes = [
	                    'orchids',
	                    'orchids-page'
	                ];
	            // make id
	            self.id = self.option.pageId;
	            // whether current page is the first page to render or not, for confirming to start current page with or without animation.
	            self.__orchids__isFirstPage = self.id == 1;
	            // make root el
	            self.el = document.createElement('div');
	            // data-orchids-page-is
	            self.el.dataset.orchidsPageId = self.id;
	            // animation
	            !!self.option.animate && (
	                classes.push('orchids-with-animation')
	            );
	            // direction
	            self.option.animateDirection == 'vertical' ? classes.push('orchids-vertical') : classes.push('orchids-horizontal');
	            // classList
	            self.__orchids__isFirstPage && classes.push('orchids-active');
	            self.el.classList = classes.join(' ');
	            // background color
	            self.el.style.backgroundColor = self.option.backgroundColor;

	            // add to body element
	            document.body.appendChild(self.el);

	            // user custom initialization
	            !!self.onCreate && self.onCreate(self.__orchids__data);

	            // route, if it is the first page, no route change
	            !!self.option.route && !self.__orchids__isFirstPage && self.__orchids__routeForward();

	            // render fragments
	            !!self.option.fragments && !!self.option.fragments.length && self.__orchids__renderFragments();

	            /**
	             * show page, delay 100 ms to guarantee the animation  is ok, and 0 is not ok
	             */
	            !self.__orchids__isFirstPage && setTimeout(function () {
	                self.el.classList.add('orchids-active')
	            }, 100);

	        },
	        // render fragments
	        __orchids__renderFragments: function () {
	            var self = this,
	                fragmentsEl = self.el.querySelector('[data-orchids-fragments]'),
	                i, il, fragmentName, fragment,
	                fragmentsContainerClasses = [
	                    'orchids-fragments-container'
	                ],
	                fragmentOption, instance;
	            if (!fragmentsEl) {
	                console.error('Render fragments failed: no fragments container which should has "data-orchids-fragments" attribute.');
	                return;
	            }

	            // guarantee the root fragments elements has overflow-hidden element
	            fragmentsEl.style.overflow = 'hidden';
	            // fragment's width and height
	            self.__orchids__fragmentWidth = fragmentsEl.offsetWidth;
	            self.__orchids__fragmentHeight = fragmentsEl.offsetHeight;

	            // create fragments container element
	            self.__orchids__fragmentsContainerEl = document.createElement('div');

	            self.option.fragmentAnimate && fragmentsContainerClasses.push('orchids-with-animation');
	            self.option.fragmentAnimateDirection == 'vertical' ? (
	                fragmentsContainerClasses.push('orchids-vertical'),
	                    self.__orchids__fragmentsContainerEl.style.height = self.option.fragments.length * self.__orchids__fragmentHeight + 'px'
	            ) : (
	                fragmentsContainerClasses.push('orchids-horizontal'),
	                    self.__orchids__fragmentsContainerEl.style.width = self.option.fragments.length * self.__orchids__fragmentWidth + 'px'
	            );

	            // class list
	            self.__orchids__fragmentsContainerEl.classList = fragmentsContainerClasses.join(' ');
	            // clear fragments root element inner html
	            fragmentsEl.innerHTML = '';
	            fragmentsEl.appendChild(self.__orchids__fragmentsContainerEl);

	            for (i = 0, il = self.option.fragments.length; i < il; i++) {
	                fragmentName = self.option.fragments[i];
	                fragment = container.fragments[fragmentName];
	                if (!fragment) {
	                    console.error('Render fragment "' + fragmentName + '" failed: no such a fragment registered.');
	                    return;
	                }
	                fragmentOption = util.extend(!0, {}, fragment.option);
	                fragmentOption.fragmentId = i + 1;
	                fragmentOption.fragmentWidth = self.__orchids__fragmentWidth;
	                fragmentOption.fragmentHeight = self.__orchids__fragmentHeight;
	                fragmentOption.fragmentDirection = self.option.fragmentAnimateDirection;
	                instance = new fragment.fragment(fragmentOption);

	                self.__orchids__fragmentsInstances[fragmentOption.fragmentId] = instance;
	                // add fragment element to current root fragments container
	                self.__orchids__fragmentsContainerEl.appendChild(instance.el);
	            }
	        },
	        /**
	         * show fragment specified by id
	         * @param id
	         */
	        showFragment: function (id) {
	            var self = this,
	                instance, previousInstance;
	            if (!id) {
	                console.error('method showFragment needs a specified fragment id');
	                return;
	            }
	            if (id == self.__orchids__currentFragmentId) {
	                return;
	            }
	            instance = self.__orchids__fragmentsInstances[id];
	            if (!instance) {
	                console.error('fragment not found with id: ' + id + '.');
	                return;
	            }


	            // create fragment if not created, or call onShow method
	            !instance.__orchids__initialized ?
	                (
	                    !!instance.onCreate && instance.onCreate(),
	                        instance.__orchids__initialized = !0
	                ) :
	            !!instance.onShow && instance.onShow();
	            // call previous fragment onHide method
	            previousInstance = self.__orchids__fragmentsInstances[self.__orchids__currentFragmentId];
	            !!previousInstance.onHide && previousInstance.onHide();
	            // update current active fragment id
	            self.__orchids__currentFragmentId = id;
	            // create sub fragments if not created
	            !!instance.option.subFragments && !!instance.option.subFragments.length && instance.__orchids__renderSubFragments();
	            self.option.fragmentAnimateDirection == 'vertical' ? (
	                self.__orchids__fragmentsContainerEl.style.transform = 'translateY(' + (0 - self.__orchids__fragmentHeight * (id - 1)) + 'px)'
	            ) : (
	                self.__orchids__fragmentsContainerEl.style.transform = 'translateX(' + (0 - self.__orchids__fragmentWidth * (id - 1)) + 'px)'
	            );
	        },
	        /**
	         * get fragment specified by id, default return the first fragment
	         * @param id
	         */
	        getFragment: function (id) {
	            var self = this;
	            id = id || 1;
	            try {
	                return self.__orchids__fragmentsInstances[id];
	            } catch (e) {
	                return null;
	            }
	        },
	        // make a forward route
	        __orchids__routeForward: function () {
	            var self = this,
	                pageName = encodeURIComponent(self.option.pageName),
	                pageData = encodeURIComponent(JSON.stringify(self.__orchids__data)),
	                params = (function () {
	                    var params = {};
	                    !!location.search && (
	                        location.search.slice(1).split('&').map(function (item) {
	                            params[item.split('=')[0]] = item.split('=')[1]
	                        })
	                    );
	                    return params;
	                })(),
	                searchString = '';
	            params.orchidsPage = pageName;
	            params.orchidsData = pageData;

	            Object.keys(params).map(function (key) {
	                searchString += '&' + key + '=' + (!!params[key] ? params[key] : '');
	            });

	            history.pushState({
	                pageId: self.id
	            }, null, '?' + searchString.slice(1));
	        },

	        // destroy current page
	        __orchids__destroy: function () {
	            var self = this;

	            // call all fragments's __orchids__destroy
	            Object.keys(self.__orchids__fragmentsInstances).map(function (id) {
	                self.__orchids__fragmentsInstances[id].__orchids__destroy();
	            });
	            self.onDestroy();

	            self.el.classList.remove('orchids-active');
	            self.option.animate ? (
	                // has animation
	                setTimeout(function () {
	                    self.el.remove()
	                }, 500)
	            ) : (
	                // no animation
	                self.el.remove()
	            );
	        },

	        // hide current page
	        __orchids__hide: function () {
	            var self = this;
	            // call active fragment's __orchids__hide
	            try {
	                self.__orchids__fragmentsInstances[self.__orchids__currentFragmentId].__orchids__hide();
	            }
	            catch (e) {}

	            self.onHide();
	        },

	        // show current page
	        __orchids__show: function () {
	            var self = this;

	            self.onShow();
	            // call active fragment's __orchids__show
	            try {
	                self.__orchids__fragmentsInstances[self.__orchids__currentFragmentId].__orchids__show();
	            }
	            catch (e) {}

	        },

	        /**
	         * render a page after a page is initialized
	         * @param data
	         */
	        onCreate: function(data) {},

	        /**
	         * pre handle before destroy a page
	         */
	        onDestroy: function() {},

	        /**
	         * called when back page from other page
	         */
	        onShow: function () {},
	        /**
	         * called when start another page
	         */
	        onHide: function () {},
	        /**
	         * set the result if this page is called by startPageForResult method,
	         * and the returned value will be used as the param of the onPageResult method of last page
	         *
	         * @param {*} data
	         */
	        setResult: function(data) {
	            var self = this;
	            self.__orchids__result = data;
	        },
	        /**
	         * called when the child page destroyed and return the value by setResult method.
	         * @param {*} data
	         */
	        onPageResult: function(data) {},
	        /**
	         * receive data from the previous page, startPageForResult method's second parameter
	         * @param data
	         */
	        prepareForResult: function(data) {}
	    };

	    return Page;
	};

	module.exports = newPage;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var container = {
	    /**
	     * all registered page Object container
	     * format: {
	     *     name: {
	     *         option: option, // Option to initialize a Page, available option is showed bellow
	     *             {
	     *                 backgroundColor: '#ffffff',
	     *                 animate: !0,
	     *                 animateDirection: 'horizontal'
	     *             }
	     *         superPage: '', // super page name, default is blank string
	     *         page: Page // Page Object
	     *     }
	     * }
	     * @type {{}}
	     */
	    pages: {},
	    /**
	     * all registered Pages Attributes
	     * format: {
	         *     name: {
	         *         name1: field1,
	         *         name2: filed2,
	         *         name3: func1,
	         *         name4: func2
	         *     }
	         * }
	     * @type {{}}
	     */
	    pagesAttributes: {},
	    /**
	     * all initialized Page instances (current page is not supporting singleton)
	     * format: {
	         *     id: {
	         *         name: pageName, // Page name
	         *         forResult: true/false, // whether current page is initialized by startPageForResult or not
	         *         page: Page // Page instance
	         *     }
	         * }
	     * @type {{}}
	     */
	    pagesInstances: {},
	    /**
	     * all registered dialog Object container
	     * format: {
	         *     name: {
	         *         option: option, // Option to initialize a Dialog, available option is showed bellow
	         *             {
	         *                 backgroundColor: '#ffffff',
	         *                 animate: !0,
	         *                 animateDirection: 'vertical',
	         *                 singleton: true
	         *             }
	         *         superDialog: '', // super dialog name, default is blank string
	         *         dialog: Dialog // Dialog Object
	         *     }
	         * }
	     * @type {{}}
	     */
	    dialogs: {},
	    /**
	     * all registered Dialogs Attributes
	     * format: {
	         *     name: {
	         *         name1: field1,
	         *         name2: filed2,
	         *         name3: func1,
	         *         name4: func2
	         *     }
	         * }
	     * @type {{}}
	     */
	    dialogsAttributes: {},
	    /**
	     * all initialized Dialog instances
	     * format: {
	         *     id: {
	         *         name: dialogName, // Dialog name
	         *         forResult: true/false, // whether current page is initialized by startPageForResult or not
	         *         dialog: Dialog // Dialog instance
	         *     }
	         * }
	     * @type {{}}
	     */
	    dialogsInstances: {},
	    /**
	     * all initialized Dialog singleton instances
	     * format: {
	         *     name: {
	         *         id: id, // dialog id
	         *         dialog: Dialog // Dialog instance
	         *     }
	         * }
	     * @type {{}}
	     */
	    dialogsSingletonInstances: {},
	    /**
	     * all registered fragment Object container
	     * format: {
	         *     name: {
	         *         option: option, // Option to initialize a Fragment, available option is showed bellow
	         *             {
	         *                 backgroundColor: '#ffffff'
	         *             }
	         *         superFragment: '', // super fragment name, default is blank string
	         *         fragment: Fragment // Fragment Object
	         *     }
	         * }
	     * @type {{}}
	     */
	    fragments: {},
	    /**
	     * all registered Fragments Attributes
	     * format: {
	         *     name: {
	         *         name1: field1,
	         *         name2: filed2,
	         *         name3: func1,
	         *         name4: func2
	         *     }
	         * }
	     * @type {{}}
	     */
	    fragmentsAttributes: {}
	};

	module.exports = container;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Similar to Page Object, but no route, always cover page(that is to say, if you want to go to another page,
	 *     you need first to close current dialog, or you will not see the effect), 
	 */

	"use strict";

	var util = __webpack_require__(6);

	var newDialog = function () {
	    /**
	     *
	     * @param option Option to initialize dialog
	     * @param data Parameter to be used by onCreate method
	     * @constructor
	     */
	    function Dialog(option, data) {
	        var self = this;
	        self.option = util.extend(true, {}, option);
	        self.__orchids__data = data || {};
	        self.__orchids__init();
	    }

	    Dialog.prototype = {
	        constructor: Dialog,
	        __orchids__init: function() {
	            var self = this,
	                classes = [
	                    'orchids',
	                    'orchids-dialog',
	                    'orchids-with-animation'
	                ];
	            // make id
	            self.id = self.option.dialogId;
	            // make root el
	            self.el = document.createElement('div');
	            // data-orchids-dialog-is
	            self.el.dataset.orchidsDialogId = self.id;
	            // direction
	            self.option.animateDirection == 'horizontal' ? classes.push('orchids-horizontal') : classes.push('orchids-vertical');
	            // classList
	            self.el.classList = classes.join(' ');
	            // background color
	            self.el.style.backgroundColor = self.option.backgroundColor;

	            // add to body element
	            document.body.appendChild(self.el);

	            // user custom initialization
	            !!self.onCreate && self.onCreate(self.__orchids__data);

	            /**
	             * show dialog, delay 100 ms to guarantee the animation  is ok, and 0 is not ok
	             */
	            setTimeout(function () {
	                self.el.classList.add('orchids-active')
	            }, 100);
	        },
	        // destroy current dialog
	        __orchids__destroy: function () {
	            var self = this;
	            self.onDestroy();

	            self.el.classList.remove('orchids-active');
	            self.option.animate ? (
	                // has animation
	                setTimeout(function () {
	                    self.el.remove()
	                }, 500)
	            ) : (
	                // no animation
	                self.el.remove()
	            );
	        },

	        // show current dialog
	        __orchids__show: function (forResult, prepareResultData) {
	            var self = this;
	            // add to body element
	            document.body.appendChild(self.el);

	            /**
	             * show dialog, delay 100 ms to guarantee the animation  is ok, and 0 is not ok
	             */
	            self.option.animate ? (
	                // has animation
	                setTimeout(function () {
	                    self.el.classList.add('orchids-active')
	                }, 100)
	            ) : (
	                // no animation
	                self.el.classList.add('orchids-active')
	            );

	            forResult && self.prepareForResult(prepareResultData);
	        },

	        // render a dialog after a dialog is initialized
	        onCreate: function(data) {},

	        // pre handle before destroy a dialog
	        onDestroy: function() {},

	        /**
	         * set the result if this dialog is called by startDialogForResult method,
	         * and the returned value will be used as the param of the onDialogResult method of last dialog
	         *
	         * @param {*} data
	         */
	        setResult: function(data) {
	            var self = this;
	            self.__orchids__result = data;
	        },
	        /**
	         * called when the child dialog destroyed and return the value by setResult method.
	         * @param {*} data
	         */
	        onDialogResult: function(data) {},
	        /**
	         * receive data from the previous dialog, startDialogForResult method's second parameter
	         * @param data
	         */
	        prepareForResult: function(data) {}
	    };

	    return Dialog;
	};

	module.exports = newDialog;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var util = __webpack_require__(6),
	    container = __webpack_require__(8);

	var newFragment = function () {
	    /**
	     *
	     * @param option Option to initialize fragment
	     * @constructor
	     */
	    function Fragment(option) {
	        var self = this;
	        self.option = util.extend(true, {}, option);
	        // whether current fragment is initialized
	        self.__orchids__initialized = !1;
	        /**
	         * current sub fragment instances
	         * @type {{}}
	         * @private
	         */
	        self.__orchids__subFragmentsInstances = {};
	        /**
	         * current active sub fragment id
	         * @type {number}
	         * @private
	         */
	        self.__orchids__currentSubFragmentId = 1;
	        self.__orchids__init();
	    }

	    Fragment.prototype = {
	        constructor: Fragment,
	        __orchids__init: function() {
	            var self = this,
	                classes = [
	                    'orchids',
	                    'orchids-fragment'
	                ];
	            // make id
	            self.id = self.option.fragmentId;
	            // whether current fragment is the first fragment to render or not
	            self.__orchids__isFirstFragment = self.id == 1;
	            // make root el
	            self.el = document.createElement('div');
	            // data-orchids-fragment-is
	            self.el.dataset.orchidsFragmentId = self.id;

	            // background color
	            self.el.style.backgroundColor = self.option.backgroundColor;
	            // left, top, width, height
	            self.option.fragmentDirection == 'vertical' ? (
	                classes.push('orchids-vertical'),
	                    self.el.style.top = self.option.fragmentHeight * (self.id - 1) + 'px',
	                    self.el.style.height = self.option.fragmentHeight + 'px'
	            ) : (
	                classes.push('orchids-horizontal'),
	                    self.el.style.left = self.option.fragmentWidth * (self.id - 1) + 'px',
	                    self.el.style.width = self.option.fragmentWidth + 'px'
	            );
	            self.el.classList = classes.join(' ');
	            // user custom initialization
	            self.__orchids__isFirstFragment && (
	                self.__orchids__initialized = !0,
	                !!self.onCreate && self.onCreate(),
	                    // render fragments
	                !!self.option.subFragments && !!self.option.subFragments.length && self.__orchids__renderSubFragments()
	            );
	        },
	        // render sub fragments
	        __orchids__renderSubFragments: function () {
	            var self = this,
	                fragmentsEl = self.el.querySelector('[data-orchids-fragments]'),
	                i, il, fragmentName, fragment,
	                fragmentsContainerClasses = [
	                    'orchids-sub-fragments-container'
	                ],
	                fragmentOption, instance;
	            if (!fragmentsEl) {
	                console.error('Render fragments failed: no fragments container which should has "data-orchids-sub-fragments" attribute.');
	                return;
	            }

	            // guarantee the root fragments elements has overflow-hidden element
	            fragmentsEl.style.overflow = 'hidden';
	            // fragment's width and height
	            self.__orchids__subFragmentWidth = fragmentsEl.offsetWidth;
	            self.__orchids__subFragmentHeight = fragmentsEl.offsetHeight;

	            // create fragments container element
	            self.__orchids__subFragmentsContainerEl = document.createElement('div');

	            self.option.subFragmentAnimate && fragmentsContainerClasses.push('orchids-with-animation');
	            self.option.subFragmentAnimateDirection == 'vertical' ? (
	                fragmentsContainerClasses.push('orchids-vertical'),
	                    self.__orchids__subFragmentsContainerEl.style.height = self.option.subFragments.length * self.__orchids__subFragmentHeight + 'px'
	            ) : (
	                fragmentsContainerClasses.push('orchids-horizontal'),
	                    self.__orchids__subFragmentsContainerEl.style.width = self.option.subFragments.length * self.__orchids__subFragmentWidth + 'px'
	            );

	            // class list
	            self.__orchids__subFragmentsContainerEl.classList = fragmentsContainerClasses.join(' ');
	            // clear fragments root element inner html
	            fragmentsEl.innerHTML = '';
	            fragmentsEl.appendChild(self.__orchids__subFragmentsContainerEl);

	            for (i = 0, il = self.option.subFragments.length; i < il; i++) {
	                fragmentName = self.option.subFragments[i];
	                fragment = container.fragments[fragmentName];
	                if (!fragment) {
	                    console.error('Render fragment "' + fragmentName + '" failed: no such a fragment registered.');
	                    return;
	                }
	                fragmentOption = util.extend(!0, {}, fragment.option);
	                fragmentOption.fragmentId = i + 1;
	                fragmentOption.fragmentWidth = self.__orchids__subFragmentWidth;
	                fragmentOption.fragmentHeight = self.__orchids__subFragmentHeight;
	                fragmentOption.fragmentDirection = self.option.subFragmentAnimateDirection;
	                instance = new fragment.fragment(fragmentOption);

	                self.__orchids__subFragmentsInstances[fragmentOption.fragmentId] = instance;
	                // add sub fragment element to current root sub fragments container
	                self.__orchids__subFragmentsContainerEl.appendChild(instance.el);
	            }
	        },
	        /**
	         * show sub fragment specified by id
	         * @param id
	         */
	        showSubFragment: function (id) {
	            var self = this,
	                instance, previousInstance;
	            if (!id) {
	                console.error('method showFragment needs a specified fragment id');
	                return;
	            }
	            if (id == self.__orchids__currentSubFragmentId) {
	                return;
	            }
	            instance = self.__orchids__subFragmentsInstances[id];
	            if (!instance) {
	                console.error('fragment not found with id: ' + id + '.');
	                return;
	            }

	            // create fragment if not created, or call onShow method
	            !instance.__orchids__initialized ?
	                (
	                    !!instance.onCreate && instance.onCreate(),
	                        instance.__orchids__initialized = !0
	                ) :
	            !!instance.onShow && instance.onShow();
	            // call previous fragment onHide method
	            previousInstance = self.__orchids__subFragmentsInstances[self.__orchids__currentSubFragmentId];
	            !!previousInstance.onHide && previousInstance.onHide();
	            // update current active fragment id
	            self.__orchids__currentSubFragmentId = id;
	            // create sub fragments if not created
	            !!instance.option.subFragments && !!instance.option.subFragments.length && instance.__orchids__renderSubFragments();
	            self.option.subFragmentAnimateDirection == 'vertical' ? (
	                self.__orchids__subFragmentsContainerEl.style.transform = 'translateY(' + (0 - self.__orchids__subFragmentHeight * (id - 1)) + 'px)'
	            ) : (
	                self.__orchids__subFragmentsContainerEl.style.transform = 'translateX(' + (0 - self.__orchids__subFragmentWidth * (id - 1)) + 'px)'
	            );
	        },
	        // called when current page is destroy
	        __orchids__destroy: function () {
	            var self = this;

	            // call all sub fragments's __orchids__destroy
	            Object.keys(self.__orchids__subFragmentsInstances).map(function (id) {
	                self.__orchids__subFragmentsInstances[id].__orchids__destroy();
	            });
	            self.onDestroy();
	        },
	        // hide current fragment
	        __orchids__hide: function () {
	            var self = this;
	            // call active sub fragment's __orchids__hide
	            try {
	                self.__orchids__subFragmentsInstances[self.__orchids__currentSubFragmentId].__orchids__hide();
	            }
	            catch (e) {}

	            self.onHide();
	        },

	        // show current sub fragment
	        __orchids__show: function () {
	            var self = this;

	            self.onShow();
	            // call active sub fragment's __orchids__show
	            try {
	                self.__orchids__subFragmentsInstances[self.__orchids__currentSubFragmentId].__orchids__show();
	            }
	            catch (e) {}
	        },
	        /**
	         * get sub fragment specified by id, default return the first fragment
	         * @param id
	         */
	        getSubFragment: function (id) {
	            var self = this;
	            id = id || 1;
	            try {
	                return self.__orchids__subFragmentsInstances[id];
	            } catch (e) {
	                return null;
	            }
	        },
	        /**
	         * render a fragment after a fragment is initialized
	         */
	        onCreate: function() {},
	        /**
	         * pre handle before destroy a fragment
	         */
	        onDestroy: function() {},

	        /**
	         * called when showed, not include first show while created
	         */
	        onShow: function () {},
	        /**
	         * called when show another fragment
	         */
	        onHide: function () {}
	    };

	    return Fragment;
	};

	module.exports = newFragment;

/***/ }
/******/ ]);