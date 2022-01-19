import { addMessages, init } from "svelte-i18n";
import { get } from "svelte/store";
import { locale } from "$lib/settings";

import en from "../locales/en.json";
import tp from "../locales/tp.json";
import tpSp from "../locales/tp-sp.json";

addMessages("en", en);
addMessages("tp", tp);
addMessages("tp-sp", tpSp);

init({
  fallbackLocale: "tp",
  initialLocale: get(locale),
});
