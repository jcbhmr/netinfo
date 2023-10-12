import NetworkInformation from "./NetworkInformation.browser.js";

interface NavigatorNetworkInformation {
  readonly connection: NetworkInformation;
}
const NavigatorNetworkInformation = Navigator;
export default NavigatorNetworkInformation;
