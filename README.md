# netinfo

Get network connection details of device in browser using navigator.connection API.
 
This package uses [Expanded Network API](https://wicg.github.io/netinfo/) and currently supported in latest version of chrome. 

## Usage
```javascript
import getNetInfo from 'netinfo';
// let getNetInfo = require('netinfo').default;

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
