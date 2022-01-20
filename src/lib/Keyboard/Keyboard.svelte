<script lang="ts">
  import type { State } from "$lib/game";
  import { createEventDispatcher } from "svelte";
  import Key from "$lib/Keyboard/Key.svelte";
  import Row from "$lib/Keyboard/Row.svelte";
  import { _ } from "svelte-i18n";

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
<div class="keyboard">
  <Row letters="aeijk" on:press {letterStates}>
    <div slot="start" class="spacer" />
    <div slot="end" class="spacer" />
  </Row>
  <Row letters="lmnops" on:press {letterStates} />
  <Row letters="tuw" on:press {letterStates}>
    <Key big slot="start" on:click={() => dispatch("enter")}>
      {$_("key.enter")}
    </Key>
    <Key big slot="end" on:click={() => dispatch("backspace")}>
      {$_("key.backspace")}
    </Key>
  </Row>
</div>

<style>
  div.keyboard {
    width: 100%;
  }
  div.spacer {
    flex: 0.5;
  }
</style>
