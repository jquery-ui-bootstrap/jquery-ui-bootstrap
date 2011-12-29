/*
 *
 * Wijmo Library 1.5.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Common utility.
 *
 * Depends:
 *  jquery.ui.core.js
 *
 */
/*Replace inner content by iframe and load content using given url*/
(function ($) {
	$.fn.extend({
		wijContent: function (url) {
			return this.each(function () {
				this.innerHTML = '<iframe frameborder="0" style="width: 100%; height: 100%;" src="' + url + '">"';
			});
		}

		/*,
		wijAddVisibilityObserver: function (h, namespace) {
		return this.each(function () {
		$(this).addClass("wijmo-wijobserver-visibility");
		$(this).bind("wijmovisibilitychanged"
		+ (namespace ? ("." + namespace) : ""), h);
		});
		},
		wijRemoveVisibilityObserver: function (h) {
		return this.each(function () {
		$(this).removeClass("wijmo-wijobserver-visibility");
		if (!h) {
		$(this).unbind("wijmovisibilitychanged");
		}
		else if (jQuery.isFunction(h)) {
		$(this).unbind("wijmovisibilitychanged", h);
		} else {
		$(this).unbind("wijmovisibilitychanged." + h);
		}
		});
		},
		wijTriggerVisibility: function () {
		return this.each(function () {
		var $el = $(this);
		if ($el.hasClass("wijmo-wijobserver-visibility")) {
		$el.trigger("wijmovisibilitychanged");
		}
		$el.find(".wijmo-wijobserver-visibility").trigger("wijmovisibilitychanged");
		});
		}
		*/
	});

	var naNTest = function (num) {
		return isNaN(num) ? 0 : num;
	};

	$.fn.leftBorderWidth = function () {
		var blw = parseFloat($(this).css("borderLeftWidth"));
		var pl = parseFloat($(this).css("padding-left"));
		var ml = 0;
		if ($(this).css("margin-left") != "auto") {
			ml = parseFloat($(this).css("margin-left"));
		}

		return naNTest(blw) + naNTest(pl) + naNTest(ml);
	};

	$.fn.rightBorderWidth = function () {
		var brw = parseFloat($(this).css("borderRightWidth"));
		var pr = parseFloat($(this).css("padding-right"));
		var mr = 0;
		if ($(this).css("margin-right") != "auto") {
			mr = parseFloat($(this).css("margin-right"));
		}
		return naNTest(brw) + naNTest(pr) + naNTest(mr);
	};

	$.fn.topBorderWidth = function () {
		var blw = parseFloat($(this).css("borderTopWidth"));
		var pl = parseFloat($(this).css("padding-top"));
		var ml = 0;
		if ($(this).css("margin-top") != "auto") {
			ml = parseFloat($(this).css("margin-top"));
		}
		return naNTest(blw) + naNTest(pl) + naNTest(ml);
	};

	$.fn.bottomBorderWidth = function () {
		var brw = parseFloat($(this).css("borderBottomWidth"));
		var pr = parseFloat($(this).css("padding-bottom"));
		var mr = 0;
		if ($(this).css("margin-bottom") != "auto") {
			mr = parseFloat($(this).css("margin-bottom"));
		}
		return naNTest(brw) + naNTest(pr) + naNTest(mr);
	};

	$.fn.borderSize = function () {
		var bw = $(this).leftBorderWidth() + $(this).rightBorderWidth();
		var bh = $(this).topBorderWidth() + $(this).bottomBorderWidth();
		var b = { width: bw, height: bh };
		return b;
	};

	$.fn.setOutWidth = function (width) {
		var bw = $(this).leftBorderWidth() + $(this).rightBorderWidth();
		$(this).width(width - bw);
		return this;
	};

	$.fn.setOutHeight = function (height) {
		var bh = $(this).topBorderWidth() + $(this).bottomBorderWidth();
		$(this).height(height - bh);
		return this;
	};

	$.fn.getWidget = function () {
		var widgetName = this.data("widgetName");

		if (widgetName && widgetName != "") {
			return this.data(widgetName);
		}

		return null;
	};

	$.fn.wijshow = function (animation, customAnimations, customAnimationOptions, showing, shown) {
		var animated = animation.animated || false,
			duration = animation.duration || 400,
			easing = animation.easing,
			option = animation.option || {};

		if (showing && $.isFunction(showing)) {
			showing.call(this);
		}

		if (animated) {
			if ($.effects && $.effects[animated]) {
				this.show(animated, $.extend(option, { easing: easing }), duration, shown);
				return;
			}

			if (customAnimations && customAnimations[animated]) {
				customAnimations[animated](animation, $.extend(customAnimationOptions, { complete: shown }));
				return;
			}
		}

		this.show();
		if (shown && $.isFunction(shown)) {
			shown.call(this);
		}
	};

	$.fn.wijhide = function (animation, customAnimations, customAnimationOptions, hiding, hidden) {
		var animated = animation.animated || false,
			duration = animation.duration || 400,
			easing = animation.easing,
			option = animation.option || {};

		if (hiding && $.isFunction(hiding)) {
			hiding.call(this);
		}

		if (animated) {
			if ($.effects && $.effects[animated]) {
				this.hide(animated, $.extend(option,
				{ easing: easing }), duration, hidden);
				return;
			}
			if (customAnimations && customAnimations[animated]) {
				customAnimations[animated](newAnimations,
					$.extend(customAnimationOptions, { complete: hidden }));
				return;
			}
		}

		this.hide();
		if (hidden && $.isFunction(hidden)) {
			hidden.call(this);
		}
	};

	var wijCharValidator = function () { };
	$.extend(wijCharValidator.prototype, {
		_UTFPunctuationsString: ' ! \" # % & \' ( ) * , - . / : ; ? @ [ \\ ] { } \u00a1 \u00ab \u00ad \u00b7 \u00bb \u00bf \u037e \u0387 \u055a \u055b \u055c \u055d \u055e \u055f \u0589 \u058a \u05be \u05c0 \u05c3 \u05f3 \u05f4 \u060c \u061b \u061f \u066a \u066b \u066c \u066d \u06d4 \u0700 \u0701 \u0702 \u0703 \u0704 \u0705 \u0706 \u0707 \u0708 \u0709 \u070a \u070b \u070c \u070d \u0964 \u0965 \u0970 \u0df4 \u0e4f \u0e5a \u0e5b \u0f04 \u0f05 \u0f06 \u0f07 \u0f08 \u0f09 \u0f0a \u0f0b \u0f0c \u0f0d \u0f0e \u0f0f \u0f10 \u0f11 \u0f12 \u0f3a \u0f3b \u0f3c \u0f3d \u0f85 \u104a \u104b \u104c \u104d \u104e \u104f \u10fb \u1361 \u1362 \u1363 \u1364 \u1365 \u1366 \u1367 \u1368 \u166d \u166e \u169b \u169c \u16eb \u16ec \u16ed \u17d4 \u17d5 \u17d6 \u17d7 \u17d8 \u17d9 \u17da \u17dc \u1800 \u1801 \u1802 \u1803 \u1804 \u1805 \u1806 \u1807 \u1808 \u1809 \u180a \u2010 \u2011 \u2012 \u2013 \u2014 \u2015 \u2016 \u2017 \u2018 \u2019 \u201a \u201b \u201c \u201d \u201e \u201f \u2020 \u2021 \u2022 \u2023 \u2024 \u2025 \u2026 \u2027 \u2030 \u2031 \u2032 \u2033 \u2034 \u2035 \u2036 \u2037 \u2038 \u2039 \u203a \u203b \u203c \u203d \u203e \u2041 \u2042 \u2043 \u2045 \u2046 \u2048 \u2049 \u204a \u204b \u204c \u204d \u207d \u207e \u208d \u208e \u2329 \u232a \u3001 \u3002 \u3003 \u3008 \u3009 \u300a \u300b \u300c \u300d \u300e \u300f \u3010 \u3011 \u3014 \u3015 \u3016 \u3017 \u3018 \u3019 \u301a \u301b \u301c \u301d \u301e \u301f \u3030 \ufd3e \ufd3f \ufe30 \ufe31 \ufe32 \ufe35 \ufe36 \ufe37 \ufe38 \ufe39 \ufe3a \ufe3b \ufe3c \ufe3d \ufe3e \ufe3f \ufe40 \ufe41 \ufe42 \ufe43 \ufe44 \ufe49 \ufe4a \ufe4b \ufe4c \ufe50 \ufe51 \ufe52 \ufe54 \ufe55 \ufe56 \ufe57 \ufe58 \ufe59 \ufe5a \ufe5b \ufe5c \ufe5d \ufe5e \ufe5f \ufe60 \ufe61 \ufe63 \ufe68 \ufe6a \ufe6b \uff01 \uff02 \uff03 \uff05 \uff06 \uff07 \uff08 \uff09 \uff0a \uff0c \uff0d \uff0e \uff0f \uff1a \uff1b \uff1f \uff20 \uff3b \uff3c \uff3d \uff5b \uff5d \uff61 \uff62 \uff63 \uff64\';this.UTFWhitespacesString_=\'\t \u000b \u000c \u001f   \u00a0 \u1680 \u2000 \u2001 \u2002 \u2003 \u2004 \u2005 \u2006 \u2007 \u2008 \u2009 \u200a \u200b \u2028 \u202f \u3000',

		isDigit: function (c) {
			return (c >= '0' && c <= '9');
		},

		isLetter: function (c) {
			return !!((c + '').match(new RegExp('[A-Za-z\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u021f\u0222-\u0233\u0250-\u02ad\u02b0-\u02b8\u02bb-\u02c1\u02d0\u02d1\u02e0-\u02e4\u02ee\u037a\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d7\u03da-\u03f3\u0400-\u0481\u048c-\u04c4\u04c7\u04c8\u04cb\u04cc\u04d0-\u04f5\u04f8\u04f9\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0640-\u064a\u0671-\u06d3\u06d5\u06e5\u06e6\u06fa-\u06fc\u0710\u0712-\u072c\u0780-\u07a5\u0905-\u0939\u093d\u0950\u0958-\u0961\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b36-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60\u0d61\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6a\u0f88-\u0f8b\u1000-\u1021\u1023-\u1027\u1029\u102a\u1050-\u1055\u10a0-\u10c5\u10d0-\u10f6\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1206\u1208-\u1246\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1286\u1288\u128a-\u128d\u1290-\u12ae\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12ce\u12d0-\u12d6\u12d8-\u12ee\u12f0-\u130e\u1310\u1312-\u1315\u1318-\u131e\u1320-\u1346\u1348-\u135a\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1780-\u17b3\u1820-\u1877\u1880-\u18a8\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u207f\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2131\u2133-\u2139\u3005\u3006\u3031-\u3035\u3041-\u3094\u309d\u309e\u30a1-\u30fa\u30fc-\u30fe\u3105-\u312c\u3131-\u318e\u31a0-\u31b7\u3400-\u4db5\u4e00-\u9fa5\ua000-\ua48c\uac00-\ud7a3\uf900-\ufa2d\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe72\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')));
		},

		isLetterOrDigit: function (c) {
			return this.isLetter(c) || this.isDigit(c);
		},

		isSymbol: function (c) {
			var re = new RegExp('[$+<->^`|~\u00a2-\u00a9\u00ac\u00ae-\u00b1\u00b4\u00b6\u00b8\u00d7\u00f7\u02b9\u02ba\u02c2-\u02cf\u02d2-\u02df\u02e5-\u02ed\u0374\u0375\u0384\u0385\u0482\u06e9\u06fd\u06fe\u09f2\u09f3\u09fa\u0b70\u0e3f\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fcf\u17db\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u2044\u207a-\u207c\u208a-\u208c\u20a0-\u20af\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u2132\u213a\u2190-\u21f3\u2200-\u22f1\u2300-\u2328\u232b-\u237b\u237d-\u239a\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u2595\u25a0-\u25f7\u2600-\u2613\u2619-\u2671\u2701-\u2704\u2706-\u2709\u270c-\u2727\u2729-\u274b\u274d\u274f-\u2752\u2756\u2758-\u275e\u2761-\u2767\u2794\u2798-\u27af\u27b1-\u27be\u2800-\u28ff\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u309b\u309c\u3190\u3191\u3196-\u319f\u3200-\u321c\u322a-\u3243\u3260-\u327b\u327f\u328a-\u32b0\u32c0-\u32cb\u32d0-\u32fe\u3300-\u3376\u337b-\u33dd\u33e0-\u33fe\ua490-\ua4a1\ua4a4-\ua4b3\ua4b5-\ua4c0\ua4c2-\ua4c4\ua4c6\ufb29\ufe62\ufe64-\ufe66\ufe69\uff04\uff0b\uff1c-\uff1e\uff3e\uff40\uff5c\uff5e\uffe0-\uffe6\uffe8-\uffee\ufffc\ufffd]');
			return re.test(c + '');
		},

		isPunctuation: function (c) {
			return this._UTFPunctuationsString.indexOf(c) >= 0;
		},

		isPrintableChar: function (c) {
			if ((!this.isLetterOrDigit(c) && !this.isPunctuation(c)) && !this.isSymbol(c)) {
				return (c === ' ');
			}
			return true;
		},

		isAscii: function (c) {
			return (c >= '!') && (c <= '~');
		},

		isAsciiLetter: function (c) {
			return ((c >= 'A') && (c <= 'Z')) || ((c >= 'a') && (c <= 'z'));
		},

		isUpper: function (c) {
			return c.toUpperCase() === c;
		},

		isLower: function (c) {
			return c.toLowerCase() === c;
		},

		isAlphanumeric: function (c) {
			return !this.isLetter(c) ? this.isDigit(c) : true;
		},

		isAciiAlphanumeric: function (c) {
			if (((c < '0') || (c > '9')) && ((c < 'A') || (c > 'Z'))) {
				if (c >= 'a') {
					return (c <= 'z');
				}
				return false;
			}
			return true;
		},

		setChar: function (input, ch, pos) {
			if (pos >= input.length || pos < 0) {
				return input;
			}
			return '' || input.substr(0, pos) + ch + input.substr(pos + 1);
		}
	});

	var c__escapeArr1 = ['\n', '\r', '"', '@', '+', '\'', '<', '>', '%', '{', '}'],
		c__escapeArr2 = ["!ESC!NN!", "!ESC!RR!", "!ESC!01!", "!ESC!02!", "!ESC!03!", "!ESC!04!", "!ESC!05!", "!ESC!06!", "!ESC!07!", "!ESC!08!", "!ESC!09!"],
		c__escapeArr3 = ["(\n)", "(\r)", "(\")", "(@)", "(\\+)", "(')", "(\\<)", "(\\>)", "(%)", "(\\{)", "(\\})"];

	if (!$.wij) {
		$.extend({ wij: {
			charValidator: new wijCharValidator(),
			encodeString: function (s) {
				for (var i = 0; i < c__escapeArr1.lemgth; i++) {
					var r = /c__escapeArr3[i]/g;
					s = s.replace(r, c__escapeArr2[i]);
				}
				return s;
			},
			decodeString: function (s) {
				if (s === "") {
					return;
				}
				for (var i = 0; i < c__escapeArr2.length; i++) {
					var r = /c__escapeArr2[i]/g;
					s = s.replace(r, c__escapeArr1[i]);
				}
				return s;
			}
		}
		});
	};

})(jQuery);

__wijReadOptionEvents = function (eventsArr, widgetInstance) {
	// handle option events
	for (var k = 0; k < eventsArr.length; k++) {
		if (widgetInstance.options[eventsArr[k]] != null)
			widgetInstance.element.bind(eventsArr[k], widgetInstance.options[eventsArr[k]]);
	}
	//handle option event names separated by space, like: "afterexpand aftercollapse"
	for (k in widgetInstance.options) {
		if (k.indexOf(" ") != -1) {
			// possible multiple events separated by space:
			var arr = k.split(" ");
			for (var j = 0; j < arr.length; j++) {
				if (arr[j].length > 0)
					widgetInstance.element.bind(arr[j], widgetInstance.options[k]);
			}
		}
	}
};





