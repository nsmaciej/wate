<script lang="ts">
  // Note this component expects to be key-ed by solution.  This is just much
  // easier than expecting the solution to change underneath us all the time and
  // having to stop animations mid-way through.

  import type { State } from "$lib/game";
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import { onMount } from "svelte";
  import { delay } from "$lib/utils";
  import { ROW_COUNT, findLetterStates, generateEmojiArt } from "$lib/game";

  // Main state.
  export let dictionary: string[] = [];
  export let solution = "";
  export let submittedRows: string[] = [];
  let currentRow = "";
  let letterStates = new Map<string, State>();

  // Game finished?
  $: gameFinished =
    submittedRows[submittedRows.length - 1] === solution || // Won
    submittedRows.length === ROW_COUNT; // Lost.

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
    if (row === submittedRows.length - 1) {
      letterStates = findLetterStates(solution, submittedRows);
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
      alert("Not enough letters");
    } else if (!dictionary.includes(currentRow)) {
      alert("Not in the dictionary");
    } else {
      submittedRows = [...submittedRows, currentRow];
      revealedRows += 1;
      // Wait for the animation to finish.
      if (currentRow === solution) {
        setTimeout(() => {
          alert(generateEmojiArt(0, solution, submittedRows));
        }, 250 * solution.length);
      }
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
