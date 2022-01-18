<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { findRowStates, State } from "$lib/game";

  export let letters = "";
  export let solution = "";
  export let current = false;
  $: states = findRowStates(solution, letters);
</script>

<div>
  {#each letters as letter, i}
    <Tile {letter} state={current ? State.Unknown : states[i]} />
  {/each}
</div>

<style>
  div {
    flex: 1;
    display: flex;
    width: 100%;
  }
</style>
