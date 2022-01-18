<script lang="ts">
  import { correctLetters, absentLetters, presentLetters } from "$lib/stores";
  import Row from "$lib/Row.svelte";
  import Keyboard from "$lib/Keyboard/Keyboard.svelte";
  import dictionary from "../../static/dictionary.json";
  import { findStates, State } from "./game";

  const candidates = dictionary.filter((x) => x.length == 4);
  const secondsSinceStart = Math.floor(Date.now() / 1000) - 1642464000;
  const dayIndex = Math.floor(secondsSinceStart / 86400);
  const solution = candidates[dayIndex % candidates.length];
  let rows = new Array(6).fill("");
  let current_row = 0;

  function handlePress(event: CustomEvent<string>): void {
    if (rows[current_row].length < solution.length) {
      rows[current_row] += event.detail;
    }
  }

  function generateClipboard(): string {
    let result = `Wate ${current_row}/${rows.length}\n`;
    for (let i = 0; i < current_row; ++i) {
      for (const x of findStates(solution, rows[i])) {
        result +=
          x === State.Correct ? "🟩" : x === State.Present ? "🟨" : "⬜";
      }
      result += "\n";
    }
    return result;
  }

  function handleEnter(): void {
    let row = rows[current_row];
    if (row.length < solution.length) {
      alert("Not enough letters");
      return;
    }
    if (!dictionary.includes(row)) {
      alert("Not in the dictionary");
      return;
    }
    current_row += 1;
    if (row == solution) {
      alert(generateClipboard());
      correctLetters.update((x) => {
        for (const c of row) x.add(c);
        return x;
      });
      return;
    }
    for (let i = 0; i < solution.length; ++i) {
      if (row[i] == solution[i]) {
        correctLetters.update((x) => x.add(row[i]));
      } else if (solution.includes(row[i])) {
        presentLetters.update((x) => x.add(row[i]));
      } else {
        absentLetters.update((x) => x.add(row[i]));
      }
    }
  }
  console.log(solution);
</script>

<div>
  {#each rows as row, i}
    <Row
      letters={row.padEnd(solution.length)}
      current={i == current_row}
      {solution}
    />
  {/each}
  <Keyboard
    on:press={handlePress}
    on:enter={handleEnter}
    on:backspace={() => (rows[current_row] = rows[current_row].slice(0, -1))}
  />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
