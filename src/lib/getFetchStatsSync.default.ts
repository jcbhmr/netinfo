import { FetchStats } from "./getFetchStats.js";

export default function getFetchStatsSyncXHR(url: string): FetchStats {
  let headTime = 0;
  try {
    const xhr = new XMLHttpRequest();
    xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhr.setRequestHeader("Expires", "Thu, 1 Jan 1970 00:00:00 GMT");
    xhr.setRequestHeader("Pragma", "no-cache");
    const start = performance.now();
    xhr.open("HEAD", url, false);
    xhr.send();
    const end = performance.now();
    headTime = Math.round(end - start);
  } catch (error) {
    console.debug(error);
  }

  let getTime = 0;
  let getLength = 0;
  try {
    const xhr = new XMLHttpRequest();
    xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhr.setRequestHeader("Expires", "Thu, 1 Jan 1970 00:00:00 GMT");
    xhr.setRequestHeader("Pragma", "no-cache");
    const start = performance.now();
    xhr.open("GET", url, false);
    xhr.send();
    const end = performance.now();
    getTime = Math.round(end - start);
    getLength =
      parseInt(xhr.getResponseHeader("Content-Length")) ||
      xhr.responseText.length;
  } catch (error) {
    console.debug(error);
  }

  return { headTime, getTime, getLength };
}
