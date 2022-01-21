<script lang="ts" context="module">
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
</script>

<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { findRowStates, State } from "$lib/game";

  export function revealStates(): void {
    const duration = 200;
    for (let i = 0; i < solution.length; ++i) {
      (async () => {
        await delay(duration * i); // Stagger.
        flipped[i] = true;
        await delay(duration);
        revealedStates[i] = states[i];
        flipped[i] = false;
      })();
    }
  }

  export let letters = "";
  export let solution = "";

  $: states = findRowStates(solution, letters);
  let revealedStates = new Array(solution.length).fill(State.Unknown);
  let flipped = new Array(solution.length).fill(false);
</script>

<div>
  {#each letters as letter, i}
    <Tile {letter} state={revealedStates[i]} flipped={flipped[i]} />
  {/each}
</div>

<style>
  div {
    flex: 1;
    display: grid;
    grid: auto / auto-flow 1fr;
    width: 100%;
  }
</style>
