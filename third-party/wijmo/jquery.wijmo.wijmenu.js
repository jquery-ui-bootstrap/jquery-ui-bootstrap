/*globals window,document,jQuery,clearTimeout,setTimeout*/

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
*
* Wijmo Menu widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.wijmo.wijutil.js
*	jquery.ui.position.js
*	jquery.ui.effects.core.js
*	jquery.wijmo.wijsuperpanel.js
*
*/
(function ($) {
	"use strict";
	var menuitemCss = "wijmo-wijmenu-item";
	$.widget("wijmo.wijmenu", {
		options: {
			/// <summary>
			/// An jQuery selector which handle to open the menu or submenu.
			/// Default: "".
			/// Type: String.
			/// Remark: If set to the menu item(the li element) then when it is clicked
			/// (if the triggerEvent set to 'click') show submenu.  If set to a element 
			/// out of the menu, click(if the triggerEvent set to 'click') it, open the 
			/// menu. 
			/// Code example: $(".selector").wijmenu("option", "trigger", "")
			/// </summary>
			trigger: '',
			/// <summary>
			/// Specifies the event to show the menu.
			/// Default: "click".
			/// Type: String.
			/// Remark: The value can be seted to 'click', 'mouseenter', 'dbclick', 
			/// 'rtclick'
			/// Code example: $(".selector").wijmenu("option", "triggerEvent", "click")
			/// </summary>
			triggerEvent: 'click',
			/// <summary>
			/// Location and Orientation of the menu,relative to the button/link userd
			/// to open it. Configuration for the Position Utility,Of option
			/// excluded(always configured by widget).  Collision also controls collision 
			/// detection automatically too.
			/// Default: {}.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "position", {})
			/// </summary>
			position: {},
			/// <summary>
			/// Sets showAnimation and hideAnimation if not specified individually.
			/// Default: { animated: "slide", duration: 400, easing: null }.
			/// Type: Object.
			/// Remark: User's standard animation setting syntax from other widgets.
			/// Code example: $(".selector").wijmenu("option", "animation", {})
			/// </summary>
			animation: { animated: "slide", duration: 400, easing: null },
			/// <summary>
			/// Determine the animation used to show submenu.
			/// Default: {}.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "showAnimation", {})
			/// </summary>
			showAnimation: {},
			/// <summary>
			/// Determine the animation used to hide submenu.
			/// Default: { animated: "fade", duration: 400, easing: null }.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "hideAnimation", {})
			/// </summary>
			hideAnimation: { animated: "fade", duration: 400, easing: null },
			/// <summary>
			/// When the menu is flyout menu, determines how many milliseconds delay 
			/// to show submenu.
			/// Default: 400
			/// Type: Number
			/// Code example: $(".selector").wijmenu("option", "showDelay", 400);
			/// </summary>
			showDelay: 400,
			/// <summary>
			/// When the menu is flyout menu, determines how many milliseconds delay
			/// to hide submenu.
			/// Default: 400
			/// Type: Number
			/// Code exapmle: $(".selector").wijmenu("option", "hideDelay", 400).
			/// </summary>
			hideDelay: 400,
			/// <summary>
			/// Determine the animation used to slide submenu in sliding mode.
			/// Default: { duration: 400, easing: null }.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "slidingAnimation", {})
			/// </summary>
			slidingAnimation: { duration: 400, easing: null },
			/// <summary>
			/// Defines the behavior of the submenu whether it is a popup menu or 
			/// an iPod-style navigation list.
			/// Default:"flyout".
			/// Type:String.
			/// Remarks: Possible values are "flyout" or "sliding".
			/// Code example: $(".selector").wijmenu("option", "mode", "sliding")
			/// </summary>
			mode: 'flyout',
			/// <summary>
			/// This option specifies a hash value that sets to superpanel options 
			/// when a superpanel is created.
			/// Default: null.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "superPanelOptions", {})
			/// </summary>
			superPanelOptions: null,
			/// <summary>
			/// Defines whether the item can be checked.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $(".selector").wijmenu("option","chackable", true).
			/// </summary>
			checkable: false,
			/// <summary>
			/// Controls the root menus orientation. All submenus are vertical 
			/// regardless of the orientation of the root menu.
			/// Default: "horizontal".
			/// Type: String.
			/// Remark: The value should be "horizontal" or "vertical".
			/// Code example: $(".selector").wijmenu("option", "orientation", "vertical")
			/// </summary>
			orientation: 'horizontal',
			/// <summary>
			/// Determines the i-Pod-style menu's maximum height.
			/// Default: 200.
			/// Type: Number.
			/// Remark: This option only used in i-pod style menu.  When the menu's  
			/// heiget largger than this value, menu show scroll bar.
			/// Code example: $(".selector").wijmenu("option", "maxHeight", 200)
			/// </summary>
			maxHeight: 200,
			/// <summary>
			/// Determines whether the i-Pod menu shows a back link or a breadcrumb header
			/// in the menu.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $(".selector").wijmenu("option", "backLink", true)
			/// </summary>
			backLink: true,
			/// <summary>
			/// Sets the text of the back link.
			/// Default: "Back".
			/// Type: String.
			/// Code example: $(".selector").wijmenu("option", "backLinkText", "Back")
			/// </summary>
			backLinkText: 'Back',
			/// <summary>
			/// Sets the text of the top link.
			/// Default: "All".
			/// Type: String.
			/// Code example: $(".selector").wijmenu("option", "topLinkText", "All")
			/// </summary>
			topLinkText: 'All',
			/// <summary>
			/// Sets the top breadcrumb's default Text.
			/// Default: "Choose an option".
			/// Type: String.
			/// Code example: $(".selector").wijmenu("option", "crumbDefaultText", 
			/// "Choose")
			/// </summary>
			crumbDefaultText: 'Choose an option',
			/// <summary>
			/// Triggered when a menu item is selected.
			/// Default: null
			/// Type: Function
			/// code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("select", function(e, data){})
			/// Bind to the event by type: wijmenuselect
			/// $(".selector").bind("wijmenuselect", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="EventObj">jQuery.Event object.</param>
			/// <param name="data" type="Object">data.item is the avtive 
			/// item of the menu.</param>
			select: null,
			/// <summary>
			/// Triggered when a menu item gets the foucs, either when the mouse is
			/// used to hover over it (on hover) or when the cursor keys are used
			/// on the keyboard(navigation width cursor key) focus.
			/// Default: null.
			/// Type: Function
			/// Code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("focus", function(e, data) {})
			/// Bind to the event by type: wijmenufocus
			/// $(".selector").bind("wijmenufocus", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">jQuery.Event object</param>
			/// <param name="data" type="Object">data.item is the item 
			/// which is focused.</param>
			focus: null,
			/// <summary>
			/// Triggered when a menu item loses focus.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("blur", function(e, data){})
			/// Bind to the event by type: wijmenublur
			/// $(".selector").bind("wijmenublur", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="data" type="Object">data.item is the a menu item
			/// which loses focus.</param>
			blur: null,
			/// <summary>
			/// Triggered before showing the submenu.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("showing", function(e, sublist){})
			/// Bind to the event by type: wijmenushowing
			/// $(".selector").bind("wijmenushowing", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">the event object relates to the 
			/// submenu's parent item.</param>
			/// <param name="sublist" type="Element">the submenu element.</param>
			showing: null
		},

		_preventEvent: function (event) {
			event.preventDefault();
			event.stopImmediatePropagation();
		},

		_create: function () {
			// Before crete menu items,hide the menu. To avoid show wild uls
			// in the page before init the menu.
			var self = this,
				o = self.options,
				orientation = o.orientation,
				mode = o.mode,
				ul, li, ele = self.element, sublist, breadcrumb,
				keycode = $.ui.keyCode;

			ele.hide();
			self.cssPre = "wijmo-wijmenu";
			self.nowIndex = 9999;
			self.activeItem = null;
			self.refresh();
			ele.attr("tabIndex", 0);
			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option
			ele.bind("keydown.wijmenu", function (event) {
				if (o.disabled) {
					return;
				}
				var activeItem = self.activeItem, isRoot, link;
				if (activeItem) {
					isRoot = self._isRoot(activeItem.parent());
				}
				else {
					isRoot = true;
				}
				switch (event.keyCode) {
					case keycode.PAGE_UP:
						self.previousPage(event);
						self._preventEvent(event);
						break;
					case keycode.PAGE_DOWN:
						self.nextPage(event);
						self._preventEvent(event);
						break;
					case keycode.UP:
						if (orientation === "vertical" || mode === "sliding" || !isRoot) {
							self.previous(event);
							self._preventEvent(event);
						}
						break;
					case keycode.DOWN:
						if (orientation === "vertical" || mode === "sliding" || !isRoot) {
							self.next(event);
							self._preventEvent(event);
						}
						else {
							if (activeItem) {
								if (mode === "flyout" && activeItem.has("ul").length > 0) {
									sublist = activeItem.find("ul:first");
									if (sublist.is(":hidden")) {
										self._showFlyoutSubmenu(event, activeItem, sublist);
										self.activate(event, sublist
						.children(".wijmo-wijmenu-item:first"));
									}
								}
							}
						}
						break;
					case keycode.RIGHT:
						if (orientation === "horizontal" && isRoot && mode === "flyout") {
							self.next(event);
							self._preventEvent(event);
						}
						else {
							if (activeItem) {
								if (mode === "flyout" && activeItem.has("ul").length > 0) {
									sublist = activeItem.find("ul:first");
									if (sublist.is(":hidden")) {
										self._showFlyoutSubmenu(event, activeItem, sublist);
										self.activate(event, sublist
						.children(".wijmo-wijmenu-item:first"));
									}
								}
								else if (mode === "sliding") {
									sublist = activeItem.find("ul:first");
									if (sublist.length > 0) {
										activeItem.children(":first").trigger("click");
										self.activate(event, sublist
						.children(".wijmo-wijmenu-item:first"));
									}
								}
							}
						}

						break;
					case keycode.LEFT:
						if (orientation === "horizontal" && isRoot && mode === "flyout") {
							self.previous(event);
							self._preventEvent(event);
						}
						else {
							ul = activeItem.parent();
							li = ul.parent();
							if (mode === "flyout") {
								if (li.is("li")) {
									self._hideCurrentSubmenu(li);
									self.activate(event, li);
								}
							}
							else {
								if (o.backLink && self._backLink &&
					self._backLink.is(":visible")) {
									self._backLink.trigger("click");
									self.activate(event, li);
								}
								breadcrumb = $(".wijmo-wijmenu-breadcrumb",
					self.domObject.menucontainer).find("li a");
								if (breadcrumb.length > 0) {
									breadcrumb.eq(breadcrumb.length - 2).trigger("click");
									self.activate(event, li);
									ele.focus();
								}
							}
						}
						break;
					case keycode.ENTER:
						if (!activeItem) {
							return;
						}
						if (mode === "flyout") {
							link = activeItem.children(":first");
							link.focus();
							link.trigger("click");
						}
						else {
							self.select();
							self._preventEvent(event);
						}
						break;
				}
			});
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			ele = outerEle ? outerEle : self.element,
			eleOffset = ele.offset(),
			disabledWidth = ele.outerWidth(),
			disabledHeight = ele.outerHeight();

			return $("<div></div>")
					.addClass("ui-disabled")
					.css({
						"z-index": "99999",
						position: "absolute",
						width: disabledWidth,
						height: disabledHeight,
						left: eleOffset.left,
						top: eleOffset.top
					});
		},

		_isRoot: function (obj) {
			return this.rootMenu.get(0) === obj.get(0);
		},

		_destroy: function () {
			var self = this,
				o = self.options;

			self[o.mode === "flyout" ? "_killFlyout" : "_killDrilldown"]();
			self._killmenuItems();
			self._killtrigger();
			if (self.element.is("ul")) {
				self.element.unwrap().unwrap();
			}
			else {
				self.element.unwrap();
			}
			self.element.removeData("domObject").removeData("topmenu")
			.removeData("firstLeftValue");
		},

		destroy: function () {
			var self = this;
			/// <summary>
			/// Removes the wijmenu functionality completely.
			/// This returns the element back to its pre-init state.
			/// </summary>
			this._destroy();
			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option
			$.Widget.prototype.destroy.apply(this);
		},

		activate: function (event, item) {
			/// <summary>Actives an menu item by deactivating the current item,
			/// scrolling the new one into view, if necessary,making it the active item,
			/// and triggering a focus event.
			/// </summary>
			/// <param name="event" type="Event">The javascript event.</param>
			/// <param name="item" type="jQuery object">a menu item to active</param>
			var self = this,
				scrollContainer = self.domObject.scrollcontainer,
				active = item.eq(0);

			if (self.activeItem && self.activeItem.get(0) === active.get(0)) {
				return;
			}

			self.deactivate(event);
			self._trigger("focus", event, { item: item });
			if (self.options.mode === "sliding") {
				scrollContainer.wijsuperpanel("scrollChildIntoView", item);
			}
			active.children(":first")
			.addClass("ui-state-focus")
			//.attr("id", "ui-active-menuitem")
			.end();

			self.element.removeAttr("aria-activedescendant");
			self.element.attr("aria-activedescendant", active.attr("id"));
			self.activeItem = active;

		},

		deactivate: function (event) {
			/// <summary>Clears the current selection.This method is useful when reopening
			/// a menu which previously had an item selected.
			/// </summary>
			/// <param name="event" type="Event">The javascript event.  </param>
			var self = this,
				active = self.activeItem;

			if (!active) {
				return;
			}
			active.children(":first")
			.removeClass("ui-state-focus")
			.removeAttr("id");
			self._trigger("blur");
			self.activeItem = null;
		},

		next: function (event) {
			/// <summary>Selects the next item based on the active one. Selects the first
			/// item if none is active or if the last one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("next", "." + menuitemCss + ":first", event);
		},

		previous: function (event) {
			/// <summary>Selects the previous item based on the active one. Selects the 
			///last item if none is active or if the first one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("prev", "." + menuitemCss + ":last", event);
		},

		first: function () {
			/// <summary>Determines whether the active item is the first
			/// menu item</summary>
			/// <returns type="Boolean" />
			var active = this.activeItem;
			return active && !active.prevAll("." + menuitemCss).length;
		},

		last: function () {
			/// <summary>Determines whether the active item is the 
			///last menu item</summary>
			/// <returns type="Boolean" />
			var active = this.activeItem;
			return active && !active.nextAll("." + menuitemCss).length;
		},

		nextPage: function (event) {
			/// <summary>This event is similar to the next event,
			///but it jumps a whole page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this,
				activeItem = self.activeItem,
				parent = activeItem.parent(), base, height, result;

			if (self.options.mode === "sliding" && self._hasScroll()) {
				if (!activeItem || self.last()) {
					self.activate(event, parent.children(":first"));
					return;
				}
				base = activeItem.offset().top;
				height = self.options.maxHeight;
				result = parent.children("li").filter(function () {
					var node = $(this),
					close = height - (node.offset().top - base + node.height()),
					lineheight = node.height();
					return close < lineheight && close > -lineheight;
				});

				if (!result.length) {
					result = parent.children(":last");
				}
				self.activate(event, result.last());
			} else {
				self.activate(event, parent
				.children(!activeItem || self.last() ? ":first" : ":last"));
			}
		},

		previousPage: function (event) {
			/// <summary>This event is silimlar to the previous event,
			///but it jumps a whole page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this,
				activeItem = self.activeItem,
				parent = activeItem.parent(), base, height, result;

			if (self.options.mode === "sliding" && self._hasScroll()) {
				if (!activeItem || self.first()) {
					self.activate(event, parent.children(":last"));
					return;
				}
				base = activeItem.offset().top;
				height = self.options.maxHeight;
				result = parent.children("li").filter(function () {
					var node = $(this),
					close = node.offset().top - base + height - node.height(),
					lineheight = node.height();
					return close < lineheight && close > -lineheight;
				});
				if (!result.length) {
					result = parent.children(":first");
				}
				self.activate(event, result.first());
			} else {
				self.activate(event, parent
				.children(!activeItem || self.first() ? ":last" : ":first"));
			}
		},

		select: function (event) {
			/// <summary>Selects the active item,triggering the select event for that
			///item. This event is useful for custom keyboard handling.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this;
			self._trigger("select", event, { item: self.activeItem });
			self._setCheckable();
		},

		setItemDisabled: function (selector, disabled) {
			var items = $(selector, this.element);
			items.is("item>a").attr("disabled", disabled);
			items.find(">a").toggleClass(disabled);
		},

		_setCheckable: function () {
			if (this.options.checkable) {
				this.activeItem.children(":first").toggleClass("ui-state-active");
			}
		},

		///set options
		_setOption: function (key, value) {
			var self = this;

			//$.Widget.prototype._setOption.apply(self, arguments);

			if (this["_set_" + key]) {
				this["_set_" + key](value);
			}
			this.options[key] = value;

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.domObject.menucontainer);
			}
			//end for disabled option
		},

		_set_mode: function (value) {
			this._destroy();
			this.options.mode = value;
			this.refresh();
		},

		_set_orientation: function (value) {
			var self = this,
				menuContainer = self.domObject.menucontainer;

			menuContainer
			.removeClass(self.cssPre + "-vertical " + self.cssPre + "-horizontal");
			if (self.options.mode === "flyout") {
				menuContainer.addClass(self.cssPre + "-" + value);
				$(">li:has(ul)", self.rootMenu).each(function () {
					var cssPre = "ui-icon-triangle-1-",
					oldCss = value === "horizontal" ? "e" : "s",
					newCss = value === "horizontal" ? "s" : "e";
					$(">.wijmo-wijmenu-link", this).find("." + cssPre + oldCss)
					.removeClass(cssPre + oldCss + " " + cssPre + newCss)
					.addClass(cssPre + newCss);
				});
			}
			else {
				menuContainer
				.addClass(self.cssPre + "-vertical");
			}
		},

		_getTriggerEle: function () {
			return $(this.options.trigger).filter(function () {
				return $(this).closest(".wijmo-wijmenu").length === 0;
			});
		},

		_set_triggerEvent: function (value) {
			var self = this,
				o = self.options,
				triggerEle = self._getTriggerEle();

			self._killtrigger();
			o.triggerEvent = value;
			if (triggerEle.length > 0) {
				self._initTrigger(triggerEle);
			}
			if (o.mode === "flyout") {
				self._killFlyout();
				self._flyout();
			}
		},

		_set_trigger: function (value) {
			var self = this,
				o = self.options,
				triggerEle = self._getTriggerEle();

			self._killtrigger();
			o.trigger = value;
			if (triggerEle.length > 0) {
				self._initTrigger(triggerEle);
			}
			if (o.mode === "flyout") {
				self._killFlyout();
				self._flyout();
			}
		},

		_initTrigger: function (triggerEle) {
			var o = this.options,
				event = o.triggerEvent,
				self = this,
				menuContainer = self.domObject.menucontainer,
				namespace = ".wijmenu";

			if (triggerEle.is("iframe")) {
				triggerEle = $(triggerEle.get(0).contentWindow.document);
			}
			switch (event) {
				case "click":
					triggerEle.bind(event + namespace, function (e) {
						if (o.mode !== "popup") {
							self._displaySubmenu(e, triggerEle, menuContainer);
						}
					});
					break;
				case "mouseenter":
					triggerEle.bind(event + namespace, function (e) {
						self._displaySubmenu(e, triggerEle, menuContainer);
					});
					break;
				case "dblclick":
					triggerEle.bind(event + namespace, function (e) {
						self._displaySubmenu(e, triggerEle, menuContainer);
					});
					break;
				case "rtclick":
					triggerEle.bind("contextmenu" + namespace, function (e) {
						menuContainer.hide();
						self._displaySubmenu(e, triggerEle, menuContainer);
						e.preventDefault();
					});
					break;
			}

		},

		_killtrigger: function () {
			var o = this.options, triggerEle;

			if (o.trigger !== "") {
				triggerEle = $(o.trigger);
				if (triggerEle && triggerEle.length > 0) {
					triggerEle.unbind(".wijmenu");
					//$(document).unbind("click.wijmenudoc");
				}
			}
		},

		_move: function (direction, edge, event) {
			var active = this.activeItem, next, parent;

			if (!active) {
				this.activate(event, this.rootMenu.children(edge));
				return;
			}
			next = $(active)[direction + "All"]("." + menuitemCss).eq(0);
			parent = active.parent();
			if (next.length) {
				this.activate(event, next);
			} else {
				this.activate(event, parent.children(edge));
			}
		},

		refresh: function () {
			/// <summary>Renders all non-menu-items as menuitems,called once by _create.
			/// Call this method whenever adding or replaceing items in the menu via DOM
			/// operations,for example,via menu.append
			/// ("<li><a href='#'>new item</a></li>").wijmenu("refresh")</summary>
			var self = this,
				ele = self.element,
				menuCss = "wijmo-wijmenu",
				o = self.options,
				scrollcontainer, menucontainer, domObject, triggerEle, breadcrumb,
				seperatorCss = menuCss + "-separator ui-state-default ui-corner-all",
				headerCss = "ui-widget-header ui-corner-all",
				menuItemCss = "ui-widget " + menuitemCss +
							" ui-state-default ui-corner-all",
				menuLinkCss = menuCss + "-link ui-corner-all";

			if (self.domObject) {
				self._destroy();
			}
			if (ele.is("ul")) {
				self.rootMenu = ele;
				scrollcontainer = ele.wrap("<div></div>").parent();
				menucontainer = scrollcontainer.wrap("<div></div>").parent();
			}
			else if (ele.is("div")) {
				self.rootMenu = $("ul:first", ele);
				scrollcontainer = ele;
				menucontainer = ele.wrap("<div></div>").parent();
			}


			scrollcontainer.addClass("scrollcontainer checkablesupport");
			menucontainer.addClass("ui-widget ui-widget-header " + menuCss +
				" ui-corner-all ui-helper-clearfix")
			.attr("aria-activedescendant", "ui-active-menuitem");
			if (o.orientation === "horizontal" && o.mode === "flyout") {
				menucontainer.addClass(menuCss + "-" + o.orientation);
			}
			domObject = { scrollcontainer: scrollcontainer,
				menucontainer: menucontainer
			};
			self.domObject = domObject;
			self.rootMenu.data("topmenu", true);
			if (!self.rootMenu.hasClass(menuCss + "-list ui-helper-reset")) {
				self.rootMenu.addClass(menuCss + "-list ui-helper-reset");
			}
			$("li", self.rootMenu).each(function (i, n) {
				//var isFirstLevel = $(n).parent().parent().parent().is(".wijmo-wijmenu");
				var hasSubmenu = $(">ul:first", n).length > 0,
					li = $(n),
					icon, link = $(">:first", li), itemDisabled;

				if (link.length === 0) {
					li.addClass(seperatorCss);
				}
				else {
					li.attr("role", "menuitem");
					itemDisabled = link.hasClass("ui-state-disabled");
					if (link.is("a")) {
						link.bind("mouseenter.wijmenuitem", function () {
							if (o.disabled || itemDisabled) {
								return;
							}
							$(this).addClass("ui-state-hover");
						}).bind("mouseleave.wijmenuitem", function () {
							if (o.disabled || itemDisabled) {
								return;
							}
							$(this).removeClass("ui-state-hover");
							if ($(this).data("subMenuOpened")) {
								$(this).addClass("ui-state-active");
							}
						});
						if (!li.hasClass(menuitemCss)) {
							li.addClass(menuItemCss);
							link.addClass(menuLinkCss);
							link.wrapInner("<span>").children("span")
							.addClass(menuCss + "-text");
							if (hasSubmenu) {
								icon = $("<span>")
								.addClass("ui-icon ui-icon-triangle-1-e");
								link.append(icon);
							}
						}
					}
					else if (link.is("h1,h2,h3,h4,h5")) {
						li.addClass(headerCss);
					}
					else {
						li.addClass(menuItemCss);
						link.addClass(menuLinkCss);
						if (hasSubmenu) {
							if (!link.is(":input")) {
								icon = $("<span>").addClass("ui-icon ui-icon-triangle-1-e");
								link.append(icon);
							}
						}
					}
				}
			});
			ele.show();
			$("ul", self.rootMenu).each(function () {
				$(this).addClass(menuCss + "-list ui-widget-content ui-corner-all " +
					"ui-helper-clearfix " + menuCss + "-child ui-helper-reset");
				$(this).hide();
			});
			this[o.mode === "flyout" ? "_flyout" : "_drilldown"]();
			if (o.trigger !== "") {
				triggerEle = self._getTriggerEle();
				if (triggerEle.length > 0) {
					menucontainer.hide();
					self._initTrigger(triggerEle);
				}
			}
			$(document).bind("click.wijmenudoc", function (e) {
				///fixed when click the breadcrumb choose item link to show
				/// the root menu in sliding menu.
				if ($(e.target).parent().is(".wijmo-wijmenu-all-lists")) {
					return;
				}

				var obj = $(e.target).closest(".wijmo-wijmenu");
				if (obj.length === 0) {
					if (o.mode === "sliding") {
						breadcrumb = $(".wijmo-wijmenu-breadcrumb", menucontainer);
						// fixed a bug, when the trigger is not seted. 
						// when click the document, trigger this method!
						if (o.trigger === "") {
							return;
						}
						self._resetDrilldownMenu(breadcrumb);
					}
					else if (o.mode === "flyout" && o.triggerEvent !== "mouseenter") {
						self._hideAllMenus();
						return;
					}

					if (triggerEle && triggerEle.length > 0) {
						self._hideSubmenu(menucontainer);
					}
				}
			});
		},

		_showFlyoutSubmenu: function (e, li, subList) {
			var self = this,
				curList = self.currentMenuList, i;

			if (curList !== undefined) {
				for (i = curList.length; i > 0; i--) {
					if (curList[i - 1].get(0) === li.parent().get(0)) {
						break;
					}
					else {
						self._hideSubmenu(curList[i - 1]);
					}
				}
			}
			self._displaySubmenu(e, li.find('.wijmo-wijmenu-link:eq(0)'), subList);
		},

		_getItemTriggerEvent: function (item) {
			var self = this,
				o = self.options,
				triggerEvent = "default", triggerEle;

			if (o.trigger !== "") {
				if (item.is(o.trigger) || self.element.is(o.trigger)) {
					triggerEvent = o.triggerEvent;
				}
				else {
					item.parents(".wijmo-wijmenu-parent").each(function (i, n) {
						if ($(n).is(o.trigger)) {
							triggerEvent = o.triggerEvent;
							return false;
						}
					});
					if (triggerEvent === "default") {
						triggerEle = self._getTriggerEle();
						if (triggerEle.length > 0) {
							triggerEvent = o.triggerEvent;
						}
					}
				}
			}
			item.data("triggerEvent", triggerEvent);
			return triggerEvent;
		},

		_flyout: function () {
			var self = this,
				container = self.domObject.menucontainer,
				o = self.options,
				linkCss = "wijmo-wijmenu-link",
				eastIconCss = "ui-icon-triangle-1-e",
				southIconCss = "ui-icon-triangle-1-s",
				parentItemCss = "wijmo-wijmenu-parent", itemDisabled;

			container.attr("role", "menu");
			if (o.orientation === "horizontal") {
				container.attr("role", "menubar");
				self.rootMenu.children("li:has(ul)").each(function () {
					$(this).children("." + linkCss).find("." + eastIconCss)
					.removeClass(eastIconCss).addClass(southIconCss);
				});
			}
			container.find('li:has(ul)').each(function () {
				var nameSpace = ".wijmenu",
					li = $(this).attr("aria-haspopup", true), showTimer, hideTimer,
					triggerEvent = self._getItemTriggerEvent(li), link, subList;

				li.children("ul")
				//.attr("role", "menu")
				//.attr("aria-activedescendant", "ui-active-menuitem")
				.bind("mouseleave." + nameSpace, function () {
					if (o.disabled) {
						return;
					}
					var subel = $(this).parent();
					hideTimer = setTimeout(function () {
						self._hideCurrentSubmenu(subel);
					}, o.hideDelay);
				});
				if (triggerEvent !== "default" &&
				o.triggerEvent !== "mouseenter") {
					li.removeClass(parentItemCss)
					.addClass(parentItemCss);
					link = $(this).find("." + linkCss + ":eq(0)");
					subList = link.next();

					switch (o.triggerEvent) {
						case "click":
							link.bind("click" + nameSpace, function (e) {
								if (o.disabled || $(this).hasClass("ui-state-disabled")) {
									return;
								}
								self._showFlyoutSubmenu(e, li, subList);
							});
							break;
						case "dblclick":
							link.bind("dblclick" + nameSpace, function (e) {
								if (o.disabled || $(this).hasClass("ui-state-disabled")) {
									return;
								}
								self._showFlyoutSubmenu(e, li, subList);
							});
							break;
						case "rtclick":
							link.bind("contextmenu" + nameSpace, function (e) {
								if (o.disabled || $(this).hasClass("ui-state-disabled")) {
									return;
								}
								self._showFlyoutSubmenu(e, li, subList);
								e.preventDefault();
							});
							break;
					}
					subList.data("notClose", true);
				}
				else {
					li.removeClass(parentItemCss)
					.addClass(parentItemCss);
					link = $(this).find("." + linkCss + ":eq(0)");
					link.bind("mouseenter.wijmenu",
					function (e) {
						if (o.disabled || $(this).hasClass("ui-state-disabled")) {
							return;
						}
						clearTimeout(hideTimer);
						var subList = $(this).next(),
							link = $(this);

						showTimer = setTimeout(function () {
							self._displaySubmenu(e, link, subList);
						}, o.showDelay);
					}).bind("mouseleave" + nameSpace,
					function () {
						if (o.disabled || $(this).hasClass("ui-state-disabled")) {
							return;
						}
						clearTimeout(showTimer);
						var subList = $(this).next();
						//In slide effects, before animation, 
						//it wraped a div to the ul element.
						if (!subList.is("ul")) {
							subList = subList.children("ul:first");
						}
						hideTimer = setTimeout(function () {
							self._hideSubmenu(subList);
						}, o.hideDelay);
					});


					$(this).find("ul ." + linkCss + ",ul >.ui-widget-header,ul " +
						'>.wijmo-wijmenu-separator').bind("mouseenter" + nameSpace,
					function (e) {
						if (o.disabled) {
							return;
						}
						clearTimeout(hideTimer);
					});
				}
			});


			///when click the menu item hide the submenus.
			container.find("." + linkCss).bind("click.wijmenu", function (e) {
				itemDisabled = $(this).hasClass("ui-state-disabled")
				if (o.disabled || itemDisabled) {
					return;
				}
				if ($(this).is("a")) {
					if ($(this).parent().find("ul").length === 0) {
						self._hideAllMenus();
					}
					else if (!(o.trigger !== "" &&
					$(this).parent().data("triggerEvent") !== "default" &&
					 o.triggerEvent !== "mouseenter")) {
						self._hideAllMenus();
					}
					else {
						var curList = self.currentMenuList, item, j;
						if (curList !== undefined) {
							item = $(this).parent();
							if (item.has("ul").length === 0) {
								for (j = curList.length; j > 0; j--) {
									if (curList[j - 1].get(0) === item.parent().get(0)) {
										break;
									}
									else {
										self._hideSubmenu(curList[j - 1]);
									}
								}
							}
						}
					}
					self.activate(e, $(this).parent());
				}
				self.select(e);
				//self.focus();
				if ($(this).attr("href") === "#") {
					e.preventDefault();
				}
			})
			.bind("focusin", function (e) {
				itemDisabled = $(this).hasClass("ui-state-disabled");
				if (o.disabled || itemDisabled) {
					return;
				}
				if ($(this).is("a")) {
					self.activate(e, $(this).parent());
				}
			});
		},

		_hideAllMenus: function () {
			var self = this, container, outerTrigger, i, ul,
				ele = self.rootMenu;

			ul = ele.find("ul");
			for (i = ul.length - 1; i >= 0; i--) {
				self._hideSubmenu($(ul[i]));
			}
			if (self.options.trigger !== "") {
				container = self.domObject.menucontainer;
				if (container.is(":animated")) {
					return;
				}
				// if the trigger is outer of the menu, 
				//when hide all menus hide the root menu.
				outerTrigger = self._getTriggerEle();
				if (outerTrigger.length === 0) {
					return;
				}
				self._hideSubmenu(self.domObject.menucontainer);
			}
		},

		hideAllMenus: function () {
			this._hideAllMenus();
		},

		_killFlyout: function () {
			var container = this.domObject.menucontainer.attr("role", "");

			container.find("li").each(function () {
				$(this).removeClass("wijmo-wijmenu-parent").unbind(".wijmenu")
				.children(":first").unbind(".wijmenu").attr("aria-haspopup", "");
			});
		},

		_killmenuItems: function () {
			var ele = this.rootMenu;
			ele.removeClass("wijmo-wijmenu-list ui-helper-reset " +
				"wijmo-wijmenu-content ui-helper-clearfix");
			ele.find("li").each(function () {
				var item = $(this), link;
				item.removeClass("ui-widget " + menuitemCss + " ui-state-default " +
				"ui-corner-all wijmo-wijmenu-parent ui-widget-header " +
				"wijmo-wijmenu-separator");
				link = item.children(".wijmo-wijmenu-link");
				link.removeClass("wijmo-wijmenu-link ui-corner-all ui-state-focus " +
				"ui-state-hover ui-state-active")
				.html(link.children(".wijmo-wijmenu-text").html())
				.unbind(".wijmenu .wijmenuitem");
				item.children("ul").removeClass("wijmo-wijmenu-list ui-widget-content" +
				" ui-corner-all ui-helper-clearfix wijmo-wijmenu-child ui-helper-reset")
				.attr("role", "").attr("aria-activedescendant", "")
				.show().css({ left: "", top: "", position: "" }).attr("hidden", "");
			});
			this.domObject.menucontainer.removeClass("");
			$(document).unbind("click.wijmenudoc");
		},

		_sroll: function () {
			var scroll = this.domObject.scrollcontainer,
				options = this.options.superPanelOptions || {};

			scroll.height(this.options.maxHeight);
			scroll.wijsuperpanel(options);
		},

		_hasScroll: function () {
			var scroll = this.domObject.scrollcontainer;
			return scroll.data("wijsuperpanel").vNeedScrollBar;
		},


		_resetDrillChildMenu: function (el) {
			el.removeClass("wijmo-wijmenu-scroll wijmo-wijmenu-current").height("auto");
		},

		_checkDrillMenuHeight: function (el, mycontainer, scrollcontainer) {
			var self = this,
				fixPadding = 5;

			mycontainer.height(el.height());
			scrollcontainer.wijsuperpanel("option", "hScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("option", "vScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("paintPanel");
			if (self._hasScroll()) {
				if (el.prev().length > 0) {
					fixPadding = el.prev().css("padding-left").replace(/px/g, "");
				}
				el.width(scrollcontainer.find(".wijmo-wijsuperpanel-contentwrapper" +
					":first").width() - fixPadding);
			}
		},

		_resetDrilldownMenu: function (breadcrumb) {
			var self = this,
				o = self.options,
				ele = self.rootMenu,
				container = self.domObject.menucontainer,
				crumbDefaultHeader = $('<li class="wijmo-wijmenu-breadcrumb-text">' +
					o.crumbDefaultText + '</li>'),
				mycontainer = ele.parent();

			$('.wijmo-wijmenu-current', container).removeClass('wijmo-wijmenu-current');
			ele.animate({ left: 0 }, o.showDuration, function () {
				$(this).find('ul').each(function () {
					$(this).hide();
					self._resetDrillChildMenu($(this));
				});
				ele.addClass('wijmo-wijmenu-current');
			});
			$('.wijmo-wijmenu-all-lists', container).find('span').remove();
			breadcrumb.empty().append(crumbDefaultHeader);
			$('.wijmo-wijmenu-footer', container).empty().hide();
			self._checkDrillMenuHeight(ele, mycontainer, self.domObject.scrollcontainer);
		},

		_drilldown: function () {
			var self = this,
				ele = self.rootMenu,
				mycontainer = ele.wrap("<div>").parent().css("position", "relative"),
				container = self.domObject.menucontainer.attr("role", "menu"),
				scrollcontainer = self.domObject.scrollcontainer,
				o = self.options, fixPadding, itemDisabled,
				breadcrumb = $('<ul class="wijmo-wijmenu-breadcrumb ui-state-default' +
					' ui-corner-all ui-helper-clearfix"></ul>'),
				crumbDefaultHeader = $('<li class="wijmo-wijmenu-breadcrumb-text">' +
				o.crumbDefaultText + '</li>'),
				firstCrumbText = (o.backLink) ? o.backLinkText : o.topLinkText,
				firstCrumbClass = (o.backLink) ? 'wijmo-wijmenu-prev-list' :
					'wijmo-wijmenu-all-lists',
				firstCrumbLinkClass = (o.backLink) ?
					'ui-state-default ui-corner-all' : '',
				firstCrumbIcon = (o.backLink) ?
					'<span class="ui-icon ui-icon-triangle-1-w"></span>' : '',
				firstCrumb = $('<li class="' + firstCrumbClass +
					'"><a href="#" class="' + firstCrumbLinkClass + '">' +
					firstCrumbIcon + firstCrumbText + '</a></li>');

			container.addClass('wijmo-wijmenu-ipod wijmo-wijmenu-container');
			if (o.backLink) {
				breadcrumb.addClass('wijmo-wijmenu-footer').appendTo(container).hide();
			}
			else {
				breadcrumb.addClass('wijmo-wijmenu-header').prependTo(container);
			}
			if (!o.backLink) {
				breadcrumb.append(crumbDefaultHeader);
			}
			ele.addClass('wijmo-wijmenu-content wijmo-wijmenu-current ui-widget-content' +
				' ui-helper-clearfix').css({ width: container.width() })
			.find('ul').css({
				width: container.width(),
				left: container.width()
			})
			//.attr("role", "menu").attr("aria-activedescendant", "ui-active-menuitem")
			.addClass('ui-widget-content');
			//.hide();
			mycontainer.height(self.rootMenu.height());
			self._sroll();
			if (self._hasScroll()) {
				fixPadding = 5;
				if (ele.children(":first").children(":first").length > 0) {
					fixPadding = ele.children(":first").children(":first")
					.css("padding-left").replace(/px/g, "");
				}
				ele.width(scrollcontainer
				.find(".wijmo-wijsuperpanel-contentwrapper:first").width() - fixPadding);
			}

			self.element.data("firstLeftValue", parseFloat(ele.css('left')));
			$('li>.wijmo-wijmenu-link', ele).each(function () {
				// if the link opens a child menu:
				if ($(this).next().is('ul')) {
					itemDisabled = $(this).parent().attr("disabled");
					$(this).click(function (e) { // ----- show the next menu
						if (o.disabled || itemDisabled) {
							return;
						}
						var nextList = $(this).next(),
							parentUl = $(this).parents('ul:eq(0)'),
							parentLeft = (parentUl.data("topmenu")) ?
							0 : parseFloat(ele.css('left')),
							crumbText, newCrumb,
							nextLeftVal = Math.round(parentLeft -
							parseFloat(container.width())),
							footer = $('.wijmo-wijmenu-footer', container),
							setPrevMenu = function (backlink) {
								var b = backlink,
								c = $('.wijmo-wijmenu-current', container), prevList;
								if (c.get(0) === self.rootMenu.get(0)) {
									return;
								}
								prevList = c.parents('ul:eq(0)');
								c.hide().attr('aria-expanded', 'false');
								self._resetDrillChildMenu(c);
								self._checkDrillMenuHeight(prevList, mycontainer,
								 scrollcontainer);
								prevList.addClass('wijmo-wijmenu-current')
								.attr('aria-expanded', 'true');
								if (prevList.hasClass('wijmo-wijmenu-content')) {
									b.remove();
									footer.hide();
								}
							};

						// show next menu	
						self._resetDrillChildMenu(parentUl);
						self._checkDrillMenuHeight(nextList, mycontainer,
						scrollcontainer);
						self._slidingAnimation(ele, nextLeftVal, null);
						nextList.show().addClass('wijmo-wijmenu-current')
						.attr('aria-expanded', 'true');

						// initialize "back" link
						if (o.backLink) {
							if (footer.find('a').size() === 0) {
								footer.show();
								self._backLink = $('<a href="#"><span class="ui-icon ' +
								'ui-icon-triangle-1-w"></span> <span>' + o.backLinkText +
								'</span></a>')
									.appendTo(footer)
									.click(function (e) { // ----- show the previous menu
										if (o.disabled) {
											return;
										}
										var b = $(this), prevLeftVal;
										ele.stop(true, true);
										prevLeftVal = parseInt(ele.css('left'), 10) +
										parseInt(container.width(), 10);
										///to fix click the back button too quickly.
										///The menu display wrong.
										if (prevLeftVal > parentLeft) {
											return;
										}
										self._slidingAnimation(ele, prevLeftVal,
										function () {
											setPrevMenu(b);
										});
										e.preventDefault();
									});
							}
						}
						// or initialize top breadcrumb
						else {
							if (breadcrumb.find('li').size() === 1) {
								breadcrumb.empty().append(firstCrumb);
								firstCrumb.find('a').click(function (e) {
									self._resetDrilldownMenu(breadcrumb);
									e.preventDefault();
								});
							}
							$('.wijmo-wijmenu-current-crumb', container)
							.removeClass('wijmo-wijmenu-current-crumb');
							crumbText = $(this).find('span:eq(0)').text();
							newCrumb = $('<li class="wijmo-wijmenu-current-crumb">' +
							'<a href="#" class="wijmo-wijmenu-crumb">' + crumbText +
							'</a></li>');
							newCrumb.appendTo(breadcrumb).find('a').click(function (e) {
								if (o.disabled) {
									return;
								}
								if (!$(this).parent()
									.is('.wijmo-wijmenu-current-crumb')) {
									var newLeftVal = -($('.wijmo-wijmenu-current')
										.parents('ul').size() - 1) * 180;

									self._slidingAnimation(ele, newLeftVal, function () {
										setPrevMenu();
									});
									//make this the current crumb, delete all  
									//breadcrumbs, and navigate to the relevant menu
									$(this).parent()
									.addClass('wijmo-wijmenu-current-crumb')
									.find('span').remove();
									$(this).parent().nextAll().remove();
									e.preventDefault();
								}
							});
							newCrumb.prev()
							.append(' <span class="ui-icon ui-icon-carat-1-e"></span>');
						}
						if ($(this).attr("href") === "#") {
							e.preventDefault();
						}
					});
				}
				// if the link is a leaf node (doesn't open a child menu)
				else {
					$(this).click(function (e) {
						itemDisabled = $(this).parent().attr("disabled");
						if (o.disabled || itemDisabled) {
							return;
						}
						self.activate(e, $(this).parent());
						self.select(e);
						if (o.trigger) {
							var triggers = self._getTriggerEle();

							if (triggers.length) {
								self._hideSubmenu(container);
								self._resetDrilldownMenu(breadcrumb);
							}
						}
						if ($(this).attr("href") === "#") {
							e.preventDefault();
						}
					});
				}
			});
		},

		_slidingAnimation: function (ele, left, callback) {
			var o = this.options.slidingAnimation;
			if (o && !o.disabled) {
				ele.stop(true, true)
				.animate({ left: left }, o.duration, o.easing, callback);
			} else {
				ele.css("left", left);
				callback.call(this);
			}
		},

		_killDrilldown: function () {
			var ele = this.rootMenu,
				domObject = this.domObject,
				style = { width: "", height: "" };

			ele.css(style).removeClass("ui-widget-content");
			domObject.scrollcontainer.css(style);
			domObject.scrollcontainer.wijsuperpanel("destroy");
			domObject.scrollcontainer.removeClass("wijmo-wijsuperpanel").append(ele);
			ele.prevAll().remove();
			domObject.menucontainer
			.removeClass("wijmo-wijmenu-ipod wijmo-wijmenu-container");
			$('.wijmo-wijmenu-current', domObject.menucontainer)
			.removeClass('wijmo-wijmenu-current');
			$(".wijmo-wijmenu-breadcrumb", domObject.menucontainer).remove();
			ele.find("li").each(function () {
				var obj = $(this).children(":first");
				obj.unbind("click");
			});
			$("ul", ele).css({ left: "", width: "" });
			ele.css("left", "");
			domObject.scrollcontainer = domObject.menucontainer.children(":first");
		},

		///popup menu
		//		_popup: function () {
		//			var self = this;
		//			var o = self.options;
		//			var triggerElement = o.trigger;
		//			if (triggerElement && triggerElement !==
		// "" && $(triggerElement).length > 0) {
		//				triggerElement = $(triggerElement);
		//				self.element.data("domObject").menucontainer
		//.css("position", "relative");
		//				triggerElement.bind("click.wijmenu", function (e) {
		//					self._displaySubmenu(triggerElement, 
		//self.element.data("domObject").menucontainer, e);
		//				});
		//				self.element.find("a.wijmo-wijmenu-link")
		//.bind("click.wijmenu", function () {
		//					var value = $(this).text();
		//					triggerElement.val(value);
		//					self._hideAllMenus();
		//				});
		//			}
		//		},

		_getItemByValue: function (val) {
			var items = this.rootMenu.find("a.wijmo-wijmenu-link").filter(function () {
				return $(this).text() === val;
			});
			if (items.length > 0) {
				return items.eq(0).parent();
			}
			return null;
		},
		//now do not support the popup menu
		/*
		_setPopupPosition: function (e) {
		var self = this;
		var triggerElement = $(self.options.trigger);
		var val = triggerElement.val() || triggerElement.attr("value");
		if (val !== "") {
		var item = self._getItemByValue(val);
		if (item) {
		var offset = triggerElement.offset();
		var height = triggerElement.outerHeight(true);
		var position = item.position();
		var newOffset = {
		left: offset.left,
		top: offset.top - position.top
		};
		self.element.data("domObject").menucontainer.css({
		left: 0,
		top: 0
		}).offset(newOffset);
		self.activate(e, item);
		}
		else {
		self._setPosition(triggerElement, self.element
		//.data("domObject").menucontainer, false);
		}
		}
		else {
		self._setPosition(triggerElement, self.element
		//.data("domObject").menucontainer, false);
		}
		},
		*/
		_displaySubmenu: function (e, item, sublist) {
			var self = this,
				o = self.options,
				animationOptions, direction, showAnimation,
				animations = $.wijmo.wijmenu.animations;

			//now do not support the popup menu and equal-height menu.
			/*
			var parentUl = null;
			if (item.is(".wijmo-wijmenu-link")) {
			parentUl = item.parent().parent();
			}
			var parentHeight = 0;
			if (parentUl) {
			parentHeight = parentUl.innerHeight();
			if (parentHeight === 0) {
			parentHeight = this.element.data("domObject").menucontainer.innerHeight();
			}
			}
			var tag = false;
			if (parentHeight > 0 && parentHeight === sublist.innerHeight()) {
			tag = true;
			}
			
			sublist.show();
			if (o.mode === "popup") {
			this._setPopupPosition(e);
			}
			else {
			//this._setPosition(item, sublist, tag);

			}
			*/
			if (item.is("a.wijmo-wijmenu-link")) {
				item.data("subMenuOpened", true);
			}
			if (sublist.is(":visible")) {
				return;
			}
			sublist.show();
			self._setPosition(item, sublist);
			self.nowIndex++;
			self._setZindex(sublist, self.nowIndex);
			sublist.hide();
			self._trigger("showing", e, sublist);

			if ($.fn.wijshow) {
				animationOptions = {
					context: sublist,
					show: true
				};

				direction = "left";
				if (o.orientation === "horizontal") {
					if (sublist.parent().closest("ul").get(0) === this.rootMenu.get(0)) {
						direction = "up";
					}
				}
				showAnimation = $.extend({}, { option: { direction: direction} },
					o.animation, o.showAnimation);
				sublist.wijshow(showAnimation, animations,
					animationOptions, null, function () {
						var browser = $.browser;
						if (browser.msie && browser.version === "9.0") {
							sublist.wrap("<div></div>");
							sublist.unwrap();
						}
						else if (browser.msie && browser.version === "6.0") {
							sublist.css("overflow", "");
						}
						sublist.attr("aria-hidden", false);
					});
			}
			else {
				sublist.show().attr("aria-hidden", false);
			}

			self._isClickToOpen = o.triggerEvent === "click";

			if (!sublist.is(".wijmo-wijmenu")) {
				if (self.currentMenuList === undefined) {
					self.currentMenuList = [];
				}
				self.currentMenuList.push(sublist);
			}
		},

		_hideCurrentSubmenu: function (aItem) {
			var self = this;
			aItem.find("ul").each(function () {
				if (!$(this).data("notClose")) {
					self._hideSubmenu($(this));
				}
			});
		},
		_hideSubmenu: function (sublist) {
			var self = this,
				o = self.options,
				animations = $.wijmo.wijmenu.animations,
				animationOptions, list, hideAnimation;

			if (sublist.prev().is(".wijmo-wijmenu-link")) {
				sublist.prev().data("subMenuOpened", false);
				sublist.prev().removeClass("ui-state-active");
			}

			if ($.fn.wijhide) {
				animationOptions = {
					context: sublist,
					show: false
				};
				hideAnimation = $.extend({}, o.animation, o.hideAnimation);
				sublist.wijhide(hideAnimation, animations,
				animationOptions, null, function () {
					self._setZindex(sublist);
					sublist.attr("aria-hidden", true);
				});
			}
			else {
				sublist.hide().attr("aria-hidden", true);
				self._setZindex(sublist);
			}
			this.element.data("shown", false);
			list = this.currentMenuList;
			if (list) {
				list = $.map(list, function (n) {
					return n && (n.get(0) === sublist.get(0)) ? null : n;
				});
				this.currentMenuList = $.makeArray(list);
			}
		},

		_setZindex: function (ele, value) {
			var element = this.rootMenu,
				domObject = this.domObject, menucontainer;

			if (!domObject) {
				return;
			}
			menucontainer = domObject.menucontainer;
			if (ele.get(0) === menucontainer.get(0)) {
				return;
			}
			if (value) {
				ele.parent().css("z-index", 10);
				ele.css("z-index", value);
				if (menucontainer.css("z-index") === 0) {
					menucontainer.css("z-index", 9950);
				}
			}
			else {
				ele.css("z-index", "");
				ele.parent().css("z-index", "");
				if ($.browser.msie && $.browser.version < 8 &&
				 $("ul:visible", element).length === 0) {
					menucontainer.css("z-index", "");
				}
			}
		},

		_setPosition: function (item, sublist) {
			sublist.css({ left: '0', top: '0', position: 'absolute' });
			var pOption = this._getPosition(item),
				obj = { of: item };
			//now do not support the equal-height menu.
			/*
			if (tag) {
			var parentUl = item.parent().parent();
			if (!parentUl.is(".wijmo-wijmenu-child")) {
			parentUl = this.element.data("domObject").menucontainer;
			}
			obj = { of: parentUl };
			}
			*/
			sublist.position($.extend(obj, pOption));
		},

		_getPosition: function (item) {
			var o = this.options,
				pOption = { my: 'left top',
					at: 'right top'
				};

			//If the menu's orientation is horizontal, 
			//set the first level submenu's position to horizontal. 
			if (o.orientation === "horizontal") {
				if (item.closest("ul").get(0) === this.rootMenu.get(0)) {
					pOption = { my: 'left top',
						at: 'left bottom'
					};
				}
			}
			//If the item is a element outer of the menu.
			if (!item.is(".wijmo-wijmenu-link")) {
				pOption = { my: 'left top',
					at: 'left bottom'
				};
			}
			pOption = $.extend(pOption, o.position);
			return pOption;
		}
	});

	$.extend($.wijmo.wijmenu, {
		animations: {
			slide: function (options, addtions) {
				options = $.extend({
					duration: 400,
					easing: "swing"
				}, options, addtions);
				if (options.show) {
					options.context.stop(true, true).animate({
						height: 'show'
					}, options).attr("aria-hidden", false);
				}
				else {
					options.context.stop(true, true).animate({
						height: 'hide'
					}, options).attr("aria-hidden", true);
				}
			}
		}
	});
} (jQuery));


