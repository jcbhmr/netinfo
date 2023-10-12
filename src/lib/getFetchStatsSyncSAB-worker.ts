import getFetchStats from "./getFetchStats.js";

globalThis.addEventListener("message", async (event) => {
  const { lockBuffer } = event.data;
  const lockInt32 = new Int32Array(lockBuffer);
  try {
    const { dataBuffer, url } = event.data;
    const dataUint32 = new Uint32Array(dataBuffer);

    const fetchStats = await getFetchStats(url);
    dataUint32[0] = fetchStats.headTime;
    dataUint32[1] = fetchStats.getTime;
    dataUint32[2] = fetchStats.getContentLength;

    Atomics.store(lockInt32, 0, 1);
    Atomics.notify(lockInt32, 0);
  } catch (error) {
    Atomics.store(lockInt32, 0, 2);
    Atomics.notify(lockInt32, 0);
    throw error;
  }
});
