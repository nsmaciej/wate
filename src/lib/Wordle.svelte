<script lang="ts">
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import { findLetterStates, generateEmojiArt, selectWord } from "$lib/game";
  import dictionary from "../../static/dictionary.json";

  const solution = selectWord(dictionary);
  let won = false;
  let rowLetters = new Array(5).fill("");
  let rowInstances: Row[] = [];
  let currentRow = 0;
  let letterStates = findLetterStates(solution, rowLetters);
  console.log(solution);

  function handlePress(event: CustomEvent<string>): void {
    if (won) return;
    if (rowLetters[currentRow].length < solution.length) {
      rowLetters[currentRow] += event.detail;
    }
  }

  function handleBackspace(): void {
    if (won) return;
    rowLetters[currentRow] = rowLetters[currentRow].slice(0, -1);
  }

  function handleEnter(): void {
    if (won) return;
    let row = rowLetters[currentRow];
    if (row.length < solution.length) {
      alert("Not enough letters");
    } else if (!dictionary.includes(row)) {
      alert("Not in the dictionary");
    } else {
      if (row == solution) {
        won = true; // Set it early to prevent further interaction.
      }
      rowInstances[currentRow].revealStates();
      currentRow += 1;
      // Wait for the animation to finish.
      setTimeout(() => {
        letterStates = findLetterStates(solution, rowLetters);
        if (won) {
          alert(generateEmojiArt(solution, currentRow, rowLetters));
        }
      }, 250 * 5);
    }
  }
</script>

<div
  class="wordle"
  style:aspect-ratio="{solution.length} / {rowLetters.length}"
>
  {#each rowLetters as row, i}
    <Row
      letters={row.padEnd(solution.length)}
      bind:this={rowInstances[i]}
      {solution}
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
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 350px;
  }
</style>
