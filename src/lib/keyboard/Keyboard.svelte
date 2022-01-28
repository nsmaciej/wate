<script lang="ts">
  import type { State } from "$lib/game";
  import { createEventDispatcher } from "svelte";
  import Key from "$lib/keyboard/Key.svelte";
  import Row from "$lib/keyboard/Row.svelte";
  import { _ } from "svelte-i18n";

  export let letterStates = new Map<string, State>();
  const dispatch = createEventDispatcher();

  function handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === "Backspace") {
      dispatch("backspace");
    } else if (key === "Enter") {
      dispatch("enter");
    } else if (key.length === 1 && "aeijklmnopstuw".includes(key)) {
      dispatch("press", key);
    } else {
      return;
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<div class="keyboard">
  <Row offset letters="aeijk" on:press {letterStates} />
  <Row letters="lmnops" on:press {letterStates} />
  <Key big slot="start" on:click={() => dispatch("enter")}>
    {$_("key.enter")}
  </Key>
  <Row letters="tuw" on:press {letterStates} />
  <Key big slot="end" on:click={() => dispatch("backspace")}>
    {$_("key.backspace")}
  </Key>
</div>

<style>
  div.keyboard {
    width: 100%;
    /* Disable tap to zoom if you miss-tap a key. */
    touch-action: manipulation;
    display: grid;
    grid: auto-flow / repeat(12, 1fr);
    gap: 8px;
    /* Visually center the wordle. */
    margin-top: 16px;
  }
</style>
