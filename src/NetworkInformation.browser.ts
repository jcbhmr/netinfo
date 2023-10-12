import ConnectionType from "./ConnectionType.js";
import EffectiveConnectionType from "./EffectiveConnectionType.js";
import Megabit from "./Megabit.js";
import Millisecond from "./Millisecond.js";

declare class NetworkInformation extends EventTarget {
  readonly type: ConnectionType;
  readonly effectiveType: EffectiveConnectionType;
  readonly downlinkMax: Megabit;
  readonly downlink: Megabit;
  readonly rtt: Millisecond;
  readonly saveData: boolean;
  onchange: EventListener | null;
}
export default NetworkInformation;
