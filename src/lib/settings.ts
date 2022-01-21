import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { browser } from "$app/env";
import { locale as svelteLocale } from "svelte-i18n";

function localStorageStore<T>(name: string, defaultValue: T): Writable<T> {
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

function localeStore(): Writable<string> {
  const defaultLocale = "tp";
  const store = localStorageStore("locale", defaultLocale);
  store.subscribe((value) => {
    svelteLocale.set(value);
    if (browser) {
      document.body.classList.toggle("linja-pona", value == "tp-sp");
    }
  });
  return store;
}

export const locale = localeStore();

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
