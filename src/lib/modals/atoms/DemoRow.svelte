<script lang="ts">
  import Tile from "$lib/Tile.svelte";
  import { State } from "$lib/game";
  import { onMount } from "svelte";
  import { delay } from "$lib/utils";

  export let state: State = State.Unknown;
  export let statePosition = 0;
  export let letters = "";

  const size = 45;
  let flipped = false;
  let revealed = false;

  onMount(async () => {
    await delay(100);
    flipped = true;
    await delay(200);
    flipped = false;
    revealed = true;
  });
</script>

<div
  class="row"
  style:grid="auto-flow {size}px / repeat({letters.length}, {size}px)"
>
  {#each letters as letter, i}
    {#if i === statePosition}
      <Tile demo {letter} state={revealed ? state : State.Unknown} {flipped} />
    {:else}
      <Tile demo {letter} />
    {/if}
  {/each}
</div>

<style>
  .row {
    display: grid;
    gap: 4px;
  }
</style>
