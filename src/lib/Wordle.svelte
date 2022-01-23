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
  import { tweened } from "svelte/motion";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import { mode } from "$lib/settings";
  import dictionary from "../../static/dictionary.json";
  import {
    ROW_COUNT,
    findLetterStates,
    generateEmojiArt,
    selectWord,
    State,
  } from "$lib/game";

  // Main state.
  let currentRow = "";
  let letterStates = new Map<string, State>();
  $: [gameDay, solution] = selectWord($mode, dictionary);
  $: submittedRows = $savedGame[$mode];
  $: solution, (currentRow = "");
  // $: solution, updateLetterStates();
  $: console.log(solution);

  // Gradual row reveal.
  const revelaedRows = tweened(0, {
    duration: 4 * 200,
    interpolate: (a, b) => (t) => Math.floor(a + t * (b - a)),
  });
  $: revelaedRows.set(submittedRows.length);

  // Dervied state.
  $: gameFinished =
    submittedRows[submittedRows.length - 1] == solution || // Won
    submittedRows.length == ROW_COUNT; // Lost.

  function updateLetterStates() {
    letterStates = findLetterStates(solution, submittedRows);
  }

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
      reveled={i < $revelaedRows && i < submittedRows.length}
      letters={i == submittedRows.length ? currentRow : submittedRows[i] ?? ""}
      on:revealed={() => {
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
