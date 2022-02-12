import type { SitelenNumberOptions } from "$lib/utils";
import { derived, get, readable, writable } from "svelte/store";
import { locale as effectiveLocale } from "svelte-i18n";
import { englishWords } from "$static/config.json";
import { browser } from "$app/env";
import { GuessMode, TokiPonaMode } from "$lib/game";
import {
  SITELEN_PONA_LETTERS,
  localStorageStore,
  matchMediaStore,
  numberToSitelen,
} from "$lib/utils";

// Useful if wating for the sitelen-pona is required.
export { effectiveLocale };

export const enum Theme {
  Dark = "dark",
  Light = "light",
  Auto = "auto",
}

// Main stores.
export const locale = englishWords
  ? readable("en")
  : localStorageStore("locale", "tok");
export const theme = localStorageStore("theme", Theme.Auto);
export const tokiPonaMode = writable(TokiPonaMode.Four);
export const guessMode = localStorageStore("mode", GuessMode.Normal);
export const colorBlind = localStorageStore("colorblind", false);
export const gameState = localStorageStore("game", {
  [TokiPonaMode.Four]: [],
  [TokiPonaMode.All]: [],
  [TokiPonaMode.Kijetesantakalu]: [],
});

// Stats.
type FinishedStats = { [game in TokiPonaMode]: { [rows: number]: number } };
export const DNF_STATS_KEY = -1;
export const finishedStats = localStorageStore<FinishedStats>("stats", {
  [TokiPonaMode.Four]: {},
  [TokiPonaMode.All]: {},
  [TokiPonaMode.Kijetesantakalu]: {},
});

// Derived stores.
export const sitelenLocale = derived(effectiveLocale, (x) => x === "tok-x-sp");
export const formatNumber = derived(
  sitelenLocale,
  (isSp) =>
    (n: number, options: Partial<SitelenNumberOptions> = {}) =>
      isSp ? numberToSitelen(n, options) : n.toString()
);
export const formatLetter = derived(
  sitelenLocale,
  (isSp) => (letter: string) =>
    isSp ? SITELEN_PONA_LETTERS[letter] : letter.toUpperCase()
);

// Media stores.
export const reduceMotion = matchMediaStore("(prefers-reduced-motion: reduce)");

// Deal with theme changes.
function updateTheme(value: Theme) {
  const dark =
    value === Theme.Dark ||
    (value === Theme.Auto &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.body.classList.toggle("dark", dark);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", dark ? "#121212" : "#ffffff");
}

if (browser) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => updateTheme(get(theme)));
  theme.subscribe(updateTheme);
}

// Actually set the svelte-i18n locale and deal with sitelen pona.
locale.subscribe(async (value) => {
  if (!browser) {
    effectiveLocale.set(value);
    return;
  }
  try {
    const sitelenPona = value === "tok-x-sp";
    if (sitelenPona) {
      await document.fonts.load("30px linja-pona");
    }
    document.body.classList.toggle("linja-pona", value === "tok-x-sp");
    effectiveLocale.set(value);
  } catch {
    alert("Could not load the sitelen pona font 😢");
  }
});

// Set the color-blind class.
colorBlind.subscribe((value) => {
  if (browser) {
    document.body.classList.toggle("color-blind", value);
  }
});
