<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { State } from "$lib/game";
  import Key from "$lib/Keyboard/Key.svelte";
  export let letters = "";

  const dispatch = createEventDispatcher();
  export let letterStates = new Map<string, State>();
</script>

<div>
  <slot name="start" />
  {#each letters as letter}
    <Key
      on:click={() => dispatch("press", letter)}
      state={letterStates.get(letter) ?? State.Unknown}
    >
      {letter}
    </Key>
  {/each}
  <slot name="end" />
</div>

<style>
  div {
    display: flex;
    margin: 8px 0;
    gap: 8px;
  }
</style>
