import ConnectionType from "./ConnectionType.js";
import EffectiveConnectionType from "./EffectiveConnectionType.js";

const eventHandlers = new WeakMap<any, { onchange: EventListener | null }>();

class NetworkInformation extends EventTarget {
  get type(): ConnectionType {
    return getType();
  }
  get effectiveType(): EffectiveConnectionType {
    return getEffectiveType();
  }
  get downlinkMax(): Megabit {
    return getDownlinkMax();
  }
  // readonly attribute Megabit downlink;
  get downlink(): Megabit {
    return getDownlink();
  }
  // readonly attribute Millisecond rtt;
  get rtt(): Millisecond {
    return getRTT();
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
