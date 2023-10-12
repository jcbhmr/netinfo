import { parentPort } from "worker_threads";

parentPort.on("message", async (data) => {
  const { lockBuffer } = data;
  const lockView = new Int32Array(lockBuffer);
  try {
    const { url, dataBuffer } = data;
    const dataView = new Float64Array(dataBuffer);
    const startTime = performance.now();
    const response: Response | null = await fetch(url, {
      headers: {
        "Accept-Encoding": "identity",
      },
      cache: "no-cache",
    }).catch(() => null);
    const responseTime = performance.now();
    const buffer: ArrayBuffer | null = await response
      ?.arrayBuffer()
      .catch(() => null);
    const endTime = performance.now();
    const contentLength =
      buffer && parseInt(response?.headers.get("Content-Length") as any);
    dataView[0] = startTime;
    dataView[1] = +!!response;
    dataView[2] = responseTime;
    dataView[3] = +!!buffer;
    dataView[4] = endTime;
    dataView[5] = contentLength;
    console.log(dataView);
    Atomics.store(lockView, 0, 1);
    Atomics.notify(lockView, 0);
  } catch (error) {
    Atomics.store(lockView, 0, 1);
    Atomics.notify(lockView, 0);
    throw error;
  }
});
