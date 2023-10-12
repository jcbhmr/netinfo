export default async function doFetching(url: string) {
  const startTime = performance.now();
  const response = await fetch(url, {
    headers: {
      "Accept-Encoding": "identity",
    },
    cache: "no-cache",
  }).catch(() => null);
  const responseTime = performance.now();
  const buffer = await response?.arrayBuffer();
  const endTime = performance.now();
  const contentLength = parseInt(
    response?.headers.get("Content-Length") as any
  );
  return { startTime, response, responseTime, buffer, endTime, contentLength };
}
