import getFetchStats from "./getFetchStats.js";
import { parentPort } from "node:worker_threads";

parentPort.on("message", async (data) => {
  const { lockBuffer } = data;
  const lockInt32 = new Int32Array(lockBuffer);
  try {
    const { dataPort, url } = data;
    const fetchStats = await getFetchStats(url);
    dataPort.postMessage(fetchStats);

    Atomics.store(lockInt32, 0, 1);
    Atomics.notify(lockInt32, 0);
  } catch (error) {
    const { dataPort } = data;
    dataPort.postMessage({ headTime: 0, getTime: 0, getContentLength: 0 });

    Atomics.store(lockInt32, 0, 2);
    Atomics.notify(lockInt32, 0);
    throw error;
  }
});
