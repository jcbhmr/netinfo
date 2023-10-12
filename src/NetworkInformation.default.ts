/**
 * Initiate an async getFetchStats() call. If the current environment doesn't support either sync XHR or main-thread
 * Atomics.wait() & SAB, wait for the async getFetchStats() call to finish.
 *
 * When a property is accessed, if the getFetchStats() call hasn't finished, run a sync XHR or SAB getFetchStats() call.
 */

import ConnectionType from "./ConnectionType.js";
import EffectiveConnectionType from "./EffectiveConnectionType.js";
import Megabit from "./Megabit.js";
import Millisecond from "./Millisecond.js";
import doFetching from "./lib/doFetching.js";
import doFetchingSync from "#lib/doFetchingSync.js";
import doGuessing from "./lib/doGuessing.js";

let supportsAtomicsWaitOnThisThread = false;
try {
  const buffer = new SharedArrayBuffer(4);
  const view = new Int32Array(buffer);
  Atomics.wait(view, 0, 1);
  supportsAtomicsWaitOnThisThread = true;
} catch {}

let guess: {
  type: ConnectionType;
  effectiveType: EffectiveConnectionType;
  downlink: Megabit;
  downlinkMax: Megabit;
  rtt: Millisecond;
} | null = null;

let fetchingP = doFetching("https://wicg.github.io/netinfo/");
fetchingP.then((x) => {
  guess = doGuessing(x);
});
fetchingP.finally(() => {
  fetchingP = null;
});

if (typeof SharedArrayBuffer === "undefined") {
  await fetchingP;
}

function doEnsureGuess() {
  if (!guess) {
    const data = doFetchingSync("https://wicg.github.io/netinfo/");
    guess = doGuessing(data);
  }
}

setTimeout(
  function f() {
    fetchingP = doFetching("https://wicg.github.io/netinfo/");
    fetchingP.then((x) => {
      guess = doGuessing(x);
    });
    fetchingP.finally(() => {
      fetchingP = null;
    });
    if (typeof requestIdleCallback !== "undefined") {
      setTimeout(
        () => {
          requestIdleCallback(f);
        },
        Math.random() * 10000 + 1000
      );
    } else {
      setTimeout(f, Math.random() * 10000 + 1000);
    }
  },
  Math.random() * 10000 + 1000
);

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
