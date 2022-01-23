<script lang="ts" context="module">
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
</script>

<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { findRowStates, State } from "$lib/game";
  import { createEventDispatcher } from "svelte";

  async function animateReveal(): Promise<void> {
    const duration = 200;
    // I can't believe how neat this is.
    for (let i = 0; i < solution.length; ++i) {
      flipped[i] = true;
      await delay(duration);
      reveledStates[i] = states[i];
      flipped[i] = false;
    }
    await delay(duration);
    dispatch("revealed");
  }

  export let letters = "";
  export let solution = "";
  export let reveled = false;

  const dispatch = createEventDispatcher();
  let reveledStates; //  = new Array(solution.length).fill(State.Unknown);
  let flipped = new Array(solution.length).fill(false);

  $: states = findRowStates(solution, letters);
  $: {
    states; // Dependency.
    reveledStates = new Array(solution.length).fill(State.Unknown);
    if (reveled) animateReveal();
  }
</script>

<div>
  {#each letters.padEnd(solution.length) as letter, i}
    <Tile
      letter={reveledStates[i] === State.Unknown ? " " : letter}
      state={reveledStates[i]}
      flipped={flipped[i]}
    />
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
