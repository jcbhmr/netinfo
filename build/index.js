(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.index = mod.exports;
    }
})(this, function (module) {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    /**
     * Get network connection details of device in browser using Expanded Network API.
     * Currently supported in latest version of chrome.
     *
     * More info - https://wicg.github.io/netinfo/
     *
     * Author: Ganapati V S(@ganapativs)
     * */
    var isNetInfoAPISupported = !!(navigator && navigator.connection);
    var ignoreProperties = ['onchange', 'addEventListener', 'removeEventListener', 'dispatchEvent'];
    var netInfo = {};
    var listeners = [];

    if (isNetInfoAPISupported) {
        var _updateNetInfo = function _updateNetInfo(e) {
            var info = navigator.connection;
            netInfo = {};

            for (var p in info) {
                // Not checking for hasOwnProperty as it always returns false
                // for `NetworkInformation` instance
                if (!ignoreProperties.includes(p)) {
                    netInfo[p] = info[p];
                }
            }

            // Prevent calling callback on initial update,
            // only call when there is change event
            if (e) {
                listeners.map(function (cb) {
                    return cb(netInfo);
                });
            }

            return netInfo;
        };

        _updateNetInfo();

        navigator.connection.addEventListener('change', _updateNetInfo);
    }

    /**
     * Remove listener
     *
     * @function
     * @param {Function} cb Listener callback to be removed
     *
     * @returns {Boolean} Listener remove status
     */
    var removeListener = function removeListener(cb) {
        var matched = false;

        listeners = listeners.filter(function (l) {
            if (l === cb) {
                matched = true;
                return false;
            }

            return true;
        });

        return matched;
    };

    /**
     * Store listener
     *
     * @function
     * @param {Function} cb Listener callback to be added
     *
     * @returns {Boolean} Listener attach status
     */
    var addListener = function addListener(cb) {
        if (typeof cb === 'function') {

            var hasSameListener = listeners.some(function (l) {
                return l === cb;
            });

            if (!hasSameListener) {
                listeners.push(cb);
            }

            return true;
        }

        return false;
    };

    /**
     * Get current net info
     *
     * @function
     * @returns {Object} Net info object
     */
    var getNetInfo = function getNetInfo() {
        return _extends({}, netInfo, {
            addListener: addListener,
            removeListener: removeListener
        });
    };

    module.exports = getNetInfo;
});