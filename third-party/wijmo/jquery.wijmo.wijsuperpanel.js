/*globals window document jQuery */
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
* * Wijmo SuperPanel widget.
* 
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.resizable.js
*	jquery.ui.draggable.js
*	jquery.effects.core.js
*	jquery.mousewheel.js
*
*/
(function ($) {
	"use strict";
	var uiSuperPanelClasses = "wijmo-wijsuperpanel " + "ui-widget " + "ui-widget-content",
		rounderClass = "ui-corner-all",
		uiStateDisabled = "ui-state-disabled",
		uiStateHover = "ui-state-hover",
		uiStateActive = "ui-state-active",
		uiStateDefault = "ui-state-default",
		scrollerHandle = "wijmo-wijsuperpanel-handle",
		hbarContainerCSS = "wijmo-wijsuperpanel-hbarcontainer",
		vbarContainerCSS = "wijmo-wijsuperpanel-vbarcontainer",
		innerElementHtml =
				"<div class='wijmo-wijsuperpanel-statecontainer'>" +
				"<div class='wijmo-wijsuperpanel-contentwrapper'>" +
				"<div class='wijmo-wijsuperpanel-templateouterwrapper'></div>" +
				"</div>" +
				"</div>",
		hbarHtml = "<div class='wijmo-wijsuperpanel-hbarcontainer ui-widget-header'>" +
				"<div class='wijmo-wijsuperpanel-handle ui-state-default ui-corner-" +
				"all'><span class='ui-icon ui-icon-grip-solid-vertical'></span></div>" +
				"<div class='wijmo-wijsuperpanel-hbar-buttonleft ui-state-default " +
				"ui-corner-bl'><span class='ui-icon ui-icon-triangle-1-w'></span></div>" +
				"<div class='wijmo-wijsuperpanel-hbar-buttonright ui-state-default " +
				"ui-corner-br'><span class='ui-icon ui-icon-triangle-1-e'></span></div>" +
				"</div>",
		vbarHtml = "<div class='wijmo-wijsuperpanel-vbarcontainer ui-widget-header'>" +
				"<div class='wijmo-wijsuperpanel-handle ui-state-default ui-corner-all'" +
				"><span class='ui-icon ui-icon-grip-solid-horizontal'></span></div>" +
				"<div class='wijmo-wijsuperpanel-vbar-buttontop ui-state-default " +
				"ui-corner-tr'><span class='ui-icon ui-icon-triangle-1-n'></span></div>" +
				"<div class='wijmo-wijsuperpanel-vbar-buttonbottom ui-state-default " +
				"ui-corner-br'><span class='ui-icon ui-icon-triangle-1-s'></span></div>" +
				"</div>",
		hButtons = "<div class='ui-state-default wijmo-wijsuperpanel-button " +
				"wijmo-wijsuperpanel-buttonleft'><span class='ui-icon " +
				"ui-icon-carat-1-w'></span></div><div class='ui-state-default" +
				" wijmo-wijsuperpanel-button wijmo-wijsuperpanel-buttonright'>" +
				"<span class='ui-icon ui-icon-carat-1-e'></span></div>",
		vButtons = "<div class='ui-state-default wijmo-wijsuperpanel-button" +
		" wijmo-wijsuperpanel-buttontop'><span class='ui-icon ui-icon-carat-1-n'>" +
				"</span></div><div class='ui-state-default wijmo-wijsuperpanel-button" +
				" wijmo-wijsuperpanel-buttonbottom'><span class='ui-icon" +
				" ui-icon-carat-1-s'></span></div>";

	$.widget("wijmo.wijsuperpanel", {
		options: {
			/// <summary>
			/// This value determines whether the wijsuperpanel can be resized. 
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			allowResize: false,
			/// <summary>
			/// This value determines whether wijsuperpanel to automatically refresh 
			/// when content size or wijsuperpanel size are changed.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			autoRefresh: false,
			/// <summary>
			/// The animation properties of wijsuperpanel scrolling.
			/// Type: Object.
			/// </summary>
			/// <remarks>
			/// Set this options to null to disable animation.
			/// </remarks>
			animationOptions: {
				/// <summary>
				/// This value determines whether to queue animation operations.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				queue: false,
				/// <summary>
				/// This value determines whether to disable animation operations.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				disabled: false,
				/// <summary>
				/// This value sets the animation duration of the scrolling animation.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				duration: 250,
				/// <summary>
				/// This value sets the animation easing of the scrolling animation.
				/// Default: undefined.
				/// Type: string.
				/// </summary>
				easing: undefined
			},
			/// <summary>
			/// The hScrollerActivating event handler. 
			/// A function called when horizontal scrollbar is activating.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $("#selector").wijsuperpanel({ hScrollerActivating: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeClick
			/// $("#selector").bind("wijsuperpanelhScrollerActivating", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data that relates to this event.
			/// data.direction: the direction of the scrollbar("horizontal" or "vertical").
			/// data.targetBarLen: the height of the horizontal scrollbar.
			/// data.contentLength: the height of the content.
			/// </param>
			hScrollerActivating: null,
			/// <summary>
			/// This option contains horizontal scroller settings.
			/// </summary>
			hScroller: {
				/// <summary>
				/// This value determines the position of the horizontal scroll bar. 
				/// Default: "bottom".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "bottom" and "top".
				/// "bottom" - The horizontal scroll bar is placed at the bottom of 
				/// the content area.
				/// "top" - The horizontal scroll bar is placed at the top of the 
				///content area.
				/// </remarks>
				scrollBarPosition: "bottom",
				/// <summary>
				/// This value determines the visibility of the horizontal scroll bar.
				/// Default: "auto".
				/// Type: String
				/// </summary>
				/// <remarks>
				/// Possible options are "auto", "visible" and "hidden".
				/// "auto" - Shows the scroll when needed.
				/// "visible" - Scroll bar will always be visible. It"s disabled 
				/// when not needed.
				/// "hidden" - Scroll bar will be hidden.
				/// </remarks>
				scrollBarVisibility: "auto",
				/// <summary>
				/// This value determines the scroll mode of horizontal scrolling. 
				/// Default: "scrollbar".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "scrollBar", "buttons", "buttonsHover" 
				/// and "edge".
				/// "scrollBar" - Scroll bars are used for scrolling.
				/// "buttons" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are clicked.
				/// "buttonsHover" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are hovered.
				/// "edge" - Scrolling occurs when the mouse is moving to the edge
				/// of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, scrollMode: "scrollbar,scrollbuttons" will enable 
				/// both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: "scrollBar",
				/// <summary>
				/// This value determines the horizontal scrolling position of
				/// wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// This value sets the maximum value of horizontal scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// This value sets the minimum value of horizontal scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// This value sets the large change value of horizontal scroller.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks on the 
				/// tracks of scroll bars or presses left or right arrow keys on the 
				/// keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel will scroll 
				/// the width of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// This value sets the small change value of horizontal scroller.
				/// Default: null. 
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on 
				/// the arrows of scroll bars, clicks or hovers scroll buttons, 
				/// presses left or right arrow keys on keyboard, 
				/// and hovers on the edge of wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of 
				/// the width of content.
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// This value sets the minimum length, in pixel, of the horizontal 
				/// scroll bar thumb button.
				/// Default: 6.
				/// Type: Number.
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// This object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// This object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				decreaseButtonPosition: null,
				/// <summary>
				/// This value sets the width of horizontal hovering edge 
				/// which will trigger the horizontal scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The number specifies the value to add to smallchange or largechange
				/// when scrolling the first step(scrolling from scrollMin).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0

			},
			/// <summary>
			/// A value determins whether wijsuperpanel provides 
			/// keyboard scrolling support.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			keyboardSupport: false,
			/// <summary>
			/// This value determines the time interval to call the scrolling
			/// function when doing continuous scrolling.
			/// Default: 100.
			/// Type: Number.
			/// </summary>
			keyDownInterval: 100,
			/// <summary>
			/// This value determines whether wijsuperpanel has mouse wheel support.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			/// <remarks>
			/// Mouse wheel plugin is needed to support this feature.
			/// </remarks>
			mouseWheelSupport: true,
			/// <summary>
			/// This value determines whether to fire the mouse wheel event 
			/// when wijsuperpanel is scrolled to the end.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			bubbleScrollingEvent: true,
			/// <summary>
			/// This option determines the behavior of resizable widget. 
			/// See JQuery UI resizable options document.
			/// Type: Object.
			/// </summary>
			resizableOptions: {
				handles: "all",
				helper: "ui-widget-content wijmo-wijsuperpanel-helper"
			},
			/// <summary>
			/// Resized event handler. A function gets called when resized event is fired.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the resized event:
			/// $("#element").wijsuperpanel({ resized: funtion() { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelresized", funtion() { dosometing });
			/// </summary>
			resized: null,
			/// <summary>
			/// This function gets called when thumb buttons of scrollbars dragging stops.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the dragstop event:
			/// $("#element").wijsuperpanel({ dragStop: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpaneldragstop", funtion(e, data) { dosometing });
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.dir: data.draghandle is the direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).	
			/// </param>
			/// </summary>
			dragStop: null,
			/// <summary>
			/// This function gets called after panel is painted.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the painted event:
			/// $("#element").wijsuperpanel({ painted: funtion() { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelpainted", funtion() { dosometing });
			/// </summary>
			painted: null,
			/// <summary>
			/// Scrolling event handler. A function called before scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the scrolling event:
			/// $("#element").wijsuperpanel({ scrolling: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelscrolling", funtion(e, data) { dosometing });
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.oldValue: The scrollValue before scrolling occurs.
			/// data.newValue: The scrollValue after scrolling occurs.
			/// data.dir: The direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// </param>
			scrolling: null,
			/// <summary>
			/// Scrolled event handler.  A function called after scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the scrolled event:
			/// $("#element").wijsuperpanel({ scrolled: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelscrolled", funtion(e, data) { dosometing });
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.dir: The direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// data.afterPosition: The position of content after scrolling occurs.
			/// </param>
			scrolled: null,
			/// <summary>
			/// This value determines whether to show the rounded corner of wijsuperpanel.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showRounder: true,
			/// <summary>
			/// The vScrollerActivating event handler. 
			/// A function called when vertical scrollbar is activating.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $("#selector").wijsuperpanel({ vScrollerActivating: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeClick
			/// $("#selector").bind("wijsuperpanelvScrollerActivating", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data that relates to this event.
			/// data.direction: the direction of the scrollbar("horizontal" or "vertical").
			/// data.targetBarLen: the width of the vertical scrollbar.
			/// data.contentLength: the width of the content.
			/// </param>
			vScrollerActivating: null,
			/// <summary>
			/// This option contains vertical scroller settings.
			/// </summary>			
			vScroller: {
				/// <summary>
				/// This value determines the position of vertical scroll bar. 
				/// Default: "right".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: "left", "right".
				/// "left" - The vertical scroll bar is placed at the 
				/// left side of the content area.
				/// "right" - The vertical scroll bar is placed at the 
				/// right side of the content area.
				/// </remarks>
				scrollBarPosition: "right",
				/// <summary>
				/// This value determines the visibility of the vertical scroll bar.
				/// Default.: "auto". 
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "auto", "visible" and "hidden".
				/// "auto" - Shows the scroll bar when needed.
				/// "visible" - Scroll bar will always be visible. 
				/// It"s disabled when not needed.
				/// "hidden" - Scroll bar will be shown.
				/// </remarks>
				scrollBarVisibility: "auto",
				/// <summary>
				/// This value determines the scroll mode of vertical scrolling. 
				/// Default: "scrollbar".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: "scrollBar", "buttons", 
				/// "buttonsHover" and "edge".
				/// "scrollBar" - Scroll bars are used for scrolling.
				/// "buttons" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are clicked.
				/// "buttonsHover" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are hovered.
				/// "edge" - Scrolling occurs when the mouse is moving to 
				/// the edge of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, vScrollMode: "scrollbar,scrollbuttons" will enable 
				/// both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: "scrollBar",
				/// <summary>
				/// This value determines the vertical scrolling position of
				/// wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// This value sets the maximum value of vertical scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// This value sets the minimum value of vertical scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// This value sets the large change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks 
				/// on the tracks of scroll bars or presses left or right arrow keys 
				/// on the keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel 
				/// will scroll the height of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// This value sets the small change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on the 
				/// arrows of scroll bars, clicks or hovers scroll buttons, presses left
				/// or right arrow keys on keyboard, and hovers on the edge of 
				/// wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of 
				/// the height of content.
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// This value sets the minimum length, in pixel, of the vertical 
				/// scroll bar thumb button.
				/// Default: 6.
				/// Type: Number
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// This object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// This object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				decreaseButtonPosition: null,
				/// <summary>
				/// This value sets the width of horizontal hovering edge 
				/// which will trigger the vertical scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The value to add to small change or largechange when scrolling 
				/// the first step(scrolling from value 0).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0
			}
		},

		_setOption: function (key, value) {

			var self = this,
			o = self.options,
			f = self._fields(),
			hd = f.hbarDrag,
			vd = f.vbarDrag,
			r = f.resizer;
			// override existing 
			if (key === "animationOptions") {
				value = $.extend(o.animationOptions, value);
			}
			else if (key === "hScroller") {
				if (value.scrollLargeChange !== undefined &&
				value.scrollLargeChange !== null) {
					self._autoHLarge = false;
				}
				value = $.extend(o.hScroller, value);
			}
			else if (key === "vScroller") {
				if (value.scrollLargeChange !== undefined &&
				value.scrollLargeChange !== null) {
					self._autoVLarge = false;
				}
				value = $.extend(o.vScroller, value);
			}
			else if (key === "resizableOptions") {
				value = $.extend(self.resizableOptions, value);
			}
			$.Widget.prototype._setOption.apply(self, arguments);
			if ($.isPlainObject(value)) {
				self.options[key] = value;
			}
			switch (key) {
				case "allowResize":
					self._initResizer();
					break;
				case "disabled":
					if (value) {
						if (hd !== undefined) {
							hd.draggable("disable");
						}
						if (vd !== undefined) {
							vd.draggable("disable");
						}
						if (r !== undefined) {
							r.resizable("disable");
						}
					}
					else {
						if (hd !== undefined) {
							hd.draggable("enable");
						}
						if (vd !== undefined) {
							vd.draggable("enable");
						}
						if (r !== undefined) {
							r.resizable("enable");
						}
					}
					break;
				case "mouseWheelSupport":
				case "keyboardSupport":
					self._bindElementEvents(self, f, self.element, o);
					break;
			}
			return self;
		},

		_create: function () {
			var self = this, o = self.options;
			o.vScroller.dir = "v";
			o.hScroller.dir = "h";
			self.paintPanel();
			self._initResizer();
			if (self.options.disabled) {
				self.disable();
			}
			self._detectAutoRefresh();
		},

		_detectAutoRefresh: function () {
			// register with auto fresh.
			var self = this, panels = $.wijmo.wijsuperpanel.panels;
			if (panels === undefined) {
				panels = [];
				$.wijmo.wijsuperpanel.panels = panels;
			}
			panels.push(self);
			// start timer to monitor content.
			if (self.options.autoRefresh) {
				if (!$.wijmo.wijsuperpanel.setAutoRefreshInterval) {
					$.wijmo.wijsuperpanel.setAutoRefreshInterval =
					self._setAutoRefreshInterval;
					$.wijmo.wijsuperpanel.setAutoRefreshInterval();
				}
			}
		},

		_setAutoRefreshInterval: function () {
			var interval = $.wijmo.wijsuperpanel.autoRereshInterval,
			panels = $.wijmo.wijsuperpanel.panels,
			intervalID = window.setInterval(function () {
				window.clearInterval(intervalID);
				var count = panels.length, toContinue = false, i, panel,
				mainElement, autoRefresh, ele, mark;
				for (i = 0; i < count; i++) {
					panel = panels[i];
					mainElement = panel.element[0];
					autoRefresh = panel.options.autoRefresh;
					if (autoRefresh) {
						toContinue = true;
					}
					ele = panel.getContentElement();
					mark = panel._paintedMark;
					if (panel.options.autoRefresh && ele.is(":visible") &&
					(mark === undefined ||
					mark.width !== ele[0].offsetWidth ||
					mark.height !== ele[0].offsetHeight ||
					mark.mainWidth !== mainElement.offsetWidth ||
					mark.mainHeight !== mainElement.offsetHeight)) {
						panel.paintPanel();
					}
				}
				if (toContinue) {
					window.setTimeout($.wijmo.wijsuperpanel.setAutoRefreshInterval, 0);
				}
			}, interval === undefined ? 500 : interval);
		},

		destroy: function () {
			/// <summary>
			/// Destroys wijsuperpanel widget and reset the DOM element.
			/// </summary>

			var self = this, f = self._fields(), ele = self.element,
			buttons, templateWrapper;
			// remove this widget from panels array.
			$.wijmo.wijsuperpanel.panels =
			$.grep($.wijmo.wijsuperpanel.panels, function (value) {
				return value !== self;
			});
			if (!f.initialized) {
				return;
			}
			if (self._radiusKey) {
				self.element.css(self._radiusKey, "");
			}
			if (f.intervalID !== undefined) {
				window.clearInterval(f.intervalID);
				f.intervalID = undefined;
			}
			// destory widgets
			if (f.resizer !== undefined) {
				f.resizer.resizable("destroy");
			}
			if (f.hbarContainer !== undefined) {
				f.hbarDrag.remove();
				f.hbarContainer.unbind("." + self.widgetName);
			}
			if (f.vbarContainer !== undefined) {
				f.vbarDrag.remove();
				f.vbarContainer.unbind("." + self.widgetName);
			}
			ele.unbind("." + self.widgetName);
			f.contentWrapper.unbind("." + self.widgetName);
			buttons = f.stateContainer.find(">.wijmo-wijsuperpanel-button");
			buttons.unbind("." + self.widgetName);
			templateWrapper = f.templateWrapper;
			templateWrapper.contents().each(function (index, e) {
				ele.append(e);
			});
			f.stateContainer.remove();
			if (f.tabindex) {
				ele.removeAttr("tabindex");
			}
			ele.removeClass(uiSuperPanelClasses + " " + rounderClass);
			$.Widget.prototype.destroy.apply(self, arguments);
		},

		_fields: function () {
			var self = this, ele = self.element, key = self.widgetName + "-fields",
			d = self._fieldsStore;
			if (d === undefined) {
				d = {};
				ele.data(key, d);
				self._fieldsStore = d;
			}
			return d;
		},

		_hasMode: function (scroller, mode) {
			var modes = scroller.scrollMode.split(",");
			modes = $.map(modes, function (n) {
				return $.trim(n).toLowerCase();
			});

			return $.inArray(mode.toLowerCase(), modes) > -1;
		},

		_bindElementEvents: function (self, f, ele, o) {
			// mouse move only edge mode is used.
			var hEdge = self._hasMode(o.hScroller, "edge"),
			vEdge = self._hasMode(o.vScroller, "edge"),
			wn = self.widgetName;

			if (hEdge || vEdge) {
				if (self._mousemoveBind === undefined) {
					self._mousemoveBind = true;
					ele.bind("mousemove." + wn, self, self._contentMouseMove);
					ele.bind("mouseleave." + wn, null, function () {
						self._clearInterval();
					});
				}
			}
			else {
				ele.unbind("mousemove", self._contentMouseMove);
				self._mousemoveBind = undefined;
			}
			if (o.mouseWheelSupport) {
				if (self._mouseWheelBind === undefined) {
					self._mouseWheelBind = true;
					ele.bind("mousewheel." + wn, self, self._panelMouseWheel);
				}
			}
			else {
				self.element.unbind("mousewheel", self._panelMouseWheel);
				self._mouseWheelBind = undefined;
			}
			if (o.keyboardSupport) {
				if (self._keyboardBind === undefined) {
					self._keyboardBind = true;
					ele.bind("keydown." + wn, self, self._panelKeyDown);
				}
			}
			else {
				ele.unbind("keydown", self._panelKeyDown);
				self._keyboardBind = undefined;
			}
		},

		_dragStop: function (e, self, dir) {
			// Handles mouse drag stop event of thumb button.

			var data = {
				dragHandle: dir
			};
			self._trigger("dragStop", e, data);
		},

		_contentMouseMove: function (e) {
			// Handles mouse move event of content area.
			// Edge hover scrolling is handled in this method.

			var self = e.data, o = self.options, hScroller, vScroller,
			contentWrapper, f, hMode, vMode, mousePagePosition, off, left, top,
			hEdge, vEdge, innerHeight, innerWidth, dir;
			if (o.disabled) {
				return;
			}
			hScroller = o.hScroller;
			vScroller = o.vScroller;
			contentWrapper = $(e.currentTarget);
			f = self._fields();
			hMode = self._hasMode(hScroller, "edge");
			vMode = self._hasMode(vScroller, "edge");
			self._clearInterval();
			mousePagePosition = {
				X: e.pageX,
				Y: e.pageY
			};
			off = contentWrapper.offset();
			left = off.left;
			top = off.top;
			left = mousePagePosition.X - left;
			top = mousePagePosition.Y - top;
			hEdge = hScroller.hoverEdgeSpan;
			vEdge = vScroller.hoverEdgeSpan;
			innerHeight = contentWrapper.innerHeight();
			innerWidth = contentWrapper.innerWidth();
			dir = "";
			if (hMode) {
				if (left < hEdge) {
					dir = "left";
				}
				if (left > (innerWidth - hEdge)) {
					dir = "right";
				}
			}
			if (vMode) {
				if (top < vEdge) {
					dir = "top";
				}
				if (top > (innerHeight - vEdge)) {
					dir = "bottom";
				}
			}
			self._setScrollingInterval(f, dir, self, false);
		},

		_setScrollingInterval: function (f, dir, self, large) {
			var o = self.options;
			if (dir.length > 0) {
				f.internalFuncID = window.setInterval(function () {
					self._doScrolling(dir, self, large);
				}, o.keyDownInterval);
			}
		},

		_scrollButtonMouseOver: function (e) {
			// Scroll buttons mouse over event handler.

			var self = e.data, button;
			if (self.options.disabled) {
				return;
			}
			button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.bind("mouseout." + self.widgetName, self, self._buttonMouseOut)
				.bind("mousedown." + self.widgetName, self, self._buttonMouseDown)
				.bind("mouseup." + self.widgetName, self, self._buttonMouseUp)
				.addClass(uiStateHover);
				self._buttonScroll(button, self, "buttonshover");
			}
		},

		_buttonScroll: function (button, self, mode) {
			// Do button scroll.

			var dir = "", o = self.options,
			f = self._fields(),
			hMode = self._hasMode(o.hScroller, mode),
			vMode = self._hasMode(o.vScroller, mode);

			if (button.hasClass("wijmo-wijsuperpanel-buttonleft") && hMode) {
				dir = "left";
			}
			else if (button.hasClass("wijmo-wijsuperpanel-buttonright") && hMode) {
				dir = "right";
			}
			else if (button.hasClass("wijmo-wijsuperpanel-buttontop") && vMode) {
				dir = "top";
			}
			else if (button.hasClass("wijmo-wijsuperpanel-buttonbottom") && vMode) {
				dir = "bottom";
			}
			if (dir.length > 0) {
				self._clearInterval();
				self._doScrolling(dir, self, true);
				self._setScrollingInterval(f, dir, self, true);
			}
		},

		_buttonMouseDown: function (e) {
			var self = e.data, button;
			if (self.options.disabled) {
				return;
			}
			button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.addClass(uiStateActive);
				self._buttonScroll(button, self, "buttons");
			}
		},

		_buttonMouseUp: function (e) {
			var self = e.data, button = $(e.currentTarget);
			button.removeClass("ui-state-active");
			self._clearInterval();
		},

		_buttonMouseOut: function (e) {
			var self = e.data, button = $(e.currentTarget);
			button.unbind("mouseout", self._buttonMouseOut)
			.unbind("mousedown", self._buttonMouseDown)
			.unbind("mouseup", self._buttonMouseUp)
			.removeClass(uiStateHover)
			.removeClass(uiStateActive);
			self._clearInterval();
		},

		_panelKeyDown: function (e) {
			// Key down handler.

			var self = e.data, o = self.options, shift, keycode;
			if (!o.keyboardSupport || o.disabled) {
				return;
			}
			shift = e.shiftKey;
			keycode = e.keyCode;
			if (keycode === $.ui.keyCode.LEFT) {
				self._doScrolling("left", self, shift);
			}
			else if (keycode === $.ui.keyCode.RIGHT) {
				self._doScrolling("right", self, shift);
			}
			else if (keycode === $.ui.keyCode.UP) {
				self._doScrolling("top", self, shift);
			}
			else if (keycode === $.ui.keyCode.DOWN) {
				self._doScrolling("bottom", self, shift);
			}
			e.stopPropagation();
			e.preventDefault();
		},

		_draggingInternal: function (data, self, scroller, originalElement) {
			var dir = scroller.dir, h = dir === "h",
			key = h ? "left" : "top",
			//the parameter from draggable widget is supposed to be used instead of the style property of html element
			//left = parseFloat(originalElement[0].style[key].replace("px", "")) -
			left = data.position[key] -
			self._getScrollContainerPadding(key),
			track = self._getTrackLen(dir) -
			//originalElement[h ? "outerWidth" : "outerHeight"](),
			originalElement[h ? "outerWidth" : "outerHeight"](true),
			proportion = left / track,
			topValue = (scroller.scrollMax - scroller.scrollLargeChange + 1),
			v = proportion * topValue, data;
			if (v < scroller.scrollMin) {
				v = scroller.scrollMin;
			}
			if (v > topValue) {
				v = topValue;
			}
			data = {
				oldValue: scroller.scrollValue,
				newValue: v,
				dir: dir
			};
			if (!self._scrolling(true, self, data)) {
				// event is canceled in scrolling.
				return;
			}
			scroller.scrollValue = v;
			self._setDragAndContentPosition(true, false, dir, "dragging");
		},

		_dragging: function (e, data, self) {
			var o = self.options, originalElement = $(e.target),
			p = originalElement.parent();
			if (p.hasClass(hbarContainerCSS)) {
				self._draggingInternal(data, self, o.hScroller, originalElement);
			}
			else {
				self._draggingInternal(data, self, o.vScroller, originalElement);
			}
		},

		_panelMouseWheel: function (e, delta) {
			var self = e.data, o = self.options, originalElement, dir, onHbar,
			hScroller, vScroller, scrollEnd;
			if (!o.mouseWheelSupport || o.disabled) {
				return;
			}
			//var f = self._fields();
			//var scrollerWrapper = f.stateContainer;
			//var hbarContainer = f.hbarContainer;
			originalElement = $(e.srcElement || e.originalEvent.target);
			dir = "";
			onHbar = originalElement.closest("." + hbarContainerCSS, self.element)
			.size() > 0;
			hScroller = o.hScroller;
			vScroller = o.vScroller;
			if (delta > 0) {
				dir = onHbar ? "left" : "top";
			}
			else {
				dir = onHbar ? "right" : "bottom";
			}

			if (dir.length > 0) {
				self._doScrolling(dir, self);
			}
			scrollEnd = false;
			if (dir === "left") {
				scrollEnd = !self.hNeedScrollBar ||
				Math.abs(hScroller.scrollValue - hScroller.scrollMin) < 0.001;
			}
			if (dir === "right") {
				scrollEnd = !self.hNeedScrollBar || Math.abs(hScroller.scrollValue -
				(hScroller.scrollMax - self._getHScrollBarLargeChange() + 1)) < 0.001;
			}
			if (dir === "top") {
				scrollEnd = !self.vNeedScrollBar ||
				Math.abs(vScroller.scrollValue - vScroller.scrollMin) < 0.001;
			}
			if (dir === "bottom") {
				scrollEnd = !self.vNeedScrollBar || Math.abs(vScroller.scrollValue -
				(vScroller.scrollMax - self._getVScrollBarLargeChange() + 1)) < 0.001;
			}
			if (!scrollEnd || !o.bubbleScrollingEvent || dir === "left" ||
			 dir === "right") {
				e.stopPropagation();
				e.preventDefault();
			}
		},

		_documentMouseUp: function (e) {
			var self = e.data.self, ele = e.data.ele;
			ele.removeClass(uiStateActive);
			self._clearInterval();
			$(document).unbind("mouseup", self._documentMouseUp);
		},

		_scrollerMouseOver: function (e) {
			var self = e.data, originalElement, ele, addhover;
			if (self.options.disabled) {
				return;
			}
			originalElement = $(e.srcElement || e.originalEvent.target);
			ele = null;
			addhover = false;

			if (originalElement.hasClass(uiStateDefault)) {
				ele = originalElement;
				addhover = true;
			}
			else if (originalElement.parent().hasClass(uiStateDefault)) {
				ele = originalElement.parent();
				addhover = true;
			}
			else if (originalElement.hasClass(vbarContainerCSS) ||
			originalElement.hasClass(hbarContainerCSS)) {
				ele = originalElement;
			}

			if (ele !== undefined) {
				if (addhover) {
					ele.addClass(uiStateHover);
				}
				ele.bind("mouseout." + self.widgetName, self, self._elementMouseOut);
				ele.bind("mousedown." + self.widgetName, self, self._elementMouseDown);
				ele.bind("mouseup." + self.widgetName, self, self._elementMouseUp);
			}
		},

		_elementMouseUp: function (e) {
			var ele = $(e.currentTarget);
			//var self = e.data;
			ele.removeClass("ui-state-active");
		},

		_elementMouseDown: function (e) {
			var ele = $(e.currentTarget), self = e.data,
			scrollDirection, large, active, hbarDrag, pos, vbarDrag, pos2, f;
			if (self.options.disabled || e.which !== 1) {
				return;
			}
			scrollDirection = "";
			large = false;
			active = false;
			if (ele.hasClass("wijmo-wijsuperpanel-vbar-buttontop")) {
				scrollDirection = "top";
				active = true;
			}
			else if (ele.hasClass("wijmo-wijsuperpanel-vbar-buttonbottom")) {
				scrollDirection = "bottom";
				active = true;
			}
			else if (ele.hasClass("wijmo-wijsuperpanel-hbar-buttonleft")) {
				scrollDirection = "left";
				active = true;
			}
			else if (ele.hasClass("wijmo-wijsuperpanel-hbar-buttonright")) {
				scrollDirection = "right";
				active = true;
			}
			else if (ele.hasClass(scrollerHandle)) {
				ele.addClass("ui-state-active");
				return;
			}
			else if (ele.hasClass(hbarContainerCSS)) {
				hbarDrag = ele.find("." + scrollerHandle);
				pos = hbarDrag.offset();
				if (e.pageX < pos.left) {
					scrollDirection = "left";
				}
				else {
					scrollDirection = "right";
				}
				large = true;
			}
			else if (ele.hasClass(vbarContainerCSS)) {
				vbarDrag = ele.find("." + scrollerHandle);
				pos2 = vbarDrag.offset();
				if (e.pageY < pos2.top) {
					scrollDirection = "top";
				}
				else {
					scrollDirection = "bottom";
				}
				large = true;
			}
			self._clearInterval();
			self._doScrolling(scrollDirection, self, large);
			f = self._fields();
			self._setScrollingInterval(f, scrollDirection, self, large);
			if (active) {
				ele.addClass("ui-state-active");
			}
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: ele
			}, self._documentMouseUp);
		},

		doScrolling: function (dir, large) {
			/// <summary>
			/// Do scrolling.
			/// </summary>
			/// <param name="dir" type="string">
			///   Scrolling direction. Options are: "left", "right", "top" and "bottom".
			/// </param>
			/// <param name="large" type="Boolean">
			/// Whether to scroll a large change.
			/// </param>

			this._doScrolling(dir, this, large);
		},

		_setScrollerValue: function (dir, scroller, smallChange, largeChange,
		isAdd, isLarge, self) {
			//var o = self.options;
			var vMin = scroller.scrollMin,
			change = isLarge ? largeChange : smallChange,
			value = scroller.scrollValue, t, vTopValue, firstStepChangeFix, data;
			if (!value) {
				value = vMin;
			}
			t = 0;
			if (isAdd) {
				vTopValue = scroller.scrollMax - largeChange + 1;
				if (Math.abs(value - vTopValue) < 0.001) {
					self._clearInterval();
					return false;
				}
				firstStepChangeFix = scroller.firstStepChangeFix;
				t = value + change;
				if (!isLarge && Math.abs(value - vMin) < 0.0001 &&
				!isNaN(firstStepChangeFix)) {
					t += firstStepChangeFix;
				}
				if (t > vTopValue) {
					t = vTopValue;
				}
			}
			else {
				if (Math.abs(value - vMin) < 0.001) {
					self._clearInterval();
					return false;
				}
				t = value - change;
				if (t < 0) {
					t = vMin;
				}
			}
			data = {
				oldValue: scroller.scrollValue,
				newValue: t,
				direction: dir,
				dir: scroller.dir
			};
			if (!self._scrolling(true, self, data)) {
				return false;
			}
			scroller.scrollValue = t;
			return true;
		},

		_doScrolling: function (dir, self, large) {
			// Does wijsuperpanel scrolling.
			// <param name="dir" type="String">
			// Scroll direction. 
			// Options are: "left", "right", "top" and "bottom".
			// </param>
			// <param name="self" type="jQuery">
			// Pointer to the wijsuperpanel widget instance.
			// </param>
			// <param name="large" type="Boolean">
			// Whether to scroll a large change.
			// </param>

			var o = self.options,
			vScroller = o.vScroller,
			hScroller = o.hScroller,
			vSmall = self._getVScrollBarSmallChange(),
			vLarge = self._getVScrollBarLargeChange(),
			hLarge = self._getHScrollBarLargeChange(),
			hSmall = self._getHScrollBarSmallChange();

			if (dir === "top" || dir === "bottom") {
				if (!self._setScrollerValue(dir, vScroller, vSmall, vLarge,
				dir === "bottom", large, self)) {
					return;
				}
				dir = "v";
			}
			else if (dir === "left" || dir === "right") {
				if (!self._setScrollerValue(dir, hScroller, hSmall, hLarge,
				dir === "right", large, self)) {
					return;
				}
				dir = "h";
			}
			self._setDragAndContentPosition(true, true, dir);
		},

		_disableButtonIfNeeded: function (self) {
			// Disables scrolling buttons.

			var f = self._fields(), o, buttonLeft, buttonRight, buttonTop, buttonBottom,
			hLargeChange, hMax, hValue, hScrollMin, vLargeChange, vMax, vValue,
			vScrollMin;
			if (f.intervalID > 0) {
				window.clearInterval(f.intervalID);
			}
			o = self.options;
			buttonLeft = f.buttonLeft;
			buttonRight = f.buttonRight;
			buttonTop = f.buttonTop;
			buttonBottom = f.buttonBottom;

			if (buttonLeft !== undefined) {
				hLargeChange = self._getHScrollBarLargeChange();

				hMax = o.hScroller.scrollMax - hLargeChange + 1;
				hValue = o.hScroller.scrollValue;
				hScrollMin = o.hScroller.scrollMin;

				if (hValue === undefined) {
					hValue = hScrollMin;
				}
				if (Math.abs(hValue - hScrollMin) < 0.001 || !f.hScrolling) {
					buttonLeft.addClass(uiStateDisabled);
				}
				else {
					buttonLeft.removeClass(uiStateDisabled);
				}
				if (Math.abs(hValue - hMax) < 0.001 || !f.hScrolling) {
					buttonRight.addClass(uiStateDisabled);
				}
				else {
					buttonRight.removeClass(uiStateDisabled);
				}
			}
			if (buttonTop !== undefined) {
				vLargeChange = self._getVScrollBarLargeChange();
				vMax = o.vScroller.scrollMax - vLargeChange + 1;
				vValue = o.vScroller.scrollValue;
				vScrollMin = o.vScroller.scrollMin;
				if (vValue === undefined) {
					vValue = vScrollMin;
				}
				if (Math.abs(vValue - vScrollMin) < 0.001 || !f.vScrolling) {
					buttonTop.addClass(uiStateDisabled);
				}
				else {
					buttonTop.removeClass(uiStateDisabled);
				}
				if (Math.abs(vValue - vMax) < 0.001 || !f.vScrolling) {
					buttonBottom.addClass(uiStateDisabled);
				}
				else {
					buttonBottom.removeClass(uiStateDisabled);
				}
			}
		},

		_clearInterval: function () {
			var f = this._fields(), intervalID = f.internalFuncID;
			if (intervalID > 0) {
				window.clearInterval(intervalID);
				f.internalFuncID = -1;
			}
		},

		_elementMouseOut: function (event) {
			var ele = $(event.currentTarget), self = event.data;

			ele.unbind("mouseout", self._elementMouseOut);
			ele.unbind("mousedown", self._elementMouseDown);
			ele.unbind("mouseup", self._elementMouseUp);

			ele.removeClass(uiStateHover);
		},

		scrollChildIntoView: function (child1) {
			/// <summary>
			/// Scroll children DOM element to view. 
			/// </summary>
			/// <param name="child" type="DOMElement/JQueryObj">
			/// The child to scroll to.
			/// </param>

			var child = $(child1), f, cWrapper, tempWrapper, left, top,
			childOffset, templateOffset, cWrapperOffset;

			if (child.size() === 0) {
				return;
			}
			f = this._fields();
			cWrapper = f.contentWrapper;
			tempWrapper = f.templateWrapper;
			childOffset = child.offset();
			templateOffset = tempWrapper.offset();

			childOffset.leftWidth = childOffset.left + child.outerWidth();
			childOffset.topHeight = childOffset.top + child.outerHeight();
			cWrapperOffset = cWrapper.offset();
			cWrapperOffset.leftWidth = cWrapperOffset.left + cWrapper.outerWidth();
			cWrapperOffset.topHeight = cWrapperOffset.top + cWrapper.outerHeight();

			if (childOffset.left < cWrapperOffset.left) {
				left = childOffset.left - templateOffset.left;
			}
			else if (childOffset.leftWidth > cWrapperOffset.leftWidth) {
				left = childOffset.leftWidth - templateOffset.left -
				cWrapper.innerWidth();
			}
			if (childOffset.top < cWrapperOffset.top) {
				top = childOffset.top - templateOffset.top;
			}
			else if (childOffset.topHeight > cWrapperOffset.topHeight) {
				top = childOffset.topHeight - templateOffset.top -
				cWrapper.innerHeight();
			}
			if (left !== undefined) {
				this.hScrollTo(left);
			}
			if (top !== undefined) {
				this.vScrollTo(top);
			}
		},

		hScrollTo: function (x) {
			/// <summary>
			/// Scroll to horizontal position.
			/// </summary>
			/// <param name="x" type="Number">
			/// The position to scroll to.
			/// </param>
			var o = this.options;
			//var f = this._fields();
			o.hScroller.scrollValue = this.scrollPxToValue(x, "h");
			//this._setDragAndContentPosition(false, true, "h", "nonestop");
			this._setDragAndContentPosition(true, true, "h", "nonestop");
		},

		vScrollTo: function (y) {
			/// <summary>
			/// Scroll to vertical position.
			/// </summary>
			/// <param name="y" type="Number">
			/// The position to scroll to.
			/// </param>

			var o = this.options;
			o.vScroller.scrollValue = this.scrollPxToValue(y, "v");
			//this._setDragAndContentPosition(false, true, "v", "nonestop");
			this._setDragAndContentPosition(true, true, "v", "nonestop");
		},

		scrollPxToValue: function (px, dir) {
			/// <summary>
			/// Convert pixel to scroll value.
			/// For example, wijsuperpanel scrolled 50px 
			///which is value 1 after conversion.
			/// </summary>
			/// <param name="px" type="Number">
			/// Length of scrolling.
			/// </param>
			/// <param name="dir" type="String">
			/// Scrolling direction. Options are: "h" and "v".
			/// </param>

			var o = this.options,
			m = (dir === "h" ? "outerWidth" : "outerHeight"),
			m1 = (dir === "h" ? "contentWidth" : "contentHeight"),
			scroller = (dir === "h" ? "hScroller" : "vScroller"),
			f = this._fields(),
			cWrapper = f.contentWrapper,
			//var tempWrapper = f.templateWrapper;
			size = f[m1],
			contentHeight = cWrapper[m](),

			vMin = o[scroller].scrollMin,
			vMax = o[scroller].scrollMax,
			vRange = vMax - vMin,
			vLargeChange = (dir === "h" ?
			this._getHScrollBarLargeChange() : this._getVScrollBarLargeChange()),
			maxv = vRange - vLargeChange + 1,
			ret = maxv * (px / (size - contentHeight));
			if (ret < vMin) {
				ret = vMin;
			}
			if (ret > maxv) {
				ret = maxv;
			}
			return ret;
		},

		scrollTo: function (x, y) {
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <param name="x" type="Number">
			/// Horizontal position to scroll to.	
			/// </param>
			/// <param name="y" type="Number">
			/// Vertical position to scroll to.
			/// </param>

			this.hScrollTo(x);
			this.vScrollTo(y);
		},

		paintPanel: function (unfocus) {
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <returns type="Boolean">
			/// Returns true if painting is successful, else returns false. 
			/// </returns>
			var self = this, ele = self.element, focused, o, f, templateWrapper;
			if (ele.is(":visible")) {
				focused = document.activeElement;
				o = self.options;
				f = self._fields();
				if (!f.initialized) {
					self._initialize(f, ele, self);
				}
				self._resetLargeChange(self, f, o);
				self._bindElementEvents(self, f, ele, o);
				templateWrapper = f.templateWrapper;
				templateWrapper.css({ "float": "left", left: "0px", top: "0px",
					width: "auto", height: "auto"
				});
				// hide and show wrapper div to force the width to change
				// for some browser.
				templateWrapper.hide();
				templateWrapper.show();
				f.contentWidth = templateWrapper.width();
				f.contentHeight = templateWrapper.height();
				templateWrapper.css("float", "");
				self._setRounder(self, ele);
				self._setInnerElementsSize(f, ele);
				if (self._testScroll(self, f, o) === false) {
					return false;
				}
				self._initScrollBars(self, f, o);
				self._initScrollButtons(self, f, o);
				self._trigger("painted");

				self._paintedMark = { date: new Date(), mainWidth: ele[0].offsetWidth,
					mainHeight: ele[0].offsetHeight, width: f.contentWidth,
					height: f.contentWidth
				};
				if (focused !== undefined && !unfocus) {
					$(focused).focus();
				}
				return true;
			}
			return false;
		},

		_resetLargeChange: function (self, f, o) {
			var handle;
			if (self._autoVLarge) {
				o.vScroller.scrollLargeChange = null;
			}
			if (self._autoHLarge) {
				o.hScroller.scrollLargeChange = null;
			}
			f.vTrackLen = undefined;
			f.hTrackLen = undefined;
			if (f.vbarContainer) {
				// fixed bug when the original draggable element removed when it's being dragged.
				// use detach to keep the events to be fired(IE).
				handle = f.vbarContainer.children("." +
				scrollerHandle + ":eq(0)");
				handle.detach();

				f.vbarContainer.remove();
				f.vbarContainer = undefined;
			}
			if (f.hbarContainer) {
				handle = f.hbarContainer.children("." +
				scrollerHandle + ":eq(0)");
				handle.detach();

				f.hbarContainer.remove();
				f.hbarContainer = undefined;
			}
		},

		_initialize: function (f, ele, self) {
			f.initialized = true;
			// ensure width and height
			ele.addClass(uiSuperPanelClasses);
			f.oldHeight = ele.css("height");
			var old = ele.css("overflow");
			ele.css("overflow", "");
			// set height to element
			ele.height(ele.height());
			ele.css("overflow", old);

			self._createAdditionalDom(self, f, ele);
		},

		getContentElement: function () {
			/// <summary>
			/// Gets the content element of wijsuperpanel.
			/// </summary>
			/// <returns type="JQueryObj" />

			return this._fields().templateWrapper;
		},

		_setButtonPosition: function (self, o, scroller, dir, target, f, state) {
			var h = dir === "h", mouseoverkey = "mouseover." + self.widgetName,
			decKey = h ? "buttonLeft" : "buttonTop",
			incKey = h ? "buttonRight" : "buttonBottom",
			decButton = f[decKey],
			incButton = f[incKey], html, buttons, defaultPosition;
			if (self._hasMode(scroller, "buttons") ||
			self._hasMode(scroller, "buttonshover")) {

				html = h ? hButtons : vButtons;
				if (decButton === undefined) {
					buttons = $(html).appendTo(state);
					buttons.bind(mouseoverkey, self, self._scrollButtonMouseOver);
					f[decKey] = decButton = state.children(h ?
					".wijmo-wijsuperpanel-buttonleft" : ".wijmo-wijsuperpanel-buttontop");
					f[incKey] = incButton = state.children(h ?
					".wijmo-wijsuperpanel-buttonright" :
					".wijmo-wijsuperpanel-buttonbottom");
				}
				defaultPosition = {
					my: h ? "left" : "top",
					of: target,
					at: h ? "left" : "top",
					collision: "none"
				};
				$.extend(defaultPosition, scroller.decreaseButtonPosition);
				decButton.position(defaultPosition);
				defaultPosition = {
					my: h ? "right" : "bottom",
					of: target,
					at: h ? "right" : "bottom",
					collision: "none"
				};
				$.extend(defaultPosition, scroller.increaseButtonPosition);
				incButton.position(defaultPosition);
			}
			else if (decButton !== undefined) {
				decButton.remove();
				incButton.remove();
				f[decKey] = f[incKey] = undefined;
			}
		},

		_initScrollButtons: function (self, f, o) {
			var a = f.contentWrapper,
			state = f.stateContainer;
			self._setButtonPosition(self, o, o.hScroller, "h", a, f, state);
			self._setButtonPosition(self, o, o.vScroller, "v", a, f, state);
		},

		_getVScrollBarSmallChange: function () {
			var o = this.options, va;
			if (!o.vScroller.scrollSmallChange) {
				va = this._getVScrollBarLargeChange();
				o.vScroller.scrollSmallChange = va / 2;
			}
			return o.vScroller.scrollSmallChange;
		},

		_getVScrollBarLargeChange: function () {
			return this._getLargeChange("v");
		},

		_getLargeChange: function (dir) {
			var self = this,
			o = self.options,
			f = self._fields(),
			v = dir === "v",
			scroller = v ? o.vScroller : o.hScroller,
			//clientKey = v ? "clientHeight" : "clientWidth",
			clientKey = v ? "innerHeight" : "innerWidth",
			offsetKey = v ? "contentHeight" : "contentWidth",
			autoKey = v ? "_autoVLarge" : "_autoHLarge",
			hMax, hMin, hRange, content, contentWidth, wrapperWidth, percent, large;

			if (scroller.scrollLargeChange) {
				return scroller.scrollLargeChange;
			}

			// calculate large change if empty
			hMax = scroller.scrollMax;
			hMin = scroller.scrollMin;
			hRange = hMax - hMin;

			content = f.contentWrapper;
			//contentWidth = content[0][clientKey];
			contentWidth = content[clientKey]();
			wrapperWidth = f[offsetKey];

			percent = contentWidth / (wrapperWidth - contentWidth);
			large = ((hRange + 1) * percent) / (1 + percent);
			if (isNaN(large)) {
				large = 0;
			}
			scroller.scrollLargeChange = large;

			self[autoKey] = true;
			return scroller.scrollLargeChange;
		},

		_getHScrollBarSmallChange: function () {
			var o = this.options, va;
			if (!o.hScroller.scrollSmallChange) {
				va = this._getHScrollBarLargeChange();
				o.hScroller.scrollSmallChange = va / 2;
			}
			return o.hScroller.scrollSmallChange;
		},

		_getHScrollBarLargeChange: function () {
			return this._getLargeChange("h");
		},

		_initScrollBars: function (self, f, o) {
			// Set scroll bar initial position.
			var hScroller = o.hScroller,
			hMax = hScroller.scrollMax,
			hMin = hScroller.scrollMin,
			hRange = hMax - hMin,

			vScroller = o.vScroller,
			vMax = vScroller.scrollMax,
			vMin = vScroller.scrollMin,
			vRange = vMax - vMin,

			hbarDrag = f.hbarDrag,
			vbarDrag = f.vbarDrag,
			hLargeChange, track, dragLen, difference, icon, vLargeChange,
			track1, dragLen1, difference1, icon1;
			if (self.hNeedScrollBar && hbarDrag.is(":visible")) {
				hLargeChange = self._getHScrollBarLargeChange();
				track = self._getTrackLen("h");
				dragLen = self._getDragLength(hRange, hLargeChange,
				track, o.hScroller.scrollMinDragLength);
				hbarDrag.width(dragLen);
				//difference = hbarDrag.outerWidth() - hbarDrag.width();
				difference = hbarDrag.outerWidth(true) - hbarDrag.width();
				hbarDrag.width(dragLen - difference);
				icon = hbarDrag.children("span");
				icon.css("margin-left", (hbarDrag.width() - icon[0].offsetWidth) / 2);
				//if (track <= hbarDrag.outerWidth()) {
				if (track <= hbarDrag.outerWidth(true)) {
					hbarDrag.hide();
				}
				else {
					hbarDrag.show();
				}
			}
			if (self.vNeedScrollBar && vbarDrag.is(":visible")) {
				vLargeChange = self._getVScrollBarLargeChange();
				track1 = self._getTrackLen("v");
				dragLen1 = self._getDragLength(vRange, vLargeChange, track1,
				o.vScroller.scrollMinDragLength);
				vbarDrag.height(dragLen1);
				//difference1 = vbarDrag.outerHeight() - vbarDrag.height();
				difference1 = vbarDrag.outerHeight(true) - vbarDrag.height();
				vbarDrag.height(dragLen1 - difference1);
				icon1 = vbarDrag.children("span");
				icon1.css("margin-top", (vbarDrag.height() - icon1[0].offsetHeight) / 2);
				//if (track1 <= vbarDrag.outerHeight()) {
				if (track1 <= vbarDrag.outerHeight(true)) {
					vbarDrag.hide();
				}
				else {
					vbarDrag.show();
				}
			}
			self._setDragAndContentPosition(false, false, "both");
		},

		_getTrackLen: function (dir) {
			// Get the length of the track.
			// <param name="dir" type="String">
			// Options are: "v" and "h".
			// "v" - Vertical scroll track.
			// "h" - Horizontal scroll track.
			// </param>

			var self = this,
			f = self._fields(),
			//var o = self.options;
			key = dir + "TrackLen",
			hbarContainer, vbarContainer, track, padding;
			if (f[key] !== undefined) {
				return f[key];
			}

			hbarContainer = f.hbarContainer;
			vbarContainer = f.vbarContainer;
			track = 0;
			padding = 0;
			if (dir === "h") {
				padding = self._getScrollContainerPadding("h");
				track = hbarContainer.innerWidth();
			}
			if (dir === "v") {
				padding = self._getScrollContainerPadding("v");
				track = vbarContainer.innerHeight();
			}
			f[key] = (track - padding);
			return f[key];
		},

		_getScrollContainerPadding: function (paddingType) {
			// Get the padding of the scroll bar container.
			var self = this,
			f = self._fields(),
			padding = 0, container, key;
			if (paddingType === "h") {
				padding = self._getScrollContainerPadding("left") +
				self._getScrollContainerPadding("right");
			}
			else if (paddingType === "v") {
				padding = self._getScrollContainerPadding("top") +
				self._getScrollContainerPadding("bottom");
			}
			else {
				if (paddingType === "left" || paddingType === "right") {
					container = f.hbarContainer;
				}
				else {
					container = f.vbarContainer;
				}
				key = paddingType + "Padding";
				if (f[key] !== undefined) {
					padding = f[key];
					return padding;
				}
				padding = parseFloat(container.css("padding-" +
				paddingType).replace("px", ""));
				f[key] = padding;
			}
			return padding;
		},

		_contentDragAnimate: function (dir, animated, hbarContainer, hbarDrag,
		stop, fireScrollEvent, dragging) {
			var self = this,
			o = self.options,
			v = dir === "v",
			scroller = v ? o.vScroller : o.hScroller,
			tempKey = v ? "outerHeight" : "outerWidth",
			wrapKey = v ? "innerHeight" : "innerWidth",
			contentKey = v ? "contentHeight" : "contentWidth",
			paddingKey = v ? "top" : "left",
			hMin = scroller.scrollMin,
			hMax = scroller.scrollMax,
			hRange = hMax - hMin,
			hValue = scroller.scrollValue === undefined ?
			hMin : (scroller.scrollValue - hMin),
			hLargeChange = self._getLargeChange(dir),
			max = hRange - hLargeChange + 1,
			f = self._fields(),
			cWrapper = f.contentWrapper,
			tempWrapper = f.templateWrapper,
			contentLeft, dragleft, track, drag, r, padding, dragAnimationOptions,
			properties, contentAnimationOptions, userComplete, properties1, key;

			if (hValue > max) {
				hValue = max;
			}
			contentLeft = (f[contentKey] - cWrapper[wrapKey]()) * (hValue / max);
			if (Math.abs(contentLeft) < 0.001) {
				contentLeft = 0;
			}
			contentLeft = Math.round(contentLeft);
			dragleft = -1;
			if (hbarContainer !== undefined) {
				if (animated && hbarDrag.is(":animated") && stop !== "nonestop") {
					hbarDrag.stop(true, false);
				}
				track = self._getTrackLen(dir);
				//drag = hbarDrag[tempKey]();
				drag = hbarDrag[tempKey](true);
				r = track - drag;
				padding = self._getScrollContainerPadding(paddingKey);
				dragleft = (hValue / max) * r + padding;
			}
			if (animated && o.animationOptions && !o.animationOptions.disabled) {
				if (dragleft >= 0 && dragging !== "dragging") {
					dragAnimationOptions = $.extend({}, o.animationOptions);
					// not trigger scrolled when stop
					dragAnimationOptions.complete = undefined;
					properties = v ? { top: dragleft} : { left: dragleft };
					hbarDrag.animate(properties, dragAnimationOptions);
				}
				contentAnimationOptions = $.extend({}, o.animationOptions);
				userComplete = o.animationOptions.complete;
				contentAnimationOptions.complete = function () {
					self._scrollEnd(fireScrollEvent, self, dir);
					if ($.isFunction(userComplete)) {
						userComplete(arguments);
					}

				};
				if (animated && tempWrapper.is(":animated") && stop !== "nonestop") {
					tempWrapper.stop(true, false);
				}
				properties1 = v ? { top: -contentLeft} : { left: -contentLeft };
				tempWrapper.animate(properties1, contentAnimationOptions);
			}
			else {
				key = v ? "top" : "left";
				if (dragleft >= 0 && dragging !== "dragging") {

					hbarDrag[0].style[key] = dragleft + "px";
				}
				tempWrapper[0].style[key] = -contentLeft + "px";
				self._scrollEnd(fireScrollEvent, self, dir);
			}
		},

		_setDragAndContentPosition: function (fireScrollEvent, animated, dir,
		stop, dragging) {
			var self = this,
			f = self._fields(),
			hbarContainer = f.hbarContainer,
			hbarDrag = f.hbarDrag,
			vbarContainer = f.vbarContainer,
			vbarDrag = f.vbarDrag;
			if ((dir === "both" || dir === "h") && f.hScrolling) {
				self._contentDragAnimate("h", animated, hbarContainer, hbarDrag,
				stop, fireScrollEvent, dragging);
			}
			if ((dir === "both" || dir === "v") && f.vScrolling) {
				self._contentDragAnimate("v", animated, vbarContainer, vbarDrag,
				stop, fireScrollEvent, dragging);
			}
			if (f.intervalID > 0) {
				window.clearInterval(f.intervalID);
			}
			f.intervalID = window.setInterval(function () {
				self._disableButtonIfNeeded(self);
			}, 500);
		},

		_scrolling: function (fireEvent, self, d) {
			var r = true;

			if (fireEvent) {
				d.beforePosition = self.getContentElement().position();
				self._beforePosition = d.beforePosition;
				r = self._trigger("scrolling", null, d);
			}
			return r;
		},

		_scrollEnd: function (fireEvent, self, dir) {
			if (fireEvent) {
				// use settimeout to return to caller immediately.
				window.setTimeout(function () {
					var content = self.getContentElement(), after, d;
					if (!content.is(":visible")) {
						return;
					}
					after = self.getContentElement().position();
					d = {
						dir: dir,
						beforePosition: self._beforePosition,
						afterPosition: after
					};
					self._trigger("scrolled", null, d);
				}, 0);
			}
		},

		_getDragLength: function (range, largeChange, track, min) {
			var divide = range / largeChange,
			dragLength = track / divide,
			minidrag = min;
			if (dragLength < minidrag) {
				dragLength = minidrag;
			}
			else if ((dragLength + 1) >= track) {
				dragLength = track - 1;
			}
			return Math.round(dragLength);
		},

		_needScrollbar: function (scroller, needscroll) {
			var scrollbarMode = this._hasMode(scroller, "scrollbar"),
			barVisibility = scroller.scrollBarVisibility,
			needScrollBar = scrollbarMode && (barVisibility === "visible" ||
			(barVisibility === "auto" && needscroll));
			return needScrollBar;
		},

		_bindBarEvent: function (barContainer, barDrag, dir) {
			var self = this;
			barContainer.bind("mouseover." + self.widgetName, self,
			self._scrollerMouseOver);
			barDrag.draggable({
				axis: dir === "h" ? "x" : "y",
				drag: function (e, data) {
					self._dragging(e, data, self);
				},
				containment: "parent",
				stop: function (e) {
					self._dragStop(e, self, dir);
					$(e.target).removeClass("ui-state-active");
				}
			});
		},

		_createBarIfNeeded: function (hNeedScrollBar, scrollerWrapper,
		dir, html, content) {
			if (hNeedScrollBar) {
				var self = this, o = self.options, data,
				f = self._fields(),
				strBarContainer = dir + "barContainer",
				strBarDrag = dir + "barDrag",
				hbar = dir === "h",
				//contentLength = content[0][hbar ? "clientHeight" : "clientWidth"],
				contentLength = content[hbar ? "innerHeight" : "innerWidth"](),
				c = f[strBarContainer] = $(html), targetBarLen, d;

				scrollerWrapper.append(c);
				targetBarLen = c[0][hbar ? "offsetHeight" : "offsetWidth"];
				contentLength = contentLength - targetBarLen;

				data = {
					direction: hbar ? "horizontal" : "vertical",
					targetBarLen: targetBarLen,
					contentLength: contentLength
				};

				if (self._trigger(hbar ? "hScrollerActivating" : "vScrollerActivating",
				null, data) === false) {
					return false;
				}

				d = f[strBarDrag] = c.find("." + scrollerHandle);
				self._bindBarEvent(c, d, dir);

				content[hbar ? "height" : "width"](contentLength);
			}
		},

		_setScrollbarPosition: function (wrapper, self, content,
					targetBarContainer, referBarContainer,
					targetNeedScrollBar, referNeedScrollBar,
					targetScrollBarPosition, referScrollBarPosition, dir, scrollingNeed) {
			var hbar = dir === "h", targetBarLen, targetPadding, targetBarPosition,
			barPosition1, contentPosition1, barPosition2, contentPosition2,
			contentLength2, referBarWidth;
			if (targetNeedScrollBar) {
				targetBarLen = targetBarContainer[0][hbar ?
				"offsetHeight" : "offsetWidth"];
				targetPadding = self._getScrollContainerPadding(dir);
				targetBarPosition = hbar ? "top" : "left";
				barPosition1 = hbar ? { top: "0px", bottom: "auto", left: "auto",
					right: "auto"
				} : { left: "0px", right: "auto", top: "auto",
					bottom: "auto"
				};
				contentPosition1 = hbar ? { top: targetBarLen + "px"} :
				{ left: targetBarLen + "px" };

				barPosition2 = hbar ? { top: "auto", right: "auto", left: "auto",
					bottom: "0px"
				} : { left: "auto", right: "0px", top: "auto",
					bottom: "auto"
				};
				contentPosition2 = hbar ? { top: ""} : { left: "" };
				//var contentLength = content[0][hbar? "clientHeight":"clientWidth"];
				//contentLength2 = content[0][hbar? "clientWidth":"clientHeight"];
				contentLength2 = content[hbar ? "innerWidth" : "innerHeight"]();
				if (targetScrollBarPosition === targetBarPosition) {
					targetBarContainer.css(barPosition1);
					content.css(contentPosition1);
					if (hbar) {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonleft")
						.removeClass("ui-corner-bl").addClass("ui-corner-tl");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonright")
						.removeClass("ui-corner-br").addClass("ui-corner-tr");
						targetBarContainer.removeClass("ui-corner-bottom")
						.addClass("ui-corner-top");
					}
					else {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttontop")
						.removeClass("ui-corner-tr").addClass("ui-corner-tl");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttonbottom")
						.removeClass("ui-corner-br").addClass("ui-corner-bl");
						targetBarContainer.removeClass("ui-corner-right")
						.addClass("ui-corner-left");
					}
				}
				else {
					targetBarContainer.css(barPosition2);
					content.css(contentPosition2);
					if (hbar) {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonleft")
						.removeClass("ui-corner-tl").addClass("ui-corner-bl");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonright")
						.removeClass("ui-corner-bl").addClass("ui-corner-br");
						targetBarContainer.removeClass("ui-corner-top")
						.addClass("ui-corner-bottom");
					}
					else {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttontop")
						.removeClass("ui-corner-tl").addClass("ui-corner-tr");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttonbottom")
						.removeClass("ui-corner-bl").addClass("ui-corner-br");
						targetBarContainer.removeClass("ui-corner-left")
						.addClass("ui-corner-right");
					}
				}
				//content[hbar?"height":"width"](contentLength - targetBarLen);
				referBarWidth = 0;
				if (referNeedScrollBar) {
					referBarWidth = referBarContainer[0][hbar ?
					"offsetWidth" : "offsetHeight"];
					if (referScrollBarPosition === "left") {
						targetBarContainer.css("right", "0px");
					}
					else if (referScrollBarPosition === "right") {
						targetBarContainer.css("left", "0px");
					}
					else if (referScrollBarPosition === "top") {
						targetBarContainer.css("bottom", "0px");
					}
					else if (referScrollBarPosition === "bottom") {
						targetBarContainer.css("top", "0px");
					}
				}
				if (!hbar/*vbar*/ && referNeedScrollBar) {
					referBarWidth = 0;
				}

				targetBarContainer[hbar ? "width" : "height"](contentLength2 -
				targetPadding);
				self._enableDisableScrollBar(dir, targetBarContainer, !scrollingNeed);
			}
			else {
				wrapper.css(hbar ? "left" : "top", "");
			}
		},

		_testScroll: function (self, f, o) {
			var wrapper = f.templateWrapper,
			content = f.contentWrapper,
			scrollerWrapper = f.stateContainer,
			contentWidth = content.innerWidth(),
			contentHeight = content.innerHeight(),
			wrapperWidth = f.contentWidth,
			wrapperHeight = f.contentHeight,
			hNeedScrollBar, vNeedScrollBar, hbarContainer, vbarContainer,
			hbarPosition, vbarPosition;
			f.hScrolling = wrapperWidth > contentWidth;
			f.vScrolling = wrapperHeight > contentHeight;

			hNeedScrollBar = self.hNeedScrollBar =
			self._needScrollbar(o.hScroller, f.hScrolling);
			if (self._createBarIfNeeded(hNeedScrollBar, scrollerWrapper,
			"h", hbarHtml, content) === false) {
				return false;
			}
			// having h scroll bar, but no vscroll bar, we need to test vscrolling again.
			if (hNeedScrollBar && !f.vScrolling) {
				wrapper.css("float", "left");
				f.contentHeight = wrapper.height();
				f.vScrolling = f.contentHeight > (contentHeight -
				f.hbarContainer[0].offsetHeight);

				wrapper.css("float", "");
			}

			vNeedScrollBar = self.vNeedScrollBar =
			self._needScrollbar(o.vScroller, f.vScrolling);
			if (self._createBarIfNeeded(vNeedScrollBar, scrollerWrapper, "v",
			vbarHtml, content) === false) {
				return false;
			}

			if (vNeedScrollBar && !f.hScrolling) {
				wrapper.css("float", "left");
				f.contentWidth = wrapper.width();
				f.hScrolling = f.contentWidth > (contentWidth -
				f.vbarContainer[0].offsetWidth);
				wrapper.css("float", "");
				if (f.hScrolling && !hNeedScrollBar) {
					hNeedScrollBar = self.hNeedScrollBar =
					self._needScrollbar(o.hScroller, f.hScrolling);
					if (self._createBarIfNeeded(hNeedScrollBar, scrollerWrapper, "h",
					 hbarHtml, content) === false) {
						return false;
					}
				}
			}

			hbarContainer = f.hbarContainer;
			vbarContainer = f.vbarContainer;
			hbarPosition = o.hScroller.scrollBarPosition;
			vbarPosition = o.vScroller.scrollBarPosition;

			self._setScrollbarPosition(wrapper, self, content, hbarContainer,
			vbarContainer, hNeedScrollBar, vNeedScrollBar, hbarPosition,
			vbarPosition, "h", f.hScrolling);
			self._setScrollbarPosition(wrapper, self, content, vbarContainer,
			hbarContainer, vNeedScrollBar, hNeedScrollBar, vbarPosition,
			hbarPosition, "v", f.vScrolling);
		},

		_enableDisableScrollBar: function (bar, barContainer, disable) {
			// Disables scroll bar.
			// <param name="bar" type="String">
			// Scrollbar to disable. 
			// Options are: "h" and "v"
			// </param>
			// <param name="barContainer" type="jQuery">
			// The scroll bar container jQuery object.
			// </param>
			// <param name="disable" type="Boolean">
			// Whether to disable scroll bar.
			// </param>

			if (bar === "v") {
				barContainer[disable ? "addClass" :
				"removeClass"]("wijmo-wijsuperpanel-vbarcontainer-disabled");
				barContainer.find("." + uiStateDefault)[disable ? "addClass" :
				"removeClass"](uiStateDisabled);
			}
			else if (bar === "h") {
				barContainer[disable ? "addClass" :
				"removeClass"]("wijmo-wijsuperpanel-hbarcontainer-disabled");
				barContainer.find("." + uiStateDefault)[disable ? "addClass" :
				"removeClass"](uiStateDisabled);
			}
			barContainer.children("." + scrollerHandle)[disable ? "hide" : "show"]();
		},

		_initResizer: function () {
			// Initialize reseizer of wijsuperpanel.

			var self = this, o = self.options,
			f = self._fields(),
			resizer = f.resizer,
			resizableOptions, oldstop;

			if (!resizer && o.allowResize) {
				resizableOptions = o.resizableOptions;
				oldstop = resizableOptions.stop;
				resizableOptions.stop = function (e) {
					self._resizeStop(e, self);
					if ($.isFunction(oldstop)) {
						oldstop(e);
					}
				};
				f.resizer = resizer = self.element.resizable(resizableOptions);
			}
			if (!o.allowResize && f.resizer) {
				resizer.resizable("destroy");
				f.resizer = null;
			}
		},

		_resizeStop: function (e, self) {
			// give the chance to autoRefresh polling to repaint.
			if (!this.options.autoRefresh) {
				self.paintPanel(true);
			}
			self._trigger("resized");
		},

		_createAdditionalDom: function (self, f, ele) {

			// make sure the key pressing event work in FireFox.
			if (!ele.attr("tabindex")) {
				ele.attr("tabindex", "-1");
				f.tabindex = true;
			}
			var stateContainer = f.stateContainer = $(innerElementHtml),
			templateW;
			// move child element to content wrapper div of wijsuperpanel.
			f.contentWrapper = stateContainer.children();
			templateW = f.templateWrapper = f.contentWrapper.children();
			ele.contents().each(function (index, el) {
				var jel = $(el);
				if (jel.hasClass("wijmo-wijsuperpanel-header")) {
					f.header = jel;
					return;
				}
				if (jel.hasClass("wijmo-wijsuperpanel-footer")) {
					f.footer = jel;
					return;
				}
				templateW[0].appendChild(el);
			});

			// apeend header to first element.
			if (f.header !== undefined) {
				ele.prepend(f.header);
			}
			ele[0].appendChild(stateContainer[0]);
			// apeend footer to first element.
			if (f.footer !== undefined) {
				f.footer.insertAfter(stateContainer);
			}
		},

		_setRounder: function (self, ele) {
			if (this.options.showRounder) {
				ele.addClass(rounderClass);
				if (self._rounderAdded) {
					return;
				}
				if ($.browser.msie) {
					return;
				}
				var key1, key, value, border;
				key1 = key = "";

				if ($.browser.webkit) {
					key = "WebkitBorderTopLeftRadius";
					key1 = "WebkitBorderRadius";
				}
				else if ($.browser.mozilla) {
					key = "MozBorderRadiusBottomleft";
					key1 = "MozBorderRadius";
				}
				else {
					key = "border-top-left-radius";
					key1 = "border-radius";
				}
				value = ele.css(key);
				border = parseInt(value, 10);
				// adding 1 extra to out-most radius.

				ele.css(key1, border + 1);
				self._rounderAdded = true;
				self._radiusKey = key1;
			}
			else {
				ele.removeClass(rounderClass);
			}
		},

		_setInnerElementsSize: function (f, ele) {
			var state = f.stateContainer,
			content = f.contentWrapper,
			height = 0, style, clientHeight, clientWidth, style2;
			if (f.header !== undefined) {
				height += f.header.outerHeight();
			}
			if (f.footer !== undefined) {
				height += f.footer.outerHeight();
			}

			style = state[0].style;
			//clientHeight = ele[0].clientHeight - height;
			//clientWidth = ele[0].clientWidth;
			clientHeight = ele.innerHeight() - height;
			clientWidth = ele.innerWidth();
			// hide element before setting width and height to improve 
			//javascript performance in FF3.
			style.display = "none";
			style.height = clientHeight + "px";
			style.width = clientWidth + "px";
			style2 = content[0].style;
			style2.height = clientHeight + "px";
			style2.width = clientWidth + "px";
			style.display = "";
		}
	});
} (jQuery));
