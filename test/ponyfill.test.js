import test from "node:test";
import assert from "node:assert";
import { NavigatorNetworkInformation } from "../dist/ponyfill.js";

const navigatorConnection = Reflect.get(
  NavigatorNetworkInformation.prototype,
  "connection",
  globalThis.navigator ?? {}
);

test("navigatorConnection", () => {
  console.debug("navigatorConnection", {
    downlink: navigatorConnection.downlink,
    downlinkMax: navigatorConnection.downlinkMax,
    effectiveType: navigatorConnection.effectiveType,
    rtt: navigatorConnection.rtt,
    type: navigatorConnection.type,
  });
  assert(navigatorConnection);
});

test("navigatorConnection.downlink", () => {
  assert(navigatorConnection.downlink);
});

test("navigatorConnection.downlinkMax", () => {
  assert(navigatorConnection.downlinkMax);
});

test("navigatorConnection.effectiveType", () => {
  assert(navigatorConnection.effectiveType);
});

test("navigatorConnection.rtt", () => {
  assert(navigatorConnection.rtt);
});

test("navigatorConnection.type", () => {
  assert(navigatorConnection.type);
});
