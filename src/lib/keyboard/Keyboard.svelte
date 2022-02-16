<script lang="ts">
  import type { State } from "$lib/game";
  import { _ } from "svelte-i18n";
  import { createEventDispatcher } from "svelte";
  import { wordy } from "$static/config.json";
  import Key from "$lib/keyboard/Key.svelte";
  import Row from "$lib/keyboard/Row.svelte";

  export let letterStates = new Map<string, State>();
  const dispatch = createEventDispatcher();
  const qwerty = wordy;

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.repeat) return;

    const key = event.key;
    const alphabet = wordy ? "abcdefghijklmnopqrstuvwxyz" : "aeijklmnopstuw";

    if (key === "Backspace") {
      dispatch("backspace");
    } else if (key === "Enter") {
      dispatch("enter");
    } else if (key.length === 1 && alphabet.includes(key)) {
      dispatch("press", key);
    } else {
      return;
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<div class="keyboard" style:grid="auto-flow / repeat({qwerty ? 20 : 12}, 1fr)">
  <Row
    offset={!qwerty}
    letters={qwerty ? "qwertyuiop" : "aeijk"}
    on:press
    {letterStates}
  />
  <Row
    offset={qwerty}
    letters={qwerty ? "asdfghjkl" : "lmnops"}
    on:press
    {letterStates}
  />
  <Key big slot="start" on:click={() => dispatch("enter")}>
    {$_("key.enter")}
  </Key>
  <Row letters={qwerty ? "zxcvbnm" : "tuw"} on:press {letterStates} />
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
    gap: 8px;
    /* Visually center the wordle. */
    margin-top: 16px;
  }
</style>
