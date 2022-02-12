import { addMessages, init } from "svelte-i18n";
import { get } from "svelte/store";
import { locale } from "$lib/settings";
import { englishWords } from "$static/config.json";

import en from "../locales/en.json";
import enWordy from "../locales/en-wordy.json";
import tok from "../locales/tok.json";
import tokSp from "../locales/tok-x-sp.json";

if (englishWords) {
  addMessages("en", enWordy);
} else {
  addMessages("en", en);
  addMessages("tok", tok);
  addMessages("tok-x-sp", tokSp);
}

// I'm doing my best to avoid flashes of "raw" sitelen pona text. For posterity,
// a typical load looks like this:

// 1. A dedicated snippet in `app.html` starts preloading the font if the locale
//    is already tok-x-sp.
// 2. Below we never set the initial svelte-i18n locale to tok-x-sp, instead
//    choosing tok. This is what the site will show in the time between the
//    JavaScript having loaded and the font finishing loading.
// 3. settings.ts also asks for the font to be preloaded, but this also covers
//    the user switching to sitelen pona for the first time. It will only set the
//    .linja-pona class and update the svelte-i18 locale once the font is ready.

const requestedLocale = get(locale);

init({
  fallbackLocale: "en",
  // This lets the code in settings.ts make sure the sp font is ready.
  initialLocale: requestedLocale === "tok-x-sp" ? "tok" : requestedLocale,
});
