<script lang="ts">
  // Note this component expects to be key-ed by solution.  This is just much
  // easier than expecting the solution to change underneath us all the time and
  // having to stop animations mid-way through.

  import type { State } from "$lib/game";
  import { ROW_COUNT, findLetterStates } from "$lib/game";
  import { createEventDispatcher } from "svelte";
  import { delay } from "$lib/utils";
  import { onMount } from "svelte";
  import { showToast } from "$lib/Toasts.svelte";
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import { _ } from "svelte-i18n";

  // Main state.
  export let dictionary: string[] = [];
  export let solution = "";
  export let submittedRows: string[] = [];
  let currentRow = "";
  let letterStates = new Map<string, State>();
  const dispatch = createEventDispatcher();

  // Game finished?
  $: gameWon = submittedRows[submittedRows.length - 1] === solution;
  $: gameLost = submittedRows.length === ROW_COUNT;
  $: gameFinished = gameWon || gameLost;

  // Gradual row reveal.
  let revealedRows = 0;
  let hiddenRows = submittedRows.length;
  onMount(async () => {
    await delay(100); // Give everything a second to breathe.
    for (let i = 0; i < submittedRows.length; ++i) {
      revealedRows += 1;
      await delay(200);
    }
  });

  function onReveal(row: number): void {
    console.log(row);
    if (row === submittedRows.length - 1) {
      letterStates = findLetterStates(solution, submittedRows);
      if (gameWon) {
        dispatch("win");
      } else if (gameLost) {
        showToast(solution);
      }
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

  function handleEnter(): void {
    if (gameFinished) return;
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

<div class="wordle" style:aspect-ratio="{solution.length} / {ROW_COUNT}">
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
    /* NB aspect-ratio set in code. */
    user-select: none;
    -webkit-user-select: none;
    flex: auto;
    display: grid;
    grid: auto-flow 1fr / auto;
    max-height: var(--app-width);
  }
</style>
