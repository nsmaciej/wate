<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { State } from "$lib/game";
  import { effectiveLocale, letterLabelForLocale } from "$lib/settings";
  import Key from "$lib/keyboard/Key.svelte";

  export let letterStates = new Map<string, State>();
  export let letters = "";
  export let offset = false;
  const dispatch = createEventDispatcher();
</script>

{#each letters as letter, i}
  <Key
    offset={offset && i === 0}
    on:click={() => dispatch("press", letter)}
    state={letterStates.get(letter) ?? State.Unknown}
  >
    {letterLabelForLocale(letter, $effectiveLocale)}
  </Key>
{/each}
