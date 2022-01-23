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
  return isSafari ? sitelen.replace(/[+-]/, " ") : sitelen;
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
