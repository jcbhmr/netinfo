import NetworkInformation from "./NetworkInformation.default.js";

const connection = new WeakMap<any, NetworkInformation>();
const NavigatorNetworkInformation = {
  prototype: {
    get connection(): NetworkInformation {
      let myConnection = connection.get(this);
      if (!myConnection) {
        myConnection = new NetworkInformation();
        connection.set(this, myConnection);
      }
      return myConnection;
    },
  },
};
type NavigatorNetworkInformation = typeof NavigatorNetworkInformation.prototype;

export default NavigatorNetworkInformation;
