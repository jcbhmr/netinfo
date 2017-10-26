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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

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

    var ConnectionInfo = function () {
        function ConnectionInfo() {
            _classCallCheck(this, ConnectionInfo);

            this.addChangeListener = function (cb) {
                if (typeof cb === 'function') {
                    var hasSameListener = ConnectionInfo.changeListeners.some(function (l) {
                        return l === cb;
                    });

                    if (!hasSameListener) {
                        ConnectionInfo.changeListeners.push(cb);
                    }

                    return true;
                }

                return false;
            };

            this.removeChangeListener = function (cb) {
                var matched = false;

                ConnectionInfo.changeListeners = ConnectionInfo.changeListeners.filter(function (l) {
                    if (l === cb) {
                        matched = true;
                        return false;
                    }

                    return true;
                });

                return matched;
            };

            this.supported = isNetInfoAPISupported;
            ConnectionInfo.storeInfoReference(this);
        }

        _createClass(ConnectionInfo, null, [{
            key: 'add',
            value: function add(key, val) {
                ConnectionInfo.keys.push(key);
                ConnectionInfo.ref[key] = val;
            }
        }, {
            key: 'clean',
            value: function clean() {
                ConnectionInfo.keys.map(function (k) {
                    return delete ConnectionInfo.ref[k];
                });
                ConnectionInfo.keys = [];
            }
        }]);

        return ConnectionInfo;
    }();

    ConnectionInfo.changeListeners = [];
    ConnectionInfo.keys = [];

    ConnectionInfo.storeInfoReference = function (info) {
        return ConnectionInfo.ref = info;
    };

    var netInfo = new ConnectionInfo();

    if (isNetInfoAPISupported) {
        var _updateNetInfo = function _updateNetInfo(e) {
            var info = navigator.connection;
            ConnectionInfo.clean();

            for (var p in info) {
                // Not checking for hasOwnProperty as it always returns false
                // for `NetworkInformation` instance
                // Push only keys with value
                if (!ignoreProperties.includes(p)) {
                    ConnectionInfo.add(p, info[p]);
                }
            }

            // Prevent calling callback on initial update,
            // only call when there is change event
            if (e) {
                ConnectionInfo.changeListeners.map(function (cb) {
                    return cb(netInfo);
                });
            }

            return netInfo;
        };

        _updateNetInfo();

        navigator.connection.addEventListener('change', _updateNetInfo);
    }

    /**
     * Get current net info
     *
     * @function
     * @returns {Object} Net info object
     */
    var getNetInfo = function getNetInfo() {
        return netInfo;
    };

    module.exports = getNetInfo;
});