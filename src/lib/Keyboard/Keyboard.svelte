<script lang="ts">
  import type { State } from "$lib/game";
  import { createEventDispatcher } from "svelte";
  import Key from "$lib/Keyboard/Key.svelte";
  import Row from "$lib/Keyboard/Row.svelte";

  export let letterStates = new Map<string, State>();
  const dispatch = createEventDispatcher();

  function handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key == "Backspace") {
      dispatch("backspace");
    } else if (key == "Enter") {
      dispatch("enter");
    } else if (key.length == 1 && "aeijklmnopstuw".includes(key)) {
      dispatch("press", key);
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<div>
  <Row letters="aeijkl" on:press {letterStates} />
  <Row letters="mnops" on:press {letterStates} />
  <Row letters="tuw" on:press {letterStates}>
    <Key big slot="start" on:click={() => dispatch("enter")}>ENTER</Key>
    <Key big slot="end" on:click={() => dispatch("backspace")}>BACKSPACE</Key>
  </Row>
</div>

<style>
  div {
    width: 100%;
    margin-top: 30px;
  }
</style>
