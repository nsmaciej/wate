<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Key from "$lib/Key.svelte";
  import KeyboardRow from "$lib/KeyboardRow.svelte";

  let correct_letters = "";
  let absent_letters = "";

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
  <KeyboardRow letters="aeijkl" on:press />
  <KeyboardRow letters="mnops" on:press />
  <KeyboardRow letters="tuw" on:press>
    <Key big slot="start" on:click={() => dispatch("enter")}>ENTER</Key>
    <Key big slot="end" on:click={() => dispatch("backspace")}>BACKSPACE</Key>
  </KeyboardRow>
</div>
