<script context="module" lang="ts">
  import { waitLocale, _ } from "svelte-i18n";
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
  import Toasts, { showToast } from "$lib/Toasts.svelte";

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

  function handleWin() {
    const message = [
      $_("toast.won-in-one"),
      $_("toast.won-in-two"),
      $_("toast.won-in-three"),
      $_("toast.won-in-four"),
      $_("toast.won-in-five"),
    ];
    showToast(message[$gameState[$mode].length - 1]);
  }
</script>

<svelte:head>
  <title>Wate</title>
</svelte:head>

<main>
  <Header />
  {#key solution}
    <Wordle
      {dictionary}
      {solution}
      on:win={handleWin}
      bind:submittedRows={$gameState[$mode]}
    />
  {/key}
  <Toasts />
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
