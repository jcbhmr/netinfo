import { networkInterfaces } from "node:os";
import ConnectionType from "../ConnectionType.js";
import EffectiveConnectionType from "../EffectiveConnectionType.js";
import Megabit from "../Megabit.js";
import Millisecond from "../Millisecond.js";

export default async function fetchNetStats() {
  const startTime = performance.now();
  const response = await fetch("https://wicg.github.io/netinfo/", {
    headers: {
      "Accept-Encoding": "identity",
    },
    cache: "no-cache",
  }).catch(() => null);
  const responseTime = performance.now();
  const buffer = await response?.arrayBuffer();
  const endTime = performance.now();
  const contentLength = parseInt(response?.headers.get("Content-Length") as any);

  let rtt: Millisecond;
  if (response) {
    const rttPrecise = responseTime - startTime;
    rtt = Math.round(rttPrecise / 25) * 25;
  } else {
    rtt = 0;
  }

  let type: ConnectionType;
  type = "unknown"

  const downlinkMax = {
    "wimax": 200,
    "cellular": 50,
    "bluetooth": 15,
    "ethernet": 1000,
    "wifi": 200,
    "unknown": +Infinity,
    none: 0,
    other: +Infinity,
  }[type]

  let downlink: Megabit;
  if (buffer) {
    const duration = (endTime - startTime) * 1000;
    const bytesPerSecond = contentLength / duration;
    const downlinkPrecise = bytesPerSecond / 125000;
    downlink = Math.round(downlinkPrecise);
  } else {
    downlink = 0;
  }

  let effectiveType: EffectiveConnectionType;
  effectiveType = "3g"

  return { type, effectiveType, downlink, downlinkMax, rtt };
}

// {
// type: "none" satisfies ConnectionType,
// effectiveType: "4g" satisfies EffectiveConnectionType,
// downlink: 0 satisfies Megabit,
// downlinkMax: 0 satisfies Megabit,
// rtt: 0 satisfies Millisecond,
// };
