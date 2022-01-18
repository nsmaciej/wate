<script context="module" lang="ts">
  import { waitLocale, _ } from "svelte-i18n";
  import Wordle from "$lib/Wordle.svelte";
  import "./i18n";
  import "../app.css";

  export async function preload() {
    return waitLocale();
  }
</script>

<h1>Wate</h1>

<main>
  <p>{$_("description")}</p>
  <Wordle />
</main>
