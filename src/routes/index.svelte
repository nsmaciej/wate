<script context="module" lang="ts">
  import dictionaryTok from "$static/dictionary-tok.json";
  import dictionaryEn from "$static/dictionary-en.json";
  import { wordy } from "$static/config.json";
  const dictionary = wordy ? dictionaryEn : dictionaryTok;

  import { waitLocale } from "svelte-i18n";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import {
    currentGameDay,
    selectEnglishWord,
    selectTokiPonaWord,
  } from "$lib/game";
  import {
    DNF_STATS_KEY,
    finishedStats,
    gameState,
    gatherSettings,
    tokiPonaMode,
  } from "$lib/settings";
  import { _ } from "svelte-i18n";
  import { localStorageStore } from "$lib/utils";
  import { recordEvent } from "$lib/countClick";
  import Header from "$lib/Header.svelte";
  import Modal from "$lib/Modal.svelte";
  import Toasts, { showToast } from "$lib/Toasts.svelte";
  import Wordle from "$lib/Wordle.svelte";
  import Share from "$lib/modals/Share.svelte";

  const acceptableWords = dictionary.solutions.concat(dictionary.words);
  const gameDay = currentGameDay();
  const lastDayPlayed = localStorageStore("day", gameDay);
  if (gameDay !== $lastDayPlayed) gameState.reset();
  $lastDayPlayed = gameDay;

  $: solution = wordy
    ? selectEnglishWord(dictionary.solutions, gameDay)
    : selectTokiPonaWord(dictionary.solutions, $tokiPonaMode, gameDay);
  let shareModalShown = false;
  let showingHeaderModal = false;

  function recordGameFinish(key: number) {
    const old = $finishedStats[$tokiPonaMode][key] ?? 0;
    $finishedStats[$tokiPonaMode][key] = old + 1;
    // Acceptable data collection. General settings plus the board.
    recordEvent(
      key === DNF_STATS_KEY ? "dnf" : "finish",
      ...gatherSettings(),
      $gameState[$tokiPonaMode].join(",")
    );
  }

  async function handleWin() {
    const message = [
      $_("toast.won-in-one"),
      $_("toast.won-in-two"),
      $_("toast.won-in-three"),
      $_("toast.won-in-four"),
      $_("toast.won-in-five"),
    ];
    const rowsUsed = $gameState[$tokiPonaMode].length;
    await showToast(message[rowsUsed - 1], 0.5);
    recordGameFinish(rowsUsed);
    showShareModal();
  }

  async function handleLost() {
    await showToast(solution);
    recordGameFinish(DNF_STATS_KEY);
    showShareModal();
  }

  function showShareModal() {
    if (!showingHeaderModal) {
      shareModalShown = true;
    }
  }
</script>

<svelte:head>
  <title>{$_("name-title")}</title>
</svelte:head>

<main style:--app-width="{wordy ? 500 : 360}px">
  <Header bind:showingModal={showingHeaderModal} />
  {#key solution}
    <Wordle
      dictionary={acceptableWords}
      {solution}
      on:complete={showShareModal}
      on:win={handleWin}
      on:lost={handleLost}
      bind:submittedRows={$gameState[$tokiPonaMode]}
    />
  {/key}
  <Toasts />
  <Modal title={$_("modal.share")} bind:shown={shareModalShown}>
    <Share {gameDay} {solution} />
  </Modal>
</main>

{#if wordy}
  <a href="http://wate.maciej.ie" tabindex="-1" class="lupamonsi">
    <!-- A humble kijetesantakalu. -->
    <svg viewBox="0 0 27 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.5 0H18a11.8 11.8 0 0 0-5.9 2C8 4.5 6.4 9.2 6.3 13.9H5.1c-3.3
        0-5.1 2.3-5.1 5.4C0 22 1.5 24 4.3 24h10l-1.6-5.6-1.5.4 1 3.6H8v-7.8c0-6.2
        2.6-12 9.4-13L18 4l6 4.8-3.5 2.2v13H22V11.8l4.5-3L19.3 3l-.8-3zm-4.3 6a1.5
        1.5 0 0 0-1.6 1.6c0 .8.7 1.5 1.6 1.5a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0
        14.2 6zm4.2 0a1.5 1.5 0 0 0-1.5 1.6c0 .8.6 1.5 1.5 1.5a1.5 1.5 0 0 0
        1.5-1.5A1.5 1.5 0 0 0 18.4 6zM4.9 22.5v-7h1.4v7H5zm-3.3-3.1c0-1.4.4-2.7
        1.7-3.4v6.4c-1.4-.5-1.7-1.7-1.7-3zM16.8 24h1.6v-6.6h-1.6V24z"
      />
    </svg>
  </a>
{:else}
  <a href="http://wordy.maciej.ie" tabindex="-1" class="backdoor">π</a>
{/if}

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

  .backdoor,
  .lupamonsi {
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: default;
    display: flex;
  }

  .backdoor:hover,
  .lupamonsi:hover {
    opacity: 1;
  }

  .backdoor {
    font: 14px serif;
    text-decoration: none;
    opacity: 0.09;
  }

  .lupamonsi {
    opacity: 0.1;
  }

  .lupamonsi svg {
    height: 10px;
  }

  .lupamonsi svg path {
    fill: currentColor;
  }
</style>
