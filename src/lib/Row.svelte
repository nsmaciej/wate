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
  let classes = new Array(4).fill("");

  async function flipTile(i: number): Promise<void> {
    const duration = 250;
    await delay(duration * i); // Stagger.
    classes[i] = "FlipIn";
    await delay(duration);
    actualStates[i] = states[i];
    classes[i] = "FlipOut";
    await delay(duration);
    classes[i] = "";
  }

  let lastCurrent = current;
  $: {
    if (current != lastCurrent) {
      if (lastCurrent) {
        for (let i = 0; i < 4; ++i) flipTile(i);
      }
      lastCurrent = current;
    }
  }
</script>

<div>
  {#each letters as letter, i}
    <Tile {letter} state={actualStates[i]} anim={classes[i]} />
  {/each}
</div>

<style>
  div {
    flex: 1;
    display: grid;
    /* This needs to be a grid, flexbox dosen't like the border disappearing. */
    grid-template: 1fr / repeat(4, 1fr);
    width: 100%;
  }
</style>
