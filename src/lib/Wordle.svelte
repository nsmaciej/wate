<script lang="ts">
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import { findLetterStates, generateEmojiArt, selectWord } from "$lib/game";
  import dictionary from "../../static/dictionary.json";

  const solution = selectWord(dictionary);
  let rows = new Array(6).fill("");
  let currentRow = 0;
  let letterStates = findLetterStates(solution, rows);
  console.log(solution);

  function handlePress(event: CustomEvent<string>): void {
    if (rows[currentRow].length < solution.length) {
      rows[currentRow] += event.detail;
    }
  }

  function handleEnter(): void {
    let row = rows[currentRow];
    if (row.length < solution.length) {
      alert("Not enough letters");
    } else if (!dictionary.includes(row)) {
      alert("Not in the dictionary");
    } else {
      currentRow += 1;
      letterStates = findLetterStates(solution, rows);
      if (row == solution) {
        alert(generateEmojiArt(solution, currentRow, rows));
      }
    }
  }
</script>

<div>
  {#each rows as row, i}
    <Row
      letters={row.padEnd(solution.length)}
      current={i == currentRow}
      {solution}
    />
  {/each}
  <Keyboard
    on:press={handlePress}
    on:enter={handleEnter}
    on:backspace={() => (rows[currentRow] = rows[currentRow].slice(0, -1))}
    {letterStates}
  />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
