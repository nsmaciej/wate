<script context="module" lang="ts">
  import { waitLocale } from "svelte-intl-precompile";
  import { Mode } from "$lib/settings";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import { t } from "svelte-intl-precompile";
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
  let winModalShown = false;
  let showingHeaderModal = false;

  async function share() {
    const art = generateEmojiArt(gameDay, solution, $gameState[$mode]);
    const share = { text: art };
    try {
      if (
        // Sharing in desktop browsers sucks.
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) &&
        navigator.canShare?.(share)
      ) {
        await navigator.share(share);
      } else {
        await navigator.clipboard.writeText(art);
        // This is a one time toast so give it more time.
        showToast($t("toast.clipboard"), 2);
      }
    } catch (e) {
      console.log("Share Exception", e);
      // I have no idea what could go wrong here but I don't want to find out.
    }
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
  <Modal title={$t("modal.share")} bind:shown={winModalShown}>
    <Countdown />
    <div class="share">
      <Button on:click={share}>{$t("share.button")}</Button>
    </div>
  </Modal>
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    max-width: var(--app-width);
    height: 100%;
    margin: 0 auto;
    padding: 10px;
  }
  .share {
    display: flex;
    justify-content: center;
  }
</style>
