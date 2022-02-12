import type { SitelenNumberOptions } from "$lib/utils";
import { derived, get, writable } from "svelte/store";
import { browser } from "$app/env";
import { locale as effectiveLocale } from "svelte-i18n";
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

export const enum Mode {
  Four = "four",
  All = "all",
  Kijetesantakalu = "kijetesantakalu",
}

// Main stores.
export const locale = localStorageStore("locale", "tok");
export const theme = localStorageStore("theme", Theme.Auto);
export const mode = writable(Mode.Four);
export const colorBlind = localStorageStore("colorblind", false);
export const gameState = localStorageStore("game", {
  [Mode.Four]: [],
  [Mode.All]: [],
  [Mode.Kijetesantakalu]: [],
});

// Stats.
type FinishedStats = { [game in Mode]: { [rows: number]: number } };
export const DNF_STATS_KEY = -1;
export const finishedStats = localStorageStore<FinishedStats>("stats", {
  [Mode.Four]: {},
  [Mode.All]: {},
  [Mode.Kijetesantakalu]: {},
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
  document.body.classList.toggle("color-blind", value);
});
