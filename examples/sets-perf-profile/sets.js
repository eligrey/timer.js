/* 2010-07-25
 * 
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
var Set = (function () {
	"use strict";
	
	var
		  Set = function (items) {
			if (arguments.length === 0) {
				items = [];
			}
		
			this.items = [];
		
			var i = items.length;
		
			while (i--) {
				this.add(items[i]);
			}
		}
		, arrayIndexOf = Array.prototype.indexOf || function (elt) {
			var
				  len = this.length
				, i = 0
			;
		
			for (; i < len; i++) {
				if (i in this && this[i] === elt) {
					return i;
				}
			}
		
			return -1;
		}
		, proto = Set.prototype
	;
	
	/*
	proto.__iterator__ = function () {
		var i = this.items.length;
		
		while (i--) {
			yield this.items[i];
		}
	};
	*/
	proto.contains = function (item) {
		return arrayIndexOf.call(this.items, item) !== -1;
	};
	proto.add = function (item) {
		if (!this.contains(item)) {
			this.items.push(item);
		}
	};
	proto.remove = function (item) {
		var index = arrayIndexOf.call(this.items, item);
		
		if (index !== -1) {
			this.items.splice(index, 1);
		}
	};
	
	return Set;
}());

var UnsafeStringSet = (function () {
	"use strict";
	
	var undef,
	Set = function (items) {
		if (arguments.length === 0) {
			items = [];
		}
		
		this.items = {};
		
		var i = items.length;
		
		while (i--) {
			this.add(items[i]);
		}
	},
	proto = Set.prototype,
	hasOwnProp = Object.prototype.hasOwnProperty;
	
	/*
	proto.__iterator__ = function () {
		for (var item in this.items) {
			if (this.contains(item)) {
				yield item;
			}
		}
	};
	*/
	proto.contains = function (item) {
		return hasOwnProp.call(this.items, item);
	};
	proto.add = function (item) {
		this.items[item] = undef;
	};
	proto.remove = function (item) {
		delete this.items[item];
	};
	
	return Set;
}());

var SafeStringSet = (function () {
	"use strict";
	
	var
		  undef
		, Set = function (items) {
			if (arguments.length === 0) {
				items = [];
			}
		
			this.items = {};
		
			var i = items.length;
		
			while (i--) {
				this.add(items[i]);
			}
		}
		, proto = Set.prototype
		, hasOwnProp = Object.prototype.hasOwnProperty
	;
	
	/*
	proto.__iterator__ = function () {
		for (var item in this.items) {
			if (this.contains(item)) {
				yield item;
			}
		}
	};
	*/
	
	// using NUL to prevent collisions with native accessors, etc.
	proto.contains = function (item) {
		return hasOwnProp.call(this.items, "\x00" + item);
	};
	proto.add = function (item) {
		this.items["\x00" + item] = undef;
	};
	proto.remove = function (item) {
		delete this.items["\x00" + item];
	};
	
	return Set;
}());
