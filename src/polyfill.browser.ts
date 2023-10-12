/// <reference lib="webworker" />
import ConnectionType_ from "./ConnectionType.js";
import NavigatorNetworkInformation_ from "./NavigatorNetworkInformation.browser.js";

declare global {
  type ConnectionType = ConnectionType_;
  type NavigatorNetworkInformation = NavigatorNetworkInformation_;
  interface Navigator extends NavigatorNetworkInformation {}
  interface WorkerNavigator extends NavigatorNetworkInformation {}
}
