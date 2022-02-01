import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    target: "#svelte",
    vite: {
      plugins: [precompileIntl("locales")],
    },
  },
};

export default config;
