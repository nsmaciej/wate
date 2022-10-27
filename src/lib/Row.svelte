<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { findRowStates, State } from "$lib/game";
  import { createEventDispatcher } from "svelte";
  import { delay } from "$lib/utils";

  async function animateReveal(): Promise<void> {
    const duration = 200; //200ms
    // I can't believe how neat this is.
    const states = findRowStates(solution, letters);
    for (let i = 0; i < solution.length; ++i) {
      flipped[i] = true;
      await delay(duration);
      reveledStates[i] = states[i];
      flipped[i] = false;
    }
    await delay(duration);
    dispatch("reveal");
  }

  // Needed to calculate the highlights.
  export let solution = "";
  export let letters = "";
  // Used during the initial animation.
  export let hideBeforeReveal = false;
  export let revealed = false;

  const dispatch = createEventDispatcher();

  let reveledStates: State[];
  $: flipped = new Array(solution.length).fill(false);
  $: {
    // Runs when the solution or revealed changes.
    reveledStates = new Array(solution.length).fill(State.Unknown);
    if (revealed) animateReveal();
  }
</script>

{#each letters.padEnd(solution.length) as letter, i}
  <Tile
    letter={hideBeforeReveal && reveledStates[i] === State.Unknown
      ? " "
      : letter}
    state={reveledStates[i]}
    flipped={flipped[i]}
  />
{/each}
