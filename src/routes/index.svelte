<script context="module" lang="ts">
  import App from "$lib/App.svelte";
  import { waitLocale } from "svelte-i18n";
  import { wordy } from "$static/config.json";
  import "./i18n";
  import "../app.css";

  const assetSuffix = wordy ? "en" : "tok";
  const title = wordy ? "Wordy" : "Wate";
  const domain = wordy ? "https://wordy.maciej.ie" : "https://wate.maciej.ie";
  const description = wordy
    ? "Open Source Wordle"
    : "Toki Pona Wordle. musi Wordle pi toki pona.";
  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<svelte:head>
  <title>{title}</title>

  <link rel="apple-touch-icon" href="/apple-touch-icon-{assetSuffix}.png" />
  <link rel="icon" sizes="192x192" href="/icon-{assetSuffix}.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="{domain}/share-{assetSuffix}.png" />
  <meta property="og:url" content={domain} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta name="description" content={description} />
</svelte:head>

<App />
