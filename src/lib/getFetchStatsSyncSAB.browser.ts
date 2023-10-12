import { FetchStats } from "./getFetchStats.js";

let coWorkerFR: FinalizationRegistry<string> | undefined;
function withCOWorker<T>(block: () => T): T {
  const OriginalWorker = Worker;
  (Worker as any) = function (coURL: string, options?: WorkerOptions) {
    const blobText = `import ${JSON.stringify(coURL)};`;
    const blob = new Blob([blobText], { type: "text/javascript" });
    const blobURL = URL.createObjectURL(blob);
    const worker = new OriginalWorker(blobURL, options);
    coWorkerFR ??= new FinalizationRegistry((blobURL) => {
      URL.revokeObjectURL(blobURL);
    });
    coWorkerFR.register(worker, blobURL);
    return worker;
  };
  Worker.prototype = OriginalWorker.prototype;
  try {
    return block();
  } finally {
    Worker = OriginalWorker;
  }
}

let worker: Worker | undefined;
let workerTimeout: ReturnType<typeof setTimeout> | undefined;
function getFetchStatsSyncSAB(url: string): FetchStats {
  if (!worker) {
    if (new URL(import.meta.url).origin === origin) {
      worker = new Worker(
        new URL("./getFetchStatsSyncSAB-worker.js", import.meta.url),
        { type: "module" }
      );
    } else {
      worker = withCOWorker(
        () =>
          new Worker(
            new URL("./getFetchStatsSyncSAB-worker.js", import.meta.url),
            { type: "module" }
          )
      );
    }
  }
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
