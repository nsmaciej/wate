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
  import { _ } from "svelte-i18n";
  import { mode } from "$lib/settings";
  import { currentGameDay, generateEmojiArt, selectWord } from "$lib/game";
  import Wordle from "$lib/Wordle.svelte";
  import Header from "$lib/Header.svelte";
  import dictionary from "../../static/dictionary.json";
  import Toasts from "$lib/Toasts.svelte";
  import Modal from "$lib/Modal.svelte";
  import Button from "$lib/Button.svelte";

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
  let winModalShown = false;

  function share() {
    const art = generateEmojiArt(gameDay, solution, $gameState[$mode]);
    navigator.clipboard.writeText(art);
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
      on:win={() => (winModalShown = true)}
      bind:submittedRows={$gameState[$mode]}
    />
  {/key}
  <Toasts />
  <Modal title={$_("modal.share")} shown={winModalShown}>
    <Button on:click={share}>{$_("modal.share")}</Button>
  </Modal>
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
