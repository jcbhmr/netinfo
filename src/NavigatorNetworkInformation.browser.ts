import NetworkInformation from "./NetworkInformation.browser.js";

export default interface NavigatorNetworkInformation {
  readonly connection: NetworkInformation;
}
