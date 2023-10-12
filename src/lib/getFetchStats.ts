interface FetchStats {
  headTime: number;
  getTime: number;
  getContentLength: number;
}

async function getFetchStats(url: string): Promise<FetchStats> {
  let headTime = 0;
  try {
    const start = performance.now();
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-cache",
    });
    const end = performance.now();
    headTime = Math.round(end - start);
  } catch {}

  let getTime = 0;
  let getContentLength = 0;
  try {
    const controller = new AbortController();
    const start = performance.now();
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      signal: controller.signal,
    });
    const contentLength = response.headers.get("Content-Length");
    if (contentLength) {
      const buffer = await response.arrayBuffer();
      const end = performance.now();
      getTime = Math.round(end - start);
      getContentLength = parseInt(contentLength) || 0;
    } else {
      controller.abort();
    }
  } catch {}

  return { headTime, getTime, getContentLength };
}

export default getFetchStats;
export type { FetchStats };
