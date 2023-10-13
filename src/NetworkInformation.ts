type NetworkInformation =
  typeof import("./lib/NetworkInformation.js").default.prototype;
let NetworkInformation: typeof import("./lib/NetworkInformation.js").default;

if (!NetworkInformation && globalThis.NetworkInformation) {
  ({ NetworkInformation } = globalThis as any);
}

if (!NetworkInformation) {
  ({ default: NetworkInformation } = await import(
    "./lib/NetworkInformation.js"
  ));
}

export default NetworkInformation;
