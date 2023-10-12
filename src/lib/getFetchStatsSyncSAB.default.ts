import { FetchStats } from "./getFetchStats.js";

let worker: Worker | undefined;
let workerTimeout: ReturnType<typeof setTimeout> | undefined;
function getFetchStatsSyncSAB(url: string): FetchStats {
  worker ??= new Worker(
    new URL("./getFetchStatsSyncSAB-worker.js", import.meta.url),
    { type: "module" }
  );
  clearTimeout(workerTimeout);
  workerTimeout = setTimeout(() => {
    worker.terminate();
    worker = undefined;
  }, 5000);

  const lockBuffer = new SharedArrayBuffer(4);
  const lockInt32 = new Int32Array(lockBuffer);
  const dataBuffer = new SharedArrayBuffer(12);
  const dataUint32 = new Uint32Array(dataBuffer);

  Atomics.store(lockInt32, 0, 0);
  worker.postMessage({ lockBuffer, dataBuffer, url });
  Atomics.wait(lockInt32, 0, 0);

  const [headTime, getTime, getLength] = dataUint32;

  return { headTime, getTime, getLength };
}

export default getFetchStatsSyncSAB;
