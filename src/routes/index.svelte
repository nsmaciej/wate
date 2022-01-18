<script context="module" lang="ts">
  import { waitLocale, _ } from "svelte-i18n";
  import Wordle from "$lib/Wordle.svelte";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<h1>Wate</h1>

<main>
  <p>{$_("description")}</p>
  <Wordle />
</main>

<style>
  main {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
