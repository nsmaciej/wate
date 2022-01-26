<script context="module" lang="ts">
  import { waitLocale } from "svelte-i18n";
  import { Mode } from "$lib/settings";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import { _ } from "svelte-i18n";
  import { mode } from "$lib/settings";
  import { localStorageStore } from "$lib/utils";
  import { currentGameDay, generateEmojiArt, selectWord } from "$lib/game";
  import Button from "$lib/Button.svelte";
  import Countdown from "$lib/Countdown.svelte";
  import Header from "$lib/Header.svelte";
  import Modal from "$lib/Modal.svelte";
  import Toasts, { showToast } from "$lib/Toasts.svelte";
  import Wordle from "$lib/Wordle.svelte";
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
  let winModalShown = false;
  let showingHeaderModal = false;

  async function share() {
    const art = generateEmojiArt(gameDay, solution, $gameState[$mode]);
    await navigator.clipboard.writeText(art);
    // This is a one time toast so give it more time.
    showToast($_("toast.clipboard"), 2);
  }
  function handleWin() {
    if (!showingHeaderModal) {
      winModalShown = true;
    }
  }
</script>

<svelte:head>
  <title>Wate</title>
</svelte:head>

<main>
  <Header bind:showingModal={showingHeaderModal} />
  {#key solution}
    <Wordle
      {dictionary}
      {solution}
      on:win={handleWin}
      bind:submittedRows={$gameState[$mode]}
    />
  {/key}
  <Toasts />
  <Modal title={$_("modal.share")} shown={winModalShown}>
    <Countdown />
    <Button on:click={share}>{$_("share.button")}</Button>
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
