/// <reference lib="webworker" />
import ConnectionType_ from "./ConnectionType.js";
import NavigatorNetworkInformation_ from "./NavigatorNetworkInformation.default.js";

declare global {
  type ConnectionType = ConnectionType_;
  type NavigatorNetworkInformation = NavigatorNetworkInformation_;
  interface Navigator extends NavigatorNetworkInformation {}
  interface WorkerNavigator extends NavigatorNetworkInformation {}
}

if (typeof Navigator !== "undefined") {
  const s = Object.getOwnPropertyDescriptors(
    NavigatorNetworkInformation_,
  ) as any;
  delete s.name;
  delete s.length;
  delete s.prototype;
  Object.defineProperties(Navigator, s);

  const p = Object.getOwnPropertyDescriptors(
    NavigatorNetworkInformation_.prototype,
  ) as any;
  delete p.constructor;
  delete p[Symbol.toStringTag];
  Object.defineProperties(Navigator.prototype, p);
}
if (typeof WorkerNavigator !== "undefined") {
  const s = Object.getOwnPropertyDescriptors(
    NavigatorNetworkInformation_,
  ) as any;
  delete s.name;
  delete s.length;
  delete s.call;
  delete s.prototype;
  Object.defineProperties(WorkerNavigator, s);

  const p = Object.getOwnPropertyDescriptors(
    NavigatorNetworkInformation_.prototype,
  ) as any;
  delete p.constructor;
  delete p[Symbol.toStringTag];
  Object.defineProperties(WorkerNavigator.prototype, p);
}
