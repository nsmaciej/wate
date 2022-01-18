<script context="module" lang="ts">
  import { locale, waitLocale, _ } from "svelte-i18n";
  import Wordle from "$lib/Wordle.svelte";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<main>
  <heading>
    <h1>Wate</h1>
    <p>{$_("description")}</p>
  </heading>

  <Wordle />
</main>

<style>
  h1 {
    font-size: 2em;
  }
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    flex: auto;
    gap: 15px;
    padding: 20px 20px 30px;

    position: absolute;
    top: 0px;
    height: 100%;
    width: 100%;
  }
</style>
