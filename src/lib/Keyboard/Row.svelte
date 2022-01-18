<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { State } from "$lib/game";
  import { letterStates } from "$lib/stores";
  import Key from "$lib/Keyboard/Key.svelte";
  export let letters = "";

  const dispatch = createEventDispatcher();
</script>

<div>
  <slot name="start" />
  {#each letters as letter}
    <Key
      on:click={() => dispatch("press", letter)}
      state={$letterStates.get(letter) ?? State.Unknown}
    >
      {letter.toUpperCase()}
    </Key>
  {/each}
  <slot name="end" />
</div>

<style>
  div {
    display: flex;
    column-gap: 4px;
    margin: 4px 0;
  }
</style>
