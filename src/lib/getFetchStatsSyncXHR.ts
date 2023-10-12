import { FetchStats } from "./getFetchStats.js";

export default function getFetchStatsSyncXHR(url: string): FetchStats {
  let headTime = 0;
  try {
    const xhr = new XMLHttpRequest();
    const start = performance.now();
    xhr.open("HEAD", url, false);
    xhr.send();
    const end = performance.now();
    headTime = Math.round(end - start);
  } catch {}

  let getTime = 0;
  let getContentLength = 0;
  try {
    const xhr = new XMLHttpRequest();
    const start = performance.now();
    xhr.open("GET", url, false);
    xhr.send();
    const end = performance.now();
    const contentLength = xhr.getResponseHeader("Content-Length");
    if (contentLength) {
      getTime = Math.round(end - start);
      getContentLength = parseInt(contentLength) || 0;
    }
  } catch {}

  return { headTime, getTime, getContentLength };
}
