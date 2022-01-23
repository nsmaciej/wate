<script context="module" lang="ts">
  import { waitLocale } from "svelte-i18n";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import { _ } from "svelte-i18n";
  import Wordle from "$lib/Wordle.svelte";
  import Header from "$lib/Header.svelte";
</script>

<svelte:head>
  <title>Wate</title>
</svelte:head>

<main>
  <Header />
  <Wordle />
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    max-width: var(--app-width);
    gap: 15px;
    height: 100%;
    padding: 20px 20px 30px;
    margin: 0 auto;
  }
</style>
