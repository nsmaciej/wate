import { addMessages, init } from "svelte-i18n";
import { get } from "svelte/store";
import { locale } from "$lib/settings";

import en from "../locales/en.json";
import tp from "../locales/tp.json";
import tpSp from "../locales/tp-sp.json";

addMessages("en", en);
addMessages("tp", tp);
addMessages("tp-sp", tpSp);

// I'm doing my best to avoid flashes of "raw" sitelen pona text. For posterity,
// a typical load looks like this:

// 1. A dedicated snippet in `app.html` starts preloading the font if the locale
//    is already tp-sp.
// 2. Below we never set the initial svelte-i18n locale to tp-sp, instead
//    choosing tp. This is what the site will show in the time between the
//    JavaScript having loaded and the font finishing loading.
// 3. settings.ts also asks for the font to be preloaded, but this also covers
//    the user switching to sitelen pona for the first time. It will only set the
//    .linja-pona class and update the svelte-i18 locale once the font is ready.

const requestedLocale = get(locale);

init({
  fallbackLocale: "en",
  // This lets the code in settings.ts make sure the sp font is ready.
  initialLocale: requestedLocale === "tp-sp" ? "tp" : requestedLocale,
});
