<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { findStates, State } from "$lib/game";

  export let letters = "";
  export let solution = "";
  export let current = false;
  $: states = findStates(solution, letters);
</script>

<div>
  {#each letters as letter, i}
    <Tile {letter} state={current ? State.Unknown : states[i]} />
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-auto-columns: 50px;
    grid-auto-flow: column;
    grid-auto-rows: 50px;
  }
</style>
