import { Worker, receiveMessageOnPort } from "node:worker_threads";
import { FetchStats } from "./getFetchStats.js";

let worker: Worker | undefined;
let workerTimeout: ReturnType<typeof setTimeout> | undefined;
function getFetchStatsSync(url: string): FetchStats {
  if (!worker) {
    worker = new Worker(
      new URL("./getFetchStatsSync-worker.js", import.meta.url)
    );
    worker.unref();
  }
  clearTimeout(workerTimeout);
  workerTimeout = setTimeout(() => {
    worker.terminate();
    worker = undefined;
  }, 5000);
  workerTimeout.unref?.();

  const lockBuffer = new SharedArrayBuffer(4);
  const lockInt32 = new Int32Array(lockBuffer);
  const { port1: dataPort, port2: remoteDataPort } = new MessageChannel();

  Atomics.store(lockInt32, 0, 0);
  worker.postMessage({ lockBuffer, dataPort: remoteDataPort, url }, [
    remoteDataPort as any,
  ]);
  Atomics.wait(lockInt32, 0, 0);

  return receiveMessageOnPort(dataPort as any).message;
}

export default getFetchStatsSync;
