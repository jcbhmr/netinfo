import "./prelude.js";
import "../dist/polyfill.default.js";
import test from "node:test";
import assert from "node:assert";

await new Promise((r) => setTimeout(r, 1000));

test("navigator.connection", () => {
  console.debug("navigator.connection", {
    downlink: navigator.connection.downlink,
    downlinkMax: navigator.connection.downlinkMax,
    effectiveType: navigator.connection.effectiveType,
    rtt: navigator.connection.rtt,
    type: navigator.connection.type,
  });
  assert(navigator.connection);
});

test("navigator.connection.downlink", () => {
  assert(navigator.connection.downlink);
});

test("navigator.connection.downlinkMax", () => {
  assert(navigator.connection.downlinkMax);
});

test("navigator.connection.effectiveType", () => {
  assert(navigator.connection.effectiveType);
});

test("navigator.connection.rtt", () => {
  assert(navigator.connection.rtt);
});

test("navigator.connection.type", () => {
  assert(navigator.connection.type);
});
