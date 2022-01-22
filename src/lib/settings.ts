import type { Writable } from "svelte/store";
import { writable, get } from "svelte/store";
import { browser } from "$app/env";
import { locale as effectiveLocale } from "svelte-i18n";

// Useful if wating for the sitelen-pona is required.
export { effectiveLocale };

export enum Theme {
  Dark = "dark",
  Light = "light",
  Auto = "auto",
}

export enum Mode {
  Four = "dark",
  All = "light",
  Kijetesantakalu = "kijetesantakalu",
}

export const locale = localStorageStore("locale", "tp");
export const theme = localStorageStore("theme", Theme.Auto);
export const mode = localStorageStore("mode", Mode.Four);

export function localStorageStore<T>(
  name: string,
  defaultValue: T
): Writable<T> {
  if (!browser) {
    return writable(defaultValue);
  }
  const storedValue = localStorage.getItem(name);
  const value = storedValue != null ? JSON.parse(storedValue) : defaultValue;
  const store = writable(value);
  store.subscribe((value) => {
    localStorage.setItem(name, JSON.stringify(value));
  });
  return store;
}

// Deal with theme changes.
function updateTheme(value: Theme) {
  const dark =
    value == Theme.Dark ||
    (value == Theme.Auto &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.body.classList.toggle("dark", dark);
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
    const sitelenPona = value === "tp-sp";
    if (sitelenPona) {
      await document.fonts.load("30px linja-pona");
    }
    document.body.classList.toggle("linja-pona", value === "tp-sp");
    effectiveLocale.set(value);
  } catch {
    alert("Could not load the sitelen pona font 😢");
  }
});

const sitelenPonaLetters = {
  a: "alasa",
  e: "esun",
  i: "ilo",
  j: "jan",
  k: "kasi",
  l: "linja",
  m: "mun",
  n: "nasa",
  o: "olin",
  p: "pipi",
  s: "soweli",
  t: "toki",
  u: "utala",
  w: "waso",
  " ": " ",
};

export function letterLabelForLocale(letter: string, locale: string): string {
  return locale === "tp-sp" ? sitelenPonaLetters[letter] : letter.toUpperCase();
}
