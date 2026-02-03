import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
    // Vercel sets PORT when running `vercel dev`
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: true,
    host: true,
  },
});
