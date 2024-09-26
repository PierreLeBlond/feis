import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "https://pierreleblond.github.io/feis/build",
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
