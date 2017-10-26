# netinfo

Get network connection details of device in browser using navigator.connection API.
 
This package uses [Expanded Network API](https://wicg.github.io/netinfo/) and currently supported in latest version of chrome. 

# Installation
- NPM
```sh
npm install netinfo
```

- Yarn
```sh
yarn add netinfo
```

## Usage
```javascript
import getNetInfo from 'netinfo';
// Other options ;)
// let getNetInfo = require('netinfo');
// <script src="./minified/index.js"></script>

/** 
* Calling `getNetInfo()` returns current network connection details of device as object
* {
*   downlink: 6.4,
*   downlinkMax: Infinity,
*   effectiveType: "4g",
*   rtt: 350,
*   type: "wifi"
* }
*/
const currentNetInfo = getNetInfo();

// Optionally you can listen to net info changes
// This callback will be called when there is change in net info
let onNetInfoChange = (newNetInfo) => {
    // Do something here
};
currentNetInfo.addChangeListener(onNetInfoChange);
// Somewhere later in code, Remove net info change listener callback
currentNetInfo.removeChangeListener(onNetInfoChange);

```

## License

MIT © [Ganapati V S](http://meetguns.com)
