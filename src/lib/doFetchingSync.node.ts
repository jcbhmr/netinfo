import { Worker } from "node:worker_threads";

let worker: Worker;
function doFetchingSync(url: string) {
  worker ??= new Worker(
    new URL("./doFetchingSync-worker.node.ts", import.meta.url)
  );
  const lockBuffer = new SharedArrayBuffer(4);
  const lockView = new Int32Array(lockBuffer);
  const dataBuffer = new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT * 6);
  const dataView = new Float64Array(dataBuffer);

  Atomics.store(lockView, 0, 0);
  worker.postMessage({ url, lockBuffer, dataBuffer });
  Atomics.wait(lockView, 0, 0);

  const [startTime, response, responseTime, buffer, endTime, contentLength] =
    dataView;
  return { startTime, response, responseTime, buffer, endTime, contentLength };
}

export default doFetchingSync;
