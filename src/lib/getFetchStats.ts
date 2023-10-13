interface FetchStats {
  headTime: number;
  getTime: number;
  getLength: number;
}

async function getFetchStats(
  url: string,
  options: { signal?: AbortSignal } = {}
): Promise<FetchStats> {
  const { signal } = options;

  let headTime = 0;
  try {
    const start = performance.now();
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      signal,
    });
    const end = performance.now();
    headTime = Math.round(end - start);
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    } else {
      console.debug(error);
    }
  }

  let getTime = 0;
  let getLength = 0;
  try {
    const start = performance.now();
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal,
    });
    const buffer = await response.arrayBuffer();
    const end = performance.now();
    getTime = Math.max(Math.round(end - start) - headTime * 0.6, 1);
    getLength =
      parseInt(response.headers.get("Content-Length")) || buffer.byteLength;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    } else {
      console.debug(error);
    }
  }

  return { headTime, getTime, getLength };
}

export default getFetchStats;
export type { FetchStats };
