import ConnectionType from "./ConnectionType.js";
import EffectiveConnectionType from "./EffectiveConnectionType.js";
import Megabit from "./Megabit.js";
import Millisecond from "./Millisecond.js";
import fetchNetStats from "./lib/fetchNetStats.js";

let {type, effectiveType, downlinkMax, downlink, rtt } = await fetchNetStats()
setTimeout(async function f() {
  ({type, effectiveType, downlinkMax, downlink, rtt } = await fetchNetStats())
  setTimeout(f, Math.random() * 10000 + 5000)
}, Math.random() * 10000 + 5000)

const eventHandlers = new WeakMap<any, { onchange: EventListener | null }>();
class NetworkInformation extends EventTarget {
  get type(): ConnectionType {
    return type;
  }
  get effectiveType(): EffectiveConnectionType {
    return effectiveType;
  }
  get downlinkMax(): Megabit {
    return downlinkMax
  }
  get downlink(): Megabit {
    return downlink
  }
  get rtt(): Millisecond {
    return rtt;
  }
  get onchange(): EventListener | null {
    return eventHandlers.get(this)?.onchange ?? null;
  }
  set onchange(onchange: EventListener | null) {
    let myEventHandlers = eventHandlers.get(this);
    if (!myEventHandlers) {
      myEventHandlers = { onchange: null };
      eventHandlers.set(this, myEventHandlers);
    }
    this.removeEventListener("change", myEventHandlers.onchange);
    this.addEventListener("change", onchange);
    myEventHandlers.onchange = onchange;
  }
}

export default NetworkInformation;
