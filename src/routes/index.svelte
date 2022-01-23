<script context="module" lang="ts">
  import { waitLocale } from "svelte-i18n";
  import { Mode, localStorageStore } from "$lib/settings";
  import "./i18n";
  import "../app.css";

  function defaultSavedGame(): { [mode in Mode]: string[] } {
    return {
      [Mode.Four]: [],
      [Mode.All]: [],
      [Mode.Kijetesantakalu]: [],
    };
  }

  const lastDayPlayed = localStorageStore("day", -1);
  const savedGames = localStorageStore("game", defaultSavedGame());

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import { _ } from "svelte-i18n";
  import { mode } from "$lib/settings";
  import { currentGameDay, selectWord } from "$lib/game";
  import Wordle from "$lib/Wordle.svelte";
  import Header from "$lib/Header.svelte";
  import dictionary from "../../static/dictionary.json";

  // Main game logic.
  const gameDay = currentGameDay();
  if (gameDay !== $lastDayPlayed) {
    $savedGames = defaultSavedGame();
  }
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
    <Wordle {dictionary} {solution} bind:submittedRows={$savedGames[$mode]} />
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
