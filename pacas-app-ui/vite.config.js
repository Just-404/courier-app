import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy your API requests
      "/api": {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
      },
      "/sockjs-node": {
        target: "http://localhost",
        ws: true,
        changeOrigin: true,
      },
      "/login": "http://localhost:5000",
      "/sign-up": "http://localhost:5000",
    },

    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 3000,
    },
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
});
