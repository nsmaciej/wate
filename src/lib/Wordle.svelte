<script lang="ts">
  // Note this component expects to be key-ed by solution.  This is just much
  // easier than expecting the solution to change underneath us all the time and
  // having to stop animations mid-way through.

  // It dispatches once on of three events:
  // * lost - The game was just lost.
  // * win - The game was just won.
  // * complete - The game was already finished when the game loaded.

  import { _ } from "svelte-i18n";
  import { createEventDispatcher, onMount } from "svelte";
  import {
    ROW_COUNT,
    State,
    findLetterStates,
    gameFinished,
    gameWon,
    gameLost,
    checkRules,
    RuleJudgement,
  } from "$lib/game";
  import { delay } from "$lib/utils";
  import { showToast } from "$lib/Toasts.svelte";
  import { guessMode } from "$lib/settings";
  import { recordEvent } from "$lib/countClick";
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/keyboard/Keyboard.svelte";

  const dispatch = createEventDispatcher();

  // Main state.
  export let dictionary: string[] = [];
  export let solution = "";
  export let submittedRows: string[] = [];
  let currentRow = "";
  let letterStates = new Map<string, State>();
  let forceEnterHighlight = false;
  $: currentRow, (forceEnterHighlight = false);
  $: ruleJudgement = checkRules(solution, currentRow, $guessMode, dictionary);

  // Grid size. This might be able to be done only with aspect-ratio and
  // max-width/height, but it seems a bit messy and Safari definitely doesn't
  // like it. Note this can't be done in css calc() because we can't divide
  // anything by a non-unit less number (which 70px is).
  const baseTile = 70;
  let tileSize = baseTile;
  function handleResize() {
    const tilePlusGap = baseTile + 8;
    const { clientWidth, clientHeight } = document.body;
    const h = (clientHeight - 300) / (tilePlusGap * ROW_COUNT);
    const w = (clientWidth - 40) / (tilePlusGap * solution.length);
    tileSize = baseTile * Math.max(0.1, Math.min(1, w, h));
  }
  onMount(handleResize);

  // Game finished?
  let gameFinishedOnLoad = false;
  $: gameComplete = gameFinished(solution, submittedRows);

  // Gradual row reveal.
  let revealedRows = 0;
  let hiddenRows = submittedRows.length;
  onMount(async () => {
    if (gameComplete) {
      gameFinishedOnLoad = true;
    }
    await delay(50); // Give everything a second to breathe.
    for (let i = 0; i < submittedRows.length; ++i) {
      revealedRows += 1;
      await delay(200); //200ms
    }
  });

  async function onReveal(row: number): Promise<void> {
    if (row !== submittedRows.length - 1) return;
    // This is so we don't update the keyboard before the animation plays.
    letterStates = findLetterStates(solution, submittedRows);

    if (gameFinishedOnLoad) {
      dispatch("complete");
    } else if (gameWon(solution, submittedRows)) {
      dispatch("win");
    } else if (gameLost(solution, submittedRows)) {
      dispatch("lost");
    }
  }

  // Keyboard handling.
  function handlePress(event: CustomEvent<string>): void {
    if (gameComplete) return;
    if (currentRow.length < solution.length) {
      currentRow += event.detail;
    } else {
      forceEnterHighlight = true;
    }
  }

  function handleBackspace(): void {
    if (!gameComplete) {
      currentRow = currentRow.slice(0, -1);
    }
  }

  async function handleEnter(): Promise<void> {
    if (gameComplete) return;

    // Easter eggs. Suppress rule check toasts but otherwise don't do anything
    // else in case we are making a valid guess (easy mode etc).
    let showRuleToasts = true;
    if (currentRow === "awkt") {
      currentRow = "";
      localStorage.clear();
      showToast("Local Storage Cleared", { latin: true });
      return;
    }
    if (currentRow === "pono") {
      showRuleToasts = false;
      recordEvent("pono");
      await showToast("Give me a break", { latin: true });
      showToast("Show me the bibliography", { latin: true });
    }
    if (currentRow === "mu") {
      showRuleToasts = false;
      recordEvent("mu");
      await showToast("mu");
    }

    // Rule checks.
    switch (ruleJudgement) {
      case RuleJudgement.NotEnoughLetters:
        if (showRuleToasts) showToast($_("toast.missing-letters"));
        break;
      case RuleJudgement.NotInDictionary:
        if (showRuleToasts) showToast($_("toast.unrecognised-word"));
        break;
      case RuleJudgement.Valid:
        submittedRows = [...submittedRows, currentRow];
        revealedRows += 1;
        currentRow = "";
        break;
    }
  }
</script>

<svelte:window on:resize={handleResize} />

<div
  class="wordle"
  style:--tile-size="{tileSize}px"
  style:grid="auto-flow {tileSize}px / repeat({solution.length}, {tileSize}px)"
>
  {#each { length: ROW_COUNT } as _, i}
    {@const isActiveRow = submittedRows.length === i}
    <Row
      {solution}
      revealed={i < revealedRows}
      hideBeforeReveal={i < hiddenRows}
      letters={isActiveRow ? currentRow : submittedRows[i] ?? ""}
      on:reveal={() => onReveal(i)}
    />
  {/each}
</div>

<Keyboard
  on:press={handlePress}
  on:enter={handleEnter}
  on:backspace={handleBackspace}
  highlightEnter={ruleJudgement === RuleJudgement.Valid || forceEnterHighlight}
  {letterStates}
/>

<style>
  div.wordle {
    display: grid;
    gap: 4px;
  }
</style>
