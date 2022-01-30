import { get, writable } from "svelte/store";
import { browser } from "$app/env";
import { locale as effectiveLocale } from "svelte-i18n";
import { localStorageStore } from "$lib/utils";

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

export const locale = localStorageStore("locale", "tok");
export const theme = localStorageStore("theme", Theme.Auto);
export const mode = writable(Mode.Four);

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
