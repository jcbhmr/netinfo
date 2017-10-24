(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
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

    if (isNetInfoAPISupported) {
        var _updateNetInfo = function _updateNetInfo() {
            var info = navigator.connection;
            netInfo = {};

            for (var p in info) {
                // Not checking for hasOwnProperty as it always returns false
                // for `NetworkInformation` instance
                if (!ignoreProperties.includes(p)) {
                    netInfo[p] = info[p];
                }
            }

            return netInfo;
        };

        _updateNetInfo();

        navigator.connection.addEventListener('change', _updateNetInfo);
    }

    exports.default = function () {
        return netInfo;
    };
});