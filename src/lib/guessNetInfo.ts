import ConnectionType from "../ConnectionType.js";
import EffectiveConnectionType from "../EffectiveConnectionType.js";
import Megabit from "../Megabit.js";
import Millisecond from "../Millisecond.js";
import { FetchStats } from "./getFetchStats.js";

interface NetInfo {
  type: ConnectionType;
  effectiveType: EffectiveConnectionType;
  downlink: Megabit;
  downlinkMax: Megabit;
  rtt: Millisecond;
}

function guessNetInfo({ headTime, getTime, getLength }: FetchStats): NetInfo {
  let rtt: Millisecond;
  if (headTime) {
    rtt = Math.round(headTime / 25) * 25;
  } else {
    rtt = 0;
  }

  let type: ConnectionType;
  type = "unknown";

  const downlinkMax = {
    wimax: 200,
    cellular: 50,
    bluetooth: 15,
    ethernet: 1000,
    wifi: 200,
    unknown: +Infinity,
    none: 0,
    other: +Infinity,
  }[type];

  let downlink: Megabit;
  if (getTime && getLength) {
    const bytesPerSecond = getLength / (getTime / 1000);
    const downlinkPrecise = bytesPerSecond / 125000;
    downlink = Math.round(downlinkPrecise / 0.025) * 0.025;
  } else {
    downlink = 0;
  }

  let effectiveType: EffectiveConnectionType;
  effectiveType = "3g";

  return { type, effectiveType, downlink, downlinkMax, rtt };
}

export default guessNetInfo;
export type { NetInfo };
