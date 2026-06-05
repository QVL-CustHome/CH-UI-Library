import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/Widget",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@custhome/ui": { singleton: true },
      },
    }),
  ],
  build: {
    target: "chrome89",
  },
});
