import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    vite: {
      resolve: {
        alias: {
          $static: path.resolve("./static"),
        },
      },
    },
  },
};

export default config;
