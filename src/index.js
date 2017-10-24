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

if (isNetInfoAPISupported) {
    const _updateNetInfo = () => {
        const info = navigator.connection;
        netInfo = {};

        for (let p in info) {
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

module.exports = () => netInfo;
