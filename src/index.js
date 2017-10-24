/**
 * Get network connection details of device in browser using Expanded Network API.
 * Currently supported in latest version of chrome.
 *
 * More info - https://wicg.github.io/netinfo/
 *
 * Author: Ganapati V S(@ganapativs)
 * */
const isNetInfoAPISupported = !!(navigator && navigator.connection);
const ignoreProperties = [
    'onchange',
    'addEventListener',
    'removeEventListener',
    'dispatchEvent',
];
let netInfo = {};
let listeners = [];

if (isNetInfoAPISupported) {
    const _updateNetInfo = (e) => {
        const info = navigator.connection;
        netInfo = {};

        for (let p in info) {
            // Not checking for hasOwnProperty as it always returns false
            // for `NetworkInformation` instance
            if (!ignoreProperties.includes(p)) {
                netInfo[p] = info[p];
            }
        }

        // Prevent calling callback on initial update,
        // only call when there is change event
        if (e) {
            listeners.map(cb => cb(netInfo));
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
const removeListener = (cb) => {
    let matched = false;

    listeners = listeners.filter(l => {
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
const addListener = (cb) => {
    if (typeof cb === 'function') {
        let hasSameListener = listeners.some(l => l === cb);

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
const getNetInfo = () => {
    return {
        ...netInfo,
        addListener,
        removeListener
    };
};

module.exports = getNetInfo;

