<script lang="ts" context="module">
  import { Mode, localStorageStore } from "$lib/settings";
  const savedGame = localStorageStore("game", {
    [Mode.Four]: [],
    [Mode.All]: [],
    [Mode.Kijetesantakalu]: [],
  });
</script>

<script lang="ts">
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import dictionary from "../../static/dictionary.json";
  import { delay } from "$lib/utils";
  import { mode } from "$lib/settings";
  import {
    ROW_COUNT,
    State,
    findLetterStates,
    generateEmojiArt,
    selectWord,
  } from "$lib/game";

  // Main state.
  let currentRow = "";
  $: [gameDay, solution] = selectWord($mode, dictionary);
  $: submittedRows = $savedGame[$mode];
  $: solution, (currentRow = "");
  $: console.log(solution);

  // Game finished?
  $: gameFinished =
    submittedRows[submittedRows.length - 1] == solution || // Won
    submittedRows.length == ROW_COUNT; // Lost.

  // Gradual row reveal.
  let revealedRows = 0;
  let hiddenRows = 0;
  $: solution, animateRevealRows();
  async function animateRevealRows() {
    revealedRows = 0;
    hiddenRows = submittedRows.length;
    await delay(100); // Give everything a second to breathe.
    for (let i = 0; i < submittedRows.length; ++i) {
      revealedRows += 1;
      await delay(200);
    }
  }

  // Letter state - only actually set after the animation.
  let letterStates = new Map<string, State>();
  $: solution, (letterStates = new Map<string, State>());
  function updateLetterStates() {
    letterStates = findLetterStates(solution, submittedRows);
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
      $savedGame[$mode] = [...submittedRows, currentRow];
      revealedRows += 1;
      // Wait for the animation to finish.
      if (currentRow === solution) {
        setTimeout(() => {
          alert(generateEmojiArt(gameDay, solution, submittedRows));
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
      letters={i == submittedRows.length ? currentRow : submittedRows[i] ?? ""}
      on:reveal={() => {
        // Update the keyboard after the final reveal.
        if (i == submittedRows.length - 1) updateLetterStates();
      }}
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
