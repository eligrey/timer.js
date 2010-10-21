/*
 * timer.js: Implements a high-resolution (up to µs) timer constructor.
 *
 * 2010-10-21
 * 
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global chromium*/
/*jslint evil: true, laxbreak: true, eqeqeq: true, strict: true, maxlen: 90 */

/*! @source http://purl.eligrey.com/github/timer.js/blob/master/timer.js*/

"use strict";

var Timer = Timer || (function () {
	var
		  Timer
		, timerPrototype
		// My profiling indicates that Date.now is slightly faster than date.getTime
		// in all engines that support it.
		, now = Date.now || function () {
			return (new Date()).getTime();
		}
	;
	
	if (typeof chrome !== "undefined" && typeof chrome.Interval === "function") {
		// Google Chrome has a native timer constructor
		timerPrototype = (Timer = chrome.Interval).prototype;
		timerPrototype.milliseconds = function () {
			return this.microseconds() / 1000;
		};
	} else { 
		timerPrototype = (Timer = function () {
			var
				  startT = 0
				, stopT = 0
			;
			
			this.start = function () {
				stopT = 0;
				startT = now();
			};
			
			this.stop = function () {
				stopT = now();
				if (startT === 0) {
					stopT = 0;
				}
			};
			this.milliseconds = function () {
				var stop = stopT;
				if (stop === 0 && startT !== 0) {
					stop = now();
				}
				return stop - startT;
			};
		}).prototype;
		timerPrototype.microseconds = function () {
			return this.milliseconds() * 1000;
		};
	}
	timerPrototype.profile = function (fn, iterations) {
		if (typeof fn === "string") {
			fn = new Function(fn);
		}
		this.start();
		while (iterations--) {
			fn();
		}
		this.stop();
	};
	timerPrototype.seconds = function () {
		return this.milliseconds() / 1000;
	};
	return Timer;
}());
