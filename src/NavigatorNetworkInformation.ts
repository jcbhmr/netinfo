type NavigatorNetworkInformation =
  typeof import("./lib/NavigatorNetworkInformation.js").default.prototype;
let NavigatorNetworkInformation: typeof import("./lib/NavigatorNetworkInformation.js").default;

if (!NavigatorNetworkInformation && typeof Navigator !== "undefined") {
  if ("connection" in Navigator.prototype) {
    NavigatorNetworkInformation = Navigator as any;
  }
}

if (!NavigatorNetworkInformation) {
  ({ default: NavigatorNetworkInformation } = await import(
    "./lib/NavigatorNetworkInformation.js"
  ));
}

export default NavigatorNetworkInformation;
