import { addMessages, init } from "svelte-i18n";
import { get } from "svelte/store";
import { locale } from "$lib/settings";

import en from "../locales/en.json";
import tp from "../locales/tp.json";

addMessages("en", en);
addMessages("tp", tp);

init({
  fallbackLocale: "tp",
  initialLocale: get(locale),
});
