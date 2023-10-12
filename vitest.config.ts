import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "#lib/getFetchStatsSync.js": "./src/lib/getFetchStatsSync.node.ts",
    },
  },
});
