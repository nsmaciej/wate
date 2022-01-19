<script context="module" lang="ts">
  import { waitLocale, _ } from "svelte-i18n";
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
    <i>{$_("description")}</i>
  </heading>

  <Wordle />
</main>

<style>
  h1 {
    font-size: 25px;
  }
  heading {
    width: 100%;
  }
  i {
    color: #696969;
  }
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    max-width: 350px;
    gap: 15px;
    padding: 20px 20px 30px;
    margin: 0 auto;
    height: 100vh;
  }
</style>
