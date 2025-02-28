import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  base: "https://pierreleblond.github.io/feis/build",
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $assets: path.resolve("./src/assets"),
    },
  },
});
