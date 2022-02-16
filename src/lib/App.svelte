<script context="module" lang="ts">
  import dictionaryTok from "$static/dictionary-tok.json";
  import dictionaryEn from "$static/dictionary-en.json";
  import { wordy } from "$static/config.json";

  const dictionary = wordy ? dictionaryEn : dictionaryTok;
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
  import Backdoor from "$lib/Backdoor.svelte";

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
  <Backdoor />
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
