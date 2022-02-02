import type { Writable } from "svelte/store";
import { browser } from "$app/env";
import { writable } from "svelte/store";

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface LocalStorageStore<T> extends Writable<T> {
  reset(): void;
}

export function fixSitelenForSafari(sitelen: string): string {
  // Safari's layout engine doesn't deal well with big jumps due to ligatures,
  // uncombine sitelen pona characters for it.
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return isSafari ? sitelen.replace(/[+-]/g, " ") : sitelen;
}

export function localStorageStore<T>(
  name: string,
  defaultValue: T
): LocalStorageStore<T> {
  let store: Writable<T>;
  const defaultJson = JSON.stringify(defaultValue);

  if (browser) {
    const storedValue = localStorage.getItem(name);
    const value = storedValue != null ? JSON.parse(storedValue) : defaultValue;
    store = writable(value);
    store.subscribe((value) => {
      localStorage.setItem(name, JSON.stringify(value));
    });
  } else {
    store = writable(defaultValue);
  }

  return Object.assign(store, {
    reset() {
      store.set(JSON.parse(defaultJson));
    },
  });
}

export function numberToSitelen(n: number): string {
  if (!Number.isFinite(n) || !Number.isInteger(n)) return "nanpa nasa";
  if (n === 0) return "ala";
  if (Math.abs(n) > 500) return "mute";

  const names: [number, string][] = [
    [100, "ale"],
    [20, "mute"],
    [5, "luka"],
    [2, "tu"],
    [1, "wan"],
  ];

  const result: string[] = [];

  if (n < 0) {
    result.push("weka");
    n = -n;
  }
  if (n >= 5) {
    // Make sure we know luka/mute/ale is a number here.
    result.push("nanpa");
  }

  for (const [amount, name] of names) {
    const k = Math.floor(n / amount);
    for (let i = 0; i < k; ++i) result.push(name);
    n -= k * amount;
  }
  return result.join(" ");
}

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
  return locale === "tok-x-sp"
    ? sitelenPonaLetters[letter]
    : letter.toUpperCase();
}

export function numberForLocale(n: number, locale: string): string {
  return locale === "tok-x-sp" ? numberToSitelen(n) : n.toString();
}
