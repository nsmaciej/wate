<script context="module" lang="ts">
  import { waitLocale } from "svelte-i18n";
  import { Mode } from "$lib/settings";
  import { localStorageStore } from "$lib/utils";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import { mode } from "$lib/settings";
  import { currentGameDay, selectWord } from "$lib/game";
  import Wordle from "$lib/Wordle.svelte";
  import Header from "$lib/Header.svelte";
  import dictionary from "../../static/dictionary.json";

  const gameState = localStorageStore("game", {
    [Mode.Four]: [],
    [Mode.All]: [],
    [Mode.Kijetesantakalu]: [],
  });

  const gameDay = currentGameDay();
  const lastDayPlayed = localStorageStore("day", gameDay);
  if (gameDay !== $lastDayPlayed) gameState.reset();
  $lastDayPlayed = gameDay;

  $: solution = selectWord($mode, gameDay, dictionary);
  $: console.log(solution);
</script>

<svelte:head>
  <title>Wate</title>
</svelte:head>

<main>
  <Header />
  {#key solution}
    <Wordle {dictionary} {solution} bind:submittedRows={$gameState[$mode]} />
  {/key}
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
