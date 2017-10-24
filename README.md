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
// let getNetInfo = require('netinfo').default;
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
getNetInfo();

```
## License

MIT © [Ganapati V S](http://meetguns.com)
