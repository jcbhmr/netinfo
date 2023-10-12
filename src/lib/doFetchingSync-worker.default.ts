globalThis.addEventListener("message", async (event) => {
  const { lockBuffer } = event.data;
  const lockView = new Int32Array(lockBuffer);
  try {
    const { url, dataBuffer } = event.data;
    const startTime = performance.now();
    const response = await fetch(url, {
      headers: {
        "Accept-Encoding": "identity",
      },
      cache: "no-cache",
    }).catch(() => null);
    const responseTime = performance.now();
    const buffer = await response?.arrayBuffer();
    const endTime = performance.now();
    const contentLength = parseInt(
      response?.headers.get("Content-Length") as any
    );
    dataBuffer[0] = startTime;
    dataBuffer[1] = !!response;
    dataBuffer[2] = responseTime;
    dataBuffer[3] = !!buffer;
    dataBuffer[4] = endTime;
    dataBuffer[5] = contentLength;
    Atomics.store(lockView, 0, 1);
    Atomics.notify(lockView, 0);
  } catch (error) {
    Atomics.store(lockView, 0, 1);
    Atomics.notify(lockView, 0);
    throw error;
  }
});
