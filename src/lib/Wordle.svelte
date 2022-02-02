<script lang="ts">
  // Note this component expects to be key-ed by solution.  This is just much
  // easier than expecting the solution to change underneath us all the time and
  // having to stop animations mid-way through.

  // It dispatches once on of three events:
  // * lost - The game was just lost.
  // * win - The game was just won.
  // * complete - The game was already finished when the game loaded.

  import type { State } from "$lib/game";
  import { ROW_COUNT, findLetterStates } from "$lib/game";
  import { createEventDispatcher } from "svelte";
  import { delay } from "$lib/utils";
  import { onMount } from "svelte";
  import { showToast } from "$lib/Toasts.svelte";
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/keyboard/Keyboard.svelte";
  import { _ } from "svelte-i18n";

  // Main state.
  export let dictionary: string[] = [];
  export let solution = "";
  export let submittedRows: string[] = [];
  let currentRow = "";
  let letterStates = new Map<string, State>();
  const dispatch = createEventDispatcher();

  // Grid size. This might be able to be done only with aspect-ratio and
  // max-width/height, but it seems a bit messy and Safari definitely doesn't
  // like it. Note this can't be done in css calc() because we can't divide
  // anything by a non-unit less number (which 70px is).
  const tileSize = 70;
  let scale = 1;
  function handleResize() {
    scale = Math.max(
      0.7,
      Math.min(
        1,
        (document.body.clientHeight - 300) / (tileSize * ROW_COUNT),
        (document.body.clientWidth - 20) / (tileSize * solution.length)
      )
    );
  }
  // Used by Tile styling to shrink font size.
  let kijetesantakalu = solution.length === 15;
  onMount(handleResize);

  // Game finished?
  let gameFinishedOnLoad = false;
  $: gameWon = submittedRows[submittedRows.length - 1] === solution;
  $: gameLost = submittedRows.length === ROW_COUNT;
  $: gameFinished = gameWon || gameLost;

  // Gradual row reveal.
  let revealedRows = 0;
  let hiddenRows = submittedRows.length;
  onMount(async () => {
    if (gameFinished) {
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
    } else if (gameWon) {
      dispatch("win");
    } else if (gameLost) {
      dispatch("lost");
    }
  }

  // Keyboard handling.
  function handlePress(event: CustomEvent<string>): void {
    if (!gameFinished && currentRow.length < solution.length) {
      currentRow += event.detail;
    }
  }

  function handleBackspace(): void {
    if (!gameFinished) {
      currentRow = currentRow.slice(0, -1);
    }
  }

  async function handleEnter(): Promise<void> {
    if (gameFinished) return;

    if (currentRow === "awkt") {
      currentRow = "";
      localStorage.clear();
      showToast("Local Storage Cleared");
      return;
    }
    if (currentRow === "pono") {
      currentRow = "";
      await showToast("Give me a break");
      showToast("Show me the bibliography");
      return;
    }

    if (currentRow === "mu") await showToast("mu");
    if (currentRow.length < solution.length) {
      showToast($_("toast.missing-letters"));
    } else if (!dictionary.includes(currentRow)) {
      showToast($_("toast.unrecognised-word"));
    } else {
      submittedRows = [...submittedRows, currentRow];
      revealedRows += 1;
      currentRow = "";
    }
  }
</script>

<svelte:window on:resize={handleResize} />

<div
  class="wordle"
  class:kijetesantakalu
  style:grid="auto-flow 1fr / repeat({solution.length}, 1fr)"
  style:width="{tileSize * solution.length * scale}px"
  style:height="{tileSize * ROW_COUNT * scale}px"
>
  {#each { length: ROW_COUNT } as _, i}
    <Row
      {solution}
      revealed={i < revealedRows}
      hideBeforeReveal={i < hiddenRows}
      letters={i === submittedRows.length ? currentRow : submittedRows[i] ?? ""}
      on:reveal={() => onReveal(i)}
    />
  {/each}
</div>

<Keyboard
  on:press={handlePress}
  on:enter={handleEnter}
  on:backspace={handleBackspace}
  {letterStates}
/>

<style>
  div.wordle {
    user-select: none;
    -webkit-user-select: none;
    display: grid;
  }
</style>
