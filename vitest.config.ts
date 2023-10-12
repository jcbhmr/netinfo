import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "#lib/doFetchingSync.js": "./src/lib/doFetchingSync.node.ts",
    },
  },
});
