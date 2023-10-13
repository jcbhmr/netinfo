/// <reference lib="webworker" />
import * as M from "./ponyfill.js";

declare global {
  type ConnectionType = M.ConnectionType;
  type EffectiveConnectionType = M.EffectiveConnectionType;
  type Megabit = M.Megabit;
  type Millisecond = M.Millisecond;
  type NavigatorNetworkInformation = M.NavigatorNetworkInformation;
  type NetworkInformation = M.NetworkInformation;

  var NavigatorNetworkInformation: typeof M.NavigatorNetworkInformation;
  var NetworkInformation: typeof M.NetworkInformation;

  interface Navigator extends M.NavigatorNetworkInformation {}
  interface WorkerNavigator extends M.NavigatorNetworkInformation {}
}

if (typeof Navigator !== "undefined") {
  const s = Object.getOwnPropertyDescriptors(
    M.NavigatorNetworkInformation
  ) as any;
  delete s.name;
  delete s.length;
  delete s.prototype;
  Object.defineProperties(Navigator, s);

  const p = Object.getOwnPropertyDescriptors(
    M.NavigatorNetworkInformation.prototype
  ) as any;
  delete p.constructor;
  delete p[Symbol.toStringTag];
  Object.defineProperties(Navigator.prototype, p);
}
if (typeof WorkerNavigator !== "undefined") {
  const s = Object.getOwnPropertyDescriptors(
    M.NavigatorNetworkInformation
  ) as any;
  delete s.name;
  delete s.length;
  delete s.call;
  delete s.prototype;
  Object.defineProperties(WorkerNavigator, s);

  const p = Object.getOwnPropertyDescriptors(
    M.NavigatorNetworkInformation.prototype
  ) as any;
  delete p.constructor;
  delete p[Symbol.toStringTag];
  Object.defineProperties(WorkerNavigator.prototype, p);
}
