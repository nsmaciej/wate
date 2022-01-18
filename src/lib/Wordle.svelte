<script lang="ts">
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import { findLetterStates, generateEmojiArt, selectWord } from "$lib/game";
  import dictionary from "../../static/dictionary.json";

  const solution = selectWord(dictionary);
  let won = false;
  let rows = new Array(6).fill("");
  let currentRow = 0;
  let letterStates = findLetterStates(solution, rows);
  console.log(solution);

  function handlePress(event: CustomEvent<string>): void {
    if (won) return;
    if (rows[currentRow].length < solution.length) {
      rows[currentRow] += event.detail;
    }
  }

  function handleBackspace(): void {
    if (won) return;
    rows[currentRow] = rows[currentRow].slice(0, -1);
  }

  function handleEnter(): void {
    if (won) return;
    let row = rows[currentRow];
    if (row.length < solution.length) {
      alert("Not enough letters");
    } else if (!dictionary.includes(row)) {
      alert("Not in the dictionary");
    } else {
      currentRow += 1;
      setTimeout(() => {
        letterStates = findLetterStates(solution, rows);
        if (row == solution) {
          won = true;
          alert(generateEmojiArt(solution, currentRow, rows));
        }
      }, 250 * 5);
    }
  }
</script>

<div class="wordle">
  {#each rows as row, i}
    <Row
      letters={row.padEnd(solution.length)}
      current={i == currentRow}
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
    aspect-ratio: 4 / 6;
  }
</style>
