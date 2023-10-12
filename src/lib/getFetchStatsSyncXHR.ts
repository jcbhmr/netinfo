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
  let getLength = 0;
  try {
    const xhr = new XMLHttpRequest();
    const start = performance.now();
    xhr.open("GET", url, false);
    xhr.send();
    const end = performance.now();
    getTime = Math.round(end - start);
    getLength =
      parseInt(xhr.getResponseHeader("Content-Length")) ||
      xhr.responseText.length;
  } catch {}

  return { headTime, getTime, getLength };
}
