<script lang="ts" context="module">
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
</script>

<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { findRowStates, State } from "$lib/game";

  export let letters = "";
  export let solution = "";
  export let current = false;

  $: states = findRowStates(solution, letters);
  let actualStates = new Array(4).fill(State.Unknown);
  let flipped = new Array(4).fill(false);

  async function flipTile(i: number): Promise<void> {
    const duration = 200;
    await delay(duration * i); // Stagger.
    flipped[i] = true;
    await delay(duration);
    actualStates[i] = states[i];
    flipped[i] = false;
  }

  let lastCurrent = current;
  $: if (current != lastCurrent) {
    if (lastCurrent) {
      for (let i = 0; i < 4; ++i) flipTile(i);
    }
    lastCurrent = current;
  }
</script>

<div>
  {#each letters as letter, i}
    <Tile {letter} state={actualStates[i]} flipped={flipped[i]} />
  {/each}
</div>

<style>
  div {
    flex: 1;
    display: grid;
    /* This needs to be a grid, flexbox dosen't like the Tile border disappearing. */
    grid-template: 1fr / repeat(4, 1fr);
    width: 100%;
  }
</style>
