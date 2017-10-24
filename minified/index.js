(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.getNetInfo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    module.exports = function () {
        return netInfo;
    };
});
},{}]},{},[1])(1)
});