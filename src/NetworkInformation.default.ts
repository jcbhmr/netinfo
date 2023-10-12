import ConnectionType from "./ConnectionType.js";
import EffectiveConnectionType from "./EffectiveConnectionType.js";
import Megabit from "./Megabit.js";
import Millisecond from "./Millisecond.js";
import getFetchStats from "./lib/getFetchStats.js";
import getFetchStatsSync from "#lib/getFetchStatsSync.js";
import guessNetInfo, { NetInfo } from "./lib/guessNetInfo.js";

let guess: NetInfo | undefined;
(async () => {
  while (true) {
    const fetchStats = await getFetchStats("https://wicg.github.io/netinfo/");
    guess = guessNetInfo(fetchStats);
    await new Promise((r) => {
      const id = setTimeout(r, Math.random() * 10000 + 5000);
      // Node.js-specific
      // @ts-ignore
      id.deref?.();
    });
  }
})();

function doEnsureGuess() {
  if (!guess) {
    const fetchStats = getFetchStatsSync("https://wicg.github.io/netinfo/");
    guess = guessNetInfo(fetchStats);
  }
}

const eventTargets = new Set<EventTarget>();
const eventHandlers = new WeakMap<any, { onchange: EventListener | null }>();
class NetworkInformation extends EventTarget {
  constructor() {
    super();
    eventTargets.add(this);
  }

  get type(): ConnectionType {
    doEnsureGuess();
    return guess.type;
  }
  get effectiveType(): EffectiveConnectionType {
    doEnsureGuess();
    return guess.effectiveType;
  }
  get downlinkMax(): Megabit {
    doEnsureGuess();
    return guess.downlinkMax;
  }
  get downlink(): Megabit {
    doEnsureGuess();
    return guess.downlink;
  }
  get rtt(): Millisecond {
    doEnsureGuess();
    return guess.rtt;
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
