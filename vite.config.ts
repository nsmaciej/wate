import { defineConfig } from 'vitest/config';
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $static: path.resolve("./static"),
    },
  }
});
