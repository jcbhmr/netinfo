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

class ConnectionInfo {
    constructor() {
        this.supported = isNetInfoAPISupported;
        ConnectionInfo.storeInfoReference(this);
    }

    static changeListeners = [];
    static keys = [];
    static storeInfoReference = (info) => ConnectionInfo.ref = info;
    static add(key, val) {
        ConnectionInfo.keys.push(key);
        ConnectionInfo.ref[key] = val;
    }

    static clean() {
        ConnectionInfo.keys.map(k => delete ConnectionInfo.ref[k]);
        ConnectionInfo.keys = [];
    }

    /**
     * Add info change listener
     *
     * @function
     * @param {Function} cb Listener callback to be added
     *
     * @returns {Boolean} Listener attach status
     */
    addChangeListener = (cb) => {
        if (typeof cb === 'function') {
            let hasSameListener = ConnectionInfo.changeListeners.some(l => l === cb);

            if (!hasSameListener) {
                ConnectionInfo.changeListeners.push(cb);
            }

            return true;
        }

        return false;
    };

    /**
     * Remove info change listener
     *
     * @function
     * @param {Function} cb Listener callback to be removed
     *
     * @returns {Boolean} Listener remove status
     */
    removeChangeListener = (cb) => {
        let matched = false;

        ConnectionInfo.changeListeners = ConnectionInfo.changeListeners.filter(l => {
            if (l === cb) {
                matched = true;
                return false;
            }

            return true;
        });

        return matched;
    };
}

let netInfo = new ConnectionInfo();

if (isNetInfoAPISupported) {
    const _updateNetInfo = (e) => {
        const info = navigator.connection;
        ConnectionInfo.clean();

        for (let p in info) {
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
            ConnectionInfo.changeListeners.map(cb => cb(netInfo));
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
const getNetInfo = () => netInfo;

module.exports = getNetInfo;

