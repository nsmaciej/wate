<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { State } from "$lib/game";
  import { letterLabelForLocale, locale } from "$lib/settings";
  import Key from "$lib/Keyboard/Key.svelte";

  export let letterStates = new Map<string, State>();
  export let letters = "";
  const dispatch = createEventDispatcher();
</script>

<div>
  <slot name="start" />
  {#each letters as letter}
    <Key
      on:click={() => dispatch("press", letter)}
      state={letterStates.get(letter) ?? State.Unknown}
    >
      {letterLabelForLocale(letter, $locale)}
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
