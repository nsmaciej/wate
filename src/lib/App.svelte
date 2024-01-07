<script context="module" lang="ts">
  import dictionaryTok from "$src/dictionaries/dictionary-tok.json";
  import dictionaryEn from "$src/dictionaries/dictionary-en.json";
  import { wordy } from "$src/config.json";

  const dictionary = wordy ? dictionaryEn : dictionaryTok;
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
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
    locale,
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
  import IconButton from "./IconButton.svelte";

  $: searchLocale = browser && $page.url.searchParams.get("locale");
  $: if (searchLocale) $locale = searchLocale;

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
  let showShareButton = false;
  $: $tokiPonaMode, (showShareButton = false);

  function recordGameFinish(key: number) {
    const old = $finishedStats[$tokiPonaMode][key] ?? 0;
    $finishedStats[$tokiPonaMode][key] = old + 1;
    // Acceptable data collection. General settings plus the board.
    recordEvent(
      key === DNF_STATS_KEY ? "dnf" : "finish",
      ...gatherSettings(),
      $gameState[$tokiPonaMode].join(","),
    );
  }

  async function handleWin() {
    const messages = [
      $_("toast.won-in-one"),
      $_("toast.won-in-two"),
      $_("toast.won-in-three"),
      $_("toast.won-in-four"),
      $_("toast.won-in-five"),
    ];
    const rowsUsed = $gameState[$tokiPonaMode].length;
    const toast =
      rowsUsed < messages.length
        ? messages[rowsUsed - 1]
        : $_("toast.won-in-six-or-more");
    await showToast(toast, { delay: 0.5 });
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
    } else {
      // Since closing the modal won't trigger it.
      showShareButton = true;
    }
  }
</script>

<main style:--app-width="{wordy ? 500 : 360}px">
  <Header bind:showingModal={showingHeaderModal}>
    {#if showShareButton}
      <IconButton
        title={$_("modal.share")}
        icon="share"
        sitelen="pana"
        on:click={() => (shareModalShown = true)}
      />
    {/if}
  </Header>
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
  <Modal
    title={$_("modal.share")}
    bind:shown={shareModalShown}
    on:close={() => (showShareButton = true)}
  >
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
  }
</style>
