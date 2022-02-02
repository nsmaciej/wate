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
  import { localStorageStore } from "$lib/utils";
  import { currentGameDay, selectWord } from "$lib/game";
  import Header from "$lib/Header.svelte";
  import Modal from "$lib/Modal.svelte";
  import Toasts, { showToast } from "$lib/Toasts.svelte";
  import Wordle from "$lib/Wordle.svelte";
  import dictionary from "../../static/dictionary.json";
  import { DNF_STATS_KEY, finishedStats, gameState, mode } from "$lib/settings";
  import Share from "$lib/modals/Share.svelte";

  const gameDay = currentGameDay();
  const lastDayPlayed = localStorageStore("day", gameDay);
  if (gameDay !== $lastDayPlayed) gameState.reset();
  $lastDayPlayed = gameDay;

  $: solution = selectWord($mode, gameDay, dictionary);
  let shareModalShown = false;
  let showingHeaderModal = false;

  function bumpFinishedStats(key: number) {
    const old = $finishedStats[$mode][key] ?? 0;
    $finishedStats[$mode][key] = old + 1;
  }

  async function handleWin() {
    const message = [
      $_("toast.won-in-one"),
      $_("toast.won-in-two"),
      $_("toast.won-in-three"),
      $_("toast.won-in-four"),
      $_("toast.won-in-five"),
    ];
    const rowsUsed = $gameState[$mode].length;
    await showToast(message[rowsUsed - 1], 0.5);
    bumpFinishedStats(rowsUsed);
    showShareModal();
  }

  async function handleLost() {
    await showToast(solution);
    bumpFinishedStats(DNF_STATS_KEY);
    showShareModal();
  }

  function showShareModal() {
    if (!showingHeaderModal) {
      shareModalShown = true;
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
      on:complete={showShareModal}
      on:win={handleWin}
      on:lost={handleLost}
      bind:submittedRows={$gameState[$mode]}
    />
  {/key}
  <Toasts />
  <Modal title={$_("modal.share")} bind:shown={shareModalShown}>
    <Share {gameDay} {solution} />
  </Modal>
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    max-width: var(--app-width);
    min-height: 100%;
    margin: 0 auto;
    padding: 10px;
    gap: 8px;
  }
</style>
