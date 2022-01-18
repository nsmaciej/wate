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

function localeStore(defaultLocale: string): Writable<string> {
  const store = localStorageStore("locale", defaultLocale);
  store.subscribe((value) => svelteLocale.set(value));
  return store;
}

export const locale = localeStore("tp");
