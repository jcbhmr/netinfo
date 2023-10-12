import { FetchStats } from "./getFetchStats.js";

let getFetchStatsSync: (url: string) => FetchStats;

if (!getFetchStatsSync && typeof XMLHttpRequest !== "undefined") {
  ({ default: getFetchStatsSync } = await import("./getFetchStatsSyncXHR.js"));
}

if (!getFetchStatsSync && typeof SharedArrayBuffer !== "undefined") {
  let supportsAtomicsWaitOnThisThread = false;
  try {
    const buffer = new SharedArrayBuffer(4);
    const view = new Int32Array(buffer);
    Atomics.wait(view, 0, 1);
    supportsAtomicsWaitOnThisThread = true;
  } catch {}
  if (supportsAtomicsWaitOnThisThread) {
    ({ default: getFetchStatsSync } = await import(
      "./getFetchStatsSyncSAB.default.js"
    ));
  }
}

export default getFetchStatsSync;
