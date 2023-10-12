import ConnectionType from "../ConnectionType.js";
import EffectiveConnectionType from "../EffectiveConnectionType.js";
import Megabit from "../Megabit.js";
import Millisecond from "../Millisecond.js";

export default function doGuessing({
  startTime,
  response,
  responseTime,
  buffer,
  endTime,
  contentLength,
}: {
  startTime: number;
  response: any;
  responseTime: number;
  buffer: any;
  endTime: number;
  contentLength: number;
}) {
  let rtt: Millisecond;
  if (response) {
    const rttPrecise = responseTime - startTime;
    rtt = Math.round(rttPrecise / 25) * 25;
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
  if (buffer) {
    const duration = (endTime - startTime) * 1000;
    const bytesPerSecond = contentLength / duration;
    const downlinkPrecise = bytesPerSecond / 125000;
    downlink = Math.round(downlinkPrecise);
  } else {
    downlink = 0;
  }

  let effectiveType: EffectiveConnectionType;
  effectiveType = "3g";

  return { type, effectiveType, downlink, downlinkMax, rtt };
}
