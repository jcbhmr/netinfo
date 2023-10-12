interface FetchStats {
  headTime: number;
  getTime: number;
  getLength: number;
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
  } catch (error) {
    console.debug(error);
  }

  let getTime = 0;
  let getLength = 0;
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
    });
    const start = performance.now();
    const buffer = await response.arrayBuffer();
    const end = performance.now();
    getTime = Math.round(end - start);
    getLength =
      parseInt(response.headers.get("Content-Length")) || buffer.byteLength;
  } catch (error) {
    console.debug(error);
  }

  return { headTime, getTime, getLength };
}

export default getFetchStats;
export type { FetchStats };
