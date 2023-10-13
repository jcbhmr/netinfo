import ConnectionType from "../ConnectionType.js";
import EffectiveConnectionType from "../EffectiveConnectionType.js";
import Megabit from "../Megabit.js";
import Millisecond from "../Millisecond.js";
import getFetchStats from "./getFetchStats.js";
import getFetchStatsSync from "#lib/getFetchStatsSync.js";
import guessNetInfo, { NetInfo } from "./guessNetInfo.js";

const url = "https://wicg.github.io/netinfo/";
let fetchStatsController: AbortController | undefined = new AbortController();
let guess: NetInfo | undefined;
(async () => {
  while (true) {
    try {
      const fetchStats = await getFetchStats(url, {
        signal: fetchStatsController?.signal,
      });
      guess = guessNetInfo(fetchStats);
    } catch (error) {
      if (error?.name === "AbortError") {
        // console.debug("aborting");
      } else {
        throw error;
      }
    }
    await new Promise((r) => {
      const id = setTimeout(r, Math.random() * 10000 + 5000);
      // Node.js-specific
      id.unref?.();
    });
  }
})();
function doEnsureGuess() {
  if (!guess) {
    fetchStatsController.abort();
    fetchStatsController = undefined;
    const fetchStats = getFetchStatsSync(url);
    guess = guessNetInfo(fetchStats);
  }
}

const eventHandlers = new WeakMap<any, { onchange: EventListener | null }>();
class NetworkInformation extends EventTarget {
  constructor() {
    super();
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
}

export default NetworkInformation;
