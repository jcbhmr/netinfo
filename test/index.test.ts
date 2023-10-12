import "./prelude.js";
import "../src/polyfill.default.js";
import { test, assert, expect } from "vitest";

test("navigator.connection", () => {
  console.log(navigator.connection);
  assert(navigator.connection);
});

test("navigator.connection.rtt", () => {
  console.log(navigator.connection.rtt);
  assert(navigator.connection.rtt);
});
